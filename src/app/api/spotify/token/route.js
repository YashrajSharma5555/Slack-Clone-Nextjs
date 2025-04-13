// /app/api/spotify/token/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { code } = await req.json();

  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: 'https://slack-clone-nextjs-silk.vercel.app/spotify',
    client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET,
  });

  try {
    const res = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data }, { status: res.status });
    }

    return NextResponse.json({ access_token: data.access_token });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
