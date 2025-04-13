'use client';

import { useEffect, useState } from 'react';
import qs from 'query-string';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

export default function SpotifyClient() {
  const [tracks, setTracks] = useState([]);
  const [nowPlaying, setNowPlaying] = useState(null);
  const [token, setToken] = useState(null);

  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    async function fetchSpotifyData() {
      if (!code) {
        const query = qs.stringify({
          client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
          response_type: 'code',
          redirect_uri: 'https://slack-clone-nextjs-silk.vercel.app/spotify',
          scope:
            'user-top-read user-read-playback-state user-modify-playback-state streaming',
        });

        window.location.href = `https://accounts.spotify.com/authorize?${query}`;
        return;
      }

      try {
        const tokenResponse = await axios.post(
          'https://accounts.spotify.com/api/token',
          new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: 'https://slack-clone-nextjs-silk.vercel.app/spotify',
            client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
          }),
          {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          }
        );

        const access_token = tokenResponse.data.access_token;
        setToken(access_token);

        const [topTracks, nowPlaying] = await Promise.all([
          axios.get('https://api.spotify.com/v1/me/top/tracks?limit=10', {
            headers: { Authorization: `Bearer ${access_token}` },
          }),
          axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: { Authorization: `Bearer ${access_token}` },
          }),
        ]);

        setTracks(topTracks.data.items);
        setNowPlaying(nowPlaying.data?.item || null);
      } catch (error) {
        console.error(error);
      }
    }

    fetchSpotifyData();
  }, [code]);

  const playTrack = async (uri) => {
    try {
      await axios.put(
        'https://api.spotify.com/v1/me/player/play',
        { uris: [uri] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error('Failed to play track:', err);
    }
  };

  const pauseTrack = async () => {
    try {
      await axios.put(
        'https://api.spotify.com/v1/me/player/pause',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error('Failed to pause:', err);
    }
  };

  return (
    <div style={{ fontFamily: 'monospace', padding: '1rem' }}>
      <h2>Top 10 Tracks:</h2>
      {tracks.map((track) => (
        <div key={track.id} style={{ marginBottom: '1rem' }}>
          <strong>{track.name}</strong> — {track.artists.map((a) => a.name).join(', ')}
          <br />
          <button onClick={() => playTrack(track.uri)}>▶️ Play</button>
        </div>
      ))}

      <hr />

      <h2>Now Playing:</h2>
      {nowPlaying ? (
        <div>
          <strong>{nowPlaying.name}</strong> — {nowPlaying.artists.map((a) => a.name).join(', ')}
          <br />
          <button onClick={pauseTrack}>⏸ Pause</button>
        </div>
      ) : (
        <p>Nothing is currently playing.</p>
      )}
    </div>
  );
}
