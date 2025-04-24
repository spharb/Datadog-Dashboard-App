import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { DD_API_KEY, DD_APP_KEY } = process.env;

  const response = await fetch("https://api.datadoghq.com/api/v1/graph/snapshot", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "DD-API-KEY": DD_API_KEY,
      "DD-APPLICATION-KEY": DD_APP_KEY
    },
    body: JSON.stringify(req.body)
  });

  const data = await response.json();
  res.status(response.status).json(data);
}
