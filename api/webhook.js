// api/webhook.js
// Handler Webhook Senfenico : vérifie la signature HMAC-SHA256 et met à jour Firestore.
// Variables d'environnement Vercel requises :
//   - SENFENICO_WEBHOOK_SECRET : clé secrète webhook de votre dashboard Senfenico
//   - FIREBASE_SERVICE_ACCOUNT : JSON stringifié du compte de service Firebase

const crypto = require('crypto');

// ── Initialisation Firebase Admin (singleton) ─────────────────────────────
let db = null;

function getFirestore() {
  if (db) return db;

  const admin = require('firebase-admin');

  if (!admin.apps.length) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  db = admin.firestore();
  return db;
}

// ── Vérification du hash Senfenico (HMAC-SHA256) ──────────────────────────
function verifyWebhookSignature(payload, receivedHash, secret) {
  const expectedHash = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  // Comparaison sécurisée (évite les timing attacks)
  return crypto.timingSafeEqual(
    Buffer.from(expectedHash, 'hex'),
    Buffer.from(receivedHash, 'hex')
  );
}

// ── Handler principal ─────────────────────────────────────────────────────
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée.' });
  }

  const webhookSecret = process.env.SENFENICO_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('[WEBHOOK] SENFENICO_WEBHOOK_SECRET non configurée.');
    return res.status(500).end();
  }

  // Lire le corps brut (nécessaire pour la vérification du hash)
  const rawBody = JSON.stringify(req.body);
  const receivedHash = req.headers['x-webhook-hash'];

  if (!receivedHash) {
    console.warn('[WEBHOOK] Requête sans X-WEBHOOK-HASH - rejetée.');
    return res.status(400).json({ message: 'Hash manquant.' });
  }

  // ── Vérification de la signature ─────────────────────────────────────
  let isValid = false;
  try {
    isValid = verifyWebhookSignature(rawBody, receivedHash, webhookSecret);
  } catch (e) {
    console.warn(`[WEBHOOK] Erreur vérification hash: ${e.message}`);
    return res.status(400).json({ message: 'Hash invalide.' });
  }

  if (!isValid) {
    console.warn('[WEBHOOK] Signature invalide - requête rejetée.');
    return res.status(401).json({ message: 'Signature non autorisée.' });
  }

  // ── Traitement de l'événement ─────────────────────────────────────────
  const event = req.body;
  const eventType = event?.event;
  const data = event?.data;

  console.log(`[WEBHOOK] Événement reçu: ${eventType}`);

  try {
    const firestore = getFirestore();

    switch (eventType) {
      // Paiement par charge Mobile Money (sans redirection) = succès
      case 'charge.success': {
        const reference = data?.reference;
        if (!reference) break;

        await handlePaymentSuccess(firestore, reference, data);
        break;
      }

      // Paiement par checkout (avec redirection) = succès
      case 'checkout.success': {
        const reference = data?.reference;
        if (!reference) break;

        await handlePaymentSuccess(firestore, reference, data);
        break;
      }

      case 'checkout.pending':
        console.log(`[WEBHOOK] Checkout en attente: ${data?.reference}`);
        break;

      default:
        console.log(`[WEBHOOK] Événement ignoré: ${eventType}`);
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error(`[WEBHOOK] Erreur traitement: ${err.message}`);
    // Retourner 200 quand même pour éviter les renvois Senfenico en boucle
    return res.status(200).json({ received: true, warning: err.message });
  }
};

// ── Mise à jour du plan restaurant après paiement confirmé ────────────────
async function handlePaymentSuccess(firestore, reference, data) {
  // 1. Chercher le paiement en attente lié à cette référence
  const pendingDoc = await firestore
    .collection('pending_payments')
    .doc(reference)
    .get();

  if (!pendingDoc.exists) {
    console.warn(`[WEBHOOK] Aucun paiement en attente pour ref: ${reference}`);
    return;
  }

  const { restaurantId, plan } = pendingDoc.data();

  if (!restaurantId || !plan) {
    console.error(`[WEBHOOK] Données incomplètes pour ref: ${reference}`);
    return;
  }

  // 2. Calculer la date d'expiration (30 jours)
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 30);

  // 3. Mettre à jour le plan du restaurant
  await firestore.collection('restaurants').doc(restaurantId).update({
    plan: plan,
    planUpdatedAt: new Date(),
    planExpiry: expiry,
    lastPaymentReference: reference,
    lastPaymentAmount: data?.amount ?? null,
    lastPaymentDate: data?.transaction_date ? new Date(data.transaction_date) : new Date(),
  });

  // 4. Marquer le paiement comme traité
  await firestore.collection('pending_payments').doc(reference).update({
    status: 'completed',
    completedAt: new Date(),
  });

  console.log(`[WEBHOOK] ✅ Plan [${plan}] activé pour restaurant: ${restaurantId}`);
}
