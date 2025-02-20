import React, { useEffect, useRef } from 'react';
import MuxPlayer from '@mux/mux-player-react';

const App = () => {
  const playerRef = useRef(null);

  // Handle text tracks
  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    const disableTracks = () => {
      console.log('[VideoPlayer] Disabling text tracks');
      const tracks = player.textTracks;
      if (tracks) {
        console.log('[VideoPlayer] Found tracks:', tracks.length);
        for (let i = 0; i < tracks.length; i++) {
          tracks[i].mode = 'disabled';
          console.log('[VideoPlayer] Disabled track:', tracks[i].label);
        }
      }
    };

    // Run when video loads
    player.addEventListener('loadedmetadata', disableTracks);

    // Run when tracks change
    player.addEventListener('texttrackchange', () => {
      const tracks = player.textTracks;
      if (tracks) {
        const hasActiveTrack = Array.from(tracks).some(
          track => track.mode === 'showing'
        );
        if (hasActiveTrack) {
          console.log('[VideoPlayer] Active track detected, disabling all tracks');
          disableTracks();
        }
      }
    });

    return () => {
      player.removeEventListener('loadedmetadata', disableTracks);
      player.removeEventListener('texttrackchange', disableTracks);
    };
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Mux Player Caption Issue</h1>
      <MuxPlayer
        ref={playerRef}
        streamType="on-demand"
        playbackId="00qpUrNsZrLFA400x1a02yEtId018NeoKI3CMxN43NNDZNk"
        metadata={{
          playerName: 'Test Player',
          playerVersion: '1.0.0'
        }}
        defaultHiddenCaptions={true}
        style={{
          width: '100%',
          height: '450px',
          '--controls-backdrop-color': 'transparent',
          '--captions-button-color': 'white',
          '--captions-button-active-color': 'rgb(255, 176, 115)',
          '--captions-menu-background-color': 'rgba(28, 28, 28, 0.95)',
          '--captions-menu-item-color': 'white',
          '--captions-menu-item-active-color': 'rgb(255, 176, 115)',
          '--captions-text-background-color': 'rgba(0, 0, 0, 0.8)',
          '--captions-text-color': 'white',
        }}
      />
      <div style={{ marginTop: '20px' }}>
        <p>Steps to reproduce:</p>
        <ol>
          <li>Load the video</li>
          <li>Click the captions button</li>
          <li>Observe that captions are not properly disabled by default</li>
          <li>Check console logs for track state information</li>
        </ol>
      </div>
    </div>
  );
};

export default App;
