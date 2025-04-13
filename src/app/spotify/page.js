import { Suspense } from 'react';
import SpotifyClient from './SpotifyClient';

export default function SpotifyPage() {
  return (
    <Suspense fallback={<div>Loading Spotify...</div>}>
      <SpotifyClient />
    </Suspense>
  );
}
