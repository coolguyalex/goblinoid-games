# Hallway Skip

A three.js browser game (mobile first, landscape): slip out with the crowd, then stay out of class until the next bell.

Built from `Hallway_Skip_Game_Spec` v0.2. This is **build step 1**: one hallway, joystick, a hall monitor that chases, a crowd that thins out, and the bell.

## Controls

- Phone: left thumb = joystick, drag on the right side = look around
- Desktop: WASD / arrow keys to move, drag the mouse to look, Esc to pause

## Tuning

Every tunable number is in the `CFG` object at the top of `game.js`. Staff types, the floor plan, and obstacles are data tables just below it. Add `?debug` to the URL for an FPS counter.

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.
