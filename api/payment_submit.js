export default async function handler(req, res) {
  // Autoriser Flutter (CORS)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { otp, charge_reference } = req.body;

  try {
    const response = await fetch('https://api.senfenico.com/v1/payment/charges/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        // Clé secrète cachée
        'X-API-KEY': process.env.SENFENICO_API_KEY, 
      },
      body: JSON.stringify({
        otp: otp,
        charge_reference: charge_reference
      })
    });

    const data = await response.json();
    res.status(response.status).json(data);
    
  } catch (error) {
    res.status(500).json({ status: false, message: 'Erreur réseau interne', error: String(error) });
  }
}
