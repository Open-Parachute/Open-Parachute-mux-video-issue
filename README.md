# Mux Player Caption Issue Reproduction

This repository contains a minimal reproduction of an issue with captions in the Mux Player React component.

## Issue Description

When attempting to disable captions by default, the captions still appear to be enabled or become enabled unexpectedly.

## Steps to Reproduce

1. Load the video
2. Click the captions button
3. Observe that captions are not properly disabled by default
4. Check console logs for track state information

## Implementation Details

The reproduction implements:
- Manual track disabling on video load
- Track state monitoring
- Console logging of track changes
- Event listeners for `loadedmetadata` and `texttrackchange`

## Setup

```bash
npm install
npm run dev
```

## Technical Details

- React 18
- @mux/mux-player-react
- Vite for development

## Console Logs

The implementation includes detailed console logging to track:
- When tracks are found
- When tracks are disabled
- When track state changes occur
- Active track detection

## Notes

Replace the `playbackId` in `App.jsx` with your Mux video ID to test with your content:

```jsx
playbackId="YOUR-MUX-PLAYBACK-ID"
