import axios from 'axios';

export default async function handler(req, res) {
  const { code } = req.body;

  const tokenUrl = 'https://accounts.spotify.com/api/token';

  try {
    const response = await axios.post(
      tokenUrl,
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: 'https://slack-clone-nextjs-silk.vercel.app/spotify',
        client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,  // Secret only on the server side
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );

    const { access_token } = response.data;
    res.status(200).json({ access_token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to exchange code for token' });
  }
}
