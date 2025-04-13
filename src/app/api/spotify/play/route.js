// app/api/spotify/play/route.js
import axios from 'axios';

export async function POST(req) {
  const { accessToken, uri } = await req.json();

  try {
    await axios.put(
      'https://api.spotify.com/v1/me/player/play',
      { uris: [uri] },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return Response.json({ message: 'Playing song' });
  } catch (err) {
    console.error('Play error:', err?.response?.data || err.message);
    return Response.json({ error: 'Could not play track' }, { status: 500 });
  }
}
