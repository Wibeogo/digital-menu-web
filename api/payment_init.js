export default async function handler(req, res) {
  // Autoriser Flutter (CORS)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { amount, phone, provider } = req.body;

  try {
    const response = await fetch('https://api.senfenico.com/v1/payment/charges/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // La clé secrète est injectée automatiquement par Vercel !
        'X-API-KEY': process.env.SENFENICO_API_KEY, 
      },
      body: JSON.stringify({
        amount: amount,
        currency: "XOF",
        payment_method: "mobile_money",
        payment_method_details: {
          phone: phone,
          provider: provider
        }
      })
    });

    const data = await response.json();
    res.status(response.status).json(data);
    
  } catch (error) {
    res.status(500).json({ status: false, message: 'Erreur réseau interne', error: String(error) });
  }
}
