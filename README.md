# Goblinoid Games

Small Three.js browser games, hosted together on AWS Amplify.

| Game | Where it lives | Play |
| --- | --- | --- |
| Pong 3D | repo root | https://main.d3hoexv9zrkbjx.amplifyapp.com/ |
| Hallway Skip | `hallway-skip/` | https://main.d3hoexv9zrkbjx.amplifyapp.com/hallway-skip/ |

Each game is a self-contained static folder: an `index.html`, a `game.js`, and its own copy of
Three.js in `vendor/`. There's no build step, so nothing depends on a third-party CDN that a
network filter might block.

## Pong 3D

A small Pong game, first built as a placeholder to test static hosting
(for example, whether a host's URL loads on a filtered school network).

Play against the CPU with the mouse, arrow keys / A·D, or touch. First to 7 wins; Esc pauses.

- `index.html`: the page, styles, and an error message if the game can't load
- `game.js`: the game
- `vendor/three.module.min.js`: Three.js r160

## Hallway Skip

You're a kid skipping class. Each bell you slip out into a crowded hallway, dodge staff, and
stay out of class until the next bell. Mobile first, played in landscape.

**Status: prototype, build step 1 of 9.** It has one looping hallway, a virtual joystick,
a hall monitor with a vision cone that patrols and chases, a crowd that thins out as students
head to class, and the bell cycle: a 25-second passing period, then 60 seconds of skipping.
Each period you survive is worth 100 points. More hall monitors show up in later periods.

Controls:

- Phone: left thumb = joystick, drag on the right side = look around
- Desktop: WASD / arrow keys to move, drag the mouse to look, Esc to pause

Tuning: every tunable number is in the `CFG` object at the top of `hallway-skip/game.js`.
Staff types, the floor plan, and obstacles are data tables just below it.
Add `?debug` to the URL for an FPS counter.

Coming next: lockers, bathrooms, and classrooms to hide in; a security guard and the
three-strike system; a full six-period day; then items to throw.

## Other files

- `amplify.yml`: AWS Amplify Hosting settings (static files, no build step)

## Run locally

Browsers won't load ES modules from `file://`, so serve the repo folder:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000 (Pong) or http://localhost:8000/hallway-skip/ (Hallway Skip).

## Deploy

Connected to AWS Amplify Hosting: every push to `main` redeploys both games.
