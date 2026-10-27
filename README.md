# Goblinoid Games

Small Three.js browser games, hosted together on AWS Amplify.

| Game | Where it lives | Play |
| --- | --- | --- |
| Pong 3D | repo root | https://main.d3hoexv9zrkbjx.amplifyapp.com/ |
| Hall Goblin | `hallway-skip/` | https://main.d3hoexv9zrkbjx.amplifyapp.com/hallway-skip/ |

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

## Hall Goblin

(Called Hallway Skip until step 53. The folder, URL and save data keep the old name, so links and saves still work.)

You're a kid skipping class. Each bell you slip out into a crowded hallway, dodge staff, and
stay out of class until the next bell. Mobile first, played in landscape.

**Status: prototype, build step 80.** A two-floor school with stairwells, six-period days that get harder,
hall monitors, security guards, teachers, the custodian and the principal; lockers, restrooms, closets and classrooms to hide in
(each with its own odds of getting spotted); a hotbar of throwables and gadgets (spitballs, socks, TP, stink bombs, a skateboard,
a bass drum, a disguise kit, a rubber chicken and more); rooms to raid, friends to trade with, dares, 0–5 wanted stars;
a crowd of kids who arrive each morning, chat, and walk out at the last bell; a tutorial; a character maker with
stats, outfits and hairstyles; an end-of-run screen that calls out what made each run stand out; survival mode, the fire alarm,
and touch and keyboard controls.

What each build added, the controls, and tuning notes: [`hallway-skip/README.md`](hallway-skip/README.md).

Add `?debug` to the URL for an FPS counter and a test panel.

## Other files

- `amplify.yml`: AWS Amplify Hosting settings (static files, no build step)

## Run locally

Browsers won't load ES modules from `file://`, so serve the repo folder:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000 (Pong) or http://localhost:8000/hallway-skip/ (Hall Goblin).

## Deploy

Connected to AWS Amplify Hosting: every push to `main` redeploys both games.

## Versions and rollback

Each Hall Goblin build is its own commit with a tag (`hallway-step5` … `hallway-step80`;
`hallway-step4-live` is the build that was live before step 5). Browse them on the repo's Tags page.

To roll back, restore the files from an earlier tag in a new commit, then push:

```bash
git checkout hallway-step14 -- hallway-skip
git commit -m "Roll back Hallway Skip to step 14"
git push
```

History is never rewritten, so going forward again works the same way.
