# Pong 3D

A small Three.js Pong game, used as a placeholder to test static hosting
(for example, whether a host's URL loads on a filtered school network).

Play against the CPU with the mouse, arrow keys / A·D, or touch. First to 7 wins; Esc pauses.

## Files

- `index.html`: the page, styles, and an error message if the game can't load
- `game.js`: the game
- `vendor/three.module.min.js`: Three.js r160, bundled locally so the game
  doesn't depend on a third-party CDN that a network filter might block
- `amplify.yml`: AWS Amplify Hosting settings (static files, no build step)

## Run locally

Browsers won't load ES modules from `file://`, so serve the folder:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploy

Connected to AWS Amplify Hosting: every push to `main` redeploys the site.
