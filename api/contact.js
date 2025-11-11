import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Vercel Node runtime parses JSON automatically on POST
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' });

  const API_KEY = process.env.RESEND_API_KEY;
  const EMAIL_TO = process.env.EMAIL_TO || 'ang_scargill@yahoo.co.uk';
  if (!API_KEY) return res.status(500).json({ error: 'RESEND_API_KEY not configured' });

  try {
    const payload = {
      from: 'Blossom Doodles <no-reply@blossomdoodles.co.uk>',
      to: [EMAIL_TO],
      subject: `Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`
    };
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify(payload)
    });
    if (!r.ok) {
      const t = await r.text();
      console.error('Resend error', t);
      return res.status(500).json({ error: 'Failed to send email' });
    }
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}
