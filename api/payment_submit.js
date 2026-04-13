// api/payment_submit.js
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { otp, charge_reference } = req.body || {};
  console.log(`[SUBMIT] Tentative OTP pour Ref: ${charge_reference}`);

  try {
    const response = await fetch('https://api.senfenico.com/v1/payment/charges/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 Chrome/120.0.0.0 Safari/537.36',
        'X-API-KEY': process.env.SENFENICO_API_KEY,
      },
      body: JSON.stringify({ otp, charge_reference })
    });

    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch (e) { data = { message: text }; }

    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ status: false, message: `Erreur réseau: ${error.message}` });
  }
};
