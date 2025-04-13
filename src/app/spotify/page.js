import { redirect } from 'next/navigation';
import qs from 'query-string';
import axios from 'axios';

export default async function SpotifyPage({ searchParams }) {
  const code = searchParams?.code;

  if (!code) {
    const query = qs.stringify({
      client_id: process.env.SPOTIFY_CLIENT_ID,
      response_type: 'code',
      redirect_uri: 'https://slack-clone-nextjs-silk.vercel.app/spotify',
      scope:
        'user-top-read user-read-playback-state user-modify-playback-state streaming',
    });

    redirect(`https://accounts.spotify.com/authorize?${query}`);
    return;
  }

  try {
    const tokenResponse = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: 'https://slack-clone-nextjs-silk.vercel.app/spotify',
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );

    const access_token = tokenResponse.data.access_token;

    const headers = {
      Authorization: `Bearer ${access_token}`,
    };

    const [topTracksRes, nowPlayingRes] = await Promise.all([
      axios.get('https://api.spotify.com/v1/me/top/tracks?limit=10', {
        headers,
      }),
      axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
        headers,
      }),
    ]);

    const topTracks = topTracksRes.data.items.map((track) => ({
      name: track.name,
      artist: track.artists.map((a) => a.name).join(', '),
      uri: track.uri,
      playCommand: {
        method: 'PUT',
        url: 'https://api.spotify.com/v1/me/player/play',
        headers: { Authorization: `Bearer ${access_token}` },
        body: { uris: [track.uri] },
      },
    }));

    const nowPlayingData = nowPlayingRes?.data?.item;
    const nowPlaying = nowPlayingData
      ? {
          name: nowPlayingData.name,
          artist: nowPlayingData.artists.map((a) => a.name).join(', '),
          uri: nowPlayingData.uri,
          pauseCommand: {
            method: 'PUT',
            url: 'https://api.spotify.com/v1/me/player/pause',
            headers: { Authorization: `Bearer ${access_token}` },
          },
        }
      : null;

    return <pre>{JSON.stringify({ topTracks, nowPlaying }, null, 2)}</pre>;
  } catch (error) {
    console.error(error?.response?.data || error.message);
    return <pre>Error occurred while fetching data.</pre>;
  }
}
