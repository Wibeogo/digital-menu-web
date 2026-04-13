// api/payment_init.js
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { amount, phone, provider } = req.body || {};

  console.log(`[INIT] Tentative: Montant=${amount}, Phone=${phone}, Provider=${provider}`);

  if (!process.env.SENFENICO_API_KEY) {
    console.error("[ERREUR] La variable SENFENICO_API_KEY n'est pas configurée sur Vercel !");
    return res.status(500).json({ status: false, message: "Erreur config: Clé API manquante sur le serveur." });
  }

  try {
    const response = await fetch('https://api.senfenico.com/v1/payment/charges/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 Chrome/120.0.0.0 Safari/537.36',
        'X-API-KEY': process.env.SENFENICO_API_KEY,
      },
      body: JSON.stringify({
        amount: parseInt(amount || 0, 10),
        currency: "XOF",
        payment_method: "mobile_money",
        payment_method_details: { phone, provider }
      })
    });

    const text = await response.text();
    console.log(`[SENFENICO] Réponse Status: ${response.status}`);

    let data;
    try { data = JSON.parse(text); } catch (e) { data = { message: text }; }

    res.status(response.status).json(data);

  } catch (error) {
    console.error(`[ERREUR RESEAU] ${error}`);
    res.status(500).json({ status: false, message: `Erreur réseau: ${error.message}` });
  }
};
