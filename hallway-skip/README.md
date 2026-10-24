# Hallway Skip

A three.js browser game (mobile first, landscape): slip out with the crowd, then stay out of class until the next bell.

Built from `Hallway_Skip_Game_Spec` v0.2. Done so far:

- **Step 1:** one hallway, joystick, a hall monitor that chases, a crowd that thins out, and the bell.
- **Step 2:** tap-to-interact and hiding spots. Green lockers (3 uses per period, 15 s each), two restrooms (45 s, but a monitor sweeps on a schedule), and classrooms (a teacher boots you in 4 s, a sub in 14 s; 1–2 subs per day, shown by a green window and a sticky note). If a chasing monitor sees you duck in, they yank you back out.
- **Step 3:** a security guard (narrow, long vision; roams; sprints faster than you for about 5 s, then gets winded; radios for backup), the three-strike ladder (warning → the office, which costs this period's points and puts staff on high alert for the day → run over), and a PA announcer with placeholder lines in `PA_LINES`.
- **Step 4:** a figure-8 floor plan (outer loop plus a main hall across the middle; monitors patrol different loops), the six-period day (more monitors, guards, and teachers at their doors as the day goes on), harder days (faster, sharper staff; shorter passing and longer skipping periods; `CFG.days`), an end-of-day screen with a bonus, and saving at every bell (Continue on the title screen).
- **Step 5:** a four-slot hotbar (right edge), tap-then-flick throwing with a dotted arc preview (the game slows while you aim), and seven items found lying in the halls: paper airplane (points per kid it flies over), spitball (3 shots), banana peel (anyone who steps on it slips; staff go down for 2.5 s), whoopee cushion (noise that pulls staff over), basketball (bounces; each bounce turns staff to look), wheelie chair (launches you down the hall; hitting staff is a catch), and gum (instant havoc points). Repeating the same havoc in one period is worth less each time.
- **Step 6:** rooms as shops. Each room type has a loot table (`ROOM_TYPES`: classroom, science lab, art room, gym, main office). While hiding in a room, tap an item on the desk to grab it; each grab eats 1.5 s of hiding time (0.75 s with a sub), and the teacher may call security (30% per grab; subs 5%; the secretary 50%), sending a guard to the door. Sub rooms have an extra item. The main office has a once-a-day 300-point prize. Desks restock every period; items lying in the halls vanish after 45 s.
- **Step 7:** two-layer heat. HEAT ("they know it's me", 0-100) rises when staff see you doing havoc or start chasing you, flows in at most 30/s, drops 60% at every bell, and cools while you hide; it makes staff faster and sharper, and at 50+ staff can detain you during passing periods (below that, a catch during passing just shoos you, no strike). SCHOOL ALERT ("they know something happened") rises with loud havoc even unseen (more if seen), only drops overnight (-40%), adds an extra guard at 50, and ending a day at 100 makes the next day the LAST DAY: 3 periods, 2× points, max staff; survive it and the run ends as a legend.

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
