# Hallway Skip

A three.js browser game (mobile first, landscape): slip out with the crowd, then stay out of class until the next bell.

Built from `Hallway_Skip_Game_Spec` v0.2. Done so far:

- **Step 1:** one hallway, joystick, a hall monitor that chases, a crowd that thins out, and the bell.
- **Step 2:** tap-to-interact and hiding spots. Green lockers (3 uses per period, 15 s each), two restrooms (45 s, but a monitor sweeps on a schedule), and classrooms (a teacher boots you in 4 s, a sub in 14 s; 1–2 subs per day, shown by a green window and a sticky note). If a chasing monitor sees you duck in, they yank you back out.
- **Step 3:** a security guard (narrow, long vision; roams; sprints faster than you for about 5 s, then gets winded; radios for backup), the three-strike ladder (warning → the office, which costs this period's points and puts staff on high alert for the day → run over), and a PA announcer with placeholder lines in `PA_LINES`.

## Controls

- Phone: left thumb = joystick, drag on the right side = look around
- Hide: walk into a hiding spot, or tap it when it glows
- Desktop: WASD / arrow keys to move, drag the mouse to look, click or E to hide, Esc to pause

## Tuning

Every tunable number is in the `CFG` object at the top of `game.js`. Staff types, the floor plan, and obstacles are data tables just below it. Add `?debug` to the URL for an FPS counter.

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.
