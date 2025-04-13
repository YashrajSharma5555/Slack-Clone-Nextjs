// app/spotify/page.js

import { redirect } from 'next/navigation';
import qs from 'query-string';
import axios from 'axios';

export default async function SpotifyPage({ searchParams }) {
  const code = searchParams?.code;

  if (!code) {
    // If there's no code, redirect the user to Spotify for authorization
    const query = qs.stringify({
      client_id: process.env.SPOTIFY_CLIENT_ID,
      response_type: 'code',
      redirect_uri: 'https://slack-clone-nextjs-silk.vercel.app/spotify', // Use localhost for testing
      scope: 'user-top-read user-read-playback-state user-modify-playback-state',
    });

    // Redirect to Spotify for login
    redirect(`https://accounts.spotify.com/authorize?${query}`);
    return; // Return to stop further code execution
  }

  try {
    // 1. Exchange code for access token
    const tokenResponse = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: 'https://slack-clone-nextjs-silk.vercel.app/spotify', // Use localhost for testing
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );

    const access_token = tokenResponse.data.access_token;

    // 2. Get top 10 tracks and currently playing
    const [topTracks, nowPlaying] = await Promise.all([
      axios.get('https://api.spotify.com/v1/me/top/tracks?limit=10', {
        headers: { Authorization: `Bearer ${access_token}` },
      }),
      axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: { Authorization: `Bearer ${access_token}` },
      }),
    ]);

    // Prepare the result for the frontend
    const result = {
      topTracks: topTracks.data.items.map((track) => ({
        name: track.name,
        artist: track.artists.map((a) => a.name).join(', '),
        uri: track.uri,
      })),
      nowPlaying: nowPlaying.data?.item
        ? {
            name: nowPlaying.data.item.name,
            artist: nowPlaying.data.item.artists.map((a) => a.name).join(', '),
            uri: nowPlaying.data.item.uri,
          }
        : null,
    };

    return <pre>{JSON.stringify(result, null, 2)}</pre>;
  } catch (error) {
    console.error(error);
    return <pre>Error occurred while fetching data.</pre>;
  }
}
