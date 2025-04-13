// pages/api/spotify-token.js

export default async function handler(req, res) {
    const { code } = req.body;
  
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', 'https://slack-clone-nextjs-silk.vercel.app/spotify');
    params.append('client_id', process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID);
    params.append('client_secret', process.env.SPOTIFY_CLIENT_SECRET);
  
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params,
      });
  
      const data = await response.json();
  
      if (response.ok) {
        res.status(200).json(data);
      } else {
        res.status(response.status).json({ error: data });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  