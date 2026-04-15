// api/payment_submit.js
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ status: false, message: 'Méthode non autorisée.' });

  const { otp, charge_reference } = req.body || {};

  // ── Validation des inputs ──────────────────────────────────────
  if (!otp || typeof otp !== 'string' || otp.trim() === '') {
    return res.status(400).json({ status: false, message: 'Le code OTP est requis.' });
  }
  if (!charge_reference || typeof charge_reference !== 'string' || charge_reference.trim() === '') {
    return res.status(400).json({ status: false, message: 'La référence de charge est requise.' });
  }

  console.log(`[SUBMIT] OTP pour Ref: ${charge_reference}`);

  if (!process.env.SENFENICO_API_KEY) {
    console.error('[ERREUR] SENFENICO_API_KEY non configurée sur Vercel.');
    return res.status(500).json({ status: false, message: 'Erreur config: Clé API manquante.' });
  }

  try {
    const response = await fetch('https://api.senfenico.com/v1/payment/charges/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-API-KEY': process.env.SENFENICO_API_KEY,
      },
      body: JSON.stringify({ otp: otp.trim(), charge_reference: charge_reference.trim() })
    });

    const text = await response.text();
    console.log(`[SENFENICO SUBMIT] Status: ${response.status}, Body: ${text.substring(0, 200)}`);

    let data;
    try { data = JSON.parse(text); } catch (e) { data = { status: false, message: text }; }

    res.status(response.status).json(data);
  } catch (error) {
    console.error(`[ERREUR RESEAU SUBMIT] ${error}`);
    res.status(500).json({ status: false, message: `Erreur réseau: ${error.message}` });
  }
};
