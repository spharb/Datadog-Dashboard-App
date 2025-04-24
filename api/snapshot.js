export default async function handler(req, res) {
  console.log('DD_API_KEY:', !!process.env.DD_API_KEY, 'DD_APP_KEY:', !!process.env.DD_APP_KEY);
  …
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { DD_API_KEY, DD_APP_KEY } = process.env;

  try {
    const ddRes = await fetch(
      'https://api.datadoghq.com/api/v1/graph/snapshot',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'DD-API-KEY': DD_API_KEY,
          'DD-APPLICATION-KEY': DD_APP_KEY,
        },
        body: JSON.stringify(req.body),
      }
    );

    const data = await ddRes.json();
    return res.status(ddRes.status).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
