// app/api/spotify/pause/route.js
import axios from 'axios';

export async function POST(req) {
  const { accessToken } = await req.json();

  try {
    await axios.put(
      'https://api.spotify.com/v1/me/player/pause',
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return Response.json({ message: 'Paused song' });
  } catch (err) {
    console.error('Pause error:', err?.response?.data || err.message);
    return Response.json({ error: 'Could not pause playback' }, { status: 500 });
  }
}
