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
            'user-top-read user-read-playback-state user-read-currently-playing user-modify-playback-state streaming',
        });

        window.location.href = `https://accounts.spotify.com/authorize?${query}`;
        return;
      }

      try {
        // Exchange code for token via API route
        const tokenRes = await axios.post('/api/spotify/token', { code });
        const access_token = tokenRes.data.access_token;

        if (!access_token) {
          throw new Error('Access token not received');
        }

        setToken(access_token);
        console.log('Access Token:', access_token);

        // Fetch top tracks
        const topTracksRes = await axios.get('https://api.spotify.com/v1/me/top/tracks?limit=10', {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        setTracks(topTracksRes.data.items);

        // Fetch now playing
        const nowPlayingRes = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
          headers: { Authorization: `Bearer ${access_token}` },
        });

        if (!nowPlayingRes.data || !nowPlayingRes.data.item) {
          setNowPlaying(null);
        } else {
          setNowPlaying(nowPlayingRes.data.item);
        }
      } catch (error) {
        console.error('Error:', error.response?.data || error.message);
      }
    }

    fetchSpotifyData();
  }, [code]);

  const playTrack = async (uri) => {
    try {
      await axios.put(
        'https://api.spotify.com/v1/me/player/play',
        { uris: [uri] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error('Play error:', err.response?.data || err.message);
    }
  };

  const pauseTrack = async () => {
    try {
      await axios.put(
        'https://api.spotify.com/v1/me/player/pause',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error('Pause error:', err.response?.data || err.message);
    }
  };

  return (
    <div style={{ fontFamily: 'monospace', padding: '1rem' }}>
      <h2>Top 10 Tracks:</h2>
      {tracks.length > 0 ? (
        tracks.map((track) => (
          <div key={track.id} style={{ marginBottom: '1rem' }}>
            <strong>{track.name}</strong> — {track.artists.map((a) => a.name).join(', ')}
            <br />
            <button onClick={() => playTrack(track.uri)}>▶️ Play</button>
          </div>
        ))
      ) : (
        <p>No top tracks available.</p>
      )}

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
