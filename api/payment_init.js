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
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        // La clé secrète est injectée automatiquement par Vercel !
        'X-API-KEY': process.env.SENFENICO_API_KEY, 
      },
      body: JSON.stringify({
        amount: parseInt(amount, 10), // FORCÉ EN ENTIER (Correction clé !)
        currency: "XOF",
        payment_method: "mobile_money",
        payment_method_details: {
          phone: phone,
          provider: provider
        }
      })
    });

    const textResponse = await response.text();
    let data;
    try {
      data = JSON.parse(textResponse);
    } catch(e) {
      data = { message: `Erreur inattendue au format: ${textResponse.substring(0, 50)}` };
    }

    // Récupérer le message d'erreur si la syntaxe Senfenico est différente
    if (!data.status && !data.message) {
       data.message = JSON.stringify(data);
    }
    
    res.status(response.status).json(data);
    
  } catch (error) {
    res.status(500).json({ status: false, message: `Erreur réseau: ${String(error)}` });
  }
}
