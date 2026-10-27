// Hall Goblin (was Hallway Skip) — prototype. The folder, URL and save keys keep the old name so links and saves still work.
// Step 1: hallway, joystick, a hall monitor that chases, a crowd that thins, and the bell.
// Step 2: tap-to-interact and hiding spots: lockers, restrooms, classrooms (teacher and sub boot timers).
// Step 3: security guard, the three-strike ladder, and the PA announcer.
// Step 4: the six-period day, escalating days, hall teachers, save at the bell. Figure-8 floor plan.
// Step 5: four-slot hotbar, tap-then-flick throwing with an arc preview, and the first seven items.
// Step 6: rooms as shops (loot tables by room type, grabbing costs boot time, teachers can call security) and despawn timers.
// Step 7: heat ("they know it's me") and the persistent security level ("they know something happened").
// Step 8: the principal, friends and passing-period mini-games, and full risk scoring.
// Step 9: humor pass (staff barks, squinting, caught-scene lines, excuses) and ad hooks (placeholder ads).
// Step 10: thrown things hit people (points, more for staff, and a stun), two-stage paper airplane, step-on whoopee cushion, multi-slip banana.
// Step 11: football (erratic bounces), stink bomb (science labs), spray paint graffiti (art rooms).
// Step 12: raided rooms lock for a while, the principal's office (fake pass, master key), bigger gum trades.
// Step 13: survival mode (replaces "Last Day"), the fire alarm, flooding bathrooms, endings that depend on your heat.
// Step 14: keyboard for everything (E hints, slot numbers, arrow-key aiming), sprint with stamina and shoving.
// Step 15: a bigger crowd (110 kids, ?crowd=N to try others); kids out of view aren't drawn.
// Step 16: fewer lockers (and you can rummage through them: might be junk), nothing spawns in the halls, things stay where they land until staff tidy them up, balls only from the gym.
// Step 17: slime (science: whoever steps in it is stuck), toilet paper (restrooms: flies like the airplane, leaves a streamer), frisbee (gym: long flight, pick it back up).
// Step 18: no restroom sweep timer: staff walking past a restroom check it about half the time ("Hey, do you kids have a pass?").
// Step 19: dares from the kid in the restroom (hold two at a time; some are tied to a period, a hall, or a combo).
// Step 20: "they found you, run for it!", farther spitballs, slower heat (and a bigger heat bar), a bigger score, survival mode renamed Rebel Run.
// Step 21: loot by room and rarity (specialty items only from their room; hall passes and staff keys are rare finds), the office always has a pass and a key but its alarm calls everyone.
// Step 22: the "kick me" sign (kids pen the staff member in until the tardy bell) and Mentos & soda (a geyser kids crowd round to watch).
// Step 23: best runs saved in the browser (top 3, new high score / longest run badges); restroom: found on the third check in one stay.
// Step 24: burst out of a locker: stuns staff close by and gives you a head start, but busts that locker for the day.
// Step 25: easier controls: an options menu (saved), auto-aim on by default (tap an item to throw it; banana peels go behind you),
//          a joystick guide on phones, a pause button; a bigger stamina bar, and the energy drink (twice the stamina for a minute).
// Step 26: toilet paper drifts down like a streamer and snags on things (locker tops, the trophy case, new spirit-banner wires).
// Step 27: staff take longer to go from suspicious (?) to chasing (!), and much longer during passing periods.
// Step 28: the band room (room 206): the trumpet (every staff member comes running, big points) and the bass drum (roll it down the hall).
// Step 29: steer the wheelie chair a little (steering slows you down), and jump off before the crash (the chair rolls on without you).
// Step 30: staff can't pull you out of a locker. If they saw you go in, they wait outside it until you come out (burst out!).
// Step 31: the custodian does the cleaning (messes stay until he gets to them; kids grab balls and planes), never chases, radios you in.
// Step 32: slime holds longer, spitballs fly farther, stuns last about 25% longer, teachers at their doors see less.
// Step 33: every classroom has a subject (math, English, history); history rooms have a globe you can roll at someone.
// Step 34: the custodian's closet: a mop (jams a classroom door), a wet-floor sign, a mop bucket, a plunger, and the breaker box (lights out).
// Step 35: after a strike (or a "get to class!"), you get a real head start: whoever caught you lets you go and looks the other way for a while.
// Step 36: balls and frisbees turn up in lockers too; slime, stink bombs and Mentos geysers cover a bigger area.
// Step 37: take anything from the custodian's closet and he locks it for the rest of the day; only the staff key opens it.
// Step 38: no wet-floor sign in the closet. The custodian puts two out around wet messes while he cleans; steal one and set it down:
//          staff who aren't onto you turn around when they see it. 10 s after you take one, he drops everything to get it back.
// Step 39: toilet paper flies higher (clears the banners), the plunger lasts much longer, and the kick-me sign works on kids too.
// Step 40: hood up (🧥 button or H): staff are slower to notice you for a while; running pulls it down; then a cooldown.
// Step 41: skateboards (lockers): tap to hop on, glide fast; bowl kids over; crash into staff or a wall and you're off (and the board's on the floor).
// Step 42: a second floor. Two stairwells (northwest and southeast corners) connect them; staff follow you up and down,
//          each floor has its own custodian, closet, restrooms and rooms. Rooms are now numbered 101-114 and 201-214.
// Step 43: stronger slow motion while you aim a throw by hand (a fifth of normal speed), easing in and out, with a blue edge.
// Step 44: sneaking into a classroom is a hide check, and so is every grab. Spotted: out, security's called, room locked 3 periods.
// Step 45: your kid: stealth, speed and strength (1-20 since step 59, roll and reroll), on a character screen from the title.
// Step 46: your kid's look: outfit, hair and color, skin, height, weight and build, on a jointed low-poly kid whose arms and legs swing.
// Step 47: easier classrooms (teacher 80%, sub 95%, secretary 65%); a grab is half as risky as walking in, +6% per grab after.
// Step 48: the old sock and the moldy sandwich from lockers throw like spitballs and score when they hit someone.
// Step 49: more stat effects: speed helps stamina, strength pushes through crowds (and 15+ carries a fifth item), stealth means fewer restroom checks.
// Step 50: five more outfits (skater, theater kid, prep, pajama kid, band kid, with hats) and dreadlocks and a flat top.
// Step 51: small phones: controls and HUD sized by screen height, items wrap to a second column, overlays scroll, How to play fixed.
// Step 52: run stats: a tally of the whole run, and an end screen that calls out only what stood out (vs. your own past runs).
// Step 53: renamed Hall Goblin; a goblin-green skin tone and a goblin outfit (patched burlap, rope belt, satchel, foot wraps, pointy ears).
import * as THREE from "three";

// =====================================================================================
// CONFIG — every tunable number lives here. Values marked "guess" come from the spec.
// =====================================================================================
const URLQ = new URLSearchParams(location.search);
const CFG = {
  periodsPerDay: 6,
  passingSec: 25,                 // guess (day 1; see days below)
  skippingSec: 60,                // guess (day 1; see days below)
  pointsPerPeriod: 100,           // earned across the skipping phase (~5/3 per second)

  // Within-day curve: index = period - 1. Period 1 is easy, period 6 is very hard but possible.
  monitorsPerPeriod: [2, 2, 3, 3, 4, 4],   // (two floors' worth)
  guardsPerPeriod:   [2, 3, 3, 4, 4, 4],   // step 77: +1 per floor (was 0,1,1,2,2,2)
  walkersPerPeriod:  [1, 1, 1, 2, 2, 2],   // step 77: teachers on a free period, walking the halls
  teachersPerPeriod: [0, 0, 1, 2, 3, 4],   // teachers standing guard at their doors
  custodiansPerPeriod: [2, 2, 2, 2, 2, 2],   // one per floor   // teachers standing guard at their doors

  // Across-days curve, kept separate so the two are easy to tune independently.
  days: {
    staffSpeedPerDay: 0.06,       // +6% staff speed per day after day 1...
    staffVisionPerDay: 0.05,      // +5% vision range per day
    staffNoticePerDay: 0.10,      // +10% how fast suspicion builds per day
    maxMult: 1.6,                 // ...capped at this multiplier
    passingSecPerDay: -2,         // passing periods get shorter (less crowd cover)...
    minPassingSec: 15,
    skippingSecPerDay: 5,         // ...and skipping periods get longer
    maxSkippingSec: 90,
    dayBonus: 250,                // points for surviving a whole day
  },

  player: { speed: 4.3, radius: 0.35, turnRate: 12 },
  // Sprint: hold Shift (or the 🏃 button on a phone). Short bursts; shoving through kids is noisy.
  sprint: {
    speedMult: 1.6,
    staminaSec: 3,                // a full bar lasts this long...
    rechargeSec: 5,               // ...and refills in this long
    restartAt: 0.3,               // once you run dry, wait until the bar is back to this before sprinting again
    noticeMult: 1.5,              // staff notice a running kid faster
    shoveStaggerSec: 0.6,         // kids you barge into stagger...
    shoveNoiseRadius: 6,          // ...staff within this range turn to look...
    shoveSeenHeat: 4,             // ...and if one can see you, a little heat (at most once per shoveCooldownSec)
    shoveCooldownSec: 1,
  },
  // Auto-aim (an option, on by default): tapping an item throws it the way you're facing. A staff member in front of you
  // (within coneDeg, in sight, in range) gets a 🎯 and the throw goes at them, with the power picked to reach them.
  autoAim: {
    coneDeg: 25,
    maxRange: 22,
    defaultPower: 0.55,
    power: { bananaPeel: 0.3, whoopee: 0.3, slime: 0.35, mentos: 0.35, stinkBomb: 0.5, spitball: 0.6, wheelieChair: 1 },
    behind: ["bananaPeel"],       // these drop behind you instead
  },
  // The custodian: the only one who cleans up. Messes stay where they are until he gets to them (he hears about them on
  // the radio, then walks over). Kids grab the fun stuff (balls, frisbees, paper airplanes) lying around before he can.
  // He never chases you, but if he gets a good look he radios the nearest staff.
  custodian: {
    signsFor: ["slime", "mentos", "mopBucket"],   // wet messes get two signs (so do stink clouds and floods)
    signGap: 1.8,                 // how far either side of the mess he sets them
    retrieveAfterSec: 10,         // steal a sign and, this long after, he drops everything to get it back
    pickupSec: 4,                 // picking up an item or litter            (step 77: everything takes ~2.5x longer;
    scrubSec: 10,                 // scrubbing graffiti off a wall             was 1.6 / 4 / 3 / 7 / 2.5)
    tpSec: 7.5,                   // pulling down a toilet-paper streamer
    mopSec: 18,                   // mopping a flooded restroom (it reopens)
    airSec: 6,                    // airing out what's left of a stink bomb
    radioCooldownSec: 15, radioHeat: 5, radioStaff: 2,
    kidsTake: ["basketball", "football", "frisbee", "paperAirplane", "bassDrum", "globe", "skateboard"],
    kidGrabRange: 0.9, kidGrabAfterSec: 6,   // step 82: counted from when it lands, so you can go get your own throw back
    lingerRadius: 0.55,           // a stink cloud shrinks to this fraction once it fades, and hangs around until he airs it out
  },
  // The custodian's closet: each item can be taken once per period; the breaker box once a day.
  closet: {
    grabSec: 1,
    items: ["mop", "mopBucket", "plunger"],
    foundRange: 2.3,              // the custodian comes by his closet: this close and you're found
    visitEverySec: [35, 70],      // how often he goes to his closet when there's nothing to clean
  },
  breaker: { sec: 10, visionMult: 0.4, points: 300, light: 0.22 },   // lights out: staff can barely see
  // Hood up: for a while staff build suspicion at half the rate. Sprinting knocks it down. Then a cooldown.
  hoodie: { sec: 12, cooldownSec: 25, noticeMult: 0.5 },
  // Energy drink: a longer stamina bar (and faster refills) for a while
  energy: { boostSec: 60, maxMult: 2, rechargeMult: 1.5 },
  keyboard: { aimTurnRate: 1.8, aimPowerRate: 0.9, startPower: 0.55 },   // arrow-key aiming: radians/s and power/s
  camera: {
    fov: 75,                      // wide, to help with corner blindness
    height: 3.0,                  // slightly raised
    distance: 4.4,
    lookAhead: 2.4, lookHeight: 1.0,
    followRate: 2.0,              // how fast the camera swings back behind the kid
    manualHoldSec: 1.4,           // after a look-drag, wait this long before auto-following again
    dragSensitivity: 0.0065,
    wallMargin: 0.35, minDistance: 1.3,
  },
  joystick: { radiusPx: 60, deadZone: 0.12 },

  crowd: {
    count: 150,                   // across both floors; try other sizes with ?crowd=N in the URL (20-250)
    cullDistance: 46,             // kids farther than this (in the fog) or out of view aren't drawn at all
    detailEvery: 10,              // step 62: one kid in this many gets the full character model (outfit, hair, the works) up close
    detailDist: 22,               //   ...within this distance of the camera; farther away they're drawn like everyone else
    speedMin: 1.0, speedMax: 1.8, radius: 0.3,
    leaveStartFrac: 0.12,         // during passing, students head into class between these
    leaveEndFrac: 0.92,           //   fractions of the passing period
    tardyRushSpeed: 3.4,          // stragglers hurry in when the tardy bell rings
    floodSpreadSec: 3.0,          // after the period bell, students pour out over this many seconds
    coverRadius: 2.6,             // students this close to you count as cover...
    coverPerStudent: 0.2,         // ...each one cuts detection speed: rate / (1 + n * this). (Was 0.35 with 60 kids; more kids, less each)
  },

  detection: {
    suspicionRate: 1.1,           // meter per second at point-blank range, no cover (was 1.7 before step 27)
    farRateFrac: 0.35,            // fraction of that rate at the edge of vision range
    decayRate: 0.6,               // meter drain per second when not seen
    instantRange: 1.3,            // closer than this and in the cone = spotted immediately
    passingBeatMult: 4.5,         // passing period: "did I just see that?" takes this much longer (was 2.6 before step 27)
    suspiciousSlow: 0.25,         // patrol speed multiplier while squinting at you
    chaseSightRangeMult: 1.4,     // once chasing, they track you this much farther (no cone needed)
    catchRadius: 0.85,
    searchSec: 3.5,               // how long they hunt around your last seen spot
    predictSec: 1.1,              // they guess where you went: last seen + velocity * this
  },

  interact: {
    range: 2.4,                   // how close you must be to tap or walk into a hiding spot
    tapRadiusPx: 90,              // generous: fingers are imprecise and you're usually moving
    tapMaxMovePx: 14, tapMaxMs: 350,   // a touch that moves less than this, this quickly, is a tap
    walkInDist: 0.62,             // how close to the wall counts as "walking into" a spot
    walkInPushSec: 0.18,          // push into it this long to enter
    tagRange: 6.5,                // name tags show within this distance
    stairsTapRange: 4.5,          // step 55: stairs answer taps from farther away (the camera sits behind you, so doors look close)
  },
  hiding: {
    lockerUsesPerPeriod: 3,       // shared by all lockers
    // Restrooms: no timer. When staff walk past one, about half the time they stick their head in to check.
    // A check while you're inside is a close call; the third check in one stay, they find you.
    restroomCheck: { chance: 0.5, passRange: 3.5, cooldownSec: 25, peekSec: 1.6, foundAfter: 3 },
    subsPerDay: [1, 2],           // how many classrooms get a substitute each day (min, max)
    bustPauseSec: 0.9,            // monitor pauses after yanking you out ("I saw you go in there")
    bootGraceSec: 1.2,            // after being booted, you can't be caught for this long
  },

  items: {
    slots: 4,
    pickupRange: 2.6,             // how close you must be to tap an item lying around
    maxLying: 24,                 // things lying around stay until staff clean them up; past this many, the oldest get swept away
    aimTimeScale: 0.2,            // step 43: slow motion while you line up a throw by hand (was 0.5)
    aimEaseSec: 0.18,             // how fast it slides into and out of slow motion (real seconds)
    flickFullFrac: 0.32,          // a drag this long (fraction of the screen's short side) is a full-power throw
    minFlickPx: 22,               // shorter than this counts as a tap (cancels the throw)
    diminish: 0.6,                // each repeat of the same havoc in one period is worth this much of the last
    blinkSec: 5,                  // recoverable items blink for this long before they vanish
  },

  // Staff tidy up: anything lying in the halls that a staff member walks past (and sees) gets picked up.
  // Traps (banana peels, whoopee cushions, slime) aren't noticed until they go off; whoever set one off
  // cleans it up once they're back on their feet.
  tidy: {
    noticeRange: 6,               // how far away staff notice something lying around (it also has to be in their cone)
    pickupSec: 1.2,               // how long they stand there picking it up ("Who left this here?")
    afterTrapSec: 1.0,            // after setting off a trap: this long (after any stun) before they pick it up
  },
  // Lockers: hide in one, and you can rummage through it once per period. It's a blind grab: you might get junk.
  lockers: {
    rummageSec: 2,                // eats this much of your hiding time
    // Burst out: slam the door open. Staff close by are stunned and you get a head start, but the locker's busted
    // for the rest of the day. Only while you've still got locker time left.
    burst: { radius: 4.5, stunSec: 3, graceSec: 1.2, points: 75, noiseRadius: 12 },
    // Step 79: a rummage picks the kind of thing first, then the item, so new items in one kind don't crowd out the pranks.
    // (Bananas and whoopee cushions: about 1 in 10 rummages each, up from about 1 in 16.)
    kinds: {
      prank:  [0.47, [["spitball", 4], ["whoopee", 3], ["bananaPeel", 3], ["paperAirplane", 3], ["rubberChicken", 1.5], ["kickMe", 1]]],
      sports: [0.2,  [["basketball", 1.5], ["football", 1], ["frisbee", 1.5], ["skateboard", 1.5]]],
      snack:  [0.15, [["gum", 2], ["energyDrink", 1]]],
      junk:   [0.2,  [["oldSock", 1], ["sandwich", 1], ["homework", 1]]],
    },
  },
  // Step 79: during passing periods a kid near you sometimes drops a banana peel (for you to pick up)
  peelDrops: { everySec: [14, 26], maxLying: 2, range: [3, 10] },

  rooms: {
    grabSec: 1.5,                 // grabbing an item off a desk eats this much of your hiding time (subs: see TEACHER_TYPES)
    minStaySec: 4,                // step 56: sneak back into a room and you get the rest of its clock, but at least this long
    raidLockPeriods: 2,           // grab anything from a room and its door is locked for this many periods (no restock either)
    hideCheck: {                  // step 44: sneaking in, and each grab, is a roll against the teacher's hideChance
      grabRisk: 0.5,              // step 47: a grab is half as risky as walking in...
      grabPenalty: 0.06,          // ...plus this much more for each grab before it in the same visit
      hoodBonus: 0.1,             // hood up: a little easier
      min: 0.1, max: 0.97,
      lockPeriods: 3,             // spotted: the room's locked this period and the next two
      lines: ["\"Can I help you?\"", "\"Are you confused about how school works?\"", "\"Excuse me, does this look like a hotel?\"", "\"SECURITYYYY!\"",
              "\"You're not on my roster.\"", "\"Hi. Who are you?\""],
      subLines: ["\"Um... are you in this class? I'm calling someone.\"", "\"Hey! Hey, you! ...Security?\""],
      officeLines: ["\"Do you have an appointment? No? SECURITY.\"", "\"Excuse me! That's staff only!\""],
    },
  },

  // Step 45: your kid's stats, 0-20 (10 = the game as it was). Each number is the change at 20 (or the opposite at 0).
  stats: {
    stealth:  { vision: 0.15, cone: 0.15, notice: 0.3, hide: 0.15,     // staff see 15% less far, 15% narrower, notice 30% slower; +15% room hide checks
                restroomCheck: 0.3 },                                  // step 49: staff walking past check the restroom 30% less often
    speed:    { move: 0.15, stamina: 0.25 },                           // walking, sprinting, wheelie chair, skateboard; sprint lasts and refills 25% better
    strength: { throw: 0.1, stun: 0.3, burstRadius: 0.2,               // throws 10% faster (about 20% farther), stuns 30% longer, bigger locker burst
                shove: 0.5,                                            // step 49: kids push you back half as much (at 0: half again more)
                extraSlotAt: 15 },                                     // step 49: strength 15+ carries a fifth item
  },

  // Short-term heat, 0-100: "they know it's me". Like a GTA wanted level.
  // Step 74: one heat level, shown as 0-5 stars (like a wanted level). It only goes up when staff SEE you do
  // something. Each star adds pressure; it cools off when nobody's on to you, drops some at each bell, and resets overnight.
  heat: {
    stars: [12, 30, 50, 70, 90],  // heat (0-100) for 1..5 stars
    seenHavocMult: 0.25,          // seen doing havoc: heat += the points it earned * this...
    seenHavocMax: 20,             // ...but no more than this per event...
    seenLoud: 5,                  // ...plus this if it was loud
    seenRunning: 10,              // a chase starts (you were seen running away)
    roomCall: 12,                 // a teacher calls security on you
    bellDrop: 0.4,                // each bell takes away this fraction
    hiddenCoolPerSec: 1.5,        // cooling while hidden, to reward patience
    calmCoolPerSec: 0.4,          // slow cooling any time nobody's chasing, searching or squinting at you
    maxRisePerSec: 30,            // heat can't climb faster than this, so one mistake can't blow past every star at once
    shooHeat: 12,                 // caught in a passing period at 0 stars: no strike, just shooed to class (and a star)
    vision: [0.72, 0.8, 0.9, 1, 1.12, 1.25],   // staff vision cones (width and reach) at 0..5 stars; today's size at 3
    noticePerStar: 0.08,          // and they notice you this much faster per star
    radioEverySec: 10,            // at 5 stars: this often, the two nearest staff are radioed where you are
    extraLeaveSec: 6,             // extra staff (from stars) head home this long after your heat drops below their star
  },
  // Rebel run (survival mode): the fire alarm. On top of 5 stars: staff stay on high alert, heat never drops, more
  // staff keep arriving, and you score double until you're caught. Getting caught ends the run.
  survival: {
    scoreMult: 2,
    staffEverySec: 8,             // another staff member shows up this often...
    maxStaff: 14,                 // ...up to this many
    arrivals: ["securityGuard", "hallMonitor", "securityGuard", "principal"],   // who shows up, in this order (then repeats)
    radioEverySec: 12,            // this often, the two nearest staff get radioed your rough location
  },
  // Chaos events: big, loud, once-a-day interactables. Data, so a new one is one entry.
  fireAlarm: {
    points: 500,
    sec: 30,                      // how long it rings
    stunSec: 3.5,                 // every staff member is stunned (hands over ears) this long
    items: 8,                     // items scattered around the halls; they don't vanish until picked up
  },
  flood: { points: 400, noiseRadius: 16 },
  dares: { max: 3, recentAvoid: 6 },   // dares you can hold at once; don't re-offer the last few you finished   // flooding a bathroom: points, heat, and that bathroom is closed for the day

  // Friends in the crowd raise a hand during passing periods: tap their bubble.
  friends: {
    count: 4,
    offerRange: 9,                // bubbles show within this distance (and line of sight)
    interactRange: 2.6,           // ...but you have to be this close to take them up on it
    offers: [["highFive", 3], ["gumTrade", 2], ["dare", 1.5]],   // step 70: friends dare you too   // fake passes now come from gum trades (and the principal's office)
    gumTradePoints: 150,          // trading gum pays well, and it's the main way to get a fake pass
    highFivePoints: 75,           // "meeting a friend" risk bonus
    cooldownSec: 20,
  },
  airplanes: { everySec: [5, 10], catchRadius: 1.1, catchPoints: 10 },   // kids throwing paper airplanes during passing
  // Risk scoring. One score number; these multiply it or add flat bonuses.
  scoring: {
    streakStepSec: 15, streakStep: 0.25, streakMax: 3,   // unseen streak: +0.25x per 15 s nobody has eyes on you, up to 3x
    nearMissRadius: 2.2,          // a staff member this close who DOESN'T see you...
    nearMissSec: 5, nearMissMult: 2, nearMissCooldownSec: 8,   // ...doubles your points for 5 s
    hidingNearRadius: 4, hidingNearPerSec: 8,   // hiding with staff this close: points per second, per staff member
  },

  // Ads. No ad network is wired up yet: "placeholder" shows a fake ad screen so the flow can be tested.
  // Interstitial at most once per day, only between days or after a strike, never mid-run. Rewarded ads are always optional.
  ads: {
    enabled: true,
    provider: "placeholder",      // swap for a real network in Ads.show() (check its child-directed policy first)
    interstitialsPerDay: 1,
    placeholderSec: 4,
    forgeNotePerDay: 1,           // rewarded: erase a strike
    fakePassPerDay: 1,            // rewarded: start tomorrow with a fake pass
  },
  restroomRolls: 2,               // step 66: rolls of toilet paper in each restroom, each period
  barkSec: 1.8, barkCooldownSec: 3,   // staff speech bubbles
  // Step 71: kids in the crowd say things now and then (KID_LINES), and react when something happens to them.
  chatter: { everySec: [3.5, 6.5], max: 2, range: 13, sec: 3.6, quietSec: 10, nearPlayer: 3 },   // step 76: fewer, and up longer (was every 1.2-2.6 s, 3 at once, 2.8 s)
  // Step 76: the school day has a start and an end. Kids stream in the front doors (or up the stairs) in the morning;
  // after the last bell everyone heads for the exit, and so do you.
  morning: { streamSec: 12, extraPassingSec: 8 },   // arrivals spread over this long; the first passing period is this much longer
  dismissal: { sec: 40, exitRadius: 2.2, leaveFrac: [0.1, 0.55] },   // get out before the doors close (or it's a strike)

  footsteps: { hearRange: 20, patrolInterval: 0.55, chaseInterval: 0.3, volume: 0.55 },

  strikes: {
    max: 3,
    warningSceneSec: 2.6,         // strike 1: "you better get to class"
    officeSceneSec: 3.4,          // strike 2: the office
    afterStrikeGraceSec: 6,       // after a strike scene, staff can't see you for this long (was 3 before step 35)...
    catcherIgnoreSec: 20,         // ...and whoever caught you ignores you for this long ("Now get to class!")
    shooGraceSec: 4, shooIgnoreSec: 12,   // the same after a no-strike "get to class!" in a passing period
    alert: { vision: 1.2, notice: 1.4, speed: 1.1 },   // after strike 2, staff stay this much sharper for the rest of the day
  },
  backup: { range: 60, maxResponders: 2 },   // a radio call / yell pulls this many nearby staff toward you
  pa: { showSec: 4.5, sameKindCooldownSec: 12 },
  render: { maxPixelRatio: 1.75, coneRays: 28, anisotropy: 4 },   // anisotropy: keeps floor and ceiling textures sharp at a slant
};

if (URLQ.has("crowd")) CFG.crowd.count = Math.max(20, Math.min(250, parseInt(URLQ.get("crowd"), 10) || CFG.crowd.count));

// Staff are data: adding a type later (principal) is one entry here.
const CAMP_LINES = ["I can wait.", "I know you're in there.", "Take your time. I've got all day.", "Any minute now...", "*taps foot*"];
const STAFF_TYPES = {
  hallMonitor: {
    name: "hall monitor",
    patrolSpeed: 2.0, chaseSpeed: 3.7,
    visionRange: 9, visionHalfAngleDeg: 50,   // slow, wide vision cone
    sweepDeg: 25, sweepRate: 0.9,             // looks side to side while patrolling
    notice: 1.0,                              // how fast suspicion builds (multiplier)
    routes: ["outer", "outer2", "eight", "eight2", "top", "top2", "bottom", "bottom2"],   // fixed patrol loops, handed out in this order (alternating floors)
    vestColor: 0xe8c547, hatColor: 0x2c3e66, scale: 1.12,
    caughtLine: "\"You better get to class.\"",
  },
  securityGuard: {
    name: "security guard",
    patrolSpeed: 2.5, chaseSpeed: 4.8,        // faster than you (4.3)...
    sprintSec: 5, windedSec: 3, windedSpeed: 2.6,   // ...but only for a few seconds at a time
    visionRange: 13, visionHalfAngleDeg: 28,  // narrow, long cone, like a flashlight
    sweepDeg: 35, sweepRate: 0.6,
    roamTurnSec: [6, 14],                     // roams: turns around every so often instead of a fixed loop
    notice: 1.3,
    callsBackup: true,
    vestColor: 0x26364f, hatColor: 0x111111, scale: 1.2,
    caughtLine: "\"Let's go, chief. Walk with me.\"",
  },
  principal: {
    name: "principal",
    patrolSpeed: 1.7, chaseSpeed: 3.5,        // slow...
    visionRange: 14, visionHalfAngleDeg: 40,  // ...but sees far
    sweepDeg: 30, sweepRate: 0.5,
    roamTurnSec: [10, 20],
    notice: 1.5,
    callsBackup: true, backupAll: true,       // spotting you summons every staff member
    vestColor: 0x3b3f4a, hatColor: null, scale: 1.22,
    caughtLine: "\"My office. Now.\"",
  },
  custodian: {
    name: "custodian",
    custodian: true,                          // cleans; never chases or catches you; radios you in if he sees you
    patrolSpeed: 1.7, chaseSpeed: 1.7,
    visionRange: 8, visionHalfAngleDeg: 45,
    sweepDeg: 30, sweepRate: 0.7,
    roamTurnSec: [8, 16],
    notice: 0.7,
    vestColor: 0x4f6d7a, hatColor: 0x2d3b45, scale: 1.1, coneColor: 0x9fd8ff,
    caughtLine: "\"Not my department, kid.\"",
  },
  roamTeacher: {   // step 77: a teacher on a free period, wandering the halls with a coffee
    name: "teacher",
    patrolSpeed: 1.8, chaseSpeed: 3.6,        // slower than you, but they'll try
    visionRange: 8, visionHalfAngleDeg: 40,
    sweepDeg: 40, sweepRate: 0.6,
    roamTurnSec: [8, 16],
    notice: 1.0, mug: true,
    vestColor: 0x8e5a9b, hatColor: null, scale: 1.08,
    caughtLine: "\"Hall pass? No? Inside. Now.\"",
  },
  postedGuard: {   // step 77: a guard posted for good (outside a restroom you flooded, or the office you raided)
    name: "security guard",
    stationary: true, noMug: true,
    visionRange: 9, visionHalfAngleDeg: 40,
    sweepDeg: 65, sweepRate: 0.45,
    notice: 1.2,
    alarmCooldownSec: 8,
    catchRange: 1.7,
    vestColor: 0x26364f, hatColor: 0x111111, scale: 1.2,
    caughtLine: "\"Saw that coming a mile away.\"",
  },
  hallTeacher: {
    name: "teacher",
    stationary: true,                          // stands at their classroom door
    visionRange: 6, visionHalfAngleDeg: 35,   // (was 7.5 m and 45° before step 32)
    sweepDeg: 70, sweepRate: 0.5,              // slowly looks up and down the hall
    notice: 0.9,
    alarmCooldownSec: 9,                       // after yelling for backup, a breather before the next yell
    catchRange: 1.3,                           // walk right past them and they'll grab you
    vestColor: 0x8e5a9b, hatColor: null, scale: 1.08,
    caughtLine: "\"Hall pass? No? Inside. Now.\"",
  },
};

// The PA announcer. Placeholder jokes: Alexander will punch these up. {hall}, {n} and {d} get filled in.
const PA_LINES = {
  start:      ["Good morning, students. Please proceed to your first-period class.", "Reminder: hallways are for passing, not loitering."],
  guardOnDuty:["Security is now patrolling the halls. He has had his coffee.", "Attention: Officer Dale is on duty. Please do not make eye contact."],
  backup:     ["Security to the {hall}. Security to the {hall}.", "All available staff, please check the {hall}."],
  teacherOut: ["Teachers, please stand at your doors during this period.", "Faculty reminder: hall duty is mandatory. Yes, Mr. Kowalski, you too."],
  strike1:    ["Attention staff: keep an eye out for a student in a gray hoodie.", "A reminder that skipping class is against school policy. Looking at you, gray hoodie."],
  strike2:    ["Will the student in the gray hoodie report to the main office. Oh. You're already here.", "Staff, please remain on high alert for the rest of the day."],
  lastStrike: ["One more and we're calling home.", "Gray hoodie, this is your final warning."],
  sweep:      ["Custodial reminder: restrooms are not study halls."],
  lastPeriod: ["Sixth period, everyone. Almost there. Some of you more than others."],
  newDay:     ["Good morning! It's day {d}. Security has been, quote, 'beefed up.'", "Welcome to day {d}. Staff have been briefed about a certain hoodie."],
  runOver:    ["Gray hoodie, your parents are on line two."],
  principalOut: ["This is Principal Hargrove. I will personally be walking the halls today.", "Good news, students: your principal is joining you in the hallways. Bad news: so is your principal."],
  principalSpots: ["ALL STAFF. I HAVE EYES ON THE HOODIE. {hall}.", "Everyone to the {hall}. Now."],
  heatHigh:   ["Attention staff: you may now detain students in the halls between classes.", "Staff, eyes open during passing periods. You know who you're looking for."],
  securityUp: ["We've had reports of... noises. All staff, stay alert.", "Whoever is responsible for the whoopee cushions: we will find you."],
  survival:   ["This is your principal speaking. Today, the hoodie goes down.", "All staff: gray hoodie. Find them. I don't care how."],
  fireAlarm:  ["This is NOT a drill. Please exit the building in an orderly... why is everyone running TOWARD the hallway?", "Fire alarm. Teachers, lock your classrooms. Students, walk. WALK."],
  flood:      ["Custodial to the boys' room. Bring the big mop. And a snorkel.", "Attention: the restroom is closed. Do not ask why. We know why."],
};

// ---- Humor tables. Placeholder jokes: Alexander will punch these up. ----
const BARKS = {   // speech bubbles over staff heads
  hallMonitor:   { suspicious: ["Hmm?", "Is that...?", "*squints*"], chase: ["HEY!", "Walking! WALKING!", "Stop right there!"],
                   search: ["Where'd you go...", "I know you're here."], giveUp: ["Kids these days.", "Must've been nothing."],
                   slip: ["WHOA—", "My back!"], bust: ["I SAW that.", "Nice try."], tidy: ["Who left this here?", "Unbelievable.", "*sigh* Kids."], check: ["Hey, do you kids have a pass?", "Anybody in here?"] },
  securityGuard: { suspicious: ["...", "Movement."], chase: ["Code gray hoodie!", "Freeze!"], search: ["Come out, come out..."],
                   giveUp: ["Copy. Lost visual."], slip: ["Man down!"], winded: ["*wheeze*", "Gimme... a sec..."], bust: ["Gotcha."], tidy: ["Confiscated.", "Evidence."], check: ["Hey, do you kids have a pass?", "Security. Everybody out."] },
  custodian:     { suspicious: ["Hm.", "*squints*"], tidy: ["Every. Single. Day.", "Kids these days.", "*mutters*", "Who raised you?"],
                   slip: ["Oof! My knees!", "Not again..."], radio: ["Got a kid out here!", "Yeah, I see one. Over.", "Somebody come get this one."] },
  hallTeacher:   { suspicious: ["Excuse me?"], alarm: ["HALL PASS!", "Excuse me?!", "SECURITY!"] },
  roamTeacher:   { suspicious: ["Hm?", "Excuse me?"], chase: ["Young man! Young lady! Whoever you are!", "Stop right there!"], search: ["I know you're around here..."], giveUp: ["Not paid enough for this."] },
  postedGuard:   { suspicious: ["...", "I see you."], alarm: ["Not today.", "Backup to my post!", "Hey! HEY!"] },
  principal:     { suspicious: ["Mm-hm."], chase: ["YOUNG PERSON!", "MY OFFICE!"], search: ["Hiding won't help."],
                   giveUp: ["This isn't over."], slip: ["Who put this here?!"], bust: ["Out. Now."], tidy: ["In MY school?", "Disgraceful."], check: ["Hey, do you kids have a pass?", "I know someone's in here."] },
};
// Step 71: what kids in the crowd say. idle: just talking (silly, or school lore); the rest are reactions.
const KID_LINES = {
  idle: [
    "The Goblins lost 63 to nothing. SIXTY-THREE.", "Our quarterback threw a touchdown. For the other team.",
    "The Goblins mascot quit. The MASCOT.", "Homecoming's Friday. We're gonna get destroyed.", "Go Goblins! ...said nobody, ever.",
    "Coach says we're 'rebuilding.' We've been rebuilding since 2009.",
    "Officer Dale eats lunch in his car. Alone. Every day.", "Officer Dale named his Segway. It's 'Justice.'",
    "Saw Officer Dale at the mall food court. Eating a pretzel. Sadly.", "Officer Dale's ringtone is a police siren. Unironically.",
    "Principal Hargrove irons his socks.", "Hargrove's idea of a party is dusting the trophy case.",
    "Hargrove said 'yeet' at the assembly. I'm still not okay.", "Hargrove has a framed photo of his parking spot.",
    "Mr. Kowalski's had the same tie since 1998.", "Spirit Week? I have zero spirit.",
    "They say the hoodie kid has never been to a single class.", "Somebody slimed a hall monitor. Legend.",
    "Who keeps leaving whoopee cushions everywhere?", "The cafeteria pizza was blue today. BLUE.",
    "The vending machine ate my dollar. Again.", "I have a test. I didn't study. Vibes only.",
    "No cap, this hallway smells like feet.", "That's so mid.", "It's giving... detention.", "Lowkey starving rn.",
    "Bro wore Crocs to gym.", "Can I copy your homework? I'll change it a little.", "I forgot my locker combo. Again.",
    "My backpack weighs more than me.", "The skeleton in the bio lab is haunted. For real.",
    "Mr. Bones from bio has better attendance than me.", "The custodian knows everything. EVERYTHING.",
    "Tom Riddle was framed, honestly.", "Somebody painted a goblin Mona Lisa. Iconic.",
    "My mom says no phone till I'm 30.", "The group chat is on FIRE right now.",
  ],
  gather: ["Somebody film this!", "OH MY GOSH", "This is going on my story!", "LOL", "No WAY!", "Best. Day. Ever.", "Get it on video!"],
  near: ["Aren't you supposed to be in class?", "You're gonna get caught, dude.", "Legend.", "Don't let Dale see you!", "Is that the hoodie kid?!"],
  hit: ["HEY!", "Not cool!", "Ow! What the—", "Who threw that?!", "My hair!", "Rude!"],
  gross: ["EW!", "Is that a SOCK?!", "I'm gonna hurl.", "That's so nasty!"],
  slip: ["WHOA—", "My phone!", "Ow ow ow...", "Who put that there?!"],
  stuck: ["My shoes!", "Is this SLIME?!", "I'm stuck! Help!"],
  stink: ["What is that SMELL?", "*gag*", "Who died?!", "My eyes are watering!"],
  scared: ["AAAH!", "RUN!", "SKELETON!", "NOPE NOPE NOPE"],
};
const CAUGHT_LINES = {   // strike 1, by who caught you
  hallMonitor:   ["\"You better get to class.\"", "\"Pass? No? Didn't think so.\"", "\"I'm writing this down. In pen.\""],
  securityGuard: ["\"Let's go, chief. Walk with me.\"", "\"I used to be fast like you.\"", "\"You have the right to remain in class.\""],
  hallTeacher:   ["\"Hall pass? No? Inside. Now.\"", "\"I will be emailing your parents. In ALL CAPS.\""],
  roamTeacher:   ["\"I was on my coffee break. Now I'm not.\"", "\"Hall pass? No? Inside. Now.\""],
  postedGuard:   ["\"I've been standing here ALL day for this.\"", "\"Saw that coming a mile away.\""],
  principal:     ["\"My office. Now.\"", "\"We've been expecting you.\""],
};
const OFFICE_RANTS = [
  "The vice principal yells for a solid minute about \"respect for the institution.\"",
  "The vice principal holds up your attendance record and just... sighs.",
  "The vice principal says \"disappointed\" eleven times. You counted.",
  "The vice principal shows you a chart. It's mostly you.",
];
const EXCUSES = ["My dog ate my schedule.", "I was looking for the nurse. The nurse was also looking for me.", "I'm on the hall decorating committee.",
  "Is this not the way to band?", "My locker ate my homework. And my shoe.", "I'm new. Since September.", "I was told to deliver this... nothing."];
const RUN_OVER_LINES = ["Your parents are on their way.", "Your mom is in the parking lot. She's doing the slow walk.", "They're calling it a \"conversation about choices.\""];
// The final screen depends on your heat when you're caught for good.
const RUN_ENDINGS = {
  normal: { title: "Run over!", lines: RUN_OVER_LINES },
  high:   { title: "Suspended!", lines: ["You've been suspended.", "You've been suspended. Three days. Your mom says it's not a vacation."] },
  maxed:  { title: "Expelled!", lines: ["Your mom is sending you to military school.", "Juvenile hall has a vacancy."] },
};
// Spray-paint graffiti. Plain strings are painted as text; the others have their own drawings (see drawGraffiti).
const GRAFFITI = [
  "I wuz hea", { draw: "coolS" }, "(He × Li × N) × Ne", "Skool is 4 Foolz", "officer dale is a dork", "I just lost the game",
  "√-1 2³ Σ π", "d/dt (my grades) < 0", { draw: "dontRead" }, "TARDY 4 LYFE", "LUNCH LADIES R HOT", "school | prison",
  { draw: "brick", text: "ANOTHER BRICK IN THE WALL" }, "sudo rm -rf /school", "BILLIONAIRE DROPOUTS CLUB", "SPICOLI WAS RIGHT",
  "TOM RIDDLE WAS FRAMED", "Tm with your mom", { draw: "heart" }, "THE EARTH IS A TORUS",
  // step 67: drawings
  { draw: "kilroy" }, { draw: "balloonGirl" }, { draw: "monaGoblina" }, { draw: "eye" }, { draw: "skull" }, { draw: "deadBunny" },
  { draw: "ankh" }, { draw: "peace" }, { draw: "yinYang" },
];
const LUNCHES = ["mystery tacos.", "rectangle pizza.", "the meatloaf (again).", "\"breakfast for lunch.\"", "chicken nuggets of uncertain origin.", "soup?"];

// Dares: a kid in the restroom hands these out, one per visit; you can hold CFG.dares.max at a time.
// Each is data: text, points, an optional setup (random room/period/hall), and which game events move it along.
// period: must be done in that period (fails after). scope "period": progress resets every bell. scope "day": fails at the end of the day.
const STAFF_ITEM = (item, staffKey) => (m, d) => d.item === item && d.staff === staffKey;
const DARES = {
  spitMonitor: { need: 3, points: 300, text: () => "Hit a hall monitor with a spitball 3 times", on: { hit: STAFF_ITEM("spitball", "hallMonitor") } },
  gumTrade:    { need: 1, points: 150, text: () => "Trade gum with a friend", on: { gumTrade: () => true } },
  loveNote:    { need: 1, points: 450,
                 setup(m) { const labs = SPOTS.filter((sp) => sp.roomType === "science" && !roomLocked(sp)); if (!labs.length) return false;
                   m.p.from = pick(labs).room; m.p.period = Math.min(periodsToday(), game.period + 1 + Math.floor(Math.random() * 2)); return true; },
                 text: (m) => m.p.mine ? `Get your love note to the gym during period ${m.p.period}` : `Get the love note from the science lab (room ${m.p.from}) to the gym during period ${m.p.period}` + (m.p.has ? " · 💌 got it" : ""),
                 on: { enterRoom: (m, d) => {
                   if (d.sp.roomType !== "gym" || !game.hotbar.some((it) => it?.key === "loveNote")) return false;
                   if (game.period !== m.p.period) { toast(`💌 Not yet: the note's for period ${m.p.period}.`); return false; }
                   consumeSlot(game.hotbar.findIndex((it) => it?.key === "loveNote")); return true; } } },
  tagHalls:    { need: 3, points: 350, text: () => "Tag 3 different hallways with graffiti", on: { tag: (m, d) => (m.got.includes(d.h) ? false : (m.got.push(d.h), true)) } },
  floodPeriod: { need: 1, points: 350,
                 setup(m) { if (!RESTROOMS.some((sp) => !sp.closed)) return false; m.p.period = Math.min(periodsToday(), game.period + Math.floor(Math.random() * 3)); return true; },
                 text: (m) => `Flood a bathroom during period ${m.p.period}`, on: { flood: (m) => game.period === m.p.period } },
  flyOver:     { need: 1, points: 250, text: () => "Fly something over 6 kids in one throw", on: { flyover: (m, d) => d.n >= 6 } },
  raidHall:    { need: 2, points: 400, scope: "day",   // step 70: two rooms (was every room on the hall)
                 setup(m) { const halls = [0, 3, 6]; m.p.h = pick(halls); m.p.rooms = SPOTS.filter((sp) => sp.kind === "classroom" && sp.h === m.p.h).map((sp) => sp.room); return m.p.rooms.length >= 2; },
                 text: (m) => `Raid 2 rooms on the ${HALLS[m.p.h].name} today`,
                 on: { raid: (m, d) => (m.p.rooms.includes(d.room) && !m.got.includes(d.room) ? (m.got.push(d.room), true) : false) } },
  combo:       { need: 3, points: 450, scope: "day", text: () => "Hit staff with 3 different things today",
                 on: { hit: (m, d) => (d.staff && !m.got.includes(d.item) ? (m.got.push(d.item), true) : false) } },
  chaseSlip:   { need: 1, points: 300, text: () => "Make a staff member slip (banana peel, mop bucket or a fizzy puddle)", on: { hit: (m, d) => d.slip && d.staff } },
  lureWhoopee: { need: 1, points: 250, text: () => "Get a staff member to sit... er, step on a whoopee cushion", on: { whoopee: (m, d) => !!d.staff } },
  slimeGuard:  { need: 1, points: 300, text: () => "Get a staff member stuck in slime", on: { hit: (m, d) => d.item === "slime" && !!d.staff } },
  cleanPeriod: { need: 1, points: 300, text: () => "Get through a whole skipping period without anyone chasing you",
                 on: { bell: (m, d) => d.clean && m.p.armed } },
  tpTrail:     { need: 1, points: 250, text: () => "TP the halls: leave a 12 m toilet-paper trail", on: { trail: (m, d) => d.len >= 12 } },
  kickGuard:   { need: 1, points: 350, text: () => "Stick a \"kick me\" sign on a staff member", on: { kickMe: (m, d) => !!d.staff } },
  geyserCrowd: { need: 1, points: 250, text: () => "Get 5 kids watching a fizzy-flask geyser", on: { geyser: (m, d) => d.n >= 5 } },
  officeRaid:  { need: 1, points: 250, text: () => "Steal something from the main office", on: { raid: (m, d) => d.type === "office" } },
  // step 70: more dares, mostly quick ones
  airplaneStaff: { need: 1, points: 200, text: () => "Bonk a staff member with a paper airplane", on: { hit: (m, d) => d.item === "paperAirplane" && !!d.staff } },
  grossOut:    { need: 1, points: 150, text: () => "Hit someone with an old gym sock or a moldy sandwich", on: { hit: (m, d) => d.item === "oldSock" || d.item === "sandwich" } },
  lockerHop:   { need: 3, points: 250, scope: "period", text: () => "Hide in 3 different lockers in one period",
                 on: { hide: (m, d) => (d.sp.kind === "locker" && !m.got.includes(d.sp) ? (m.got.push(d.sp), true) : false) } },
  burstStaff:  { need: 1, points: 350, text: () => "Burst out of a locker and knock down a staff member", on: { burst: (m, d) => d.n > 0 } },
  trumpetSolo: { need: 1, points: 200, text: () => "Play a trumpet solo in the halls", on: { trumpet: () => true } },
  plungerHead: { need: 1, points: 350, text: () => "Get a plunger stuck on a staff member's head", on: { hit: (m, d) => d.item === "plunger" && !!d.staff } },
  stinkThree:  { need: 1, points: 250, text: () => "Get 3 people to walk into the same stink cloud", on: { stink: (m, d) => d.n >= 3 } },
  bannerTP:    { need: 1, points: 250, text: () => "Drape toilet paper over a spirit banner", on: { tpBanner: () => true } },
  boneScare:   { need: 1, points: 300, text: () => "Scare 3 people with the skeleton on wheels", on: { skeleton: (m, d) => d.staff + d.kids >= 3 } },
  wetSign:     { need: 1, points: 200, text: () => "Turn a staff member back with a wet-floor sign", on: { wetSign: () => true } },
  highFives:   { need: 3, points: 200, scope: "day", text: () => "High-five 3 friends today", on: { highFive: () => true } },
  mopJam:      { need: 1, points: 250, text: () => "Jam a classroom door shut with a mop", on: { mopJam: () => true } },
  cardio:      { need: 4, points: 150, scope: "period", text: () => "Cardio day: take the stairs 4 times in one period", on: { stairs: () => true } },
  sneakIn:     { need: 2, points: 200, scope: "day", text: () => "Sneak into 2 classrooms today without getting spotted", on: { enterRoom: (m, d) => (d.sp.kind === "classroom" && d.sp.roomType !== "gym" && !m.got.includes(d.sp) ? (m.got.push(d.sp), true) : false) } },
};
const DARE_KID_LINES = ["Psst. Bet you can't", "Hey. You look bored. I dare you to", "Five bucks says you won't", "Legend says nobody's ever managed to"];

// Hiding spots are data: a new kind is one entry here (placement lives in LAYOUT).
const SPOT_TYPES = {
  locker:    { label: "Locker", halfW: 0.45, maxStaySec: 15,
               stayLine: "Cramped. Smells like old gym socks.", timeoutLine: "Too cramped! You tumble out." },
  restroom:  { label: "Restroom", halfW: 0.75, maxStaySec: 45,
               stayLine: "Staff passing by sometimes check the stalls. Keep your feet up.", timeoutLine: "Someone's pounding on the stall door. Time to go." },
  classroom: { label: "Room", halfW: 0.6 },   // stay time comes from who's teaching
  stairs:    { label: "Stairs", halfW: 0.75, maxStaySec: 99 },
  closet:    { label: "Custodian's closet", halfW: 0.7, maxStaySec: 30,
               stayLine: "Mops, buckets, a breaker box. Smells like bleach. The custodian checks in here now and then.", timeoutLine: "Keys jingling outside. Time to go." },
};
// Who's in the room. Step 44: walking in is a hide check (hideChance); so is every grab off a desk (a little harder each time).
// Get spotted and you're out, security's called and the room's locked for a few periods. Make it and you can stay bootSec.
const TEACHER_TYPES = {
  teacher: { label: "Teacher", bootSec: 15, silhouette: 0x2b2f3a, hideChance: 0.8,
             stayLine: "You slipped in behind the back row. The teacher's writing on the board.", bootLine: "\"Nice try. Out.\"" },
  sub:     { label: "Sub", bootSec: 20, silhouette: 0x3a7d44, hideChance: 0.95, grabSec: 0.75,
             stayLine: "The sub is reading a magazine. You're under a desk.", bootLine: "The sub finally looks up: \"Are you even in this class?\"" },
  office:  { label: "Secretary", bootSec: 12, silhouette: 0x7a4b8c, hideChance: 0.65,
             stayLine: "The secretary is on hold with the district. You duck behind the counter.", bootLine: "\"Do you have an appointment? No? Out.\"" },
};
// Rooms as shops: what's lying on the desks, by room type. A new room type is one line.
// Specialty items only come from their room (spray paint: art, balls and frisbees: the gym, stink bombs and slime: science).
// Ordinary classrooms have the everyday stuff, with rare finds: wheelie chairs are uncommon, hall passes very rare,
// a staff key extremely rare. always: put on the desk every time the room restocks (art always has spray paint).
const ROOM_TYPES = {
  classroom: { label: "", count: [1, 2],
               loot: [["spitball", 5], ["paperAirplane", 5], ["gum", 4], ["wheelieChair", 1.2], ["energyDrink", 1], ["hallPass", 0.35], ["masterKey", 0.12]] },
  // Ordinary classrooms, by subject: mostly for flavor (the sign over the door), with a little twist to each loot table
  math:      { label: "Math", plaque: 0x5dade2, count: [1, 2],
               loot: [["spitball", 6], ["paperAirplane", 4], ["gum", 4], ["wheelieChair", 1.2], ["energyDrink", 1], ["hallPass", 0.35], ["masterKey", 0.12]] },
  english:   { label: "English", plaque: 0xf5b041, count: [1, 2],   // all that essay paper: more paper airplanes
               loot: [["paperAirplane", 7], ["spitball", 4], ["gum", 4], ["wheelieChair", 1.2], ["energyDrink", 1], ["hallPass", 0.35], ["masterKey", 0.12]] },
  history:   { label: "History", plaque: 0xa0522d, count: [1, 2],
               loot: [["globe", 4], ["spitball", 4], ["paperAirplane", 4], ["gum", 3], ["wheelieChair", 1.2], ["energyDrink", 1], ["hallPass", 0.35], ["masterKey", 0.12]] },
  science:   { label: "Science lab", plaque: 0x2ecc71, loot: [["stinkBomb", 4], ["slime", 4], ["mentos", 3], ["skeleton", 1.5]], count: [1, 2] },
  art:       { label: "Art room", plaque: 0xe67e22, always: ["sprayPaint"], count: [1, 1],
               loot: [["kickMe", 3], ["paperAirplane", 3], ["glitterBomb", 2.5], ["gum", 3], ["spitball", 2], ["wheelieChair", 1]] },   // step 79: glitter bombs
  music:     { label: "Band room", plaque: 0x9b59b6, loot: [["trumpet", 3], ["bassDrum", 3], ["disguise", 1]], count: [1, 2] },   // (the drama club keeps its costumes in here)
  gym:       { label: "Gym", plaque: 0xe74c3c, loot: [["basketball", 4], ["football", 3], ["frisbee", 3], ["energyDrink", 2]], count: [1, 2] },
  // The office always has a hall pass and the staff key (restocked whenever the door's open again), but the secretary
  // is jumpy: if she catches you, she calls every staff member to the office and your heat jumps.
  office:    { label: "Main office", plaque: 0x34495e, door: 0x4a3426, staff: "office", count: [0, 0], loot: [], alarmHeat: 25,
               // specials: the confiscated drawer (points, once a day), a fake hall pass and the staff key (back whenever the room restocks)
               specials: { prize: { icon: "🗄️", label: "Raid the confiscated-stuff drawer", points: 300, daily: true },
                           fakePass: { icon: "🎫", label: "Swipe a hall pass" },
                           masterKey: { icon: "🔑", label: "Lift the staff key" } } },
};

// Items are data. kind: "throw" (flick it), "ride" (flick to launch yourself), "instant" (tap to use).
// hit: what happens when it hits someone. Hitting staff always pays more. Stun "flinch" = a stagger, "fall" = flat on the floor.
const ITEM_TYPES = {
  paperAirplane: { label: "Paper airplane", icon: "✈️", kind: "throw", recoverable: true, flight: "glide2", speed: [6, 11], pitchDeg: 8, gravity: 1.2, glide: true,
                   // two-stage flight: soars over heads (fly-over points), then drops to head height (can hit people)
                   cruiseY: 2.55, highSec: [0.45, 1.3], lowY: 1.35, sinkRate: 0.75, drag: 0.25,
                   perStudent: 10, crowdLandBonus: 50, crowdLandCount: 3,
                   hit: { student: 20, staff: 80, studentSec: 0.6, staffSec: 0.9, style: "flinch" } },
  // Same two-stage flight as the paper airplane, but it unrolls as it goes and leaves a streamer of toilet paper behind
  // (it stays until the custodian clears it overnight). From the restrooms.
  toiletPaper:   { label: "Toilet paper", icon: "🧻", kind: "throw", flight: "glide2", speed: [6, 10], pitchDeg: 8, gravity: 1.2, glide: true,
                   cruiseY: 2.85, climb: 8, highSec: [0.8, 1.8], lowY: 1.4, sinkRate: 0.8, drag: 0.3,   // high enough to clear the banner wires
                   perStudent: 10, crowdLandBonus: 30, crowdLandCount: 3, trailPointsPerM: 4, bannerPoints: 250,   // step 66: draped over a spirit banner
                   hit: { student: 15, staff: 60, studentSec: 0.5, staffSec: 0.8, style: "flinch" } },
  // Same idea again, but it stays up much longer and you can pick it back up. Gym only.
  frisbee:       { label: "Frisbee", icon: "🥏", kind: "throw", flight: "glide2", recoverable: true, speed: [9, 14], pitchDeg: 6, gravity: 1.2, glide: true,
                   cruiseY: 2.3, highSec: [1.0, 2.2], lowY: 1.3, sinkRate: 0.45, drag: 0.12,
                   perStudent: 8, crowdLandBonus: 30, crowdLandCount: 3,
                   hit: { student: 25, staff: 100, studentSec: 0.8, staffSec: 1.1, style: "flinch" } },
  spitball:      { label: "Spitball", icon: "🫧", kind: "throw", uses: 3, speed: [20, 30], pitchDeg: 4, gravity: 4.5,
                   hit: { student: 25, staff: 75, studentSec: 0.5, staffSec: 1, style: "flinch" } },
  bananaPeel:    { label: "Banana peel", icon: "🍌", kind: "throw", speed: [2, 4.5], pitchDeg: 35, gravity: 9.8,
                   maxSlips: Infinity,   // stays down (each person slips once) until the custodian cleans it up
                   slipStaffSec: 3.1, slipStudentSec: 1.2, slipPlayerSec: 0.8, staffPoints: 150, studentPoints: 30 },
  whoopee:       { label: "Whoopee cushion", icon: "💨", kind: "throw", recoverable: true, trap: true, speed: [3, 8], pitchDeg: 35, gravity: 9.8,
                   noiseRadius: 14, points: 50 },   // goes off when someone steps on it (you too)
  basketball:    { label: "Basketball", icon: "🏀", kind: "throw", recoverable: true, speed: [5, 11], pitchDeg: 30, gravity: 9.8,
                   bounces: [6, 8], restitution: 0.72, noiseRadius: 10, bouncePoints: 5,
                   hit: { student: 35, staff: 140, studentSec: 1.2, staffSec: 2.2, style: "fall", minSpeed: 2 } },
  football:      { label: "Football", icon: "🏈", kind: "throw", recoverable: true, speed: [8, 15], pitchDeg: 26, gravity: 9.8,
                   bounces: [4, 7], restitution: [0.45, 0.85], erratic: 1.3,   // each bounce turns it up to ±1.3 rad, at a random bounciness
                   noiseRadius: 10, bouncePoints: 6,
                   hit: { student: 35, staff: 140, studentSec: 1.2, staffSec: 2.2, style: "fall", minSpeed: 2 } },
  // Step 68: the three science-lab items are flasks (yellow, green, red). The flask breaks: only the mess is left.
  rubberChicken: { label: "Rubber chicken", icon: "🐔", kind: "throw", recoverable: true, speed: [4, 10], pitchDeg: 28, gravity: 9.8,   // step 80: lockers
                   points: 20, lureRadius: 13 },   // squawks where it lands: staff nearby go and check it out. Pick it up and throw it again.
  disguise:      { label: "Disguise kit", icon: "🥸", kind: "disguise", sec: 20, noticeMult: 0.5 },   // step 80: the theater kid's trick. Heat drops a star,
                                                                                                // chasers lose you, and for a while you're harder to notice
  glitterBomb:   { label: "Glitter bomb", icon: "✨", kind: "throw", speed: [4, 9], pitchDeg: 30, gravity: 9.8,   // step 79: art rooms (and the fabulous kid)
                   points: 30, fogRadius: 2.6, fogSec: 9, noiseRadius: 6 },   // a big sparkly cloud nobody can see into or through
  stinkBomb:     { label: "Stink bomb", icon: "🟡", flask: "stink", kind: "throw", speed: [4, 9], pitchDeg: 30, gravity: 9.8,   // science labs only
                   points: 60, cloudRadius: 3.2, cloudSec: 10, noiseRadius: 12,
                   perStudent: 15, perStaff: 60, studentGagSec: 1.4, staffGagSec: 2.2, playerGagSec: 0.7 },   // walk into it: you stop and gag (and pay out)
  // Science labs: lands as a puddle (or on whoever it hits). The first few people to step in it are stuck for a few
  // seconds: staff can still look around and yell, they just can't move.
  slime:         { label: "Slime", icon: "🟢", flask: "slime", kind: "throw", trap: true, speed: [4, 9], pitchDeg: 25, gravity: 9.8,
                   radius: 1.4, maxSticks: Infinity, stickStaffSec: 6, stickStudentSec: 3.5, stickPlayerSec: 2, staffPoints: 120, studentPoints: 30 },
  // Stick it on a staff member's back (get right up behind them; if they're facing you, they catch on). During a passing
  // period the kids crowd round laughing and pen them in until the tardy bell. Stick it on during class and it waits.
  kickMe:        { label: "\"Kick me\" sign", icon: "🦵", kind: "sign", range: 1.4, points: 400, penKids: 9, penPoints: 100,
                   kidPoints: 150, kidSec: 9, kidCrowd: 7 },   // on a kid: they're stuck in a ring of laughing kids for a while
  // Science labs: lands upright, fizzes for a moment, then a geyser. Loud (staff come to look), kids crowd round to watch
  // (cover for you), and anyone standing in the spray gets soaked. Step 68: the fizzy flask (was Mentos & soda; same save key).
  // The geyser leaves a sticky red pool: everyone slips in it once, until the custodian mops it up.
  mentos:        { label: "Fizzy flask", icon: "🔴", flask: "fizzy", kind: "throw", speed: [3, 6.5], pitchDeg: 30, gravity: 9.8, mess: true,
                   trapRadius: 1.5, slipStaffSec: 2.4, slipStudentSec: 1.2, slipPlayerSec: 0.8, staffPoints: 110, studentPoints: 20,
                   fuseSec: 1.2, geyserSec: 4, points: 150, noiseRadius: 18, watchRadius: 14, watchKids: 10, watchSec: 9, perWatcher: 6, sprayRadius: 2.2,
                   hit: { student: 20, staff: 80, studentSec: 0.8, staffSec: 1.5, style: "flinch" } },
  // Step 69: science labs (rare). Roll it out (aim like the bass drum): when it gets near someone, or stops, everyone
  // close by (staff and kids) runs away screaming for a few seconds. One scare per day: after that the whole school's
  // wise to it and it's just a prop (the custodian wheels it away), and the labs don't put another one out.
  skeleton:      { label: "Skeleton on wheels", icon: "💀", kind: "throw", roll: true, upright: true, speed: [2.5, 6], friction: 0.45, radius: 0.5, ballR: 0.35,
                   triggerRange: 2.6, scareRadius: 7, scareSec: 3.5, staffPoints: 150, studentPoints: 10, points: 100, noiseRadius: 6, rumbleSec: 0.5 },
  loveNote:      { label: "Love note", icon: "💌", kind: "note" },   // for the love-note dare: can't be thrown, just delivered
  sprayPaint:    { label: "Spray paint", icon: "🎨", kind: "spray", uses: 3, points: 100, wallRange: 1.7 },   // art rooms only
  masterKey:     { label: "Staff key", icon: "🔑", kind: "key", uses: 3 },
  hallPass:      { label: "Hall pass", icon: "🎫", kind: "pass" },   // grab it and it's your fake pass (cancels your next catch)
  // Push off and roll. Left/right steers a little, but steering scrubs off speed; too slow and you roll to a stop.
  // Jump off (button, E or Space) to skip the crash: the chair rolls on without you and can still flatten someone.
  wheelieChair:  { label: "Wheelie chair", icon: "🪑", kind: "ride", rideSpeed: 9.5, maxRideSec: 3.5, dazeSec: 1.5, leftoverSec: 3,
                   studentPoints: 40, steerRate: 1.7, steerDrag: 4.5, minSpeed: 3.5, jumpSec: 0.35, emptyFriction: 0.5, emptyStaffPoints: 150, emptyStaffSec: 2.2 },
  // Band room. The trumpet: one big blast and every free staff member heads for where you're standing. Lots of points, some heat.
  trumpet:       { label: "Trumpet", icon: "🎺", kind: "instrument", uses: 2, points: 350, heat: 8 },
  // Band room. The bass drum: rolled along the floor like a bowling ball, it knocks over everyone in its path and keeps going.
  // Loud as it rumbles along (staff turn to look). Pick it back up once it stops.
  bassDrum:      { label: "Bass drum", icon: "🥁", kind: "throw", roll: true, recoverable: true, speed: [4.5, 9], friction: 0.35, radius: 0.75,
                   noiseRadius: 8, rumbleSec: 0.6,
                   hit: { student: 30, staff: 160, studentSec: 1.6, staffSec: 3, style: "fall", minSpeed: 1.2 } },
  // History rooms. Rolls like the bass drum, but it's smaller: it knocks over the first person it hits and stops.
  globe:         { label: "Globe", icon: "🌍", kind: "throw", roll: true, single: true, recoverable: true, speed: [5, 10], friction: 0.6, radius: 0.5, ballR: 0.3,
                   noiseRadius: 5, rumbleSec: 0.8,
                   hit: { student: 30, staff: 130, studentSec: 1.5, staffSec: 2.6, style: "fall", minSpeed: 1.2 } },
  // Custodian's closet. Jam a classroom door shut with it: the teacher's stuck inside until the custodian frees them.
  mop:           { label: "Mop", icon: "🧹", kind: "mop", range: 2.6, points: 200 },
  // The custodian's: he sets two out around a wet mess while he cleans it. Steal one and set it down: staff walking their
  // rounds (not suspicious, not chasing) turn around when they see it. Staff who are onto you ignore it.
  wetFloor:      { label: "Wet floor sign", icon: "⚠️", kind: "place", turnRange: 4.5, points: 30 },
  // Kick it over: a big puddle everyone slips on (each person once) until the custodian mops it up.
  mopBucket:     { label: "Mop bucket", icon: "🪣", kind: "throw", trap: true, mess: true, speed: [2.5, 5], pitchDeg: 25, gravity: 9.8, trapRadius: 1.7,
                   slipStaffSec: 2.6, slipStudentSec: 1.3, slipPlayerSec: 0.8, staffPoints: 120, studentPoints: 20 },
  // Hits someone: it sticks on their head and they stumble around blind, bumping into people. Misses: it sticks to the wall.
  plunger:       { label: "Plunger", icon: "🪠", kind: "throw", recoverable: true, speed: [9, 15], pitchDeg: 6, gravity: 6, blindSec: 12, blindSpeed: 2.6,
                   staffPoints: 200, studentPoints: 25, bumpPoints: 20, studentSec: 1.8 },
  // Lockers. Tap to hop on (tap again, the 🛹 button or Space to hop off). Fast and floaty; staff notice a kid on a board quicker.
  // Kids in the way go flying. Staff or a wall at speed: you go flying, and the board ends up on the floor (kids love skateboards).
  skateboard:    { label: "Skateboard", icon: "🛹", kind: "board", recoverable: true, speed: 6.8, accel: 3.2, coast: 0.5, noticeMult: 1.4,
                   kidSec: 1.2, kidPoints: 20, staffSec: 2.4, staffPoints: 120, crashDaze: 1.2, wallCrashSpeed: 4.5 },
  energyDrink:   { label: "Energy drink", icon: "⚡", kind: "drink" },   // tap to drink: see CFG.energy
  gum:           { label: "Gum", icon: "🍬", kind: "instant", points: 100, line: "You stick gum under the water fountain. Gross. +havoc" },
  // Junk from lockers. Step 48: the sock and the sandwich throw like a spitball (heavier, so they arc more), one throw each.
  // A hit is gross and worth a bit more; whatever they hit, they drop to the floor (pick the sock back up; the custodian gets the sandwich).
  oldSock:       { label: "Old gym sock", icon: "🧦", kind: "throw", junk: true, direct: true, recoverable: true, speed: [13, 21], pitchDeg: 8, gravity: 7,
                   hitLine: "Sock to the face! Ew!", hit: { student: 30, staff: 90, studentSec: 0.7, staffSec: 1.2, style: "flinch" } },
  sandwich:      { label: "Moldy sandwich", icon: "🥪", kind: "throw", junk: true, direct: true, speed: [12, 19], pitchDeg: 9, gravity: 7.5,
                   hitLine: "Moldy sandwich! Gross!", hit: { student: 35, staff: 110, studentSec: 0.8, staffSec: 1.4, style: "flinch" } },
  // Junk from lockers: takes up a slot until you toss it (select it to drop it). Staff tidy it up like anything else.
  homework:      { label: "Crumpled homework", icon: "📄", kind: "junk", line: "You toss someone's homework. It's a D-minus anyway." },
};
const REST_Y = { skeleton: 0, skateboard: 0.06, wetFloor: 0, mopBucket: 0, globe: 0.3, bassDrum: 0.45, trumpet: 0.06, basketball: 0.2, football: 0.14, wheelieChair: 0, whoopee: 0.08, frisbee: 0.03, slime: 0.02, mentos: 0 };   // how high items sit on the floor (default 0.04)

// Floor plan: a squared figure 8. An outer loop plus a main hall across the middle, around two classroom blocks.
// Halls run node to node. "side" on a hall: +1 / -1 = which wall (+1 is the classroom side on the outer loop).
const LAYOUT = {
  outerHalf: { x: 22, z: 19.5 },  // inside face of the outer walls
  hallHalf: 2.5,                  // half a hallway's width, wall to wall
  lockerDepth: 0.3,
  wallHeight: 3.2,
  blocks: [ { x0: -17, z0: -14.5, x1: 17, z1: -2.5, color: 0xd9cdb0 },   // top classroom block (1xx rooms)
            { x0: -17, z0: 2.5, x1: 17, z1: 14.5, color: 0xd5c6b5 } ], // bottom classroom block (2xx rooms)
  nodes: { NW: [-19.5, -17], NE: [19.5, -17], W: [-19.5, 0], E: [19.5, 0], SW: [-19.5, 17], SE: [19.5, 17] },
  halls: [
    { name: "north hall", from: "NW", to: "NE" },
    { name: "upper east hall", from: "NE", to: "E" },
    { name: "lower east hall", from: "E", to: "SE" },
    { name: "south hall", from: "SE", to: "SW" },
    { name: "lower west hall", from: "SW", to: "W" },
    { name: "upper west hall", from: "W", to: "NW" },
    { name: "main hall", from: "W", to: "E" },
  ],
  routes: {   // hall-monitor patrol loops, as node lists
    outer:  ["NW", "NE", "E", "SE", "SW", "W"],
    top:    ["NW", "NE", "E", "W"],
    bottom: ["W", "E", "SE", "SW"],
    eight:  ["NW", "NE", "E", "W", "SW", "SE", "E", "W"],
  },
  entrance: { h: 3, t: 19.5 },
  // classroom doors: hall index, distance along it, room number. Side defaults to the classroom wall.
  doors: [
    { h: 0, t: 9.75, room: 101, type: "math" }, { h: 0, t: 19.5, room: 102, type: "science" }, { h: 0, t: 29.25, room: 103, type: "english" },
    { h: 1, t: 8.5, room: 104, type: "art" }, { h: 6, t: 29, side: -1, room: 105, type: "office" }, { h: 6, t: 10, side: -1, room: 106, type: "history" },
    { h: 5, t: 8.5, room: 107, type: "english" },
    { h: 6, t: 14, side: 1, room: 108, type: "gym" }, { h: 6, t: 25, side: 1, room: 109, type: "math" }, { h: 2, t: 8.5, room: 110, type: "science" },
    { h: 3, t: 9.75, room: 111, type: "history" }, { h: 3, t: 19.5, room: 112, type: "art" }, { h: 3, t: 29.25, room: 113, type: "music" }, { h: 4, t: 8.5, room: 114, type: "math" },
  ],
  hideLockers: [ { h: 0, t: 4 }, { h: 0, t: 25 }, { h: 1, t: 13 }, { h: 2, t: 4 }, { h: 3, t: 27 }, { h: 4, t: 13 }, { h: 5, t: 4 } ],
  restrooms: [ { h: 2, t: 12 }, { h: 5, t: 12 } ],
  closets: [ { h: 1, t: 4 } ],   // the custodian's closet (one per floor)
  fireAlarms: [ { h: 6, t: 14.5, side: -1 }, { h: 1, t: 13.5 } ],   // step 74: two per floor (the one by the entrance is gone)   // side defaults to the classroom wall
  stairs: [ { h: 0, t: 1.9 }, { h: 3, t: 1.9 } ],   // stairwell doors (northwest and southeast corners), same spot on both floors
  // The second floor: same footprint (it's the same building), its own rooms and stuff. Hall numbers here are per floor (0-6).
  floor2: {
    doors: [
      { h: 0, t: 9.75, room: 201, type: "english" }, { h: 0, t: 19.5, room: 202, type: "science" }, { h: 0, t: 29.25, room: 203, type: "history" },
      { h: 1, t: 8.5, room: 204, type: "art" }, { h: 6, t: 29, side: -1, room: 205, type: "science" }, { h: 6, t: 10, side: -1, room: 206, type: "math" },
      { h: 5, t: 8.5, room: 207, type: "english" },
      { h: 6, t: 14, side: 1, room: 208, type: "music" }, { h: 6, t: 25, side: 1, room: 209, type: "history" }, { h: 2, t: 8.5, room: 210, type: "math" },
      { h: 3, t: 9.75, room: 211, type: "english" }, { h: 3, t: 19.5, room: 212, type: "history" }, { h: 3, t: 29.25, room: 213, type: "art" }, { h: 4, t: 8.5, room: 214, type: "math" },
    ],
    hideLockers: [ { h: 0, t: 14 }, { h: 1, t: 13 }, { h: 2, t: 4 }, { h: 3, t: 14 }, { h: 4, t: 13 }, { h: 5, t: 4 } ],
    restrooms: [ { h: 2, t: 12 }, { h: 5, t: 12 } ],
    closets: [ { h: 4, t: 4 } ],
    fireAlarms: [ { h: 6, t: 20, side: -1 }, { h: 4, t: 10.5 } ],
  },
};
// ---- the two floors sit side by side in world space, far enough apart that they never see or hear each other ----
const FLOOR_DX = 100, BASE_HALLS = LAYOUT.halls.length;
const floorOf = (x) => (x > FLOOR_DX / 2 ? 1 : 0);
const FLOOR_NAMES = ["1st floor", "2nd floor"];
{
  const L = LAYOUT;
  for (const id of Object.keys(L.nodes)) L.nodes[id + "2"] = [L.nodes[id][0] + FLOOR_DX, L.nodes[id][1]];
  for (const def of L.halls.slice(0, BASE_HALLS)) L.halls.push({ name: def.name + " (2nd floor)", from: def.from + "2", to: def.to + "2", floor: 1 });
  L.blocks.push(...L.blocks.map((b) => ({ ...b, x0: b.x0 + FLOOR_DX, x1: b.x1 + FLOOR_DX, color: b.color - 0x0a0400 })));
  for (const [name, r] of Object.entries(L.routes)) L.routes[name + "2"] = r.map((id) => id + "2");
  const up = (arr) => arr.map((o) => ({ ...o, h: o.h + BASE_HALLS }));
  for (const k of ["doors", "hideLockers", "restrooms", "closets", "fireAlarms"]) L[k].push(...up(L.floor2[k]));
  L.stairs.push(...up(L.stairs));
}

// Things pushed against a wall. Side defaults to the outer (locker) wall.
const OBSTACLES_2F = [   // the second floor's things against the walls (per-floor hall numbers)
  { name: "vending machine", h: 0, t: 19.5, halfLen: 0.7, depth: 0.85, height: 2.0, color: 0x27ae60 },
  { name: "trophy case",     h: 6, t: 4.5, side: 1, halfLen: 1.4, depth: 0.7, height: 1.9, color: 0x8e6b3e },
  { name: "water fountain",  h: 2, t: 8.5, halfLen: 0.45, depth: 0.5, height: 1.0, color: 0xbfc9d1 },
  { name: "bench",           h: 3, t: 22, halfLen: 1.3, depth: 0.55, height: 0.5, color: 0x7a5230 },
];
const OBSTACLES = [
  { name: "vending machine", h: 0, t: 18.7, halfLen: 0.7, depth: 0.85, height: 2.0, color: 0xc0392b },
  { name: "vending machine", h: 0, t: 20.3, halfLen: 0.7, depth: 0.85, height: 2.0, color: 0x2e86c1 },
  { name: "trophy case",     h: 6, t: 19.5, side: -1, halfLen: 1.4, depth: 0.7, height: 1.9, color: 0x8e6b3e },
  { name: "water fountain",  h: 1, t: 8.5, halfLen: 0.45, depth: 0.5, height: 1.0, color: 0xbfc9d1 },
  { name: "bench",           h: 3, t: 12, halfLen: 1.3, depth: 0.55, height: 0.5, color: 0x7a5230 },
  { name: "bench",           h: 4, t: 8.5, halfLen: 1.3, depth: 0.55, height: 0.5, color: 0x7a5230 },
];
OBSTACLES.push(...OBSTACLES_2F.map((o) => ({ ...o, h: o.h + BASE_HALLS })));

const SHIRT_COLORS = [0xe74c3c, 0x3498db, 0x2ecc71, 0x9b59b6, 0xf39c12, 0x1abc9c, 0xe84393, 0x34495e, 0xd35400, 0x16a085, 0xf1c40f, 0x6c5ce7];
const SKIN_COLORS = [0xf1c27d, 0xe0ac69, 0xc68642, 0x8d5524, 0xffdbac, 0x5c3a21];

// =====================================================================================
// Math helpers
// =====================================================================================
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const mod = (a, n) => ((a % n) + n) % n;
const rand = (a, b) => a + Math.random() * (b - a);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
function angDiff(a, b) { let d = b - a; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI; return d; }
function lerpAngle(a, b, t) { return a + angDiff(a, b) * t; }
const damp = (rate, dt) => 1 - Math.exp(-rate * dt);   // frame-rate independent smoothing

// =====================================================================================
// Hall graph. A position in a hall is (h, t, lat): which hall, distance from its start, sideways offset.
// Angles everywhere: heading a points along (sin a, cos a) in the x/z plane.
// =====================================================================================
const NODE_IDS = Object.keys(LAYOUT.nodes);
const NODES = NODE_IDS.map((id) => ({ id, x: LAYOUT.nodes[id][0], z: LAYOUT.nodes[id][1] }));
const nodeIndex = (id) => NODE_IDS.indexOf(id);
const inBlock = (x, z) => LAYOUT.blocks.some((b) => x > b.x0 && x < b.x1 && z > b.z0 && z < b.z1);
const HALLS = LAYOUT.halls.map((def) => {
  const a = nodeIndex(def.from), b = nodeIndex(def.to), A = NODES[a], B = NODES[b];
  const len = Math.hypot(B.x - A.x, B.z - A.z), dx = (B.x - A.x) / len, dz = (B.z - A.z) / len;
  const H = { name: def.name, a, b, ax: A.x, az: A.z, len, dx, dz, nx: -dz, nz: dx, floor: def.floor ?? 0 };
  // what's on each wall: a classroom block, or the outer wall (with lockers)
  const mx = A.x + dx * len / 2, mz = A.z + dz * len / 2;
  H.sideType = {};
  for (const side of [1, -1]) H.sideType[side] = inBlock(mx + H.nx * side * 3, mz + H.nz * side * 3) ? "block" : "outer";
  H.outerSide = H.sideType[-1] === "outer" ? -1 : H.sideType[1] === "outer" ? 1 : 0;
  return H;
});
// wall position (lat) on a side: classroom walls are flush; outer walls have lockers in front of them
function wallLat(h, side) { return side * (LAYOUT.hallHalf - (HALLS[h].sideType[side] === "outer" ? LAYOUT.lockerDepth : 0)); }
function hallPos(h, t, lat, out = {}) {
  const H = HALLS[h];
  out.x = H.ax + H.dx * t + H.nx * lat; out.z = H.az + H.dz * t + H.nz * lat;
  return out;
}
function hallHeading(h, dir) { const H = HALLS[h]; return Math.atan2(H.dx * dir, H.dz * dir); }
const wallRot = (h) => hallHeading(h, 1) - Math.PI / 2;   // box faces lie flat against the hall's walls
function hallProject(x, z) {
  let best = { d: Infinity, h: 0, t: 0, lat: 0 };
  HALLS.forEach((H, h) => {
    const t = clamp((x - H.ax) * H.dx + (z - H.az) * H.dz, 0, H.len);
    const cx = H.ax + H.dx * t, cz = H.az + H.dz * t;
    const d = Math.hypot(x - cx, z - cz);
    if (d < best.d) best = { d, h, t, lat: (x - cx) * H.nx + (z - cz) * H.nz };
  });
  return best;
}
// shortest paths between nodes (Floyd–Warshall; the graph is tiny)
const NN = NODES.length, DIST = [], NEXT = [], HALL_BETWEEN = {};
for (let i = 0; i < NN; i++) { DIST.push(Array(NN).fill(Infinity)); NEXT.push(Array(NN).fill(-1)); DIST[i][i] = 0; NEXT[i][i] = i; }
HALLS.forEach((H, h) => {
  DIST[H.a][H.b] = DIST[H.b][H.a] = H.len; NEXT[H.a][H.b] = H.b; NEXT[H.b][H.a] = H.a;
  HALL_BETWEEN[H.a + "," + H.b] = HALL_BETWEEN[H.b + "," + H.a] = h;
});
for (let k = 0; k < NN; k++) for (let i = 0; i < NN; i++) for (let j = 0; j < NN; j++)
  if (DIST[i][k] + DIST[k][j] < DIST[i][j]) { DIST[i][j] = DIST[i][k] + DIST[k][j]; NEXT[i][j] = NEXT[i][k]; }
const NEIGHBORS = NODES.map((_, i) => HALLS.flatMap((H) => (H.a === i ? [H.b] : H.b === i ? [H.a] : [])));
const hallBetween = (n1, n2) => HALL_BETWEEN[n1 + "," + n2];
const hallEndT = (h, node) => (HALLS[h].a === node ? 0 : HALLS[h].len);
const otherEnd = (h, node) => (HALLS[h].a === node ? HALLS[h].b : HALLS[h].a);
// cheapest end of hall h to arrive through, coming from node n, to reach distance t along it
function bestEnd(n, h, t) { const H = HALLS[h]; return DIST[n][H.a] + t <= DIST[n][H.b] + H.len - t ? H.a : H.b; }
function costToPoint(n, h, t) { const H = HALLS[h]; return Math.min(DIST[n][H.a] + t, DIST[n][H.b] + H.len - t); }

// Walkers: anything that follows the halls ({h, t, to}: walking along hall h toward node "to").
// At each node, chooseNext(walker, node) picks the neighboring node to head for next.
function walk(w, dist, chooseNext) {
  for (let guard = 0; dist > 1e-6 && guard < 4; guard++) {
    const endT = hallEndT(w.h, w.to), rem = Math.abs(endT - w.t);
    if (dist < rem) { w.t += Math.sign(endT - w.t) * dist; return; }
    dist -= rem;
    const node = w.to, next = chooseNext(w, node);
    w.from = node; w.h = hallBetween(node, next); w.t = hallEndT(w.h, node); w.to = next;
  }
}
// pick a random way onward, not straight back the way we came (unless it's a dead end)
function randomOnward(w, node) {
  const opts = NEIGHBORS[node].filter((n) => n !== otherEnd(w.h, node));
  return opts.length ? pick(opts) : otherEnd(w.h, node);
}
// walk toward a point (th, tt) in the hall network; returns true on arrival
function walkTo(w, th, tt, dist) {
  if (w.h === th) {
    const d = tt - w.t;
    w.to = d >= 0 ? HALLS[th].b : HALLS[th].a;
    if (Math.abs(d) <= dist) { w.t = tt; return true; }
    w.t += Math.sign(d) * dist; return false;
  }
  const H = HALLS[w.h];
  w.to = w.t + costToPoint(H.a, th, tt) <= H.len - w.t + costToPoint(H.b, th, tt) ? H.a : H.b;
  walk(w, dist, (_, node) => (node === HALLS[th].a || node === HALLS[th].b) ? otherEnd(th, node) : NEXT[node][bestEnd(node, th, tt)]);
  return false;
}

// =====================================================================================
// Collision world: axis-aligned boxes {x0, z0, x1, z1}
// =====================================================================================
const WALLS = [];
{
  const ox = LAYOUT.outerHalf.x - LAYOUT.lockerDepth, oz = LAYOUT.outerHalf.z - LAYOUT.lockerDepth, T = 2;
  for (const b of LAYOUT.blocks) WALLS.push({ x0: b.x0, z0: b.z0, x1: b.x1, z1: b.z1 });
  WALLS.push({ x0: -ox - T, z0: -oz - T, x1: ox + T, z1: -oz });           // north
  WALLS.push({ x0: -ox - T, z0: oz, x1: ox + T, z1: oz + T });             // south
  WALLS.push({ x0: -ox - T, z0: -oz - T, x1: -ox, z1: oz + T });           // west
  WALLS.push({ x0: ox, z0: -oz - T, x1: ox + T, z1: oz + T });             // east
  const X = FLOOR_DX;   // the second floor's outer walls
  WALLS.push({ x0: X - ox - T, z0: -oz - T, x1: X + ox + T, z1: -oz }, { x0: X - ox - T, z0: oz, x1: X + ox + T, z1: oz + T },
             { x0: X - ox - T, z0: -oz - T, x1: X - ox, z1: oz + T }, { x0: X + ox, z0: -oz - T, x1: X + ox + T, z1: oz + T });
  for (const ob of OBSTACLES) {
    ob.side = ob.side ?? HALLS[ob.h].outerSide;
    const wl = wallLat(ob.h, ob.side);
    const a = hallPos(ob.h, ob.t - ob.halfLen, wl - ob.side * ob.depth), b = hallPos(ob.h, ob.t + ob.halfLen, wl);
    ob.box = { x0: Math.min(a.x, b.x), z0: Math.min(a.z, b.z), x1: Math.max(a.x, b.x), z1: Math.max(a.z, b.z) };
    WALLS.push(ob.box);
  }
}

// Distance along a ray to the first wall (maxT if none within it).
function raycast(ox, oz, dx, dz, maxT) {
  let best = maxT;
  for (const b of WALLS) {
    let t0 = 0, t1 = best;
    if (Math.abs(dx) < 1e-9) { if (ox < b.x0 || ox > b.x1) continue; }
    else { let a = (b.x0 - ox) / dx, c = (b.x1 - ox) / dx; if (a > c) [a, c] = [c, a]; t0 = Math.max(t0, a); t1 = Math.min(t1, c); if (t0 > t1) continue; }
    if (Math.abs(dz) < 1e-9) { if (oz < b.z0 || oz > b.z1) continue; }
    else { let a = (b.z0 - oz) / dz, c = (b.z1 - oz) / dz; if (a > c) [a, c] = [c, a]; t0 = Math.max(t0, a); t1 = Math.min(t1, c); if (t0 > t1) continue; }
    if (t0 < best) best = t0;
  }
  return best;
}
function lineOfSight(ax, az, bx, bz) {
  const dx = bx - ax, dz = bz - az, d = Math.hypot(dx, dz);
  if (d < 1e-6) return true;
  return raycast(ax, az, dx / d, dz / d, d) >= d - 1e-3;
}
// Push a circle out of every wall it overlaps.
function collide(p, r) {
  for (const b of WALLS) {
    const cx = clamp(p.x, b.x0, b.x1), cz = clamp(p.z, b.z0, b.z1);
    let dx = p.x - cx, dz = p.z - cz, d2 = dx * dx + dz * dz;
    if (d2 >= r * r) continue;
    if (d2 > 1e-12) { const d = Math.sqrt(d2), push = r - d; p.x += (dx / d) * push; p.z += (dz / d) * push; }
    else {  // center inside the box: leave by the shortest side
      const opts = [[p.x - b.x0 + r, -1, 0], [b.x1 - p.x + r, 1, 0], [p.z - b.z0 + r, 0, -1], [b.z1 - p.z + r, 0, 1]];
      opts.sort((u, v) => u[0] - v[0]);
      p.x += opts[0][1] * opts[0][0]; p.z += opts[0][2] * opts[0][0];
    }
  }
}

// =====================================================================================
// Renderer, scene, level geometry (primitives + flat colors only)
// =====================================================================================
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, CFG.render.maxPixelRatio));
document.body.prepend(renderer.domElement);
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1d2230);
scene.fog = new THREE.Fog(0x1d2230, 22, 48);
const camera = new THREE.PerspectiveCamera(CFG.camera.fov, 1, 0.1, 53);   // (the other floor is 56+ m away: never drawn)
// step 64: flat, slightly cool fluorescent light (brighter fill, a softer key light)
const LIGHT = { hemi: 1.35, sun: 0.6 };
const hemi = new THREE.HemisphereLight(0xf4f8ff, 0x9a917e, LIGHT.hemi); scene.add(hemi);
const sun = new THREE.DirectionalLight(0xffffff, LIGHT.sun);
const glowMats = [];   // unlit things that should go dark in a blackout (the ceiling and its light panels)
sun.position.set(6, 14, 9);
scene.add(sun);

const lambert = (color) => new THREE.MeshLambertMaterial({ color, flatShading: true });
function box(w, h, d, color, x, y, z) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), lambert(color));
  m.position.set(x, y, z); scene.add(m); return m;
}
// ---- step 64: school textures, drawn here on canvases (nothing to download). Light, mostly gray images, so a material's color tints them. ----
function schoolTex(w, h, draw, repeat = true) {
  const c = document.createElement("canvas"); c.width = w; c.height = h; draw(c.getContext("2d"), w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  if (repeat) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = Math.min(CFG.render.anisotropy, renderer.capabilities.getMaxAnisotropy()); return t;
}
const speckle = (g, w, h, n, cols) => { for (let i = 0; i < n; i++) { g.fillStyle = cols[i % cols.length]; const s = Math.random() < 0.15 ? 2 : 1; g.fillRect(Math.random() * w, Math.random() * h, s, s); } };
const TEX = {
  // 2 m x 2 m of floor: 4 x 4 speckled tiles in two tones, thin grout, a few scuffs
  floor: schoolTex(256, 256, (g, w, h) => {
    const n = 4, tw = w / n;
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { g.fillStyle = (i + j) % 2 ? "#ece6d8" : "#d2c9b6"; g.fillRect(i * tw, j * tw, tw, tw); }
    speckle(g, w, h, 2600, ["rgba(90,80,60,.35)", "rgba(255,255,255,.5)", "rgba(120,110,90,.25)", "rgba(70,90,110,.2)"]);
    g.strokeStyle = "rgba(60,50,40,.28)"; g.lineWidth = 1.5; for (let i = 0; i <= n; i++) { g.beginPath(); g.moveTo(i * tw, 0); g.lineTo(i * tw, h); g.moveTo(0, i * tw); g.lineTo(w, i * tw); g.stroke(); }
    g.strokeStyle = "rgba(40,35,30,.07)"; g.lineWidth = 1.5; for (let k = 0; k < 10; k++) { const x = Math.random() * w, y = Math.random() * h, a = Math.random() * 6; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * (6 + Math.random() * 14), y + Math.sin(a) * (6 + Math.random() * 14)); g.stroke(); }   // scuffs
  }),
  // 1.6 m x 0.8 m of painted cinderblock: 0.4 x 0.2 m blocks, staggered rows
  block: schoolTex(256, 128, (g, w, h) => {
    g.fillStyle = "#f4f1ea"; g.fillRect(0, 0, w, h);
    speckle(g, w, h, 1400, ["rgba(0,0,0,.05)", "rgba(255,255,255,.35)"]);
    const bw = w / 4, bh = h / 4; g.fillStyle = "rgba(70,60,50,.2)";
    for (let r = 0; r < 4; r++) { g.fillRect(0, r * bh, w, 3); for (let c = 0; c <= 4; c++) g.fillRect(c * bw + (r % 2 ? bw / 2 : 0), r * bh, 3, bh); }
  }),
  // a locker door: vents top and bottom, a handle, a number plate, a darker rim
  locker: schoolTex(64, 224, (g, w, h) => {
    g.fillStyle = "#f2f2f2"; g.fillRect(0, 0, w, h);
    g.fillStyle = "rgba(0,0,0,.18)"; g.fillRect(0, 0, w, 3); g.fillRect(0, h - 3, w, 3); g.fillRect(0, 0, 3, h); g.fillRect(w - 3, 0, 3, h);
    g.fillStyle = "rgba(0,0,0,.45)"; for (const y0 of [18, h - 34]) for (let k = 0; k < 4; k++) g.fillRect(14, y0 + k * 5, w - 28, 2);
    g.fillStyle = "#c9cdd2"; g.fillRect(w - 16, h * 0.46, 6, 22); g.fillStyle = "rgba(0,0,0,.35)"; g.fillRect(w - 16, h * 0.46 + 20, 6, 2);   // handle
    g.fillStyle = "#e8e2c8"; g.fillRect(w / 2 - 9, 44, 18, 9);   // number plate
  }, false),
  // a wooden classroom door
  wood: schoolTex(64, 128, (g, w, h) => {
    g.fillStyle = "#ffffff"; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 26; i++) { g.strokeStyle = `rgba(60,30,0,${0.06 + Math.random() * 0.1})`; g.lineWidth = 1 + Math.random() * 2; const x = Math.random() * w; g.beginPath(); g.moveTo(x, 0); for (let y = 0; y <= h; y += 16) g.lineTo(x + Math.sin(y * 0.05 + i) * 3, y); g.stroke(); }
  }, false),
  // 1.2 m x 1.2 m of drop ceiling: 0.6 m acoustic tiles on a metal grid
  ceiling: schoolTex(128, 128, (g, w, h) => {
    g.fillStyle = "#e9e7e1"; g.fillRect(0, 0, w, h);
    speckle(g, w, h, 500, ["rgba(0,0,0,.09)", "rgba(0,0,0,.05)"]);
    g.fillStyle = "#b9bcc0"; for (const k of [0, w / 2]) { g.fillRect(k, 0, 3, h); g.fillRect(0, k, w, 3); }
  }),
};
// world-space UVs for a box, so a texture keeps the same scale on every wall whatever its size (texture covers tw x th meters)
function worldUV(geo, tw, th) {
  const p = geo.attributes.position, n = geo.attributes.normal, uv = geo.attributes.uv;
  for (let i = 0; i < p.count; i++) {
    const nx = Math.abs(n.getX(i)), ny = Math.abs(n.getY(i));
    const u = ny > 0.5 ? p.getX(i) : nx > 0.5 ? p.getZ(i) : p.getX(i), v = ny > 0.5 ? p.getZ(i) : p.getY(i);
    uv.setXY(i, u / tw, v / th);
  }
  uv.needsUpdate = true; return geo;
}
// a big wall box in painted cinderblock
function blockBox(w, h, d, color, x, y, z) {
  const geo = worldUV(new THREE.BoxGeometry(w, h, d).translate(x, y, z), 1.6, 0.8);
  const m = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ color, map: TEX.block })); scene.add(m); return m;
}
// a box lying flat against a hall wall, centered at (h, t, lat)
function wallBox(h, t, lat, w, hgt, d, color, y) { const p = hallPos(h, t, lat); const m = box(w, hgt, d, color, p.x, y, p.z); m.rotation.y = wallRot(h); return m; }

// Floor: checker tiles via vertex colors.
{
  const W = LAYOUT.outerHalf.x * 2, D = LAYOUT.outerHalf.z * 2;
  const g = new THREE.PlaneGeometry(W, D); g.rotateX(-Math.PI / 2);
  const ft = TEX.floor; ft.repeat.set(W / 2, D / 2);   // step 64: speckled tile, 2 m per repeat
  scene.add(new THREE.Mesh(g, new THREE.MeshLambertMaterial({ map: ft })));
  const up = new THREE.Mesh(g, new THREE.MeshLambertMaterial({ map: ft, color: 0xdde4ee })); up.position.x = FLOOR_DX; scene.add(up);   // upstairs: a cooler tint
  // the drop ceiling (faces down, so from above, outside the school, it isn't there) and its fluorescent panels
  const ct = TEX.ceiling; ct.repeat.set(W / 1.2, D / 1.2);
  for (const X of [0, FLOOR_DX]) {
    const cg = new THREE.PlaneGeometry(W, D); cg.rotateX(Math.PI / 2);
    const ceil = new THREE.Mesh(cg, new THREE.MeshBasicMaterial({ map: ct, color: X ? 0xc4c8ce : 0xcdcbc6 })); glowMats.push(ceil.material);   // unlit: the lights only reach it from below
    ceil.position.set(X, LAYOUT.wallHeight - 0.002, 0); scene.add(ceil);
  }
}

// Walls
{
  const H = LAYOUT.wallHeight, ox = LAYOUT.outerHalf.x, oz = LAYOUT.outerHalf.z;
  for (const b of LAYOUT.blocks) {
    const w = b.x1 - b.x0, d = b.z1 - b.z0, cx = (b.x0 + b.x1) / 2, cz = (b.z0 + b.z1) / 2;
    blockBox(w, H, d, b.color, cx, H / 2, cz);
    box(w + 0.02, 0.25, d + 0.02, 0x6b8cae, cx, 1.05, cz);   // stripe
  }
  blockBox(ox * 2 + 1, H, 0.5, 0xcfc5ad, 0, H / 2, -oz - 0.25);
  blockBox(ox * 2 + 1, H, 0.5, 0xcfc5ad, 0, H / 2, oz + 0.25);
  blockBox(0.5, H, oz * 2 + 1, 0xcfc5ad, -ox - 0.25, H / 2, 0);
  blockBox(0.5, H, oz * 2 + 1, 0xcfc5ad, ox + 0.25, H / 2, 0);
  const X = FLOOR_DX, c2 = 0xc9c7bd;
  blockBox(ox * 2 + 1, H, 0.5, c2, X, H / 2, -oz - 0.25); blockBox(ox * 2 + 1, H, 0.5, c2, X, H / 2, oz + 0.25);
  blockBox(0.5, H, oz * 2 + 1, c2, X - ox - 0.25, H / 2, 0); blockBox(0.5, H, oz * 2 + 1, c2, X + ox + 0.25, H / 2, 0);
}

// Lockers along the outer walls (one instanced mesh), skipping obstacles, hiding spots and the entrance.
{
  const near = (list, h, t, r) => list.some((o) => o.h === h && Math.abs(o.t - t) < (o.halfLen ?? 0) + r);
  const spacing = 0.62, positions = [];
  HALLS.forEach((H, h) => {
    if (!H.outerSide) return;
    for (let t = 0.4; t < H.len - 0.4; t += spacing) {
      if (h === LAYOUT.entrance.h && Math.abs(t - LAYOUT.entrance.t) < 2.0) continue;
      if (OBSTACLES.some((o) => o.h === h && o.side === H.outerSide && Math.abs(o.t - t) < o.halfLen + 0.35)) continue;
      if (near(LAYOUT.hideLockers, h, t, 0.75) || near(LAYOUT.restrooms, h, t, 1.0) || near(LAYOUT.closets, h, t, 1.0) || near(LAYOUT.stairs, h, t, 1.1)) continue;
      positions.push({ h, t });
    }
  });
  const lockerGeo = new THREE.BoxGeometry(0.56, 2.0, LAYOUT.lockerDepth);
  const lockers = new THREE.InstancedMesh(lockerGeo, new THREE.MeshLambertMaterial({ map: TEX.locker }), positions.length);   // step 64: vents, handle, number plate
  const m = new THREE.Object3D(), c = new THREE.Color();
  positions.forEach(({ h, t }, i) => {
    const side = HALLS[h].outerSide, p = hallPos(h, t, wallLat(h, side) + side * LAYOUT.lockerDepth / 2);
    m.position.set(p.x, 1.0, p.z);
    m.rotation.y = wallRot(h);
    m.updateMatrix(); lockers.setMatrixAt(i, m.matrix);
    lockers.setColorAt(i, c.setHex(i % 2 ? 0x3d6fb6 : 0x3563a8));
  });
  scene.add(lockers);
}

// Step 64: fluorescent light panels down the middle of every hall (one instanced mesh, unlit so they glow)
{
  const spots = [];
  HALLS.forEach((H, h) => { for (let t = 2; t < H.len - 1; t += 4) spots.push([h, t]); });
  const lights = new THREE.InstancedMesh(new THREE.BoxGeometry(0.62, 0.05, 1.25), new THREE.MeshBasicMaterial({ color: 0xf3f7ff }), spots.length); glowMats.push(lights.material);
  const m = new THREE.Object3D();
  spots.forEach(([h, t], i) => { const p = hallPos(h, t, 0); m.position.set(p.x, LAYOUT.wallHeight - 0.03, p.z); m.rotation.y = hallHeading(h, 1); m.updateMatrix(); lights.setMatrixAt(i, m.matrix); });
  scene.add(lights);
}
// Spirit banners strung across a few halls on a wire, overhead (toilet paper snags on the wires).
const BANNERS = [
  { h: 0, f: 0.3, text: "GO GOBLINS!", bg: "#c0392b", fg: "#ffd36b" },
  { h: 6, f: 0.62, text: "SPIRIT WEEK", bg: "#2e86c1", fg: "#ffffff" },
  { h: 3, f: 0.55, text: "HOMECOMING FRIDAY", bg: "#27ae60", fg: "#ffffff" },
  { h: 6, f: 0.2, text: "NO RUNNING IN THE HALLS", bg: "#f4f4ee", fg: "#c0392b" },
  { h: 0 + BASE_HALLS, f: 0.55, text: "SCIENCE FAIR THURSDAY", bg: "#8e44ad", fg: "#ffffff" },
  { h: 6 + BASE_HALLS, f: 0.45, text: "BE KIND · BE ON TIME", bg: "#f1c40f", fg: "#1d2230" },
  { h: 3 + BASE_HALLS, f: 0.6, text: "GO GOBLINS!", bg: "#c0392b", fg: "#ffd36b" },
];
for (const b of BANNERS) {
  b.t = HALLS[b.h].len * b.f; b.wireY = 2.44;
  const cv = document.createElement("canvas"); cv.width = 1024; cv.height = 80;
  const g = cv.getContext("2d"); g.fillStyle = b.bg; g.fillRect(0, 0, 1024, 80);
  g.fillStyle = b.fg; g.font = "900 54px system-ui, sans-serif"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(b.text, 512, 43);
  const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace;
  const w = LAYOUT.hallHalf * 2 - 0.1, p = hallPos(b.h, b.t, 0), rot = hallHeading(b.h, 1);
  b.mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true }); b.x = p.x; b.z = p.z;
  for (const flip of [0, Math.PI]) {   // printed on both sides
    const flag = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.9, w * 0.9 * 80 / 1024 * 1.6), b.mat);
    flag.position.set(p.x, 2.2, p.z); flag.rotation.y = rot + flip; scene.add(flag);
  }
  const wire = box(w, 0.03, 0.03, 0x555555, p.x, b.wireY, p.z); wire.rotation.y = rot;
}

// =====================================================================================
// Hiding spots: hide lockers, restrooms, classroom doors
// =====================================================================================
const SPOTS = [];
const tagsEl = document.getElementById("tags");
function addSpot(kind, h, t, side, extra = {}) {
  const T = SPOT_TYPES[kind], wl = wallLat(h, side);
  const tag = document.createElement("div"); tag.className = "itag"; tagsEl.appendChild(tag);
  const sp = { kind, T, h, t, side, wallLat: wl, frontLat: wl - side * 0.6, glow: [], used: false, tag, tagText: "", tagClass: "", ...extra };
  SPOTS.push(sp);
  return sp;
}

for (const { h, t } of LAYOUT.hideLockers) {
  const side = HALLS[h].outerSide, wl = wallLat(h, side), sp = addSpot("locker", h, t, side);
  sp.door = wallBox(h, t, wl + side * LAYOUT.lockerDepth / 2, 0.9, 2.1, LAYOUT.lockerDepth, 0x7d9a86, 1.05);
  sp.door.material.map = TEX.locker; sp.door.material.flatShading = false;   // step 64: the same locker door, in green
  sp.glow.push(sp.door.material); sp.doorRot = sp.door.rotation.y;
}
for (const { h, t } of LAYOUT.restrooms) {
  const side = HALLS[h].outerSide, wl = wallLat(h, side), sp = addSpot("restroom", h, t, side);
  sp.glow.push(wallBox(h, t, wl + side * (LAYOUT.lockerDepth - 0.04), 1.3, 2.25, 0.08, 0x3f9c9a, 1.125).material);
  wallBox(h, t, wl + side * (LAYOUT.lockerDepth - 0.09), 0.42, 0.42, 0.03, 0xf4f4f4, 2.55);
  wallBox(h, t, wl + side * (LAYOUT.lockerDepth - 0.11), 0.12, 0.2, 0.02, 0x3f9c9a, 2.5);
  wallBox(h, t, wl + side * (LAYOUT.lockerDepth - 0.11), 0.09, 0.09, 0.02, 0x3f9c9a, 2.66);
}
for (const { h, t } of LAYOUT.closets) {
  const side = HALLS[h].outerSide, wl = wallLat(h, side), sp = addSpot("closet", h, t, side, { taken: new Set() });
  sp.glow.push(wallBox(h, t, wl + side * (LAYOUT.lockerDepth - 0.04), 1.1, 2.2, 0.08, 0x7f8c8d, 1.1).material);
  wallBox(h, t, wl + side * (LAYOUT.lockerDepth - 0.09), 0.8, 0.18, 0.03, 0x2d3b45, 2.0);   // the CUSTODIAN plate
  wallBox(h, t + 0.35, wl + side * (LAYOUT.lockerDepth - 0.1), 0.06, 0.06, 0.04, 0xd4ac0d, 1.05);   // the knob
}
const CLOSETS = SPOTS.filter((sp) => sp.kind === "closet");
// stairwells: walk in and you come out at the same stairwell on the other floor
const signTexCache = {};
function signTex(text, bg, fg) {
  const k = text + bg; if (signTexCache[k]) return signTexCache[k];
  const cv = document.createElement("canvas"); cv.width = 256; cv.height = 96; const g = cv.getContext("2d");
  g.fillStyle = bg; g.fillRect(0, 0, 256, 96); g.fillStyle = fg; g.font = "900 44px system-ui, sans-serif"; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(text, 128, 50);
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; return (signTexCache[k] = t);
}
const STAIRS = LAYOUT.stairs.map(({ h, t }) => {
  const side = HALLS[h].outerSide, wl = wallLat(h, side), sp = addSpot("stairs", h, t, side, { floor: HALLS[h].floor });
  sp.glow.push(wallBox(h, t, wl + side * (LAYOUT.lockerDepth - 0.04), 1.4, 2.3, 0.08, 0x34495e, 1.15).material);
  wallBox(h, t, wl + side * (LAYOUT.lockerDepth - 0.08), 0.5, 0.7, 0.03, 0xa8d8ff, 1.5);   // the little window
  const p = hallPos(h, t, wl - side * 0.02 + side * (LAYOUT.lockerDepth - 0.12));
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.34), new THREE.MeshBasicMaterial({ map: signTex(sp.floor ? "STAIRS ↓ 1" : "STAIRS ↑ 2", "#1e8449", "#ffffff") }));
  sign.position.set(p.x, 2.5, p.z); sign.rotation.y = Math.atan2(-side * HALLS[h].nx, -side * HALLS[h].nz); scene.add(sign);
  return sp;
});
STAIRS.forEach((sp, i) => { sp.pair = STAIRS[(i + STAIRS.length / 2) % STAIRS.length]; });
const spotFloor = (sp) => HALLS[sp.h].floor;
for (const d of LAYOUT.doors) {
  const H = HALLS[d.h], side = d.side ?? (H.sideType[1] === "block" ? 1 : -1), wl = wallLat(d.h, side);
  const R = ROOM_TYPES[d.type ?? "classroom"];
  const door = wallBox(d.h, d.t, wl - side * 0.03, 1.2, 2.2, 0.08, R.door ?? 0x8b5a2b, 1.1);
  door.material.map = TEX.wood;   // step 64: wood grain, a kick plate and a handle
  wallBox(d.h, d.t, wl - side * 0.075, 1.1, 0.25, 0.015, 0xaeb4bb, 0.15);
  wallBox(d.h, d.t + 0.45 * side * (d.h % 2 ? 1 : -1), wl - side * 0.09, 0.05, 0.16, 0.05, 0xc9cdd2, 1.0);
  if (R.plaque) wallBox(d.h, d.t, wl - side * 0.03, 1.0, 0.24, 0.05, R.plaque, 2.42);   // colored sign over special rooms
  wallBox(d.h, d.t, wl - side * 0.08, 0.5, 0.6, 0.04, 0xa8d8ff, 1.55);
  // the tell: who's visible through the window, plus a sticky note on a sub's door
  const sil = wallBox(d.h, d.t, wl - side * 0.105, 0.2, 0.3, 0.01, 0x2b2f3a, 1.5);
  const note = wallBox(d.h, d.t + 0.32, wl - side * 0.09, 0.2, 0.2, 0.02, 0xf7e463, 1.15);
  const lockSign = wallBox(d.h, d.t, wl - side * 0.1, 0.62, 0.22, 0.03, 0xc0392b, 1.92);   // "LOCKED" sign, shown while a room is locked
  lockSign.visible = false;
  const sp = addSpot("classroom", d.h, d.t, side, { room: d.room, roomType: d.type ?? "classroom", R, teacher: R.staff ?? "teacher", sil, note, loot: [],
    taken: new Set(), raided: false, lockedUntil: 0, lockSign });
  sp.glow.push(door.material);
}
function rollSubs() {
  const rooms = SPOTS.filter((sp) => sp.kind === "classroom");
  const [lo, hi] = CFG.hiding.subsPerDay;
  let n = lo + Math.floor(Math.random() * (hi - lo + 1));
  for (const sp of rooms) { sp.teacher = sp.R.staff ?? "teacher"; sp.taken.clear(); sp.raided = false; sp.lockedUntil = 0; }   // a new day: everything unlocked
  while (n > 0) { const sp = pick(rooms); if (sp.teacher === "teacher") { sp.teacher = "sub"; n--; } }
  for (const sp of rooms) { sp.sil.material.color.setHex(TEACHER_TYPES[sp.teacher].silhouette); sp.note.visible = sp.teacher === "sub"; }
}

// Entrance doors, obstacles, bulletin boards.
{
  const { h, t } = LAYOUT.entrance, side = HALLS[h].outerSide, wl = wallLat(h, side);
  wallBox(h, t, wl + side * (LAYOUT.lockerDepth - 0.02), 2.6, 2.5, 0.08, 0x5d7c99, 1.25);
  wallBox(h, t, wl + side * (LAYOUT.lockerDepth - 0.06), 1.4, 0.3, 0.05, 0x2ecc71, 2.75);
}
for (const ob of OBSTACLES) {
  const b = ob.box;
  box(b.x1 - b.x0, ob.height, b.z1 - b.z0, ob.color, (b.x0 + b.x1) / 2, ob.height / 2, (b.z0 + b.z1) / 2);
}
for (const [mh, t] of [[6, 5], [6, 19.5], [6, 34], [6 + BASE_HALLS, 9], [6 + BASE_HALLS, 34]]) {   // the main halls' bare walls get bulletin boards
  wallBox(mh, t, wallLat(mh, 1) - 0.03, 2.2, 1.1, 0.05, 0xc49a6c, 1.7);
  for (let k = 0; k < 4; k++) wallBox(mh, t - 0.75 + k * 0.5, wallLat(mh, 1) - 0.06, 0.32, 0.42, 0.02, pick([0xffffff, 0xfff1a8, 0xa8e6ff, 0xffc2d4]), 1.7 + (k % 2 ? 0.15 : -0.12));
}

// =====================================================================================
// Characters
// =====================================================================================
// Step 63: staff are grown-ups with jointed legs and arms (they swing as they walk) and a uniform for each job, not cylinders.
// Head center at 1.40 before their scale. userData: legs, arms (for animateKid), eyes (a group, so a squint squashes it in place), hand (right).
const STAFF_LOOKS = {
  hallMonitor:   { shirt: 0x4a6fa5, pants: 0xb59f74, shoes: 0x3a2a1c, vest: 0xe8c547, whistle: true },
  securityGuard: { shirt: 0x26364f, pants: 0x1a1f2b, shoes: 0x0e0e0e, badge: true, belt: true },
  postedGuard:   { shirt: 0x26364f, pants: 0x1a1f2b, shoes: 0x0e0e0e, badge: true, belt: true },
  principal:     { shirt: 0x3b3f4a, pants: 0x3b3f4a, shoes: 0x1a1a1a, suit: true, glasses: true, hair: ["bald", "short"] },
  custodian:     { shirt: 0x4f6d7a, pants: 0x4f6d7a, shoes: 0x2b2b2b, keys: true },
  roamTeacher:   { shirt: 0x5a7d9b, pants: 0x3a3a44, shoes: 0x2b1d14, cardigan: true, glasses: 0.5, hair: ["bun", "short", "long", "bald"] },
  hallTeacher:   { shirt: 0x8e5a9b, pants: 0x3a3a44, shoes: 0x2b1d14, cardigan: true, glasses: 0.5, hair: ["bun", "short", "long", "bald"] },
};
function makePerson({ body, skin = 0xf1c27d, scale = 1, hat = null, kind = null }) {
  const L = STAFF_LOOKS[kind] ?? { shirt: body, pants: 0x3a3a44, shoes: 0x222222 };
  const g = new THREE.Group(), lam = (c) => lambert(c);
  const mesh = (geo, mat, x, y, z, parent = g) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); parent.add(m); return m; };
  const shirtM = lam(L.shirt), pantsM = lam(L.pants), skinM = lam(skin), depth = 0.66;
  const hipY = 0.64, shoulderY = 1.18, headY = 1.4, headR = 0.21, sh = 0.26, waist = 0.22, hip = 0.23;
  // torso
  const chest = mesh(new THREE.CylinderGeometry(sh, waist, shoulderY - 0.82, 9), shirtM, 0, (shoulderY + 0.82) / 2, 0); chest.scale.z = depth;
  const belly = mesh(new THREE.CylinderGeometry(waist, hip, 0.82 - hipY + 0.02, 9), L.suit || L.cardigan ? shirtM : lam(L.shirt), 0, (0.82 + hipY) / 2, 0); belly.scale.z = depth;
  mesh(new THREE.SphereGeometry(sh, 9, 3, 0, Math.PI * 2, 0, Math.PI / 2), shirtM, 0, shoulderY - 0.005, 0).scale.set(1, 0.3, depth);
  mesh(new THREE.CylinderGeometry(hip, hip * 0.95, 0.12, 9), pantsM, 0, hipY - 0.03, 0).scale.z = depth;
  mesh(new THREE.CylinderGeometry(0.07, 0.08, 0.12, 6), skinM, 0, shoulderY + 0.05, 0);   // neck
  const front = (r, y) => r * depth + 0.006;   // the body's front surface (roughly)
  // legs and arms, each swinging from a pivot
  const legs = [], arms = []; let hand = null;
  for (const sx of [-1, 1]) {
    const lp = new THREE.Group(); lp.position.set(sx * hip * 0.5, hipY, 0); g.add(lp); legs.push(lp);
    mesh(new THREE.CylinderGeometry(0.085, 0.075, hipY - 0.07, 7), pantsM, 0, -(hipY - 0.07) / 2, 0, lp);
    mesh(new THREE.BoxGeometry(0.14, 0.08, 0.27), lam(L.shoes), 0, -hipY + 0.04, 0.045, lp);
    const ap = new THREE.Group(); ap.position.set(sx * (sh + 0.04), shoulderY - 0.05, 0); ap.rotation.z = sx * 0.06; g.add(ap); arms.push(ap);
    mesh(new THREE.CylinderGeometry(0.068, 0.06, 0.5, 7), shirtM, 0, -0.25, 0, ap);
    mesh(new THREE.IcosahedronGeometry(0.06, 0), skinM, 0, -0.54, 0, ap);
    if (sx === 1) { hand = new THREE.Group(); hand.position.set(0, -0.54, 0.02); ap.add(hand); }
  }
  // head, eyes, hair
  mesh(new THREE.IcosahedronGeometry(headR, 1), skinM, 0, headY, 0).scale.y = 1.06;
  const eyes = new THREE.Group(); eyes.position.set(0, headY + 0.03, headR - 0.015); g.add(eyes);
  for (const sx of [-1, 1]) mesh(new THREE.BoxGeometry(0.05, 0.045, 0.03), lam(0x1d1d1d), sx * 0.075, 0, 0, eyes);
  const hairStyle = pick(L.hair ?? ["short", "short", "bald", "bun"]), hairM = lam(pick([0x2a1d15, 0x4a3426, 0x8a8f96, 0xc9c3b8, 0x15110f, 0x6b4423]));
  if (!hat && hairStyle !== "bald") {
    mesh(new THREE.SphereGeometry(headR * 1.07, 12, 5, 0, Math.PI * 2, 0, Math.PI * 0.42), hairM, 0, headY + 0.02, -0.015).scale.y = 1.1;
    if (hairStyle === "bun") mesh(new THREE.IcosahedronGeometry(0.075, 1), hairM, 0, headY + 0.17, -0.13);
    if (hairStyle === "long") { const dm = hairM.clone(); dm.side = THREE.DoubleSide; g.add(new THREE.Mesh(longHairGeo(headR, headY, 0.34), dm)); }
  } else if (hairStyle === "bald" && !hat) for (const sx of [-1, 1]) mesh(new THREE.BoxGeometry(0.04, 0.08, 0.12), hairM, sx * headR * 0.95, headY - 0.01, -0.04);   // a fringe over the ears
  if (hat) {   // a cap with a brim
    const hm = lam(hat);
    mesh(new THREE.SphereGeometry(headR * 1.09, 12, 5, 0, Math.PI * 2, 0, Math.PI * 0.45), hm, 0, headY + 0.02, -0.01).scale.y = 1.05;
    mesh(new THREE.BoxGeometry(0.3, 0.025, 0.17), hm, 0, headY + 0.08, headR * 0.95);
  }
  const glasses = L.glasses === true || (L.glasses && Math.random() < L.glasses);
  if (glasses) { const gm = lam(0x222222); for (const sx of [-1, 1]) mesh(new THREE.TorusGeometry(0.05, 0.011, 4, 10), gm, sx * 0.075, 0, 0.012, eyes); mesh(new THREE.BoxGeometry(0.05, 0.012, 0.012), gm, 0, 0.01, 0.012, eyes); }
  // the job
  const fz = front(sh * 0.95);
  if (L.vest) {   // hi-vis vest with reflective stripes
    const v = mesh(new THREE.CylinderGeometry(sh * 1.06, hip * 1.07, shoulderY - hipY - 0.02, 12, 1, true, 0.35, Math.PI * 2 - 0.7), new THREE.MeshLambertMaterial({ color: L.vest, flatShading: true, side: THREE.DoubleSide }), 0, (shoulderY + hipY) / 2 + 0.01, 0); v.scale.z = depth;
    for (const y of [0.98, 0.8]) { const st = mesh(new THREE.CylinderGeometry(sh * 1.08 - (1.18 - y) * 0.06, sh * 1.08 - (1.18 - y) * 0.06 - 0.005, 0.035, 12, 1, true, 0.35, Math.PI * 2 - 0.7), new THREE.MeshLambertMaterial({ color: 0xd8dde3, side: THREE.DoubleSide }), 0, y, 0); st.scale.z = depth; }
  }
  if (L.whistle) { mesh(new THREE.BoxGeometry(0.012, 0.22, 0.008), lam(0xc0392b), 0, shoulderY - 0.1, fz + 0.01); mesh(new THREE.BoxGeometry(0.05, 0.03, 0.03), lam(0xd8dce2), 0, shoulderY - 0.22, fz + 0.025); }
  if (L.badge) mesh(new THREE.BoxGeometry(0.06, 0.07, 0.015), lam(0xd4af37), -0.11, 1.02, front(sh * 0.9) + 0.01);
  if (L.belt || L.keys) {
    const b = mesh(new THREE.TorusGeometry(hip * 1.01, 0.025, 4, 16), lam(L.belt ? 0x111111 : 0x3a2a1c), 0, hipY + 0.05, 0); b.rotation.x = Math.PI / 2; b.scale.y = depth;
    if (L.belt) { mesh(new THREE.BoxGeometry(0.07, 0.12, 0.05), lam(0x222222), hip * 0.9, hipY + 0.0, 0.02); mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.2, 6), lam(0x333333), -hip * 0.95, hipY - 0.02, 0.02); }   // radio, flashlight
    if (L.keys) { const k = mesh(new THREE.TorusGeometry(0.04, 0.008, 4, 10), lam(0xd8dce2), hip * 0.85, hipY - 0.01, front(hip * 0.85) * 0.5); k.rotation.y = Math.PI / 2; }
  }
  if (L.suit || L.cardigan) {   // a white shirt showing at the front, and for the principal a red tie
    mesh(new THREE.BoxGeometry(0.11, 0.3, 0.02), lam(0xf2f2f2), 0, shoulderY - 0.17, fz);
    if (L.suit) mesh(new THREE.BoxGeometry(0.05, 0.3, 0.02), lam(0xc0392b), 0, shoulderY - 0.2, fz + 0.012);
    if (L.cardigan) for (let i = 0; i < 4; i++) mesh(new THREE.BoxGeometry(0.02, 0.02, 0.01), lam(0xe8e2d0), 0.065, 1.08 - i * 0.1, front(sh * 0.85) + 0.012);
  }
  g.userData = { eyes, legs, arms, hand, walk: Math.random() * 6 };
  g.scale.setScalar(scale);
  scene.add(g);
  return g;
}

// ---------- step 46: your kid's look. A jointed low-poly kid (legs and arms swing), built from the look on the character screen ----------
const SKIN_TONES = [0xffe0c4, 0xf1c27d, 0xe0ac69, 0xc68642, 0xa86b3c, 0x8d5524, 0x5c3a21, 0x3b2414, 0x7bb043];   // step 53: the last one is goblin green
const HAIR_COLORS = [0x15110f, 0x3b2314, 0x6b4423, 0xa0522d, 0xd9b26a, 0xefe6c8, 0xc2502a, 0x9aa0a6, 0x2f6fde, 0xff6fb5, 0x3fbf6f, 0x8e5bd9];
const HAIR_STYLES = { buzz: "Buzz", short: "Short", spiky: "Spiky", mohawk: "Mohawk", swoop: "Swoop", bob: "Bob", long: "Long", ponytail: "Ponytail", bun: "Bun", pigtails: "Pigtails", afro: "Afro", dreads: "Dreadlocks", flattop: "Flat top", bald: "Bald" };
function canvasTex(w, h, draw) {
  const c = document.createElement("canvas"); c.width = w; c.height = h; draw(c.getContext("2d"), w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
const kidTex = {};   // made the first time an outfit needs them
const KID_TEX = {
  // a cylinder's texture starts at the front (u = 0) and wraps around, so the back is the middle of the image
  // step 60: a green Goblins jersey. "GOBLINS" across the chest (centered on the seam at u = 0 / 1), a big block 0 on the back.
  jersey: () => canvasTex(512, 128, (g, w, h) => {
    g.fillStyle = "#1f7a3a"; g.fillRect(0, 0, w, h);
    g.fillStyle = "#fff"; g.fillRect(0, 4, w, 7); g.fillStyle = "#f2c230"; g.fillRect(0, 11, w, 3);   // shoulder stripes
    const zero = (cx, top, zw, zh, t) => { g.fillRect(cx - zw / 2, top, zw, t); g.fillRect(cx - zw / 2, top + zh - t, zw, t); g.fillRect(cx - zw / 2, top, t, zh); g.fillRect(cx + zw / 2 - t, top, t, zh); };
    g.fillStyle = "#f2c230"; zero(w / 2, 24, 64, 92, 20);   // gold outline
    g.fillStyle = "#fff"; zero(w / 2, 28, 56, 84, 13);      // the 0, squared off like jersey lettering
    g.font = "900 30px Impact, 'Arial Black', system-ui, sans-serif"; g.textAlign = "center"; g.textBaseline = "middle";
    for (const cx of [0, w]) { g.lineWidth = 4; g.strokeStyle = "#f2c230"; g.strokeText("GOBLINS", cx, 46); g.fillStyle = "#fff"; g.fillText("GOBLINS", cx, 46); }
  }),
  jerseySleeve: () => canvasTex(64, 64, (g, w, h) => { g.fillStyle = "#1f7a3a"; g.fillRect(0, 0, w, h); g.fillStyle = "#fff"; g.fillRect(0, h * 0.55, w, h * 0.12); g.fillStyle = "#f2c230"; g.fillRect(0, h * 0.67, w, h * 0.06); }),
  // step 61: the Baja, after a real one. Dense black, red, yellow and green stripes with a woven chevron look. Up and down on the body,
  // across on the chest panel, the pocket, the sleeves and the hood, which gives it those squared-off blocks.
  baja: () => canvasTex(512, 128, (g, w, h) => {
    bajaStripes(g, 0, 0, w, h, "v");
    const pw = w * 0.13;
    for (const x0 of [0, w - pw]) bajaStripes(g, x0, 0, pw, h * 0.42, "h");   // the chest panel (the front is u = 0 and 1)
    g.fillStyle = "#111"; g.fillRect(pw - 2, 0, 4, h); g.fillRect(w - pw - 2, 0, 4, h);   // seams around the panel
    g.fillStyle = "#3d4a3e"; g.beginPath(); g.moveTo(0, 0); g.lineTo(16, 0); g.lineTo(0, 30); g.fill(); g.beginPath(); g.moveTo(w, 0); g.lineTo(w - 16, 0); g.lineTo(w, 30); g.fill();   // V-neck
  }),
  bajaBelly: () => canvasTex(512, 64, (g, w, h) => bajaStripes(g, 0, 0, w, h, "v")),
  bajaPocket: () => canvasTex(128, 64, (g, w, h) => { bajaStripes(g, 0, 0, w, h, "h"); g.strokeStyle = "#111"; g.lineWidth = 4; g.strokeRect(2, 2, w - 4, h - 4); }),
  bajaSleeve: () => canvasTex(64, 128, (g, w, h) => bajaStripes(g, 0, 0, w, h, "h")),   // rings around the arm
  bajaHood: () => canvasTex(128, 96, (g, w, h) => bajaStripes(g, 0, 0, w, h, "h")),     // rings around the head
  sparkle: () => canvasTex(128, 128, (g, w, h) => {
    g.fillStyle = "#ff5fb0"; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 70; i++) { g.fillStyle = Math.random() < 0.5 ? "#fff" : "#ffd6ef"; const s = Math.random() < 0.2 ? 3 : 2; g.fillRect(Math.random() * w, Math.random() * h, s, s); }
  }),
  trackPants: () => canvasTex(64, 64, (g, w, h) => { g.fillStyle = "#ff5fb0"; g.fillRect(0, 0, w, h); g.fillStyle = "#fff"; g.fillRect(w * 0.22, 0, 4, h); g.fillRect(w * 0.72, 0, 4, h); }),
  skirt: () => canvasTex(128, 32, (g, w, h) => { for (let i = 0; i < 16; i++) { g.fillStyle = i % 2 ? "#c0262d" : "#a51f25"; g.fillRect(i * 8, 0, 8, h); } g.fillStyle = "#fff"; g.fillRect(0, h - 5, w, 3); }),
  cheerTop: () => canvasTex(128, 64, (g, w, h) => {
    g.fillStyle = "#c0262d"; g.fillRect(0, 0, w, h);
    g.strokeStyle = "#fff"; g.lineWidth = 5; g.beginPath(); g.moveTo(0, 6); g.lineTo(14, 34); g.lineTo(28, 6); g.stroke();   // V-neck, front (wraps)
    g.beginPath(); g.moveTo(w, 6); g.lineTo(w - 14, 34); g.stroke();
    g.fillStyle = "#fff"; g.fillRect(0, h - 8, w, 5);
  }),
  // step 50
  flannel: () => canvasTex(128, 128, (g, w, h) => {
    g.fillStyle = "#a3262a"; g.fillRect(0, 0, w, h);
    g.fillStyle = "rgba(20,20,20,.55)"; for (let i = 0; i < 8; i++) { g.fillRect(i * 16 + 2, 0, 7, h); g.fillRect(0, i * 16 + 2, w, 7); }
    g.fillStyle = "rgba(255,255,255,.22)"; for (let i = 0; i < 8; i++) { g.fillRect(i * 16 + 12, 0, 1.5, h); g.fillRect(0, i * 16 + 12, w, 1.5); }
  }),
  stripes: () => canvasTex(64, 64, (g, w, h) => { for (let i = 0; i < 8; i++) { g.fillStyle = i % 2 ? "#111" : "#f2f2f2"; g.fillRect(0, i * 8, w, 8); } }),
  pajamas: () => canvasTex(128, 128, (g, w, h) => {
    g.fillStyle = "#8fb8e8"; g.fillRect(0, 0, w, h);
    g.fillStyle = "#fff6c8"; g.font = "18px system-ui, sans-serif"; g.textAlign = "center"; g.textBaseline = "middle";
    for (let i = 0; i < 12; i++) g.fillText(i % 3 ? "★" : "☾", ((i % 4) + 0.5 + (Math.floor(i / 4) % 2) * 0.5) * (w / 4), (Math.floor(i / 4) + 0.5) * (h / 3));
  }),
  // step 53: goblin clothes. Patched burlap with a ragged hem.
  burlap: () => canvasTex(128, 128, (g, w, h) => {
    g.fillStyle = "#8a6a3e"; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 900; i++) { g.fillStyle = Math.random() < 0.5 ? "rgba(60,40,20,.25)" : "rgba(200,170,110,.18)"; g.fillRect(Math.random() * w, Math.random() * h, 2, 1); }   // the weave
    for (const [x, y, c] of [[14, 30, "#5d7a3a"], [80, 52, "#7a3b2e"], [46, 84, "#4f5d6e"]]) {   // patches, stitched on
      g.fillStyle = c; g.fillRect(x, y, 24, 20); g.strokeStyle = "#e8d9b0"; g.setLineDash([3, 3]); g.lineWidth = 1.5; g.strokeRect(x + 2, y + 2, 20, 16);
    }
    g.setLineDash([]); g.fillStyle = "#3b2a17"; for (let x = 0; x < w; x += 10) { g.beginPath(); g.moveTo(x, h); g.lineTo(x + 5, h - 9 - (x % 3) * 2); g.lineTo(x + 10, h); g.fill(); }   // ragged hem
  }),
  burlapDark: () => canvasTex(64, 64, (g, w, h) => {
    g.fillStyle = "#4e3b24"; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 300; i++) { g.fillStyle = "rgba(0,0,0,.2)"; g.fillRect(Math.random() * w, Math.random() * h, 2, 1); }
    g.fillStyle = "#6b5a3a"; g.fillRect(8, 20, 14, 12); g.strokeStyle = "#d8c89a"; g.setLineDash([2, 2]); g.strokeRect(9, 21, 12, 10);
  }),
  // step 58: punk. A denim vest covered in patches (u = 0 and 1 are the open front, 0.5 the middle of the back).
  punkVest: () => canvasTex(512, 128, (g, w, h) => {
    g.fillStyle = "#4a6f9e"; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 1400; i++) { g.fillStyle = Math.random() < 0.5 ? "rgba(255,255,255,.08)" : "rgba(0,0,30,.12)"; g.fillRect(Math.random() * w, Math.random() * h, 3, 1); }
    const patch = (x, y, pw, ph, bg) => { g.fillStyle = bg; g.fillRect(x, y, pw, ph); g.strokeStyle = "rgba(255,255,255,.55)"; g.setLineDash([3, 3]); g.lineWidth = 1.5; g.strokeRect(x + 2, y + 2, pw - 4, ph - 4); g.setLineDash([]); };
    const anarchy = (cx, cy, r, col) => {   // Ⓐ
      g.strokeStyle = col; g.lineWidth = r * 0.16; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.stroke();
      g.beginPath(); g.moveTo(cx - r * 0.95, cy + r * 1.05); g.lineTo(cx, cy - r * 1.15); g.lineTo(cx + r * 0.95, cy + r * 1.05); g.moveTo(cx - r * 0.75, cy + r * 0.2); g.lineTo(cx + r * 0.75, cy + r * 0.2); g.stroke();
    };
    const pentagram = (cx, cy, r, col) => {   // upside down: one point at the bottom
      g.strokeStyle = col; g.lineWidth = r * 0.12; g.beginPath(); g.arc(cx, cy, r * 1.08, 0, Math.PI * 2); g.stroke();
      g.beginPath(); for (let k = 0; k <= 5; k++) { const a = Math.PI / 2 + (k * 4 * Math.PI) / 5, x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r; k ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke();
    };
    patch(w / 2 - 52, 10, 104, 104, "#111"); anarchy(w / 2, 62, 36, "#e0262b");   // big back patch
    patch(w / 2 - 128, 18, 54, 54, "#e8e2d0"); pentagram(w / 2 - 101, 45, 20, "#111");
    patch(w / 2 + 76, 30, 52, 40, "#c8282a"); g.fillStyle = "#111"; g.font = "900 15px system-ui, sans-serif"; g.textAlign = "center"; g.fillText("NO", w / 2 + 102, 47); g.fillText("FUTURE", w / 2 + 102, 63);
    for (let k = 0; k < 4; k++) for (let j = 0; j < 4; j++) { g.fillStyle = (k + j) % 2 ? "#111" : "#eee"; g.fillRect(w / 2 + 84 + k * 9, 80 + j * 9, 9, 9); }   // checkerboard
    patch(6, 20, 40, 40, "#111"); anarchy(26, 41, 12, "#eee");                            // front, one side
    patch(w - 46, 22, 40, 40, "#e8e2d0"); pentagram(w - 26, 42, 14, "#c8282a");           // front, the other side
    g.fillStyle = "#bfc4cc"; for (const [x, y] of [[w / 2 - 70, 100], [w / 2 + 60, 12], [60, 90]]) { g.fillRect(x, y, 14, 3); g.fillRect(x + 12, y - 2, 4, 7); }   // safety pins
  }),
  ripped: (skin) => canvasTex(64, 128, (g, w, h) => {   // ripped jeans: knee holes (at the front: u = 0 and 1) show skin and white threads
    g.fillStyle = "#34507a"; g.fillRect(0, 0, w, h);
    for (let i = 0; i < 260; i++) { g.fillStyle = "rgba(255,255,255,.07)"; g.fillRect(Math.random() * w, Math.random() * h, 1, 4); }
    for (const [cy, rx, ry] of [[70, 11, 9], [34, 6, 3]]) for (const cx of [0, w]) {
      g.fillStyle = "#c9d3e2"; g.beginPath(); g.ellipse(cx, cy, rx + 2.5, ry + 2.5, 0, 0, Math.PI * 2); g.fill();   // frayed edge
      g.fillStyle = "#" + skin.toString(16).padStart(6, "0"); g.beginPath(); g.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2); g.fill();
      g.fillStyle = "#f2f2f2"; for (let y = cy - ry + 2; y < cy + ry; y += 3) g.fillRect(cx - rx, y, rx * 2, 1);
    }
  }),
  bandPants: () => canvasTex(64, 64, (g, w, h) => { g.fillStyle = "#1c2a5a"; g.fillRect(0, 0, w, h); g.fillStyle = "#e0b43c"; g.fillRect(w * 0.22, 0, 5, h); g.fillRect(w * 0.72, 0, 5, h); }),
};
// Baja stripes: black, red, yellow, green, over and over, each with little woven chevrons. dir "v" runs them up and down, "h" across.
function bajaStripes(g, x0, y0, w, h, dir, sw = 9) {
  const cols = ["#151515", "#c22a2e", "#e2b82c", "#1f9a4e"];
  g.save(); g.beginPath(); g.rect(x0, y0, w, h); g.clip();
  const span = dir === "v" ? w : h;
  for (let i = 0; i * sw < span; i++) {
    const a = i * sw; g.fillStyle = cols[i % 4];
    if (dir === "v") g.fillRect(x0 + a, y0, sw, h); else g.fillRect(x0, y0 + a, w, sw);
    g.strokeStyle = i % 4 ? "rgba(0,0,0,.4)" : "rgba(255,255,255,.12)"; g.lineWidth = 1; g.beginPath();
    for (let b = 0; b < (dir === "v" ? h : w); b += 4) {
      if (dir === "v") { g.moveTo(x0 + a + 1, y0 + b); g.lineTo(x0 + a + sw / 2, y0 + b + 2.5); g.lineTo(x0 + a + sw - 1, y0 + b); }
      else { g.moveTo(x0 + b, y0 + a + 1); g.lineTo(x0 + b + 2.5, y0 + a + sw / 2); g.lineTo(x0 + b, y0 + a + sw - 1); }
    }
    g.stroke();
  }
  g.restore();
}
const ktex = (k) => (kidTex[k] ??= (([name, arg]) => KID_TEX[name](arg && Number(arg)))(k.split(":")));   // "ripped:15843453" passes the skin color
const kmat = (c) => (typeof c === "string" ? new THREE.MeshLambertMaterial({ map: ktex(c), flatShading: true }) : lambert(c));
// Outfits. top/sleeve/pants are a color or a texture name; sleeves: "long", "short" or "none"; pants: "long", "shorts" or "skirt".
// Step 79: what each outfit brings to school (one of these, every morning).
const OUTFIT_PERKS = {
  jock: ["football"], nerd: ["slime", "stinkBomb", "mentos"], punk: ["sprayPaint"], skater: ["kickMe"], band: ["trumpet", "bassDrum"],
  goth: ["skeleton"], cheer: ["loveNote"], fabulous: ["glitterBomb"], pajama: ["oldSock"], goblin: ["slime"], burnout: ["stinkBomb"],
  prep: ["hallPass"], theater: ["disguise"],
};
const perkText = (outfit) => (OUTFIT_PERKS[outfit] ?? []).map((k) => `${ITEM_TYPES[k].icon} ${ITEM_TYPES[k].label.toLowerCase()}`).join(" or ");
const OUTFITS = {
  punk:      { label: "Punk", top: 0x161616, sleeves: "long", pants: "ripped", legs: "long", shoes: 0x111111, extras: ["vest", "boots", "spikeBand", "lockCollar", "noseRing"], hood: 0x1c1c1c },
  jock:      { label: "Jock", top: "jersey", belly: 0x1f7a3a, sleeve: "jerseySleeve", sleeves: "short", pants: 0x8f939a, legs: "long", shoes: 0xf2f2f2, hood: 0x1f7a3a },
  goth:      { label: "Goth", top: 0x141414, sleeves: "long", pants: 0x101010, legs: "long", shoes: 0x080808, extras: ["boots", "coat", "walletChain", "crossChoker"], hood: 0x141414 },
  nerd:      { label: "Nerd", top: 0xf4f4f4, sleeves: "long", pants: 0xc8b07a, legs: "long", shoes: 0x5a3a22, extras: ["buttons", "suspenders", "glasses"], hood: 0x6b7a8f },
  burnout:   { label: "Burnout", top: "baja", belly: "bajaBelly", sleeve: "bajaSleeve", sleeves: "long", pants: 0x4a6a96, legs: "long", baggy: 1.35, shoes: 0x444444, extras: ["hoodBack", "pocket"], hood: "bajaHood" },
  fabulous:  { label: "Fabulous", top: "sparkle", sleeves: "long", pants: "trackPants", legs: "long", shoes: 0xffffff, extras: ["zip"], hood: "sparkle" },
  cheer:     { label: "Cheerleader", top: "cheerTop", belly: 0xc0262d, sleeves: "none", pants: "skirt", legs: "skirt", shoes: 0xffffff, extras: ["socks"], hood: 0xc0262d },
  // step 50
  skater:    { label: "Skater", top: "flannel", sleeves: "long", pants: 0x7d7a55, legs: "shorts", shoes: 0x2b2b2b, extras: ["beanie", "cargo", "socks", "soles"], hat: 0x2f3b33, hood: 0x2f3b33 },
  theater:   { label: "Theater kid", top: "stripes", sleeves: "long", pants: 0x161616, legs: "long", shoes: 0x161616, extras: ["beret", "scarf"], hat: 0x7a1f2b, hood: 0x161616 },
  prep:      { label: "Prep", top: 0x8cc8ec, sleeves: "short", pants: 0xe8dcc0, legs: "long", shoes: 0x6b3b1e, extras: ["collar", "sweater"], hood: 0x1f2f5c },
  pajama:    { label: "Pajama kid", top: "pajamas", sleeves: "long", pants: "pajamas", legs: "long", shoes: 0xf4c6d6, extras: ["slippers", "pjButtons"], hood: 0x8fb8e8 },
  band:      { label: "Band kid", top: 0x1c2a5a, sleeves: "long", pants: "bandPants", legs: "long", shoes: 0x111111, extras: ["shako", "goldButtons", "sash", "epaulets"], hat: 0x1c2a5a, hood: 0x1c2a5a },
  goblin:    { label: "Goblin", top: "burlap", sleeves: "short", pants: "burlapDark", legs: "long", cover: 0.72, shoes: 0x6b5a3a, extras: ["ropeBelt", "satchel", "ears", "wraps"], hood: 0x5a4630 },
};
// the build slider's ends and middle: an upside-down triangle, a rectangle and an hourglass
const shapeSvg = (pts) => `<svg viewBox="0 0 20 24" width="18" height="22" aria-hidden="true"><polygon points="${pts}" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`;
const BUILD_ICONS = [shapeSvg("2,3 18,3 10,21"), shapeSvg("4,3 16,3 16,21 4,21"), shapeSvg("3,3 17,3 11,12 17,21 3,21 9,12")];
function randomLook() {
  return { outfit: pick(Object.keys(OUTFITS)), hair: pick(Object.keys(HAIR_STYLES)), hairColor: Math.floor(Math.random() * 7), skin: Math.floor(Math.random() * SKIN_TONES.length),
    height: Math.round(rand(0.25, 0.75) * 100) / 100, weight: Math.round(rand(0.2, 0.6) * 100) / 100, build: Math.round(rand(-0.8, 0.8) * 100) / 100 };
}
// look: height and weight 0..1, build -1 (upside-down triangle) .. 0 (rectangle) .. 1 (hourglass)
function buildKid(look) {
  const O = OUTFITS[look.outfit] ?? OUTFITS.punk, skin = SKIN_TONES[look.skin] ?? SKIN_TONES[1], hc = HAIR_COLORS[look.hairColor] ?? HAIR_COLORS[1];
  const H = 0.9 + 0.2 * (look.height ?? 0.5), W = 0.85 + 0.45 * (look.weight ?? 0.35), B = clamp(look.build ?? 0, -1, 1);
  const g = new THREE.Group(), add = (m, parent = g) => { parent.add(m); return m; };
  const mesh = (geo, mat, x, y, z, parent) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); return add(m, parent); };
  const skinM = lambert(skin), topM = kmat(O.top), pantsM = kmat(O.pants === "ripped" ? "ripped:" + skin : O.pants), shoeM = lambert(O.shoes), hairM = lambert(hc);
  // proportions
  const legLen = 0.54 * H, hipY = 0.06 + legLen, torsoLen = 0.5 * H, waistY = hipY + 0.16 * H, shoulderY = hipY + torsoLen;
  const shoulder = (B < 0 ? 0.21 - B * 0.07 : 0.21 - B * 0.015) * W, waist = (B < 0 ? 0.18 + B * 0.01 : 0.18 - B * 0.05) * W, hip = (B < 0 ? 0.18 + B * 0.035 : 0.18 + B * 0.04) * W;
  const depth = 0.62, headR = 0.19, headY = shoulderY + 0.07 + headR;
  // torso: chest (waist up to shoulders) and belly (hips up to waist), flattened front to back
  const chest = mesh(new THREE.CylinderGeometry(shoulder, waist, shoulderY - waistY, 10), topM, 0, (shoulderY + waistY) / 2, 0); chest.scale.z = depth;
  const belly = mesh(new THREE.CylinderGeometry(waist, hip, waistY - hipY + 0.04, 10), O.belly != null ? kmat(O.belly) : topM, 0, (waistY + hipY) / 2 - 0.02, 0); belly.scale.z = depth;
  const shoulderCap = mesh(new THREE.SphereGeometry(shoulder, 10, 4, 0, Math.PI * 2, 0, Math.PI / 2), topM, 0, shoulderY - 0.005, 0); shoulderCap.scale.set(1, 0.32, depth);
  const pelvis = mesh(new THREE.CylinderGeometry(hip, hip * 0.92, 0.12, 10), O.legs === "skirt" ? skinM : pantsM, 0, hipY - 0.04, 0); pelvis.scale.z = depth;
  mesh(new THREE.CylinderGeometry(0.06, 0.07, 0.1, 6), skinM, 0, shoulderY + 0.04, 0);   // neck
  // legs, each swinging from the hip
  const legR = 0.075 * W * (O.baggy ?? 1), legs = [];
  for (const sx of [-1, 1]) {
    const pivot = add(new THREE.Group()); pivot.position.set(sx * hip * 0.5, hipY, 0); legs.push(pivot);
    const covered = O.legs === "long" ? O.cover ?? 1 : O.legs === "shorts" ? 0.4 : 0;
    if (covered > 0) mesh(new THREE.CylinderGeometry(legR, legR * (O.baggy ? 1 : 0.85), legLen * covered, 7), pantsM, 0, -legLen * covered / 2, 0, pivot);
    if (covered < 1) mesh(new THREE.CylinderGeometry(0.06 * W, 0.05 * W, legLen * (1 - covered), 7), skinM, 0, -legLen * covered - legLen * (1 - covered) / 2, 0, pivot);
    if (O.extras?.includes("socks")) mesh(new THREE.CylinderGeometry(0.056 * W, 0.054 * W, 0.12, 7), lambert(0xffffff), 0, -legLen + 0.06, 0, pivot);
    const boot = O.extras?.includes("boots");
    if (boot) mesh(new THREE.CylinderGeometry(0.07 * W, 0.07 * W, 0.16, 7), shoeM, 0, -legLen + 0.06, 0, pivot);
    if (O.extras?.includes("wraps")) for (let k = 0; k < 3; k++) mesh(new THREE.CylinderGeometry(0.058 * W, 0.058 * W, 0.03, 7), lambert(0xcdbb8e), 0, -legLen + 0.05 + k * 0.045, 0, pivot);   // cloth foot wraps
    if (O.extras?.includes("slippers")) {   // fluffy, with a pom-pom
      mesh(new THREE.IcosahedronGeometry(0.1, 1), shoeM, 0, -legLen - 0.01, 0.05, pivot).scale.set(0.85, 0.55, 1.45);
      mesh(new THREE.IcosahedronGeometry(0.035, 0), lambert(0xffffff), 0, -legLen + 0.04, 0.12, pivot);
    } else mesh(new THREE.BoxGeometry(0.13, 0.08, 0.25), shoeM, 0, -legLen - 0.02, 0.04, pivot);
    if (O.extras?.includes("soles")) mesh(new THREE.BoxGeometry(0.14, 0.03, 0.26), lambert(0xeeeeee), 0, -legLen - 0.06, 0.04, pivot);
    if (O.extras?.includes("cargo")) mesh(new THREE.BoxGeometry(0.035, 0.1, 0.09), pantsM, sx * (legR + 0.01), -legLen * 0.22, 0, pivot);
    if (O.extras?.includes("converse")) { mesh(new THREE.BoxGeometry(0.135, 0.085, 0.07), lambert(0xf2f2f2), 0, -legLen - 0.02, 0.15, pivot); mesh(new THREE.BoxGeometry(0.14, 0.025, 0.26), lambert(0xf2f2f2), 0, -legLen - 0.055, 0.04, pivot); }
  }
  if (O.legs === "skirt") { const sk = mesh(new THREE.CylinderGeometry(hip * 0.95, hip * 1.45, 0.24, 16, 1, true), new THREE.MeshLambertMaterial({ map: ktex("skirt"), flatShading: true, side: THREE.DoubleSide }), 0, hipY - 0.06, 0); sk.scale.z = 0.8; }
  // arms, each swinging from the shoulder
  const armLen = 0.5 * H, armR = 0.052 * W, arms = [];
  const sleeveLen = O.sleeves === "long" ? armLen - 0.04 : O.sleeves === "short" ? armLen * 0.36 : 0, sleeveM = O.sleeve ? kmat(O.sleeve) : topM;
  for (const sx of [-1, 1]) {
    const pivot = add(new THREE.Group()); pivot.position.set(sx * (shoulder + armR * 0.6), shoulderY - 0.04, 0); pivot.rotation.z = sx * 0.07; arms.push(pivot);
    if (sleeveLen) mesh(new THREE.CylinderGeometry(armR * 1.15, armR * 1.05, sleeveLen, 7), sleeveM, 0, -sleeveLen / 2, 0, pivot);
    if (armLen - sleeveLen > 0.01) mesh(new THREE.CylinderGeometry(armR * 0.9, armR * 0.8, armLen - sleeveLen, 7), skinM, 0, -sleeveLen - (armLen - sleeveLen) / 2, 0, pivot);
    mesh(new THREE.IcosahedronGeometry(armR * 1.05, 0), skinM, 0, -armLen - 0.02, 0, pivot);
    if (O.extras?.includes("spikeBand")) {   // step 58: a studded leather wristband
      const y = -armLen + 0.07, r = armR * 1.02, band = mesh(new THREE.CylinderGeometry(r + 0.012, r + 0.012, 0.06, 10), lambert(0x111111), 0, y, 0, pivot);
      for (let k = 0; k < 6; k++) { const a = (k / 6) * Math.PI * 2, sp = mesh(new THREE.ConeGeometry(0.012, 0.035, 4), lambert(0xd8dce2), Math.sin(a) * (r + 0.025), y, Math.cos(a) * (r + 0.025), pivot); sp.rotation.set(Math.PI / 2, 0, 0); sp.rotation.order = "YXZ"; sp.rotation.y = a; }
    }
  }
  // head and face
  const head = mesh(new THREE.IcosahedronGeometry(headR, 1), skinM, 0, headY, 0); head.scale.y = 1.08;
  const eyes = add(new THREE.Group()), eyeM = lambert(0x1d1d1d);
  for (const sx of [-1, 1]) mesh(new THREE.BoxGeometry(0.045, 0.04, 0.02), eyeM, sx * 0.07, headY + 0.02, headR - 0.01, eyes);
  if (O.extras?.includes("glasses")) {
    const gm = lambert(0x222222);
    for (const sx of [-1, 1]) { mesh(new THREE.TorusGeometry(0.045, 0.01, 4, 10), gm, sx * 0.075, headY + 0.02, headR + 0.005, eyes); }
    mesh(new THREE.BoxGeometry(0.06, 0.012, 0.012), gm, 0, headY + 0.03, headR + 0.005, eyes);
  }
  // outfit details
  const ex = O.extras ?? [], frontZ = (r) => r * depth + 0.004;
  // how far forward the body's surface is at height y, x to the side (so studs and straps sit on it, not in the air)
  const bodyR = (y) => (y >= waistY ? waist + (shoulder - waist) * clamp((y - waistY) / (shoulderY - waistY), 0, 1) : hip + (waist - hip) * clamp((y - hipY) / (waistY - hipY), 0, 1));
  const surfZ = (y, x, grow = 1) => { const r = bodyR(y) * grow; return depth * r * Math.sqrt(Math.max(0, 1 - (x / r) ** 2)) + 0.006; };
  if (ex.includes("vest")) {   // denim vest: a shell over the shirt, open down the front
    const v = mesh(new THREE.CylinderGeometry(shoulder * 1.07, waist * 1.08, shoulderY - waistY + 0.02, 16, 1, true, 0.5, Math.PI * 2 - 1.0), new THREE.MeshLambertMaterial({ map: ktex("punkVest"), side: THREE.DoubleSide }), 0, (shoulderY + waistY) / 2, 0);
    v.scale.z = depth;
    for (let i = 0; i < 6; i++) { const x = (i % 2 ? 1 : -1) * shoulder * 0.5, y = shoulderY - 0.07 - Math.floor(i / 2) * 0.07; mesh(new THREE.BoxGeometry(0.022, 0.022, 0.022), lambert(0xd8d8d8), x, y, surfZ(y, x, 1.07)); }   // studs
  }
  if (ex.includes("lockCollar")) {   // step 58: spiked collar with a padlock
    const ny = shoulderY + 0.055, cr = 0.072;
    const c = mesh(new THREE.TorusGeometry(cr, 0.016, 5, 14), lambert(0x111111), 0, ny, 0); c.rotation.x = Math.PI / 2;
    for (let k = 0; k < 7; k++) { const a = Math.PI + ((k - 3) / 7) * Math.PI * 1.6, sp = mesh(new THREE.ConeGeometry(0.01, 0.03, 4), lambert(0xd8dce2), Math.sin(a) * (cr + 0.018), ny, Math.cos(a) * (cr + 0.018)); sp.rotation.order = "YXZ"; sp.rotation.set(Math.PI / 2, a, 0); }
    mesh(new THREE.BoxGeometry(0.04, 0.035, 0.015), lambert(0xc9a227), 0, ny - 0.04, cr + 0.02);   // the padlock
    const sh = mesh(new THREE.TorusGeometry(0.013, 0.004, 4, 8, Math.PI), lambert(0xd8dce2), 0, ny - 0.022, cr + 0.02);
  }
  if (ex.includes("noseRing")) { const nr = mesh(new THREE.TorusGeometry(0.016, 0.0045, 4, 10), lambert(0xe8ecf0), 0.012, headY - 0.045, headR + 0.003); nr.rotation.y = Math.PI / 2; }
  if (ex.includes("buttons")) for (let i = 0; i < 4; i++) { const y = shoulderY - 0.07 - i * 0.09; mesh(new THREE.BoxGeometry(0.02, 0.02, 0.01), lambert(0xbbbbbb), 0, y, surfZ(y, 0)); }
  if (ex.includes("suspenders")) {
    const sm = lambert(0x8b1e2d);
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
      for (let k = 0; k < 4; k++) {   // in four pieces, so each one hugs the body
        const y0 = hipY + ((shoulderY - hipY) * k) / 4, y1 = hipY + ((shoulderY - hipY) * (k + 1)) / 4, ym = (y0 + y1) / 2, x = sx * bodyR(ym) * 0.45;
        mesh(new THREE.BoxGeometry(0.035, y1 - y0 + 0.01, 0.012), sm, x, ym, sz * surfZ(ym, x));
      }
    }
  }
  // step 60: goth. A long black coat open at the front, a wallet chain drooping from a front belt loop to the back pocket, and a choker with a silver cross.
  if (ex.includes("coat")) {
    const top = shoulderY + 0.01, bot = hipY - legLen * 0.62, gap = 0.8;
    const coatM = new THREE.MeshLambertMaterial({ color: 0x1c1a22, flatShading: true }), liningM = new THREE.MeshLambertMaterial({ color: 0x5a0f1e, flatShading: true, side: THREE.BackSide });
    const coatGeo = new THREE.CylinderGeometry(shoulder * 1.1, hip * 1.75, top - bot, 16, 1, true, gap / 2, Math.PI * 2 - gap);
    for (const m of [coatM, liningM]) mesh(coatGeo, m, 0, (top + bot) / 2, -0.01).scale.z = 0.78;   // black outside, blood-red lining inside
    for (const sx of [-1, 1]) { const lap = mesh(new THREE.BoxGeometry(0.07, 0.2, 0.015), coatM, sx * shoulder * 0.42, shoulderY - 0.09, surfZ(shoulderY - 0.09, sx * shoulder * 0.42, 1.1) + 0.01); lap.rotation.z = sx * 0.35; }   // lapels
    for (const sx of [-1, 1]) for (let k = 0; k < 3; k++) mesh(new THREE.BoxGeometry(0.018, 0.018, 0.01), lambert(0x9aa0a8), sx * shoulder * 0.62, waistY + 0.1 - k * 0.1, surfZ(waistY + 0.1 - k * 0.1, sx * shoulder * 0.62, 1.12) + 0.01);   // silver buttons
  }
  if (ex.includes("walletChain")) {   // a loop of chain drooping across the front of the hip, from a belt loop to the pocket
    const cm = new THREE.MeshLambertMaterial({ color: 0xc8ccd2, flatShading: true }), N = 16, pts = [];
    for (let i = 0; i <= N; i++) { const t = i / N, a = -0.25 + t * 1.25, r = hip * 1.06; pts.push(new THREE.Vector3(Math.sin(a) * r, hipY - 0.01 - 0.16 * Math.sin(Math.PI * t), Math.cos(a) * r * depth + 0.03)); }
    for (let i = 0; i < N; i++) {
      const p0 = pts[i], p1 = pts[i + 1], link = mesh(new THREE.TorusGeometry(0.016, 0.005, 4, 8), cm, (p0.x + p1.x) / 2, (p0.y + p1.y) / 2, (p0.z + p1.z) / 2);
      link.lookAt(link.position.clone().add(p1.clone().sub(p0))); link.rotateY(Math.PI / 2); if (i % 2) link.rotateX(Math.PI / 2);   // alternating links, like a real chain
      link.scale.set(1.5, 1, 1);
    }
  }
  if (ex.includes("crossChoker")) {
    const ny = shoulderY + 0.06; const c = mesh(new THREE.TorusGeometry(0.07, 0.012, 4, 14), lambert(0x111111), 0, ny, 0); c.rotation.x = Math.PI / 2;
    const sm = lambert(0xd8dce2), z = 0.07 + 0.014;
    mesh(new THREE.BoxGeometry(0.018, 0.09, 0.012), sm, 0, ny - 0.06, z); mesh(new THREE.BoxGeometry(0.055, 0.017, 0.012), sm, 0, ny - 0.04, z);   // the cross
  }
  let hoodBack = null;
  if (ex.includes("hoodBack")) {   // a hoodie's hood, down: a folded pouch lying on the upper back
    // step 61: folded flat against the upper back, stripes running across (a round shape turned them into a bullseye)
    hoodBack = mesh(new THREE.BoxGeometry(shoulder * 1.35, 0.17, 0.05), kmat("bajaPocket"), 0, shoulderY - 0.06, -surfZ(shoulderY - 0.06, 0) - 0.02);
    hoodBack.rotation.x = 0.18;
  }
  if (ex.includes("pocket")) mesh(new THREE.BoxGeometry(waist * 1.25, 0.17, 0.025), kmat("bajaPocket"), 0, waistY - 0.03, frontZ(waist) + 0.008);   // the kangaroo pocket
  // step 50
  if (ex.includes("collar")) for (const sx of [-1, 1]) { const c = mesh(new THREE.BoxGeometry(0.08, 0.025, 0.06), topM, sx * 0.05, shoulderY + 0.01, frontZ(shoulder) * 0.55); c.rotation.set(0.5, 0, sx * 0.35); }
  if (ex.includes("sweater")) {   // a sweater tied over the shoulders, sleeves knotted in front
    const swM = lambert(0x1f2f5c);
    const ring = mesh(new THREE.TorusGeometry(shoulder * 1.02, 0.045, 5, 16), swM, 0, shoulderY - 0.03, 0); ring.rotation.x = Math.PI / 2 - 0.25; ring.scale.set(1, depth * 1.25, 1);
    mesh(new THREE.IcosahedronGeometry(0.05, 0), swM, 0, shoulderY - 0.1, surfZ(shoulderY - 0.1, 0) + 0.02);
    for (const sx of [-1, 1]) { const sl = mesh(new THREE.CylinderGeometry(0.035, 0.03, 0.16, 5), swM, sx * 0.04, shoulderY - 0.18, surfZ(shoulderY - 0.18, 0) + 0.02); sl.rotation.z = sx * 0.3; }
  }
  if (ex.includes("scarf")) { const sc = mesh(new THREE.TorusGeometry(0.085, 0.03, 5, 12), lambert(0xe0b43c), 0, shoulderY + 0.03, 0); sc.rotation.x = Math.PI / 2; mesh(new THREE.BoxGeometry(0.06, 0.2, 0.025), lambert(0xe0b43c), 0.05, shoulderY - 0.08, surfZ(shoulderY - 0.08, 0.05) + 0.01); }
  if (ex.includes("pjButtons")) for (let i = 0; i < 4; i++) { const y = shoulderY - 0.07 - i * 0.09; mesh(new THREE.BoxGeometry(0.025, 0.025, 0.01), lambert(0xffffff), 0, y, surfZ(y, 0)); }
  if (ex.includes("goldButtons")) for (let i = 0; i < 8; i++) { const y = shoulderY - 0.08 - Math.floor(i / 2) * 0.08, x = (i % 2 ? 1 : -1) * bodyR(y) * 0.32; mesh(new THREE.BoxGeometry(0.025, 0.025, 0.012), lambert(0xe0b43c), x, y, surfZ(y, x)); }
  if (ex.includes("sash")) for (const sz of [-1, 1]) {   // a white cross belt, shoulder to hip, front and back
    const dy = (shoulderY - waistY - 0.02) / 6, dx = (shoulder * 1.4) / 6, len = Math.hypot(dx, dy) + 0.01;
    for (let k = 0; k < 6; k++) { const t = (k + 0.5) / 6, y = shoulderY - 0.04 - t * (shoulderY - waistY - 0.02), x = sz * (0.5 - t) * shoulder * 1.4;
      const b = mesh(new THREE.BoxGeometry(0.05, len, 0.012), lambert(0xf4f4f4), x, y, sz * surfZ(y, x)); b.rotation.z = -sz * Math.atan2(dx, dy); }
  }
  if (ex.includes("epaulets")) for (const sx of [-1, 1]) mesh(new THREE.BoxGeometry(0.1, 0.025, 0.1), lambert(0xe0b43c), sx * shoulder * 0.85, shoulderY + 0.005, 0);
  if (ex.includes("ropeBelt")) { const b = mesh(new THREE.TorusGeometry(waist * 1.02, 0.018, 4, 14), lambert(0xc9a86a), 0, waistY - 0.02, 0); b.rotation.x = Math.PI / 2; b.scale.y = depth;
    mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.12, 4), lambert(0xc9a86a), waist * 0.4, waistY - 0.09, surfZ(waistY - 0.09, waist * 0.4)); }   // the knot's loose end
  if (ex.includes("satchel")) {
    mesh(new THREE.BoxGeometry(0.14, 0.12, 0.06), lambert(0x5a4024), -(hip + 0.04), hipY + 0.02, 0.02);
    const dy = (shoulderY - hipY - 0.05) / 6, dx = (shoulder * 1.5) / 6, len = Math.hypot(dx, dy) + 0.01;
    for (const sz of [-1, 1]) for (let k = 0; k < 6; k++) {   // strap from the right shoulder to the bag on the left hip, front and back
      const t = (k + 0.5) / 6, y = shoulderY - 0.02 - t * (shoulderY - hipY - 0.05), x = (0.5 - t) * shoulder * 1.5;
      const st = mesh(new THREE.BoxGeometry(0.03, len, 0.01), lambert(0x3e2b16), x, y, sz * surfZ(y, x)); st.rotation.z = -Math.atan2(dx, dy);
    }
  }
  if (ex.includes("zip")) mesh(new THREE.BoxGeometry(0.015, shoulderY - hipY - 0.02, 0.01), lambert(0xffffff), 0, (shoulderY + hipY) / 2, frontZ((shoulder + waist) / 2) + 0.004);
  // hair
  const hair = add(new THREE.Group());
  const hat = ex.find((e) => e === "beanie" || e === "beret" || e === "shako");
  buildHair(hair, look.hair ?? "short", hairM, headR, headY, !!hat);
  if (hat) buildHat(hair, hat, lambert(O.hat), headR, headY, look.hair);
  if (ex.includes("ears")) for (const sx of [-1, 1]) {   // big pointy goblin ears (skin colored; the hood hides them with the hair)
    const e = mesh(new THREE.ConeGeometry(0.05, 0.22, 4), skinM, sx * (headR + 0.06), headY + 0.04, -0.01, hair);
    e.rotation.set(0, 0, -sx * 1.15); e.scale.z = 0.45;
  }   // in the hair group, so the hood hides it too
  // step 58: the hood, up. Shaped around the head with the face showing (it used to be a plain ball over everything).
  const hood = add(new THREE.Group()); hood.visible = false;
  {
    const hm = typeof O.hood === "string" ? new THREE.MeshLambertMaterial({ map: ktex(O.hood), side: THREE.DoubleSide }) : new THREE.MeshLambertMaterial({ color: O.hood ?? 0x5d626b, flatShading: true, side: THREE.DoubleSide });
    // one lathe profile from the crown, around the head, down the neck and out over the shoulders; the front is left open for the face
    const P = [[0.001, headY + headR * 1.22], [0.1, headY + headR * 1.13], [0.17, headY + headR * 0.8], [headR * 1.16, headY + headR * 0.15], [headR * 1.12, headY - headR * 0.5],
      [headR * 0.92, headY - headR * 0.95], [headR * 0.95, shoulderY + 0.07], [shoulder * 0.8, shoulderY + 0.01], [shoulder * 0.98, shoulderY - 0.05]].map(([r, y]) => new THREE.Vector2(r, y - headY));
    const gap = 1.7, shell = mesh(new THREE.LatheGeometry(P, 18, gap / 2, Math.PI * 2 - gap), hm, 0, headY, -0.03, hood);
    shell.scale.set(1.02, 1, 1.12);   // a little longer front to back
    const peak = mesh(new THREE.ConeGeometry(0.06, 0.13, 6), hm, 0, headY + headR * 0.75, -headR * 1.05, hood); peak.rotation.x = -2.0;   // the point at the back
    if (ex.includes("hoodBack")) for (const sx of [-1, 1]) mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.16, 4), lambert(0xf2ead6), sx * 0.06, shoulderY - 0.02, surfZ(shoulderY - 0.02, sx * 0.06) + 0.012, hood);   // drawstrings
  }
  g.userData = { legs, arms, eyes, hair, hood, hoodBack, headY, outfit: O, walk: 0 };
  return g;
}
// a dome over the top of the head, open at the front, or a shell around the sides and back (for longer styles)
const hairShell = (r, frontGap, down) => new THREE.SphereGeometry(r, 14, 8, Math.PI / 2 + frontGap / 2, Math.PI * 2 - frontGap, 0, down);
// step 50: hats. Big hair makes the hat sit bigger.
function buildHat(g, kind, m, r, y, style) {
  const mesh = (geo, mm, x, yy, z) => { const o = new THREE.Mesh(geo, mm); o.position.set(x, yy, z); g.add(o); return o; };
  const big = style === "afro" ? 1.4 : style === "flattop" || style === "dreads" ? 1.12 : 1;
  if (kind === "beanie") {
    const b = mesh(new THREE.SphereGeometry(r * 1.14 * big, 14, 7, 0, Math.PI * 2, 0, Math.PI * 0.5), m, 0, y + 0.07, -0.015); b.scale.y = 1.1;
    mesh(new THREE.CylinderGeometry(r * 1.15 * big, r * 1.15 * big, 0.06, 14), m, 0, y + 0.1, -0.015);   // the folded brim
  } else if (kind === "beret") {
    const b = mesh(new THREE.CylinderGeometry(r * 1.2 * big, r * 1.05 * big, 0.07, 14), m, 0.03, y + r * 0.86 * big, -0.01); b.rotation.z = -0.28;
    mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.04, 4), m, 0.05, y + r * 0.86 * big + 0.05, -0.01);
  } else if (kind === "shako") {   // marching band hat: tall, with a brim, a gold badge and a white plume
    const top = y + r * 0.62 * big;
    mesh(new THREE.CylinderGeometry(r * 1.0 * big, r * 1.05 * big, 0.24, 12), m, 0, top + 0.12, -0.01);
    const brim = mesh(new THREE.CylinderGeometry(r * 0.7, r * 0.7, 0.02, 10, 1, false, -Math.PI / 2, Math.PI), lambert(0x111111), 0, top + 0.01, r * 0.75 * big); brim.scale.z = 0.7;
    mesh(new THREE.BoxGeometry(0.07, 0.07, 0.015), lambert(0xe0b43c), 0, top + 0.13, r * 1.03 * big);
    mesh(new THREE.ConeGeometry(0.05, 0.2, 6), lambert(0xffffff), 0, top + 0.34, -0.01);
  }
}
// hat: a hat sits on top, so skip the parts that would poke through it
// step 66: long hair, as a curtain open at the face that falls from ear level past the shoulders and flares a little, with uneven tips
function longHairGeo(r, y, len = 0.36, gap = 1.9) {
  const top = y - r * 0.25, parts = [[new THREE.CylinderGeometry(r * 1.07, r * 1.32, len, 16, 1, true, gap / 2, Math.PI * 2 - gap).scale(1, 1, 0.85).translate(0, top - len / 2, -0.03)]];
  for (let k = 0; k < 8; k++) {
    const a = gap / 2 + 0.4 + k * ((Math.PI * 2 - gap - 0.8) / 7), tl = 0.06 + (k % 3) * 0.035;
    parts.push([new THREE.ConeGeometry(0.055, tl, 4).rotateX(Math.PI).translate(Math.sin(a) * r * 1.29, top - len - tl / 2 + 0.01, Math.cos(a) * r * 1.29 * 0.85 - 0.03)]);
  }
  return mergeGeo(parts);
}
function buildHair(hair, style, m, r, y, hat = false) {
  const mesh = (geo, x, yy, z) => { const o = new THREE.Mesh(geo, m); o.position.set(x, yy, z); hair.add(o); return o; };
  const cap = (s = 1.07) => { const c = mesh(new THREE.SphereGeometry(r * s, 14, 6, 0, Math.PI * 2, 0, Math.PI * 0.42), 0, y + 0.02, -0.012); c.scale.y = 1.12; return c; };
  if (style === "bald") return;
  if (style === "buzz") { cap(1.03); return; }
  if (hat && ["mohawk", "spiky", "swoop", "bun"].includes(style)) style = "buzz";   // squashed flat under the hat
  if (style === "mohawk") {   // a strip following the curve of the head, front to back
    // step 65: from the front hairline (a bit forward of the top) back over the crown and down to the nape; it used to run the other way, nearly to the eyes
    for (let k = 0; k < 6; k++) { const a = 0.45 - k * 0.47, b = mesh(new THREE.BoxGeometry(0.05, k === 5 ? 0.1 : 0.13, 0.09), 0, y + Math.cos(a) * r * 1.1, Math.sin(a) * r * 1.02); b.rotation.x = a; }
    return;
  }
  cap();
  if (style === "short") { const f = mesh(new THREE.SphereGeometry(r * 1.08, 12, 4, Math.PI * 0.2, Math.PI * 0.6, Math.PI * 0.3, Math.PI * 0.16), 0, y + 0.02, -0.012); f.scale.y = 1.12; }   // a fringe
  if (style === "spiky") for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2, s = mesh(new THREE.ConeGeometry(0.045, 0.17, 4), Math.sin(a) * r * 0.6, y + r * 1.02, Math.cos(a) * r * 0.6 - 0.02); s.rotation.set(Math.cos(a) * 0.55, 0, -Math.sin(a) * 0.55); }
  if (style === "spiky") mesh(new THREE.ConeGeometry(0.05, 0.18, 4), 0, y + r + 0.1, -0.02);
  if (style === "swoop") { const s = mesh(new THREE.BoxGeometry(0.2, 0.06, 0.16), 0.05, y + 0.08, r * 0.78); s.rotation.set(-0.5, 0, -0.45); }
  if (style === "bob") { const b = mesh(hairShell(r * 1.12, 1.6, Math.PI * 0.6), 0, y + 0.01, -0.01); b.scale.y = 1.1; }
  if (style === "long") {
    const b = mesh(hairShell(r * 1.1, 1.6, Math.PI * 0.62), 0, y + 0.01, -0.01); b.scale.y = 1.1;
    const dm = m.clone(); dm.side = THREE.DoubleSide; hair.add(new THREE.Mesh(longHairGeo(r, y), dm));
  }
  if (style === "ponytail") { mesh(new THREE.IcosahedronGeometry(0.06, 0), 0, y + 0.06, -r - 0.02); const t = mesh(new THREE.CylinderGeometry(0.05, 0.025, 0.26, 6), 0, y - 0.08, -r - 0.06); t.rotation.x = 0.25; }
  if (style === "bun") mesh(new THREE.IcosahedronGeometry(0.085, 1), 0, y + r + 0.02, -r * 0.45);
  if (style === "pigtails") for (const sx of [-1, 1]) { mesh(new THREE.IcosahedronGeometry(0.045, 0), sx * r * 0.95, y + 0.04, -0.03); const t = mesh(new THREE.CylinderGeometry(0.045, 0.02, 0.24, 6), sx * (r + 0.03), y - 0.1, -0.03); t.rotation.z = -sx * 0.15; }
  if (style === "dreads") {   // locs hanging all round, except the face
    for (let i = 0; i < 18; i++) {
      const a = Math.PI * 0.3 + (i / 17) * Math.PI * 1.4, len = 0.24 + (i % 3) * 0.04;
      const l = mesh(new THREE.CylinderGeometry(0.026, 0.022, len, 5), Math.sin(a) * r * 1.0, y - len / 2 + 0.06, Math.cos(a) * r * 1.0 - 0.01);
      l.rotation.set(Math.cos(a) * -0.18, 0, Math.sin(a) * 0.18);
    }
    for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2; mesh(new THREE.IcosahedronGeometry(0.04, 0), Math.sin(a) * r * 0.55, y + r * 0.95, Math.cos(a) * r * 0.55 - 0.02); }   // lumpy top
  }
  if (style === "flattop" && !hat) {   // tall and dead flat on top
    const f = mesh(new THREE.CylinderGeometry(r * 0.95, r * 1.02, 0.2, 8), 0, y + r * 0.86, -0.015); f.rotation.y = Math.PI / 8; f.scale.z = 1.02;
  }
  if (style === "afro") { const a = mesh(hairShell(r * 1.55, 1.9, Math.PI * 0.68), 0, y + 0.06, -0.03); a.scale.set(1, 0.95, 1); mesh(new THREE.IcosahedronGeometry(r * 1.45, 1), 0, y + 0.14, -0.06).scale.set(1, 0.7, 1); }
}
// swing the arms and legs while moving
function animateKid(m, speed, dt) {
  const u = m.userData; if (!u?.legs) return;
  const amt = clamp(speed / 4.5, 0, 1);
  u.walk += dt * (5 + speed * 1.6) * (amt > 0.05 ? 1 : 0);
  const sw = Math.sin(u.walk) * 0.65 * amt;
  u.legs[0].rotation.x = sw; u.legs[1].rotation.x = -sw;
  u.arms[0].rotation.x = -sw * 0.8; u.arms[1].rotation.x = sw * 0.8;
}

// ---------- player ----------
const player = {
  x: 0, z: 0, vx: 0, vz: 0, heading: 0, stamina: 1, staminaMax: 1, boostT: 0, sprinting: false, winded: false, shoveCD: 0,
  hidden: null, hideT: 0, hideArmed: false, graceT: 0, invisT: 0, pushSpot: null, pushT: 0, slipT: 0, dazeT: 0, stuckT: 0, ride: null,
  mesh: (() => { const g = new THREE.Group(); scene.add(g); return g; })(),   // holds your kid (step 46: built from your look) and the hood
  kid: null,
  hoodT: 0, hoodCD: 0,
};
// the hood (step 40), pulled up over your kid's head
const setHood = (kid, up) => { const U = kid.userData; U.hood.visible = up; U.hair.visible = !up; if (U.hoodBack) U.hoodBack.visible = !up; };
const showHood = (up) => { if (player.kid) setHood(player.kid, up); };

// ---------- crowd (instanced: one mesh for bodies, one for heads) ----------
const crowd = [];
// Step 62: crowd kids are little people (torso, hips, swinging legs and arms, a head with eyes, hair, sometimes a backpack), not cylinders.
// Each part is one instanced mesh for the whole crowd, so it's still a handful of draw calls. Vertex colors darken bits of a part
// (shoes, eyes, straps); the per-kid instance color does the rest.
function mergeGeo(parts) {   // [[geometry, shade]] -> one geometry with a gray vertex color per part
  const pos = [], nor = [], col = [];
  for (const [geo, shade = 1] of parts) {
    const g = geo.index ? geo.toNonIndexed() : geo; g.computeVertexNormals();
    pos.push(...g.attributes.position.array); nor.push(...g.attributes.normal.array);
    for (let i = 0; i < g.attributes.position.count; i++) col.push(shade, shade, shade);
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3)); out.setAttribute("normal", new THREE.Float32BufferAttribute(nor, 3)); out.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
  return out;
}
const CK = { hipY: 0.56, shoulderY: 1.03, headY: 1.27, headR: 0.17, legX: 0.085, armX: 0.235, armY: 0.99, depth: 0.62 };   // crowd kid proportions
const PANTS_COLORS = [0x3d5a80, 0x34507a, 0x2b3a55, 0x5b6f8c, 0xc8b07a, 0x2b2b2b, 0x6d6d6d, 0x4a4036];
const crowdParts = (() => {
  const C = CK, cyl = (rt, rb, h, seg = 8) => new THREE.CylinderGeometry(rt, rb, h, seg);
  const squash = (g) => g.scale(1, 1, C.depth);
  const torso = mergeGeo([[squash(cyl(0.2, 0.17, 0.3).translate(0, 0.88, 0))], [squash(cyl(0.17, 0.175, 0.2).translate(0, 0.65, 0))],
    [squash(new THREE.SphereGeometry(0.2, 8, 3, 0, Math.PI * 2, 0, Math.PI / 2).scale(1, 0.3, 1).translate(0, C.shoulderY - 0.005, 0))]]);
  const hips = mergeGeo([[squash(cyl(0.175, 0.165, 0.12).translate(0, C.hipY - 0.02, 0))]]);
  const leg = mergeGeo([[cyl(0.07, 0.06, 0.48, 7).translate(0, -0.24, 0)], [new THREE.BoxGeometry(0.12, 0.07, 0.22).translate(0, -0.5, 0.04), 0.3]]);
  const sleeve = mergeGeo([[cyl(0.058, 0.054, 0.17, 7).translate(0, -0.085, 0)]]);
  const forearm = mergeGeo([[cyl(0.046, 0.04, 0.26, 7).translate(0, -0.29, 0)], [new THREE.IcosahedronGeometry(0.05, 0).translate(0, -0.44, 0)]]);
  const head = mergeGeo([[new THREE.IcosahedronGeometry(C.headR, 1).scale(1, 1.08, 1).translate(0, C.headY, 0)], [cyl(0.055, 0.06, 0.12, 6).translate(0, C.shoulderY + 0.04, 0)],
    [new THREE.BoxGeometry(0.04, 0.035, 0.02).translate(-0.062, C.headY + 0.02, C.headR - 0.01), 0.12], [new THREE.BoxGeometry(0.04, 0.035, 0.02).translate(0.062, C.headY + 0.02, C.headR - 0.01), 0.12]]);
  const cap = () => new THREE.SphereGeometry(C.headR * 1.08, 12, 5, 0, Math.PI * 2, 0, Math.PI * 0.45).scale(1, 1.12, 1).translate(0, C.headY + 0.01, -0.012);
  const hair = [
    mergeGeo([[cap()]]),                                                                                                   // short
    (() => { const L = longHairGeo(C.headR, C.headY, 0.3); return mergeGeo([[cap()], [L]]); })(),                         // long
    mergeGeo([[cap()], [cyl(0.045, 0.03, 0.2, 6).rotateX(0.5).translate(0, C.headY - 0.05, -0.2)]]),                     // ponytail
    mergeGeo([[new THREE.IcosahedronGeometry(0.22, 1).scale(1, 0.85, 1).translate(0, C.headY + 0.07, -0.05)]]),           // big and round
  ];
  const pack = mergeGeo([[new THREE.BoxGeometry(0.26, 0.3, 0.12).translate(0, 0.84, -0.17)], [new THREE.BoxGeometry(0.2, 0.1, 0.05).translate(0, 0.74, -0.24), 0.8],
    [new THREE.BoxGeometry(0.035, 0.3, 0.02).translate(-0.09, 0.88, 0.125), 0.55], [new THREE.BoxGeometry(0.035, 0.3, 0.02).translate(0.09, 0.88, 0.125), 0.55]]);
  return { torso, hips, leg, sleeve, forearm, head, hair, pack };
})();
const crowdMat = new THREE.MeshLambertMaterial({ color: 0xffffff, vertexColors: true, flatShading: true });
function crowdInst(geo, max) {
  const m = new THREE.InstancedMesh(geo, crowdMat, max);
  m.setColorAt(0, new THREE.Color(0xffffff)); m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  m.frustumCulled = false;   // drawCrowd() culls kid by kid; three.js would cull the whole batch with a stale bounding sphere
  m.count = 0; scene.add(m); return m;
}
const N_KIDS = CFG.crowd.count;
const crowdBodies = crowdInst(crowdParts.torso, N_KIDS), crowdHips = crowdInst(crowdParts.hips, N_KIDS), crowdHeads = crowdInst(crowdParts.head, N_KIDS);
const crowdLegs = crowdInst(crowdParts.leg, N_KIDS * 2), crowdSleeves = crowdInst(crowdParts.sleeve, N_KIDS * 2), crowdArms = crowdInst(crowdParts.forearm, N_KIDS * 2);
const crowdHair = crowdParts.hair.map((g, i) => { const m = crowdInst(g, N_KIDS); if (i === 1) { m.material = crowdMat.clone(); m.material.side = THREE.DoubleSide; } return m; }), crowdPacks = crowdInst(crowdParts.pack, N_KIDS);
const CROWD_DETAIL_SCALE = 0.93;   // the full character model is a little taller than a crowd kid
function crowdLook() { const L = randomLook(); L.outfit = pick(Object.keys(OUTFITS).filter((k) => k !== "goblin")); L.skin = Math.floor(Math.random() * 8); return L; }   // (goblins are special)
const DOOR_SPOTS = () => SPOTS.filter((sp) => sp.kind === "classroom");
// step 76: the way out. The front doors on the 1st floor; upstairs, kids leave down the stairs.
const ENTRANCE_DOOR = (() => { const { h, t } = LAYOUT.entrance, side = HALLS[h].outerSide; return { h, t, side, wallLat: wallLat(h, side), entrance: true }; })();
const exitDoor = (f) => (f === 0 ? ENTRANCE_DOOR : pick(SPOTS.filter((sp) => sp.kind === "stairs" && sp.floor === f)));
const floorDoors = (f) => SPOTS.filter((sp) => sp.kind === "classroom" && HALLS[sp.h].floor === f && !sp.jammed);
{
  for (let i = 0; i < CFG.crowd.count; i++) {
    crowd.push({ shirt: new THREE.Color(pick(SHIRT_COLORS)), skin: new THREE.Color(pick(SKIN_COLORS)), pants: new THREE.Color(pick(PANTS_COLORS)),
      hair: new THREE.Color(pick(HAIR_COLORS.slice(0, 8))), hairStyle: pickWeighted([[0, 5], [1, 3], [2, 2], [3, 1]]), pack: Math.random() < 0.5 ? new THREE.Color(pick(SHIRT_COLORS)).multiplyScalar(0.7) : null,
      detailed: i % CFG.crowd.detailEvery === CFG.crowd.detailEvery - 1, detail: null, walk: Math.random() * 6, amp: 0, h: 0, t: 0, to: 0, lat: 0, x: 0, z: 0, targetLat: 0, speed: 1, mode: "gone", leaveAt: 0, door: null,
      spawnAt: 0, retargetT: 0, bob: Math.random() * 10, heading: 0, scale: rand(0.88, 1.08), slipT: 0 });
  }
}

// ---------- staff ----------
const staff = [];
const markersEl = document.getElementById("markers");
function spawnStaff(typeKey, place) {
  const T = STAFF_TYPES[typeKey];
  const mesh = makePerson({ body: T.vestColor, skin: pick(SKIN_COLORS), scale: T.scale, hat: T.hatColor, kind: typeKey });
  if (typeKey === "principal") {   // a red tie
    // (step 63: the suit and tie are part of the model now)
  }
  if (typeKey === "custodian") {   // a mop over the shoulder
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.6, 5), lambert(0xc8a46a));
    pole.position.set(0.32, 0.9, 0); pole.rotation.z = 0.35; mesh.add(pole);
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.14, 0.22), lambert(0xe8e2d0)); head.position.set(0.6, 0.18, 0); mesh.add(head);
  }
  if ((T.stationary && !T.noMug) || T.mug) {   // a coffee mug, so teachers read differently from a distance
    const mug = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.055, 0.13, 8), lambert(0xffffff));
    mug.position.set(0, 0.0, 0.06); mesh.userData.hand.add(mug); mesh.userData.arms[1].rotation.x = -1.0;   // held up, mid-sip
  }
  const RAYS = CFG.render.coneRays;
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array((RAYS + 2) * 3), 3));
  const idx = []; for (let i = 0; i < RAYS; i++) idx.push(0, i + 1, i + 2);
  geo.setIndex(idx);
  const cone = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: T.coneColor ?? 0xfff2a8, transparent: true, opacity: 0.28, depthWrite: false, side: THREE.DoubleSide }));
  cone.frustumCulled = false; cone.renderOrder = 1;
  scene.add(cone);
  const alert = document.createElement("div"); alert.className = "alert"; markersEl.appendChild(alert);
  const edge = document.createElement("div"); edge.className = "edge"; markersEl.appendChild(edge);
  const bubble = document.createElement("div"); bubble.className = "bark"; markersEl.appendChild(bubble);
  const st = { type: T, key: typeKey, x: 0, z: 0, h: place.h ?? 0, t: place.t ?? 0, to: place.to ?? 0, facing: 0, state: "patrol",
    suspicion: 0, lastX: 0, lastZ: 0, lastVX: 0, lastVZ: 0, searchT: 0, stepT: 0, sweep: Math.random() * 10,
    tx: 0, tz: 0, pauseT: 0, bustSpot: null, chaseT: 0, windedT: 0, alarmT: 0, calledBackup: false, stunT: 0, distractT: 0, dX: 0, dZ: 0,
    roamT: T.roamTurnSec ? rand(...T.roamTurnSec) : 0, route: place.route ?? null, ri: place.ri ?? 0, rstep: place.rstep ?? 1,
    post: place.post ?? null, mesh, cone, alert, edge, bubble, barkUntil: 0, barkAt: -99, wasSus: false };
  if (T.stationary) { st.x = place.x; st.z = place.z; st.facing = place.facing; st.state = "post"; }
  else { hallPos(st.h, st.t, 0, st); st.facing = hallHeading(st.h, st.to === HALLS[st.h].b ? 1 : -1); }
  st.homeFloor = HALLS[place.h ?? 0].floor;
  staff.push(st);
  return st;
}
function clearStaff() {
  for (const st of staff) { scene.remove(st.mesh); scene.remove(st.cone); st.cone.geometry.dispose(); st.alert.remove(); st.edge.remove(); st.bubble.remove(); }
  staff.length = 0;
}
// Where new staff start: on their route, as far from the kid as we can manage.
function pickStaffPlace(typeKey) {
  const T = STAFF_TYPES[typeKey];
  if (T.stationary) {   // a teacher at a classroom door that has nobody posted yet
    const taken = new Set(staff.filter((s) => s.post).map((s) => s.post));
    const doors = DOOR_SPOTS().filter((sp) => !taken.has(sp) && !sp.R.staff && !sp.jammed);
    doors.sort((a, b) => spotDist(b) - spotDist(a));
    const sp = pick(doors.slice(0, Math.max(1, Math.ceil(doors.length / 2))));
    const p = hallPos(sp.h, sp.t + 0.95, sp.wallLat - sp.side * 0.55);
    return { post: sp, h: sp.h, x: p.x, z: p.z, facing: Math.atan2(-sp.side * HALLS[sp.h].nx, -sp.side * HALLS[sp.h].nz) };
  }
  const n = staff.filter((s) => s.key === typeKey).length;
  if (T.custodian) {   // one per floor: the first downstairs, the second upstairs
    const h = Math.floor(Math.random() * BASE_HALLS) + (n % 2) * BASE_HALLS;
    return { h, t: rand(0, HALLS[h].len), to: Math.random() < 0.5 ? HALLS[h].a : HALLS[h].b };
  }
  const routeName = T.routes ? T.routes[n % T.routes.length] : null;
  let best = null, bestD = -1;
  for (let k = 0; k < 12; k++) {
    let place;
    if (routeName) {
      const R = LAYOUT.routes[routeName].map(nodeIndex), rstep = Math.random() < 0.5 ? 1 : -1, i = Math.floor(Math.random() * R.length);
      const from = R[i], to = R[mod(i + rstep, R.length)], h = hallBetween(from, to);
      place = { h, t: rand(0, HALLS[h].len), to, route: R, ri: mod(i + rstep, R.length), rstep };
    } else {   // roamers: on whichever floor has fewer chasers right now
      const per = [0, 1].map((f) => staff.filter((o) => chaser(o) && floorOf(o.x) === f).length);
      const f = per[0] === per[1] ? Math.floor(Math.random() * 2) : per[0] < per[1] ? 0 : 1;
      const h = Math.floor(Math.random() * BASE_HALLS) + f * BASE_HALLS;
      place = { h, t: rand(0, HALLS[h].len), to: Math.random() < 0.5 ? HALLS[h].a : HALLS[h].b };
    }
    const p = hallPos(place.h, place.t, 0);
    let d = Math.hypot(p.x - player.x, p.z - player.z);
    if (floorOf(p.x) !== floorOf(player.x)) d = 30 + Math.random();   // the other floor counts as far, but no farther than far
    if (d > bestD) { bestD = d; best = place; }
  }
  return best;
}

// =====================================================================================
// Audio (synthesized; starts on the first tap)
// =====================================================================================
let actx = null, noiseBuf = null;
function initAudio() {
  if (actx) { if (actx.state === "suspended") actx.resume(); return; }
  try {
    actx = new (window.AudioContext || window.webkitAudioContext)();
    noiseBuf = actx.createBuffer(1, actx.sampleRate * 0.2, actx.sampleRate);
    const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  } catch (e) { actx = null; }
}
const camRight = new THREE.Vector3(), tmpV = new THREE.Vector3();
function playFootstep(x, z, loud) {
  if (!actx) return;
  const d = Math.hypot(x - camera.position.x, z - camera.position.z);
  if (d > CFG.footsteps.hearRange) return;
  const vol = CFG.footsteps.volume * Math.pow(1 - d / CFG.footsteps.hearRange, 2) * (loud ? 1.3 : 1);
  tmpV.set(x - camera.position.x, 0, z - camera.position.z).normalize();
  const pan = clamp(tmpV.dot(camRight), -1, 1);
  const t = actx.currentTime;
  const src = actx.createBufferSource(); src.buffer = noiseBuf;
  const f = actx.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = 520;
  const g = actx.createGain(); g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
  const p = actx.createStereoPanner ? actx.createStereoPanner() : null;
  src.connect(f).connect(g);
  if (p) { p.pan.value = pan; g.connect(p).connect(actx.destination); } else g.connect(actx.destination);
  src.start(t); src.stop(t + 0.12);
}
function playBell() {
  if (!actx) return;
  const t = actx.currentTime;
  const o = actx.createOscillator(); o.type = "triangle"; o.frequency.value = 1180;
  const am = actx.createGain(); am.gain.value = 0.5;
  const lfo = actx.createOscillator(); lfo.frequency.value = 26;
  const lfoAmt = actx.createGain(); lfoAmt.gain.value = 0.5;
  lfo.connect(lfoAmt).connect(am.gain);
  const env = actx.createGain();
  env.gain.setValueAtTime(0, t); env.gain.linearRampToValueAtTime(0.16, t + 0.02);
  env.gain.setValueAtTime(0.16, t + 1.4); env.gain.linearRampToValueAtTime(0, t + 1.75);
  o.connect(am).connect(env).connect(actx.destination);
  o.start(t); lfo.start(t); o.stop(t + 1.8); lfo.stop(t + 1.8);
}
function playBlip(freqs, dur = 0.09, type = "square", vol = 0.08) {
  if (!actx) return;
  let t = actx.currentTime;
  for (const fq of freqs) {
    const o = actx.createOscillator(); o.type = type; o.frequency.value = fq;
    const g = actx.createGain(); g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g).connect(actx.destination); o.start(t); o.stop(t + dur + 0.02);
    t += dur * 0.9;
  }
}

// =====================================================================================
// Input: left-thumb joystick, right-side look drag, WASD + mouse drag
// =====================================================================================
const input = { x: 0, y: 0, m: 0 };
const keys = new Set();
const stick = { id: null, ox: 0, oy: 0, x: 0, y: 0 };
const look = { id: null, lastX: 0 };
let manualCamT = 0;
const stickBase = document.getElementById("stickBase"), stickKnob = document.getElementById("stickKnob");
const canvas = renderer.domElement;

const taps = new Map();   // pointerId -> where/when it went down, to tell taps from drags
canvas.addEventListener("pointerdown", (e) => {
  if (game.state !== "playing") return;
  taps.set(e.pointerId, { x: e.clientX, y: e.clientY, t: performance.now(), moved: 0 });
  if (e.pointerType !== "mouse" && e.clientX < window.innerWidth * 0.5 && stick.id === null) {
    stick.id = e.pointerId; stick.ox = e.clientX; stick.oy = e.clientY; stick.x = stick.y = 0;
    stickBase.style.left = stickKnob.style.left = e.clientX + "px";
    stickBase.style.top = stickKnob.style.top = e.clientY + "px";
    stickBase.style.display = stickKnob.style.display = "block";
  } else if (look.id === null) {
    look.id = e.pointerId; look.lastX = e.clientX;
  }
  try { canvas.setPointerCapture(e.pointerId); } catch (err) { /* not supported for this pointer; fine */ }
});
canvas.addEventListener("pointermove", (e) => {
  const tp = taps.get(e.pointerId);
  if (tp) tp.moved = Math.max(tp.moved, Math.hypot(e.clientX - tp.x, e.clientY - tp.y));
  if (e.pointerId === stick.id) {
    const R = CFG.joystick.radiusPx;
    let dx = e.clientX - stick.ox, dy = e.clientY - stick.oy;
    const d = Math.hypot(dx, dy);
    if (d > R) { dx *= R / d; dy *= R / d; }
    stick.x = dx / R; stick.y = -dy / R;
    stickKnob.style.left = stick.ox + dx + "px"; stickKnob.style.top = stick.oy + dy + "px";
  } else if (e.pointerId === look.id) {
    const dx = e.clientX - look.lastX; look.lastX = e.clientX;
    cam.yaw -= dx * CFG.camera.dragSensitivity;
    manualCamT = CFG.camera.manualHoldSec;
    if (tut) tut.looked += Math.abs(dx) * CFG.camera.dragSensitivity;   // step 72
  }
});
function endPointer(e) {
  const tp = taps.get(e.pointerId); taps.delete(e.pointerId);
  if (tp && e.type === "pointerup" && game.state === "playing" && tp.moved < CFG.interact.tapMaxMovePx &&
      performance.now() - tp.t < CFG.interact.tapMaxMs) handleTap(e.clientX, e.clientY);
  if (e.pointerId === stick.id) { stick.id = null; stick.x = stick.y = 0; stickBase.style.display = stickKnob.style.display = "none"; }
  if (e.pointerId === look.id) look.id = null;
}
canvas.addEventListener("pointerup", endPointer);
canvas.addEventListener("pointercancel", endPointer);
// iPhone Safari ignores the "no zoom" viewport setting, so block zoom gestures here:
// a quick second tap (double-tap zoom), two-finger pinches (thumb on the stick + a tap),
// and Safari's own pinch events. Text fields still get normal taps. (step 54)
let lastTouchEnd = 0;
const zoomOK = (t) => t?.closest?.("input, textarea, select");
document.addEventListener("touchend", (e) => {
  const now = performance.now();
  if (now - lastTouchEnd < 400 && !zoomOK(e.target)) {
    e.preventDefault();
    // Blocking the zoom also eats the tap's click, so menu buttons and "tap to continue" screens get it back here.
    if (e.target?.closest?.("button, label, .overlay")) e.target.click();
  }
  lastTouchEnd = now;
}, { passive: false });
document.addEventListener("touchmove", (e) => { if (e.touches.length > 1 || (e.scale ?? 1) !== 1) e.preventDefault(); }, { passive: false });
document.addEventListener("dblclick", (e) => e.preventDefault(), { passive: false });
for (const g of ["gesturestart", "gesturechange", "gestureend"]) document.addEventListener(g, (e) => e.preventDefault(), { passive: false });
// Keyboard players get faint key hints (E bubbles, slot numbers). Touching the screen switches them off again.
let usingKeys = false;
function setUsingKeys(on) { if (usingKeys === on) return; usingKeys = on; document.body.classList.toggle("kbd", on); }
window.addEventListener("pointerdown", (e) => { if (e.pointerType === "touch") setUsingKeys(false); }, true);
window.addEventListener("keydown", (e) => {
  const k = e.key.toLowerCase();
  keys.add(k);
  if (/^(w|a|s|d|e|h|shift|arrow\w+|[1-9]| )$/.test(k)) setUsingKeys(true);
  if ((e.key === " " || e.key === "Enter") && game.state !== "playing") { e.preventDefault(); onOverlayTap(); return; }
  if (game.state !== "playing") return;
  if (tut?.waitNext && (e.key === "Enter" || e.key === " ") && !e.repeat) { e.preventDefault(); tutAdvance(); return; }   // step 72
  if (e.key === "Escape") { if (game.aim) cancelAim(); else pause(); return; }
  if (k.startsWith("arrow") || k === " ") e.preventDefault();   // no page scrolling
  if (game.aim && k.startsWith("arrow") && !game.aim.kb) startKeyAim(game.aim);   // arrows take over a mouse aim
  if (k === " " && game.aim && !e.repeat) { keyThrow(); return; }
  if (/^[1-9]$/.test(e.key) && !e.repeat) {
    if (player.hidden) { lootEl.querySelector(`button[data-n="${e.key}"]`)?.click(); return; }   // step 82: each action keeps its number
    selectSlot(+e.key - 1, true); return;
  }
  if (player.ride && (k === "e" || k === " ") && !e.repeat) { e.preventDefault(); jumpOff(); return; }
  if (player.board && k === " " && !game.aim && !e.repeat) { e.preventDefault(); hopOff(); return; }
  if (k === "e" && !e.repeat) doInteract();
  if (k === "h" && !e.repeat) hoodUp();
});
window.addEventListener("keyup", (e) => keys.delete(e.key.toLowerCase()));

// What E would do right now (also drives the "E" hint bubble). Order: catch a plane, a friend's offer,
// pick something up, the fire alarm, then hiding.
function interactTarget() {
  if (player.hidden) return { kind: "leave" };
  for (const o of objects) if (o.wild && o.state === "flying" && Math.hypot(o.x - player.x, o.z - player.z) < 3) return { kind: "plane", o, x: o.x, y: o.y + 0.3, z: o.z, label: "catch" };
  if (game.phase === "passing") {
    let best = null, bd = CFG.friends.interactRange;
    for (const c of crowd) { const F = c.friend; if (!F || F.cd > 0 || !isActive(c) || c.slipT > 0) continue; const d = Math.hypot(c.x - player.x, c.z - player.z); if (d < bd) { bd = d; best = c; } }
    if (best) return { kind: "friend", c: best, x: best.x, y: 2.3, z: best.z, label: OFFER_LABELS[best.friend.offer].toLowerCase() };
  }
  const km = game.hotbar.findIndex((s) => s?.key === "kickMe");
  if (km >= 0) { const tg = kickMeTarget(); if (tg) return { kind: "kickme", slot: km, x: tg.who.x, y: 2.3 * (tg.isStaff ? tg.who.type.scale : 1), z: tg.who.z, label: tg.isStaff ? "stick on the sign" : "stick it on the kid" }; }
  let it = null, id = CFG.items.pickupRange;
  for (const o of objects) if (pickable(o)) { const d = Math.hypot(o.x - player.x, o.z - player.z); if (d < id) { id = d; it = o; } }
  if (it) return { kind: "item", o: it, x: it.x, y: it.y + 0.5, z: it.z, label: `pick up ${it.T.label.toLowerCase()}` };
  const al = nearestAlarm();
  if (al && !game.alarmPulled) { const p = hallPos(al.h, al.t, al.wl - al.side * 0.2, {}); return { kind: "alarm", a: al, x: p.x, y: 1.9, z: p.z, label: performance.now() < al.armT ? "PULL IT" : "fire alarm" }; }
  const sp = nearestSpot();
  if (sp && (!spotBlocked(sp) || (keyOpens(sp) && hasKey()))) { const p = hallPos(sp.h, sp.t, sp.wallLat - sp.side * 0.1, {}); return { kind: "spot", sp, x: p.x, y: 2.0, z: p.z, label: sp.kind === "stairs" ? (sp.floor ? "stairs down" : "stairs up") : spotBlocked(sp) ? "unlock 🔑" : "hide" }; }
  return null;
}
function doInteract() {
  const t = interactTarget();
  if (!t) { const sp = nearestSpot(); if (sp) enterSpot(sp); return; }   // shows why it's blocked
  if (t.kind === "leave") exitSpot(false);
  else if (t.kind === "plane") catchPlane(t.o);
  else if (t.kind === "friend") friendTap(t.c);
  else if (t.kind === "item") pickUp(t.o);
  else if (t.kind === "kickme") stickKickMe(t.slot);
  else if (t.kind === "alarm") tryAlarm(t.a);
  else if (t.kind === "spot") enterSpot(t.sp);
}
const keyHintEl = document.getElementById("keyHint");
function updateKeyHint() {
  const t = usingKeys && game.state === "playing" && !game.aim ? interactTarget() : null;
  if (!t || t.kind === "leave") { keyHintEl.style.display = "none"; return; }
  projA.set(t.x, t.y, t.z).applyMatrix4(camera.matrixWorldInverse);
  if (projA.z > -0.2) { keyHintEl.style.display = "none"; return; }
  projA.set(t.x, t.y, t.z).project(camera);
  const html = `<b>E</b> ${t.label}`;
  if (keyHintEl.dataset.h !== html) { keyHintEl.innerHTML = html; keyHintEl.dataset.h = html; }
  keyHintEl.style.display = "block";
  keyHintEl.style.left = ((projA.x + 1) / 2) * window.innerWidth + "px"; keyHintEl.style.top = ((1 - projA.y) / 2) * window.innerHeight + "px";
}

let sprintTouch = false;
function readInput() {
  const arrows = !game.aim;   // while aiming, the arrow keys aim instead of moving (WASD still moves)
  let x = (keys.has("d") || (arrows && keys.has("arrowright")) ? 1 : 0) - (keys.has("a") || (arrows && keys.has("arrowleft")) ? 1 : 0);
  let y = (keys.has("w") || (arrows && keys.has("arrowup")) ? 1 : 0) - (keys.has("s") || (arrows && keys.has("arrowdown")) ? 1 : 0);
  if (stick.id !== null) { x = stick.x; y = stick.y; }
  let m = Math.hypot(x, y);
  if (m < CFG.joystick.deadZone) { x = y = m = 0; }
  else if (m > 1) { x /= m; y /= m; m = 1; }
  if (tut?.lockMove) x = y = m = 0;   // step 72: some tutorial scenes hold you in place
  input.x = x; input.y = y; input.m = m;
}

// =====================================================================================
// Game state
// =====================================================================================
const game = { state: "title", day: 1, period: 1, phase: "passing", phaseT: 0, score: 0, time: 0,
  strikes: 0, highAlert: false, periodScore: 0, periodsSkipped: 0, dayPeriodsSkipped: 0, sceneT: 0, sceneEnd: null,
  lockerUses: 0, pendingOffice: false, hotbar: [], aim: null, havocCount: {}, heat: 0, heatPending: 0, stars: 0, posts: [], survival: false, survivalT: 0, nextArrivalT: 0, nextRadioT: 0, alarmT: 0, alarmPulled: false,
  unseenT: 0, nearMissT: 0, passShield: false, nextPlaneT: 0, nerveAcc: 0, dares: [], dareOffer: null, daresDone: [], chasedThisSkip: false, blackoutT: 0, breakerUsed: false };
let tut = null;   // step 72: the tutorial, while it's running
const cam = { yaw: 0 };
const $ = (id) => document.getElementById(id);
const ui = { phase: $("phase"), label: $("phaseLabel"), timer: $("timer"), score: $("score"), uses: $("uses"), banner: $("banner"), fps: $("fps"),
  toast: $("toast"), hide: $("hidePanel"), hpTitle: $("hpTitle"), hpFill: $("hpFill"), hpLine: $("hpLine"), hpWarn: $("hpWarn") };
let bannerTimer = 0, toastTimer = 0, lastToast = "", lastToastAt = -99;
function banner(html, sec = 2.2) { ui.banner.innerHTML = html; ui.banner.classList.add("show"); bannerTimer = sec; }
function toast(text, sec = 1.8) {
  if (text === lastToast && game.time - lastToastAt < 2.5) return;   // don't spam the same cue
  lastToast = text; lastToastAt = game.time;
  ui.toast.textContent = text; ui.toast.classList.add("show"); toastTimer = sec;
}

// ---- difficulty: within-day tables (by period) and across-days multipliers (by day) ----
const perPeriod = (table) => table[Math.min(game.period, table.length) - 1];
function dayMult(perDay) { return Math.min(CFG.days.maxMult, 1 + perDay * (game.day - 1)); }
function alertMult(k) { return game.highAlert ? CFG.strikes.alert[k] : 1; }
function staffMult(k) {
  const day = { speed: CFG.days.staffSpeedPerDay, vision: CFG.days.staffVisionPerDay, notice: CFG.days.staffNoticePerDay }[k];
  const stat = k === "vision" ? 1 - CFG.stats.stealth.vision * statMod("stealth") : k === "notice" ? 1 - CFG.stats.stealth.notice * statMod("stealth") : 1;
  return stat * alertMult(k) * dayMult(day) * (k === "vision" ? starVision() : k === "notice" ? 1 + CFG.heat.noticePerStar * game.stars : 1)
    * (k === "vision" && game.blackoutT > 0 ? CFG.breaker.visionMult : 1);
}
const periodsToday = () => CFG.periodsPerDay;
function phaseLen(phase = game.phase) {
  const D = CFG.days, n = game.day - 1;
  if (phase === "passing" && game.dismissal) return CFG.dismissal.sec;
  if (phase === "passing" && game.period === 1) return Math.max(D.minPassingSec, CFG.passingSec + D.passingSecPerDay * n) + CFG.morning.extraPassingSec;
  return phase === "passing" ? Math.max(D.minPassingSec, CFG.passingSec + D.passingSecPerDay * n)
                             : Math.min(D.maxSkippingSec, CFG.skippingSec + D.skippingSecPerDay * n);
}

// ---- save at the bell, so a returning player lands at "Day 1, Period 4" ----
const SAVE_KEY = "hallwaySkip.save.v1";
function saveGame() {
  if (tut) return;   // step 72: the tutorial isn't a run
  try { localStorage.setItem(SAVE_KEY, JSON.stringify({ day: game.day, period: game.period, score: Math.floor(game.score),
    strikes: game.strikes, highAlert: game.highAlert, periodsSkipped: game.periodsSkipped, posts: game.posts, survival: game.survival, dares: game.dares, tally: game.tally })); } catch (e) { /* storage blocked: fine */ }
}
function loadSave() { try { const s = JSON.parse(localStorage.getItem(SAVE_KEY)); return s && s.day ? s : null; } catch (e) { return null; } }
// ---- step 52: run stats. A tally of everything you did this run, saved with the run. At the end, each stat is compared
// (per minute played) with your earlier runs, and only the ones that stand out (1+ standard deviation above your usual,
// or a first) make the end screen. With no history yet, "usual" is a guess at a player who does a bit of everything (prior),
// which your own runs take over from as they pile up (it counts as PRIOR_RUNS runs' worth of evidence).
function tally(k, n = 1) { if (game.tally) game.tally[k] = (game.tally[k] ?? 0) + n; }
function tallyFrame(dt) {
  const t = game.tally; t.playSec = (t.playSec ?? 0) + dt;
  if (!player.hidden && game.lastPX != null) {
    const d = Math.hypot(player.x - game.lastPX, player.z - game.lastPZ);
    if (d < 3) tally(player.board ? "skateM" : player.ride ? "chairM" : "walkM", d);   // (bigger jumps are the stairs)
  }
  game.lastPX = player.x; game.lastPZ = player.z;
  if (player.sprinting) tally("sprintSec", dt);
  t.heatMax = Math.max(t.heatMax ?? 0, game.heat);
  if (game.survival) t.rebel = 1;
  // a chase: someone's after you. An escape: everyone has stopped chasing and searching, and you weren't caught.
  const hunted = staff.some((st) => st.state === "chase" || st.state === "bust");
  if (hunted) game.chaseOn = true;
  else if (game.chaseOn && !staff.some((st) => st.state === "search")) { game.chaseOn = false; tally("escapes"); }
}
const compactTally = (t) => Object.fromEntries(Object.entries(t ?? {}).filter(([, v]) => v).map(([k, v]) => [k, Math.round(v * 10) / 10]));
const tsum = (t, test) => Object.entries(t).reduce((a, [k, v]) => a + (test(k) ? v : 0), 0);
const hv = (t, ...ks) => ks.reduce((a, k) => a + (t["h:" + k] ?? 0), 0);
const plural = (n, one, many = one + "s") => `${n} ${n === 1 ? one : many}`;
const meters = (m) => (m >= 1000 ? `${(m / 1000).toFixed(1)} km` : `${Math.round(m)} m`);
// prior: [usual per minute, spread]. perRun: compared per run, not per minute. min: the least worth mentioning.
const RUN_STATS = [
  { id: "walk", icon: "🚶", get: (t) => Math.round(t.walkM ?? 0), prior: [130, 45], min: 200,
    text: (n) => `Walked ${meters(n)} of hallway (${(n / 91.4).toFixed(1)} football fields)` },
  { id: "sprint", icon: "💨", get: (t) => Math.round(t.sprintSec ?? 0), prior: [6, 4], min: 20, text: (n) => `${n} seconds of all-out sprinting` },
  { id: "skate", icon: "🛹", get: (t) => Math.round(t.skateM ?? 0), prior: [12, 20], min: 60, text: (n) => `Skated ${meters(n)}` },
  { id: "chair", icon: "🪑", get: (t) => Math.round(t.chairM ?? 0), prior: [3, 6], min: 20, text: (n) => `Rode a wheelie chair ${meters(n)}` },
  { id: "lockers", icon: "🗄️", get: (t) => t["hide:locker"] ?? 0, prior: [0.8, 0.5], min: 3, text: (n) => `Hid in ${plural(n, "locker")}. Cozy.` },
  { id: "restroom", icon: "🚻", get: (t) => t["hide:restroom"] ?? 0, prior: [0.3, 0.3], min: 2, text: (n) => `${plural(n, "trip")} to the restroom. The nurse is concerned.` },
  { id: "classroom", icon: "🤫", get: (t) => t["hide:classroom"] ?? 0, prior: [0.3, 0.3], min: 2, text: (n) => `Slipped into ${plural(n, "classroom")} and nobody noticed` },
  { id: "closet", icon: "🧹", get: (t) => t["hide:closet"] ?? 0, prior: [0.05, 0.1], min: 1, text: (n) => `Hid in the custodian's closet ${n === 1 ? "once" : n + " times"}` },
  { id: "spotted", icon: "🏨", get: (t) => t.spotted ?? 0, prior: [0.1, 0.15], min: 2, text: (n) => `Spotted walking into ${plural(n, "classroom")} ("Does this look like a hotel?")` },
  { id: "grabs", icon: "🫳", get: (t) => t.grabs ?? 0, prior: [0.4, 0.4], min: 3, text: (n) => `Swiped ${plural(n, "thing")} off teachers' desks` },
  { id: "stairs", icon: "🪜", get: (t) => t.stairs ?? 0, prior: [0.3, 0.3], min: 3, text: (n) => `Took the stairs ${n} times` },
  { id: "escapes", icon: "🏃", get: (t) => t.escapes ?? 0, prior: [0.4, 0.35], min: 2, text: (n) => `Got away from ${plural(n, "chase")}` },
  { id: "closeCalls", icon: "😬", get: (t) => t.closeCall ?? 0, prior: [0.1, 0.15], min: 2, text: (n) => `Held your breath through ${plural(n, "restroom check")}` },
  { id: "staffHits", icon: "🎯", get: (t) => tsum(t, (k) => k.startsWith("h:") && k.endsWith("Staff")) + hv(t, "kickMe"), prior: [0.6, 0.5], min: 3,
    text: (n) => `Hit staff ${n} times` },
  { id: "kidHits", icon: "😵", get: (t) => tsum(t, (k) => k.startsWith("h:") && k.endsWith("Student")) + hv(t, "kickMeKid", "plungerBump"), prior: [1.2, 1], min: 4,
    text: (n) => `${plural(n, "innocent bystander")} caught in the crossfire` },
  { id: "spitballs", icon: "🫧", get: (t) => hv(t, "spitballStaff", "spitballStudent"), prior: [0.5, 0.5], min: 3, text: (n) => `${plural(n, "spitball")} found their mark` },
  { id: "gross", icon: "🧦", get: (t) => hv(t, "oldSockStaff", "oldSockStudent", "sandwichStaff", "sandwichStudent"), prior: [0.1, 0.2], min: 2,
    text: (n) => `Hit ${plural(n, "person", "people")} with old socks and moldy sandwiches` },
  { id: "balls", icon: "🏀", get: (t) => hv(t, "basketballStaff", "basketballStudent", "footballStaff", "footballStudent", "frisbeeStaff", "frisbeeStudent"), prior: [0.15, 0.25], min: 2,
    text: (n) => `Beaned ${plural(n, "person", "people")} with sports equipment` },
  { id: "flyover", icon: "✈️", get: (t) => t.flyover ?? 0, prior: [0.8, 1], min: 5, text: (n) => `Flew paper over the heads of ${plural(n, "kid")}` },
  { id: "tp", icon: "🧻", get: (t) => Math.round(t.tpM ?? 0), prior: [2, 4], min: 10, text: (n) => `TP'd ${meters(n)} of hallway` },
  { id: "tpBanner", icon: "🎏", get: (t) => t.tpBanner ?? 0, prior: [0.05, 0.1], min: 1, text: (n) => `TP'd ${plural(n, "spirit banner")}` },
  { id: "gum", icon: "🍬", get: (t) => hv(t, "gum"), prior: [0.2, 0.25], min: 2, text: (n) => `Stuck ${plural(n, "wad")} of gum around the school` },
  { id: "graffiti", icon: "🎨", get: (t) => hv(t, "sprayPaint"), prior: [0.1, 0.15], min: 2, text: (n) => `Tagged ${plural(n, "wall")} with spray paint` },
  { id: "slips", icon: "🍌", get: (t) => hv(t, "bananaPeelStaff", "bananaPeelStudent", "mopBucketStaff", "mopBucketStudent"), prior: [0.2, 0.3], min: 2,
    text: (n) => `${plural(n, "person", "people")} slipped on something you left` },
  { id: "slime", icon: "🟢", get: (t) => hv(t, "slimeStaff", "slimeStudent"), prior: [0.1, 0.2], min: 2, text: (n) => `Got ${plural(n, "person", "people")} stuck in slime` },
  { id: "stink", icon: "🧪", get: (t) => t.stinkGag ?? 0, prior: [0.2, 0.4], min: 3, text: (n) => `${plural(n, "person", "people")} walked into your stink` },
  { id: "plunger", icon: "🪠", get: (t) => hv(t, "plungerStaff", "plungerStudent"), prior: [0.05, 0.1], min: 1, text: (n) => `Plungered ${plural(n, "face")}` },
  { id: "rammed", icon: "💥", get: (t) => hv(t, "chairStaff", "chairStudent", "boardStaff", "boardStudent"), prior: [0.15, 0.25], min: 2,
    text: (n) => `Flattened ${plural(n, "person", "people")} with wheels` },
  { id: "kickMe", icon: "🦵", get: (t) => hv(t, "kickMe", "kickMeKid"), prior: [0.05, 0.1], min: 1, text: (n) => `Stuck ${plural(n, "\"Kick me\" sign")} on someone` },
  { id: "bursts", icon: "🚪", get: (t) => hv(t, "burstOut"), prior: [0.05, 0.1], min: 1, text: (n) => `Burst out of a locker ${n === 1 ? "once" : n + " times"}` },
  { id: "highFives", icon: "🙌", get: (t) => t.highFives ?? 0, prior: [0.2, 0.25], min: 3, text: (n) => `${plural(n, "high five")}` },
  { id: "gumTrades", icon: "🤝", get: (t) => t.gumTrades ?? 0, prior: [0.1, 0.15], min: 2, text: (n) => `${plural(n, "gum trade")} with friends` },
  { id: "dares", icon: "📜", get: (t) => t.dares ?? 0, prior: [0.1, 0.15], min: 2, text: (n) => `Pulled off ${plural(n, "dare")}` },
  { id: "shoves", icon: "🫸", get: (t) => t.shoves ?? 0, prior: [1, 1], min: 8, text: (n) => `Shoved ${plural(n, "kid")} out of your way` },
  { id: "drinks", icon: "⚡", get: (t) => t.drinks ?? 0, prior: [0.1, 0.15], min: 2, text: (n) => `Downed ${plural(n, "energy drink")}` },
  { id: "passes", icon: "🎫", get: (t) => t.passUsed ?? 0, prior: [0.05, 0.1], min: 2, text: (n) => `Talked your way out with a fake pass ${n} times` },
  { id: "planeCatch", icon: "🫴", get: (t) => t.planeCatch ?? 0, prior: [0.05, 0.1], min: 1, text: (n) => `Caught ${plural(n, "paper airplane")} out of the air` },
  { id: "alarm", icon: "🚨", get: (t) => hv(t, "fireAlarm"), prior: [0.02, 0.05], min: 1, text: (n) => (n === 1 ? "Pulled the fire alarm" : `Pulled the fire alarm ${n} times`) },
  { id: "flood", icon: "🌊", get: (t) => hv(t, "flood"), prior: [0.02, 0.05], min: 1, text: () => "Flooded a restroom" },
  { id: "mopJam", icon: "🔒", get: (t) => hv(t, "mopJam"), prior: [0.02, 0.05], min: 1, text: (n) => `Mopped ${plural(n, "teacher")} into their classroom` },
  { id: "breaker", icon: "💡", get: (t) => hv(t, "breaker"), prior: [0.02, 0.05], min: 1, text: () => "Killed the lights" },
  { id: "trumpet", icon: "🎺", get: (t) => hv(t, "trumpet"), prior: [0.02, 0.05], min: 1, text: (n) => `Blasted the trumpet ${n === 1 ? "once" : n + " times"}` },
  { id: "mentos", icon: "🔴", get: (t) => hv(t, "mentos"), prior: [0.05, 0.1], min: 1, text: (n) => `Set off ${plural(n, "fizzy geyser")}` },
  { id: "skeleton", icon: "💀", get: (t) => t.skeletonScared ?? 0, prior: [0.05, 0.1], min: 3, text: (n) => `Scared ${plural(n, "person", "people")} with a skeleton` },
  { id: "prize", icon: "💰", get: (t) => hv(t, "rarePrize"), prior: [0.02, 0.05], min: 1, text: () => "Found a confiscated stash" },
  { id: "rebel", icon: "🔥", get: (t) => t.rebel ?? 0, perRun: true, prior: [0.15, 0.35], min: 1, text: () => "Went full rebel run" },
];
const PRIOR_RUNS = 4;
function runStatsHtml(run, prevRuns) {
  const t = run.tally, mins = Math.max(1.5, (t.playSec ?? 0) / 60);
  const hist = prevRuns.filter((r) => r.tally && (r.tally.playSec ?? 0) > 30);
  const out = [];
  for (const D of RUN_STATS) {
    const x = D.get(t); if (x < D.min) continue;
    const rate = (v, r) => (D.perRun ? v : v / Math.max(1.5, (r.playSec ?? 0) / 60));
    const xs = hist.map((r) => rate(D.get(r.tally), r.tally)), [m0, s0] = D.prior, k = PRIOR_RUNS;
    const mean = (k * m0 + xs.reduce((a, v) => a + v, 0)) / (k + xs.length);
    const sd = Math.max(s0 * 0.4, Math.sqrt((k * (s0 * s0 + (m0 - mean) ** 2) + xs.reduce((a, v) => a + (v - mean) ** 2, 0)) / (k + xs.length)));
    const z = (rate(x, t) - mean) / sd, first = hist.length >= 3 && xs.every((v) => v === 0);
    if (z < 1 && !first) continue;
    const usual = mean * (D.perRun ? 1 : mins);
    const tag = first ? "first time ever!" : usual >= 0.5 ? `${(x / usual).toFixed(x / usual < 10 ? 1 : 0)}× usual` : "rare";
    out.push({ D, x, z: z + (first ? 1 : 0), tag });
  }
  out.sort((a, b) => b.z - a.z);
  const hides = tsum(t, (k) => k.startsWith("hide:"));
  const basics = `🚶 ${meters(t.walkM ?? 0)} · 🙈 hid ${plural(hides, "time")} · 🏃 ${plural(t.escapes ?? 0, "escape")}`;
  const list = out.slice(0, 5).map((o) => `<li><span class="rsI">${o.D.icon}</span>${o.D.text(o.x)} <em>${o.tag}</em></li>`).join("");
  return `<div class="rsBasics">${basics}</div>` + (list ? `<div class="rsHead">What made this run</div><ul class="rs">${list}</ul>` : `<div class="rsHead">A by-the-book run. Nothing out of the ordinary.</div>`);
}
// ---- best runs, kept in this browser: every finished run, your top 3, and whether you beat your records ----
const RUNS_KEY = "hallwaySkip.runs.v1";
function loadRuns() { try { const r = JSON.parse(localStorage.getItem(RUNS_KEY)); return Array.isArray(r) ? r : []; } catch (e) { return []; } }
function saveRuns(runs) { try { localStorage.setItem(RUNS_KEY, JSON.stringify(runs.slice(-100))); } catch (e) { /* storage blocked: fine */ } }
const runLength = (r) => `${r.periods} period${r.periods === 1 ? "" : "s"}`;
const runLine = (r, i, me) => `<li${me ? ' class="me"' : ""}><b>${i + 1}.</b> ${Math.floor(r.score).toLocaleString()} <span>· day ${r.day} · ${runLength(r)}</span></li>`;
// records a finished run; returns the HTML for the end screen
function recordRun(ending) {
  const runs = loadRuns();
  const best = runs.reduce((m, r) => Math.max(m, r.score), 0), longest = runs.reduce((m, r) => Math.max(m, r.periods), 0);
  const run = { score: Math.floor(game.score), periods: game.periodsSkipped, day: game.day, period: game.period, ending, at: Date.now(),
    tally: compactTally(game.tally) };
  $("runStats").innerHTML = runStatsHtml(run, runs);   // step 52: compared with the runs before this one
  runs.push(run); saveRuns(runs);
  const badges = [];
  if (runs.length === 1) badges.push(`<b class="rec">First run on the board!</b>`);
  else {
    if (run.score > best) badges.push(`<b class="rec">🏆 NEW HIGH SCORE!</b> <small>(was ${best.toLocaleString()})</small>`);
    if (run.periods > longest) badges.push(`<b class="rec">⏱ LONGEST RUN!</b> <small>(was ${longest} period${longest === 1 ? "" : "s"})</small>`);
    if (!badges.length) badges.push(`<small>Your best: ${best.toLocaleString()} · longest: ${longest} period${longest === 1 ? "" : "s"}</small>`);
  }
  const top = [...runs].sort((a, b) => b.score - a.score).slice(0, 3);
  return `<div class="badges">${badges.join(" ")}</div><ol class="board">${top.map((r, i) => runLine(r, i, r === run)).join("")}</ol>`;
}
function renderBestRuns() {
  const top = loadRuns().sort((a, b) => b.score - a.score).slice(0, 3);
  $("bestRuns").innerHTML = top.length ? `<div class="bt">Best runs</div><ol class="board">${top.map((r, i) => runLine(r, i, false)).join("")}</ol>` : "";
}

function clearSave() { try { localStorage.removeItem(SAVE_KEY); } catch (e) { /* fine */ } }

// Kid walks in from the entrance; the hall is full of students already out and about.
function morningSetup(arrive = true) {   // (arrive = false: the halls are already full, for the tutorial)
  game.skeletonWise = false;   // step 69: a new day, and they've forgotten about the skeleton
  const { h, t } = LAYOUT.entrance, side = HALLS[h].outerSide;
  const p = hallPos(h, t, wallLat(h, side) - side * 0.8);
  player.x = p.x; player.z = p.z; player.vx = player.vz = 0;
  player.heading = hallHeading(h, -1);
  cam.yaw = player.heading; manualCamT = 0;
  player.hidden = null; player.mesh.visible = true; player.graceT = 0; player.invisT = 0; player.pushT = 0; player.pushSpot = null;
  ui.hide.hidden = true;
  game.dismissal = false;
  if (!arrive) for (const c of crowd) {
    c.spawnDoor = null; c.spawnAt = 0;
    c.h = Math.floor(Math.random() * HALLS.length); c.t = rand(0, HALLS[c.h].len);
    if (c.h === h && Math.abs(c.t - t) < 2.5) c.t = (c.t + 5) % HALLS[h].len;
    const [lo, hi] = latLimits(c.h, c.t);
    c.lat = c.targetLat = rand(lo, hi);
    c.to = Math.random() < 0.5 ? HALLS[c.h].a : HALLS[c.h].b;
    hallPos(c.h, c.t, c.lat, c);
    c.speed = rand(CFG.crowd.speedMin, CFG.crowd.speedMax);
    c.mode = "wander"; c.retargetT = rand(1, 4);
  }
  else for (const c of crowd) {   // step 76: nobody's here yet. They stream in the front doors (or come up the stairs) over the first few seconds.
    const f = Math.random() < 0.55 ? 0 : 1;
    c.spawnDoor = exitDoor(f);
    c.spawnAt = f === 0 ? rand(0, CFG.morning.streamSec) : rand(1.5, CFG.morning.streamSec + 2);
    c.mode = "spawning"; c.speed = rand(CFG.crowd.speedMin, CFG.crowd.speedMax); c.retargetT = rand(1, 4);
    c.h = c.spawnDoor.h; c.t = c.spawnDoor.t; c.lat = c.spawnDoor.wallLat; hallPos(c.h, c.t, c.lat, c);
  }
  clearStaff();
  clearObjects(); cancelAim(); clearGraffiti(); clearTrails();   // the custodian scrubs the walls (and takes down the TP) overnight
  if (player.ride) { scene.remove(player.ride.chair); player.ride = null; $("jumpBtn").hidden = true; }
  player.slipT = player.dazeT = player.stuckT = 0; player.mesh.rotation.z = 0; player.stamina = 1; player.staminaMax = 1; player.boostT = 0; player.winded = false;
  if (player.hoodT > 0) hoodDown(); player.hoodCD = 0;
  if (player.disguiseT > 0) { player.disguiseT = 0; disguiseMesh(false); }
  hopOff(true);
  game.hotbar = Array(slotCount()).fill(null);
  game.perk = null;
  const perks = OUTFIT_PERKS[character.look?.outfit];
  if (perks && !tut) { game.perk = pick(perks); addItem(game.perk); if (game.perk === "loveNote") perkNoteDare(); }   // step 79
  renderHotbar();
  rollSubs();             // first, so sub rooms get their extra desk loot
  resetSpotsForPeriod();
  for (const sp of SPOTS) if (sp.kind === "locker" && sp.busted) { sp.busted = false; sp.door.material.color.setHex(0x7d9a86); sp.door.rotation.y = sp.doorRot; }   // the custodian fixes the lockers
  for (const sp of SPOTS) if (sp.kind === "restroom") {
    sp.closed = false; if (sp.puddle) sp.puddle.visible = false;   // mopped overnight
  }
  game.alarmPulled = false; stopAlarm();
  for (const sp of SPOTS) if (sp.jammed) unjam(sp);   // the custodian frees everyone overnight
  for (const sp of CLOSETS) sp.locked = false;
  stolenSigns.length = 0;
  game.breakerUsed = false; if (game.blackoutT > 0) { game.blackoutT = 0; lightsOn(); }
  startPassing(true);
  spawnPosts();
  if (game.strikes >= 2) ensurePrincipal(false);
  for (const c of crowd) if (c.friend) c.friend.cd = rand(0, 6);
}

function resetGame(save = null, arrive = true) {
  game.day = save?.day ?? 1; game.period = save?.period ?? 1; game.score = save?.score ?? 0; game.time = 0;
  game.strikes = save?.strikes ?? 0; game.highAlert = save?.highAlert ?? false;
  game.periodScore = 0; game.periodsSkipped = save?.periodsSkipped ?? 0; game.dayPeriodsSkipped = 0;
  game.heat = game.heatPending = 0; game.stars = 0;
  game.posts = (save?.posts ?? []).filter((i) => SPOTS[i]);   // step 77: guards posted for good
  game.survival = !!save?.survival; game.survivalT = 0; game.alarmT = 0;
  if (game.survival) { game.heat = 100; game.stars = 5; game.highAlert = true; }   // a saved run in survival mode stays in it
  game.unseenT = 0; game.nearMissT = 0; game.passShield = false;
  game.dares = (save?.dares ?? []).filter((m) => DARES[m.id]); game.dareOffer = null; game.daresDone = [];
  game.tally = { ...(save?.tally ?? {}) }; game.chaseOn = false; game.lastPX = null;
  paLast = {}; Ads.newDay();
  morningSetup(arrive);
}
function resetSpotsForPeriod() {
  game.lockerUses = CFG.hiding.lockerUsesPerPeriod;
  for (const sp of SPOTS) {
    sp.used = false; sp.stayT = 0; sp.rummaged = false; sp.tpLeft = CFG.restroomRolls;
    if (sp.kind === "closet") sp.taken.clear();   // (restocked, but still locked if you stole from it today)
    if (sp.kind === "classroom") {
      // raided last period: locked for a while, and nothing gets restocked until it opens again
      if (sp.raided) { if (game.period + CFG.rooms.raidLockPeriods - 1 > sp.lockedUntil) sp.lockWhy = "raided"; sp.lockedUntil = Math.max(sp.lockedUntil, game.period + CFG.rooms.raidLockPeriods - 1); sp.raided = false; }
      if (!roomLocked(sp)) {   // restock the desks
        const [lo, hi] = sp.R.count, n = lo + Math.floor(Math.random() * (hi - lo + 1)) + (sp.teacher === "sub" && sp.R.loot.length ? 1 : 0);
        sp.loot = [...(sp.R.always ?? []), ...Array.from({ length: n }, () => pickWeighted(roomLoot(sp)))];
        for (const [id, X] of Object.entries(sp.R.specials ?? {})) if (!X.daily) sp.taken.delete(id);
      }
      sp.lootVer = (sp.lootVer ?? 0) + 1;
      sp.lockSign.visible = roomLocked(sp);
    }
  }
}

function startPassing(first) {
  game.phase = "passing"; game.phaseT = 0; game.periodScore = 0;
  sendQueuedPosts();
  game.havocCount = {}; game.nextPlaneT = rand(...CFG.airplanes.everySec);
  const P = phaseLen("passing"), doors = DOOR_SPOTS();
  for (const c of crowd) {
    c.leaveAt = game.alarmT > 0 ? Infinity : rand(CFG.crowd.leaveStartFrac, CFG.crowd.leaveEndFrac) * P;   // nobody goes to class during a fire alarm
    if (first && c.mode === "spawning") c.leaveAt = Math.max(c.leaveAt, c.spawnAt + rand(5, 9));   // (morning arrivals hang around a bit first)
    c.door = first ? pick(floorDoors(HALLS[c.spawnDoor?.h ?? c.h].floor)) : c.mode !== "gone" ? pick(floorDoors(floorOf(c.x))) : pick(doors.filter((d) => !d.jammed));   // (kids already out stay on their floor)
    if (!first) { c.mode = "spawning"; c.spawnAt = rand(0, CFG.crowd.floodSpreadSec); c.speed = rand(CFG.crowd.speedMin, CFG.crowd.speedMax); }
  }
  // staff for this period (the within-day curve); they stay on for the rest of the day
  for (const [key, table, line] of [["hallMonitor", CFG.monitorsPerPeriod], ["securityGuard", CFG.guardsPerPeriod, "guardOnDuty"], ["hallTeacher", CFG.teachersPerPeriod, "teacherOut"], ["roamTeacher", CFG.walkersPerPeriod], ["custodian", CFG.custodiansPerPeriod]]) {
    let have = staff.filter((st) => st.key === key && !st.wanted).length;   // (extra staff from your heat don't count)
    const want = perPeriod(table);
    if (have < want && line && game.state === "playing") pa(line);
    while (have < want) { spawnStaff(key, pickStaffPlace(key)); have++; }
  }
  if (game.period === periodsToday() && !first) setTimeout(() => game.state === "playing" && game.period === periodsToday() && pa("lastPeriod"), 2500);
}

function startSkipping() {
  game.phase = "skipping"; game.phaseT = 0;
  game.chasedThisSkip = false;
  for (const m of game.dares) m.p.armed = true;   // the clean-period dare counts from the start of a skipping period
  playBell();
  banner("TARDY BELL<small>Hall's clearing out. Stay hidden until the next bell.</small>");
  if (game.alarmT <= 0) for (const c of crowd) if (c.mode === "wander" || c.mode === "toClass" || c.mode === "gather") { c.mode = "toClass"; c.gather = null; c.speed = CFG.crowd.tardyRushSpeed; }
  for (const st of staff) if (st.penned) unpen(st);   // the tardy bell: the kids scatter to class
}

function periodSurvived() {
  dareEvent("bell", { clean: !game.chasedThisSkip });
  daresAtBell(false);
  playBell();
  game.periodsSkipped++; game.dayPeriodsSkipped++;
  if (!game.survival) { game.heat *= 1 - CFG.heat.bellDrop; game.heatPending *= 1 - CFG.heat.bellDrop; }
  if (game.period >= periodsToday()) { startDismissal(); return; }
  game.period++;
  resetSpotsForPeriod();
  if (player.hidden?.kind === "classroom") exitSpot(false, "Bell! You slip out with the class.");
  banner(`BELL! +${CFG.pointsPerPeriod}<small>Period ${game.period - 1} skipped. Blend into the crowd.</small>`);
  startPassing(false);
  saveGame();
}

// Step 76: the last bell. Everyone pours out of class and heads for the exit; get out with them before the doors close.
function startDismissal() {
  game.phase = "passing"; game.dismissal = true; game.phaseT = 0; game.periodScore = 0;
  const P = CFG.dismissal.sec, doors = DOOR_SPOTS();
  for (const c of crowd) {
    c.leaveAt = rand(...CFG.dismissal.leaveFrac) * P;
    if (c.mode === "gone" || c.mode === "spawning") { const d = pick(doors.filter((x) => !x.jammed)); c.spawnDoor = d; c.door = exitDoor(HALLS[d.h].floor); c.mode = "spawning"; c.spawnAt = rand(0, CFG.crowd.floodSpreadSec); c.speed = rand(CFG.crowd.speedMin, CFG.crowd.speedMax); }
    else c.door = exitDoor(floorOf(c.x));
  }
  if (player.hidden?.kind === "classroom") exitSpot(false, "Last bell! You slip out with the class.");
  banner(`LAST BELL! +${CFG.pointsPerPeriod}<small>School's out. Get to the front doors with everyone else before they lock up.</small>`, 3.2);
  pa(null, "That's the last bell. Have a great evening, everyone. Walk, don't run.", 4);
}
function updateDismissal() {
  if (!game.dismissal || player.hidden) return;
  const E = ENTRANCE_DOOR, f = hallPos(E.h, E.t, E.wallLat - E.side * 0.6, tmp);
  if (Math.hypot(player.x - f.x, player.z - f.z) < CFG.dismissal.exitRadius) { tally("walkedOut"); dayOver(); }
}
// a marker that points the way out: the front doors, or (upstairs) the nearest stairs down. At the screen edge when it's off screen.
const exitMarkEl = $("exitMark");
function drawExitMark() {
  if (!game.dismissal || game.state !== "playing" || player.hidden) { exitMarkEl.style.display = "none"; return; }
  const up = floorOf(player.x) === 1;
  let p, label;
  if (!up) { const E = ENTRANCE_DOOR; p = hallPos(E.h, E.t, E.wallLat - E.side * 0.3, {}); label = "🚪 EXIT"; }
  else {
    const sp = SPOTS.filter((x) => x.kind === "stairs" && x.floor === 1).sort((a, b) => spotDist(a) - spotDist(b))[0];
    p = hallPos(sp.h, sp.t, sp.wallLat, {}); label = "🪜 STAIRS DOWN";
  }
  const w = window.innerWidth, h = window.innerHeight;
  projA.set(p.x, 1.6, p.z).applyMatrix4(camera.matrixWorldInverse);
  const behind = projA.z > -0.2;
  projA.set(p.x, 1.6, p.z).project(camera);
  let x = ((projA.x + 1) / 2) * w, y = ((1 - projA.y) / 2) * h;
  if (behind) { x = w - x; y = h - y; }
  const m = 46, off = behind || x < m || x > w - m || y < m || y > h - m;
  if (off) {   // pin it to the screen edge, pointing toward it
    const cx = w / 2, cy = h / 2, dx = x - cx, dy = (behind ? Math.max(y, cy + 1) : y) - cy, k = Math.min((cx - m) / Math.abs(dx || 1e-3), (cy - m) / Math.abs(dy || 1e-3));
    x = cx + dx * k; y = cy + dy * k;
    exitMarkEl.dataset.arrow = Math.abs(dx) * (h / w) > Math.abs(dy) ? (dx > 0 ? "→" : "←") : dy > 0 ? "↓" : "↑";
  } else exitMarkEl.dataset.arrow = "";
  const html = `${exitMarkEl.dataset.arrow ? `<b>${exitMarkEl.dataset.arrow}</b> ` : ""}${label}`;
  if (exitMarkEl.dataset.h !== html) { exitMarkEl.innerHTML = html; exitMarkEl.dataset.h = html; }
  exitMarkEl.style.display = "block"; exitMarkEl.style.left = x + "px"; exitMarkEl.style.top = y + "px";
}
// the doors closed with you still inside: the nearest staff member finds you (a strike), then the day's over anyway
function missedExit() {
  const st = staff.filter(chaser).sort((a, b) => Math.hypot(a.x - player.x, a.z - player.z) - Math.hypot(b.x - player.x, b.z - player.z))[0] ?? staff[0];
  game.dayEndAfterScene = true;
  toast("The doors are locked. You're still inside.", 2.4);
  caught(st, true);
}

// End of the day: a summary screen, then the next (harder) day starts in the morning.
function dayOver() {
  game.state = "dayEnd"; game.dismissal = false; game.dayEndAfterScene = false;
  releaseControls();
  ui.banner.classList.remove("show"); bannerTimer = 0;
  if (player.hidden) exitSpot(false);
  daresAtBell(true);
  game.score += CFG.days.dayBonus;
  const D = CFG.days, next = game.day + 1;
  $("dayTitle").textContent = `DAY ${game.day} SURVIVED!`;
  $("dayStats").innerHTML = `${game.dayPeriodsSkipped} periods skipped today · +${D.dayBonus} day bonus<br><b>Score ${Math.floor(game.score)}</b> · Strikes ${game.strikes}/${CFG.strikes.max}<br><small>Tomorrow's lunch: ${pick(LUNCHES)}</small>`;
  const pass = Math.max(D.minPassingSec, CFG.passingSec + D.passingSecPerDay * (next - 1));
  const skip = Math.min(D.maxSkippingSec, CFG.skippingSec + D.skippingSecPerDay * (next - 1));
  $("dayNext").innerHTML = (game.survival ? `<b class="warn">You're still on a REBEL RUN. They'll be waiting for you tomorrow.</b> ` : "") +
    `Day ${next}: staff are faster and sharper. Passing ${pass}s, skipping ${skip}s.` + (game.survival ? "" : " Your heat cools off overnight.");
  $("dayPassBtn").hidden = !Ads.canRewarded("fakePass") || game.passShield;
  $("dayEnd").hidden = false;
  game.day = next; game.period = 1; game.highAlert = game.survival; game.dayPeriodsSkipped = 0;
  if (!game.survival) { game.heat = game.heatPending = 0; game.stars = 0; }
  saveGame();
}
function startNextDay() {
  $("dayEnd").hidden = true;
  Ads.newDay();
  morningSetup();
  game.state = "playing";
  if (game.survival) {
    banner(`DAY ${game.day} · REBEL RUN<small>They didn't forget. Every staff member is looking for you.</small>`, 3.2);
    setTimeout(() => game.state === "playing" && pa("survival"), 1500);
  } else {
    banner(`DAY ${game.day}<small>New day, same hoodie. New subs today.</small>`, 2.6);
    setTimeout(() => game.state === "playing" && pa("newDay", null, null, { d: game.day }), 1500);
  }
  perkToast();
  clock.getDelta();
}

function releaseControls() { stick.id = look.id = null; keys.clear(); sprintTouch = false; $("sprintBtn").classList.remove("on"); stickBase.style.display = stickKnob.style.display = "none"; }
// the phone's sprint button: hold it
{
  const b = $("sprintBtn");
  const on = (v) => (e) => { e.preventDefault(); e.stopPropagation(); sprintTouch = v; b.classList.toggle("on", v); };
  b.addEventListener("pointerdown", on(true));
  for (const ev of ["pointerup", "pointercancel", "pointerleave"]) b.addEventListener(ev, on(false));
}

const RELEASE_LINES = ["Now get to class!!!", "Get out of my sight!!!", "Go. GO. Before I change my mind.", "I don't want to see you again today.", "Class. Now. MOVE."];
function caught(st, forced = false) {
  if (tut) { tutCaught(st); return; }   // step 72: practice catches don't count
  game.chaseOn = false;   // a catch isn't an escape
  cancelAim();
  game.catcher = st;
  hopOff(true);
  if (player.ride) endRide(false);
  if (game.phase === "passing" && game.stars < 1 && !game.survival && !forced) { shoo(st); return; }
  game.unseenT = 0;
  if (game.passShield && !forced) {   // the fake pass: one free get-out
    game.passShield = false; tally("passUsed");
    shoo(st, `You flash the fake pass. The ${st.type.name} squints at it... "Fine. Go."`);
    return;
  }
  game.strikes++;
  ui.hide.hidden = true;
  releaseControls();
  playBlip([660, 520, 390, 260], 0.13, "sawtooth", 0.07);
  if (game.strikes >= CFG.strikes.max || game.survival) {   // strike 3, or any catch in survival mode: the run is over
    game.state = "caught";
    clearSave(); stopAlarm();
    pa("runOver");
    // how it ends depends on how hot you were
    const E = game.survival || game.stars >= 5 ? RUN_ENDINGS.maxed : game.stars >= 3 ? RUN_ENDINGS.high : RUN_ENDINGS.normal;
    $("caughtTitle").textContent = E.title;
    $("caughtText").innerHTML = `The ${st.type.name} walks you to the office. ${pick(E.lines)}<br>` +
      (game.survival ? `Your rebel run lasted ${Math.round(game.survivalT)} seconds.<br>` : "") +
      `<b>Score ${Math.floor(game.score)}</b> · Day ${game.day}, period ${game.period} · ${game.periodsSkipped} period${game.periodsSkipped === 1 ? "" : "s"} skipped`;
    $("caughtBest").innerHTML = recordRun(E.title);
    $("caught").hidden = false;
    return;
  }
  game.state = "scene"; game.sceneT = 0;
  const office = game.strikes === 2;
  game.sceneEnd = office ? CFG.strikes.officeSceneSec : CFG.strikes.warningSceneSec;
  $("strikeTitle").textContent = office ? "STRIKE 2 · THE OFFICE" : "STRIKE 1 · WARNING";
  $("strikeLine").textContent = office
    ? `${pick(OFFICE_RANTS)} Staff will be watching you for the rest of the day.`
    : `The ${st.type.name} catches you. ${pick(CAUGHT_LINES[st.key] ?? [st.type.caughtLine])}`;
  $("strikeExcuse").textContent = `Your excuse: "${pick(EXCUSES)}" It does not work.`;
  $("strikeSub").textContent = office ? "One more and your run is over." : "One more and you're going to the office.";   // step 67: getting caught never costs points
  $("strikeDots").innerHTML = strikeDotsHtml();
  const canForge = Ads.canRewarded("forgeNote");
  $("forgeBtn").hidden = !canForge;
  if (canForge) game.sceneEnd += 3.5;   // a little longer, so there's time to decide
  $("strike").className = "overlay " + (office ? "office" : "warning");
  $("strike").hidden = false;
  pa(office ? "strike2" : "strike1");
  // everyone backs off
  for (const o of staff) {
    if (o.type.stationary) o.state = "post";
    else if (o.type.custodian) { o.suspicion = 0; continue; }
    else if (o.state !== "patrol") { o.state = "return"; setReturnPoint(o); }
    o.suspicion = 0; o.calledBackup = false; o.chaseT = 0; o.windedT = 0; o.pauseT = 0.8;
  }
  game.pendingOffice = office;
}

// Caught during a passing period at 0 stars: no strike, just "get to class!" and a little heat.
function shoo(st, line = null) {
  toast(line ?? `The ${st.type.name}: "Get to class!" (No strike: you had no heat.)`, 2.6);
  playBlip([520, 390], 0.1, "triangle", 0.07);
  if (!line) addHeat(CFG.heat.shooHeat);
  for (const o of staff) {
    if (!chaser(o)) { o.suspicion = 0; o.alarmT = Math.max(o.alarmT, 3); continue; }
    if (o.state !== "patrol") { o.state = "return"; setReturnPoint(o); }
    o.suspicion = 0; o.calledBackup = false; o.pauseT = 1.0;
  }
  player.invisT = CFG.strikes.shooGraceSec;
  letGo(st, CFG.strikes.shooIgnoreSec, true);
}
// whoever caught you shoos you off and looks the other way for a while
function letGo(st, sec, quiet = false) {
  if (!st || !staff.includes(st)) return;
  st.ignoreT = sec; st.suspicion = 0;
  st.bubble.textContent = pick(RELEASE_LINES); st.barkUntil = performance.now() + 2600; st.barkAt = game.time;
  if (!quiet) toast(`The ${st.type.name}: "${st.bubble.textContent}"`, 2.6);
}

function endScene(skipAd = false) {
  if (game.state !== "scene") return;
  if (!skipAd && Ads.canInterstitial()) { $("strike").hidden = true; Ads.interstitial(() => { game.state = "scene"; endScene(true); }); return; }
  $("strike").hidden = true;
  if (game.pendingOffice) {
    game.highAlert = true;
    // sent back out from the office, by the entrance
    const { h, t } = LAYOUT.entrance, side = HALLS[h].outerSide, p = hallPos(h, t, wallLat(h, side) - side * 0.8);
    player.x = p.x; player.z = p.z; player.heading = hallHeading(h, -1); cam.yaw = player.heading;
    banner("HIGH ALERT<small>Staff see farther and move faster for the rest of the day. The principal is in the halls.</small>", 2.8);
    ensurePrincipal(true);
  }
  if (game.strikes === CFG.strikes.max - 1) setTimeout(() => pa("lastStrike"), 4800);
  player.invisT = CFG.strikes.afterStrikeGraceSec;
  letGo(game.catcher, CFG.strikes.catcherIgnoreSec);
  game.state = "playing";
  if (game.dayEndAfterScene) { dayOver(); clock.getDelta(); return; }   // step 76: found inside after the doors locked
  saveGame();
  clock.getDelta();
}
function strikeDotsHtml() {
  let h = "";
  for (let i = 0; i < CFG.strikes.max; i++) h += `<span class="${i < game.strikes ? "on" : ""}"></span>`;
  return h;
}

// ---- PA announcer: chime + text box. Rate-limited per kind so it doesn't nag.
let paLast = {}, paTimer = 0;
function pa(kind, text = null, sec = null, vars = {}) {
  if (tut) return;   // step 72: no announcements in the tutorial
  if (kind) {
    if (game.time - (paLast[kind] ?? -99) < CFG.pa.sameKindCooldownSec) return;
    paLast[kind] = game.time;
    text = pick(PA_LINES[kind]).replace(/\{(\w+)\}/g, (m, k) => vars[k] ?? m);
    playBlip([784, 622], 0.22, "sine", 0.06);   // ding-dong
  }
  $("paText").textContent = text;
  $("pa").classList.add("show");
  $("pa").classList.toggle("quiet", !kind);
  paTimer = sec ?? CFG.pa.showSec;
}

function pause() {
  if (game.state !== "playing") return;
  game.state = "paused"; $("paused").hidden = false;
  releaseControls(); cancelAim();
}
function startRun(save) {
  resetGame(save);
  $("title").hidden = true; $("caught").hidden = true;
  game.state = "playing";
  if (save) banner(`DAY ${game.day} · PERIOD ${game.period}<small>Welcome back. Strikes: ${game.strikes}/${CFG.strikes.max}</small>`, 2.6);
  else banner("PASSING PERIOD<small>Blend in. When the bell rings, don't be in class.</small>");
  setTimeout(() => game.state === "playing" && pa("start"), 1200);
  if (!save) setTimeout(() => game.state === "playing" && toast("Psst: there's a kid in the restroom handing out dares.", 3), 9000);
  perkToast();
  renderDares();
  tryFullscreenLandscape();
  saveGame();
}
function onOverlayTap(e) {
  initAudio();
  if (game.state === "title") {   // only the buttons do anything on the title screen
    const id = e?.target?.id ?? "startBtn";
    if (id === "aboutBtn") { startTutorial(false); return; }   // step 72: How to play is the tutorial now
    const firstRun = () => { if (tutSeen()) startRun(null); else startTutorial(true); };   // step 72: your first run starts with the tutorial
    if (id === "startBtn" && !character.made) { openCharacter(null, () => { initAudio(); firstRun(); clock.getDelta(); }); return; }   // first time: make your kid
    if (id === "startBtn") firstRun();
    if (id === "continueBtn") startRun(loadSave());
  }
  else if (game.state === "caught") startRun(null);
  else if (game.state === "paused") { $("paused").hidden = true; game.state = "playing"; }
  else if (game.state === "dayEnd") {
    if (Ads.canInterstitial()) Ads.interstitial(() => startNextDay());
    else startNextDay();
  }
  clock.getDelta();
}
for (const id of ["title", "caught", "paused", "dayEnd"]) $(id).addEventListener("click", onOverlayTap);
for (const id of ["aboutClose", "aboutX"]) $(id).addEventListener("click", () => { $("about").hidden = true; });
$("strike").addEventListener("click", (e) => { if (e.target.id !== "forgeBtn" && game.sceneT > 0.8) endScene(); });
$("forgeBtn").addEventListener("click", (e) => {
  e.stopPropagation();
  Ads.rewarded("forgeNote", () => {   // reward: the strike never happened
    game.strikes = Math.max(0, game.strikes - 1); game.pendingOffice = false;
    toast("Forged note accepted. That strike never happened.", 2.6);
    game.state = "scene"; endScene(true);
  }, () => { game.state = "scene"; endScene(true); });
});
$("dayPassBtn").addEventListener("click", (e) => {
  e.stopPropagation();
  Ads.rewarded("fakePass", () => { game.passShield = true; $("dayPassBtn").hidden = true; toast("🎫 You'll start tomorrow with a fake pass."); game.state = "dayEnd"; },
    () => { game.state = "dayEnd"; });
});
$("hpLeave").addEventListener("click", () => { if (game.state === "playing") exitSpot(false); });
window.addEventListener("blur", pause);
document.addEventListener("visibilitychange", () => { if (document.hidden) pause(); });
{
  const s = loadSave();
  if (s) {
    $("continueBtn").textContent = `Continue: Day ${s.day}, Period ${s.period}`;
    $("continueBtn").hidden = false;
    $("startBtn").textContent = "New run";
  }
  renderBestRuns();
}
// ---- options, saved in this browser ----
const OPTS_KEY = "hallwaySkip.options.v1";
const opts = { autoAim: true, stickGuide: true };
try { Object.assign(opts, JSON.parse(localStorage.getItem(OPTS_KEY)) || {}); } catch (e) { /* storage blocked: defaults */ }
function saveOpts() { try { localStorage.setItem(OPTS_KEY, JSON.stringify(opts)); } catch (e) { /* fine */ } }
function renderOptSummary() { $("optSummary").textContent = `Auto-aim ${opts.autoAim ? "on" : "off"} · joystick guide ${opts.stickGuide ? "on" : "off"}`; }
function openOptions(e) {
  e?.stopPropagation(); $("optAutoAim").checked = opts.autoAim; $("optStick").checked = opts.stickGuide; $("options").hidden = false;
  const inRun = game.state === "paused" || !!loadSave() || !!tut;   // step 82: Reset game only shows when there's a run to end
  $("restartBtn").hidden = $("restartNote").hidden = !inRun; disarmRestart();
}
// step 82: Reset game ends this run and goes back to the title (Delete game data is the one that erases everything)
let restartArmT = 0;
function disarmRestart() { restartArmT = 0; $("restartBtn").classList.remove("armed"); $("restartBtn").textContent = "↺ Reset game"; }
$("restartBtn").addEventListener("click", (e) => {
  e.stopPropagation();
  if (performance.now() > restartArmT) {
    restartArmT = performance.now() + 4000;
    $("restartBtn").classList.add("armed"); $("restartBtn").textContent = "Tap again to end this run";
    setTimeout(() => performance.now() > restartArmT && disarmRestart(), 4100);
    return;
  }
  disarmRestart(); backToTitle();
});
function backToTitle() {
  clearSave();
  $("options").hidden = true; $("paused").hidden = true;
  if (tut) { endTutorial(false); }
  else {
    releaseControls(); cancelAim();
    resetGame(null, false);
    game.state = "title"; $("title").hidden = false;
    updateCrowd(0.016); drawCrowd();
  }
  $("continueBtn").hidden = true; $("startBtn").textContent = "Play";
  renderBestRuns();
  clock.getDelta();
}
$("optionsBtn").addEventListener("click", openOptions);
$("pauseOptionsBtn").addEventListener("click", openOptions);
$("optAutoAim").addEventListener("change", (e) => { opts.autoAim = e.target.checked; saveOpts(); renderOptSummary(); });
$("optStick").addEventListener("change", (e) => { opts.stickGuide = e.target.checked; saveOpts(); renderOptSummary(); });
$("options").addEventListener("click", (e) => e.stopPropagation());
$("optionsClose").addEventListener("click", () => { $("options").hidden = true; disarmReset(); });
// step 73: reset everything (two taps, so it can't happen by accident)
let resetArmT = 0;
function disarmReset() { resetArmT = 0; $("resetBtn").classList.remove("armed"); $("resetBtn").textContent = "🗑 Delete game data"; }
$("resetBtn").addEventListener("click", () => {
  if (performance.now() > resetArmT) {
    resetArmT = performance.now() + 4000;
    $("resetBtn").classList.add("armed"); $("resetBtn").textContent = "Tap again to erase everything";
    setTimeout(() => performance.now() > resetArmT && disarmReset(), 4100);
    return;
  }
  try { for (const k of Object.keys(localStorage)) if (k.startsWith("hallwaySkip.")) localStorage.removeItem(k); } catch (e) { /* storage blocked: nothing saved anyway */ }
  location.replace(location.pathname + location.search);
});
$("pauseBtn").addEventListener("pointerdown", (e) => e.stopPropagation());
$("hoodBtn").addEventListener("pointerdown", (e) => { e.preventDefault(); e.stopPropagation(); hoodUp(); });
$("jumpBtn").addEventListener("pointerdown", (e) => { e.preventDefault(); e.stopPropagation(); if (player.board) hopOff(); else jumpOff(); });
$("pauseBtn").addEventListener("click", (e) => { e.stopPropagation(); pause(); });
renderOptSummary();

// ---- step 45: your kid. Three stats, 1-20; reroll as often as you like. ----
const CHAR_KEY = "hallwaySkip.character.v1";
const STATS = [
  { k: "stealth", icon: "🥷", label: "Stealth", what: "Staff see less far, with narrower cones, and take longer to notice you. Better odds sneaking into rooms, and staff check the restroom less often." },
  { k: "speed", icon: "👟", label: "Speed", what: "Faster walking and sprinting, and faster on a wheelie chair or skateboard. Your sprint lasts longer and refills faster." },
  { k: "strength", icon: "💪", label: "Strength", what: "Throws go farther, hits keep staff down longer, and bursting out of a locker knocks over more of them. Easier to push through crowds. 15 or more: carry a fifth item." },
];
// Step 59: a bell curve centered on 10 with a standard deviation of 4 (the old 3-dice roll was so narrow that 18+ came up under 1% of the time).
// About 1 stat in 5 is 6 or lower, 1 in 5 is 14 or higher, and 1s and 20s turn up now and then. Never 0 (that would look broken).
const rollStat = () => clamp(Math.round(10 + 4 * Math.sqrt(-2 * Math.log(1 - Math.random())) * Math.cos(2 * Math.PI * Math.random())), 1, 20);
const rollStats = () => Object.fromEntries(STATS.map((S) => [S.k, rollStat()]));
const character = { made: false, stats: rollStats(), look: randomLook() };
try { const c = JSON.parse(localStorage.getItem(CHAR_KEY)); if (c?.stats) Object.assign(character, c); } catch (e) { /* storage blocked: a fresh roll */ }
function saveCharacter() { try { localStorage.setItem(CHAR_KEY, JSON.stringify(character)); } catch (e) { /* fine */ } }
function statMod(k) { return (clamp(character.stats[k] ?? 10, 0, 20) - 10) / 10; }
function speedMult() { return 1 + CFG.stats.speed.move * statMod("speed"); }
function coneHalf(T) { return ((T.visionHalfAngleDeg * Math.PI) / 180) * (1 - CFG.stats.stealth.cone * statMod("stealth")) * starVision(); }
// put your kid (from your look) into the game
function applyLook() {
  if (player.kid) { player.mesh.remove(player.kid); disposeTree(player.kid); }
  player.kid = buildKid(character.look); player.mesh.add(player.kid);
  showHood(player.hoodT > 0);
  if (player.disguiseT > 0) disguiseMesh(true);
}
function disposeTree(o) { o.traverse((m) => { if (m.geometry) m.geometry.dispose(); if (m.material && !m.material.map) m.material.dispose(); }); }
applyLook();
function renderCharSummary() { $("charSummary").textContent = STATS.map((S) => `${S.icon} ${character.stats[S.k]}`).join("  ·  "); }
function renderStats() {
  $("statRows").innerHTML = STATS.map((S) => { const v = character.stats[S.k];
    return `<div class="statRow"><div class="statHead"><b>${S.icon} ${S.label}</b><span class="statNum">${v}</span></div>
      <i class="statBar"><b style="width:${(v / 20) * 100}%" class="${v >= 14 ? "hi" : v <= 6 ? "lo" : ""}"></b></i><small>${S.what}</small></div>`; }).join("");
  $("statTotal").textContent = `Total ${STATS.reduce((a, S) => a + character.stats[S.k], 0)} (average 30)`;
}
let charThen = null;   // what to do after "Done" (start the run, the first time you play)
function openCharacter(e, then = null) {
  e?.stopPropagation(); charThen = then;
  $("charDone").textContent = then ? "Let's go" : "Done";
  renderStats(); renderLooks(); $("charScreen").hidden = false;
  startPreview();
}
// ---- the Looks tab ----
const hex = (c) => "#" + c.toString(16).padStart(6, "0");
function renderLooks() {
  const L = character.look, chip = (group, val, label, on, style = "") => `<button type="button" class="chip${on ? " on" : ""}" data-g="${group}" data-v="${val}"${style ? ` style="${style}"` : ""}>${label}</button>`;
  const slider = (k, left, right, mid = "") => `<div class="lookSlider"><span>${left}</span><input type="range" min="${k === "build" ? -1 : 0}" max="1" step="0.01" value="${L[k]}" data-k="${k}"><span>${right}</span>${mid ? `<em>${mid}</em>` : ""}</div>`;
  $("lookPane").innerHTML = `
    <h3>Outfit</h3><div class="chips">${Object.entries(OUTFITS).map(([k, O]) => chip("outfit", k, O.label, L.outfit === k)).join("")}</div>
    <p class="keys perk">${perkText(L.outfit) ? `Brings to school every day: ${perkText(L.outfit)}` : "Brings nothing extra (yet)."}</p>
    <h3>Hair</h3><div class="chips">${Object.entries(HAIR_STYLES).map(([k, n]) => chip("hair", k, n, L.hair === k)).join("")}</div>
    <div class="chips swatches">${HAIR_COLORS.map((c, i) => chip("hairColor", i, "", L.hairColor === i, `background:${hex(c)}`)).join("")}</div>
    <h3>Skin</h3><div class="chips swatches">${SKIN_TONES.map((c, i) => chip("skin", i, "", L.skin === i, `background:${hex(c)}`)).join("")}</div>
    <h3>Body</h3>
    ${slider("height", "Short", "Tall")}
    ${slider("weight", "Thin", "Big")}
    ${slider("build", BUILD_ICONS[0], BUILD_ICONS[2], BUILD_ICONS[1])}
    <div class="buttons"><button type="button" class="go ghost" id="randomLookBtn">🎲 Random look</button></div>`;
}
$("lookPane").addEventListener("click", (e) => {
  const b = e.target.closest("button"); if (!b) return;
  if (b.id === "randomLookBtn") character.look = randomLook();
  else if (b.dataset.g) { const v = b.dataset.v; character.look[b.dataset.g] = /^\d+$/.test(v) ? +v : v; }
  else return;
  renderLooks(); lookChanged();
});
$("lookPane").addEventListener("input", (e) => { if (e.target.dataset.k) { character.look[e.target.dataset.k] = +e.target.value; lookChanged(); } });
for (const b of document.querySelectorAll(".charTab")) b.addEventListener("click", () => {
  for (const t of document.querySelectorAll(".charTab")) t.classList.toggle("on", t === b);
  $("statPane").hidden = b.dataset.tab !== "stats"; $("lookPane").hidden = b.dataset.tab !== "looks";
  $("rerollBtn").hidden = b.dataset.tab !== "stats";
});
// ---- the spinning preview on the character screen (its own small renderer, only running while the screen is open) ----
const pv = { r: null, scene: null, cam: null, kid: null, yaw: 0.5, drag: null, last: 0 };
function lookChanged() {
  if (!pv.scene) return;
  if (pv.kid) { pv.scene.remove(pv.kid); disposeTree(pv.kid); }
  pv.kid = buildKid(character.look); pv.scene.add(pv.kid);
}
function startPreview() {
  const cv = $("kidCanvas");
  if (!pv.r) {
    pv.r = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true });
    pv.r.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    pv.scene = new THREE.Scene();
    pv.scene.add(new THREE.HemisphereLight(0xffffff, 0x445066, 1.6));
    const sun = new THREE.DirectionalLight(0xffffff, 1.6); sun.position.set(2, 4, 3); pv.scene.add(sun);
    const floor = new THREE.Mesh(new THREE.CircleGeometry(0.7, 24), new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.25 }));
    floor.rotation.x = -Math.PI / 2; pv.scene.add(floor);
    pv.cam = new THREE.PerspectiveCamera(30, 1, 0.1, 20);
    cv.addEventListener("pointerdown", (e) => { pv.drag = e.clientX; cv.setPointerCapture?.(e.pointerId); });
    cv.addEventListener("pointermove", (e) => { if (pv.drag != null) { pv.yaw += (e.clientX - pv.drag) * 0.012; pv.drag = e.clientX; } });
    for (const ev of ["pointerup", "pointercancel"]) cv.addEventListener(ev, () => { pv.drag = null; });
  }
  lookChanged();
  pv.last = performance.now();
  const frame = (now) => {
    if ($("charScreen").hidden) return;
    const dt = Math.min(0.05, (now - pv.last) / 1000); pv.last = now;
    const w = cv.clientWidth, h = cv.clientHeight;
    if (w && h && (cv.width !== Math.round(w * pv.r.getPixelRatio()) || cv.height !== Math.round(h * pv.r.getPixelRatio()))) { pv.r.setSize(w, h, false); pv.cam.aspect = w / h; pv.cam.updateProjectionMatrix(); }
    if (pv.drag == null) pv.yaw += dt * 0.5;
    pv.kid.rotation.y = pv.yaw;
    pv.cam.position.set(0, 1.05, 4.2); pv.cam.lookAt(0, 0.82, 0);
    pv.r.render(pv.scene, pv.cam);
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}
$("charBtn").addEventListener("click", openCharacter);
$("charScreen").addEventListener("click", (e) => e.stopPropagation());
$("rerollBtn").addEventListener("click", () => {
  character.stats = rollStats(); for (const k in rangeCache) delete rangeCache[k];   // auto-aim ranges depend on strength
  renderStats(); playBlip([500 + Math.random() * 300], 0.04, "square", 0.04);
});
$("charDone").addEventListener("click", () => {
  character.made = true; saveCharacter(); renderCharSummary(); applyLook(); $("charScreen").hidden = true;
  for (const k in rangeCache) delete rangeCache[k];
  const t = charThen; charThen = null; if (t) t();
});
renderCharSummary();
// the joystick guide (phones only) and hiding the play-only HUD bits on menus
const isTouch = matchMedia("(pointer: coarse)").matches || URLQ.has("touch");
let guideKey = "";
function updateGuides() {
  const playing = game.state === "playing";
  const show = playing && isTouch && (opts.stickGuide || !!tut) && !player.hidden && !game.aim;
  const k = `${playing}:${show && stick.id === null}:${show && look.id === null}`;
  if (k === guideKey) return;
  guideKey = k;
  document.body.classList.toggle("state-off", !playing && game.state !== "scene");
  $("stickGuide").hidden = !(show && stick.id === null);
  $("lookGuide").hidden = !(show && look.id === null);
}

function tryFullscreenLandscape() {
  if (!matchMedia("(pointer: coarse)").matches) return;
  const el = document.documentElement;
  const req = el.requestFullscreen || el.webkitRequestFullscreen;
  if (req && !document.fullscreenElement) {
    Promise.resolve(req.call(el)).then(() => screen.orientation?.lock?.("landscape")).catch(() => {});
  }
}

// =====================================================================================
// Update
// =====================================================================================
const tmp = {};
// how far sideways you can be in hall h at distance t (walls, lockers, obstacles)
function latLimits(h, t) {
  const lim = (side) => {
    let v = Math.abs(wallLat(h, side)) - 0.35;
    for (const ob of OBSTACLES) if (ob.h === h && ob.side === side && Math.abs(t - ob.t) < ob.halfLen + 0.5) v = Math.min(v, Math.abs(wallLat(h, side)) - ob.depth - 0.35);
    return v;
  };
  return [-lim(-1), lim(1)];
}

function updatePlayer(dt) {
  readInput();
  player.graceT = Math.max(0, player.graceT - dt);
  if (player.invisT > 0) { player.invisT -= dt; player.mesh.visible = !player.hidden && (player.invisT <= 0 || Math.sin(game.time * 22) > -0.3); }
  if (player.hidden) { updateHiding(dt); return; }
  animateKid(player.kid, player.ride || player.board || player.slipT > 0 || player.dazeT > 0 || player.stuckT > 0 ? 0 : Math.hypot(player.vx, player.vz), dt);
  if (player.ride) { updateRide(dt); return; }
  if (player.board && (player.slipT > 0 || player.stuckT > 0)) dropBoard("You wipe out!");
  if (player.board) { updateBoard(dt); return; }
  if (player.slipT > 0 || player.dazeT > 0) {   // flat on your back, or seeing stars
    player.slipT = Math.max(0, player.slipT - dt); player.dazeT = Math.max(0, player.dazeT - dt);
    player.vx = player.vz = 0;
    player.mesh.rotation.z = player.slipT > 0 ? 1.25 : Math.sin(game.time * 14) * 0.25;
    if (player.slipT <= 0 && player.dazeT <= 0) player.mesh.rotation.z = 0;
    player.mesh.position.set(player.x, 0, player.z);
    return;
  }
  if (player.stuckT > 0) {   // standing in slime: can't move, can still look around
    player.stuckT -= dt; player.vx = player.vz = 0;
    player.mesh.rotation.z = player.stuckT > 0 ? Math.sin(game.time * 12) * 0.12 : 0;
    player.mesh.position.set(player.x, 0, player.z);
    return;
  }
  const f = { x: Math.sin(cam.yaw), z: Math.cos(cam.yaw) }, r = { x: -Math.cos(cam.yaw), z: Math.sin(cam.yaw) };
  const mx = r.x * input.x + f.x * input.y, mz = r.z * input.x + f.z * input.y;
  updateSprint(dt);
  const sp = CFG.player.speed * (player.sprinting ? CFG.sprint.speedMult : 1) * speedMult();
  const ox = player.x, oz = player.z;
  player.x += mx * sp * dt; player.z += mz * sp * dt;
  // students jostle you out of the way (sprinting, you barge through them instead)
  player.shoveCD = Math.max(0, player.shoveCD - dt);
  for (const c of crowd) {
    if (c.mode === "gone" || c.mode === "spawning") continue;
    const dx = player.x - c.x, dz = player.z - c.z, d = Math.hypot(dx, dz), min = CFG.player.radius + CFG.crowd.radius;
    if (d < min && d > 1e-4) {
      const k = (player.sprinting ? 0.3 : 1) * (1 - CFG.stats.strength.shove * statMod("strength"));   // step 49: strong kids get pushed around less
      if (player.sprinting) shove(c);
      player.x += (dx / d) * (min - d) * k; player.z += (dz / d) * (min - d) * k;
    }
  }
  collide(player, CFG.player.radius);
  player.vx = (player.x - ox) / Math.max(dt, 1e-4); player.vz = (player.z - oz) / Math.max(dt, 1e-4);
  if (input.m > 0) player.heading = lerpAngle(player.heading, Math.atan2(mx, mz), damp(CFG.player.turnRate, dt));
  checkWalkIn(mx, mz, dt);
  // camera swings back behind the kid while moving (not while backing up toward the camera)
  manualCamT -= dt;
  if (manualCamT <= 0 && input.m > 0 && input.y > -0.3) cam.yaw = lerpAngle(cam.yaw, player.heading, damp(CFG.camera.followRate * input.m, dt));
  // mesh
  const moving = Math.hypot(player.vx, player.vz) > 0.3;
  player.mesh.position.set(player.x, moving ? Math.abs(Math.sin(player.kid?.userData.walk ?? game.time * 11)) * 0.035 : 0, player.z);
  player.mesh.rotation.y = player.heading;
}

// ---- sprinting ----
function updateSprint(dt) {
  const S = CFG.sprint, want = (keys.has("shift") || sprintTouch) && input.m > 0;
  if (player.winded && player.stamina >= S.restartAt) player.winded = false;
  player.sprinting = want && !player.winded && player.stamina > 0;
  const stam = 1 + CFG.stats.speed.stamina * statMod("speed");   // step 49
  if (player.sprinting) { player.stamina = Math.max(0, player.stamina - dt / (S.staminaSec * stam)); if (player.stamina <= 0) { player.winded = true; toast("Out of breath!"); } }
  else player.stamina = Math.min(player.staminaMax, player.stamina + (dt / S.rechargeSec) * stam * (player.boostT > 0 ? CFG.energy.rechargeMult : 1));
}
// ---- skateboard ----
const boardMesh = makeItemMesh("skateboard"); boardMesh.visible = false;
function hopOn() {
  if (player.ride || player.hidden) return;
  if (player.hoodT > 0) hoodDown("Hood down: you can't skate with your hood up.");
  player.board = { vx: player.vx, vz: player.vz }; boardMesh.visible = true;
  $("jumpBtn").textContent = "🛹 Hop off"; $("jumpBtn").hidden = false;
  toast(isTouch ? "Skating! Steer with the stick. Tap 🛹 to hop off." : "Skating! Space (or 🛹 in your items) hops off.", 2.2);
  playBlip([300, 450], 0.06, "triangle", 0.05); renderHotbar();
}
function hopOff(quiet = false) {
  if (!player.board) return;
  player.board = null; boardMesh.visible = false; $("jumpBtn").hidden = true; $("jumpBtn").textContent = "🦘 Jump off";
  player.mesh.position.y = 0; player.mesh.rotation.z = 0;
  if (!quiet) playBlip([400, 300], 0.05, "triangle", 0.04);
  renderHotbar();
}
// fell off: the board ends up on the floor (go get it before a kid does)
function dropBoard(msg) {
  if (!player.board) return;
  const b = player.board, sp = Math.hypot(b.vx, b.vz) || 1;
  hopOff(true);
  const i = game.hotbar.findIndex((it) => it?.key === "skateboard"); if (i >= 0) consumeSlot(i);
  const o = spawnObject("skateboard", "resting", player.x + (b.vx / sp) * 1.2, REST_Y.skateboard, player.z + (b.vz / sp) * 1.2);
  collide(o, 0.3); o.mesh.rotation.y = Math.atan2(b.vx, b.vz); capLying();
  player.dazeT = Math.max(player.dazeT, ITEM_TYPES.skateboard.crashDaze); player.graceT = Math.max(player.graceT, 1.2);
  popup("WIPEOUT!", "bad"); playBlip([220, 120], 0.12, "sawtooth", 0.08);
  if (msg) toast(msg);
}
function updateBoard(dt) {
  const T = ITEM_TYPES.skateboard, B = player.board;
  const f = { x: Math.sin(cam.yaw), z: Math.cos(cam.yaw) }, r = { x: -Math.cos(cam.yaw), z: Math.sin(cam.yaw) };
  const mx = r.x * input.x + f.x * input.y, mz = r.z * input.x + f.z * input.y;
  if (input.m > 0) { const k = damp(T.accel, dt), v = T.speed * speedMult(); B.vx += (mx * v - B.vx) * k; B.vz += (mz * v - B.vz) * k; }
  else { const k = Math.exp(-T.coast * dt); B.vx *= k; B.vz *= k; }   // coasting
  player.sprinting = false; player.stamina = Math.min(player.staminaMax, player.stamina + dt / CFG.sprint.rechargeSec);
  const ox = player.x, oz = player.z, sp = Math.hypot(B.vx, B.vz);
  player.x += B.vx * dt; player.z += B.vz * dt;
  // staff: a crash (they go down, and so do you)
  for (const st of staff) {
    if (st.stunT > 0 || Math.hypot(st.x - player.x, st.z - player.z) > 0.95 || sp < 1.5) continue;
    stunStaff(st, T.staffSec, "fall"); bark(st, "slip", true);
    havoc("boardStaff", T.staffPoints, `Skateboard vs. the ${st.type.name}!`, { x: st.x, z: st.z, loud: true });
    dareEvent("hit", { item: "skateboard", staff: st.key, chasing: st.state === "chase" });
    dropBoard(); return;
  }
  // kids: they go flying, you keep rolling (a bit slower)
  for (const c of crowd) {
    if (!isActive(c) || c.slipT > 0 || Math.hypot(c.x - player.x, c.z - player.z) > CFG.player.radius + CFG.crowd.radius) continue;
    if (sp > 2) { c.slipT = T.kidSec; c.stunStyle = "fall"; havoc("boardStudent", T.kidPoints, "Coming through!", { x: c.x, z: c.z }); B.vx *= 0.75; B.vz *= 0.75; }
  }
  collide(player, CFG.player.radius);
  const moved = Math.hypot(player.x - ox, player.z - oz);
  if (sp > T.wallCrashSpeed && moved < sp * dt * 0.35) { dropBoard("You skate straight into the wall."); return; }
  if (moved < sp * dt * 0.8) { const k = moved / Math.max(sp * dt, 1e-4); B.vx *= k; B.vz *= k; }   // scraping along a wall
  player.vx = (player.x - ox) / Math.max(dt, 1e-4); player.vz = (player.z - oz) / Math.max(dt, 1e-4);
  if (sp > 0.3) player.heading = lerpAngle(player.heading, Math.atan2(B.vx, B.vz), damp(6, dt));
  if (input.m > 0) checkWalkIn(mx, mz, dt);
  manualCamT -= dt;
  if (manualCamT <= 0 && sp > 1) cam.yaw = lerpAngle(cam.yaw, player.heading, damp(CFG.camera.followRate, dt));
  boardMesh.position.set(player.x, 0, player.z); boardMesh.rotation.y = player.heading;
  player.mesh.position.set(player.x, 0.1, player.z); player.mesh.rotation.y = player.heading + Math.PI / 2 * 0.6;   // standing sideways on the deck
  player.mesh.rotation.z = clamp(input.x * 0.15, -0.15, 0.15);
}

// ---- hood up: harder to notice for a while ----
function hoodUp() {
  if (game.state !== "playing" || player.hidden || player.hoodT > 0) return;
  if (player.board) { toast("Not while you're skating."); return; }
  if (player.hoodCD > 0) { toast(`Hood's cooling off (${Math.ceil(player.hoodCD)} s)`); return; }
  player.hoodT = CFG.hoodie.sec; showHood(true);
  toast(`Hood up. Staff are slower to notice you for ${CFG.hoodie.sec} s. Don't run.`, 2.2); playBlip([300, 240], 0.06, "triangle", 0.04);
}
function hoodDown(msg) {
  player.hoodT = 0; player.hoodCD = CFG.hoodie.cooldownSec; showHood(false);
  if (msg) toast(msg);
}
function tickHood(dt) {
  if (player.hoodT > 0) {
    player.hoodT -= dt;
    if (player.sprinting) hoodDown("Running knocked your hood down.");
    else if (player.hoodT <= 0) hoodDown("Hood down.");
  } else if (player.hoodCD > 0) player.hoodCD -= dt;
  const b = $("hoodBtn"), label = player.hoodT > 0 ? `🧥 ${Math.ceil(player.hoodT)}` : player.hoodCD > 0 ? `🧥 ${Math.ceil(player.hoodCD)}` : "🧥";
  if (b.dataset.l !== label) { b.dataset.l = label; b.textContent = label; }
  b.classList.toggle("on", player.hoodT > 0); b.classList.toggle("cd", player.hoodT <= 0 && player.hoodCD > 0);
}
// energy drink: the bar is twice as long (and refills faster) until boostT runs out
function drinkEnergy() {
  tally("drinks");
  const E = CFG.energy, again = player.boostT > 0;
  player.staminaMax = E.maxMult; player.stamina = E.maxMult; player.boostT = E.boostSec; player.winded = false;
  toast(again ? "⚡ Another one. The buzz lasts longer." : `⚡ Energy drink! Double stamina for ${E.boostSec} seconds.`, 2.4);
  popup("⚡ BUZZING", "item"); playBlip([520, 780, 1040], 0.07, "triangle", 0.06);
}
function tickBoost(dt) {
  if (player.boostT <= 0) return;
  player.boostT -= dt;
  if (player.boostT <= 0) { player.boostT = 0; player.staminaMax = 1; player.stamina = Math.min(player.stamina, 1); toast("The energy drink wore off."); }
}
// barging through a kid: they stagger aside, nearby staff turn to look, and if one sees you it's a bit of heat
function shove(c) {
  const S = CFG.sprint;
  if (c.slipT <= 0) {
    tally("shoves");
    c.slipT = S.shoveStaggerSec; c.stunStyle = "flinch";
    const pr = hallProject(player.x, player.z);
    if (pr.h === c.h) { const [lo, hi] = latLimits(c.h, c.t); c.lat = c.targetLat = clamp(c.lat + (c.lat >= pr.lat ? 0.7 : -0.7), lo, hi); }
  }
  if (player.shoveCD > 0) return;
  player.shoveCD = S.shoveCooldownSec;
  playBlip([240, 180], 0.05, "square", 0.04);
  makeNoise(player.x, player.z, S.shoveNoiseRadius, false);
  if (staff.some((st) => canSeePlayer(st, 1, true).seen)) { addHeat(S.shoveSeenHeat); popup("Shoving! They saw that.", "bad"); }
}

function updateCrowd(dt) {
  for (const c of crowd) {
    if (c.mode === "gone") continue;
    if (c.slipT > 0) { c.slipT -= dt; continue; }   // on the floor for a moment
    if (c.mode === "spawning") {
      if (game.phaseT < c.spawnAt) continue;
      const d = c.spawnDoor ?? c.door; c.spawnDoor = null;
      c.mode = "exiting"; c.h = d.h; c.t = d.t + (d.entrance ? rand(-1, 1) : rand(-0.4, 0.4)); c.lat = d.wallLat;
      const [lo, hi] = latLimits(c.h, c.t);
      c.targetLat = rand(lo, hi);
      c.to = Math.random() < 0.5 ? HALLS[c.h].a : HALLS[c.h].b;
      c.door = game.dismissal ? exitDoor(HALLS[d.h].floor) : pick(floorDoors(HALLS[d.h].floor));   // a class on the floor they came out on (or, after school, the way out)
      hallPos(c.h, c.t, c.lat, c);
    }
    if (c.mode === "exiting") {
      c.lat += Math.sign(c.targetLat - c.lat) * c.speed * dt;
      if (Math.abs(c.targetLat - c.lat) < 0.15) c.mode = "wander";
    } else if (c.mode === "wander") {
      const h0 = c.h;
      walk(c, c.speed * dt, randomOnward);
      c.retargetT -= dt;
      if (c.retargetT <= 0 || c.h !== h0) {
        const [lo, hi] = latLimits(c.h, c.t);
        c.targetLat = rand(lo, hi); c.retargetT = rand(1.5, 4);
        if (c.h === h0 && Math.random() < 0.12) c.to = otherEnd(c.h, c.to);   // change of heart
      }
      c.lat += (c.targetLat - c.lat) * damp(1.5, dt);
      if (game.phase === "passing" && game.phaseT >= c.leaveAt) { c.mode = "toClass"; if (game.dismissal && !c.door?.entrance && c.door?.kind !== "stairs") c.door = exitDoor(HALLS[c.h].floor); }
    } else if (c.mode === "gather") {   // crowding round something (a geyser, a staff member with a sign on their back)
      const G = c.gather;
      if (G.done()) { c.mode = "wander"; c.gather = null; c.retargetT = 0; }
      else {
        const there = walkTo(c, G.h, G.t, c.speed * (G.speed ?? 1.4) * dt);
        c.lat += ((c.h === G.h ? G.lat : 0) - c.lat) * damp(there ? 4 : 1.5, dt);
      }
    } else if (c.mode === "toClass") {
      if (!c.door || HALLS[c.door.h].floor !== HALLS[c.h].floor) c.door = game.dismissal ? exitDoor(HALLS[c.h].floor) : pick(floorDoors(HALLS[c.h].floor));   // (no hallway between floors)
      const d = c.door;
      if (c.h !== d.h || Math.abs(c.t - d.t) > 0.05) {
        walkTo(c, d.h, d.t, c.speed * dt);
        const toward = c.h === d.h ? d.side * 1.2 : 0;   // drift toward the door's side of the hall
        c.lat += (toward - c.lat) * damp(1, dt);
      } else {
        c.lat += Math.sign(d.wallLat) * c.speed * dt;
        if (Math.abs(c.lat) > Math.abs(d.wallLat) - 0.05) c.mode = "gone";
      }
    }
    const [lo, hi] = latLimits(c.h, c.t);
    c.lat = c.mode === "toClass" || c.mode === "exiting" ? clamp(c.lat, -LAYOUT.hallHalf, LAYOUT.hallHalf) : clamp(c.lat, lo, hi);
    hallPos(c.h, c.t, c.lat, tmp);
    // smooth world position (also rounds off corners and junctions)
    const k = damp(9, dt);
    const nx = c.x + (tmp.x - c.x) * k, nz = c.z + (tmp.z - c.z) * k;
    if (Math.hypot(nx - c.x, nz - c.z) > 1e-3) c.heading = lerpAngle(c.heading, Math.atan2(nx - c.x, nz - c.z), damp(8, dt));
    c.x = nx; c.z = nz;
  }
}

// Only kids you could actually see get drawn: in front of the camera, closer than the fog, and not behind a wall
// (from the camera or from the kid's own position). They all keep moving either way. The visible ones are packed
// into the first slots of the two instanced meshes, and the meshes draw only that many.
const crowdMatrix = new THREE.Object3D(), frustum = new THREE.Frustum(), projScreen = new THREE.Matrix4(), cullSphere = new THREE.Sphere(new THREE.Vector3(), 0.9);
let crowdDrawn = 0, crowdCull = true;
const limbM = new THREE.Matrix4(), limbOut = new THREE.Matrix4(), limbE = new THREE.Euler();
let crowdLastDraw = 0;
function drawCrowd() {
  projScreen.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse); frustum.setFromProjectionMatrix(projScreen);
  const cx = camera.position.x, cz = camera.position.z, far = CFG.crowd.cullDistance;
  const now = performance.now(), fdt = Math.min(0.1, crowdLastDraw ? (now - crowdLastDraw) / 1000 : 0); crowdLastDraw = now;
  let n = 0, nl = 0, np = 0; const nh = [0, 0, 0, 0];
  for (const c of crowd) {
    const D = c.detail;
    let show = c.mode !== "gone" && c.mode !== "spawning";
    const dist = Math.hypot(c.x - cx, c.z - cz);
    if (show && crowdCull) {
      if (dist > far) show = false;
      else {
        cullSphere.center.set(c.x, 0.7, c.z);
        if (!frustum.intersectsSphere(cullSphere)) show = false;
        else if (!lineOfSight(cx, cz, c.x, c.z) && !lineOfSight(player.x, player.z, c.x, c.z) &&   // (also their shoulders, so a kid
          !lineOfSight(cx, cz, c.x + 0.35, c.z + 0.35) && !lineOfSight(cx, cz, c.x - 0.35, c.z - 0.35)) show = false;   // peeking round a corner shows)
      }
    }
    // walking: legs swing with the distance covered, settling when they stop
    const moved = Math.hypot(c.x - (c.lx ?? c.x), c.z - (c.lz ?? c.z)); c.lx = c.x; c.lz = c.z;
    const moving = moved > 0.003 && moved < 0.8 && c.slipT <= 0;
    c.amp += ((moving ? 1 : 0) - c.amp) * Math.min(1, fdt * 8);
    if (moving) c.walk += moved * 5.5;
    if (!show) { if (D) D.visible = false; continue; }
    const tilt = c.slipT <= 0 ? 0 : c.stunStyle === "flinch" ? 0.3 + Math.sin(game.time * 16) * 0.15 : c.stunStyle === "stuck" ? Math.sin(game.time * 10 + c.bob) * 0.12 : 1.35;
    const bob = Math.abs(Math.sin(c.walk)) * 0.035 * c.amp, sw = Math.sin(c.walk) * 0.6 * c.amp;
    if (c.detailed && !c.friend && dist < CFG.crowd.detailDist) {   // the full model, up close
      const K = D ?? (c.detail = buildKid(crowdLook())); if (!D) scene.add(K);
      K.visible = true; K.position.set(c.x, bob, c.z); K.rotation.set(tilt, c.heading, 0, "YXZ"); K.scale.setScalar(c.scale * CROWD_DETAIL_SCALE);
      const u = K.userData; u.legs[0].rotation.x = sw; u.legs[1].rotation.x = -sw; u.arms[0].rotation.x = -sw * 0.8; u.arms[1].rotation.x = sw * 0.8;
      continue;
    }
    if (D) D.visible = false;
    crowdMatrix.position.set(c.x, bob, c.z);
    crowdMatrix.rotation.set(tilt, c.heading, 0, "YXZ");
    crowdMatrix.scale.setScalar(c.scale);
    crowdMatrix.updateMatrix(); const M = crowdMatrix.matrix;
    crowdBodies.setMatrixAt(n, M); crowdBodies.setColorAt(n, c.shirt);
    crowdHips.setMatrixAt(n, M); crowdHips.setColorAt(n, c.pants);
    crowdHeads.setMatrixAt(n, M); crowdHeads.setColorAt(n, c.skin);
    const hm = crowdHair[c.hairStyle]; hm.setMatrixAt(nh[c.hairStyle], M); hm.setColorAt(nh[c.hairStyle]++, c.hair);
    if (c.pack) { crowdPacks.setMatrixAt(np, M); crowdPacks.setColorAt(np++, c.pack); }
    for (const sx of [-1, 1]) {
      limbM.makeRotationX(sx * sw).setPosition(sx * CK.legX, CK.hipY, 0); limbOut.multiplyMatrices(M, limbM);
      crowdLegs.setMatrixAt(nl, limbOut); crowdLegs.setColorAt(nl, c.pants);
      limbM.makeRotationFromEuler(limbE.set(-sx * sw * 0.8, 0, sx * 0.08)).setPosition(sx * CK.armX, CK.armY, 0); limbOut.multiplyMatrices(M, limbM);
      crowdSleeves.setMatrixAt(nl, limbOut); crowdSleeves.setColorAt(nl, c.shirt);
      crowdArms.setMatrixAt(nl, limbOut); crowdArms.setColorAt(nl, c.skin);
      nl++;
    }
    n++;
  }
  crowdDrawn = n;
  const counts = [[crowdBodies, n], [crowdHips, n], [crowdHeads, n], [crowdLegs, nl], [crowdSleeves, nl], [crowdArms, nl], [crowdPacks, np], ...crowdHair.map((m, i) => [m, nh[i]])];
  for (const [m, k] of counts) { m.count = k; m.instanceMatrix.needsUpdate = true; if (k) m.instanceColor.needsUpdate = true; }
}

function crowdCoverCount() {
  let n = 0; const R = CFG.crowd.coverRadius;
  for (const c of crowd) if (c.mode !== "gone" && c.mode !== "spawning" && Math.hypot(c.x - player.x, c.z - player.z) < R) n++;
  return n;
}

function moveToward(st, tx, tz, speed, dt) {
  const dx = tx - st.x, dz = tz - st.z, d = Math.hypot(dx, dz);
  if (d < 0.05) return d;
  const step = Math.min(d, speed * dt);
  st.x += (dx / d) * step; st.z += (dz / d) * step;
  collide(st, 0.35);
  st.facing = lerpAngle(st.facing, Math.atan2(dx, dz), damp(10, dt));
  return d;
}
// Head for a point anywhere in the school: straight there if it's in view, otherwise via the hall junctions.
function navToward(st, tx, tz, speed, dt) {
  const fa = floorOf(st.x), fb = floorOf(tx);
  if (fa !== fb) {   // wrong floor: to the stairs first, then up (or down) them
    const sp = nearestStairs(st.x, st.z, fa), f = spotFront(sp, {});
    if (Math.hypot(f.x - st.x, f.z - st.z) < 0.8) {
      const g = spotFront(sp.pair, {}); st.x = g.x; st.z = g.z;
      const pr = hallProject(g.x, g.z); st.h = pr.h; st.t = pr.t; st.to = HALLS[pr.h].b; st.offHall = true;
    } else navToward(st, f.x, f.z, speed, dt);
    return Infinity;
  }
  if (lineOfSight(st.x, st.z, tx, tz)) return moveToward(st, tx, tz, speed, dt);
  const me = hallProject(st.x, st.z), tg = hallProject(tx, tz);
  if (me.h === tg.h) return moveToward(st, tx, tz, speed, dt);
  const H = HALLS[me.h];
  let n = me.t + costToPoint(H.a, tg.h, tg.t) <= H.len - me.t + costToPoint(H.b, tg.h, tg.t) ? H.a : H.b;
  if (Math.hypot(NODES[n].x - st.x, NODES[n].z - st.z) < 0.9) {   // at the junction: on to the next one
    const T = HALLS[tg.h];
    if (n === T.a || n === T.b) return moveToward(st, tx, tz, speed, dt);
    n = NEXT[n][bestEnd(n, tg.h, tg.t)];
  }
  moveToward(st, NODES[n].x, NODES[n].z, speed, dt);
  return Infinity;
}
// after a chase, staff walk back to the nearest point of their hall and pick their patrol up again
function setReturnPoint(st) {
  if (st.route && floorOf(NODES[st.route[0]].x) !== floorOf(st.x)) {   // followed you to the other floor: back to their own rounds
    const R = st.route, i = Math.floor(Math.random() * R.length), j = mod(i + st.rstep, R.length), h = hallBetween(R[i], R[j]);
    st.h = h; st.t = HALLS[h].len / 2; st.to = R[j]; st.ri = j; return;
  }
  const pr = hallProject(st.x, st.z);
  st.h = pr.h; st.t = pr.t;
  st.to = Math.random() < 0.5 ? HALLS[pr.h].a : HALLS[pr.h].b;
  if (st.route) { const i = st.route.indexOf(st.to); if (i >= 0) st.ri = i; }
}

function canSeePlayer(st, rangeMult, needCone) {
  if (player.hidden || st.stunT > 0 || tut?.blind) return { seen: false, d: Infinity };
  const T = st.type, dx = player.x - st.x, dz = player.z - st.z, d = Math.hypot(dx, dz);
  if (player.invisT > 0) return { seen: false, d };   // just served a strike: a moment to get away
  if (st.ignoreT > 0) return { seen: false, d };      // the one who just caught you is letting it go
  if (st.postGrace > 0) return { seen: false, d };    // step 77: a guard who's only just been posted
  if (d > T.visionRange * staffMult("vision") * rangeMult) return { seen: false, d };
  if (needCone && Math.abs(angDiff(st.facing, Math.atan2(dx, dz))) > coneHalf(T)) return { seen: false, d };
  return { seen: lineOfSight(st.x, st.z, player.x, player.z) && !fogBlocks(st.x, st.z), d };
}
// suspicion builds faster up close, slower in a crowd and during passing periods
function noticeRate(st, d, cover) {
  const D = CFG.detection, T = st.type;
  if (game.phase === "passing" && game.stars < 1 && !game.survival) return 0;   // step 74: at 0 stars you're just another kid in the crowd
  const closeness = Math.max(0, 1 - d / (T.visionRange * staffMult("vision")));
  let rate = D.suspicionRate * T.notice * staffMult("notice") * (D.farRateFrac + (1 - D.farRateFrac) * closeness);
  rate /= 1 + cover * CFG.crowd.coverPerStudent;
  if (player.sprinting) rate *= CFG.sprint.noticeMult;   // a running kid stands out
  if (game.phase === "passing") rate /= D.passingBeatMult;
  if (player.hoodT > 0) rate *= CFG.hoodie.noticeMult;   // hood up: just another kid in a hoodie
  if (player.disguiseT > 0) rate *= ITEM_TYPES.disguise.noticeMult;   // step 80: who's that?
  if (player.board) rate *= ITEM_TYPES.skateboard.noticeMult;   // a kid on a skateboard stands out
  return rate;
}

function patrolChooser(st) {
  if (!st.route) return randomOnward;
  return (w, node) => {
    const R = st.route;
    if (node === R[st.ri]) st.ri = mod(st.ri + st.rstep, R.length);
    const target = R[st.ri];
    const next = NEXT[node][target];
    return target === node || next < 0 ? randomOnward(w, node) : next;   // (next < 0: their route's on the other floor)
  };
}

function updateStaff(dt, cover) {
  const D = CFG.detection;
  for (const st of staff) {
    const T = st.type;
    st.sweep += dt * T.sweepRate;
    if (st.ignoreT > 0) st.ignoreT -= dt;
    if (st.postGrace > 0 && !player.hidden) st.postGrace -= dt;
    let speed = 0;
    st.distractT = Math.max(0, st.distractT - dt);
    if (st.stunT > 0) {   // slipped on a banana peel (flat on the floor), or hit by something (staggering)
      st.stunT -= dt;
      st.mesh.rotation.z = st.stunT <= 0 ? 0 : st.stunStyle === "flinch" ? Math.sin(game.time * 16) * 0.28 : 1.3;
      st.mesh.position.set(st.x, 0, st.z);
      st.cone.visible = st.stunT <= 0;
      continue;
    }
    if (st.plungerT > 0) { blindStumble(st, dt); continue; }   // a plunger on their head
    if (st.fleeT > 0) { fleeStep(st, dt); continue; }   // step 69: running from the skeleton
    if (st.pauseT > 0) {   // "I saw you go in there." — a beat before chasing
      st.pauseT -= dt;
      st.facing = lerpAngle(st.facing, Math.atan2(player.x - st.x, player.z - st.z), damp(8, dt));
      st.mesh.position.set(st.x, 0, st.z); st.mesh.rotation.y = st.facing;
      updateCone(st);
      continue;
    }

    const stuck = st.stuckT > 0, snap = stuck ? [st.x, st.z, st.h, st.t, st.to, st.ri] : null;   // in slime: can look and yell, can't move
    if (stuck) st.stuckT -= dt;
    if (T.custodian) {
      speed = updateCustodian(st, dt, cover, stuck);
    } else if (st.state === "post") {
      // a teacher at their door: doesn't chase, but yells for backup, and grabs you if you walk right past
      const look = canSeePlayer(st, 1, true);
      st.alarmT = Math.max(0, st.alarmT - dt);
      if (look.seen) {
        st.suspicion += noticeRate(st, look.d, cover) * dt;
        if (look.d < T.catchRange && st.suspicion > 0.35 && player.graceT <= 0) { caught(st); return; }
      } else st.suspicion = Math.max(0, st.suspicion - D.decayRate * dt);
      if (st.suspicion >= 1 && st.alarmT <= 0) {
        st.alarmT = T.alarmCooldownSec; st.suspicion = 0.5;
        playBlip([620, 880, 620], 0.1, "square", 0.08);
        toast(st.key === "postedGuard" ? "Guard: \"HEY! Backup to my post!\"" : "Teacher: \"HEY! Where's your hall pass?!\"", 2.2);
        bark(st, "alarm", true);
        callBackup(st, false);
      }
      if (st.commute && !stuck) {   // step 82: still walking over to their post
        const d = navToward(st, st.commute.x, st.commute.z, 2.4, dt); speed = 2.4;
        if (d < 0.3) { st.commute = null; st.x = st.post ? postPoint(st.post).x : st.x; st.z = st.post ? postPoint(st.post).z : st.z; }
        if (st.commute) { if (st.suspicion > 0.05) st.facing = lerpAngle(st.facing, Math.atan2(player.x - st.x, player.z - st.z), damp(5, dt)); }
      }
      const base = st.post ? Math.atan2(-st.post.side * HALLS[st.post.h].nx, -st.post.side * HALLS[st.post.h].nz) : st.facing;
      const want = st.suspicion > 0.05 ? Math.atan2(player.x - st.x, player.z - st.z) : st.distractT > 0 ? Math.atan2(st.dX - st.x, st.dZ - st.z) : base + Math.sin(st.sweep) * (T.sweepDeg * Math.PI / 180);
      if (!st.commute) st.facing = lerpAngle(st.facing, want, damp(st.suspicion > 0.05 ? 5 : 2, dt));
    } else if (st.state === "patrol" || st.state === "return" || st.state === "tidy" || st.state === "check") {
      const look = canSeePlayer(st, 1, true);
      if (look.seen) {
        st.suspicion += noticeRate(st, look.d, cover) * dt;
        if (look.d < D.instantRange && game.phase === "skipping") st.suspicion = 1;
      } else st.suspicion = Math.max(0, st.suspicion - D.decayRate * dt);

      if (st.suspicion >= 1) { startChase(st); }
      else if (st.state === "tidy") {   // "Who left this here?"
        const o = st.tidyObj;
        if (!o || o.dead) { st.state = "return"; setReturnPoint(st); }
        else if (stuck) { /* wait until they're free */ }
        else if (st.tidyT < 0) st.tidyT += dt;   // just set off a trap: a beat before picking it up
        else {
          speed = T.patrolSpeed * staffMult("speed");
          if (navToward(st, o.x, o.z, speed, dt) < 0.6) {
            speed = 0; st.tidyT += dt;
            if (st.tidyT >= CFG.tidy.pickupSec) { removeObject(o); bark(st, "tidy", true); st.state = "return"; setReturnPoint(st); }
          }
        }
      } else if (st.state === "check") {
        speed = updateCheck(st, dt);
      } else if (st.state === "return") {
        speed = T.patrolSpeed * staffMult("speed");
        const tgt = hallPos(st.h, st.t, 0);
        if (navToward(st, tgt.x, tgt.z, speed, dt) < 0.3) st.state = "patrol";
      } else {
        // patrol (monitors: a fixed loop; guards: roaming); slow down and squint while suspicious
        speed = T.patrolSpeed * staffMult("speed") * (st.suspicion > 0.05 ? D.suspiciousSlow : 1) * (st.distractT > 0 ? 0.15 : 1);
        if (T.roamTurnSec) { st.roamT -= dt; if (st.roamT <= 0) { st.roamT = rand(...T.roamTurnSec); if (Math.random() < 0.6) st.to = otherEnd(st.h, st.to); } }
        walk(st, speed * dt, patrolChooser(st));
        hallPos(st.h, st.t, 0, st);
        st.tidyScanT = (st.tidyScanT ?? 0) - dt;   // glance around for things lying in the hall
        // (only the custodian tidies up now)
        if (st.state === "patrol" && st.suspicion < 0.05) maybeCheckRestroom(st);
        const base = hallHeading(st.h, st.to === HALLS[st.h].b ? 1 : -1);
        const want = st.suspicion > 0.05 ? Math.atan2(player.x - st.x, player.z - st.z) : st.distractT > 0 ? Math.atan2(st.dX - st.x, st.dZ - st.z) : base + Math.sin(st.sweep) * (T.sweepDeg * Math.PI / 180);
        st.facing = lerpAngle(st.facing, want, damp(st.suspicion > 0.05 ? 5 : 3, dt));
      }
    } else if (st.state === "chase") {
      const look = canSeePlayer(st, D.chaseSightRangeMult, false);
      speed = chaseSpeed(st, dt);
      if (look.seen) {
        st.lastX = player.x; st.lastZ = player.z; st.lastVX = player.vx; st.lastVZ = player.vz;
        moveToward(st, player.x, player.z, speed, dt);
        if (look.d < D.catchRadius && player.graceT <= 0) { caught(st); return; }
        if (T.callsBackup && !st.calledBackup) { st.calledBackup = true; callBackup(st, true); }
      } else {
        st.state = "search"; st.searchT = 0; bark(st, "search");
        const g = { x: st.lastX + st.lastVX * D.predictSec, z: st.lastZ + st.lastVZ * D.predictSec };
        collide(g, 0.4); st.tx = g.x; st.tz = g.z;
      }
    } else if (st.state === "bust" && st.camping) {
      // waiting outside your locker: they can't get you out, but they'll be right there when you come out
      speed = 0;
      const sp = st.bustSpot, f = spotFront(sp, {});
      st.facing = lerpAngle(st.facing, Math.atan2(f.x - st.x - sp.side * HALLS[sp.h].nx, f.z - st.z - sp.side * HALLS[sp.h].nz), damp(4, dt));
      if (player.hidden !== sp) {
        st.camping = false;
        if (!player.hidden && canSeePlayer(st, D.chaseSightRangeMult, false).seen) { startChase(st); bark(st, "bust", true); }
        else { st.state = "search"; st.searchT = 0; st.lastX = st.tx = f.x; st.lastZ = st.tz = f.z; }
      } else if (performance.now() > (st.barkUntil ?? 0) + 6000) { st.bubble.textContent = pick(CAMP_LINES); st.barkUntil = performance.now() + 2000; }
    } else if (st.state === "bust") {
      // they saw you duck into a hiding spot: go yank you out (or, for a locker, wait outside it)
      speed = chaseSpeed(st, dt);
      const sp = st.bustSpot, f = spotFront(sp, {});
      if (!player.hidden && canSeePlayer(st, D.chaseSightRangeMult, false).seen) startChase(st);
      else if (navToward(st, f.x, f.z, speed, dt) < 0.75) {
        if (player.hidden === sp && sp.kind === "locker") {
          st.camping = true; st.bubble.textContent = pick(CAMP_LINES); st.barkUntil = performance.now() + 2200;
          toast(`The ${T.name} is waiting outside your locker.`, 2.2);
        } else if (player.hidden === sp) {
          const who = `The ${T.name}`;
          exitSpot(true, sp.kind === "locker" ? `${who} yanks the locker open: "I saw you go in there."`
            : sp.kind === "restroom" ? `${who} bangs on the stall: "I saw you go in there."`
            : `${who} leans in the door: "That one's mine."`);
          startChase(st); st.pauseT = CFG.hiding.bustPauseSec; bark(st, "bust", true);
        } else { st.state = "search"; st.searchT = 0; st.lastX = st.tx = f.x; st.lastZ = st.tz = f.z; }
      }
    } else if (st.state === "search") {
      st.searchT += dt;
      speed = chaseSpeed(st, dt) * 0.8;
      const reached = navToward(st, st.searchT < 0.6 ? st.lastX : st.tx, st.searchT < 0.6 ? st.lastZ : st.tz, speed, dt) < 0.3;
      if (reached) { speed = 0; st.facing += Math.sin(game.time * 3) * dt * 2.5; }   // look around
      if (canSeePlayer(st, 1, true).seen) startChase(st);
      else if (st.searchT > D.searchSec) {
        st.state = "return"; st.suspicion = 0; st.calledBackup = false;
        setReturnPoint(st);
        playBlip([330, 260], 0.12, "triangle", 0.05);   // "hmph"
        bark(st, "giveUp");
      }
    }

    if (stuck) { [st.x, st.z, st.h, st.t, st.to, st.ri] = snap; speed = 0; }
    st.mesh.rotation.z = stuck ? Math.sin(game.time * 10) * 0.12 : 0;
    // footsteps
    if (speed > 0.2) {
      st.stepT += dt;
      const interval = st.state === "chase" ? CFG.footsteps.chaseInterval : CFG.footsteps.patrolInterval;
      if (st.stepT >= interval) { st.stepT = 0; playFootstep(st.x, st.z, st.state === "chase"); }
    }
    if (st.state !== "chase" && st.state !== "bust" && st.state !== "search") st.chaseT = Math.max(0, st.chaseT - dt);
    st.mesh.position.set(st.x, speed > 0.2 ? Math.abs(Math.sin(game.time * (st.state === "chase" ? 12 : 7))) * 0.06 : 0, st.z);
    st.mesh.rotation.y = st.facing;
    animateKid(st.mesh, speed, dt);   // step 63: legs and arms swing
    // the squint: suspicious staff narrow their eyes and lean in
    const squint = st.suspicion > 0.05 && !isAlarmed(st);
    st.mesh.userData.eyes.scale.y = squint ? 0.3 : 1; st.mesh.rotation.x = squint ? 0.12 : 0;
    if (squint && !st.wasSus) bark(st, "suspicious");
    st.wasSus = squint;
    updateCone(st);
  }
}
// staff who chase and catch (not teachers at their doors, not the custodian)
const chaser = (st) => !st.type.stationary && !st.type.custodian;
function bark(st, kind, force = false) {
  const lines = BARKS[st.key]?.[kind];
  if (!lines || (!force && game.time - st.barkAt < CFG.barkCooldownSec)) return;
  st.barkAt = game.time; st.barkUntil = performance.now() + CFG.barkSec * 1000;
  st.bubble.textContent = pick(lines);
}

// Guards sprint faster than you, then get winded. Everyone moves a bit faster on high alert and on later days.
function chaseSpeed(st, dt) {
  const T = st.type;
  let v = T.chaseSpeed;
  if (T.sprintSec) {
    if (st.windedT > 0) { st.windedT -= dt; v = T.windedSpeed; if (st.windedT <= 0) st.chaseT = 0; }
    else { st.chaseT += dt; if (st.chaseT > T.sprintSec) { st.windedT = T.windedSec; toast("The guard is winded! *huff* *huff*"); bark(st, "winded", true); } }
  }
  return v * staffMult("speed");
}

// A radio call (guard) or a yell (teacher): the nearest free staff head for your position.
function callBackup(caller, announce) {
  if (announce) playBlip([1400, 1100, 1400], 0.05, "square", 0.05);   // radio chirp
  const others = staff.filter((o) => o !== caller && chaser(o) && o.state !== "chase" && o.state !== "bust")
    .map((o) => ({ o, d: Math.hypot(o.x - player.x, o.z - player.z) }))
    .filter((e) => caller.type.backupAll || e.d < CFG.backup.range).sort((a, b) => a.d - b.d).slice(0, caller.type.backupAll ? 99 : CFG.backup.maxResponders);
  for (const { o, d } of others) {
    o.state = "search"; o.suspicion = 0.6;
    o.searchT = -Math.min(16, d / (o.type.chaseSpeed * 0.8));   // time to get there before they give up
    o.lastX = o.tx = player.x; o.lastZ = o.tz = player.z;
  }
  if (announce) pa(caller.type.backupAll ? "principalSpots" : "backup", null, null, { hall: HALLS[hallProject(player.x, player.z).h].name });
}

function startChase(st) {
  if (game.phase === "skipping") game.chasedThisSkip = true;
  if (st.state !== "chase") { playBlip([520, 780], 0.1, "square", 0.08); addHeat(CFG.heat.seenRunning); bark(st, "chase"); }   // "Hey!"
  st.state = "chase"; st.suspicion = 1;
  st.lastX = player.x; st.lastZ = player.z;
}

const CONE_COLORS = { patrol: new THREE.Color(0xfff2a8), suspicious: new THREE.Color(0xffa94d), chase: new THREE.Color(0xff4d4d) };
const isAlarmed = (st) => st.state === "chase" || st.state === "search" || st.state === "bust" ||
  (st.state === "post" && st.alarmT > st.type.alarmCooldownSec - 3);
function updateCone(st) {
  const T = st.type, RAYS = CFG.render.coneRays, half = coneHalf(T);
  const range = T.visionRange * staffMult("vision") * (st.state === "chase" ? CFG.detection.chaseSightRangeMult : 1);
  const pos = st.cone.geometry.attributes.position;
  pos.setXYZ(0, st.x, 0.03, st.z);
  for (let i = 0; i <= RAYS; i++) {
    const a = st.facing - half + (2 * half * i) / RAYS, dx = Math.sin(a), dz = Math.cos(a);
    const len = Math.min(range, raycast(st.x, st.z, dx, dz, range));
    pos.setXYZ(i + 1, st.x + dx * len, 0.03, st.z + dz * len);
  }
  pos.needsUpdate = true;
  const key = isAlarmed(st) ? "chase" : st.suspicion > 0.05 ? "suspicious" : "patrol";
  st.cone.material.color.copy(CONE_COLORS[key]);
  st.cone.material.opacity = key === "patrol" ? 0.26 : 0.36;
}

function updateCamera(dt) {
  const C = CFG.camera, fx = Math.sin(cam.yaw), fz = Math.cos(cam.yaw);
  const hit = raycast(player.x, player.z, -fx, -fz, C.distance + C.wallMargin);
  const dist = clamp(hit - C.wallMargin, C.minDistance, C.distance);
  camera.position.set(player.x - fx * dist, C.height, player.z - fz * dist);
  camera.lookAt(player.x + fx * C.lookAhead, C.lookHeight, player.z + fz * C.lookAhead);
  camera.updateMatrixWorld();
  camRight.set(-Math.cos(cam.yaw), 0, Math.sin(cam.yaw));   // screen-right in world space
}

// "?" / "!" above staff heads when on screen; arrows at the screen edge when not.
const proj = new THREE.Vector3();
// ---- step 71: kids talk. A few bubbles at a time, over kids near you on screen. ----
const kidBubbles = [];   // { el, c, until }
let idleBag = [];
function kidSay(c, lines, sec = CFG.chatter.sec) {
  if (!c || c.friend || !isActive(c)) return;   // (friends have their own bubble)
  const now = performance.now();
  let b = kidBubbles.find((x) => x.c === c && now < x.until) ?? kidBubbles.find((x) => now >= x.until);
  if (!b) { if (kidBubbles.length >= CFG.chatter.max + 3) return; b = { el: document.createElement("div") }; b.el.className = "bark kid"; markersEl.appendChild(b.el); kidBubbles.push(b); }
  b.c = c; b.until = now + sec * 1000; c.saidAt = game.time;
  if (lines === KID_LINES.idle) { if (!idleBag.length) idleBag = [...KID_LINES.idle].sort(() => Math.random() - 0.5); b.el.textContent = idleBag.pop(); }
  else b.el.textContent = Array.isArray(lines) ? pick(lines) : lines;
}
function onScreen(x, y, z) {
  proj.set(x, y, z).applyMatrix4(camera.matrixWorldInverse); if (proj.z > -0.2) return null;
  proj.set(x, y, z).project(camera); return Math.abs(proj.x) < 0.9 && Math.abs(proj.y) < 0.9 ? proj : null;
}
function updateChatter(dt) {
  const C = CFG.chatter, now = performance.now();
  game.chatT = (game.chatT ?? 1) - dt;
  if (game.chatT > 0) return;
  game.chatT = rand(C.everySec[0], C.everySec[1]);
  if (player.hidden || kidBubbles.filter((b) => now < b.until).length >= C.max) return;
  const pf = floorOf(player.x), d = (c) => Math.hypot(c.x - player.x, c.z - player.z);
  const cands = crowd.filter((c) => isActive(c) && !c.friend && c.slipT <= 0 && floorOf(c.x) === pf && d(c) < C.range && game.time - (c.saidAt ?? -99) > C.quietSec && onScreen(c.x, 1.8, c.z));
  const c = pick(cands); if (!c) return;
  kidSay(c, c.mode === "gather" ? KID_LINES.gather : game.phase === "skipping" && d(c) < C.nearPlayer + 2 ? KID_LINES.near : d(c) < C.nearPlayer && Math.random() < 0.3 ? KID_LINES.near : KID_LINES.idle);
}
function drawChatter() {
  const w = window.innerWidth, h = window.innerHeight, now = performance.now(), pf = floorOf(player.x);
  for (const b of kidBubbles) {
    const p = now < b.until && b.c && isActive(b.c) && floorOf(b.c.x) === pf && !player.hidden ? onScreen(b.c.x, 1.85 * (b.c.scale ?? 1), b.c.z) : null;
    b.el.style.display = p ? "block" : "none";
    if (p) { b.el.style.left = ((p.x + 1) / 2) * w + "px"; b.el.style.top = ((1 - p.y) / 2) * h - 6 + "px"; }
  }
}
function updateMarkers() {
  const w = window.innerWidth, h = window.innerHeight;
  const pf = floorOf(player.x);
  for (const st of staff) {
    const chasing = isAlarmed(st);
    if (floorOf(st.x) !== pf) { st.alert.style.display = st.edge.style.display = st.bubble.style.display = "none"; continue; }   // other floor
    const color = chasing ? "#ff4d4d" : st.suspicion > 0.05 ? "#ffa94d" : "#ffe066";
    proj.set(st.x, 2.0 * st.type.scale, st.z).applyMatrix4(camera.matrixWorldInverse);
    const behind = proj.z > -0.2;
    proj.set(st.x, 2.0 * st.type.scale, st.z).project(camera);
    const onScreen = !behind && Math.abs(proj.x) < 0.96 && Math.abs(proj.y) < 0.96;
    const dist = Math.hypot(st.x - player.x, st.z - player.z);
    const barking = performance.now() < st.barkUntil;
    st.bubble.style.display = onScreen && barking ? "block" : "none";
    if (onScreen && barking) { st.bubble.style.left = ((proj.x + 1) / 2) * w + "px"; st.bubble.style.top = ((1 - proj.y) / 2) * h - 30 + "px"; }
    if (onScreen) {
      st.edge.style.display = "none";
      const txt = chasing ? "!" : st.suspicion > 0.05 ? "?" : "";
      st.alert.style.display = txt ? "block" : "none";
      if (txt) {
        st.alert.textContent = txt; st.alert.style.color = color;
        st.alert.style.left = ((proj.x + 1) / 2) * w + "px"; st.alert.style.top = ((1 - proj.y) / 2) * h + "px";
        st.alert.style.opacity = chasing ? 1 : 0.4 + 0.6 * st.suspicion;
      }
    } else if (st.type.stationary && dist > 18 && !chasing) {   // far-off teachers don't need arrows
      st.alert.style.display = "none"; st.edge.style.display = "none";
    } else {
      st.alert.style.display = "none";
      const v = proj.set(st.x - camera.position.x, 0, st.z - camera.position.z);
      const fx = Math.sin(cam.yaw), fz = Math.cos(cam.yaw);
      const fwd = v.x * fx + v.z * fz, right = v.x * -Math.cos(cam.yaw) + v.z * Math.sin(cam.yaw);
      const a = Math.atan2(right, fwd);                     // 0 = straight ahead (top of screen)
      const sx = Math.sin(a), sy = -Math.cos(a), rx = w / 2 - 34, ry = h / 2 - 34;
      const k = Math.min(rx / Math.max(Math.abs(sx), 1e-4), ry / Math.max(Math.abs(sy), 1e-4));
      st.edge.style.display = "block";
      st.edge.style.left = w / 2 + sx * k - 13 + "px"; st.edge.style.top = h / 2 + sy * k - 12 + "px";
      st.edge.style.transform = `rotate(${a}rad)`;
      st.edge.style.borderBottomColor = st.type.stationary && !chasing ? "#d9a6e6" : color;
      st.edge.style.opacity = chasing ? 1 : clamp(1.2 - dist / 25, 0.35, 1);
    }
  }
}

let lastStam = -1;
function drawStamina() {
  const v = Math.round(player.stamina * 50) / 50, sec = Math.ceil(player.boostT), key = `${v}:${player.staminaMax}:${sec}:${player.winded}:${!!player.hidden}`;
  if (key === lastStam) return;
  lastStam = key;
  const el = $("staminaMeter");
  el.style.visibility = player.hidden ? "hidden" : "";   // out of the way of the hiding panel
  el.querySelector("i").style.width = `calc(clamp(100px, 26vw, 190px) * ${player.staminaMax})`;   // step 51: scales with the screen
  $("staminaFill").style.width = (v / player.staminaMax) * 100 + "%";
  el.classList.toggle("out", player.winded); el.classList.toggle("full", v >= player.staminaMax && !player.boostT);
  el.classList.toggle("boost", player.boostT > 0);
  $("boostT").textContent = player.boostT > 0 ? `⚡${sec}s` : "";
}
let lastHud = "";
function updateHud() {
  const left = Math.max(0, Math.ceil(phaseLen() - game.phaseT));
  const label = game.dismissal ? `DAY ${game.day} · SCHOOL'S OUT · GET TO THE EXIT · ${floorOf(player.x) ? "2F" : "1F"}`
    : `DAY ${game.day} · PERIOD ${game.period} · ${game.phase === "passing" ? "PASSING" : "SKIPPING"} · ${floorOf(player.x) ? "2F" : "1F"}`;
  const label2 = game.survival ? label.replace(/ · (PASSING|SKIPPING)$/, " · REBEL RUN") : label;
  const multTxt = [streakMult() > 1 ? `STREAK ×${streakMult()}` : "", game.nearMissT > 0 ? "NEAR MISS ×2" : "", game.survival ? `REBEL RUN ×${CFG.survival.scoreMult}` : ""].filter(Boolean).join(" · ");
  const key = multTxt + game.passShield + game.dismissal + label2 + left + Math.floor(game.score) + "|" + game.lockerUses + "|" + game.strikes + game.highAlert + "|" + Math.round(game.heat) + game.stars + game.survival;
  if (key === lastHud) return;
  lastHud = key;
  ui.label.textContent = label2;
  drawStars();
  ui.timer.textContent = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}`;
  ui.phase.className = game.phase + (game.survival ? " survival" : "") + (game.dismissal ? " dismissal" : "");
  if (Math.floor(game.score) > (+ui.score.textContent || 0)) { ui.score.classList.remove("bump"); void ui.score.offsetWidth; ui.score.classList.add("bump"); }
  ui.score.textContent = Math.floor(game.score);
  ui.uses.textContent = `LOCKERS ×${game.lockerUses}`;
  ui.uses.classList.toggle("out", game.lockerUses === 0);
  $("mult").textContent = multTxt;
  $("passIcon").hidden = !game.passShield;
  $("strikes").innerHTML = strikeDotsHtml() + (game.highAlert ? `<b>HIGH ALERT</b>` : "");
}

function update(dt) {
  game.time += dt; game.phaseT += dt;
  if (game.phase === "passing" && game.phaseT >= phaseLen("passing")) { if (game.dismissal) { missedExit(); return; } startSkipping(); }
  else if (game.phase === "skipping") {
    const pts = (CFG.pointsPerPeriod / phaseLen("skipping")) * dt * scoreMult() * streakMult();
    game.score += pts; game.periodScore += pts;
    if (game.phaseT >= phaseLen("skipping")) { periodSurvived(); if (game.state !== "playing") return; }
  }
  updatePlayer(dt);
  tallyFrame(dt);
  updateCrowd(dt);
  updateStaff(dt, crowdCoverCount());
  if (game.state === "playing") updateDismissal();
  if (game.state === "playing") { updateKickMe(dt); updateObjects(dt); updateTrails(dt); kidsGrab(dt); updateHeat(dt); updateRisk(dt); updateFriends(dt); updateAirplanes(dt); updatePeelDrops(dt); updateAlarm(dt); }
}

// =====================================================================================
// Hiding: entering, staying, getting booted
// =====================================================================================
const roomLocked = (sp) => sp.kind === "classroom" && game.period <= sp.lockedUntil;
const hasKey = () => game.hotbar.some((it) => it && it.key === "masterKey");
// the staff key opens doors that are locked or already used (not a teacher standing in the doorway)
function keyOpens(sp) {
  if (game.alarmT > 0 || sp.closed) return false;   // not during a fire alarm, and not a flooded bathroom
  if (sp.kind === "classroom") return (roomLocked(sp) || sp.used) && !staff.some((s) => s.post === sp);
  if (sp.kind === "closet") return sp.locked;
  return sp.kind === "restroom" && sp.used;
}
// ---- the stairs: out at the same stairwell on the other floor. Staff chasing you who saw you go follow you up (or down). ----
let stairsCD = 0;
function takeStairs(sp) {
  if (game.state !== "playing" || stairsCD > game.time) return;
  if (player.board) hopOff(true);
  if (player.ride) endRide(false);
  cancelAim();
  const to = sp.pair, from = spotFront(sp, {}), f = spotFront(to, {});
  const followers = staff.filter((st) => chaser(st) && (st.state === "chase" || st.state === "search" || st.state === "bust") && st.stunT <= 0 && !(st.plungerT > 0) &&
    Math.hypot(st.x - from.x, st.z - from.z) < st.type.visionRange * CFG.detection.chaseSightRangeMult && lineOfSight(st.x, st.z, from.x, from.z));
  player.x = f.x; player.z = f.z; player.vx = player.vz = 0;
  const H = HALLS[to.h];
  player.heading = Math.atan2(-to.side * H.nx, -to.side * H.nz); cam.yaw = player.heading; manualCamT = 0;
  stairsCD = game.time + 1.2;
  for (const st of followers) { st.state = "search"; st.searchT = -6; st.lastX = st.tx = f.x; st.lastZ = st.tz = f.z; st.camping = false; }
  banner(`${FLOOR_NAMES[spotFloor(to)].toUpperCase()}<small>${followers.length ? `${followers.length === 1 ? "Someone's" : "They're"} right behind you!` : "Nobody saw you take the stairs."}</small>`, 1.8);
  playBlip([300, 360, 420, 480], 0.05, "triangle", 0.05);
  dareEvent("stairs", { floor: spotFloor(to) });
}
// where a staff member on the wrong floor heads: the nearest stairwell on their floor
function nearestStairs(x, z, f) {
  let best = null, bd = Infinity;
  for (const sp of STAIRS) { if (sp.floor !== f) continue; const p = spotFront(sp, {}), d = Math.hypot(p.x - x, p.z - z); if (d < bd) { bd = d; best = sp; } }
  return best;
}
function spotBlocked(sp) {   // why this spot can't be used right now ("" if it can)
  if (sp.kind === "stairs") return "";
  if (sp.kind === "locker") return sp.busted ? "This locker's busted (you burst out of it)" : game.lockerUses > 0 ? "" : "No locker uses left this period";
  if (sp.kind === "classroom" && game.alarmT > 0) return "Fire alarm! Every classroom is locked";
  if (sp.closed) return "Out of order (somebody flooded it)";
  if (roomLocked(sp)) return `Room ${sp.room} is locked (${sp.lockWhy === "spotted" ? "the teacher spotted you" : "you raided it"})`;
  if (sp.jammed) return `Room ${sp.room} is jammed shut with a mop`;
  if (sp.kind === "closet" && sp.locked) return "The custodian locked his closet. You'd need a staff key.";
  if (sp.used && sp.kind === "closet") return "You already hid in the closet this period";
  if (sp.used) return sp.kind === "restroom" ? "You already hid in this restroom this period" : `Room ${sp.room} already kicked you out this period`;
  if (sp.kind === "classroom" && staff.some((s) => s.post === sp)) return `Room ${sp.room}'s teacher is standing right there`;
  return "";
}
function spotFront(sp, out = {}) { return hallPos(sp.h, sp.t, sp.frontLat, out); }
function spotDist(sp) { spotFront(sp, tmp); return Math.hypot(tmp.x - player.x, tmp.z - player.z); }
function nearestSpot() {
  let best = null, bd = CFG.interact.range;
  for (const sp of SPOTS) { const d = spotDist(sp); if (d < bd) { bd = d; best = sp; } }
  return best;
}

function enterSpot(sp) {
  if (sp.kind === "stairs") { tally("stairs"); takeStairs(sp); return true; }
  const why = spotBlocked(sp);
  if (why && keyOpens(sp) && hasKey()) {   // the master key
    const i = game.hotbar.findIndex((it) => it && it.key === "masterKey");
    consumeSlot(i); toast("🔑 The staff key works.");
    playBlip([1200, 900], 0.05, "square", 0.05);
  } else if (why) { toast(why); playBlip([180], 0.08, "square", 0.04); return false; }
  if (sp.kind === "locker") game.lockerUses--; else if (sp.kind !== "classroom") sp.used = true;   // step 56: classrooms only lock once they kick you out
  dareEvent("hide", { sp });
  if (player.board) hopOff(true);
  const f = spotFront(sp, {});
  player.hidden = sp; player.hideT = 0; player.hideArmed = false; player.pushT = 0; player.pushSpot = null;
  player.x = f.x; player.z = f.z; player.vx = player.vz = 0;
  player.mesh.visible = false;
  stick.x = stick.y = 0;
  // Did anyone see you go in?
  for (const st of staff) {
    if (!chaser(st)) continue;
    const d = Math.hypot(st.x - f.x, st.z - f.z);
    if (!lineOfSight(st.x, st.z, f.x, f.z) || fogBlocks(st.x, st.z)) continue;
    if ((st.state === "chase" || st.state === "search") && d < st.type.visionRange * CFG.detection.chaseSightRangeMult) {
      st.state = "bust"; st.bustSpot = sp; st.camping = false;
    } else if ((st.state === "patrol" || st.state === "return" || st.state === "tidy") && st.suspicion > 0.5 && d < st.type.visionRange) {
      st.state = "search"; st.searchT = 0; st.lastX = st.tx = f.x; st.lastZ = st.tz = f.z;   // "...was that a kid?"
    }
  }
  playBlip([260, 200], 0.07, "triangle", 0.07);
  if (sp.kind === "classroom") {   // step 44: did the teacher see you slip in?
    sp.grabs = 0;
    const ch = roomHideChance(sp, false);
    if (Math.random() >= ch) { roomSpotted(sp); return true; }
    toast(`🤫 Nobody noticed you slip in. (${Math.round(ch * 100)}% chance)`, 1.8);
    dareEvent("enterRoom", { sp });
  }
  tally("hide:" + sp.kind);
  if (sp.kind === "restroom") sp.checks = 0;   // a new stay
  if (sp.kind === "restroom") game.dareOffer = game.dares.length < CFG.dares.max ? makeDareOffer() : null;   // the kid by the sinks
  ui.hide.hidden = false;
  updateHidePanel();
  return true;
}

function exitSpot(booted, msg = "", title = "BOOTED!") {
  const sp = player.hidden;
  if (!sp) return;
  if (tut?.stayHidden && !booted) { toast("Wait for the hall monitor to walk past.", 1.6); return; }   // step 78
  player.hidden = null; player.mesh.visible = true; player.pushT = 0;
  if (sp.kind === "classroom") { sp.stayT = (sp.stayT || 0) + player.hideT; if (booted) sp.used = true; }   // sneaking back in keeps the teacher's clock running
  const f = hallPos(sp.h, sp.t, sp.frontLat - sp.side * 0.1);
  player.x = f.x; player.z = f.z;
  const H = HALLS[sp.h];
  player.heading = Math.atan2(-sp.side * H.nx, -sp.side * H.nz);   // facing out into the hall
  ui.hide.hidden = true;
  if (booted) {
    player.graceT = CFG.hiding.bootGraceSec;
    banner(`${title}<small>${msg}</small>`, 2.6);
    playBlip([440, 330], 0.1, "sawtooth", 0.06);
  } else {
    if (msg) toast(msg);
    playBlip([200, 260], 0.07, "triangle", 0.06);
  }
}

function checkWalkIn(mx, mz, dt) {
  const pr = hallProject(player.x, player.z), H = HALLS[pr.h];
  let target = null;
  for (const sp of SPOTS) {
    if (sp.h !== pr.h || Math.abs(pr.t - sp.t) > sp.T.halfW) continue;
    if (Math.abs(sp.wallLat - pr.lat) > CFG.interact.walkInDist) continue;
    if ((mx * H.nx + mz * H.nz) * sp.side > 0.55) { target = sp; break; }   // pushing into the wall
  }
  if (target && target === player.pushSpot) {
    player.pushT += dt;
    if (player.pushT >= CFG.interact.walkInPushSec) { player.pushT = 0; enterSpot(target); }
  } else { player.pushSpot = target; player.pushT = 0; }
}

function hideLimit(sp) { return sp.kind === "classroom" ? Math.max(CFG.rooms.minStaySec, TEACHER_TYPES[sp.teacher].bootSec - (sp.stayT || 0)) : sp.T.maxStaySec; }
function updateHiding(dt) {
  const sp = player.hidden;
  player.hideT += dt;
  // leave by pushing the stick (after letting go of it once, so the push that got you in doesn't pop you out)
  if (input.m === 0) player.hideArmed = true;
  else if (player.hideArmed && input.m > 0.5) { exitSpot(false); return; }
  if (player.hideT >= hideLimit(sp)) {
    exitSpot(true, sp.kind === "classroom" ? TEACHER_TYPES[sp.teacher].bootLine : sp.T.timeoutLine);
    return;
  }
  updateHidePanel();
}

function updateHidePanel() {
  const sp = player.hidden; if (!sp) return;
  const limit = hideLimit(sp), left = Math.max(0, limit - player.hideT);
  const title = sp.kind === "classroom" ? `Room ${sp.room}${sp.R.label ? " · " + sp.R.label : ""} · ${TEACHER_TYPES[sp.teacher].label}` : `In the ${sp.T.label.toLowerCase()}`;
  renderLoot(sp);
  const line = sp.kind === "classroom" ? TEACHER_TYPES[sp.teacher].stayLine : sp.T.stayLine;
  let warn = "";
  if (sp.kind === "restroom") {
    const C = CFG.hiding.restroomCheck, coming = staff.some((st) => st.state === "check" && st.checkSpot === sp);
    const left = C.foundAfter - (sp.checks || 0);
    warn = (coming ? "Footsteps outside... someone's coming to check! " : "") + (!sp.checks ? "" : left <= 1 ? "One more check and they find you." : `${left} more checks and they find you.`);
  }
  if (sp.kind === "locker") {
    const out = staff.filter((st) => st.state === "bust" && st.bustSpot === sp);
    const waiting = out.filter((st) => st.camping);
    if (waiting.length) warn = `👀 The ${waiting[0].type.name}${waiting.length > 1 ? ` and ${waiting.length - 1} more are` : " is"} waiting right outside. Burst out before your time's up!`;
    else if (out.length) warn = "Someone saw you go in. They're coming to wait outside.";
  }
  ui.hpTitle.textContent = title;
  ui.hpLine.textContent = line;
  ui.hpWarn.textContent = warn;
  ui.hpFill.style.transform = `scaleX(${left / limit})`;
  ui.hpFill.classList.toggle("low", left < 3);
}

// Rooms as shops: tap an item on the desk to grab it. It costs hiding time, and the teacher might call security.
const lootEl = $("hpLoot");
function renderLoot(sp) {
  const key = sp.kind === "classroom" || sp.kind === "closet" ? `${sp.room}:${sp.lootVer}:${sp.loot?.filter(Boolean).length}:${[...sp.taken]}:${game.passShield}:${game.breakerUsed}:${sp.grabs}:${player.hoodT > 0}` : `${sp.kind}${sp.h}:${sp.t}:${!!sp.rummaged}:${sp.tpLeft}:${game.dareOffer?.id}:${game.dares.length}`;
  if (lootEl.dataset.key === key) return;
  lootEl.dataset.key = key; lootEl.innerHTML = "";
  if (sp.kind === "restroom") {   // the bathroom flood: big points and heat, and it's closed for the rest of the day
    const b = document.createElement("button"); b.type = "button"; b.className = "prize";
    b.innerHTML = `🚽 Flood the toilets<small>+${CFG.flood.points} · lots of heat</small>`; b.dataset.n = 3;
    b.addEventListener("click", floodRestroom);
    const kid = document.createElement("div"); kid.className = "dareKid";
    if (game.dareOffer) {
      kid.innerHTML = `<span>Kid by the sinks: "${game.dareOffer.line ??= pick(DARE_KID_LINES)} ${DARES[game.dareOffer.id].text(game.dareOffer).replace(/^./, (c) => c.toLowerCase())}."</span>`;
      const d = document.createElement("button"); d.type = "button"; d.className = "prize";
      d.innerHTML = `📜 Take the dare<small>+${DARES[game.dareOffer.id].points}</small>`; d.dataset.n = 2;
      d.addEventListener("click", takeDare);
      lootEl.dareBtn = d;
    } else kid.innerHTML = `<span>Kid by the sinks: "${game.dares.length >= CFG.dares.max ? "Finish the dares you've got first." : "Nothing today. Come back later."}"</span>`;
    lootEl.prepend(kid);
    if (sp.tpLeft > 0) {
      const t = document.createElement("button"); t.type = "button";
      t.innerHTML = `🧻 Grab a roll${sp.tpLeft > 1 ? ` (${sp.tpLeft} left)` : ""}<small>-1s</small>`; t.dataset.n = 1;
      t.addEventListener("click", grabRoll);
      lootEl.appendChild(t);
    }
    if (lootEl.dareBtn) { lootEl.appendChild(lootEl.dareBtn); lootEl.dareBtn = null; }   // step 82: 1 TP, 2 dare, 3 flood, always in that order
    lootEl.appendChild(b);
    return;
  }
  if (sp.kind === "closet") {   // the custodian's stuff, plus the breaker box
    for (const [j, key] of CFG.closet.items.entries()) {
      if (sp.taken.has(key)) continue;
      const T = ITEM_TYPES[key], b = document.createElement("button"); b.type = "button"; b.dataset.n = j + 1;
      b.innerHTML = `${T.icon} ${T.label}<small>-${CFG.closet.grabSec}s</small>`;
      b.addEventListener("click", () => grabCloset(key));
      lootEl.appendChild(b);
    }
    if (!sp.taken.size) {} else if (sp.taken.size >= CFG.closet.items.length) lootEl.insertAdjacentHTML("afterbegin", `<span class="none">Shelves are bare until next period.</span>`);
    if (!game.breakerUsed) {
      const x = document.createElement("button"); x.type = "button"; x.className = "prize";
      x.innerHTML = `⚡ Flip the breaker<small>lights out ${CFG.breaker.sec}s · once a day</small>`; x.dataset.n = CFG.closet.items.length + 1;
      x.addEventListener("click", flipBreaker);
      lootEl.appendChild(x);
    }
    return;
  }
  if (sp.kind === "locker") {   // a blind grab (could be junk), or burst out
    if (sp.rummaged) lootEl.innerHTML = `<span class="none">You already went through this one.</span>`;
    else {
      const b = document.createElement("button"); b.type = "button";
      b.innerHTML = `🎒 Rummage around<small>-${CFG.lockers.rummageSec}s · might be junk</small>`; b.dataset.n = 1;
      b.addEventListener("click", rummageLocker);
      lootEl.appendChild(b);
    }
    const x = document.createElement("button"); x.type = "button"; x.className = "prize";
    x.innerHTML = `💥 Burst out<small>stuns staff nearby · busts this locker</small>`; x.dataset.n = 2;
    x.addEventListener("click", burstOut);
    lootEl.appendChild(x);
    return;
  }
  if (sp.kind !== "classroom") return;
  const grab = TEACHER_TYPES[sp.teacher].grabSec ?? CFG.rooms.grabSec, risk = `${Math.round((1 - roomHideChance(sp)) * 100)}% risk`;
  const note = game.dares.find((m) => m.id === "loveNote" && m.p.from === sp.room && !m.p.has);
  if (note) {   // the love note for the dare (no grab time, and it doesn't count as raiding the room)
    const b = document.createElement("button"); b.type = "button"; b.className = "prize";
    b.innerHTML = `💌 Love note<small>for the dare</small>`; b.dataset.n = sp.loot.length + Object.keys(sp.R.specials ?? {}).length + 1;
    b.addEventListener("click", () => { if (addItem("loveNote")) { note.p.has = true; renderDares(); lootEl.dataset.key = ""; updateHidePanel(); } });
    lootEl.appendChild(b);
  }
  sp.loot.forEach((k, i) => {
    if (!k) return;
    const b = document.createElement("button"); b.type = "button"; b.dataset.n = i + 1;
    b.innerHTML = `${iconHTML(k)} ${ITEM_TYPES[k].label}<small>-${grab}s · ${risk}</small>`;
    b.addEventListener("click", () => grabLoot(i));
    lootEl.appendChild(b);
  });
  Object.entries(sp.R.specials ?? {}).forEach(([id, X], j) => {   // the office specials
    if (sp.taken.has(id)) return;
    const b = document.createElement("button"); b.type = "button"; b.className = "prize"; b.dataset.n = sp.loot.length + j + 1;
    const note = id === "prize" ? `+${X.points} · ` : id === "fakePass" && game.passShield ? "you have one · " : "";
    b.innerHTML = `${X.icon} ${X.label}<small>${note}-${grab}s · ${risk}</small>`;
    b.addEventListener("click", () => grabLoot(id));
    lootEl.appendChild(b);
  });
  if (!lootEl.children.length) lootEl.innerHTML = `<span class="none">Nothing left on the desks.</span>`;
}
// Take an item (desk, special, locker): a hall pass becomes your fake pass, a second staff key tops up the one you have.
function takeItem(key) {
  if (ITEM_TYPES[key].kind === "pass") {
    if (game.passShield) { toast("You already have a fake pass."); return false; }
    game.passShield = true; popup("🎫 Hall pass! Your next catch doesn't count.", "item"); playBlip([523, 659, 784], 0.08, "triangle", 0.06);
    return true;
  }
  if (key === "masterKey") {
    const k = game.hotbar.find((it) => it && it.key === "masterKey");
    if (k) { k.uses = ITEM_TYPES.masterKey.uses; renderHotbar(); popup("🔑 Staff key (topped up)", "item"); return true; }
  }
  return addItem(key);
}
function grabLoot(i) {
  const sp = player.hidden;
  if (!sp || sp.kind !== "classroom" || game.state !== "playing") return;
  const TT = TEACHER_TYPES[sp.teacher];
  if (typeof i === "string" ? sp.taken.has(i) : !sp.loot[i]) return;
  // step 44: every grab is another roll; get spotted and you leave empty-handed
  if (Math.random() >= roomHideChance(sp)) { roomSpotted(sp); return; }
  sp.grabs = (sp.grabs || 0) + 1; tally("grabs");
  if (typeof i === "string") {   // a special
    if (i === "prize") havoc("rarePrize", sp.R.specials.prize.points, "Confiscated stash!", { x: player.x, z: player.z });
    else if (!takeItem(i === "fakePass" ? "hallPass" : "masterKey")) return;
    sp.taken.add(i);
  } else {
    if (!takeItem(sp.loot[i])) return;   // inventory full (or already have a pass): nothing happens
    sp.loot[i] = null;   // step 82: a gap, so the other things keep their numbers
  }
  sp.raided = true;   // locked for a while from the next bell
  dareEvent("raid", { room: sp.room, type: sp.roomType });
  if (sp.roomType === "office") postGuard(sp, "Something is missing from the main office. Security will be posted at the door from now on.");
  player.hideT += TT.grabSec ?? CFG.rooms.grabSec;
  updateHidePanel();
}
function grabRoll() {
  const sp = player.hidden;
  if (!sp || sp.kind !== "restroom" || !(sp.tpLeft > 0) || game.state !== "playing") return;
  if (!addItem("toiletPaper")) return;
  sp.tpLeft--; player.hideT += 1;
  updateHidePanel();
}
// Slam the locker door open: everyone close by is stunned, you get a head start, and the locker's busted for the day.
function burstOut() {
  const sp = player.hidden, B = CFG.lockers.burst;
  if (!sp || sp.kind !== "locker" || game.state !== "playing" || player.hideT >= hideLimit(sp)) return;
  if (tut?.stayHidden) { toast("Wait for the hall monitor to walk past.", 1.6); return; }   // step 78
  sp.busted = true;
  sp.door.material.color.setHex(0x4f5d55); sp.door.rotation.y = sp.doorRot + 0.35;   // hanging open, dented
  exitSpot(false);
  player.graceT = Math.max(player.graceT, B.graceSec);
  const f = { x: player.x, z: player.z };
  let n = 0;
  for (const st of staff) {
    if (Math.hypot(st.x - f.x, st.z - f.z) > B.radius * (1 + CFG.stats.strength.burstRadius * statMod("strength"))) continue;
    stunStaff(st, B.stunSec, "fall"); st.suspicion = 0; n++;
    st.bubble.textContent = pick(["AAH!", "WHAT THE—", "*falls over*"]); st.barkUntil = performance.now() + 1500; st.barkAt = game.time;
  }
  playBlip([140, 90, 600, 300], 0.08, "sawtooth", 0.1);   // BANG
  banner(`BURST OUT!<small>${n ? `${n} staff member${n === 1 ? "" : "s"} knocked flat. Go!` : "Nobody there, but it sure was loud."}</small>`, 1.8);
  havoc("burstOut", B.points + n * 50, n ? `Burst out! ${n} down` : "Burst out!", { x: f.x, z: f.z, loud: true });
  dareEvent("burst", { n });
  makeNoise(f.x, f.z, B.noiseRadius, true);
}
function rummageLocker() {
  const sp = player.hidden;
  if (!sp || sp.kind !== "locker" || sp.rummaged || game.state !== "playing") return;
  const key = pickWeighted(pickWeighted(Object.values(CFG.lockers.kinds).map(([share, items]) => [items, share])));   // the kind, then the item
  if (!takeItem(key)) return;   // inventory full: nothing happens
  sp.rummaged = true;
  player.hideT += CFG.lockers.rummageSec;
  const J = ITEM_TYPES[key];
  if (J.junk) toast(`${J.icon} ${J.label}. Gross. Throw it at someone.`);
  else if (J.kind === "junk") toast(`${J.icon} Junk. Great. (Select it to toss it.)`);
  updateHidePanel();
}
// The teacher spots you rummaging and calls security: the nearest guard (or anyone free) heads for the door.
function roomBackfire(sp) {
  toast(`${TT_NAME(sp)} picks up the phone: "Security to room ${sp.room}."`, 2.6);
  playBlip([880, 0, 880], 0.12, "sine", 0.05);
  const f = spotFront(sp, {});
  const free = staff.filter((s) => chaser(s) && s.state !== "chase" && s.state !== "bust")
    .sort((a, b) => (b.key === "securityGuard") - (a.key === "securityGuard") || Math.hypot(a.x - f.x, a.z - f.z) - Math.hypot(b.x - f.x, b.z - f.z));
  const st = free[0];
  if (sp.R.alarmHeat) {   // the main office: every staff member on the floor comes running, and it's a lot of heat
    toast(`The secretary hits the button: "ALL STAFF TO THE MAIN OFFICE."`, 2.8);
    pa(null, "All staff, report to the main office. ALL staff.", 4);
    for (const o of free) { const d = Math.hypot(o.x - f.x, o.z - f.z); o.state = "search"; o.suspicion = 0.6; o.searchT = -Math.min(18, d / (o.type.chaseSpeed * 0.8)); o.lastX = o.tx = f.x; o.lastZ = o.tz = f.z; }
    addHeat(sp.R.alarmHeat);
    return;
  }
  if (st) { const d = Math.hypot(st.x - f.x, st.z - f.z); st.state = "search"; st.searchT = -Math.min(16, d / (st.type.chaseSpeed * 0.8)); st.lastX = st.tx = f.x; st.lastZ = st.tz = f.z; }
  onRoomBackfire(sp);
}
// ---- step 44: the hide check for classrooms ----
// grab: the roll for taking something (once you're in), rather than for walking in
function roomHideChance(sp, grab = player.hidden === sp) {
  const C = CFG.rooms.hideCheck;
  const enter = clamp(TEACHER_TYPES[sp.teacher].hideChance + (player.hoodT > 0 ? C.hoodBonus : 0) + CFG.stats.stealth.hide * statMod("stealth"), C.min, C.max);
  if (!grab) return enter;
  return clamp(1 - (1 - enter) * C.grabRisk - (sp.grabs || 0) * C.grabPenalty, C.min, C.max);
}
function roomSpotted(sp) {
  const C = CFG.rooms.hideCheck;
  const line = pick(sp.teacher === "sub" ? C.subLines : sp.teacher === "office" ? C.officeLines : C.lines);
  sp.lockedUntil = Math.max(sp.lockedUntil, game.period + C.lockPeriods - 1);
  sp.lockWhy = "spotted"; sp.raided = false; tally("spotted");
  exitSpot(true, `${TT_NAME(sp)}: ${line} Room ${sp.room} is locked for a while.`, "SPOTTED!");
  roomBackfire(sp);
}
const TT_NAME = (sp) => (sp.teacher === "office" ? "The secretary" : sp.teacher === "sub" ? "The sub" : "The teacher");
function onRoomBackfire(sp) { addHeat(CFG.heat.roomCall); }   // short-term heat only; the security level is for loud havoc

// Staff walking past a restroom sometimes stick their head in: "Hey, do you kids have a pass?"
const RESTROOMS = SPOTS.filter((sp) => sp.kind === "restroom");
function maybeCheckRestroom(st) {
  const C = CFG.hiding.restroomCheck;
  st.checkCD ??= new Map();
  for (const sp of RESTROOMS) {
    if (sp.closed || (st.checkCD.get(sp) ?? 0) > game.time) continue;
    const f = spotFront(sp, tmp);
    if (Math.hypot(f.x - st.x, f.z - st.z) > C.passRange) continue;
    st.checkCD.set(sp, game.time + C.cooldownSec);   // one roll per pass
    if (Math.random() < C.chance * (1 - CFG.stats.stealth.restroomCheck * statMod("stealth"))) { st.state = "check"; st.checkSpot = sp; st.checkT = 0; }
    return;
  }
}
function updateCheck(st, dt) {   // returns the walking speed this frame
  const sp = st.checkSpot, f = spotFront(sp, tmp), T = st.type;
  if (navToward(st, f.x, f.z, T.patrolSpeed * staffMult("speed"), dt) > 0.7) return T.patrolSpeed;
  if (st.checkT === 0) bark(st, "check", true);
  st.checkT += dt;
  st.facing = lerpAngle(st.facing, Math.atan2(sp.side * HALLS[sp.h].nx, sp.side * HALLS[sp.h].nz), damp(6, dt));   // looking in
  if (st.checkT < CFG.hiding.restroomCheck.peekSec) return 0;
  if (player.hidden === sp && ++sp.checks < CFG.hiding.restroomCheck.foundAfter) {
    tally("closeCall");   // a close call: you hold your breath, they move on
    const left = CFG.hiding.restroomCheck.foundAfter - sp.checks;
    toast(`The ${T.name} looks in: "Hey, do you kids have a pass?" ...You hold your breath. They move on. (${left} more and they'll find you)`, 3);
    playBlip([300, 240], 0.08, "triangle", 0.05);
    st.state = "return"; setReturnPoint(st);
  } else if (player.hidden === sp) {   // found you
    exitSpot(true, `The ${T.name} pokes their head in: "Hey, do you kids have a pass?"`);
    banner(`THEY FOUND YOU!<small>RUN FOR IT!</small>`, 2.2);
    startChase(st); st.pauseT = CFG.hiding.bustPauseSec + 0.4; bark(st, "check", true);
  } else { st.state = "return"; setReturnPoint(st); }
  return 0;
}

// Tap on a world object: find the spot whose on-screen outline (a vertical line from floor to door top) is nearest the finger.
const projA = new THREE.Vector3(), projB = new THREE.Vector3();
function handleTap(x, y) {
  if (player.hidden) return;
  // Step 55: a door you tapped beats a dropped item next to it when your hands are full, or when the door is nearer your finger.
  const spot = tapSpotAt(x, y), item = tapItemAt(x, y);
  if (item && !(spot && !spot.far && (!game.hotbar.some((s) => !s) || spot.d < item.d))) { pickUp(item.o); return; }
  for (const o of objects) {   // tap a paper airplane in flight to catch it
    if (!o.wild || o.state !== "flying" || Math.hypot(o.x - player.x, o.z - player.z) > 3) continue;
    projA.set(o.x, o.y, o.z).project(camera);
    if (Math.hypot(x - ((projA.x + 1) / 2) * window.innerWidth, y - ((1 - projA.y) / 2) * window.innerHeight) < CFG.interact.tapRadiusPx) { catchPlane(o); return; }
  }
  const w = window.innerWidth, h = window.innerHeight;
  for (const a of ALARMS) {   // the fire alarm
    const f = alarmFront(a, tmp); if (Math.hypot(f.x - player.x, f.z - player.z) > CFG.interact.range) continue;
    const p = hallPos(a.h, a.t, a.wl, tmp);
    projA.set(p.x, 1.45, p.z).applyMatrix4(camera.matrixWorldInverse); if (projA.z > -0.2) continue;
    projA.set(p.x, 1.45, p.z).project(camera);
    if (Math.hypot(x - ((projA.x + 1) / 2) * w, y - ((1 - projA.y) / 2) * h) < CFG.interact.tapRadiusPx) { tryAlarm(a); return; }
  }
  if (!spot) return;
  if (spot.far) { toast(spot.sp.kind === "stairs" ? "Too far. Walk closer to the stairs." : "Too far. Walk closer first."); return; }
  enterSpot(spot.sp);
}
// the door under a tap: { sp, d (px from the finger), far (in view but out of reach) }, or null
function tapSpotAt(x, y) {
  const w = window.innerWidth, h = window.innerHeight;
  let best = null, bd = CFG.interact.tapRadiusPx, far = null, fd = CFG.interact.tapRadiusPx;
  for (const sp of SPOTS) {
    const dist = spotDist(sp);
    if (dist > CFG.interact.tagRange) continue;
    const p = hallPos(sp.h, sp.t, sp.wallLat, tmp);
    projA.set(p.x, 0.1, p.z).applyMatrix4(camera.matrixWorldInverse);
    if (projA.z > -0.2) continue;   // behind the camera
    projA.set(p.x, 0.1, p.z).project(camera); projB.set(p.x, 2.6, p.z).project(camera);   // floor to the top of the sign
    const ax = (projA.x + 1) / 2 * w, ay = (1 - projA.y) / 2 * h, bx = (projB.x + 1) / 2 * w, by = (1 - projB.y) / 2 * h;
    const vx = bx - ax, vy = by - ay, t = clamp(((x - ax) * vx + (y - ay) * vy) / (vx * vx + vy * vy || 1), 0, 1);
    const d = Math.hypot(x - (ax + vx * t), y - (ay + vy * t));
    if (dist <= (sp.kind === "stairs" ? CFG.interact.stairsTapRange : CFG.interact.range)) { if (d < bd) { bd = d; best = sp; } }
    else if (d < fd) { fd = d; far = sp; }
  }
  return best ? { sp: best, d: bd, far: false } : far ? { sp: far, d: fd, far: true } : null;
}

// Glow on spots within reach, and name tags above nearby ones.
const glowColor = new THREE.Color();
function updateSpotsUI() {
  const w = window.innerWidth, h = window.innerHeight, pulse = 0.3 + 0.22 * Math.sin(performance.now() / 160);
  for (const a of ALARMS) {   // fire alarm tags
    const f = alarmFront(a, tmp), d = player.hidden || game.state !== "playing" ? Infinity : Math.hypot(f.x - player.x, f.z - player.z);
    let show = d < CFG.interact.tagRange;
    if (show) {
      const p = hallPos(a.h, a.t, a.wl - a.side * 0.1, tmp);
      projA.set(p.x, 2.1, p.z).applyMatrix4(camera.matrixWorldInverse); show = projA.z < -0.2;
      if (show) { projA.set(p.x, 2.1, p.z).project(camera); show = Math.abs(projA.x) < 1 && Math.abs(projA.y) < 1;
        a.tag.style.left = ((projA.x + 1) / 2) * w + "px"; a.tag.style.top = ((1 - projA.y) / 2) * h + "px"; }
    }
    a.tag.style.display = show ? "block" : "none";
    if (!show) continue;
    const armed = performance.now() < a.armT;
    const text = game.alarmT > 0 ? "🔥 RINGING" : game.alarmPulled ? "Fire alarm · pulled today" : armed ? "🔥 Tap again to PULL" : "🔥 Fire alarm";
    if (a.tag.textContent !== text) a.tag.textContent = text;
    a.tag.className = "itag alarm" + (game.alarmPulled ? " off" : d < CFG.interact.range ? " near" : "") + (armed ? " armed" : "");
    a.mesh.material.emissive.setRGB(d < CFG.interact.range && !game.alarmPulled ? pulse : 0, 0, 0);
  }
  for (const sp of SPOTS) {
    const d = player.hidden || game.state !== "playing" ? Infinity : spotDist(sp);
    const blocked = d < CFG.interact.tagRange ? spotBlocked(sp) : "";
    const reach = d < (sp.kind === "stairs" ? CFG.interact.stairsTapRange : CFG.interact.range) && !blocked;   // glowing = a tap works
    glowColor.setRGB(1, 0.86, 0.5).multiplyScalar(reach ? pulse : 0);
    for (const m of sp.glow) m.emissive.copy(glowColor);
    // name tag
    let show = d < CFG.interact.tagRange;
    if (show) {
      const p = hallPos(sp.h, sp.t, sp.wallLat - sp.side * 0.1, tmp);
      projA.set(p.x, 2.5, p.z).applyMatrix4(camera.matrixWorldInverse);
      show = projA.z < -0.2;
      if (show) {
        projA.set(p.x, 2.5, p.z).project(camera);
        show = Math.abs(projA.x) < 1 && Math.abs(projA.y) < 1;
        sp.tag.style.left = ((projA.x + 1) / 2) * w + "px"; sp.tag.style.top = ((1 - projA.y) / 2) * h + "px";
      }
    }
    sp.tag.style.display = show ? "block" : "none";
    if (!show) continue;
    let text, cls = "itag";
    if (sp.kind === "locker") text = sp.busted ? "Locker · busted" : blocked ? "Locker · none left" : "Locker";
    else if (sp.kind === "stairs") text = sp.floor ? "Stairs ↓ 1st floor" : "Stairs ↑ 2nd floor";
    else if (sp.kind === "closet") text = sp.locked ? "Custodian's closet · locked 🔒" : blocked ? "Custodian's closet · used" : "Custodian's closet";
    else if (sp.kind === "restroom") text = sp.closed ? "Restroom · out of order" : blocked ? "Restroom · used" : game.dares.length < CFG.dares.max ? "Restroom · 📜" : "Restroom";
    else { text = `Room ${sp.room}${sp.R.label ? " · " + sp.R.label : ""} · ${TEACHER_TYPES[sp.teacher].label}${blocked ? (game.alarmT > 0 ? " · locked (fire alarm)" : sp.jammed ? " · jammed 🧹" : roomLocked(sp) ? " · locked" : sp.used ? " · used" : " · guarded") : ""}`; if (sp.teacher === "sub") cls += " sub"; }
    const keyOk = blocked && keyOpens(sp) && hasKey();
    if (keyOk) text += " · 🔑";
    if (blocked && !keyOk) cls += " off"; else if (reach) cls += " near";
    if (text !== sp.tagText) { sp.tag.textContent = text; sp.tagText = text; }
    if (cls !== sp.tagClass) { sp.tag.className = cls; sp.tagClass = cls; }
  }
}

// =====================================================================================
// Items: hotbar, tap-then-flick throwing, things lying around, havoc points
// =====================================================================================
const objects = [];
const isActive = (c) => c.mode !== "gone" && c.mode !== "spawning";
const ringGeo = new THREE.RingGeometry(0.34, 0.46, 20);
// Step 68: an Erlenmeyer flask with colored liquid (science-lab items). It sits upright (base at y = 0).
// userData.flask is the glass and liquid (hidden when it breaks); userData.puddle is what it leaves on the floor.
const FLASK = { slime: { liquid: 0x6fe03a, glow: 0x1d4a0c, puddle: 0x6fe03a, puddleOpacity: 0.85 },
                stink: { liquid: 0xf2d33b, glow: 0x4a3a08 },
                fizzy: { liquid: 0xe0302a, glow: 0x4a0a08, puddle: 0xc8262a, puddleOpacity: 0.6, bubbles: true } };
const flaskGeo = {
  glass: new THREE.LatheGeometry([[0.001, 0], [0.12, 0], [0.128, 0.012], [0.04, 0.2], [0.036, 0.21], [0.036, 0.29], [0.046, 0.3], [0.046, 0.315], [0.03, 0.315]].map(([x, y]) => new THREE.Vector2(x, y)), 14),
  liquid: new THREE.LatheGeometry([[0.001, 0.008], [0.112, 0.008], [0.118, 0.016], [0.074, 0.12], [0.001, 0.12]].map(([x, y]) => new THREE.Vector2(x, y)), 14),
  bubble: new THREE.IcosahedronGeometry(0.018, 0),
};
function flaskMesh(g, key) {
  const F = FLASK[ITEM_TYPES[key].flask], f = new THREE.Group();
  f.add(new THREE.Mesh(flaskGeo.glass, new THREE.MeshLambertMaterial({ color: 0xdff2ff, emissive: 0x23303a, transparent: true, opacity: 0.38, depthWrite: false, side: THREE.DoubleSide })));
  const liq = new THREE.Mesh(flaskGeo.liquid, new THREE.MeshLambertMaterial({ color: F.liquid, emissive: F.glow })); liq.renderOrder = -1; f.add(liq);
  const cork = new THREE.Mesh(new THREE.CylinderGeometry(0.034, 0.03, 0.05, 8), lambert(0xb08050)); cork.position.y = 0.31; f.add(cork);
  if (F.bubbles) {   // fizzing: bubbles bob in the liquid (and up the neck)
    f.userData.bubbles = [];
    for (let i = 0; i < 6; i++) { const b = new THREE.Mesh(flaskGeo.bubble, new THREE.MeshBasicMaterial({ color: 0xffd0c8 })); b.userData.ph = i / 6; f.add(b); f.userData.bubbles.push(b); }
    bubbleFlask(f, 0);
  }
  g.add(f); g.userData.flask = f;
  if (F.puddle) {
    const pud = new THREE.Mesh(splatGeo(), new THREE.MeshBasicMaterial({ color: F.puddle, transparent: true, opacity: F.puddleOpacity, depthWrite: false }));
    pud.rotation.x = -Math.PI / 2; pud.position.y = 0.02; pud.visible = false; g.add(pud); g.userData.puddle = pud;
  }
}
// A splat: a rough circle of radius about 1 with a few lobes, a little different every time.
function splatGeo() {
  const sh = new THREE.Shape(), n = 28, ph = [rand(0, 6), rand(0, 6), rand(0, 6)];
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * Math.PI * 2, r = 0.92 + 0.07 * Math.sin(a * 3 + ph[0]) + 0.05 * Math.sin(a * 5 + ph[1]) + 0.04 * Math.sin(a * 8 + ph[2]);
    i ? sh.lineTo(Math.cos(a) * r, Math.sin(a) * r) : sh.moveTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  return new THREE.ShapeGeometry(sh);
}
function bubbleFlask(f, t) {
  for (const b of f.userData.bubbles ?? []) {
    const k = (b.userData.ph + t * 0.9) % 1, a = b.userData.ph * 11;
    b.position.set(Math.cos(a) * 0.05 * (1 - k), 0.03 + k * 0.22, Math.sin(a) * 0.05 * (1 - k));
  }
}
// The flask breaks: hide it, and (if it leaves one) show the puddle at radius r.
function breakFlask(o, r) {
  const u = o.mesh.userData; if (u.flask) u.flask.visible = false;
  o.mesh.rotation.set(0, o.mesh.rotation.y, 0); o.y = 0.0; o.mesh.position.y = 0;
  if (u.puddle && r) { u.puddle.visible = true; u.puddle.scale.setScalar(r); }
  playBlip([1800, 1300, 2200], 0.04, "square", 0.04);   // tink-crash
}

function makeItemMesh(key) {
  const g = new THREE.Group();
  const m = (geo, color) => { const mesh = new THREE.Mesh(geo, lambert(color)); g.add(mesh); return mesh; };
  switch (key) {
    case "paperAirplane": { const a = m(new THREE.ConeGeometry(0.16, 0.5, 3), 0xffffff); a.rotation.x = Math.PI / 2; a.scale.set(1.6, 1, 0.25); break; }
    case "spitball": m(new THREE.IcosahedronGeometry(0.07, 0), 0xf4f4f4); break;
    case "toiletPaper": { const r = m(new THREE.CylinderGeometry(0.1, 0.1, 0.18, 10), 0xf6f6f0); r.rotation.z = Math.PI / 2; break; }
    case "frisbee": m(new THREE.CylinderGeometry(0.2, 0.17, 0.04, 14), 0xff5a36); break;
    case "kickMe": m(new THREE.BoxGeometry(0.3, 0.02, 0.2), 0xffffff); break;
    case "mentos": case "slime": case "stinkBomb": flaskMesh(g, key); break;   // step 68
    case "rubberChicken": {   // floppy yellow body, red comb, orange beak, dangling neck
      const b = m(new THREE.CapsuleGeometry(0.06, 0.3, 3, 8), 0xf7d13b); b.rotation.x = Math.PI / 2;
      const h = m(new THREE.IcosahedronGeometry(0.06, 1), 0xf7d13b); h.position.set(0, 0.04, 0.22);
      const c = m(new THREE.BoxGeometry(0.015, 0.05, 0.07), 0xd62828); c.position.set(0, 0.11, 0.22);
      const k = m(new THREE.ConeGeometry(0.02, 0.06, 6), 0xff8a2b); k.rotation.x = Math.PI / 2; k.position.set(0, 0.04, 0.29);
      for (const sx of [-1, 1]) { const f = m(new THREE.BoxGeometry(0.02, 0.02, 0.1), 0xff8a2b); f.position.set(sx * 0.04, -0.03, -0.2); }
      break;
    }
    case "glitterBomb": {   // a little pink jar of glitter with a gold lid
      m(new THREE.CylinderGeometry(0.08, 0.08, 0.2, 10), 0xff7ad1);
      const n = m(new THREE.CylinderGeometry(0.085, 0.085, 0.05, 10), 0xffcf3f); n.position.y = 0.12; break;
    }
    case "bananaPeel": {
      m(new THREE.BoxGeometry(0.16, 0.05, 0.16), 0xf2d43b);
      for (const a of [0, 2.1, 4.2]) { const p = m(new THREE.BoxGeometry(0.07, 0.03, 0.26), 0xe8c22a); p.rotation.y = a; p.position.set(Math.sin(a) * 0.12, 0, Math.cos(a) * 0.12); }
      break;
    }
    case "whoopee": {
      const c = m(new THREE.IcosahedronGeometry(0.22, 1), 0xff6fa8); c.scale.set(1, 0.35, 1);
      const n = m(new THREE.CylinderGeometry(0.04, 0.05, 0.1, 6), 0xe0558f); n.rotation.x = Math.PI / 2; n.position.set(0, 0, 0.24);
      break;
    }
    case "basketball": m(new THREE.IcosahedronGeometry(0.2, 1), 0xe67e22); break;
    case "football": {
      const f = m(new THREE.IcosahedronGeometry(0.15, 1), 0x7b4a24); f.scale.set(0.75, 0.75, 1.5);
      const lace = m(new THREE.BoxGeometry(0.03, 0.02, 0.16), 0xffffff); lace.position.y = 0.11;
      break;
    }
    case "sprayPaint": {
      m(new THREE.CylinderGeometry(0.07, 0.07, 0.3, 8), 0xd63384).position.y = 0.15;
      m(new THREE.CylinderGeometry(0.03, 0.03, 0.05, 6), 0xeeeeee).position.y = 0.32;
      break;
    }
    case "wheelieChair": {
      const seat = m(new THREE.BoxGeometry(0.5, 0.08, 0.5), 0x2c3e66); seat.position.y = 0.45;
      const back = m(new THREE.BoxGeometry(0.5, 0.5, 0.06), 0x2c3e66); back.position.set(0, 0.75, -0.24);
      const post = m(new THREE.CylinderGeometry(0.04, 0.04, 0.35, 6), 0x555555); post.position.y = 0.25;
      for (const a of [0, 1.26, 2.51, 3.77, 5.03]) { const l = m(new THREE.BoxGeometry(0.05, 0.05, 0.32), 0x333333); l.rotation.y = a; l.position.set(Math.sin(a) * 0.15, 0.06, Math.cos(a) * 0.15); }
      break;
    }
    case "gum": m(new THREE.BoxGeometry(0.16, 0.05, 0.09), 0xff8fc8); break;
    case "skeleton": {   // step 69: a classroom skeleton hanging on a wheeled stand
      const bone = 0xece4cc, B = (geo, x, y, z) => { const mm = m(geo, bone); mm.position.set(x, y, z); return mm; };
      for (const a of [0.785, 2.356, 3.927, 5.498]) {   // the base: four legs with casters
        const l = m(new THREE.BoxGeometry(0.05, 0.04, 0.36), 0x5a5f6a); l.rotation.y = a; l.position.set(Math.sin(a) * 0.17, 0.07, Math.cos(a) * 0.17);
        const w = m(new THREE.CylinderGeometry(0.04, 0.04, 0.03, 8), 0x222222); w.rotation.z = Math.PI / 2; w.position.set(Math.sin(a) * 0.33, 0.04, Math.cos(a) * 0.33);
      }
      m(new THREE.CylinderGeometry(0.018, 0.018, 1.75, 6), 0x8a8f9a).position.set(0, 0.95, -0.1);   // the pole behind it
      const hook = m(new THREE.BoxGeometry(0.03, 0.03, 0.12), 0x8a8f9a); hook.position.set(0, 1.82, -0.05);
      const skull = B(new THREE.SphereGeometry(0.11, 12, 9), 0, 1.66, 0); skull.scale.set(0.9, 1, 1);
      B(new THREE.BoxGeometry(0.13, 0.06, 0.1), 0, 1.55, 0.02);   // jaw
      for (const x of [-0.04, 0.04]) { const e = m(new THREE.SphereGeometry(0.03, 8, 6), 0x111111); e.position.set(x, 1.67, 0.085); }
      const nose = m(new THREE.ConeGeometry(0.015, 0.03, 3), 0x111111); nose.position.set(0, 1.62, 0.1); nose.rotation.x = Math.PI;
      B(new THREE.CylinderGeometry(0.02, 0.02, 0.62, 6), 0, 1.15, -0.03);   // spine
      for (let i = 0; i < 5; i++) {   // ribs: hoops, smaller toward the bottom
        const r = B(new THREE.TorusGeometry(0.12 - i * 0.008, 0.012, 4, 14), 0, 1.4 - i * 0.055, 0); r.rotation.x = Math.PI / 2; r.scale.set(1, 0.75, 1);
      }
      B(new THREE.BoxGeometry(0.32, 0.025, 0.03), 0, 1.45, 0);   // collarbones
      const pelvis = B(new THREE.TorusGeometry(0.1, 0.03, 5, 10), 0, 0.86, 0); pelvis.rotation.x = Math.PI / 2; pelvis.scale.set(1.2, 0.8, 1);
      for (const sx of [-1, 1]) {
        const arm = new THREE.Group(); arm.position.set(sx * 0.17, 1.44, 0); g.add(arm); arm.rotation.z = sx * 0.12;
        const ua = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.016, 0.3, 5), lambert(bone)); ua.position.y = -0.15; arm.add(ua);
        const fa = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.014, 0.27, 5), lambert(bone)); fa.position.y = -0.44; arm.add(fa);
        const hd = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.08, 0.025), lambert(bone)); hd.position.y = -0.61; arm.add(hd);
        (g.userData.arms ??= []).push(arm);
        B(new THREE.CylinderGeometry(0.022, 0.018, 0.4, 5), sx * 0.08, 0.6, 0);   // thigh
        B(new THREE.CylinderGeometry(0.018, 0.015, 0.36, 5), sx * 0.08, 0.27, 0.01);   // shin (it hangs: feet just off the base)
        B(new THREE.BoxGeometry(0.06, 0.025, 0.12), sx * 0.08, 0.11, 0.04);
      }
      break;
    }
    case "bassDrum": {   // a pivot that spins (rolling) inside the group that turns to face the way it's going
      const pivot = new THREE.Group(); g.add(pivot); g.userData.pivot = pivot;
      const add = (geo, color, y) => { const mesh = new THREE.Mesh(geo, lambert(color)); mesh.rotation.z = Math.PI / 2; mesh.position.x = y; pivot.add(mesh); return mesh; };
      add(new THREE.CylinderGeometry(0.45, 0.45, 0.36, 18), 0xb03a2e, 0);
      add(new THREE.CylinderGeometry(0.43, 0.43, 0.38, 18), 0xf4f1e8, 0);   // the white heads
      add(new THREE.CylinderGeometry(0.46, 0.46, 0.05, 18), 0xd4ac0d, 0.18); add(new THREE.CylinderGeometry(0.46, 0.46, 0.05, 18), 0xd4ac0d, -0.18);
      const band = new THREE.Mesh(new THREE.BoxGeometry(0.37, 0.1, 0.92), lambert(0x1d2230)); pivot.add(band);   // a stripe so you can see it roll
      break;
    }
    case "skateboard": {
      m(new THREE.BoxGeometry(0.24, 0.03, 0.78), 0x2d3436).position.y = 0.06;
      for (const z of [-0.26, 0.26]) for (const x of [-0.1, 0.1]) m(new THREE.CylinderGeometry(0.035, 0.035, 0.04, 8), 0xf1c40f).position.set(x, 0.035, z);
      break;
    }
    case "mop": { const pole = m(new THREE.CylinderGeometry(0.025, 0.025, 1.2, 5), 0xc8a46a); pole.rotation.z = Math.PI / 2; m(new THREE.BoxGeometry(0.18, 0.1, 0.2), 0xe8e2d0).position.x = 0.62; break; }
    case "wetFloor": {
      for (const a of [-0.32, 0.32]) { const p = m(new THREE.BoxGeometry(0.34, 0.62, 0.02), 0xf1c40f); p.position.y = 0.3; p.rotation.x = a; p.position.z = -a * 0.3; }
      const mark = m(new THREE.BoxGeometry(0.06, 0.2, 0.03), 0x1d2230); mark.position.set(0, 0.36, 0.11); mark.rotation.x = -0.32;
      break;
    }
    case "mopBucket": {
      const bk = m(new THREE.CylinderGeometry(0.2, 0.16, 0.3, 10), 0xf1c40f); bk.position.y = 0.15; g.userData.bucket = bk;
      const pud = new THREE.Mesh(new THREE.CircleGeometry(1, 20), new THREE.MeshBasicMaterial({ color: 0x8fc3e0, transparent: true, opacity: 0.5, depthWrite: false }));
      pud.rotation.x = -Math.PI / 2; pud.position.y = 0.02; pud.visible = false; g.add(pud); g.userData.puddle = pud;
      break;
    }
    case "plunger": {
      // step 58: a real plunger: the rubber cup's open side faces down (-y), the handle comes out of the top of the dome
      const cup = m(new THREE.SphereGeometry(0.1, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2), 0xc0392b); cup.material.side = THREE.DoubleSide;
      const stick = m(new THREE.CylinderGeometry(0.022, 0.022, 0.5, 5), 0xc8a46a); stick.position.y = 0.34;
      break;
    }
    case "globe": {
      const pivot = new THREE.Group(); g.add(pivot); g.userData.pivot = pivot;
      const ball = new THREE.Mesh(new THREE.IcosahedronGeometry(0.3, 2), lambert(0x2e86c1)); pivot.add(ball);
      for (const [a, b, w] of [[0.4, 0.3, 0.2], [2.2, -0.2, 0.26], [4.0, 0.5, 0.16], [5.3, -0.6, 0.14]]) {   // continents, so you can see it roll
        const land = new THREE.Mesh(new THREE.BoxGeometry(w, w * 0.8, 0.05), lambert(0x58a55c));
        land.position.set(Math.sin(a) * Math.cos(b) * 0.29, Math.sin(b) * 0.29, Math.cos(a) * Math.cos(b) * 0.29); land.lookAt(0, 0, 0); pivot.add(land);
      }
      break;
    }
    case "trumpet": {
      const t = m(new THREE.CylinderGeometry(0.025, 0.025, 0.4, 6), 0xe0b030); t.rotation.x = Math.PI / 2;
      const bell = m(new THREE.CylinderGeometry(0.11, 0.025, 0.16, 10), 0xe0b030); bell.rotation.x = Math.PI / 2; bell.position.z = 0.26;
      m(new THREE.BoxGeometry(0.06, 0.08, 0.1), 0xc8981e).position.y = 0.05;
      break;
    }
    case "oldSock": { m(new THREE.BoxGeometry(0.1, 0.06, 0.32), 0xe8e4d8); const toe = m(new THREE.BoxGeometry(0.2, 0.06, 0.1), 0xe8e4d8); toe.position.set(0.05, 0, 0.16);
      m(new THREE.BoxGeometry(0.105, 0.065, 0.05), 0xc0392b).position.z = -0.12; break; }
    case "sandwich": { m(new THREE.BoxGeometry(0.22, 0.04, 0.22), 0xd9b77a).position.y = 0.0; m(new THREE.BoxGeometry(0.21, 0.03, 0.21), 0x6b8e23).position.y = 0.035;
      m(new THREE.BoxGeometry(0.22, 0.04, 0.22), 0xd9b77a).position.y = 0.07; break; }
    case "homework": m(new THREE.IcosahedronGeometry(0.11, 0), 0xf7f7f2); break;
  }
  scene.add(g);
  return g;
}
let objectIds = 0;
function spawnObject(key, state, x, y, z, extra = {}) {
  const T = ITEM_TYPES[key];
  const o = { id: ++objectIds, key, T, state, x, y, z, vx: 0, vy: 0, vz: 0, age: 0, life: Infinity, bounces: 0, maxBounces: 0,
    flown: new Set(), noiseCD: 0, slips: 0, uses: T.uses ?? 1, spin: Math.random() * 6, mesh: makeItemMesh(key), ...extra };
  o.ring = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: 0xffdc80, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false }));
  o.ring.rotation.x = -Math.PI / 2; scene.add(o.ring);
  objects.push(o);
  return o;
}
function removeObject(o) { if (o.foam) { scene.remove(o.foam); o.foam.material.dispose(); o.foam = null; } if (o.trail) { o.trail.o = null; o.trail = null; } scene.remove(o.mesh); scene.remove(o.ring); if (o.cloud) { scene.remove(o.cloud); o.cloud.material.dispose(); if (o.sparkle) o.sparkle.material.dispose(); } o.dead = true; }
function clearObjects() { for (const o of objects) removeObject(o); objects.length = 0; }

// Step 68: drawn flask icons for the science items (in buttons and item slots; text uses the emoji). Each has its own
// mark as well as its color (drips, stink lines, bubbles), since red and green look alike to colorblind players.
const FLASK_ICON = { slime: ["#6fe03a", '<path d="M8.5 27c0 2 1.6 2.6 1.6 4M23 27.5c0 1.6 1.4 2 1.4 3.2" stroke="#6fe03a" stroke-width="2.2" stroke-linecap="round" fill="none"/>'],
                     stink: ["#f2d33b", '<path d="M21 2c2 1.4-1 2.8 1 4.2M25 3c2 1.4-1 2.8 1 4.2" stroke="#f2d33b" stroke-width="1.8" stroke-linecap="round" fill="none"/>'],
                     fizzy: ["#e0302a", '<circle cx="14" cy="22" r="1.4" fill="#ffd0c8"/><circle cx="18" cy="24.5" r="1.1" fill="#ffd0c8"/><circle cx="16" cy="15" r="1.2" fill="#ffd0c8"/><circle cx="17" cy="9" r="1" fill="#ffd0c8"/>'] };
function iconHTML(key) {
  const T = ITEM_TYPES[key], F = T?.flask && FLASK_ICON[T.flask];
  if (!F) return T?.icon ?? "";
  return `<svg class="ico" viewBox="0 0 32 32" aria-hidden="true"><path d="M12.5 3h7v2h-0.8v7.5l7.6 12.6A2.6 2.6 0 0 1 24 29H8a2.6 2.6 0 0 1-2.3-3.9l7.6-12.6V5h-.8z" fill="rgba(220,240,255,.25)" stroke="#eaf6ff" stroke-width="1.5" stroke-linejoin="round"/><path d="M10.2 19h11.6l3.4 5.9A1.5 1.5 0 0 1 24 27H8a1.5 1.5 0 0 1-1.2-2.1z" fill="${F[0]}"/>${F[1]}</svg>`;
}

// Step 69: only one skeleton in the school at a time, and none once it's scared everyone today.
const skeletonOut = () => game.skeletonWise || objects.some((o) => !o.dead && o.key === "skeleton") || game.hotbar.some((it) => it?.key === "skeleton") ||
  SPOTS.some((sp) => sp.loot?.includes("skeleton"));
const roomLoot = (sp) => (sp.R.loot.some(([k]) => k === "skeleton") && skeletonOut() ? sp.R.loot.filter(([k]) => k !== "skeleton") : sp.R.loot);
function pickWeighted(pairs) {
  let r = Math.random() * pairs.reduce((a, [, w]) => a + w, 0);
  for (const [k, w] of pairs) if ((r -= w) <= 0) return k;
  return pairs[0][0];
}
// the locker table as one flat list (each item's overall chance), for things that want "any locker item"
CFG.lockers.loot = Object.values(CFG.lockers.kinds).flatMap(([share, items]) => { const sum = items.reduce((a, [, w]) => a + w, 0); return items.map(([k, w]) => [k, (share * w) / sum]); });
// What can turn up "found" (fire alarm spill, gum trades): the locker table without the junk.
const goodLoot = () => CFG.lockers.loot.filter(([k]) => ITEM_TYPES[k].kind !== "junk" && !ITEM_TYPES[k].junk);
// Things lying around stay until staff tidy them up. If the halls fill up anyway, the oldest get swept away.
const isLying = (o) => !o.dead && (o.state === "pickup" || o.state === "resting" || o.state === "trap");
function capLying() {
  const lying = objects.filter(isLying);
  for (let i = 0; i < lying.length - CFG.items.maxLying; i++) removeObject(lying[i]);
}

// ---- hotbar ----
const hotbarEl = $("hotbar");
const slotCount = () => CFG.items.slots + (character.stats.strength >= CFG.stats.strength.extraSlotAt ? 1 : 0);
for (let i = 0; i < CFG.items.slots + 1; i++) {   // the last one only shows for a strong kid
  const b = document.createElement("button"); b.className = "slot empty"; b.type = "button"; b.dataset.key = i + 1;
  b.addEventListener("pointerdown", (e) => { e.preventDefault(); e.stopPropagation(); selectSlot(i); });
  hotbarEl.appendChild(b);
}
function renderHotbar() {
  hotbarEl.classList.toggle("five", game.hotbar.length > 4);
  [...hotbarEl.children].forEach((b, i) => {
    const it = game.hotbar[i]; b.hidden = i >= game.hotbar.length;
    b.innerHTML = it ? `${iconHTML(it.key)}${it.uses > 1 ? `<small>${it.uses}</small>` : ""}` : "";
    b.classList.toggle("empty", !it); b.classList.toggle("active", game.aim?.slot === i || (it?.key === "skateboard" && !!player.board));
    b.title = it ? ITEM_TYPES[it.key].label : "Empty slot";
  });
}
function addItem(key, uses) {
  const i = game.hotbar.findIndex((s) => !s);
  if (i < 0) { toast("Inventory full! Use something first."); playBlip([180], 0.08, "square", 0.04); return false; }
  game.hotbar[i] = { key, uses: uses ?? ITEM_TYPES[key].uses ?? 1 };
  renderHotbar();
  popup(`${ITEM_TYPES[key].icon} ${ITEM_TYPES[key].label}`, "item");
  playBlip([660, 990], 0.06, "triangle", 0.06);
  return true;
}
function consumeSlot(i) { const it = game.hotbar[i]; if (!it) return; if (--it.uses <= 0) game.hotbar[i] = null; renderHotbar(); }

function selectSlot(i, fromKey = false) {
  if (game.state !== "playing") return;
  const it = game.hotbar[i]; if (!it) return;
  if (player.hidden) { toast("Not while you're hiding"); return; }
  if (player.ride || player.dazeT > 0 || player.slipT > 0 || player.stuckT > 0) return;
  if (game.aim?.slot === i) { cancelAim(); return; }
  const T = ITEM_TYPES[it.key];
  if (T.kind === "spray") { if (sprayPaint()) consumeSlot(i); return; }
  if (T.kind === "sign") { stickKickMe(i); return; }
  if (T.kind === "pass") { if (game.passShield) toast("You already have a fake pass."); else { consumeSlot(i); takeItem("hallPass"); } return; }
  if (T.kind === "note") { const m = game.dares.find((x) => x.id === "loveNote"); toast(m ? `💌 Deliver it: hide in the gym during period ${m.p.period}.` : "A love note. It's not for you."); return; }
  if (T.kind === "key") { toast(`Staff key: walk into a locked door to open it (${it.uses} use${it.uses === 1 ? "" : "s"} left)`, 2.4); return; }
  if (T.kind === "junk") {   // toss it: it lands at your feet, and staff will tidy it up
    consumeSlot(i); toast(T.line);
    spawnObject(it.key, "resting", player.x + Math.sin(player.heading) * 0.6, 0.04, player.z + Math.cos(player.heading) * 0.6);
    capLying(); playBlip([300, 200], 0.06, "triangle", 0.04); return;
  }
  if (T.kind === "instant") { consumeSlot(i); toast(T.line); havoc(it.key, T.points, T.label, { x: player.x, z: player.z }); return; }
  if (T.kind === "board") { if (player.board) hopOff(); else hopOn(); return; }
  if (T.kind === "drink") { consumeSlot(i); drinkEnergy(); return; }
  if (T.kind === "disguise") { consumeSlot(i); putOnDisguise(); return; }
  if (T.kind === "instrument") { consumeSlot(i); playTrumpet(); return; }
  if (T.kind === "mop") { if (jamDoor()) consumeSlot(i); return; }
  if (T.kind === "place") { consumeSlot(i); placeSign(it.key); return; }
  if (opts.autoAim || tut) { autoThrow(i); return; }
  game.aim = { slot: i, key: it.key, id: null, sx: 0, sy: 0, cx: 0, cy: 0 };
  $("aim").hidden = false;
  $("aimText").textContent = T.kind === "ride" ? "Flick to launch the wheelie chair" : `Flick to throw the ${T.label.toLowerCase()}`;
  if (fromKey) startKeyAim(game.aim);
  renderHotbar();
}
// arrow-key aiming: ←/→ turn the throw, ↑/↓ change the power, Space throws
function startKeyAim(a) {
  a.kb = { yaw: cam.yaw, power: CFG.keyboard.startPower };
  $("aimText").textContent = $("aimText").textContent.replace(/^Flick/, "Aim");
  aimEl.querySelector(".aimHint").textContent = "←/→ aim · ↑/↓ distance · Space to throw · Esc to cancel";
}
const keyLaunch = (a) => ({ dx: Math.sin(a.kb.yaw), dz: Math.cos(a.kb.yaw), power: a.kb.power });
function keyThrow() { const a = game.aim; if (!a) return; if (!a.kb) startKeyAim(a); release(a, keyLaunch(a)); }
function updateKeyAim(dt) {
  const a = game.aim; if (!a?.kb) return;
  const K = CFG.keyboard;
  a.kb.yaw += ((keys.has("arrowleft") ? 1 : 0) - (keys.has("arrowright") ? 1 : 0)) * K.aimTurnRate * dt;
  a.kb.power = clamp(a.kb.power + ((keys.has("arrowup") ? 1 : 0) - (keys.has("arrowdown") ? 1 : 0)) * K.aimPowerRate * dt, 0.15, 1);
}
function cancelAim() {
  if (!game.aim) return;
  game.aim = null; $("aim").hidden = true; arc.visible = false; renderHotbar();
  aimEl.querySelector(".aimHint").textContent = AIM_HINT;
}

// ---- auto-aim: throw the way you're facing (where you're looking, if you just dragged the view), at a staff member in front of you ----
const aimYaw = () => (manualCamT > 0 ? cam.yaw : player.heading);
const autoBehind = (key) => CFG.autoAim.behind.includes(key);
const rangeCache = {};
// how far a throw at each power goes before it's at chest height (or on the floor, for things that don't hit people)
function throwRanges(key) {
  if (rangeCache[key]) return rangeCache[key];
  const T = ITEM_TYPES[key], stopY = T.hit && T.flight !== "glide2" ? 1.0 : 0.05, out = [];
  for (let k = 0; k <= 17; k++) {
    const power = 0.15 + (0.85 * k) / 17, v = launchVel(T, { dx: 0, dz: 1, power }), sim = { y: THROW_Y, vx: 0, vy: v.vy, vz: v.vz, d: 0 };
    if (T.flight === "glide2") initPlane(sim, power, T);
    for (let n = 0; n < 600; n++) {
      if (T.flight === "glide2") { planeStep(sim, 0.02, T); sim.d += sim.vz * 0.02; sim.y += sim.vy * 0.02; if (sim.stage === 2 && sim.y <= T.lowY + 0.05) break; }
      else { sim.vy -= T.gravity * 0.02; if (T.glide) sim.vy = Math.max(sim.vy, -0.9); sim.d += v.vz * 0.02; sim.y += sim.vy * 0.02; if (sim.vy < 0 && sim.y <= stopY) break; }
    }
    out.push([power, sim.d]);
  }
  return (rangeCache[key] = out);
}
// the staff member the next throw of this item would go at, or null
function autoTarget(key) {
  const T = ITEM_TYPES[key], A = CFG.autoAim;
  if (!T || T.kind !== "throw" || autoBehind(key)) return null;
  const yaw = aimYaw(), cone = (A.coneDeg * Math.PI) / 180, ranges = T.roll ? [[1, A.maxRange]] : throwRanges(key);
  const reach = Math.min(A.maxRange, ranges[ranges.length - 1][1] + 2);
  let best = null, bs = Infinity;
  for (const st of staff) {
    const dx = st.x - player.x, dz = st.z - player.z, d = Math.hypot(dx, dz);
    if (d < 0.8 || d > reach) continue;
    const off = Math.abs(angDiff(yaw, Math.atan2(dx, dz)));
    if (off > cone || !lineOfSight(player.x, player.z, st.x, st.z)) continue;
    const score = d * (1 + off * 2);
    if (score < bs) { bs = score; best = { st, d, yaw: Math.atan2(dx, dz) }; }
  }
  if (!best) return null;
  let power = 1, err = Infinity;
  if (!T.roll) for (const [p, r] of ranges) if (Math.abs(r - best.d) < err) { err = Math.abs(r - best.d); power = p; }
  best.power = power;
  return best;
}
function autoThrow(i) {
  const it = game.hotbar[i], T = ITEM_TYPES[it.key], A = CFG.autoAim, behind = autoBehind(it.key);
  let yaw = aimYaw() + (behind ? Math.PI : 0), power = A.power[it.key] ?? A.defaultPower;
  const tg = autoTarget(it.key);
  if (tg) { yaw = tg.yaw; power = tg.power; }
  release({ slot: i, key: it.key }, { dx: Math.sin(yaw), dz: Math.cos(yaw), power, keepHeading: behind });
}
// the 🎯 over whoever the first throwable item in your hotbar would go at
const autoTargetEl = $("autoTarget");
function updateAutoTarget() {
  let tg = null;
  if (opts.autoAim && game.state === "playing" && !player.hidden && !game.aim) {
    const it = game.hotbar.find((x) => x && ITEM_TYPES[x.key].kind === "throw" && !autoBehind(x.key));
    if (it) tg = autoTarget(it.key);
  }
  if (tg) {
    projA.set(tg.st.x, 2.6 * (tg.st.type?.scale ?? 1), tg.st.z).applyMatrix4(camera.matrixWorldInverse);
    if (projA.z > -0.2) tg = null;
  }
  if (!tg) { autoTargetEl.style.display = "none"; return; }
  projA.set(tg.st.x, 2.6 * (tg.st.type?.scale ?? 1), tg.st.z).project(camera);
  autoTargetEl.style.display = "block";
  autoTargetEl.style.left = ((projA.x + 1) / 2) * window.innerWidth + "px"; autoTargetEl.style.top = ((1 - projA.y) / 2) * window.innerHeight + "px";
}

// ---- aiming: drag anywhere, the dotted arc shows where it will go, release to throw ----
const aimEl = $("aim"), AIM_HINT = aimEl.querySelector(".aimHint").textContent;
aimEl.addEventListener("pointerdown", (e) => {
  if (!game.aim || e.target.id === "aimCancel") return;
  const a = game.aim; a.id = e.pointerId; a.sx = a.cx = e.clientX; a.sy = a.cy = e.clientY;
  try { aimEl.setPointerCapture(e.pointerId); } catch (err) { /* fine */ }
});
aimEl.addEventListener("pointermove", (e) => { const a = game.aim; if (a && e.pointerId === a.id) { a.cx = e.clientX; a.cy = e.clientY; } });
aimEl.addEventListener("pointerup", (e) => {
  const a = game.aim; if (!a || e.pointerId !== a.id) return;
  a.id = null;
  if (Math.hypot(a.cx - a.sx, a.cy - a.sy) < CFG.items.minFlickPx) { cancelAim(); return; }   // a tap cancels
  release(a);
});
aimEl.addEventListener("pointercancel", () => { if (game.aim) game.aim.id = null; });
$("aimCancel").addEventListener("click", cancelAim);

// flick up the screen = away from the camera; length sets the power
function flickLaunch(a) {
  const dx = a.cx - a.sx, dy = a.cy - a.sy, len = Math.hypot(dx, dy);
  const fx = Math.sin(cam.yaw), fz = Math.cos(cam.yaw);
  let wx = fx * -dy + camRight.x * dx, wz = fz * -dy + camRight.z * dx;
  const wl = Math.hypot(wx, wz) || 1; wx /= wl; wz /= wl;
  return { dx: wx, dz: wz, power: clamp(len / (CFG.items.flickFullFrac * Math.min(window.innerWidth, window.innerHeight)), 0.15, 1) };
}
function launchVel(T, L) {
  const sp = (T.speed[0] + (T.speed[1] - T.speed[0]) * L.power) * (1 + CFG.stats.strength.throw * statMod("strength")), p = (T.pitchDeg * Math.PI) / 180;
  return { vx: L.dx * Math.cos(p) * sp, vy: Math.sin(p) * sp, vz: L.dz * Math.cos(p) * sp };
}
const THROW_Y = 1.3;
function release(a, L = flickLaunch(a)) {
  const T = ITEM_TYPES[a.key];
  if (!L.keepHeading) player.heading = Math.atan2(L.dx, L.dz);
  consumeSlot(a.slot);
  cancelAim();
  if (T.kind === "ride") { startRide(L); return; }
  if (T.roll) { rollDrum(a.key, L); return; }
  const o = spawnObject(a.key, "flying", player.x + L.dx * 0.45, THROW_Y, player.z + L.dz * 0.45, launchVel(T, L));
  if (T.bounces) o.maxBounces = Math.floor(rand(T.bounces[0], T.bounces[1] + 1));
  if (T.flight === "glide2") initPlane(o, L.power, T);
  if (a.key === "toiletPaper") o.trail = newTrail(o);
  playBlip([300, 520], 0.06, "triangle", 0.05);   // whoosh
}

const ARC_N = 30;
const arc = new THREE.Points(new THREE.BufferGeometry()
    .setAttribute("position", new THREE.BufferAttribute(new Float32Array(ARC_N * 3), 3))
    .setAttribute("color", new THREE.BufferAttribute(new Float32Array(ARC_N * 3), 3)),
  new THREE.PointsMaterial({ vertexColors: true, size: 9, sizeAttenuation: false, transparent: true, opacity: 0.95, depthTest: false }));
// arc colors: yellow normally; for the paper airplane, blue while it's up high (safe), orange once it's low enough to hit someone
const ARC_YELLOW = new THREE.Color(0xffe066), ARC_HIGH = new THREE.Color(0x35c8ff), ARC_LOW = new THREE.Color(0xff6a1a);
arc.visible = false; arc.renderOrder = 5; arc.frustumCulled = false; scene.add(arc);
function updateAimPreview() {
  const a = game.aim;
  if (!a || (!a.kb && (a.id === null || Math.hypot(a.cx - a.sx, a.cy - a.sy) < CFG.items.minFlickPx))) { arc.visible = false; return; }
  const T = ITEM_TYPES[a.key], L = a.kb ? keyLaunch(a) : flickLaunch(a), pos = arc.geometry.attributes.position, col = arc.geometry.attributes.color, step = 0.04;
  const sim = { x: player.x + L.dx * 0.45, y: T.kind === "ride" ? 0.1 : THROW_Y, z: player.z + L.dz * 0.45, vx: 0, vy: 0, vz: 0 };
  if (T.kind === "ride") { sim.vx = L.dx * T.rideSpeed; sim.vz = L.dz * T.rideSpeed; }
  else if (T.roll) { const sp = rollSpeed(T, L.power); sim.y = 0.45; sim.vx = L.dx * sp; sim.vz = L.dz * sp; }
  else Object.assign(sim, launchVel(T, L));
  const plane = T.flight === "glide2";
  if (plane) initPlane(sim, L.power, T);
  const every = plane ? 6 : 4;   // the plane flies farther, so space its dots out more
  let i = 0, stopped = false;
  for (let k = 0; k < 200 && i < ARC_N; k++) {
    if (!stopped) {
      if (plane) planeStep(sim, step, T);
      else if (T.kind !== "ride" && !T.roll) { sim.vy -= T.gravity * step; if (T.glide) sim.vy = Math.max(sim.vy, -0.9); }
      const nx = sim.x + sim.vx * step, nz = sim.z + sim.vz * step;
      if (!lineOfSight(sim.x, sim.z, nx, nz) || sim.y + sim.vy * step < 0.05) stopped = true;
      else { sim.x = nx; sim.z = nz; sim.y += sim.vy * step; }
    }
    if (k % every === 0) { pos.setXYZ(i, sim.x, sim.y, sim.z); (plane ? (sim.stage === 1 ? ARC_HIGH : ARC_LOW) : ARC_YELLOW).toArray(col.array, i * 3); i++; }
  }
  pos.needsUpdate = true; col.needsUpdate = true; arc.visible = true;
}

// ---- physics and effects ----
function wallBounce(o, dt, keep) {   // reflect off walls; returns true if it hit one
  let hit = false;
  for (const ax of ["x", "z"]) {
    const v = ax === "x" ? o.vx : o.vz;
    if (Math.abs(v) < 1e-4) continue;
    const reach = Math.abs(v) * dt + 0.18;
    const d = ax === "x" ? raycast(o.x, o.z, Math.sign(v), 0, reach) : raycast(o.x, o.z, 0, Math.sign(v), reach);
    if (d < reach) { if (ax === "x") o.vx = -o.vx * keep; else o.vz = -o.vz * keep; hit = true; }
  }
  return hit;
}
function updateObjects(dt) {
  for (const o of objects) {
    if (o.dead) continue;
    o.age += dt; o.noiseCD -= dt;
    if (o.state === "flying") flyObject(o, dt);
    else if (o.state === "rolling") rollObject(o, dt);
    else if (o.state === "drum") drumRoll(o, dt);
    else if (o.state === "chairRoll") chairRoll(o, dt);
    else if (o.state === "sign") wetSignCheck(o);
    else if (o.state === "trap") (o.key === "slime" ? slimeCheck : trapCheck)(o);
    else if (o.state === "resting" && o.key === "whoopee") stepOnCushion(o);
    else if (o.state === "cloud") stinkCloud(o, dt);
    else if (o.state === "fog") fogStep(o, dt);
    else if (o.state === "fuse") { o.fuseT -= dt; o.mesh.rotation.z = Math.sin(o.age * 40) * 0.08; if (o.mesh.userData.flask) bubbleFlask(o.mesh.userData.flask, o.age * 4); if (o.fuseT <= 0) { o.mesh.rotation.z = 0; startGeyser(o); } }
    else if (o.state === "geyser") geyserStep(o, dt);
    if (o.dead) continue;
    if (o.life !== Infinity) { o.life -= dt; if (o.life <= 0) removeObject(o); }
  }
  for (let i = objects.length - 1; i >= 0; i--) if (objects[i].dead) objects.splice(i, 1);
}
function drawObjects() {
  const pulse = 0.35 + 0.25 * Math.sin(performance.now() / 160);
  for (const o of objects) {
    o.mesh.position.set(o.x, o.y, o.z);
    if (o.state === "flying") o.mesh.rotation.y = Math.atan2(o.vx, o.vz);
    if (o.state === "pickup") { o.spin += 0.02; o.mesh.rotation.y = o.spin; o.mesh.position.y = o.y + 0.1 + Math.sin(o.spin * 2) * 0.05; }
    const fading = (o.state === "pickup" || o.state === "resting" || o.state === "trap") && o.life < CFG.items.blinkSec;
    o.mesh.visible = o.state !== "cloud" && !(fading && Math.sin(o.life * 18) < 0);
    const reach = pickable(o) && game.state === "playing" && !player.hidden && Math.hypot(o.x - player.x, o.z - player.z) < CFG.items.pickupRange;
    o.ring.material.opacity = reach ? pulse : pickable(o) ? 0.12 : 0;
    o.ring.position.set(o.x, 0.03, o.z);
  }
}
// ---- thrown things hitting people: points (staff pay more) and a stun ----
function stunStaff(st, sec, style) {
  sec *= 1 + CFG.stats.strength.stun * statMod("strength");   // step 45: a stronger kid's hits keep them down longer
  st.stunT = Math.max(st.stunT, sec); st.stunStyle = style; st.camping = false;
  if (st.state === "chase" || st.state === "bust") { st.state = "search"; st.searchT = 0; st.lastX = st.tx = player.x; st.lastZ = st.tz = player.z; }
}
// ---- the custodian: walks to the nearest mess and cleans it; radios you in if he gets a good look ----
const kidsWant = (o) => CFG.custodian.kidsTake.includes(o.key);
function custodianJobs() {
  const C = CFG.custodian, jobs = [];
  for (const o of objects) {
    if (o.dead || o.wild) continue;
    if (o.state === "cloud" && o.lingering) jobs.push({ kind: "cloud", o, x: o.x, z: o.z, sec: C.airSec, reach: 1.2 });
    else if (tidyable(o) && !kidsWant(o) && o.state !== "pickup") jobs.push({ kind: "obj", o, x: o.x, z: o.z, sec: C.pickupSec, reach: 0.6 });
  }
  for (const g of graffiti) { const p = hallPos(g.h, g.t, wallLat(g.h, g.side) - g.side * 0.55); jobs.push({ kind: "graffiti", g, x: p.x, z: p.z, sec: C.scrubSec, reach: 0.6 }); }
  for (const tr of tpTrails) {
    if (!tr.done || !tr.mesh) continue;
    const m = tr.pts[Math.floor(tr.pts.length / 2)], pr = hallProject(m.x, m.z), p = hallPos(pr.h, pr.t, clamp(pr.lat, -1.6, 1.6));
    jobs.push({ kind: "tp", tr, x: p.x, z: p.z, sec: C.tpSec, reach: 1.0 });
  }
  for (const sp of RESTROOMS) if (sp.closed) { const f = spotFront(sp, {}); jobs.push({ kind: "flood", sp, x: f.x, z: f.z, sec: C.mopSec, reach: 0.8 }); }
  for (const sp of DOOR_SPOTS()) if (sp.jammed) { const f = spotFront(sp, {}); jobs.push({ kind: "jam", sp, x: f.x, z: f.z, sec: 3, reach: 0.8 }); }
  return jobs;
}
function jobGone(j) {
  if (j.kind === "obj") return j.o.dead || !tidyable(j.o);
  if (j.kind === "cloud") return j.o.dead;
  if (j.kind === "graffiti") return !graffiti.includes(j.g);
  if (j.kind === "tp") return !tpTrails.includes(j.tr);
  if (j.kind === "jam") return !j.sp.jammed;
  if (j.kind === "sign") return j.rec.done;
  if (j.kind === "closet") return false;
  return !j.sp.closed;
}
const jobKey = (j) => j.o ?? j.g ?? j.tr ?? j.rec ?? (j.kind === "closet" ? "closet" : j.sp);
const needsSigns = (j) => j.kind === "cloud" || j.kind === "flood" || (j.kind === "obj" && CFG.custodian.signsFor.includes(j.o.key));
function finishJob(st, j) {
  if (j.kind === "sign") { if (!finishSignJob(st, j)) return false; return true; }
  collectSigns(j.o ?? j.sp);
  if (j.kind === "obj" || j.kind === "cloud") removeObject(j.o);
  else if (j.kind === "graffiti") { const i = graffiti.indexOf(j.g); graffiti.splice(i, 1); scene.remove(j.g.mesh); j.g.mesh.material.map.dispose(); j.g.mesh.material.dispose(); }
  else if (j.kind === "tp") { dropTrail(j.tr); tpTrails.splice(tpTrails.indexOf(j.tr), 1); }
  else if (j.kind === "jam") { unjam(j.sp); toast(`The custodian pulls the mop out of room ${j.sp.room}'s door.`); }
  else if (j.kind === "closet") { st.closetCD = rand(...CFG.closet.visitEverySec); return; }
  else { j.sp.closed = false; if (j.sp.puddle) j.sp.puddle.visible = false; if (player.hidden !== j.sp) toast("The custodian mopped up the flooded restroom. It's open again."); }
  bark(st, "tidy", true);
}
function radioIn(st) {
  const C = CFG.custodian;
  const free = staff.filter((o) => chaser(o) && o.state !== "chase" && o.state !== "bust" && o.stunT <= 0)
    .sort((a, b) => Math.hypot(a.x - player.x, a.z - player.z) - Math.hypot(b.x - player.x, b.z - player.z)).slice(0, C.radioStaff);
  for (const o of free) { o.state = "search"; o.searchT = -8; o.suspicion = 0.6; o.lastX = o.tx = player.x + rand(-2, 2); o.lastZ = o.tz = player.z + rand(-2, 2); }
  bark(st, "radio", true); playBlip([1400, 1100, 1400], 0.05, "square", 0.05);
  toast(free.length ? `The custodian radios it in. ${free.length === 1 ? "Someone's" : "Staff are"} on the way!` : "The custodian radios it in, but nobody answers.", 2.4);
  addHeat(C.radioHeat);
}
function updateCustodian(st, dt, cover, stuck) {
  const T = st.type, C = CFG.custodian, D = CFG.detection;
  const look = canSeePlayer(st, 1, true);
  if (look.seen) st.suspicion += noticeRate(st, look.d, cover) * dt;
  else st.suspicion = Math.max(0, st.suspicion - D.decayRate * dt);
  st.radioCD = Math.max(0, (st.radioCD ?? 0) - dt);
  if (st.suspicion >= 1) { st.suspicion = 0.4; if (st.radioCD <= 0) { st.radioCD = C.radioCooldownSec; radioIn(st); } }
  if (stuck) return 0;
  // his closet: if you're hiding in it when he gets there, you're found
  const cl = player.hidden?.kind === "closet" ? player.hidden : null;
  if (cl) { const f = spotFront(cl, {}); if (Math.hypot(f.x - st.x, f.z - st.z) < CFG.closet.foundRange) {
    exitSpot(true, `The custodian opens his closet: "HEY! Out of my closet!"`); radioIn(st); st.job = null; } }
  st.closetCD = (st.closetCD ?? rand(...CFG.closet.visitEverySec)) - dt;
  const sus = st.suspicion > 0.05;
  if (sus) st.facing = lerpAngle(st.facing, Math.atan2(player.x - st.x, player.z - st.z), damp(5, dt));
  const speed = T.patrolSpeed * staffMult("speed") * (sus ? 0.3 : 1);
  st.jobScanT = (st.jobScanT ?? 0) - dt;
  if (st.job && jobGone(st.job)) st.job = null;
  if (st.job?.kind !== "sign") { const sj = signJob(st); if (sj) { st.job = sj; st.workT = 0; if (performance.now() > st.barkUntil) { st.bubble.textContent = "HEY! Where's my sign?!"; st.barkUntil = performance.now() + 2000; } } }
  if (st.job?.kind === "sign") { const at = st.job.rec.obj && !st.job.rec.obj.dead ? st.job.rec.obj : player; st.job.x = at.x; st.job.z = at.z; st.job.reach = st.job.rec.obj ? 0.9 : 1.2; }
  if (!st.job && st.jobScanT <= 0) {   // the nearest mess nobody else is on
    st.jobScanT = 0.6;
    const taken = new Set(staff.filter((o) => o !== st && o.job).map((o) => jobKey(o.job)));
    let best = null, bd = Infinity;
    for (const j of custodianJobs()) {   // (only on his own floor)
      if (taken.has(jobKey(j)) || floorOf(j.x) !== st.homeFloor) continue;
      const d = Math.hypot(j.x - st.x, j.z - st.z); if (d < bd) { bd = d; best = j; }
    }
    if (!best && st.closetCD <= 0 && CLOSETS.length) {   // nothing to clean: back to his closet for a bit
      const cl2 = CLOSETS.find((c) => spotFloor(c) === st.homeFloor) ?? CLOSETS[0], f = spotFront(cl2, {});
      best = { kind: "closet", sp: cl2, x: f.x, z: f.z, sec: 2.5, reach: 0.9 };
    }
    st.job = best; st.workT = 0;
  }
  if (st.job) {
    const j = st.job; st.offHall = true;
    if (navToward(st, j.x, j.z, j.kind === "sign" ? speed * 1.5 : speed, dt) < j.reach) {
      if (st.workT === 0 && needsSigns(j)) putOutSigns(st, j);
      if (!sus) st.facing = lerpAngle(st.facing, j.kind === "graffiti" ? Math.atan2(j.g.side * HALLS[j.g.h].nx, j.g.side * HALLS[j.g.h].nz) : st.facing, damp(4, dt));
      st.workT += dt;
      if (st.workT >= j.sec) { if (finishJob(st, j) !== false) st.job = null; else st.workT = 0; }
      return 0;
    }
    if (!sus) st.facing = lerpAngle(st.facing, Math.atan2(j.x - st.x, j.z - st.z), damp(4, dt));
    return speed;
  }
  // nothing to clean: wander the halls
  st.roamT -= dt; if (st.roamT <= 0) { st.roamT = rand(...T.roamTurnSec); if (Math.random() < 0.5) st.to = otherEnd(st.h, st.to); }
  if (st.offHall) {   // back to the middle of the hall first
    const pr = hallProject(st.x, st.z), c = hallPos(pr.h, pr.t, 0);
    st.h = pr.h; st.t = pr.t; if (st.to !== HALLS[pr.h].a && st.to !== HALLS[pr.h].b) st.to = HALLS[pr.h].b;
    if (moveToward(st, c.x, c.z, speed, dt) < 0.3) st.offHall = false;
    return speed;
  }
  walk(st, speed * dt, randomOnward);
  hallPos(st.h, st.t, 0, st);
  if (!sus) st.facing = lerpAngle(st.facing, hallHeading(st.h, st.to === HALLS[st.h].b ? 1 : -1) + Math.sin(st.sweep) * (T.sweepDeg * Math.PI / 180), damp(3, dt));
  return speed;
}
// kids pocket the fun stuff they find lying around
let kidGrabT = 0;
function kidsGrab(dt) {
  if ((kidGrabT -= dt) > 0) return;
  kidGrabT = 0.4;
  const C = CFG.custodian;
  for (const o of objects) {
    if (o.dead || o.state !== "resting" || !kidsWant(o)) { if (o.state !== "resting") o.restSince = null; continue; }
    o.restSince ??= o.age;
    if (o.age - o.restSince < C.kidGrabAfterSec) continue;
    if (crowd.some((c) => isActive(c) && c.slipT <= 0 && Math.hypot(c.x - o.x, c.z - o.z) < C.kidGrabRange)) {
      removeObject(o);
      if (Math.hypot(o.x - player.x, o.z - player.z) < 14) popup(`A kid grabs the ${o.T.label.toLowerCase()}`, "meh");
    }
  }
}

// ---- staff tidying up: they walk over to things lying around and pick them up ----
function claimedBy(o) { return staff.find((s) => s.state === "tidy" && s.tidyObj === o) ?? null; }
function setTidy(st, o, wait = 0) { if (st.type.stationary) return; st.state = "tidy"; st.tidyObj = o; st.tidyT = -wait; }
// what staff notice: anything lying around, except traps nobody has set off yet
function tidyable(o) {
  if (o.dead || o.wild) return false;
  if (o.state === "trap") return o.slips > 0 || !!o.T.mess;
  if (o.state === "sign") return false;   // the custodian's signs: he collects them himself
  if (o.state === "resting") return !o.T.trap || o.popped;
  return o.state === "pickup";
}
function findTidy(st) {
  const T = st.type, R = CFG.tidy.noticeRange, half = (T.visionHalfAngleDeg * Math.PI) / 180;
  let best = null, bd = R;
  for (const o of objects) {
    if (!tidyable(o)) continue;
    const dx = o.x - st.x, dz = o.z - st.z, d = Math.hypot(dx, dz);
    if (d >= bd || Math.abs(angDiff(st.facing, Math.atan2(dx, dz))) > half || !lineOfSight(st.x, st.z, o.x, o.z) || claimedBy(o)) continue;
    bd = d; best = o;
  }
  return best;
}

// who: a staff member or a student. Returns true if it counted (each thing hits each person once).
function hitPerson(o, who, isStaff) {
  const Hh = o.T.hit;
  o.hitSet ??= new Set();
  if (o.hitSet.has(who)) return false;
  o.hitSet.add(who);
  dareEvent("hit", { item: o.key, staff: isStaff ? who.key : null, chasing: isStaff && who.state === "chase" });
  if (isStaff) {
    stunStaff(who, Hh.staffSec, Hh.style);
    // a stagger leaves them looking your way; a fall gives you time to get away
    if (Hh.style === "flinch") { who.suspicion = Math.max(who.suspicion, 0.6); who.distractT = 1.5; who.dX = player.x; who.dZ = player.z; }
    bark(who, "slip", true);
    playBlip([700, 300], 0.1, "sawtooth", 0.07);
    havoc(o.key + "Staff", Hh.staff, `${o.T.label} hits the ${who.type.name}!${o.T.hitLine ? " Ew!" : ""}`, { x: o.x, z: o.z, loud: Hh.style === "fall" });
  } else {
    who.slipT = Math.max(who.slipT, Hh.studentSec); who.stunStyle = Hh.style;
    kidSay(who, o.T.junk ? KID_LINES.gross : KID_LINES.hit, 2);
    havoc(o.key + "Student", Hh.student, o.T.hitLine ? o.T.hitLine : o.key === "spitball" ? "Spitball! Ew!" : o.key === "mentos" ? "Soaked!" : `${o.T.label} hits a kid!`, { x: o.x, z: o.z });
  }
  return true;
}
// first person within reach of a thrown thing (students: r, staff: r + 0.05), or null
function personHit(o, r, maxY) {
  if (o.y > maxY) return null;
  for (const st of staff) if (!(o.hitSet?.has(st)) && Math.hypot(st.x - o.x, st.z - o.z) < r + 0.05) return { who: st, isStaff: true };
  for (const c of crowd) if (isActive(c) && !(o.hitSet?.has(c)) && Math.hypot(c.x - o.x, c.z - o.z) < r) return { who: c, isStaff: false };
  return null;
}

// The paper airplane's two-stage flight (not realistic on purpose): it climbs and soars over heads,
// then drops to head height and glides low, where it can hit people. Shared by the real flight and the arc preview.
function initPlane(o, power, T = ITEM_TYPES.paperAirplane) { o.stage = 1; o.stageT = T.highSec[0] + (T.highSec[1] - T.highSec[0]) * power; }
function planeStep(o, dt, T = ITEM_TYPES.paperAirplane) {
  o.stageT -= dt;
  if (o.stage === 1 && o.stageT <= 0) o.stage = 2;
  if (o.stage === 1) o.vy = (T.cruiseY - o.y) * (T.climb ?? 4);
  else if (o.stage === 2) o.vy = o.y > T.lowY + 0.12 ? -3.2 : -T.sinkRate;
  else o.vy = -2.5;   // stage 3: hit a wall, falling
  const k = Math.exp(-T.drag * dt); o.vx *= k; o.vz *= k;
}

function flyObject(o, dt) {
  const T = o.T;
  const plane = T.flight === "glide2" && !o.wild;
  if (plane) planeStep(o, dt, T);
  else { o.vy -= T.gravity * dt; if (T.glide) o.vy = Math.max(o.vy, -0.9); }
  if (wallBounce(o, dt, T.bounces ? 0.8 : 0.15)) {
    if (o.key === "plunger") { stickPlungerToWall(o); return; }
    if (T.bounces) bounceNoise(o);
    else if (plane) o.stage = 3;
    else if (T.glide) o.vy = Math.min(o.vy, -2.5);
  }
  o.x += o.vx * dt; o.z += o.vz * dt; o.y += o.vy * dt;
  if (o.y > LAYOUT.wallHeight - 0.2) { o.y = LAYOUT.wallHeight - 0.2; o.vy = -Math.abs(o.vy) * 0.5; }
  if (plane) {
    if (o.y > 2.0) { for (const c of crowd) if (isActive(c) && Math.hypot(c.x - o.x, c.z - o.z) < 1.3) o.flown.add(c); }   // high: flying over
    else if (o.stage >= 2) { const p = personHit(o, 0.5, 1.9); if (p) { hitPerson(o, p.who, p.isStaff); landObject(o); return; } }   // low: can hit
  }
  if (o.trail && o.stage !== 3) growTrail(o);
  if (o.key === "frisbee") o.mesh.rotation.y += dt * 14;   // spinning
  if (o.key === "slime") {   // splat on whoever it hits: they're standing in it
    const p = personHit(o, 0.45, 2.0);
    if (p) { o.x = p.who.x; o.z = p.who.z; o.y = REST_Y.slime; landObject(o); return; }
  }
  if (o.key === "plunger") {
    const p = personHit(o, 0.45, 2.3);
    if (p) { plungerHit(o, p.who, p.isStaff); return; }
  }
  if (o.key === "spitball") {
    const p = personHit(o, 0.45, 2.1);
    if (p) { hitPerson(o, p.who, p.isStaff); removeObject(o); return; }
  }
  if (T.direct && !o.hitSet?.size) {   // sock, sandwich: hits the first person, then drops
    const p = personHit(o, 0.45, 2.1);
    if (p) { hitPerson(o, p.who, p.isStaff); o.vx *= -0.15; o.vz *= -0.15; o.vy = Math.min(o.vy, 0); }
  }
  if (T.bounces && T.hit && Math.hypot(o.vx, o.vz) > T.hit.minSpeed) {
    const p = personHit(o, 0.5, 1.6);
    if (p && hitPerson(o, p.who, p.isStaff)) { o.vx *= -0.35; o.vz *= -0.35; bounceNoise(o); }   // bounces off them and keeps going
  }
  const r = REST_Y[o.key] ?? 0.04;
  if (o.y <= r) {
    o.y = r;
    if (T.bounces && o.bounces < o.maxBounces && Math.abs(o.vy) > 1.2) {
      const rest = Array.isArray(T.restitution) ? rand(...T.restitution) : T.restitution;
      o.vy = -o.vy * rest; o.bounces++;
      if (T.erratic) {   // a football: every bounce sends it off somewhere new
        const a = rand(-T.erratic, T.erratic), c = Math.cos(a), sn = Math.sin(a), vx = o.vx;
        o.vx = vx * c - o.vz * sn; o.vz = vx * sn + o.vz * c;
        o.vx *= rand(0.6, 1.1); o.vz *= rand(0.6, 1.1);
      }
      bounceNoise(o);
    }
    else landObject(o);
  }
}
function landObject(o) {
  const T = o.T;
  o.vy = 0;
  if (!T.bounces) o.vx = o.vz = 0;
  switch (o.key) {
    case "paperAirplane": case "toiletPaper": case "frisbee": {
      const n = o.flown.size, near = crowd.filter((c) => isActive(c) && Math.hypot(c.x - o.x, c.z - o.z) < 2.5).length;
      const crowdLand = near >= T.crowdLandCount, name = { paperAirplane: "Airplane", toiletPaper: "TP", frisbee: "Frisbee" }[o.key];
      if (o.wild) { o.wild = false; o.state = "resting"; o.mesh.rotation.set(0, o.mesh.rotation.y, 0); capLying(); break; }   // step 82: lies there to pick up
      if (n) havoc(o.key, n * T.perStudent + (crowdLand ? T.crowdLandBonus : 0), `${name} over ${n} kid${n === 1 ? "" : "s"}${crowdLand ? " · crowd landing!" : ""}`, { x: o.x, z: o.z });
      else if (!o.hitSet?.size && !o.trail) popup(`The ${T.label.toLowerCase()} lands. Nobody notices.`, "meh");
      if (o.trail) finishTrail(o);
      dareEvent("flyover", { n }); tally("flyover", n);
      if (o.key === "frisbee" || o.key === "paperAirplane") { o.state = "resting"; o.mesh.rotation.set(0, o.mesh.rotation.y, 0); break; }   // pick it back up (or a kid will)
      o.state = "spent"; o.life = o.trail ? 0.6 : 1.5; break;
    }
    case "mentos": o.state = "fuse"; o.fuseT = o.T.fuseSec; o.vx = o.vz = 0; o.mesh.rotation.set(0, 0, 0); playBlip([900, 1100], 0.05, "sine", 0.03); break;
    case "slime": o.state = "trap"; breakFlask(o, o.T.radius); break;   // the flask smashes: a puddle (as wide as T.radius)
    case "spitball": o.state = "spent"; o.life = 0.4; break;
    case "bananaPeel": o.state = "trap"; o.mesh.rotation.y = Math.random() * 6; break;
    case "mopBucket": {   // tipped over: a puddle
      o.state = "trap"; const u = o.mesh.userData; u.bucket.rotation.z = Math.PI / 2; u.bucket.position.y = 0.18;
      u.puddle.visible = true; u.puddle.scale.setScalar(o.T.trapRadius); playBlip([300, 200, 150], 0.12, "sine", 0.08);
      havoc("mopBucket", 40, "Splash! The mop bucket goes over", { x: o.x, z: o.z, loud: true }); makeNoise(o.x, o.z, 8, false); break;
    }
    case "whoopee": o.state = "resting"; o.armedAt = o.age + 0.4; break;   // waits for someone to step on it
    case "basketball": case "football": o.state = "rolling"; break;
    case "stinkBomb": popStinkBomb(o); break;
    case "glitterBomb": popFog(o); break;
    case "rubberChicken": o.state = "resting"; squawk(o); break;
    default: o.state = "resting";
  }
  capLying();
}
function rollObject(o, dt) {
  const k = Math.exp(-1.6 * dt); o.vx *= k; o.vz *= k;
  wallBounce(o, dt, 0.7);
  o.x += o.vx * dt; o.z += o.vz * dt; o.y = REST_Y[o.key] ?? 0.04;
  o.mesh.rotation.x += Math.hypot(o.vx, o.vz) * dt * 4;
  if (o.T.hit && Math.hypot(o.vx, o.vz) > o.T.hit.minSpeed) {   // a fast-rolling ball still knocks people over
    const p = personHit(o, 0.5, 1);
    if (p && hitPerson(o, p.who, p.isStaff)) { o.vx *= -0.35; o.vz *= -0.35; }
  }
  if (Math.hypot(o.vx, o.vz) < 0.25) { o.state = "resting"; capLying(); }
}
// ---- band room ----
const rollSpeed = (T, power) => T.speed[0] + (T.speed[1] - T.speed[0]) * power;
function rollDrum(key, L) {
  const T = ITEM_TYPES[key], sp = rollSpeed(T, L.power);
  const o = spawnObject(key, "drum", player.x + L.dx * 0.9, REST_Y[key], player.z + L.dz * 0.9, { vx: L.dx * sp, vz: L.dz * sp });
  collide(o, T.ballR ?? 0.45);
  o.mesh.rotation.y = Math.atan2(L.dx, L.dz);
  playBlip([70, 55], 0.18, "sine", 0.12);   // boom
}
// it rolls on (slowly losing speed), bounces off walls, and bowls over everyone in its path
function drumRoll(o, dt) {
  const T = o.T, k = Math.exp(-T.friction * dt); o.vx *= k; o.vz *= k;
  let bonk = false;   // bounce off walls at the drum's own size (wallBounce is for small things)
  for (const ax of ["x", "z"]) {
    const v = ax === "x" ? o.vx : o.vz; if (Math.abs(v) < 1e-4) continue;
    const reach = Math.abs(v) * dt + (T.ballR ?? 0.45) + 0.01, d = ax === "x" ? raycast(o.x, o.z, Math.sign(v), 0, reach) : raycast(o.x, o.z, 0, Math.sign(v), reach);
    if (d < reach) { if (ax === "x") o.vx = -o.vx * 0.55; else o.vz = -o.vz * 0.55; bonk = true; }
  }
  if (bonk) { playBlip([60, 45], 0.15, "sine", 0.1); makeNoise(o.x, o.z, T.noiseRadius, false); }
  o.x += o.vx * dt; o.z += o.vz * dt; o.y = REST_Y[o.key];
  const sp = Math.hypot(o.vx, o.vz);
  if (sp > 0.05) o.mesh.rotation.y = Math.atan2(o.vx, o.vz);
  if (T.upright) { for (const a of o.mesh.userData.arms) a.rotation.x = Math.sin(o.age * 9) * Math.min(0.5, sp * 0.12); skeletonCheck(o); }   // arms rattle as it rolls
  else o.mesh.userData.pivot.rotation.x += (sp * dt) / (T.ballR ?? 0.45);
  o.rumbleT = (o.rumbleT ?? 0) - dt;
  if (o.rumbleT <= 0 && sp > 1) { o.rumbleT = T.rumbleSec; playBlip([48], 0.12, "sine", 0.05); makeNoise(o.x, o.z, T.noiseRadius, false); }
  if (T.hit && sp > T.hit.minSpeed) {
    let p;
    while ((p = personHit(o, T.radius - 0.1, 2))) {
      if (!hitPerson(o, p.who, p.isStaff)) continue;
      if (T.single) { o.vx *= -0.15; o.vz *= -0.15; break; }   // the globe: one person, then it stops dead
      o.vx *= 0.88; o.vz *= 0.88;   // the drum barely slows down
    }
  }
  if (sp < 0.3) { o.vx = o.vz = 0; o.state = "resting"; if (T.upright) { for (const a of o.mesh.userData.arms) a.rotation.x = 0; skeletonScare(o); } capLying(); }
}
// ---- step 69: the skeleton on wheels ----
const SCARE_LINES = ["AAAAHH!", "SKELETON!", "NOPE NOPE NOPE", "IT'S ALIVE!", "*screams*"];
function skeletonCheck(o) {
  if (o.scared) return;
  const R = o.T.triggerRange, near = (w) => Math.hypot(w.x - o.x, w.z - o.z) < R;
  if (staff.some((st) => !st.type.custodian && near(st)) || crowd.some((c) => isActive(c) && near(c))) skeletonScare(o);
}
function skeletonScare(o) {
  if (o.scared) return;
  o.scared = true; o.popped = true;   // from now on it's just a prop (the custodian wheels it away)
  const T = o.T, inR = (w) => Math.hypot(w.x - o.x, w.z - o.z) < T.scareRadius;
  if (game.skeletonWise) {   // they've seen it already
    const st = staff.filter((s) => inR(s) && s.stunT <= 0)[0];
    if (st) { st.bubble.textContent = pick(["Nice try.", "Not falling for that twice.", "Hi, Mr. Bones."]); st.barkUntil = performance.now() + 2000; st.barkAt = game.time; }
    popup("💀 Nobody falls for it twice.", "meh"); return;
  }
  game.skeletonWise = true;
  playBlip([880, 1320, 660, 1480], 0.09, "sawtooth", 0.08);
  let nStaff = 0, nKids = 0;
  for (const st of staff) {
    if (!inR(st) || st.penned || st.plungerT > 0) continue;
    if (!chaser(st)) {   // teachers at their doors and the custodian just jump out of their skin
      stunStaff(st, T.scareSec * 0.5, "flinch"); st.bubble.textContent = pick(SCARE_LINES); st.barkUntil = performance.now() + 2200; st.barkAt = game.time; nStaff++; continue;
    }
    const d = Math.hypot(st.x - o.x, st.z - o.z) || 1;
    st.fleeT = T.scareSec; st.fleeDX = (st.x - o.x) / d; st.fleeDZ = (st.z - o.z) / d; st.stunT = 0; st.stuckT = 0;
    if (st.state === "chase" || st.state === "bust" || st.state === "search") st.state = "search";
    st.suspicion = 0; st.bubble.textContent = pick(SCARE_LINES); st.barkUntil = performance.now() + 2200; st.barkAt = game.time;
    nStaff++;
  }
  const until = game.time + T.scareSec;
  for (const c of crowd) {
    if (!isActive(c) || !inR(c) || c.mode === "toClass" || c.mode === "gone") continue;
    const d = Math.hypot(c.x - o.x, c.z - o.z) || 1, pr = hallProject(c.x + ((c.x - o.x) / d) * 9, c.z + ((c.z - o.z) / d) * 9), [lo, hi] = latLimits(pr.h, pr.t);
    c.mode = "gather"; c.gather = { h: pr.h, t: pr.t, lat: clamp(pr.lat, lo, hi), done: () => game.time > until, speed: 2.4 };
    if (nKids++ < 3) kidSay(c, KID_LINES.scared, 2.2);
  }
  makeNoise(o.x, o.z, T.noiseRadius, false);
  havoc("skeleton", T.points + nStaff * T.staffPoints + nKids * T.studentPoints,
        nStaff || nKids ? `💀 SKELETON! ${[nStaff && plural(nStaff, "staff member"), nKids && plural(nKids, "kid")].filter(Boolean).join(" and ")} run for it` : "💀 The skeleton rolls to a stop. Nobody's around to see it.",
        { x: o.x, z: o.z, loud: true });
  tally("skeletonScared", nStaff + nKids);
  dareEvent("skeleton", { staff: nStaff, kids: nKids });
}
// a scared staff member runs away from it, then goes back to what they were doing
function fleeStep(st, dt) {
  st.fleeT -= dt;
  const ox = st.x, oz = st.z, sp = (st.type.chaseSpeed ?? 3.5) * 1.1;
  moveToward(st, st.x + st.fleeDX * 3, st.z + st.fleeDZ * 3, sp, dt);
  if (Math.hypot(st.x - ox, st.z - oz) < sp * dt * 0.3) { const a = Math.atan2(st.fleeDX, st.fleeDZ) + (Math.random() < 0.5 ? 1.6 : -1.6); st.fleeDX = Math.sin(a); st.fleeDZ = Math.cos(a); }   // a wall: turn down the hall
  st.mesh.position.set(st.x, Math.abs(Math.sin(game.time * 14)) * 0.07, st.z); st.mesh.rotation.y = st.facing; st.mesh.rotation.z = 0;
  animateKid(st.mesh, sp, dt); st.mesh.userData.eyes.scale.y = 1.4;
  updateCone(st);
  if (st.fleeT <= 0) { st.fleeT = 0; st.mesh.userData.eyes.scale.y = 1; if (chaser(st)) { st.state = "return"; setReturnPoint(st); } }
}
// one big blast: points, a little heat, and every free staff member heads for where you're standing
function playTrumpet() {
  const T = ITEM_TYPES.trumpet;
  playBlip([233, 233, 311, 233, 175, 175], 0.17, "sawtooth", 0.14);
  const n = summonStaff(player.x, player.z);
  banner(`🎺 BWAAAMP!<small>${n ? `${n} staff member${n === 1 ? "" : "s"} heard that. Get moving!` : "Nobody's around to hear it. Shame."}</small>`, 2.4);
  havoc("trumpet", T.points, "Trumpet solo!", { x: player.x, z: player.z, loud: true }); dareEvent("trumpet");
  for (const c of crowd) if (isActive(c) && Math.hypot(c.x - player.x, c.z - player.z) < 6) { c.slipT = Math.max(c.slipT, 0.5); c.stunStyle = "flinch"; }   // kids jump
}
function summonStaff(x, z) {
  let n = 0;
  for (const o of staff) {
    if (!chaser(o) || o.state === "chase" || o.state === "bust" || floorOf(o.x) !== floorOf(x)) continue;   // (only your floor hears it)
    const d = Math.hypot(o.x - x, o.z - z);
    o.state = "search"; o.searchT = -Math.min(18, d / (o.type.chaseSpeed * 0.8)); o.suspicion = Math.max(o.suspicion, 0.6);
    o.lastX = o.tx = x; o.lastZ = o.tz = z; n++;
  }
  return n;
}
function bounceNoise(o) {
  playFootstep(o.x, o.z, true);
  const pts = Math.round(o.T.bouncePoints * scoreMult());
  game.score += pts; popup(`+${pts} bounce`, "small");
  makeNoise(o.x, o.z, o.T.noiseRadius, false, o);
}
function cushionNoise(o, who) {
  if (o.noiseCD > 0) return;
  o.noiseCD = 3;
  playBlip([95, 70, 110, 60], 0.09, "sawtooth", 0.1);   // pfffft
  const label = who === "player" ? "PFFFT! You sat on your own cushion" : who?.type ? `PFFFT! The ${who.type.name} steps on it` : "PFFFT! A kid steps on it";
  havoc("whoopee", o.T.points, label, { x: o.x, z: o.z, loud: true });
  o.popped = true;   // now staff notice it lying there
  dareEvent("whoopee", { staff: who?.type ? who.key : null });
  if (who?.type) bark(who, "slip", true);
  o.mesh.scale.y = 0.35;   // deflated: it won't go off again until you pick it up and set it again
  makeNoise(o.x, o.z, o.T.noiseRadius, true, who?.type ? who : null);
}
// Goes off when anyone steps on it: staff, a student, or you (then the staff come to see who it was).
function stepOnCushion(o) {
  if (o.age < (o.armedAt ?? 1) || o.noiseCD > 0 || o.popped) return;   // (not while someone's coming to pick it up)
  const on = (x, z, r) => Math.hypot(x - o.x, z - o.z) < r;
  const st = staff.find((s) => chaser(s) && on(s.x, s.z, 0.55));
  if (st) { cushionNoise(o, st); return; }
  if (crowd.some((c) => isActive(c) && on(c.x, c.z, 0.5))) { cushionNoise(o, null); return; }
  if (!player.hidden && on(player.x, player.z, 0.45)) cushionNoise(o, "player");
}
// A noise: staff nearby either come to investigate (pull) or just turn and look.
function makeNoise(x, z, radius, pull, except = null) {
  for (const st of staff) {
    const d = Math.hypot(st.x - x, st.z - z);
    if (st === except || d > radius || st.state === "chase" || st.state === "bust" || st.stunT > 0) continue;
    if (pull && chaser(st)) {
      st.state = "search"; st.searchT = -Math.min(8, d / (st.type.chaseSpeed * 0.8));
      st.lastX = st.tx = x; st.lastZ = st.tz = z; st.suspicion = Math.max(st.suspicion, 0.3);
    } else { st.distractT = 2.2; st.dX = x; st.dZ = z; }
  }
}
// Anyone who steps on it slips (each person once). It stays down until a staff member slips on it
// (they pick it up once they're back on their feet) or it's been slipped on maxSlips times.
function trapCheck(o) {
  const T = o.T;
  o.hitSet ??= new Set();
  const slipped = (who) => {
    o.hitSet.add(who);
    if (++o.slips >= T.maxSlips) removeObject(o);
    return o.dead;
  };
  for (const st of staff) {
    if (!chaser(st) || st.stunT > 0 || o.hitSet.has(st) || Math.hypot(st.x - o.x, st.z - o.z) > (T.trapRadius ?? 0.5) + 0.05) continue;   // (the custodian steps around it)
    dareEvent("hit", { item: o.key, staff: st.key, chasing: st.state === "chase" || st.state === "bust", slip: true });
    stunStaff(st, T.slipStaffSec, "fall"); bark(st, "slip", true);
    playBlip([700, 300], 0.12, "sawtooth", 0.07);
    havoc(o.key + "Staff", T.staffPoints, `Wipeout! The ${st.type.name} slips`, { x: o.x, z: o.z, loud: true });
    if (slipped(st)) return;
  }
  for (const c of crowd) {
    if (!isActive(c) || c.slipT > 0 || o.hitSet.has(c) || Math.hypot(c.x - o.x, c.z - o.z) > (T.trapRadius ?? 0.45)) continue;
    c.slipT = T.slipStudentSec; c.stunStyle = "fall"; kidSay(c, KID_LINES.slip, 2);
    havoc(o.key + "Student", T.studentPoints, "A kid slips!", { x: o.x, z: o.z });
    if (slipped(c)) return;
  }
  if (o.age > 1.2 && !player.hidden && !player.ride && player.slipT <= 0 && !o.hitSet.has(player) && Math.hypot(player.x - o.x, player.z - o.z) < (T.trapRadius ?? 0.45)) {
    player.slipT = T.slipPlayerSec; toast(o.key === "mopBucket" ? "You slip in your own puddle!" : o.key === "mentos" ? "You slip in the fizzy puddle!" : "You slipped on your own banana peel!");
    slipped(player);
  }
}

// ---- slime: the first few people to step in it are stuck (staff can still look around and yell) ----
function slimeCheck(o) {
  const T = o.T;
  o.hitSet ??= new Set();
  const near = (x, z) => Math.hypot(x - o.x, z - o.z) < T.radius;
  const stuck = (who) => { o.hitSet.add(who); if (++o.slips >= T.maxSticks) o.spentAt ??= o.age; };
  if (o.slips >= T.maxSticks) { if (o.age - o.spentAt > 0.2 && !claimedBy(o)) removeObject(o); return; }   // all used up (unless someone's coming to clean it)
  for (const st of staff) {
    if (!chaser(st) || o.hitSet.has(st) || !near(st.x, st.z)) continue;   // (the custodian's boots are slime-proof)
    dareEvent("hit", { item: "slime", staff: st.key, chasing: st.state === "chase" });
    st.stuckT = T.stickStaffSec;
    st.bubble.textContent = pick(["I'm STUCK!", "Is this... SLIME?!", "Ugh, my shoes!"]); st.barkUntil = performance.now() + 1800; st.barkAt = game.time;
    playBlip([220, 160, 240], 0.1, "sine", 0.08);   // squelch
    havoc("slimeStaff", T.staffPoints, `Slimed! The ${st.type.name} is stuck`, { x: o.x, z: o.z, loud: true });
    stuck(st);
    if (o.slips >= T.maxSticks) return;
  }
  for (const c of crowd) {
    if (!isActive(c) || o.hitSet.has(c) || !near(c.x, c.z)) continue;
    c.slipT = T.stickStudentSec; c.stunStyle = "stuck"; kidSay(c, KID_LINES.stuck, 2.4);
    havoc("slimeStudent", T.studentPoints, "A kid's stuck in the slime!", { x: o.x, z: o.z });
    stuck(c);
    if (o.slips >= T.maxSticks) return;
  }
  if (o.age > 1.2 && !player.hidden && !player.ride && player.stuckT <= 0 && !o.hitSet.has(player) && near(player.x, player.z)) {
    player.stuckT = T.stickPlayerSec; toast("Ew! You stepped in your own slime.");
    stuck(player);
  }
}
// toilet paper: a streamer laid along its flight path. It drifts down like a light rope (a little chain of points with
// gravity), lands on the floor, or snags on whatever it falls onto (locker tops, the trophy case, the banner wires) and
// hangs from there. It stays until the custodian clears it overnight.
const TP = { gravity: 3.4, damping: 0.97, floorY: 0.015, slack: 1.12, iters: 6, settleSec: 6, width: 0.15, maxTrails: 8 };
const tpTrails = [];   // every streamer up today (each one: points, rest lengths, mesh)
const tpMat = new THREE.MeshBasicMaterial({ color: 0xf4f4ee, side: THREE.DoubleSide });
// how high something under (x, z) would hold the paper up: 0 for the bare floor
function tpSupport(x, z) {
  const pr = hallProject(x, z), H = HALLS[pr.h];
  let s = 0;
  for (const b of BANNERS) if (b.h === pr.h && Math.abs(pr.t - b.t) < 0.3) s = Math.max(s, b.wireY);
  const side = pr.lat >= 0 ? 1 : -1, fromWall = Math.abs(wallLat(pr.h, side)) - Math.abs(pr.lat);   // distance out from the wall
  for (const ob of OBSTACLES) if (ob.h === pr.h && ob.side === side && Math.abs(pr.t - ob.t) < ob.halfLen + 0.1 && fromWall < ob.depth + 0.15) s = Math.max(s, ob.height);
  if (H.outerSide === side && fromWall < 0.2) {   // the row of lockers along the outer wall (and the hide lockers, a bit taller)
    const hide = LAYOUT.hideLockers.some((l) => l.h === pr.h && Math.abs(l.t - pr.t) < 0.5);
    const gap = [...LAYOUT.restrooms, ...LAYOUT.closets, ...LAYOUT.stairs].some((r) => r.h === pr.h && Math.abs(r.t - pr.t) < 1.2) || (LAYOUT.entrance.h === pr.h && Math.abs(LAYOUT.entrance.t - pr.t) < 2);
    if (hide) s = Math.max(s, 2.1); else if (!gap) s = Math.max(s, 2.0);
  }
  return s;
}
function newTrail(o) {
  const tr = { pts: [], rest: [], mesh: null, o, t: 0, done: false };
  for (let k = 0; k < 2; k++) tr.pts.push({ x: o.x, y: o.y, z: o.z, px: o.x, py: o.y, pz: o.z, held: false });   // the loose end, and the roll
  tr.rest.push(0);
  tpTrails.push(tr);
  while (tpTrails.length > TP.maxTrails) dropTrail(tpTrails.shift());
  return tr;
}
function dropTrail(tr) { if (tr.mesh) { scene.remove(tr.mesh); tr.mesh.geometry.dispose(); tr.mesh = null; } tr.done = true; if (tr.o) tr.o.trail = null; }
// two crossed ribbons along the chain, so it shows from any angle (hanging straight down too)
function trailGeometry(pts) {
  const pos = [], w = TP.width / 2;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1], b = pts[i];
    let dx = b.x - a.x, dy = b.y - a.y, dz = b.z - a.z; const dl = Math.hypot(dx, dy, dz) || 1; dx /= dl; dy /= dl; dz /= dl;
    let ux = dz, uz = -dx, ul = Math.hypot(ux, uz);   // across the paper, level with the floor...
    if (ul < 0.2) { ux = 1; uz = 0; ul = 1; }
    ux /= ul; uz /= ul;
    const vx = dy * uz, vy = dz * ux - dx * uz, vz = -dy * ux;   // ...and at right angles to that
    for (const [cx, cy, cz] of [[ux * w, 0, uz * w], [vx * w, vy * w, vz * w]]) {
      pos.push(a.x - cx, a.y - cy, a.z - cz, a.x + cx, a.y + cy, a.z + cz, b.x - cx, b.y - cy, b.z - cz,
               b.x - cx, b.y - cy, b.z - cz, a.x + cx, a.y + cy, a.z + cz, b.x + cx, b.y + cy, b.z + cz);
    }
  }
  return new THREE.BufferGeometry().setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
}
// the last point rides on the roll; every 35 cm it leaves a new point behind
function growTrail(o) {
  const tr = o.trail, n = tr.pts.length, prev = tr.pts[n - 2];
  const d = Math.hypot(o.x - prev.x, o.y - prev.y, o.z - prev.z);
  tr.rest[n - 2] = Math.max(tr.rest[n - 2], d * TP.slack);
  if (Math.hypot(o.x - prev.x, o.z - prev.z) < 0.35) return;
  tr.pts.push({ x: o.x, y: o.y, z: o.z, px: o.x, py: o.y, pz: o.z, held: false });
  tr.rest.push(0);
}
const rollHolds = (tr) => tr.o && !tr.o.dead && tr.o.state === "flying" && tr.o.stage !== 3;   // let go once it hits a wall
// one physics step for a streamer: gravity, then keep each piece from stretching, then the floor and anything it lands on
function stepTrail(tr, dt) {
  const P = tr.pts, n = P.length, g = TP.gravity * dt * dt, pin = rollHolds(tr) ? P[n - 1] : null;
  for (const p of P) {
    if (p === pin) continue;
    const vx = (p.x - p.px) * TP.damping, vy = (p.y - p.py) * TP.damping, vz = (p.z - p.pz) * TP.damping;
    p.px = p.x; p.py = p.y; p.pz = p.z;
    if (p.snag) { p.x = p.px; p.z = p.pz; p.y = p.snag; continue; }
    if (p.held) { p.x += vx * 0.2; p.z += vz * 0.2; p.y += Math.min(0, vy); }   // on the floor: barely slides
    else { p.x += vx; p.y += (vy > 0 ? vy * 0.4 : vy) - g; p.z += vz; }   // (paper doesn't whip upward much)
    if (p.y > LAYOUT.wallHeight - 0.15) p.y = LAYOUT.wallHeight - 0.15;   // the ceiling
  }
  if (pin) { pin.x = pin.px = tr.o.x; pin.y = pin.py = tr.o.y; pin.z = pin.pz = tr.o.z; }
  for (let k = 0; k < TP.iters; k++) {
    for (let i = 1; i < n; i++) {
      const a = P[i - 1], b = P[i], dx = b.x - a.x, dy = b.y - a.y, dz = b.z - a.z, d = Math.hypot(dx, dy, dz), r = tr.rest[i - 1];
      if (d <= r || d < 1e-6) continue;   // paper doesn't stretch, but it can bunch up
      const w = (p) => (p === pin || p.snag ? 0 : p.held ? 0.15 : 1);   // snagged on something: it stays put
      const wa = w(a), wb = w(b), sum = wa + wb;
      if (!sum) continue;
      const f = (d - r) / d / sum;
      a.x += dx * f * wa; a.y += dy * f * wa; a.z += dz * f * wa;
      b.x -= dx * f * wb; b.y -= dy * f * wb; b.z -= dz * f * wb;
    }
    for (const p of P) {
      if (p === pin) continue;
      if (p.y < TP.floorY) { p.y = TP.floorY; p.held = true; continue; }
      const s = tpSupport(p.x, p.z);
      if (p.snag) { p.y = p.snag; continue; }
      if (s > TP.floorY && p.y < s && p.py >= s - 0.04) { p.y = s + 0.01; p.held = true; p.snag = p.y; tpBanner(tr, p); }   // it came down onto something: snagged
      else if (p.held && p.y > TP.floorY + 0.02 && p.y < s - 0.06) p.held = false;       // pulled off the edge
    }
  }
}
// step 66: TP draped over a spirit banner's wire is worth a bonus (once per banner, per throw)
function tpBanner(tr, p) {
  const pr = hallProject(p.x, p.z), b = BANNERS.find((b) => b.h === pr.h && Math.abs(pr.t - b.t) < 0.3 && p.y > b.wireY - 0.1);
  if (!b || (tr.banners ??= new Set()).has(b)) return;
  tr.banners.add(b); tally("tpBanner"); dareEvent("tpBanner");
  havoc("tpBanner:" + BANNERS.indexOf(b), ITEM_TYPES.toiletPaper.bannerPoints, `TP'd the ${b.text} banner!`, { x: p.x, z: p.z });   // each banner its own trick, so a new one pays in full
}
function updateTrails(dt) {
  for (const tr of tpTrails) {
    if (tr.done) continue;
    if (!rollHolds(tr)) tr.t += dt;
    const sub = 2, h = Math.min(dt, 0.05) / sub;
    for (let k = 0; k < sub; k++) stepTrail(tr, h);
    if (tr.pts.length > 1) {
      if (tr.mesh) { scene.remove(tr.mesh); tr.mesh.geometry.dispose(); }
      tr.mesh = new THREE.Mesh(trailGeometry(tr.pts), tpMat); tr.mesh.frustumCulled = false; scene.add(tr.mesh);
    }
    if (tr.t > TP.settleSec) tr.done = true;   // it's settled: leave the mesh as it is
  }
}
function finishTrail(o) {
  const tr = o.trail; let len = 0;
  for (let i = 1; i < tr.pts.length; i++) len += Math.hypot(tr.pts[i].x - tr.pts[i - 1].x, tr.pts[i].z - tr.pts[i - 1].z);
  tally("tpM", len);
  if (len >= 2) havoc("tpTrail", Math.round(len * o.T.trailPointsPerM), `TP'd ${Math.round(len)} m of hallway!`, { x: o.x, z: o.z });
  o.trailLen = len;
  dareEvent("trail", { len });
  tr.o = null; o.trail = null;
}
function clearTrails() { for (const tr of tpTrails) dropTrail(tr); tpTrails.length = 0; }

// ---- kids crowding round a spot: the n nearest kids in the halls walk over and stand in a ring until done() ----
function gatherKids(x, z, n, radius, ring, done) {
  const picked = crowd.filter((c) => (c.mode === "wander" || c.mode === "toClass") && c.slipT <= 0 && Math.hypot(c.x - x, c.z - z) < radius)
    .sort((a, b) => Math.hypot(a.x - x, a.z - z) - Math.hypot(b.x - x, b.z - z)).slice(0, n);
  picked.forEach((c, i) => {
    const a = (i / picked.length) * Math.PI * 2 + rand(-0.25, 0.25), r = rand(ring[0], ring[1]);
    const pr = hallProject(x + Math.sin(a) * r, z + Math.cos(a) * r), [lo, hi] = latLimits(pr.h, pr.t);
    c.mode = "gather"; c.gather = { h: pr.h, t: pr.t, lat: clamp(pr.lat, lo, hi), done };
  });
  return picked.length;
}

// ---- the "kick me" sign ----
const kickMeTex = (() => {
  const cv = document.createElement("canvas"); cv.width = 128; cv.height = 80; const x = cv.getContext("2d");
  x.fillStyle = "#fff"; x.fillRect(0, 0, 128, 80); x.fillStyle = "#111"; x.textAlign = "center"; x.textBaseline = "middle";
  x.font = "900 30px 'Comic Sans MS', 'Marker Felt', cursive"; x.fillText("KICK", 64, 24); x.fillText("ME", 64, 56);
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; return t;
})();
// staff first (worth more), otherwise the nearest kid
function kickMeTarget() {
  const R = ITEM_TYPES.kickMe.range, d = (o) => Math.hypot(o.x - player.x, o.z - player.z);
  const st = staff.filter((s) => !s.kickMe && d(s) < R).sort((a, b) => d(a) - d(b))[0];
  if (st) return { who: st, isStaff: true };
  const c = crowd.filter((k) => isActive(k) && !k.kickMeT && d(k) < R).sort((a, b) => d(a) - d(b))[0];
  return c ? { who: c, isStaff: false } : null;
}
const kidSigns = [];   // kids wearing a kick-me sign: { c, mesh }
function stickKickMe(slot) {
  const T = ITEM_TYPES.kickMe, tg = kickMeTarget();
  if (!tg) { toast("Sneak right up behind someone to stick it on."); return; }
  consumeSlot(slot);
  if (!tg.isStaff) {   // a kid: stuck in a ring of laughing kids
    const c = tg.who;
    c.kickMeT = T.kidSec; c.slipT = Math.max(c.slipT, T.kidSec); c.stunStyle = "stuck";
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.26), new THREE.MeshBasicMaterial({ map: kickMeTex, side: THREE.DoubleSide }));
    scene.add(mesh); kidSigns.push({ c, mesh });
    const n = gatherKids(c.x, c.z, T.kidCrowd, 14, [0.7, 1.05], () => !(c.kickMeT > 0));
    playBlip([700, 900], 0.05, "square", 0.04);
    havoc("kickMeKid", T.kidPoints + n * 10, `"KICK ME" on a kid!${n ? ` ${n} kids crowd round laughing` : ""} 😂`, { x: c.x, z: c.z });
    dareEvent("kickMe", { staff: null });
    return;
  }
  const st = tg.who;
  const facing = st.stunT <= 0 && st.stuckT <= 0 && Math.abs(angDiff(st.facing, Math.atan2(player.x - st.x, player.z - st.z))) < coneHalf(st.type);
  if (facing) {   // they saw it coming
    st.bubble.textContent = "Is that... for ME?"; st.barkUntil = performance.now() + 1800; st.barkAt = game.time;
    toast(`The ${st.type.name} turns around just in time. Get behind them next time.`, 2.4);
    if (chaser(st)) startChase(st); else { st.suspicion = 1; }
    return;
  }
  st.kickMe = true;
  st.sign = new THREE.Mesh(new THREE.PlaneGeometry(0.46, 0.3), new THREE.MeshBasicMaterial({ map: kickMeTex, side: THREE.DoubleSide }));
  st.sign.position.set(0, 0.92, -0.19); st.sign.rotation.y = Math.PI; st.mesh.add(st.sign);
  playBlip([700, 900], 0.05, "square", 0.04);
  havoc("kickMe", T.points, `"KICK ME" on the ${st.type.name}!`, { x: st.x, z: st.z });
  dareEvent("kickMe", { staff: st.key });
  if (game.phase === "passing") penStaff(st);
  else toast("It's on. Wait till the halls fill up...", 2.2);
}
function penStaff(st) {
  const T = ITEM_TYPES.kickMe;
  st.penned = true;
  const n = gatherKids(st.x, st.z, T.penKids, 18, [0.75, 1.15], () => !st.penned);
  if (n) tally("penned", n);
  if (n) addScore(T.penPoints + n * 10, `${n} kids pen the ${st.type.name} in! 😂`, "item");
  st.bubble.textContent = pick(["What's so funny?", "Move, people!", "Let me THROUGH!"]); st.barkUntil = performance.now() + 2000; st.barkAt = game.time;
}
function unpen(st) {
  st.penned = false; st.kickMe = false; st.stuckT = 0;
  if (st.sign) { st.mesh.remove(st.sign); st.sign.material.dispose(); st.sign = null; }
  st.bubble.textContent = "...Very funny."; st.barkUntil = performance.now() + 1800; st.barkAt = game.time;
}
function updateKickMe(dt) {
  for (let i = kidSigns.length - 1; i >= 0; i--) {   // kids wearing a sign: it rides on their back until it falls off
    const k = kidSigns[i], c = k.c;
    c.kickMeT -= dt;
    if (c.kickMeT <= 0 || c.mode === "gone") { c.kickMeT = 0; scene.remove(k.mesh); k.mesh.material.dispose(); kidSigns.splice(i, 1); continue; }
    const a = c.heading ?? 0; k.mesh.position.set(c.x - Math.sin(a) * 0.3, 1.05, c.z - Math.cos(a) * 0.3); k.mesh.rotation.y = a + Math.PI;
  }
  for (const st of staff) {
    if (st.penned) st.stuckT = Math.max(st.stuckT || 0, 0.2);   // can look and yell, can't get out
    else if (st.kickMe && game.phase === "passing" && game.phaseT > 3) penStaff(st);   // tagged during class: the next passing period
  }
}

// ---- Mentos & soda: fizz, then a geyser ----
const foamGeo = new THREE.CylinderGeometry(0.3, 0.1, 1, 10, 1, false).translate(0, 0.5, 0);
function startGeyser(o) {
  const T = o.T;
  o.state = "geyser"; o.gT = T.geyserSec; breakFlask(o);   // the flask's gone: just the geyser
  o.foam = new THREE.Mesh(foamGeo, new THREE.MeshLambertMaterial({ color: 0xfff6e0, emissive: 0x8a7550 }));
  o.foam.position.set(o.x, 0.38, o.z); scene.add(o.foam);
  playBlip([180, 260, 340, 420], 0.12, "sawtooth", 0.06);
  havoc("mentos", T.points, "GEYSER!", { x: o.x, z: o.z, loud: true });
  makeNoise(o.x, o.z, T.noiseRadius, true);
  const until = game.time + T.watchSec;
  const n = gatherKids(o.x, o.z, T.watchKids, T.watchRadius, [1.7, 2.6], () => game.time > until);
  if (n) addScore(n * T.perWatcher, `${n} kids crowd round to watch`, "small");
  dareEvent("geyser", { n });
}
function geyserStep(o, dt) {
  const T = o.T;
  o.gT -= dt;
  const k = 1 - o.gT / T.geyserSec, h = 2.6 * Math.min(1, k * 4) * Math.pow(Math.max(0, o.gT / T.geyserSec), 0.35);
  const wide = T.sprayRadius / 1.2;   // the foam spreads as wide as the spray
  o.foam.scale.set(wide * (1 + Math.sin(o.age * 30) * 0.12), Math.max(0.01, h), wide * (1 + Math.cos(o.age * 27) * 0.12));
  const p = personHit(o, T.sprayRadius, 9);
  if (p) hitPerson(o, p.who, p.isStaff);
  if (o.gT <= 0) {   // step 68: no bottle left, just a sticky pool everyone slips in (once each) until the custodian mops it
    scene.remove(o.foam); o.foam.material.dispose(); o.foam = null;
    o.state = "trap"; o.hitSet = new Set(); o.slips = 0; o.y = 0;
    const u = o.mesh.userData; u.puddle.visible = true; u.puddle.scale.setScalar(T.trapRadius);
    capLying();
  }
}

// ---- the stink bomb: pops on landing (noise pulls staff over), then a cloud that pays for everyone who walks through ----
const cloudGeo = new THREE.IcosahedronGeometry(1, 1);
function popStinkBomb(o) {
  const T = o.T;
  o.state = "cloud"; o.life = T.cloudSec; breakFlask(o); o.mesh.visible = false;
  o.cloud = new THREE.Mesh(cloudGeo, new THREE.MeshBasicMaterial({ color: 0x9bd44a, transparent: true, opacity: 0.32, depthWrite: false }));
  o.cloud.position.set(o.x, 0.7, o.z); o.cloud.scale.set(T.cloudRadius, 0.9, T.cloudRadius); scene.add(o.cloud);
  playBlip([140, 90, 60], 0.14, "sawtooth", 0.09);
  havoc("stinkBomb", T.points, "Stink bomb!", { x: o.x, z: o.z, loud: true });
  makeNoise(o.x, o.z, T.noiseRadius, true, o);
}
// step 79: the glitter bomb. A big sparkly cloud; nobody sees into it or through it while it's thick.
const GLITTER_COLORS = [0xff7ad1, 0xffcf3f, 0x7ad7ff, 0xb98bff, 0xffffff, 0x8ef0a0];
const glitterGeo = (() => {
  const n = 160, pos = new Float32Array(n * 3), col = new Float32Array(n * 3), c = new THREE.Color();
  for (let i = 0; i < n; i++) {
    const r = Math.cbrt(Math.random()) * 0.95, a = Math.random() * Math.PI * 2, u = Math.random() * 2 - 1, q = Math.sqrt(1 - u * u);
    pos.set([Math.cos(a) * q * r, u * r, Math.sin(a) * q * r], i * 3);
    c.setHex(GLITTER_COLORS[i % GLITTER_COLORS.length]); col.set([c.r, c.g, c.b], i * 3);
  }
  const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(pos, 3)); g.setAttribute("color", new THREE.BufferAttribute(col, 3));
  return g;
})();
function popFog(o) {
  const T = o.T;
  o.state = "fog"; o.life = T.fogSec; o.mesh.visible = false;
  o.cloud = new THREE.Mesh(cloudGeo, new THREE.MeshBasicMaterial({ color: 0xffe3f6, transparent: true, opacity: 0.72, depthWrite: false }));
  o.cloud.position.set(o.x, 1.0, o.z); o.cloud.scale.set(0.5, 0.6, 0.5); scene.add(o.cloud);
  o.sparkle = new THREE.Points(glitterGeo, new THREE.PointsMaterial({ size: 0.09, vertexColors: true, transparent: true, depthWrite: false }));
  o.sparkle.scale.setScalar(1.05); o.cloud.add(o.sparkle);
  playBlip([1568, 1976, 2349, 2637], 0.08, "sine", 0.05);   // ✨ tinkle
  havoc("glitterBomb", T.points, "Glitter bomb!", { x: o.x, z: o.z });
  makeNoise(o.x, o.z, T.noiseRadius, false, o);
}
function fogStep(o, dt) {
  const T = o.T, grow = Math.min(1, o.age / 0.8), fade = Math.min(1, o.life / 1.5);
  const r = T.fogRadius * grow; o.fogR = fade > 0.5 ? r : 0;   // thin at the very end: it stops blocking
  o.cloud.scale.set(r, 1.3 + Math.sin(o.age * 1.5) * 0.08, r); o.cloud.rotation.y += dt * 0.3;
  o.cloud.material.opacity = 0.72 * fade;
  if (o.sparkle) { o.sparkle.rotation.y -= dt * 0.9; o.sparkle.material.opacity = fade; o.sparkle.material.size = 0.07 + 0.04 * Math.abs(Math.sin(o.age * 6)); }   // twinkle
}
// does fog hide the player from someone at (ax, az)? (you're inside it, they are, or it's in between)
function fogBlocks(ax, az) {
  for (const o of objects) {
    if (o.dead || o.state !== "fog" || !o.fogR) continue;
    const R = o.fogR, bx = player.x, bz = player.z;
    if (Math.hypot(bx - o.x, bz - o.z) < R || Math.hypot(ax - o.x, az - o.z) < R) return true;
    const dx = bx - ax, dz = bz - az, L2 = dx * dx + dz * dz || 1, t = clamp(((o.x - ax) * dx + (o.z - az) * dz) / L2, 0, 1);
    if (Math.hypot(ax + dx * t - o.x, az + dz * t - o.z) < R) return true;
  }
  return false;
}
function stinkCloud(o, dt) {
  const T = o.T, k = o.life / T.cloudSec;
  if (!o.lingering && o.life < 0.4) {   // it fades to a smaller, fainter cloud that hangs around until the custodian airs it out
    o.lingering = true; o.life = Infinity; o.cloud.scale.set(T.cloudRadius * CFG.custodian.lingerRadius, 0.6, T.cloudRadius * CFG.custodian.lingerRadius);
  }
  o.cloud.material.opacity = o.lingering ? 0.16 : 0.32 * Math.min(1, k * 3);
  o.cloud.rotation.y += dt * 0.4; o.cloud.scale.y = (o.lingering ? 0.6 : 0.9) + Math.sin(o.age * 2) * 0.08;
  o.hitSet ??= new Set();
  const R = T.cloudRadius * (o.lingering ? CFG.custodian.lingerRadius : 1), inside = (x, z) => Math.hypot(x - o.x, z - o.z) < R;
  for (const st of staff) {
    if (o.hitSet.has(st) || st.type.custodian || !inside(st.x, st.z)) continue;
    o.hitSet.add(st); stunStaff(st, T.staffGagSec, "flinch");
    st.bubble.textContent = pick(["*cough*", "UGH. What IS that?", "*gag*"]); st.barkUntil = performance.now() + 1500; st.barkAt = game.time;
    addScore(T.perStaff, `The ${st.type.name} walks into the stink`, "small"); tally("stinkGag"); dareEvent("stink", { n: [...o.hitSet].filter((w) => w !== player).length });
  }
  for (const c of crowd) {
    if (!isActive(c) || o.hitSet.has(c) || !inside(c.x, c.z)) continue;
    o.hitSet.add(c); c.slipT = Math.max(c.slipT, T.studentGagSec); c.stunStyle = "flinch"; if (Math.random() < 0.5) kidSay(c, KID_LINES.stink, 2);
    addScore(T.perStudent, "Ew!", "small"); tally("stinkGag"); dareEvent("stink", { n: [...o.hitSet].filter((w) => w !== player).length });
  }
  // step 68: you're not immune either (after it's had a moment to spread)
  if (o.age > 0.8 && !o.hitSet.has(player) && !player.hidden && !player.ride && inside(player.x, player.z)) {
    o.hitSet.add(player); player.stuckT = Math.max(player.stuckT, T.playerGagSec); toast("*gag* You walked into the stink!");
  }
}

// ---- spray paint: tag the nearest wall with random graffiti ----
const graffiti = [];
let graffitiBag = [];
const PAINT_COLORS = ["#ff3b6b", "#2ee6a8", "#ffd23f", "#4dabff", "#b46bff", "#ff8a2b", "#f5f5f5"];
function drawGraffiti(g) {
  const cv = document.createElement("canvas"); cv.width = 512; cv.height = 256;
  const x = cv.getContext("2d"), col = pick(PAINT_COLORS);
  x.translate(256, 128); x.rotate(rand(-0.08, 0.08));
  x.fillStyle = x.strokeStyle = col; x.lineCap = x.lineJoin = "round"; x.textAlign = "center"; x.textBaseline = "middle";
  const font = (px) => `900 ${px}px "Comic Sans MS", "Chalkboard SE", "Marker Felt", "Segoe Print", cursive`;
  const line = (t, y, px, maxW) => {   // one line, shrunk to fit, with a dark outline and a few drips
    x.font = font(px);
    while (x.measureText(t).width > maxW && px > 18) { px -= 3; x.font = font(px); }
    x.lineWidth = Math.max(4, px * 0.1); x.strokeStyle = "rgba(20,20,30,.55)"; x.strokeText(t, 0, y); x.fillText(t, 0, y);
    const w = x.measureText(t).width;
    for (let i = 0; i < 3; i++) { const dx = rand(-w / 2, w / 2), len = rand(10, 30); x.fillRect(dx, y + px * 0.3, 3, len); }
  };
  const text = (t, y, maxPx = 90, maxW = 470) => {   // long messages go on two lines
    x.font = font(maxPx);
    const sp = [...t.matchAll(/ /g)].map((m) => m.index);
    if (x.measureText(t).width > maxW * 1.35 && sp.length && !/[×/|√<]/.test(t)) {   // (formulas and code stay on one line)
      const cut = sp.reduce((a, b) => (Math.abs(b - t.length / 2) < Math.abs(a - t.length / 2) ? b : a));
      line(t.slice(0, cut), y - maxPx * 0.42, maxPx * 0.8, maxW); line(t.slice(cut + 1), y + maxPx * 0.48, maxPx * 0.8, maxW);
    } else line(t, y, maxPx, maxW);
  };
  if (g.draw === "coolS") {   // the Cool S: two rows of three strokes, crossed in the middle, pointed at both ends
    x.lineWidth = 11; const s = 46, h1 = 64, h2 = 22, L = [];
    for (const xx of [-s, 0, s]) L.push([xx, -h1, xx, -h2], [xx, h2, xx, h1]);
    L.push([-s, -h1, 0, -h1 - s * 0.9], [s, -h1, 0, -h1 - s * 0.9], [-s, h1, 0, h1 + s * 0.9], [s, h1, 0, h1 + s * 0.9]);   // the points
    L.push([0, -h2, s, h2], [-s, -h2, 0, h2]);                // the two full diagonals
    L.push([s, -h2, s / 2, 0], [-s, h2, -s / 2, 0]);         // the two half diagonals that meet them
    x.beginPath(); for (const [a1, b1, a2, b2] of L) { x.moveTo(a1, b1); x.lineTo(a2, b2); } x.stroke();
  } else if (g.draw === "dontRead") {
    line("DONT READ THIS", -22, 70, 470);
    x.save(); x.translate(110, 56); x.rotate(-0.06); line("ha u read it", 0, 28, 300); x.restore();
  } else if (g.draw === "heart") {
    x.save(); x.translate(-55, 0); line("I", -45, 64, 100); x.restore(); line("Ms. Michael", 50, 64, 470);
    x.beginPath(); const hx = 30, hy = -50, r = 26;   // a doodled heart
    x.moveTo(hx, hy + r * 1.3);
    x.bezierCurveTo(hx - r * 2.2, hy - r * 0.2, hx - r * 0.9, hy - r * 1.6, hx, hy - r * 0.5);
    x.bezierCurveTo(hx + r * 0.9, hy - r * 1.6, hx + r * 2.2, hy - r * 0.2, hx, hy + r * 1.3);
    x.fill();
  } else if (g.draw === "brick") {   // painted bricks behind it, so it really is on a brick in the wall
    x.save(); x.globalAlpha = 0.55; x.fillStyle = "#a4442c"; x.strokeStyle = "#e9dcc9"; x.lineWidth = 4;
    for (let r = 0; r < 4; r++) for (let c = -1; c < 5; c++) {
      const bx = -250 + c * 110 + (r % 2 ? 55 : 0), by = -110 + r * 55;
      x.fillRect(bx, by, 104, 49); x.strokeRect(bx, by, 104, 49);
    }
    x.restore(); x.fillStyle = col; text(g.text, 0, 80);
  } else if (g.draw === "kilroy") {   // a bald head and a long nose peeking over a wall, fingers hooked over the top
    x.save(); x.translate(0, -16); x.scale(1.35, 1.35);
    x.lineWidth = 6; x.beginPath(); x.moveTo(-200, 20); x.lineTo(200, 20); x.stroke();                    // the wall
    x.beginPath(); x.arc(0, 20, 62, Math.PI, 0); x.stroke();                                                 // the head
    for (const ex of [-22, 22]) { x.beginPath(); x.arc(ex, -5, 9, 0, Math.PI * 2); x.stroke(); x.beginPath(); x.arc(ex, -2, 3.5, 0, Math.PI * 2); x.fill(); }   // eyes
    x.beginPath(); x.moveTo(-6, 4); x.bezierCurveTo(-12, 30, -10, 62, 0, 66); x.bezierCurveTo(10, 62, 12, 30, 6, 4); x.stroke();   // the nose, hanging over
    for (const sx of [-1, 1]) for (let k = 0; k < 3; k++) { x.beginPath(); x.arc(sx * (88 + k * 12), 22, 6, Math.PI, 0); x.stroke(); }   // fingers
    x.restore(); x.save(); x.translate(0, 100); line("KILROY WAS HERE", 0, 40, 420); x.restore();
  } else if (g.draw === "balloonGirl") {   // after Banksy: a stencil girl reaching for a heart balloon drifting away
    x.fillStyle = "#151515";
    x.beginPath(); x.arc(-70, -18, 17, 0, Math.PI * 2); x.fill();                                              // head
    x.beginPath(); x.moveTo(-82, -14); x.quadraticCurveTo(-98, -2, -94, 14); x.quadraticCurveTo(-86, 4, -80, -4); x.fill();   // hair blowing back
    x.beginPath(); x.moveTo(-82, 0); x.lineTo(-58, 0); x.lineTo(-48, 62); x.lineTo(-92, 62); x.closePath(); x.fill();   // dress
    x.lineWidth = 6; x.strokeStyle = "#151515"; x.beginPath(); x.moveTo(-60, 6); x.lineTo(-30, -18); x.stroke();      // arm reaching up
    x.beginPath(); x.moveTo(-78, 60); x.lineTo(-80, 100); x.moveTo(-62, 60); x.lineTo(-58, 100); x.stroke();          // legs
    x.lineWidth = 2; x.beginPath(); x.moveTo(-24, -24); x.bezierCurveTo(10, -10, 30, -60, 66, -52); x.stroke();      // the string
    x.fillStyle = "#d7191c"; const bx = 80, by = -78, r = 26;
    x.beginPath(); x.moveTo(bx, by + r * 1.25); x.bezierCurveTo(bx - r * 2.1, by - r * 0.2, bx - r * 0.9, by - r * 1.6, bx, by - r * 0.5); x.bezierCurveTo(bx + r * 0.9, by - r * 1.6, bx + r * 2.1, by - r * 0.2, bx, by + r * 1.25); x.fill();
    x.fillStyle = "#151515"; x.font = font(22); x.fillText("THERE IS ALWAYS HOPE", 105, 40);
  } else if (g.draw === "monaGoblina") {   // the Mona Lisa, but she's a goblin
    x.fillStyle = "#6b4a22"; x.fillRect(-70, -118, 140, 236); x.fillStyle = "#3d4a2c"; x.fillRect(-58, -106, 116, 212);   // frame, murky landscape
    x.fillStyle = "#56603a"; x.fillRect(-58, -40, 116, 30);
    x.fillStyle = "#1c1410"; x.beginPath(); x.ellipse(0, -48, 34, 44, 0, 0, Math.PI * 2); x.fill();               // hair
    x.fillStyle = "#7bb043"; x.beginPath(); x.ellipse(0, -46, 24, 32, 0, 0, Math.PI * 2); x.fill();              // green face
    for (const sx of [-1, 1]) { x.beginPath(); x.moveTo(sx * 20, -52); x.lineTo(sx * 52, -66); x.lineTo(sx * 22, -38); x.fill(); }   // pointy ears
    x.fillStyle = "#1c1410"; x.fillRect(-26, -82, 52, 14);                                                           // center-parted hair over the brow
    x.fillStyle = "#111"; for (const sx of [-1, 1]) { x.beginPath(); x.ellipse(sx * 9, -50, 4, 2.5, 0, 0, Math.PI * 2); x.fill(); }
    x.strokeStyle = "#2c3a18"; x.lineWidth = 2; x.beginPath(); x.moveTo(-8, -30); x.quadraticCurveTo(0, -27, 9, -32); x.stroke();   // that smile
    x.fillStyle = "#24261a"; x.beginPath(); x.moveTo(-14, -16); x.lineTo(14, -16); x.lineTo(52, 106); x.lineTo(-52, 106); x.closePath(); x.fill();   // dress
    x.fillStyle = "#7bb043"; x.beginPath(); x.ellipse(-6, 66, 22, 9, 0.2, 0, Math.PI * 2); x.fill(); x.beginPath(); x.ellipse(8, 72, 20, 8, -0.2, 0, Math.PI * 2); x.fill();   // folded hands
    x.fillStyle = col; x.font = font(28); x.save(); x.translate(170, 10); x.rotate(-0.12); x.fillText("MONA", 0, -18); x.fillText("GOBLINA", 0, 18); x.restore();
  } else if (g.draw === "eye") {   // a bloodshot eye
    x.fillStyle = "#f4f1ea"; x.beginPath(); x.ellipse(0, 0, 120, 62, 0, 0, Math.PI * 2); x.fill();
    x.strokeStyle = "#c0262d"; x.lineWidth = 2;
    for (let i = 0; i < 14; i++) { const a = (i / 14) * Math.PI * 2, r0 = 112, r1 = 52; x.beginPath(); x.moveTo(Math.cos(a) * r0, Math.sin(a) * r0 * 0.5); x.quadraticCurveTo(Math.cos(a + 0.2) * 80, Math.sin(a + 0.2) * 40, Math.cos(a) * r1, Math.sin(a) * r1 * 0.9); x.stroke(); }
    x.fillStyle = col; x.beginPath(); x.arc(0, 0, 44, 0, Math.PI * 2); x.fill(); x.fillStyle = "#111"; x.beginPath(); x.arc(0, 0, 20, 0, Math.PI * 2); x.fill();
    x.fillStyle = "#fff"; x.beginPath(); x.arc(14, -14, 7, 0, Math.PI * 2); x.fill();
    x.strokeStyle = "#151515"; x.lineWidth = 6; x.beginPath(); x.ellipse(0, 0, 120, 62, 0, 0, Math.PI * 2); x.stroke();
  } else if (g.draw === "skull") {   // skull and crossbones
    x.lineWidth = 16;
    for (const [a, b] of [[-1, 1], [1, -1]]) { x.beginPath(); x.moveTo(a * 95, 90); x.lineTo(b * 95, -10); x.stroke(); for (const [ex, ey] of [[a * 95, 90], [b * 95, -10]]) for (const o of [-1, 1]) { x.beginPath(); x.arc(ex + o * 8, ey + o * 4, 10, 0, Math.PI * 2); x.fill(); } }
    x.beginPath(); x.arc(0, -40, 62, 0, Math.PI * 2); x.fill(); x.fillRect(-36, -4, 72, 46);
    x.fillStyle = "#151515"; for (const sx of [-1, 1]) { x.beginPath(); x.arc(sx * 24, -40, 16, 0, Math.PI * 2); x.fill(); }
    x.beginPath(); x.moveTo(0, -18); x.lineTo(-8, -2); x.lineTo(8, -2); x.fill();
    for (let k = -2; k <= 2; k++) x.fillRect(k * 14 - 2, 22, 4, 20);
  } else if (g.draw === "deadBunny") {   // a bunny with X eyes
    x.translate(0, 14); x.scale(0.88, 0.88);   // (room for the ears)
    x.lineWidth = 8;
    for (const sx of [-1, 1]) { x.beginPath(); x.ellipse(sx * 30, -78, 18, 52, sx * 0.15, 0, Math.PI * 2); x.stroke(); }
    x.beginPath(); x.ellipse(0, 10, 78, 64, 0, 0, Math.PI * 2); x.stroke();
    for (const sx of [-1, 1]) { const ex = sx * 30, ey = -4; x.beginPath(); x.moveTo(ex - 13, ey - 13); x.lineTo(ex + 13, ey + 13); x.moveTo(ex + 13, ey - 13); x.lineTo(ex - 13, ey + 13); x.stroke(); }
    x.beginPath(); x.moveTo(-6, 22); x.lineTo(6, 22); x.lineTo(0, 30); x.closePath(); x.fill();
    x.beginPath(); x.moveTo(-18, 40); x.quadraticCurveTo(0, 30, 18, 40); x.stroke();
    x.fillStyle = "#e85a8a"; x.beginPath(); x.ellipse(10, 50, 9, 13, 0.2, 0, Math.PI * 2); x.fill();   // tongue out
    for (const sx of [-1, 1]) { x.beginPath(); x.moveTo(sx * 40, 28); x.lineTo(sx * 100, 18); x.moveTo(sx * 40, 34); x.lineTo(sx * 100, 40); x.lineWidth = 3; x.stroke(); }   // whiskers
  } else if (g.draw === "ankh") {
    x.lineWidth = 22; x.beginPath(); x.ellipse(0, -66, 30, 42, 0, 0, Math.PI * 2); x.stroke();
    x.beginPath(); x.moveTo(-70, -12); x.lineTo(70, -12); x.moveTo(0, -24); x.lineTo(0, 112); x.stroke();
  } else if (g.draw === "peace") {
    x.lineWidth = 18; x.beginPath(); x.arc(0, 0, 100, 0, Math.PI * 2); x.stroke();
    x.beginPath(); x.moveTo(0, -100); x.lineTo(0, 100); x.moveTo(0, 0); x.lineTo(-71, 71); x.moveTo(0, 0); x.lineTo(71, 71); x.stroke();
  } else if (g.draw === "yinYang") {
    const R = 100; x.fillStyle = "#f4f1ea"; x.beginPath(); x.arc(0, 0, R, 0, Math.PI * 2); x.fill();
    x.fillStyle = "#151515"; x.beginPath(); x.arc(0, 0, R, -Math.PI / 2, Math.PI / 2); x.arc(0, R / 2, R / 2, Math.PI / 2, -Math.PI / 2, true); x.arc(0, -R / 2, R / 2, Math.PI / 2, -Math.PI / 2); x.fill();
    x.beginPath(); x.arc(0, R / 2, R / 7, 0, Math.PI * 2); x.fill(); x.fillStyle = "#f4f1ea"; x.beginPath(); x.arc(0, -R / 2, R / 7, 0, Math.PI * 2); x.fill();   // each dot the other color
    x.strokeStyle = col; x.lineWidth = 7; x.beginPath(); x.arc(0, 0, R, 0, Math.PI * 2); x.stroke();
  } else text(g, 0, 90);
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
  return tex;
}
const graffitiGeo = new THREE.PlaneGeometry(2.4, 1.2);
let WALL_FEATURES = null;   // things on the walls that graffiti shouldn't cover
function wallFeatures() {
  if (WALL_FEATURES) return WALL_FEATURES;
  WALL_FEATURES = SPOTS.map((sp) => ({ h: sp.h, side: sp.side, t: sp.t, half: sp.kind === "classroom" ? 0.9 : 0.7 }));
  for (const ob of OBSTACLES) WALL_FEATURES.push({ h: ob.h, side: ob.side, t: ob.t, half: ob.halfLen });
  for (const t of [5, 19.5, 34]) WALL_FEATURES.push({ h: 6, side: 1, t, half: 1.1 });   // bulletin boards
  const E = LAYOUT.entrance; WALL_FEATURES.push({ h: E.h, side: HALLS[E.h].outerSide, t: E.t, half: 1.3 });
  return WALL_FEATURES;
}
function sprayPaint() {
  const T = ITEM_TYPES.sprayPaint, pr = hallProject(player.x, player.z), H = HALLS[pr.h];
  const side = pr.lat >= 0 ? 1 : -1, wl = wallLat(pr.h, side);
  if (Math.abs(wl - pr.lat) > T.wallRange) { toast("Get right next to a wall to spray it"); return false; }
  // find a free stretch of wall near you: not over doors, boards, machines, or your last piece
  let t = null;
  for (const off of [0, 1.3, -1.3, 2.6, -2.6, 3.9, -3.9, 5.2, -5.2]) {
    const tt = clamp(pr.t + off, 2.6, H.len - 2.6);
    if (graffiti.some((g) => g.h === pr.h && g.side === side && Math.abs(g.t - tt) < 2.4)) continue;
    if (wallFeatures().some((f) => f.h === pr.h && f.side === side && Math.abs(f.t - tt) < f.half + 1.2)) continue;
    t = tt; break;
  }
  if (t === null) { toast("This wall's full. Find another one."); return false; }
  if (!graffitiBag.length) graffitiBag = [...GRAFFITI].sort(() => Math.random() - 0.5);
  const g = graffitiBag.pop();
  const mesh = new THREE.Mesh(graffitiGeo, new THREE.MeshBasicMaterial({ map: drawGraffiti(g), transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 }));
  const p = hallPos(pr.h, t, wl - side * 0.04);
  mesh.position.set(p.x, 1.75, p.z);
  mesh.rotation.y = Math.atan2(-side * H.nx, -side * H.nz);   // facing into the hall
  scene.add(mesh);
  graffiti.push({ h: pr.h, t, side, mesh });
  while (graffiti.length > 16) { const old = graffiti.shift(); scene.remove(old.mesh); old.mesh.material.map.dispose(); old.mesh.material.dispose(); }
  playBlip([2400, 2200, 2600], 0.08, "sawtooth", 0.03);   // psssht
  havoc("sprayPaint", T.points, "Graffiti!", { x: p.x, z: p.z, loud: true });
  dareEvent("tag", { h: pr.h });
  return true;
}
function clearGraffiti() { for (const g of graffiti) { scene.remove(g.mesh); g.mesh.material.map.dispose(); g.mesh.material.dispose(); } graffiti.length = 0; }

// ---- the wheelie chair: launch yourself, steer a little (it costs speed), jump off before the crash ----
const jumpBtn = $("jumpBtn");
function startRide(L) {
  if (player.board) hopOff(true);
  player.ride = { dx: L.dx, dz: L.dz, t: 0, speed: ITEM_TYPES.wheelieChair.rideSpeed * speedMult(), chair: makeItemMesh("wheelieChair") };
  player.heading = Math.atan2(L.dx, L.dz);
  toast(isTouch ? "WHEEEEE! Steer with the stick · tap 🦘 to jump off" : "WHEEEEE! A/D steers · E or Space jumps off", 2.4);
  playBlip([400, 600, 800], 0.07, "triangle", 0.06);
  jumpBtn.hidden = false;
}
function updateRide(dt) {
  const R = player.ride, T = ITEM_TYPES.wheelieChair;
  R.t += dt;
  const steer = clamp(input.x, -1, 1);   // left/right on the stick (or A/D)
  if (Math.abs(steer) > 0.15) {
    const a = -steer * T.steerRate * dt, c = Math.cos(a), sn = Math.sin(a), dx = R.dx;
    R.dx = dx * c + R.dz * sn; R.dz = -dx * sn + R.dz * c;
    player.heading = Math.atan2(R.dx, R.dz);
    R.speed = Math.max(0, R.speed - Math.abs(steer) * T.steerDrag * dt);
    R.chair.rotation.z = steer * 0.12;   // leaning into the turn
  } else R.chair.rotation.z = 0;
  if (R.speed < T.minSpeed) { endRide(false); toast("You roll to a stop."); return; }
  const ox = player.x, oz = player.z, want = R.speed * dt;
  player.x += R.dx * want; player.z += R.dz * want;
  collide(player, CFG.player.radius);
  const moved = Math.hypot(player.x - ox, player.z - oz);
  player.vx = (player.x - ox) / Math.max(dt, 1e-4); player.vz = (player.z - oz) / Math.max(dt, 1e-4);
  cam.yaw = lerpAngle(cam.yaw, player.heading, damp(3, dt));
  for (const st of staff) if (Math.hypot(st.x - player.x, st.z - player.z) < 0.8) { endRide(true); caught(st); return; }   // straight into staff: caught
  for (const c of crowd) {
    if (!isActive(c) || Math.hypot(c.x - player.x, c.z - player.z) > 0.6) continue;
    c.slipT = 1.2; c.stunStyle = "fall"; havoc("chairStudent", T.studentPoints, "Chair vs. student!", { x: c.x, z: c.z, loud: true });
    endRide(true); return;
  }
  if (moved < want * 0.5 || R.t > T.maxRideSec) { endRide(true); return; }
  R.chair.position.set(player.x, 0, player.z); R.chair.rotation.y = player.heading;
  player.mesh.position.set(player.x, 0.35, player.z); player.mesh.rotation.y = player.heading;
}
function endRide(crash) {
  const R = player.ride, T = ITEM_TYPES.wheelieChair;
  if (!R) return;
  player.ride = null; scene.remove(R.chair); jumpBtn.hidden = true;
  spawnObject("wheelieChair", "spent", player.x - R.dx * 0.6, 0, player.z - R.dz * 0.6, { life: T.leftoverSec });
  player.mesh.position.y = 0;
  if (crash) { player.dazeT = T.dazeSec; playBlip([200, 120], 0.12, "sawtooth", 0.08); popup("CRASH!", "bad"); }
}

// bail out sideways: no crash for you, and the empty chair keeps rolling
function jumpOff() {
  const R = player.ride, T = ITEM_TYPES.wheelieChair;
  if (!R || game.state !== "playing") return;
  player.ride = null; scene.remove(R.chair); jumpBtn.hidden = true;
  const o = spawnObject("wheelieChair", "chairRoll", player.x, 0, player.z, { vx: R.dx * R.speed, vz: R.dz * R.speed });
  o.mesh.rotation.y = player.heading;
  const side = input.x >= 0 ? 1 : -1;   // hop to whichever side you were steering toward
  player.x += -R.dz * side * 0.7 + R.dx * 0.3; player.z += R.dx * side * 0.7 + R.dz * 0.3; collide(player, CFG.player.radius);
  player.mesh.position.y = 0; player.dazeT = T.jumpSec;
  toast("You bail out!"); playBlip([500, 300], 0.07, "triangle", 0.05);
}
// the empty chair rolls on until it hits something: a person goes flying, a wall just stops it
function chairRoll(o, dt) {
  const T = o.T, k = Math.exp(-T.emptyFriction * dt); o.vx *= k; o.vz *= k;
  const hitWall = wallBounce(o, dt, 0);
  o.x += o.vx * dt; o.z += o.vz * dt;
  if (Math.hypot(o.vx, o.vz) > 0.1) o.mesh.rotation.y = Math.atan2(o.vx, o.vz);
  const done = () => { o.vx = o.vz = 0; o.state = "spent"; o.life = T.leftoverSec; };
  if (hitWall) { playBlip([180, 120], 0.08, "square", 0.05); done(); return; }
  for (const st of staff) if (Math.hypot(st.x - o.x, st.z - o.z) < 0.7) {
    stunStaff(st, T.emptyStaffSec, "fall"); bark(st, "slip", true);
    havoc("chairStaff", T.emptyStaffPoints, `Runaway chair flattens the ${st.type.name}!`, { x: o.x, z: o.z, loud: true });
    dareEvent("hit", { item: "wheelieChair", staff: st.key, chasing: st.state === "chase" });
    done(); return;
  }
  for (const c of crowd) if (isActive(c) && Math.hypot(c.x - o.x, c.z - o.z) < 0.6) {
    c.slipT = 1.2; c.stunStyle = "fall"; havoc("chairStudent", T.studentPoints, "Runaway chair vs. student!", { x: c.x, z: c.z, loud: true });
    done(); return;
  }
  if (Math.hypot(o.vx, o.vz) < 0.6) done();
}

// ---- the custodian's closet ----
function grabCloset(key) {
  const sp = player.hidden;
  if (!sp || sp.kind !== "closet" || sp.taken.has(key) || game.state !== "playing") return;
  if (!addItem(key)) return;
  if (!sp.locked) toast("He'll notice that's missing. The closet's getting locked behind you.", 2.4);
  sp.taken.add(key); sp.locked = true; player.hideT += CFG.closet.grabSec;
  updateHidePanel();
}
// lights out: staff can barely see for a few seconds
function flipBreaker() {
  const B = CFG.breaker;
  if (!player.hidden || player.hidden.kind !== "closet" || game.breakerUsed || game.state !== "playing") return;
  game.breakerUsed = true; game.blackoutT = B.sec;
  setLights(B.light);
  banner("LIGHTS OUT!<small>The staff can barely see. Move!</small>", 2.4);
  playBlip([120, 60], 0.25, "square", 0.1);
  havoc("breaker", B.points, "Flipped the breaker!", { x: player.x, z: player.z, loud: true });
  setTimeout(() => game.state === "playing" && pa(null, "Uh, we seem to be having a power issue. Please stay where you are.", 4), 900);
  updateHidePanel();
}
function setLights(k) {
  hemi.intensity = LIGHT.hemi * k; sun.intensity = LIGHT.sun * k;
  for (const m of glowMats) { m.userData.base ??= m.color.clone(); m.color.copy(m.userData.base).multiplyScalar(Math.max(k, 0.12)); }
}
function lightsOn() { setLights(1); }
function tickBlackout(dt) {
  if (game.blackoutT <= 0) return;
  game.blackoutT -= dt;
  if (game.blackoutT <= 0) { game.blackoutT = 0; lightsOn(); toast("The lights flicker back on."); playBlip([400, 800], 0.08, "triangle", 0.05); }
}
// the mop, jammed through a classroom door's handle: the teacher's stuck inside until the custodian pulls it out
function jamDoor() {
  const T = ITEM_TYPES.mop;
  let sp = null, bd = T.range;
  for (const d of DOOR_SPOTS()) { const dd = spotDist(d); if (dd < bd && !d.jammed && d.roomType !== "office") { bd = dd; sp = d; } }
  if (!sp) { toast("Get right up to a classroom door to jam it shut with the mop."); return false; }
  if (staff.some((s) => s.post === sp)) { toast(`Room ${sp.room}'s teacher is standing right there.`); return false; }
  sp.jammed = true;
  const f = hallPos(sp.h, sp.t, sp.wallLat - sp.side * 0.12);
  sp.mopMesh = makeItemMesh("mop"); sp.mopMesh.position.set(f.x, 1.0, f.z); sp.mopMesh.rotation.set(0, wallRot(sp.h), 0.5);
  if (player.hidden === sp) exitSpot(false);
  havoc("mopJam", T.points, `Room ${sp.room} jammed shut!`, { x: f.x, z: f.z }); dareEvent("mopJam");
  playBlip([300, 240], 0.08, "square", 0.06);
  setTimeout(() => game.state === "playing" && sp.jammed && toast(`*BANG BANG* "Who did this?! Open this door!" (room ${sp.room})`, 2.6), 1500);
  return true;
}
function unjam(sp) { sp.jammed = false; if (sp.mopMesh) { scene.remove(sp.mopMesh); sp.mopMesh = null; } }
// ---- wet-floor signs: the custodian's, set out around a wet mess. Steal one, set it down, and staff on their rounds turn back. ----
const stolenSigns = [];   // { at, cust, obj (where you set it down, or null while you're carrying it), done }
function placeSign(key) {
  const o = spawnObject(key, "sign", player.x + Math.sin(player.heading) * 0.9, 0, player.z + Math.cos(player.heading) * 0.9);
  collide(o, 0.3); o.mesh.rotation.y = player.heading; o.turned = new Map(); capLying();
  const rec = stolenSigns.find((r) => !r.done && !r.obj); if (rec) { rec.obj = o; o.rec = rec; }
  playBlip([500, 420], 0.06, "triangle", 0.05);
  toast("Wet floor! Staff on their rounds will turn back here.");
}
function signTaken(o) {
  if (o.rec) { o.rec.obj = null; return; }   // one you'd already stolen: back in your pocket
  if (!o.custSign) return;
  const mess = o.mess; if (mess?.signs) mess.signs = mess.signs.filter((x) => x !== o);
  stolenSigns.push({ at: game.time, cust: o.custSign, obj: null, done: false });
  toast("You swipe the custodian's sign. He'll notice in a few seconds...", 2.4);
}
// the custodian sets two signs out around the mess he's about to clean
function putOutSigns(st, j) {
  const holder = j.o ?? j.sp; if (!holder || holder.signs) return;
  const pr = hallProject(j.x, j.z), C = CFG.custodian, H = HALLS[pr.h];
  holder.signs = [-1, 1].map((d) => {
    const p = hallPos(pr.h, clamp(pr.t + d * C.signGap, 0.3, H.len - 0.3), clamp(pr.lat, -1.4, 1.4));
    const o = spawnObject("wetFloor", "sign", p.x, 0, p.z, { custSign: st, mess: holder, turned: new Map() });
    o.mesh.rotation.y = hallHeading(pr.h, d); return o;
  });
}
function collectSigns(holder) { if (holder?.signs) { for (const o of holder.signs) if (!o.dead) removeObject(o); holder.signs = null; } }
// staff on their rounds who see a sign ahead turn back (staff who are onto you ignore it)
function wetSignCheck(o) {
  const T = o.T;
  for (const st of staff) {
    if (!chaser(st) || st.stunT > 0 || st.state !== "patrol" || st.suspicion > 0.05) continue;
    if ((o.turned.get(st) ?? -99) > game.time - 8) continue;
    const dx = o.x - st.x, dz = o.z - st.z, d = Math.hypot(dx, dz);
    if (d > T.turnRange || Math.abs(angDiff(st.facing, Math.atan2(dx, dz))) > 0.6 || !lineOfSight(st.x, st.z, o.x, o.z)) continue;
    o.turned.set(st, game.time);
    st.to = otherEnd(st.h, st.to);
    if (st.route) { st.rstep = -st.rstep; st.ri = mod(st.ri + st.rstep, st.route.length); }
    st.bubble.textContent = pick(["Wet floor. Nope.", "Not risking it.", "I'll go around.", "Ugh. Fine."]); st.barkUntil = performance.now() + 1800; st.barkAt = game.time;
    if (!o.custSign) { addScore(T.points, `The ${st.type.name} turns back`, "small"); dareEvent("wetSign"); }
  }
}
// 10 s after you swipe a sign, the custodian drops everything to get it back (from the floor, or from you)
function signJob(st) {
  const rec = stolenSigns.find((r) => !r.done && r.cust === st && game.time - r.at >= CFG.custodian.retrieveAfterSec);
  if (!rec) return null;
  const at = rec.obj && !rec.obj.dead ? rec.obj : player;
  return { kind: "sign", rec, x: at.x, z: at.z, sec: 0.6, reach: rec.obj ? 0.9 : 1.2 };
}
function finishSignJob(st, j) {
  const rec = j.rec;
  if (rec.obj && !rec.obj.dead) { removeObject(rec.obj); rec.done = true; toast("The custodian takes his sign back."); }
  else if (player.hidden) return false;   // you're hiding with it: he'll wait
  else {
    const i = game.hotbar.findIndex((it) => it?.key === "wetFloor");
    if (i >= 0) consumeSlot(i);
    rec.done = true;
    st.bubble.textContent = pick(["That's MINE.", "I'll take that.", "Nice try, kid."]); st.barkUntil = performance.now() + 2000;
    toast("The custodian snatches his sign back.", 2.2);
  }
  return true;
}
let snapHold = 0;
const PLUNGER_HEAD_Y = 1.55;   // where the cup sits on a staff member's head (head center 1.40, before their scale)
// the plunger: stuck to whoever it hits (they stumble around blind) or to the wall
function plungerHit(o, who, isStaff) {
  const T = o.T;
  removeObject(o);
  if (isStaff && who.type.stationary) {   // a teacher at the door just yanks it off
    stunStaff(who, 2.5, "flinch"); who.bubble.textContent = "REALLY?!"; who.barkUntil = performance.now() + 1800;
    havoc("plungerStaff", T.staffPoints, `Plunger! Right on the ${who.type.name}!`, { x: who.x, z: who.z, loud: true });
  } else if (isStaff) {
    who.plungerT = T.blindSec; who.blindDir = who.facing; who.bumpCD = 0;
    if (who.plungerMesh) who.mesh.remove(who.plungerMesh);   // hit again while already plungered: one plunger, not two
    who.plungerMesh = makeItemMesh("plunger"); scene.remove(who.plungerMesh);
    who.plungerMesh.position.set(0.02, PLUNGER_HEAD_Y + (who.mesh.userData.hat ? 0.13 : 0), 0.1); who.plungerMesh.scale.setScalar(1.5); who.plungerMesh.rotation.set(0.38, rand(-0.5, 0.5), 0.2, "YXZ"); who.mesh.add(who.plungerMesh);   // cup over the face, handle up, a bit crooked
    if (who.state === "chase" || who.state === "bust") { who.state = "search"; who.searchT = 0; }
    who.camping = false; who.cone.visible = false;
    who.bubble.textContent = "MMMPH!"; who.barkUntil = performance.now() + 2000; who.barkAt = game.time;
    playBlip([200, 500], 0.1, "sine", 0.08);
    havoc("plungerStaff", T.staffPoints, `Plunger! The ${who.type.name} can't see!`, { x: who.x, z: who.z, loud: true });
    dareEvent("hit", { item: "plunger", staff: who.key, chasing: false });
  } else {
    who.slipT = Math.max(who.slipT, T.studentSec); who.stunStyle = "flinch";
    havoc("plungerStudent", T.studentPoints, "Plunger to the face!", { x: who.x, z: who.z });
  }
}
function stickPlungerToWall(o) {
  const yaw = Math.atan2(-o.vx, -o.vz);   // (wallBounce already turned it around: this points back into the wall)
  o.vx = o.vy = o.vz = 0; o.state = "resting"; o.wallStuck = true;
  o.mesh.rotation.set(-Math.PI / 2, yaw, 0, "YXZ");   // cup against the wall, handle sticking out
  playBlip([180, 260], 0.06, "sine", 0.06);   // thwop
  popup("Thwop! Stuck to the wall.", "meh");
  capLying();
}
// blind with a plunger on their head: wandering, bumping into kids (and colleagues)
function blindStumble(st, dt) {
  const T = ITEM_TYPES.plunger;
  st.plungerT -= dt; st.bumpCD -= dt;
  st.blindDir += (Math.random() - 0.5) * 6 * dt;
  const ox = st.x, oz = st.z;
  moveToward(st, st.x + Math.sin(st.blindDir), st.z + Math.cos(st.blindDir), T.blindSpeed, dt);
  if (Math.hypot(st.x - ox, st.z - oz) < T.blindSpeed * dt * 0.4) st.blindDir += Math.PI * (0.6 + Math.random() * 0.8);   // walked into a wall: turn around
  st.facing = st.blindDir;
  for (const c of crowd) if (isActive(c) && c.slipT <= 0 && Math.hypot(c.x - st.x, c.z - st.z) < 0.6) {
    c.slipT = 1.2; c.stunStyle = "fall"; havoc("plungerBump", T.bumpPoints, "Blind bump!", { x: c.x, z: c.z });
  }
  if (st.bumpCD <= 0) for (const o of staff) if (o !== st && o.stunT <= 0 && Math.hypot(o.x - st.x, o.z - st.z) < 0.8) {
    st.bumpCD = 1.5; stunStaff(o, 1.2, "flinch"); bark(o, "slip", true); havoc("plungerBumpStaff", 60, `The ${st.type.name} walks into the ${o.type.name}!`, { x: o.x, z: o.z });
  }
  st.mesh.position.set(st.x, Math.abs(Math.sin(game.time * 9)) * 0.05, st.z); st.mesh.rotation.y = st.facing; st.mesh.rotation.z = Math.sin(game.time * 7) * 0.15;
  if (performance.now() > st.barkUntil + 1200) { st.bubble.textContent = pick(["MMMPH!", "WHO DID THIS?!", "I can't SEE!", "*muffled yelling*"]); st.barkUntil = performance.now() + 1400; }
  if (st.plungerT <= 0) {   // pops it off
    st.plungerT = 0; st.mesh.remove(st.plungerMesh); st.plungerMesh = null; st.mesh.rotation.z = 0; st.cone.visible = true;
    if (st.type.custodian) st.offHall = true;
    else if (chaser(st)) { st.state = "return"; setReturnPoint(st); }
    spawnObject("plunger", "resting", st.x + 0.4, 0.04, st.z);   // left lying there
    capLying();
  }
}

// ---- picking things up ----
function pickable(o) { return o.state === "pickup" || o.state === "sign" || (o.state === "resting" && o.T.recoverable); }
function pickUp(o) {
  if (!addItem(o.key, o.key === "spitball" ? o.uses : undefined)) return false;
  if (o.key === "wetFloor") signTaken(o);
  removeObject(o); return true;
}
function pickupNearest() {
  let best = null, bd = CFG.items.pickupRange;
  for (const o of objects) if (pickable(o)) { const d = Math.hypot(o.x - player.x, o.z - player.z); if (d < bd) { bd = d; best = o; } }
  if (best) { pickUp(best); return true; }
  return false;
}
function tapItemAt(x, y) {   // the item under a tap and how far (px) from the finger, or null
  const w = window.innerWidth, h = window.innerHeight;
  let best = null, bd = CFG.interact.tapRadiusPx;
  for (const o of objects) {
    if (!pickable(o) || Math.hypot(o.x - player.x, o.z - player.z) > CFG.items.pickupRange) continue;
    projA.set(o.x, o.y + 0.1, o.z).applyMatrix4(camera.matrixWorldInverse);
    if (projA.z > -0.2) continue;
    projA.set(o.x, o.y + 0.1, o.z).project(camera);
    const d = Math.hypot(x - ((projA.x + 1) / 2) * w, y - ((1 - projA.y) / 2) * h);
    if (d < bd) { bd = d; best = o; }
  }
  return best && { o: best, d: bd };
}

// ---- havoc: flat points for mischief, worth less each time you repeat it in a period ----
function scoreMult() { return (game.survival ? CFG.survival.scoreMult : 1) * (game.nearMissT > 0 ? CFG.scoring.nearMissMult : 1); }
function streakMult() { const S = CFG.scoring; return Math.min(S.streakMax, 1 + Math.floor(game.unseenT / S.streakStepSec) * S.streakStep); }
function havoc(kind, base, label, opts = {}) {
  tally("h:" + kind);
  const n = game.havocCount[kind] ?? 0;
  game.havocCount[kind] = n + 1;
  const pts = Math.max(1, Math.round(base * Math.pow(CFG.items.diminish, n) * scoreMult()));
  game.score += pts;
  popup(`+${pts} ${label}`);
  onHavoc(kind, pts, opts);
  return pts;
}
// Heat only if someone saw you do it (step 74: nothing for what they didn't see)
function onHavoc(kind, pts, opts) {
  const seen = staff.some((st) => canSeePlayer(st, 1, !(st.state === "chase" || st.state === "search")).seen);
  if (seen) {
    addHeat(Math.min(CFG.heat.seenHavocMax, pts * CFG.heat.seenHavocMult) + (opts.loud ? CFG.heat.seenLoud : 0));
    popup("...and they SAW that.", "bad");
  }
}
function addHeat(n) { game.heatPending += n; }
// heat flows in no faster than maxRisePerSec; cools slowly while you're hidden or nobody's on to you
const starVision = () => CFG.heat.vision[game.stars] ?? 1;
const starsFor = (h) => CFG.heat.stars.filter((x) => h >= x).length;
function updateHeat(dt) {
  const H = CFG.heat;
  if (game.survival) { game.heat = 100; game.heatPending = 0; setStars(5); updateSurvival(dt); updateWanted(dt); return; }   // pinned at the max
  const flow = Math.min(game.heatPending, H.maxRisePerSec * dt);
  game.heatPending -= flow;
  game.heat = Math.min(100, game.heat + flow);
  if (player.hidden) game.heat = Math.max(0, game.heat - H.hiddenCoolPerSec * dt);
  else if (!staff.some((st) => isAlarmed(st) || st.suspicion > 0.05)) game.heat = Math.max(0, game.heat - H.calmCoolPerSec * dt);
  setStars(starsFor(game.heat));
  updateWanted(dt);
}
// the star row: full stars, plus the next one filling as heat builds toward it
const starEls = [...document.querySelectorAll("#stars .st")];
function drawStars() {
  const S = CFG.heat.stars, n = game.stars;
  starEls.forEach((el, i) => {
    el.classList.toggle("on", i < n);
    const lo = i ? S[i - 1] : 0, f = i === n ? clamp((game.heat - lo) / (S[i] - lo), 0, 1) : i < n ? 1 : 0;
    el.firstChild.style.width = Math.round(f * 100) + "%";
    el.firstChild.style.opacity = i < n ? 1 : 0.55;
  });
  $("stars").classList.toggle("rebel", game.survival);
}
const STAR_NEWS = [
  "",
  "★ Staff can spot you in passing periods now",
  "★★ An extra hall monitor is out looking",
  "★★★ Security's sending another guard",
  "★★★★ The principal's out of the office",
  "★★★★★ Every staff member is looking for you",
];
function setStars(n) {
  const was = game.stars;
  if (n === was) return;
  game.stars = n;
  if (tut) return;
  if (n > was) {
    banner(`${"★".repeat(n)}<small>${STAR_NEWS[n].replace(/^★+ /, "")}</small>`, 2.4);
    playBlip([520, 660, 880].slice(0, 1 + Math.min(2, n - 1)), 0.09, "square", 0.06);
    if (n >= 1 && was < 1) pa("heatHigh");
    if (n >= 5 && was < 5) radioAll();
  } else if (!(player.disguiseT > ITEM_TYPES.disguise.sec - 1)) toast(n ? `Heat cooling off: ${"★".repeat(n)}` : "Heat's off. You're just another kid again.", 2);
  $("stars").classList.remove("bump"); void $("stars").offsetWidth; $("stars").classList.add("bump");
}
// extra staff that come out with your stars (and head back once your heat drops)
const WANTED_STAFF = [[2, "hallMonitor"], [3, "securityGuard"], [4, "principal"]];
let wantedT = 0, radioT = 0;
function updateWanted(dt) {
  wantedT -= dt;
  if (wantedT <= 0) {
    wantedT = 0.5;
    for (const [n, key] of WANTED_STAFF) {
      const st = staff.find((s) => s.wanted === n);
      if (game.stars >= n) {
        if (st) st.leaveT = 0;
        else if (!(key === "principal" && staff.some((s) => s.key === "principal"))) {   // (the principal may already be out after strike 2)
          const nw = spawnStaff(key, pickStaffPlace(key)); nw.wanted = n; nw.leaveT = 0;
          if (key === "principal") setTimeout(() => game.state === "playing" && pa("principalOut"), 2500);
        }
      } else if (st && st.state !== "chase" && st.state !== "bust") {
        st.leaveT += 0.5;
        if (st.leaveT >= CFG.heat.extraLeaveSec && !onScreen(st.x, 1.2, st.z)) removeStaff(st);   // back to the office, out of sight
      }
    }
  }
  if (game.stars >= 5 && !game.survival) { radioT -= dt; if (radioT <= 0) { radioT = CFG.heat.radioEverySec; radioNearest(2); } }
}
function removeStaff(st) {
  scene.remove(st.mesh); scene.remove(st.cone); st.cone.geometry.dispose(); st.alert.remove(); st.edge.remove(); st.bubble.remove();
  staff.splice(staff.indexOf(st), 1);
}
function radioNearest(n) {
  const free = staff.filter((o) => chaser(o) && o.state !== "chase" && o.state !== "bust" && o.stunT <= 0)
    .sort((a, b) => Math.hypot(a.x - player.x, a.z - player.z) - Math.hypot(b.x - player.x, b.z - player.z)).slice(0, n);
  for (const o of free) { o.state = "search"; o.searchT = -8; o.suspicion = 0.6; o.lastX = o.tx = player.x + rand(-3, 3); o.lastZ = o.tz = player.z + rand(-3, 3); }
  if (free.length) playBlip([1400, 1100, 1400], 0.05, "square", 0.04);   // radio chirp
  return free.length;
}
function radioAll() { radioT = CFG.heat.radioEverySec; radioNearest(99); pa(null, "All staff: we have a situation. Find that kid.", 4); }
// ---- survival mode ----
function startSurvival() {
  if (game.survival) return;
  game.survival = true; game.survivalT = 0; game.heat = 100; game.heatPending = 0; game.highAlert = true; setStars(5);
  game.nextArrivalT = CFG.survival.staffEverySec; game.nextRadioT = 4;
  banner(`REBEL RUN!<small>Every staff member is after you. Points ×${CFG.survival.scoreMult} until they catch you.</small>`, 3.4);
  setTimeout(() => game.state === "playing" && pa("survival"), game.alarmT > 0 ? 6000 : 1200);
  playBlip([392, 330, 262, 196], 0.18, "sawtooth", 0.08);
  saveGame();
}
function updateSurvival(dt) {
  const V = CFG.survival;
  game.survivalT += dt;
  game.nextArrivalT -= dt;
  if (game.nextArrivalT <= 0) {   // reinforcements, radioed in on your rough location
    game.nextArrivalT = V.staffEverySec;
    if (staff.filter(chaser).length < V.maxStaff) {
      const n = staff.filter((s) => s.survivalArrival).length;
      const key = V.arrivals[n % V.arrivals.length];
      if (key !== "principal" || !staff.some((s) => s.key === "principal")) {
        const st = spawnStaff(key, pickStaffPlace(key)); st.survivalArrival = true;
        st.state = "search"; st.searchT = -10; st.suspicion = 0.6;
        st.lastX = st.tx = player.x + rand(-4, 4); st.lastZ = st.tz = player.z + rand(-4, 4);
        toast(`Another ${STAFF_TYPES[key].name} joins the hunt!`);
      } else game.nextArrivalT = 0.1;
    }
  }
  game.nextRadioT -= dt;
  if (game.nextRadioT <= 0) {   // the two nearest free staff get sent toward wherever you are now
    game.nextRadioT = V.radioEverySec;
    const free = staff.filter((o) => chaser(o) && o.state !== "chase" && o.state !== "bust" && o.stunT <= 0)
      .sort((a, b) => Math.hypot(a.x - player.x, a.z - player.z) - Math.hypot(b.x - player.x, b.z - player.z)).slice(0, 2);
    for (const o of free) { o.state = "search"; o.searchT = -8; o.suspicion = 0.6; o.lastX = o.tx = player.x + rand(-3, 3); o.lastZ = o.tz = player.z + rand(-3, 3); }
    if (free.length) playBlip([1400, 1100, 1400], 0.05, "square", 0.04);   // radio chirp
  }
}

// ---- the fire alarm: a once-a-day kamikaze move ----
const ALARMS = [];
for (const def of LAYOUT.fireAlarms) {
  const H = HALLS[def.h], side = def.side ?? (H.sideType[1] === "block" ? 1 : -1), wl = wallLat(def.h, side);
  const boxMesh = wallBox(def.h, def.t, wl - side * 0.06, 0.32, 0.42, 0.12, 0xd62828, 1.45);
  wallBox(def.h, def.t, wl - side * 0.13, 0.16, 0.08, 0.04, 0xffffff, 1.4);    // the pull handle
  wallBox(def.h, def.t, wl - side * 0.05, 0.3, 0.1, 0.04, 0xffffff, 1.75);    // "FIRE" strip
  const tag = document.createElement("div"); tag.className = "itag alarm"; tagsEl.appendChild(tag);
  ALARMS.push({ h: def.h, t: def.t, side, wl, mesh: boxMesh, tag, armT: 0 });
}
function alarmFront(a, out = {}) { return hallPos(a.h, a.t, a.wl - a.side * 0.7, out); }
function nearestAlarm(range = CFG.interact.range) {
  let best = null, bd = range;
  for (const a of ALARMS) { const f = alarmFront(a, tmp), d = Math.hypot(f.x - player.x, f.z - player.z); if (d < bd) { bd = d; best = a; } }
  return best;
}
// two taps to pull it (the first one arms it), so it never happens by accident
function tryAlarm(a) {
  if (game.alarmPulled) { toast(game.alarmT > 0 ? "It's already ringing!" : "Someone already pulled it today. They're watching it now."); return; }
  if (performance.now() > a.armT) { a.armT = performance.now() + 3500; toast("🔥 Are you sure you're that crazy? You'll definitely get caught. (Pull it again: ★★★★★ and a rebel run.)", 3.4); playBlip([300], 0.06, "square", 0.05); return; }
  pullFireAlarm(a);
}
function pullFireAlarm(a) {
  const F = CFG.fireAlarm, f = alarmFront(a, {});
  game.alarmPulled = true; game.alarmT = F.sec;
  const seen = staff.some((st) => canSeePlayer(st, 1, !(st.state === "chase" || st.state === "search")).seen);
  havoc("fireAlarm", F.points, "FIRE ALARM!", { x: f.x, z: f.z });
  // everyone freezes, hands over their ears
  for (const st of staff) { stunStaff(st, F.stunSec, "flinch"); st.suspicion = 0; st.bubble.textContent = pick(["MY EARS!", "Is that real?!", "Not again..."]); st.barkUntil = performance.now() + 1800; }
  // students pour out of every classroom and stay out while it rings
  for (const c of crowd) {
    if (c.mode === "gone" || c.mode === "spawning") { c.mode = "spawning"; c.spawnAt = game.phaseT + rand(0, 2.5); c.door = pick(DOOR_SPOTS()); c.speed = rand(CFG.crowd.speedMin, CFG.crowd.speedMax) * 1.3; }   // (comes out of any door)
    else if (c.mode === "toClass") { c.mode = "wander"; c.retargetT = 0; }
    c.leaveAt = Infinity;
  }
  // stuff everywhere: items fall out of lockers and backpacks, and they stay until picked up
  const table = goodLoot();
  for (let i = 0; i < F.items; i++) {
    for (let tries = 0; tries < 12; tries++) {
      const h = Math.floor(Math.random() * HALLS.length), t = rand(1.5, HALLS[h].len - 1.5), [lo, hi] = latLimits(h, t), p = hallPos(h, t, rand(lo, hi));
      if (Math.hypot(p.x - player.x, p.z - player.z) < 3) continue;
      const key = pickWeighted(table);
      spawnObject(key, "pickup", p.x, REST_Y[key] ?? 0.04, p.z);   // life: forever
      break;
    }
  }
  $("alarmFx").hidden = false;
  game.heat = 100; game.heatPending = 0;   // straight to the max: this is the kamikaze move
  startSurvival();
  pa("fireAlarm", null, 6);
  banner(`FIRE ALARM!<small>Staff are stunned. Run! Classrooms are locked. Points ×${CFG.survival.scoreMult} from here on.</small>`, 3.4);
}
let alarmBeepT = 0;
function updateAlarm(dt) {
  if (game.alarmT <= 0) return;
  game.alarmT -= dt;
  alarmBeepT -= dt;
  if (alarmBeepT <= 0) { alarmBeepT = 0.7; playBlip([880, 660], 0.16, "square", 0.045); }   // whoop-whoop
  if (game.alarmT <= 0) {   // false alarm. Everyone back to class
    stopAlarm();
    for (const c of crowd) if (isActive(c)) { if (game.phase === "skipping") { c.mode = "toClass"; c.door = pick(floorDoors(floorOf(c.x))); } else c.leaveAt = game.phaseT + rand(2, 8); }
    pa(null, "Okay, false alarm. Everyone back to class. And whoever did this: we WILL find you.", 4.5);
  }
}
function stopAlarm() { game.alarmT = 0; $("alarmFx").hidden = true; }

// ---- flooding a bathroom (from inside it) ----
const PUDDLE_GEO = new THREE.CircleGeometry(1.6, 18);
function floodRestroom() {
  const sp = player.hidden;
  if (!sp || sp.kind !== "restroom" || sp.closed || game.state !== "playing") return;
  const Fl = CFG.flood, f = spotFront(sp, {});
  sp.closed = true;
  exitSpot(false, "Water everywhere. You slosh back out into the hall.");
  havoc("flood", Fl.points, "Flooded the toilets!", { x: f.x, z: f.z });
  dareEvent("flood");
  postGuard(sp, "Due to a... plumbing incident, security will be stationed outside that restroom. Permanently.");
  makeNoise(f.x, f.z, Fl.noiseRadius, true);
  playBlip([180, 150, 120, 100], 0.2, "sine", 0.1);
  if (!sp.puddle) {
    sp.puddle = new THREE.Mesh(PUDDLE_GEO, new THREE.MeshBasicMaterial({ color: 0x5aa9e6, transparent: true, opacity: 0.55, depthWrite: false }));
    sp.puddle.rotation.x = -Math.PI / 2; scene.add(sp.puddle);
  }
  const pp = hallPos(sp.h, sp.t, sp.wallLat - sp.side * 0.9);
  sp.puddle.position.set(pp.x, 0.025, pp.z); sp.puddle.visible = true;
  setTimeout(() => game.state === "playing" && pa("flood"), 1800);
}

// ---- dares ----
function makeDareOffer() {
  const held = new Set(game.dares.map((m) => m.id)), recent = game.daresDone.slice(-CFG.dares.recentAvoid);
  const ids = Object.keys(DARES).filter((id) => !held.has(id) && !recent.includes(id)).sort(() => Math.random() - 0.5);
  for (const id of ids) {
    const D = DARES[id], m = { id, n: 0, need: D.need, p: {}, got: [] };
    if (D.setup && !D.setup(m)) continue;
    return m;
  }
  return null;
}
function takeDare() {
  const m = game.dareOffer;
  if (!m || game.dares.length >= CFG.dares.max) return;
  if (game.phase === "skipping") m.p.armed = false;   // (the clean-period one starts counting next period)
  game.dares.push(m); game.dareOffer = null;
  playBlip([523, 784], 0.07, "triangle", 0.06);
  popup(`📜 Dare: ${DARES[m.id].text(m)}`, "item");
  renderDares(); updateHidePanel();
}
function dareEvent(type, d = {}) {
  for (const m of [...game.dares]) {
    const fn = DARES[m.id].on[type];
    if (!fn || !fn(m, d)) continue;
    m.n = Math.max(m.n + 1, m.got.length);
    if (m.n >= m.need) completeDare(m);
  }
  renderDares();
}
function completeDare(m) {
  const D = DARES[m.id];
  game.dares = game.dares.filter((x) => x !== m); game.daresDone.push(m.id);
  addScore(D.points, "DARE COMPLETE!", "item"); tally("dares");
  banner(`DARE COMPLETE! +${Math.round(D.points * scoreMult())}<small>${D.text(m)}</small>`, 2.4);
  playBlip([523, 659, 784, 1046], 0.09, "triangle", 0.07);
}
// at each bell: dares tied to a period that's over fail; "this period" progress resets. At the end of the day, day dares fail too.
function daresAtBell(dayEnd) {
  const failed = [];
  for (const m of game.dares) {
    const D = DARES[m.id];
    if ((m.p.period && (dayEnd || game.period >= m.p.period)) || (D.scope === "day" && dayEnd)) failed.push(m);
    else if (D.scope === "period") { m.n = 0; m.got = []; }
  }
  if (failed.length) {
    game.dares = game.dares.filter((m) => !failed.includes(m));
    toast(`Dare failed: ${DARES[failed[0].id].text(failed[0])}`, 2.6);
  }
  renderDares();
}
const daresEl = $("dares");
function renderDares() {
  const html = game.dares.map((m) => {
    const D = DARES[m.id], prog = m.need > 1 ? ` <b>${m.n}/${m.need}</b>` : "";
    return `<div>📜 ${D.text(m)}${prog}</div>`;
  }).join("");
  if (daresEl.dataset.h !== html) { daresEl.innerHTML = html; daresEl.dataset.h = html; }
}

const popupsEl = $("popups");
function popup(text, cls = "") {
  const el = document.createElement("div"); el.className = "pop " + cls; el.textContent = text;
  popupsEl.appendChild(el); setTimeout(() => el.remove(), 1600);
  while (popupsEl.children.length > 4) popupsEl.firstChild.remove();
}

// =====================================================================================
// Step 8: the principal, friends and passing-period mini-games, risk scoring
// =====================================================================================
// Step 80: the rubber chicken. BAWK. Staff nearby go and see what that was (a lure), kids laugh.
function squawk(o) {
  playBlip([880, 1320, 700, 1100, 520], 0.07, "sawtooth", 0.09);
  makeNoise(o.x, o.z, o.T.lureRadius, true);
  havoc("rubberChicken", o.T.points, "BAWK!", { x: o.x, z: o.z });
  for (const c of crowd) if (isActive(c) && Math.hypot(c.x - o.x, c.z - o.z) < 5 && Math.random() < 0.4) kidSay(c, ["LMAO", "Was that a CHICKEN?", "*cackling*", "Bawk bawk!"], 2);
  dareEvent("chicken");
}
// Step 80: the disguise kit. Fake mustache, big glasses, and a nose. Nobody recognizes you.
function putOnDisguise() {
  const T = ITEM_TYPES.disguise, S = CFG.heat.stars;
  if (game.stars > 0 && !game.survival) { game.heat = Math.min(game.heat, game.stars >= 2 ? S[game.stars - 2] + 1 : S[0] - 4); game.heatPending = 0; }   // down a star
  let lost = 0;
  for (const st of staff) {
    if (st.state === "chase" || st.state === "search" || st.state === "bust") { st.state = "return"; st.camping = false; setReturnPoint(st); lost++; bark(st, "giveUp", true); }
    st.suspicion = 0;
  }
  game.chaseOn = false;
  player.disguiseT = T.sec; disguiseMesh(true);
  playBlip([523, 659, 784, 1047], 0.08, "triangle", 0.06);
  toast(lost ? "🥸 Disguise on. \"Where'd that kid go?\"" : "🥸 Disguise on. Nobody recognizes you.", 2.4);
  tally("disguise");
}
function disguiseMesh(on) {
  const kid = player.kid; if (!kid) return;
  if (kid.userData.disguise) { kid.remove(kid.userData.disguise); kid.userData.disguise = null; }
  if (!on) return;
  const g = new THREE.Group(), y = kid.userData.headY, r = 0.19, blk = lambert(0x1a1a1a);
  const fur = lambert(0x2a1a10);
  const stache = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.05, 0.035), fur); stache.position.set(0, y - 0.058, r + 0.008); g.add(stache);
  for (const sx of [-1, 1]) { const brow = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.025, 0.02), fur); brow.position.set(sx * 0.075, y + 0.09, r + 0.0); brow.rotation.z = -sx * 0.15; g.add(brow); }
  const nose = new THREE.Mesh(new THREE.IcosahedronGeometry(0.04, 1), lambert(0xf0a28a)); nose.position.set(0, y - 0.015, r + 0.02); g.add(nose);
  for (const sx of [-1, 1]) { const ring = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.014, 4, 12), blk); ring.position.set(sx * 0.075, y + 0.025, r + 0.012); g.add(ring); }
  const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.014, 0.014), blk); bridge.position.set(0, y + 0.03, r + 0.012); g.add(bridge);
  kid.add(g); kid.userData.disguise = g;
}
function tickDisguise(dt) {
  if (!(player.disguiseT > 0)) return;
  player.disguiseT -= dt;
  if (player.disguiseT <= 0) { disguiseMesh(false); toast("The mustache falls off.", 1.6); }
}
// the cheerleader's love note comes with its own dare: get it to the gym during a later period
function perkNoteDare() {
  if (game.dares.some((m) => m.id === "loveNote") || game.dares.length >= CFG.dares.max) return;
  game.dares.push({ id: "loveNote", n: 0, need: 1, got: [], p: { mine: true, has: true, period: Math.min(periodsToday(), game.period + 1 + Math.floor(Math.random() * 3)) } });
  renderDares();
}
function perkToast() { if (game.perk) setTimeout(() => game.state === "playing" && toast(`Your ${OUTFITS[character.look.outfit].label.toLowerCase()} look came with: ${ITEM_TYPES[game.perk].icon} ${ITEM_TYPES[game.perk].label.toLowerCase()}`, 2.8), 2600); }
// Step 77: guards posted for the rest of the run: outside a restroom you flooded, outside the office you raided.
function postGuard(sp, line) {
  const i = SPOTS.indexOf(sp);
  if (game.posts.includes(i)) return;
  game.posts.push(i);
  if (sp.kind === "restroom") {   // step 82: they walk over from the main office at the next passing period
    (game.postQueue ??= []).push(sp);
    if (line) setTimeout(() => game.state === "playing" && pa(null, line, 4.5), 2500);
    toast("🛡 Security will be posted there from next period. For good.", 2.6);
    return;
  }
  const st = spawnPost(sp); if (st) st.postGrace = 6;   // a head start: they don't see you until you've been back out for 6 s
  if (line) setTimeout(() => game.state === "playing" && pa(null, line, 4.5), 2500);
  toast("🛡 A security guard is posted there now. For good.", 2.6);
}
const postPoint = (sp) => hallPos(sp.h, sp.t + 1.1, sp.wallLat - sp.side * 0.55);
function spawnPost(sp, from = null) {
  if (staff.some((s) => s.key === "postedGuard" && s.post === sp)) return null;
  const p = postPoint(sp), at = from ?? p;
  const st = spawnStaff("postedGuard", { post: sp, h: hallProject(at.x, at.z).h, x: at.x, z: at.z, facing: Math.atan2(-sp.side * HALLS[sp.h].nx, -sp.side * HALLS[sp.h].nz) });
  if (st && from) st.commute = { x: p.x, z: p.z };
  return st;
}
// step 82: guards for flooded restrooms leave the main office at the start of the next passing period and walk to their post
function sendQueuedPosts() {
  const q = game.postQueue; if (!q?.length) return;
  game.postQueue = [];
  const office = SPOTS.find((s) => s.kind === "classroom" && s.roomType === "office");
  for (const sp of q) {
    const st = spawnPost(sp, office ? spotFront(office, {}) : null);
    if (st) { st.postGrace = 3; if (office && Math.hypot(st.x - player.x, st.z - player.z) < 25) toast("🛡 A guard heads out of the main office to their new post.", 2.4); }
  }
}
function spawnPosts() { game.postQueue = []; for (const i of game.posts) if (SPOTS[i]) spawnPost(SPOTS[i]); }
function ensurePrincipal(announce) {
  if (staff.some((s) => s.key === "principal")) return;
  spawnStaff("principal", pickStaffPlace("principal"));
  if (announce) setTimeout(() => game.state === "playing" && pa("principalOut"), 4000);
}

// One score number. Flat bonuses that aren't havoc (no heat): friends, near misses, nerve.
function addScore(pts, label, cls = "") {
  pts = Math.round(pts * scoreMult());
  game.score += pts;
  if (label) popup(`+${pts} ${label}`, cls);
  return pts;
}

function updateRisk(dt) {
  const S = CFG.scoring;
  // unseen streak: anyone with eyes on you (and starting to notice) resets it
  const watched = !player.hidden && staff.some((st) => (st.suspicion > 0.3 || st.state === "chase") && canSeePlayer(st, 1.4, false).seen);
  game.unseenT = watched ? 0 : game.unseenT + dt;
  // near miss: staff within arm's reach who don't see you
  game.nearMissT = Math.max(0, game.nearMissT - dt);
  if (!player.hidden && player.invisT <= 0) {
    for (const st of staff) {
      st.nearCD = Math.max(0, (st.nearCD ?? 0) - dt);
      if (!chaser(st) || st.nearCD > 0 || st.stunT > 0 || st.state === "chase" || st.state === "bust") continue;
      if (Math.hypot(st.x - player.x, st.z - player.z) > S.nearMissRadius || canSeePlayer(st, 1, true).seen) continue;
      st.nearCD = S.nearMissCooldownSec;
      if (game.nearMissT <= 0) popup(`NEAR MISS! ×${S.nearMissMult}`, "item");
      game.nearMissT = S.nearMissSec;
    }
  }
  // hiding close to staff: nerves of steel
  if (player.hidden) {
    const n = staff.filter((st) => Math.hypot(st.x - player.x, st.z - player.z) < S.hidingNearRadius).length;
    game.nerveAcc += n * S.hidingNearPerSec * dt;
    if (game.nerveAcc >= 8) { addScore(game.nerveAcc, "nerves of steel", "small"); game.nerveAcc = 0; }
  } else game.nerveAcc = 0;
}

// ---- friends: a few kids in the crowd who raise a hand during passing periods ----
const friendsEl = $("friends");
const OFFER_ICONS = { highFive: "✋", gumTrade: "🍬?", fakePass: "🎫", dare: "📜" };
const OFFER_LABELS = { highFive: "High five", gumTrade: "Trade gum", fakePass: "Fake pass", dare: "Dare" };
{
  const c = new THREE.Color();
  crowd.slice(0, CFG.friends.count).forEach((k, i) => {
    k.friend = { offer: pickWeighted(CFG.friends.offers), cd: 0, el: document.createElement("button") };
    k.friend.el.className = "fbubble"; k.friend.el.type = "button";
    k.friend.el.addEventListener("pointerdown", (e) => { e.preventDefault(); e.stopPropagation(); friendTap(k); });
    friendsEl.appendChild(k.friend.el);
    k.shirt.setHex(0xf5f5f5);   // friends wear white tees
  });
}
function friendTap(c) {
  const F = c.friend, R = CFG.friends;
  if (game.state !== "playing" || F.cd > 0) return;
  if (Math.hypot(c.x - player.x, c.z - player.z) > R.interactRange) { toast("Get closer!"); return; }
  if (F.offer === "highFive") {
    addScore(R.highFivePoints, "High five!", "item"); tally("highFives"); dareEvent("highFive"); playBlip([880, 1320], 0.06, "square", 0.06);
  } else if (F.offer === "gumTrade") {
    const i = game.hotbar.findIndex((s) => s && s.key === "gum");
    if (i < 0) { toast("Friend: \"Got any gum?\" (Bring them gum to trade.)"); return; }
    addScore(R.gumTradePoints, "Gum trade!", "item"); tally("gumTrades");
    dareEvent("gumTrade");
    if (!game.passShield) {   // the main way to get a fake pass
      consumeSlot(i); game.passShield = true;
      popup("🎫 They slip you a fake pass! Your next catch doesn't count.", "item"); playBlip([523, 659, 784], 0.08, "triangle", 0.06);
    } else {
      const got = pickWeighted(goodLoot().filter(([k]) => k !== "gum"));
      game.hotbar[i] = { key: got, uses: ITEM_TYPES[got].uses ?? 1 }; renderHotbar();
      popup(`Traded gum for ${ITEM_TYPES[got].icon} ${ITEM_TYPES[got].label}`, "item"); playBlip([660, 990], 0.06, "triangle", 0.06);
    }
  } else if (F.offer === "dare") {   // step 70: a friend dares you (skips the restroom kid)
    if (game.dares.length >= CFG.dares.max) { toast(`Friend: "You've already got ${game.dares.length} dares going. Finish one!"`); return; }
    const m = makeDareOffer(); if (!m) { toast("Friend: \"Eh, I'm out of ideas.\""); return; }
    game.dareOffer = m; m.line = pick(DARE_KID_LINES); takeDare();
  } else if (F.offer === "fakePass") {
    if (game.passShield) { toast("You already have a fake pass."); return; }
    game.passShield = true; popup("🎫 Fake pass! Your next catch doesn't count.", "item"); playBlip([523, 659, 784], 0.08, "triangle", 0.06);
  }
  F.cd = R.cooldownSec; F.offer = pickWeighted(R.offers);
}
function updateFriends(dt) {
  for (const c of crowd) if (c.friend) c.friend.cd = Math.max(0, c.friend.cd - dt);
}
function drawFriends() {
  const w = window.innerWidth, h = window.innerHeight, R = CFG.friends;
  for (const c of crowd) {
    const F = c.friend; if (!F) continue;
    const d = Math.hypot(c.x - player.x, c.z - player.z);
    let show = game.state === "playing" && game.phase === "passing" && isActive(c) && c.slipT <= 0 && F.cd <= 0 && d < R.offerRange && !player.hidden;
    if (show) show = lineOfSight(player.x, player.z, c.x, c.z);
    if (show) {
      projA.set(c.x, 1.85, c.z).applyMatrix4(camera.matrixWorldInverse); show = projA.z < -0.2;
      if (show) {
        projA.set(c.x, 1.85, c.z).project(camera);
        show = Math.abs(projA.x) < 1 && Math.abs(projA.y) < 1;
        F.el.style.left = ((projA.x + 1) / 2) * w + "px"; F.el.style.top = ((1 - projA.y) / 2) * h + "px";
      }
    }
    F.el.style.display = show ? "block" : "none";
    if (show) {
      const txt = OFFER_ICONS[F.offer], near = d < R.interactRange;
      if (F.el.dataset.t !== txt + near) { F.el.dataset.t = txt + near; F.el.textContent = txt; F.el.title = OFFER_LABELS[F.offer]; F.el.classList.toggle("near", near); }
    }
  }
}

// ---- paper airplanes: kids toss them across the hall during passing; catch one with E (or tap it), or pick it up once it lands ----
function updateAirplanes(dt) {
  if (game.phase === "passing") {
    game.nextPlaneT -= dt;
    if (game.nextPlaneT <= 0) {
      game.nextPlaneT = rand(...CFG.airplanes.everySec);
      const throwers = crowd.filter((c) => isActive(c) && !c.friend && c.slipT <= 0 && (() => { const d = Math.hypot(c.x - player.x, c.z - player.z); return d > 4 && d < 11; })() && lineOfSight(c.x, c.z, player.x, player.z));
      if (throwers.length && !player.hidden) {
        const c = pick(throwers), tx = player.x + rand(-0.6, 0.6), tz = player.z + rand(-0.6, 0.6), d = Math.hypot(tx - c.x, tz - c.z), sp = 5;
        spawnObject("paperAirplane", "flying", c.x, 1.6, c.z, { vx: (tx - c.x) / d * sp, vz: (tz - c.z) / d * sp, vy: 0.1, wild: true });
      }
    }
  }
  // step 82: no catching by walking into one. Press E (or tap it) while it's in the air, or pick it up off the floor.
}
// step 79: a kid near you drops a banana peel now and then during passing periods
const PEEL_LINES = ["Done with this.", "*drops peel*", "Potassium, baby.", "Someone'll clean it up."];
function updatePeelDrops(dt) {
  if (game.phase !== "passing" || game.dismissal || tut) return;
  const P = CFG.peelDrops;
  game.peelT = (game.peelT ?? rand(...P.everySec)) - dt;
  if (game.peelT > 0) return;
  game.peelT = rand(...P.everySec);
  if (objects.filter((o) => !o.dead && o.key === "bananaPeel" && o.state === "pickup").length >= P.maxLying) return;
  const c = pick(crowd.filter((k) => isActive(k) && !k.friend && k.slipT <= 0 && floorOf(k.x) === floorOf(player.x) && (() => { const d = Math.hypot(k.x - player.x, k.z - player.z); return d > P.range[0] && d < P.range[1]; })()));
  if (!c) return;
  spawnObject("bananaPeel", "pickup", c.x, REST_Y.bananaPeel ?? 0.04, c.z);
  kidSay(c, PEEL_LINES, 2.6);
}
function catchPlane(o) {
  if (!addItem("paperAirplane")) return;
  addScore(CFG.airplanes.catchPoints, "Caught it!", "item"); tally("planeCatch");
  removeObject(o);
}

// =====================================================================================
// Ads. Placeholder provider for now: shows a fake ad screen. A real network (for example Google's H5 Games Ads
// adBreak API) plugs into show(). Rules from the spec: interstitial at most once per day, only between days or
// after a strike, never mid-run; rewarded ads (forge a note, fake pass) are always optional.
// =====================================================================================
const Ads = {
  interstitialsToday: 0, rewardedToday: {},
  newDay() { this.interstitialsToday = 0; this.rewardedToday = {}; },
  canInterstitial() { return CFG.ads.enabled && this.interstitialsToday < CFG.ads.interstitialsPerDay; },
  canRewarded(kind) { return CFG.ads.enabled && (this.rewardedToday[kind] ?? 0) < (CFG.ads[kind + "PerDay"] ?? 0); },
  interstitial(done) { this.interstitialsToday++; this.show("interstitial", () => done()); },
  rewarded(kind, onReward, onSkip) {
    this.rewardedToday[kind] = (this.rewardedToday[kind] ?? 0) + 1;
    this.show("rewarded", (finished) => (finished ? onReward() : onSkip?.()));
  },
  show(kind, done) {   // placeholder: a countdown screen. Rewarded ads only pay out if you sit through them.
    const prev = game.state;
    game.state = "ad"; releaseControls();
    const el = $("ad"), close = $("adClose"), count = $("adCount");
    $("adKind").textContent = kind === "rewarded" ? "rewarded ad (placeholder)" : "ad break (placeholder)";
    el.hidden = false; close.hidden = true;
    let left = CFG.ads.placeholderSec;
    count.textContent = `${left}...`;
    const tick = setInterval(() => {
      left--;
      if (left > 0) { count.textContent = `${left}...`; return; }
      clearInterval(tick); count.textContent = kind === "rewarded" ? "Reward unlocked!" : "";
      close.hidden = false;
    }, 1000);
    const finish = (finished) => { clearInterval(tick); el.hidden = true; close.onclick = skip.onclick = null; game.state = prev; done(finished); clock.getDelta(); };
    const skip = $("adSkip");
    skip.hidden = kind !== "rewarded";
    close.onclick = () => finish(true);
    skip.onclick = () => finish(false);
  },
};

// =====================================================================================
// Step 72: the tutorial. Three short scenes (run from staff, throw something, hide), then you're on your own.
// It runs inside the real game: a card can freeze the world, dim the screen, and leave holes over the controls it's
// talking about. Runs before your first run, and from "How to play" on the title screen.
// =====================================================================================
const TUT_KEY = "hallwaySkip.tutorial.v1";
function tutSeen() { try { return !!localStorage.getItem(TUT_KEY) || loadRuns().length > 0 || !!loadSave(); } catch (e) { return true; } }
function markTutSeen() { try { localStorage.setItem(TUT_KEY, "1"); } catch (e) { /* fine */ } }
const tutEl = $("tut"), tutCard = $("tutCard"), tutDim = $("tutDim"), tutHoles = $("tutHoles"), tutRings = $("tutRings");
const touchy = () => isTouch && !usingKeys;
const say = (touch, kbd) => (touchy() ? touch : kbd);
const key = (k) => `<kbd>${k}</kbd>`;

// what a hole goes around: a page element, or a spot in the world (a radius in px)
const elHole = (sel, pad = 8) => () => {
  const el = document.querySelector(sel); if (!el || el.closest("[hidden]")) return null;
  const r = el.getBoundingClientRect(); if (!r.width) return null;
  return { x: r.left - pad, y: r.top - pad, w: r.width + pad * 2, h: r.height + pad * 2 };
};
const worldHole = (getP, rad) => () => {
  const p = getP(); if (!p) return null;
  projA.set(p.x, p.y, p.z).applyMatrix4(camera.matrixWorldInverse); if (projA.z > -0.2) return null;
  projA.set(p.x, p.y, p.z).project(camera);
  const x = ((projA.x + 1) / 2) * window.innerWidth, y = ((1 - projA.y) / 2) * window.innerHeight;
  return { x: x - rad, y: y - rad, w: rad * 2, h: rad * 2 };
};
const HOLE = {
  stick: elHole("#stickGuide .gBase", 14), look: elHole("#lookGuide", 16), sprint: elHole("#sprintBtn", 10), slot0: elHole("#hotbar .slot", 8),
  locker: worldHole(() => tut?.locker && { ...hallPos(tut.locker.h, tut.locker.t, tut.locker.wallLat - tut.locker.side * 0.15, {}), y: 1.05 }, 58),
  mon: worldHole(() => tut?.mon && { x: tut.mon.x, y: 1.2, z: tut.mon.z }, 46),
  plane: worldHole(() => tut?.plane && !tut.plane.dead && { x: tut.plane.x, y: tut.plane.y, z: tut.plane.z }, 40),
};

function tutCardShow(html, { center = false, low = false, next = null, dim = 0, holes = [], rings = holes, freeze = false, block = !!next, extra = "" } = {}) {
  tut.frozen = freeze; tut.holes = holes; tut.rings = rings; tut.waitNext = !!next;
  tutDim.style.opacity = dim;
  tutDim.style.pointerEvents = block ? "auto" : "none";
  tutCard.className = center ? "center" : low ? "low" : "";
  $("tutSkip").style.visibility = low ? "hidden" : "";   // (it would sit on a low card's corner)
  tutCard.hidden = !html;
  tutCard.innerHTML = html + (next || extra ? `<div class="tutBtns">${next ? `<button class="go" id="tutNext" type="button">${next}</button>` : ""}${extra}</div>` : "");
  if (next) $("tutNext").onclick = (e) => { e.stopPropagation(); tutAdvance(); };
  if (freeze) { releaseControls(); cancelAim(); }
}
const tutHide = () => tutCardShow("", {});

// where to put someone `dist` m from you along your hall: ahead of the camera if we can (so you see them), with a clear view.
// (or, with `yaw`, ahead of / behind that direction)
function tutAlongHall(dist, preferAhead = true, yaw = cam.yaw) {
  const P = hallProject(player.x, player.z), H = HALLS[P.h];
  const fwd = Math.sin(yaw) * H.dx + Math.cos(yaw) * H.dz;
  const dirs = (fwd >= 0) === preferAhead ? [1, -1] : [-1, 1];
  for (const s of dirs) {
    const t = clamp(P.t + s * dist, 0.5, H.len - 0.5);
    if (Math.abs(t - P.t) < dist * 0.6) continue;
    const p = hallPos(P.h, t, 0);
    if (lineOfSight(p.x, p.z, player.x, player.z)) return { h: P.h, t, to: s > 0 ? H.a : H.b };
  }
  const t = P.t + (P.t < H.len / 2 ? 1 : -1) * Math.min(dist, H.len / 2);
  return { h: P.h, t, to: t > P.t ? H.a : H.b };
}
function tutMonitor(place) {
  const st = spawnStaff("hallMonitor", place);
  st.route = null; st.roamT = 999;   // keep walking the way it's headed
  return st;
}

// The steps. enter() sets up; tick() returns true when it's time to move on.
const TUT_STEPS = [
  { id: "pitch", // the pitch
    enter() {
      tutCardShow(`<h2>You're never going to class again.</h2><p>You're the trouble-maker. The slacker. The delinquent.</p>
        <p>Stay out in the halls and cause as much havoc as you can for a high score.</p>`, { center: true, next: "Let's go", dim: 0.88, freeze: true });
    },
  },
  { id: "move", // move and look around
    enter() {
      tut.moved = 0; tut.looked = 0; tut.lastX = player.x; tut.lastZ = player.z; tut.doneT = 0; tut.shown = "";
      tut.lockMove = false;
    },
    tick(dt) {
      if (!player.hidden) tut.moved += Math.hypot(player.x - tut.lastX, player.z - tut.lastZ);
      tut.lastX = player.x; tut.lastZ = player.z;
      const mv = tut.moved > 3, lk = tut.looked > 0.9, both = mv && lk;
      const html = `<p><b>Get the feel of it.</b></p><ul class="tutTasks">
        <li class="${mv ? "ok" : ""}">${say("Move: drag your <b>left thumb</b>", `Move: ${key("W")}${key("A")}${key("S")}${key("D")} or the arrow keys`)}</li>
        <li class="${lk ? "ok" : ""}">${say("Look around: drag the <b>right side</b>", "Look around: drag with the mouse")}</li></ul>`;
      const k = html + both;
      if (tut.shown !== k) { tut.shown = k; tutCardShow(html, { dim: both ? 0 : touchy() ? 0.5 : 0.25, holes: touchy() ? [HOLE.stick, HOLE.look] : [] }); }
      if (both) tut.doneT += dt;
      return tut.doneT > 0.8 || tut.t > 40;
    },
  },
  { id: "monitor", // a hall monitor spots you and heads your way
    enter() {
      tutHide();
      tut.mon = tutMonitor(tutAlongHall(12));
      startChase(tut.mon);
    },
    tick() { return (tut.t > 1.1 && Math.hypot(tut.mon.x - player.x, tut.mon.z - player.z) < 9.5) || tut.t > 2.5; },
  },
  { id: "run", // run! (moving, sprinting or the button carries on)
    enter() {
      tutCardShow(`<p class="big">🚨 A hall monitor spotted you!</p><p>Run away. ${say("Hold <b>🏃</b> to sprint.", `Hold ${key("Shift")} to sprint.`)}</p>`,
        { next: "Run!", dim: 0.6, freeze: true, block: false, holes: touchy() ? [HOLE.mon, HOLE.sprint] : [HOLE.mon] });
    },
    tick() { return tut.t > 0.3 && (keys.size > 0 || stick.id !== null || sprintTouch); },
  },
  { id: "escape", // get away
    enter() {
      tutCardShow(`<p>${say("Hold <b>🏃</b> and run!", `Hold ${key("Shift")} and run!`)} Get out of sight and they'll lose you.</p>`, { rings: touchy() ? [HOLE.sprint] : [] });
    },
    tick() {
      const st = tut.mon, d = Math.hypot(st.x - player.x, st.z - player.z);
      return player.hidden || (st.state !== "chase" && st.state !== "bust") || d > 18;
    },
  },
  { id: "lost", // the lesson
    enter() {
      tutCardShow(`<p class="big">😅 You lost them!</p><p>Avoid staff, or you'll get caught skipping.</p>`,
        { center: true, next: "Next", dim: 0.7, freeze: true });
    },
  },
  { id: "heat", // step 75: heat stars
    enter() {
      game.heat = CFG.heat.stars[0] + 4; game.stars = 1; document.body.classList.add("tutHeat");
      tutCardShow(`<p class="big">⭐ Heat</p><p>Staff saw you, so you got a star. More stars, more staff. Hide to cool off.</p>`,
        { low: true, next: "Next", dim: 0.7, freeze: true, holes: [elHole("#stars", 8)] });
    },
  },
  { id: "plane", // scene 1. A normal passing period; a kid throws you a paper airplane.
    enter() {
      tutHide();
      tutScene(); tut.lockMove = true; tut.plane = null; tut.planeCard = tut.pickCard = false;
      banner("PASSING PERIOD<small>Kids heading to class</small>", 1.8);
    },
    tick() {
      if (tut.t > 1.4 && !tut.plane) tutThrowPlane();
      if (game.hotbar.some((s) => s?.key === "paperAirplane")) return true;
      const pl = tut.plane;
      // step 82: catching is on you now. Freeze it in the air close by and say how.
      if (pl && !pl.dead && !tut.planeCard && pl.state === "flying" && Math.hypot(pl.x - player.x, pl.z - player.z) < 2.6) {
        tut.planeCard = true;
        tutCardShow(`<p class="big">✈️ Incoming!</p><p>${say("Tap the airplane to catch it.", `Press ${key("E")} to catch it.`)}</p>`, { dim: 0.5, freeze: true, holes: [HOLE.plane] });
      }
      if (pl && (pl.dead || pl.state !== "flying") && !game.hotbar.some((s) => s?.key === "paperAirplane") && tut.t > 3 && !tut.planeCard) {   // it landed before it got close
        if (pl.dead) { addItem("paperAirplane"); return true; }
        if (!tut.pickCard) { tut.pickCard = true; tutCardShow(`<p>${say("Tap the airplane on the floor to pick it up.", `Walk to the airplane and press ${key("E")}.`)}</p>`, { low: true }); tut.lockMove = false; }
      }
      return false;
    },
  },
  { id: "throw", // throw it
    enter() {
      tutCardShow(`<p class="big">✈️ You caught a paper airplane!</p><p>${say("Tap it in your items to throw it.", `Press ${key("1")} or click it to throw it.`)}</p>`,
        { dim: 0.62, freeze: true, holes: [HOLE.slot0] });
    },
    tick() { return !game.hotbar.some((s) => s?.key === "paperAirplane"); },
  },
  { id: "fly", // watch it fly
    enter() { tutHide(); tut.thrown = objects.filter((o) => o.key === "paperAirplane" && !o.wild).pop() ?? null; tut.landT = 0; },
    tick(dt) {
      const o = tut.thrown;
      if (!o || o.dead || o.state !== "flying") tut.landT += dt;
      return tut.landT > 0.6 || tut.t > 4;
    },
  },
  { id: "thrown", // the lesson
    enter() {
      tutCardShow(`<p class="big">🎯 Nice throw.</p><p>Lots of stuff can be thrown. Find it all over school.</p>`,
        { center: true, next: "Next", dim: 0.7, freeze: true });
    },
  },
  { id: "dares", // step 75: dares
    enter() {
      if (!game.dares.some((m) => m.id === "airplaneStaff")) game.dares.push({ id: "airplaneStaff", n: 0, need: 1, p: {}, got: [] });
      renderDares(); document.body.classList.add("tutDares");
      tutCardShow(`<p class="big">📜 Dares</p><p>Kids will dare you to do stuff. Pull it off for big points.</p>`,
        { low: true, next: "Next", dim: 0.7, freeze: true, holes: [elHole("#dares", 8)] });
    },
  },
  { id: "tardy", // scene 2. Tardy: the hall empties out and a hall monitor is coming.
    enter() {
      tutHide();
      tutScene(); tut.lockMove = true; tut.blind = true;
      const lk = SPOTS.filter((sp) => sp.kind === "locker" && !sp.busted && floorOf(spotFront(sp, {}).x) === floorOf(player.x));
      lk.sort((a, b) => spotDist(a) - spotDist(b));
      const sp = tut.locker = lk.find((s) => HALLS[s.h].len > 14) ?? lk[0], H = HALLS[sp.h];
      const s = sp.t + 18 < H.len ? 1 : -1;   // look down the hall the long way
      const p = hallPos(sp.h, sp.t - s * 3.4, -sp.side * 0.9);   // across the hall, so the locker's in plain view
      player.x = p.x; player.z = p.z; player.heading = cam.yaw = hallHeading(sp.h, s); manualCamT = 0;
      startSkipping();
      tut.mon = tutMonitor({ h: sp.h, t: clamp(sp.t + s * 17, 0.5, H.len - 0.5), to: s > 0 ? H.a : H.b });
    },
    tick() { return tut.t > 3.8; },
  },
  { id: "hide", // hide!
    enter() {
      tutCardShow(`<p class="big">🔔 Tardy!</p><p>The halls are empty. Hide in the glowing locker: ${say("walk into it or tap it.", `walk into it or press ${key("E")}.`)}</p>`,
        { next: "Got it", dim: 0.6, freeze: true, block: false, holes: [HOLE.locker] });
    },
    tick() { return player.hidden || (tut.t > 0.3 && (keys.size > 0 || stick.id !== null)); },
  },
  { id: "locker", // get in there
    enter() {
      tut.lockMove = false; tut.stayHidden = false; document.body.classList.remove("tutStay");
      game.lockerUses = Math.max(game.lockerUses, 2);   // (whatever happened, you can always get back in)
      for (const sp of SPOTS) if (sp.kind === "locker" && sp.busted) { sp.busted = false; sp.door.material.color.setHex(0x7d9a86); sp.door.rotation.y = sp.doorRot; }
      tutCardShow(player.hidden ? "" : `<p>Into the locker!</p>`, { rings: [HOLE.locker] });
    },
    tick() {
      if (tut.t > 12 && !tut.nudged) { tut.nudged = true; toast("Walk right into the glowing locker.", 2.4); }
      return !!player.hidden;
    },
  },
  { id: "walkPast", // it walks right past
    enter() { tutHide(); tut.minD = Infinity; tut.stayHidden = true; document.body.classList.add("tutStay"); },   // step 78: no leaving until it's gone by
    tick() {
      if (!player.hidden) { tutGo("locker"); return false; }
      const f = spotFront(player.hidden, {}), d = Math.hypot(tut.mon.x - f.x, tut.mon.z - f.z);
      tut.minD = Math.min(tut.minD, d);
      const done = (tut.minD < 4 && d > tut.minD + 3) || tut.t > 9;
      if (done) { tut.stayHidden = false; document.body.classList.remove("tutStay"); }
      return done;
    },
  },
  { id: "hidden", // the lesson
    enter() {
      tutCardShow(`<p class="big">🤫 It walked right past.</p><p>Staff can't see you while you hide. But you can't stay forever.</p>`,
        { center: true, next: "Next", dim: 0.7, freeze: true });
    },
  },
  { id: "days", // step 75: periods, days and strikes
    enter() {
      document.body.classList.add("tutDays");
      tutCardShow(`<p class="big">🏁 Survive the day</p><p>Six periods a day. Three strikes and you're out.</p><p class="soon">Coming soon: unlock outfits.</p>`,
        { low: true, next: "Next", dim: 0.7, freeze: true, holes: [elHole("#phase", 6), elHole("#strikes", 6)] });
    },
  },
  { id: "alarm", // step 75: the fire alarm, a last resort
    enter() {
      tutCardShow(`<p class="big">🔥 Fire alarm</p><p>Last resort. ★★★★★, double points, one catch ends it all.</p>`,
        { center: true, next: "Next", dim: 0.8, freeze: true });
    },
  },
  { id: "end", // the end
    enter() {
      $("tutSkip").hidden = true;
      tutCardShow(`<h2>That's the basics.</h2><p>Go find the rest.</p>`,
        { center: true, dim: 0.85, freeze: true,
          extra: `<button class="go" id="tutPlay" type="button">Play</button><button class="go ghost" id="tutRules" type="button">📖 Rules &amp; controls</button>` +
            (tut.thenPlay ? "" : `<button class="go ghost" id="tutTitle" type="button">Back to title</button>`) });
      $("tutPlay").onclick = (e) => { e.stopPropagation(); endTutorial(true); };
      $("tutRules").onclick = (e) => { e.stopPropagation(); $("about").hidden = false; };
      if ($("tutTitle")) $("tutTitle").onclick = (e) => { e.stopPropagation(); endTutorial(false); };
    },
  },
];

// a fresh passing period with nobody on staff
function tutScene() {
  const keep = game.hotbar.slice();
  morningSetup(false); clearStaff(); clearObjects();
  game.hotbar = keep.map(() => null); renderHotbar();
  tut.blind = false; tut.mon = null;
}
// a kid in front of you tosses you a paper airplane
function tutThrowPlane() {
  const fx = Math.sin(cam.yaw), fz = Math.cos(cam.yaw);
  const ok = (c) => { const dx = c.x - player.x, dz = c.z - player.z, d = Math.hypot(dx, dz); return d > 4 && d < 9 && (dx * fx + dz * fz) / d > 0.55 && lineOfSight(c.x, c.z, player.x, player.z); };
  let c = crowd.find((k) => isActive(k) && !k.friend && k.slipT <= 0 && ok(k));
  if (!c) {   // nobody handy: one wanders over
    c = crowd.find((k) => isActive(k) && !k.friend);
    const pl = tutAlongHall(6.5); c.h = pl.h; c.t = pl.t; c.lat = c.targetLat = 0.4; hallPos(c.h, c.t, c.lat, c);
  }
  c.mode = "wander"; c.retargetT = 3;
  const tx = player.x, tz = player.z, d = Math.hypot(tx - c.x, tz - c.z), sp = 5;
  tut.plane = spawnObject("paperAirplane", "flying", c.x, 1.6, c.z, { vx: (tx - c.x) / d * sp, vz: (tz - c.z) / d * sp, vy: 0.1, wild: true });
  kidSay(c, ["Heads up!", "Catch!", "Yo, catch!"]);
}
function tutCaught(st) {   // practice: no strike. Put them back a bit and keep going.
  const pl = tutAlongHall(10, false, player.heading), p = hallPos(pl.h, pl.t, 0);   // behind you, the way you're running
  tut.caughtN = (tut.caughtN ?? 0) + 1;
  st.x = p.x; st.z = p.z; st.h = pl.h; st.t = pl.t;
  startChase(st);
  player.invisT = 1.2;
  toast("Caught! In a real game, that's a strike. Try again: sprint away!", 2.6);
}

function tutGo(i) {
  if (typeof i === "string") i = TUT_STEPS.findIndex((S) => S.id === i);
  tut.i = i; tut.t = 0;
  TUT_STEPS[i].enter?.();
}
function tutAdvance() { if (tut && tut.i < TUT_STEPS.length - 1) tutGo(tut.i + 1); }
function tutTick(dt) {
  tut.t += dt;
  // keep the world quiet: no surprise planes, friend offers, or bells
  game.nextPlaneT = 99;
  for (const c of crowd) if (c.friend) c.friend.cd = Math.max(c.friend.cd, 5);
  game.phaseT = Math.min(game.phaseT, CFG.morning.streamSec + 4);   // (long enough for the morning arrivals)
  game.heat = Math.min(game.heat, CFG.heat.stars[1] - 1); game.heatPending = 0;   // one star at most (no extra staff)
  if (tut.blind) for (const st of staff) if (st.state !== "patrol") { st.state = "patrol"; st.suspicion = 0; st.camping = false; }   // it really doesn't see you
  const S = TUT_STEPS[tut.i];
  if (S.tick?.(dt)) tutAdvance();
}
// the dim layer and its holes, and the flashing rings
const tutPool = [], ringPool = [];
function tutDraw() {
  const holes = (tut.holes ?? []).map((f) => f()).filter(Boolean), rings = (tut.rings ?? []).map((f) => f()).filter(Boolean);
  while (tutPool.length < holes.length) { const r = document.createElementNS("http://www.w3.org/2000/svg", "rect"); r.setAttribute("fill", "black"); tutHoles.appendChild(r); tutPool.push(r); }
  tutPool.forEach((r, i) => {
    const h = holes[i];
    if (!h) { r.setAttribute("width", 0); return; }
    r.setAttribute("x", h.x); r.setAttribute("y", h.y); r.setAttribute("width", h.w); r.setAttribute("height", h.h);
    r.setAttribute("rx", Math.min(h.w, h.h) / 2);
  });
  while (ringPool.length < rings.length) { const d = document.createElement("div"); d.className = "tutRing"; tutRings.appendChild(d); ringPool.push(d); }
  ringPool.forEach((d, i) => {
    const h = rings[i];
    d.style.display = h ? "block" : "none";
    if (h) { d.style.left = h.x + "px"; d.style.top = h.y + "px"; d.style.width = h.w + "px"; d.style.height = h.h + "px"; d.style.borderRadius = Math.min(h.w, h.h) / 2 + "px"; }
  });
}
function startTutorial(thenPlay) {
  initAudio();
  resetGame();
  $("title").hidden = true; $("caught").hidden = true;
  tut = { i: 0, t: 0, thenPlay, frozen: false, lockMove: false, blind: false, looked: 0, holes: [], rings: [] };
  document.body.classList.add("tut");
  tutEl.hidden = false; $("tutSkip").hidden = false;
  game.state = "playing";
  renderDares();
  tutGo(0);
  tryFullscreenLandscape();
  clock.getDelta();
}
function endTutorial(play) {
  markTutSeen();
  tut = null;
  document.body.classList.remove("tut", "tutHeat", "tutDares", "tutDays", "tutStay");
  tutEl.hidden = true; tutCard.hidden = true;
  releaseControls(); cancelAim();
  if (play) { startRun(null); clock.getDelta(); return; }
  resetGame(null, false);
  game.state = "title"; $("title").hidden = false;
  updateCrowd(0.016); drawCrowd();
}
$("tutSkip").addEventListener("click", (e) => { e.stopPropagation(); if (tut) tutGo("end"); });
tutDim.addEventListener("click", (e) => { e.stopPropagation(); if (tut?.waitNext) tutAdvance(); });   // tap anywhere on a card's dim to carry on
tutCard.addEventListener("click", (e) => e.stopPropagation());

// =====================================================================================
// Main loop
// =====================================================================================
function resize() {
  const w = window.innerWidth, h = window.innerHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h; camera.updateProjectionMatrix();
}
window.addEventListener("resize", resize);
resize();

const debug = URLQ.has("debug");
ui.fps.hidden = !debug;
let fpsAcc = 0, fpsN = 0;
const clock = new THREE.Clock();
let timeScale = 1;
const slowFx = $("slowFx");
resetGame(null, false);        // lay out the scene behind the title screen (halls already full)
updateCrowd(0.016); drawCrowd(); for (const st of staff) updateCone(st);

// =====================================================================================
// Step 81: the splash screen. A random kid runs across with a security guard on their tail, stops, turns, and bonks the
// guard with a paper airplane; both run off, then "tap or click to start" leads to the title screen. Tapping early skips it.
// It has its own small renderer (like the character preview), thrown away when the splash closes. Not shown with ?debug (tests).
// =====================================================================================
const splash = { on: false, r: null, scene: null, cam: null, t: 0, last: 0, done: false };
function startSplash() {
  const el = $("splash"), cv = $("chase");
  splash.on = true; el.hidden = false;
  try { splash.r = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true }); }
  catch { splash.r = null; }   // no second WebGL context: just the logo and the prompt
  if (!splash.r) { $("tapStart").classList.add("show"); splash.done = true; }
  else {
    splash.r.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    const S = splash.scene = new THREE.Scene();
    S.add(new THREE.HemisphereLight(0xffffff, 0x445066, 1.7));
    const sun = new THREE.DirectionalLight(0xffffff, 1.5); sun.position.set(2, 5, 4); S.add(sun);
    splash.cam = new THREE.PerspectiveCamera(20, 2, 0.1, 60);
    const holder = (model, yaw) => { const g = new THREE.Group(); model.rotation.y = yaw; g.add(model); S.add(g);
      const sh = new THREE.Mesh(new THREE.CircleGeometry(0.42, 20), new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.3 }));
      sh.rotation.x = -Math.PI / 2; sh.position.y = 0.01; sh.scale.set(1.3, 0.8, 1); S.add(sh); g.userData.sh = sh; return g; };
    const look = randomLook();
    splash.kid = holder(buildKid(look), Math.PI / 2); splash.kidM = splash.kid.children[0];
    const T = STAFF_TYPES.securityGuard;
    const gm = makePerson({ body: T.vestColor, skin: pick(SKIN_COLORS), scale: T.scale, hat: T.hatColor, kind: "securityGuard" });
    splash.guard = holder(gm, Math.PI / 2); splash.guardM = gm;
    splash.plane = makeItemMesh("paperAirplane"); splash.plane.scale.setScalar(1.5); splash.plane.visible = false; S.add(splash.plane);
    // dizzy stars over the guard's head
    const star = new THREE.Shape(); for (let i = 0; i < 10; i++) { const a = Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 0.045 : 0.11; i ? star.lineTo(Math.cos(a) * r, Math.sin(a) * r) : star.moveTo(Math.cos(a) * r, Math.sin(a) * r); }
    const sg = new THREE.ShapeGeometry(star), sm = new THREE.MeshBasicMaterial({ color: 0xffd36b, side: THREE.DoubleSide });
    splash.stars = new THREE.Group(); for (let i = 0; i < 4; i++) { const m = new THREE.Mesh(sg, sm); m.userData.a = i * Math.PI / 2; splash.stars.add(m); }
    splash.stars.visible = false; S.add(splash.stars);
    Object.assign(splash, { t: 0, step: "run", kx: 0, gx: 0, stepT: 0, stunT: 0, guardRun: true, kidRun: true, last: performance.now() });
    splashLayout(true);
    requestAnimationFrame(splashFrame);
  }
  const go = (e) => { e?.preventDefault?.(); closeSplash(); };
  el.addEventListener("click", go);
  addEventListener("keydown", function k(e) { if (!splash.on) return removeEventListener("keydown", k); if (!e.repeat) go(); });
}
function splashLayout(first) {   // size the canvas; keep the characters about a third of the strip tall
  const cv = $("chase"), w = cv.clientWidth, h = cv.clientHeight; if (!w || !h) return;
  const pr = splash.r.getPixelRatio();
  if (first || cv.width !== Math.round(w * pr) || cv.height !== Math.round(h * pr)) { splash.r.setSize(w, h, false); splash.cam.aspect = w / h; splash.cam.updateProjectionMatrix(); }
  const D = 1.6 / Math.tan((splash.cam.fov / 2) * Math.PI / 180);   // the strip shows 3.2 m from top to bottom
  splash.cam.position.set(0, 1.25, D); splash.cam.lookAt(0, 0.95, 0);
  splash.halfW = 1.6 * splash.cam.aspect;
  if (first) { splash.kx = -splash.halfW - 1.2; splash.gx = splash.kx - 4.2; }
}
function splashFrame(now) {
  if (!splash.on || !splash.r) return;
  const dt = Math.min(0.05, (now - splash.last) / 1000); splash.last = now; splash.t += dt; splash.stepT += dt;
  splashLayout(false);
  const P = splash, hw = P.halfW, stopX = hw * 0.5, kidV = Math.max(6, hw * 0.75), next = (s) => { P.step = s; P.stepT = 0; };
  const K = P.kidM.userData, arm = K.arms[1];
  let kidSpeed = 0, guardSpeed = 0;
  const face = (m, from, to, k) => { m.rotation.y = from + (to - from) * clamp(k, 0, 1); };
  switch (P.step) {
    case "run":     // both sprint in from the left
      kidSpeed = kidV * clamp((stopX - P.kx) / 1.2, 0.15, 1); guardSpeed = kidV * 0.92;
      if (P.kx > stopX - 0.05) next("turn");
      break;
    case "turn":    // skid, spin round (facing the camera on the way)
      guardSpeed = 3.6; face(P.kidM, Math.PI / 2, -Math.PI / 2, P.stepT / 0.28);
      if (P.stepT > 0.28) next("windup");
      break;
    case "windup":  // arm back over the head...
      guardSpeed = 3.6; arm.rotation.x = -3.6 * clamp(P.stepT / 0.18, 0, 1);
      if (P.stepT > 0.18) { next("throw"); P.plane.visible = true; P.plane.position.set(P.kx - 0.35, 1.55, 0.3); playBlip([700, 1100], 0.05, "triangle", 0.03); }
      break;
    case "throw": { // ...and the plane flies at the guard's head
      guardSpeed = 3.6; arm.rotation.x = -3.6 + 2.4 * clamp(P.stepT / 0.12, 0, 1);
      const tx = P.gx + 0.15, ty = 1.85, pl = P.plane, dx = tx - pl.position.x, dy = ty - pl.position.y, d = Math.hypot(dx, dy);
      pl.position.x += dx / d * 11 * dt; pl.position.y += dy / d * 11 * dt + Math.sin(P.stepT * 9) * 0.02;
      pl.rotation.set(Math.sin(P.stepT * 12) * 0.4, -Math.PI / 2, 0);   // nose toward the guard, wings wobbling
      if (d < 0.35) { next("bonk"); P.stunT = 0; P.plane.userData.vy = 2.5; splashBonk(); }
      break;
    }
    case "bonk": {  // the guard reels; the plane bounces off and drops
      arm.rotation.x *= 0.85;
      P.guard.rotation.z = 0.45 * Math.min(1, P.stepT * 6) + Math.sin(P.stepT * 14) * 0.08;
      const pl = P.plane; pl.userData.vy -= 9 * dt; pl.position.x -= 1.2 * dt; pl.position.y = Math.max(0.05, pl.position.y + pl.userData.vy * dt); pl.rotation.z += dt * 6;
      if (P.stepT > 0.45) face(P.kidM, -Math.PI / 2, Math.PI / 2, (P.stepT - 0.45) / 0.22);
      if (P.stepT > 0.7) { kidSpeed = kidV * 1.1; P.kidGone = true; }
      if (P.stepT > 1.6) { next("chase"); P.guard.rotation.z = 0; }
      break;
    }
    case "chase":   // the guard shakes it off and goes after them
      kidSpeed = kidV * 1.1; guardSpeed = kidV;
      if (P.gx > hw + 1.5 && P.kx > hw + 1.5) { next("end"); $("tapStart").classList.add("show"); P.done = true; }
      break;
    case "end": break;
  }
  if (P.step === "bonk" && P.kidGone && P.stepT > 0.7) kidSpeed = kidV * 1.1;
  P.kx += kidSpeed * dt; P.gx += guardSpeed * dt;
  P.kid.position.x = P.kx; P.guard.position.x = P.gx;
  P.kid.userData.sh.position.x = P.kx; P.guard.userData.sh.position.x = P.gx;
  animateKid(P.kidM, P.step === "windup" || P.step === "throw" ? 0 : kidSpeed, dt);
  animateKid(P.guardM, P.step === "bonk" ? 0 : guardSpeed, dt);
  if (P.step === "windup" || P.step === "throw" || P.step === "bonk") { const u = P.kidM.userData; u.legs[0].rotation.x *= 0.8; u.legs[1].rotation.x *= 0.8; }
  P.kid.position.y = kidSpeed > 0.5 ? Math.abs(Math.sin(K.walk)) * 0.06 : 0;
  // dizzy stars while the guard reels
  P.stars.visible = P.step === "bonk";
  if (P.stars.visible) { P.stars.position.set(P.gx - 0.2, 2.25, 0); for (const m of P.stars.children) { const a = m.userData.a + P.stepT * 7; m.position.set(Math.cos(a) * 0.32, Math.sin(a * 2) * 0.03, Math.sin(a) * 0.32); } }
  if (P.step === "end") P.plane.visible = false;
  P.r.render(P.scene, P.cam);
  requestAnimationFrame(splashFrame);
}
function splashBonk() {   // the comic "BONK!" over the guard's head
  const v = new THREE.Vector3(splash.gx, 2.3, 0).project(splash.cam), cv = $("chase").getBoundingClientRect(), b = $("bonk");
  b.style.left = cv.left + (v.x + 1) / 2 * cv.width + "px"; b.style.top = cv.top + (1 - v.y) / 2 * cv.height + "px";
  b.classList.remove("show"); void b.offsetWidth; b.classList.add("show");
  playBlip([220, 160], 0.08, "square", 0.04);
}
function closeSplash() {
  if (!splash.on) return;
  initAudio(); playBlip([523, 784], 0.07, "triangle", 0.05);
  splash.on = false;
  const el = $("splash"); el.classList.add("out");
  setTimeout(() => {
    el.hidden = true;
    if (splash.r) { disposeTree(splash.scene); splash.r.dispose(); splash.r.forceContextLoss?.(); splash.r = null; }
  }, 380);
  clock.getDelta();
}
if (!debug || URLQ.has("splash")) startSplash(); else $("splash").hidden = true;

renderer.setAnimationLoop(() => {
  const dt = Math.min(clock.getDelta(), 0.05);
  if (splash.on && !$("splash").classList.contains("out")) return;   // step 81: the school waits behind the splash
  // slow motion while aiming: eases in and out, with a tinted edge so you can tell
  const tsGoal = game.aim && game.state === "playing" ? CFG.items.aimTimeScale : 1;
  timeScale += (tsGoal - timeScale) * Math.min(1, dt / CFG.items.aimEaseSec);
  if (Math.abs(timeScale - tsGoal) < 0.01) timeScale = tsGoal;
  slowFx.style.opacity = ((1 - timeScale) / (1 - CFG.items.aimTimeScale)).toFixed(2);
  const live = game.state === "playing" && !tut?.frozen;   // step 72: a tutorial card can freeze the world
  if (live) update(dt * timeScale);
  if (tut && game.state === "playing") tutTick(dt);
  if (game.state === "scene") { game.sceneT += dt; if (game.sceneT >= game.sceneEnd) endScene(); }
  if (paTimer > 0) { paTimer -= dt; if (paTimer <= 0) $("pa").classList.remove("show"); }
  if (bannerTimer > 0) { bannerTimer -= dt; if (bannerTimer <= 0) ui.banner.classList.remove("show"); }
  if (toastTimer > 0) { toastTimer -= dt; if (toastTimer <= 0) ui.toast.classList.remove("show"); }
  drawCrowd();
  updateCamera(dt);
  if (live) { updateKeyAim(dt); tickBoost(dt); tickBlackout(dt); tickHood(dt); tickDisguise(dt); }
  updateAimPreview();
  updateKeyHint();
  updateAutoTarget();
  updateGuides();
  for (const b of BANNERS) {   // fade a banner out when the camera's right up against it (it would fill the screen)
    const o = clamp((Math.hypot(camera.position.x - b.x, camera.position.z - b.z) - 2.2) / 2.5, 0.06, 1);
    if (Math.abs(b.mat.opacity - o) > 0.01) { b.mat.opacity = o; b.mat.depthWrite = o > 0.99; }
  }
  drawStamina();
  drawObjects();
  updateMarkers();
  if (live) updateChatter(dt);
  drawChatter();
  updateSpotsUI();
  drawFriends();
  updateHud();
  drawExitMark();
  if (tut) tutDraw();
  if (performance.now() > snapHold) renderer.render(scene, camera);   // (a test close-up holds the frame briefly)
  if (debug) { fpsAcc += dt; fpsN++; if (fpsAcc > 0.5) { ui.fps.textContent = `${Math.round(fpsN / fpsAcc)} fps · ${crowdDrawn}/${crowd.length} kids drawn`; fpsAcc = fpsN = 0; } }
});

if (debug) {   // a small test panel for phone playtests (only with ?debug in the URL)
  const css = document.createElement("style");
  css.textContent = `#staminaMeter { bottom: calc(max(12px, env(safe-area-inset-bottom)) + 46px); } #dbg { position: fixed; left: 50%; bottom: max(6px, env(safe-area-inset-bottom)); transform: translateX(-50%); z-index: 5;
      display: flex; flex-direction: column; align-items: center; gap: 4px; }
    #dbg button { border: 0; border-radius: 8px; padding: 6px 9px; background: rgba(20,24,36,.85); color: #fff; font: 700 12px system-ui, sans-serif; }
    #dbgBtns { display: flex; flex-wrap: wrap; gap: 4px; justify-content: center; max-width: 420px; }
    #dbgBtns[hidden] { display: none; }`;
  document.head.appendChild(css);
  const panel = document.createElement("div"); panel.id = "dbg";
  panel.innerHTML = `<div id="dbgBtns" hidden></div><button id="dbgToggle" type="button">🛠 test tools</button>`;
  document.body.appendChild(panel);
  const btns = $("dbgBtns");
  const add = (label, fn) => {
    const b = document.createElement("button"); b.type = "button"; b.textContent = label;
    b.addEventListener("pointerdown", (e) => { e.stopPropagation(); e.preventDefault(); if (game.state !== "playing") return; try { fn(); } catch (err) { toast("Not in this build step"); } });
    btns.appendChild(b);
  };
  $("dbgToggle").addEventListener("pointerdown", (e) => { e.stopPropagation(); e.preventDefault(); btns.hidden = !btns.hidden; });
  add("End phase", () => { game.phaseT = phaseLen() - 0.05; });
  add("Last bell", () => { game.period = periodsToday(); game.phase = "skipping"; game.phaseT = phaseLen("skipping") - 0.05; });
  add("Skip to last period", () => {
    const last = typeof periodsToday === "function" ? periodsToday() : CFG.periodsPerDay;
    game.period = last - 1; game.phase = "skipping"; game.phaseT = phaseLen("skipping") - 0.05;
  });
  let gi = 0;
  add("Give item", () => { const k = Object.keys(ITEM_TYPES); addItem(k[gi++ % k.length]); });
  add("Heat +30", () => { addHeat(30); });
  add("Rebel run", () => { startSurvival(); });
  add("+1 star", () => { const n = Math.min(5, game.stars + 1); game.heat = Math.max(game.heat, CFG.heat.stars[n - 1] + 1); });
  add("Get a strike", () => { const st = staff.find(chaser) ?? staff[0], ph = game.phase; game.phase = "skipping"; caught(st); game.phase = ph; });
  add("Principal", () => { ensurePrincipal(true); });
  // a spot a few meters ahead of the kid, in the hall
  const ahead = (d) => { const x = player.x + Math.sin(player.heading) * d, z = player.z + Math.cos(player.heading) * d; const g = { x, z }; collide(g, 0.4); return g; };
  add("Staff ahead (back turned)", () => {
    const st = staff.find(chaser);
    const g = ahead(6), pr = hallProject(g.x, g.z), H = HALLS[pr.h];
    st.h = pr.h; st.t = pr.t; st.state = "patrol"; st.suspicion = 0; st.stunT = 0; st.pauseT = 0;
    // walk away from the kid
    const toA = Math.hypot(NODES[H.a].x - player.x, NODES[H.a].z - player.z), toB = Math.hypot(NODES[H.b].x - player.x, NODES[H.b].z - player.z);
    st.to = toA > toB ? H.a : H.b;
    if (st.route) { const i = st.route.indexOf(st.to); if (i >= 0) st.ri = i; }
    hallPos(st.h, st.t, 0, st); st.facing = hallHeading(st.h, st.to === H.b ? 1 : -1);
    player.invisT = Math.max(player.invisT, 1);
  });
  add("Kids ahead", () => {
    let n = 0;
    for (const c of crowd) {
      if (c.friend || n >= 8) continue;
      const g = ahead(4 + (n % 4) * 2.2), pr = hallProject(g.x, g.z), [lo, hi] = latLimits(pr.h, pr.t);
      c.mode = "wander"; c.slipT = 0; c.leaveAt = 999; c.h = pr.h; c.t = pr.t; c.lat = c.targetLat = clamp(pr.lat + rand(-1, 1), lo, hi); c.retargetT = 99;
      c.to = Math.random() < 0.5 ? HALLS[c.h].a : HALLS[c.h].b; c.speed = 0.3; hallPos(c.h, c.t, c.lat, c); n++;
    }
  });
  const goTo = (f, yaw) => { if (player.hidden) exitSpot(false); player.x = f.x; player.z = f.z; cam.yaw = player.heading = yaw; manualCamT = 1; };
  add("Go to fire alarm", () => { const a = ALARMS[0], H = HALLS[a.h]; goTo(alarmFront(a, {}), Math.atan2(a.side * H.nx, a.side * H.nz)); });
  add("Go to restroom", () => { const sp = SPOTS.find((x) => x.kind === "restroom"), H = HALLS[sp.h]; goTo(spotFront(sp, {}), Math.atan2(sp.side * H.nx, sp.side * H.nz)); });
  add("Go to main office", () => {
    const sp = SPOTS.find((x) => x.roomType === "office"), f = spotFront(sp, {}), H = HALLS[sp.h];
    if (player.hidden) exitSpot(false);
    player.x = f.x; player.z = f.z; cam.yaw = player.heading = Math.atan2(sp.side * H.nx, sp.side * H.nz); manualCamT = 1;
  });
  add("Give a dare", () => { const m = makeDareOffer(); if (m) { game.dares.push(m); renderDares(); popup(`📜 Dare: ${DARES[m.id].text(m)}`, "item"); } });
  add("Go to locker", () => { const sp = SPOTS.find((x) => x.kind === "locker"), H = HALLS[sp.h]; goTo(spotFront(sp, {}), Math.atan2(sp.side * H.nx, sp.side * H.nz)); });
  add("Friend here", () => {
    const c = crowd.find((k) => k.friend && k.mode !== "gone") ?? crowd.find((k) => k.friend);
    c.mode = "wander"; c.slipT = 0; c.friend.cd = 0; c.leaveAt = 999; c.x = player.x + Math.sin(player.heading) * 1.6; c.z = player.z + Math.cos(player.heading) * 1.6;
    const pr = hallProject(c.x, c.z); c.h = pr.h; c.t = pr.t; c.lat = pr.lat;
    if (game.phase !== "passing") toast("Friends only offer during passing periods");
  });
}

// small read-only hook for automated playtests
window.__hallwaySkip = { get state() { return { ...game,
  staff: staff.map((s) => ({ key: s.key, state: s.state, suspicion: s.suspicion, x: s.x, z: s.z, h: s.h, winded: s.windedT > 0, alarm: s.alarmT })),
  pa: $("pa").classList.contains("show") ? $("paText").textContent : null,
  crowdLeft: crowd.filter((c) => c.mode !== "gone").length,
  player: { x: player.x, z: player.z, hidden: player.hidden ? `${player.hidden.kind}${player.hidden.room ? " " + player.hidden.room : ""}` : null, graceT: player.graceT },
  spots: SPOTS.map((sp) => ({ kind: sp.kind, h: sp.h, t: sp.t, room: sp.room, teacher: sp.teacher, blocked: spotBlocked(sp) })) }; }, CFG, STAFF_TYPES, TEACHER_TYPES, ROOM_TYPES, ITEM_TYPES, DARES };
if (debug) {   // test-only helpers (only with ?debug in the URL)
  Object.assign(window.__hallwaySkip, {
    place(h, t, lat) { const p = hallPos(h, t, lat); player.x = p.x; player.z = p.z; },
    placeXZ(x, z) { player.x = x; player.z = z; },
    spotScreen(i, y) { const sp = SPOTS[i], q = hallPos(sp.h, sp.t, sp.wallLat, {}); projA.set(q.x, y, q.z).applyMatrix4(camera.matrixWorldInverse); if (projA.z > -0.2) return null; projA.set(q.x, y, q.z).project(camera); return { x: (projA.x + 1) / 2 * innerWidth, y: (1 - projA.y) / 2 * innerHeight, d: spotDist(sp) }; },
    faceAt(i, along, back, yawOff) { const sp = SPOTS[i], H = HALLS[sp.h], q = hallPos(sp.h, sp.t + along, sp.wallLat - sp.side * back, {}); player.x = q.x; player.z = q.z; player.vx = player.vz = 0; player.heading = cam.yaw = Math.atan2(sp.side * H.nx, sp.side * H.nz) + yawOff; manualCamT = 0; },
    faceSpot(i, back) { const sp = SPOTS[i], H = HALLS[sp.h], q = hallPos(sp.h, sp.t, sp.wallLat - sp.side * back, {}); player.x = q.x; player.z = q.z; player.vx = player.vz = 0; player.heading = cam.yaw = Math.atan2(sp.side * H.nx, sp.side * H.nz); manualCamT = 0; },
    inFrontOf(k, dist) { const st = staff[k]; player.x = st.x + Math.sin(st.facing) * dist; player.z = st.z + Math.cos(st.facing) * dist;
      cam.yaw = player.heading = st.facing + Math.PI; manualCamT = 99; },
    spotFront(i) { const sp = SPOTS[i], f = spotFront(sp, {}); return { x: f.x, z: f.z, h: sp.h, t: sp.t, wallLat: sp.wallLat, frontLat: sp.frontLat, side: sp.side }; },
    faceSpot(i) { const sp = SPOTS[i], H = HALLS[sp.h]; cam.yaw = player.heading = Math.atan2(sp.side * H.nx, sp.side * H.nz); manualCamT = 99; },
    faceHall(h, dir) { cam.yaw = player.heading = hallHeading(h, dir); manualCamT = 99; },
    plungerT(k) { return staff[k].plungerT ?? 0; },
    snapCam(x, y, z, tx, ty, tz) { camera.position.set(x, y, z); camera.lookAt(tx, ty, tz); renderer.render(scene, camera); snapHold = performance.now() + 600; },
    snapStaff(k, dist, yaw, h = 1.6) { const st = staff[k], sc = st.type.scale ?? 1; camera.position.set(st.x + Math.sin(yaw) * dist, h * sc, st.z + Math.cos(yaw) * dist); camera.lookAt(st.x, 1.35 * sc, st.z); renderer.render(scene, camera); snapHold = performance.now() + 600; },   // a close-up for screenshots (call right before one)
    staffTo(k, x, z, state) { const st = staff[k]; st.x = x; st.z = z; if (state) { st.state = state; st.suspicion = 1; } },
    setTime(t) { game.phaseT = t; },
    catchNow(k = 0) { caught(staff[k]); },
    checkRoll(k) { const st = staff[k]; st.checkCD = new Map(); st.state = "patrol"; maybeCheckRestroom(st); const r = st.state; st.state = "patrol"; return r; },
    checkNow(k, i) { const st = staff[k]; st.state = "check"; st.checkSpot = SPOTS[i]; st.checkT = 0; },
    give(key, uses) { return addItem(key, uses); },
    timeScale() { return timeScale; },
    setOpt(k, v) { opts[k] = v; },
    // throw an item from the hotbar: yaw = world heading, power 0..1
    throwAt(key, power, yaw) {
      if (!game.hotbar.some((x) => x && x.key === key)) addItem(key);
      const slot = game.hotbar.findIndex((x) => x && x.key === key);
      game.aim = { slot, key }; release(game.aim, { dx: Math.sin(yaw), dz: Math.cos(yaw), power });
      return objects.length ? objects[objects.length - 1].id : null;
    },
    obj(id) { const o = objects.find((x) => x.id === id); return o ? { claimed: claimedBy(o)?.key ?? null, popped: !!o.popped, state: o.state, x: o.x, y: o.y, z: o.z, stage: o.stage, slips: o.slips, life: o.life, hits: o.hitSet?.size ?? 0, flown: o.flown.size, dead: !!o.dead } : null; },
    heading() { return player.heading; },
    opts(o) { if (o) { Object.assign(opts, o); saveOpts(); renderOptSummary(); } return { ...opts }; },
    autoTarget(key) { const t = autoTarget(key); return t ? { staff: staff.indexOf(t.st), d: Math.round(t.d * 10) / 10, power: Math.round(t.power * 100) / 100 } : null; },
    ranges(key) { return throwRanges(key).map(([p, d]) => [Math.round(p * 100) / 100, Math.round(d * 10) / 10]); },
    tap(i) { selectSlot(i); },
    setHeading(h) { player.heading = h; cam.yaw = h; manualCamT = 0; },
    clearCrowd() { for (const c of crowd) c.mode = "gone"; },
    graffitiSheet() {   // every graffiti drawing in a grid, for checking the art
      const d = document.createElement("div"); d.style.cssText = "position:fixed;inset:0;z-index:20;background:#cfc5ad;display:grid;grid-template-columns:repeat(5,1fr);gap:4px;padding:4px";
      for (const g of GRAFFITI) { const c = drawGraffiti(g).image; c.style.cssText = "width:100%;background:#d9cdb0"; d.appendChild(c); }
      document.body.appendChild(d);
    },
    spray() { return sprayPaint(); },
    graffitiCount() { return graffiti.length; },
    clearObjects() { clearObjects(); },
    alarms() { return ALARMS.map((a) => { const f = alarmFront(a, {}); return { x: f.x, z: f.z }; }); },
    tryAlarm(i) { tryAlarm(ALARMS[i]); },
    flood() { floodRestroom(); },
    staffCount() { return staff.length; },
    heatAdd(n) { addHeat(n); },
    crowdStats(cull) { if (cull != null) crowdCull = cull; return { drawn: crowdDrawn, total: crowd.length, active: crowd.filter(isActive).length,
      meshShown: !crowdBodies.frustumCulled || frustum.intersectsObject(crowdBodies) }; },
    sprintInfo() { return { max: player.staminaMax, boostT: Math.round(player.boostT * 10) / 10, stamina: Math.round(player.stamina * 100) / 100, sprinting: player.sprinting, winded: player.winded }; },
    ending() { return { title: $("caughtTitle").textContent, text: $("caughtText").textContent }; },
    lookYaw(a) { cam.yaw = player.heading = a; manualCamT = 99; },
    // put staff k at (x, z) on patrol, facing away along the hall
    staffAt(k, x, z, dirSign = 1) { const st = staff[k], pr = hallProject(x, z); st.h = pr.h; st.t = pr.t; st.state = "patrol"; st.suspicion = 0; st.stunT = 0; st.pauseT = 0;
      st.to = dirSign > 0 ? HALLS[pr.h].b : HALLS[pr.h].a; hallPos(st.h, st.t, 0, st); st.facing = hallHeading(st.h, dirSign); },
    crowdNear(r) { return crowd.filter((c) => isActive(c) && Math.hypot(c.x - player.x, c.z - player.z) < r).map((c) => ({ i: crowd.indexOf(c), x: c.x, z: c.z, slipT: c.slipT })); },
    crowdTo(i, x, z) { const c = crowd[i]; const pr = hallProject(x, z); c.mode = "wander"; c.slipT = 0; c.leaveAt = 999; c.h = pr.h; c.t = pr.t; c.lat = c.targetLat = pr.lat; c.retargetT = 99; c.speed = 0.0001; c.x = x; c.z = z; },
    roomInfo() { return SPOTS.filter((sp) => sp.kind === "classroom").map((sp) => ({ room: sp.room, type: sp.roomType, teacher: sp.teacher, loot: [...sp.loot], i: SPOTS.indexOf(sp),
      locked: roomLocked(sp), lockedUntil: sp.lockedUntil, taken: [...sp.taken], blocked: spotBlocked(sp), sign: sp.lockSign.visible })); },
    enter(i) { return enterSpot(SPOTS[i]); },
    leave() { exitSpot(false); },
    grab(i) { grabLoot(i); },
    setStats(o) { Object.assign(character.stats, o); for (const k in rangeCache) delete rangeCache[k]; return { ...character.stats }; },
    rollMany(n) { const a = []; for (let i = 0; i < n; i++) a.push(rollStat()); return a; },
    speedMult() { return speedMult(); },
    setLook(o) { Object.assign(character.look, o); applyLook(); if (!$("charScreen").hidden) { renderLooks(); lookChanged(); } return { ...character.look }; },
    previewYaw(y) { pv.yaw = y; },
    previewHood(up) { if (pv.kid) setHood(pv.kid, up); },
    walkPhase() { return player.kid.userData.walk; },
    unlockAll() { for (const sp of SPOTS) { sp.used = false; sp.lockedUntil = 0; } player.graceT = 0; },
    unpost() { for (const st of staff) if (st.post) st.post = null; },
    hideT() { return player.hideT; },
    friends() { return crowd.filter((c) => c.friend).map((c) => ({ offer: c.friend.offer, cd: c.friend.cd, x: c.x, z: c.z, mode: c.mode, i: crowd.indexOf(c) })); },
    friendTo(i, offer) { const c = crowd[i]; c.friend.offer = offer; c.friend.cd = 0; c.slipT = 0; c.mode = "wander"; c.x = player.x + 1.5; c.z = player.z; const pr = hallProject(c.x, c.z); c.h = pr.h; c.t = pr.t; c.lat = pr.lat; c.leaveAt = 999; },
    tapFriend(i) { friendTap(crowd[i]); },
    risk() { return { unseenT: game.unseenT, streak: streakMult(), nearMissT: game.nearMissT, passShield: game.passShield }; },
    setUnseen(t) { game.unseenT = t; },
    spawnPrincipal() { ensurePrincipal(true); return staff.findIndex((s) => s.key === "principal"); },
    forcePlane() { game.nextPlaneT = 0; },
    wildPlane(dx, dz, sp = 5) { const x = player.x + dx, z = player.z + dz, d = Math.hypot(dx, dz); return spawnObject("paperAirplane", "flying", x, 1.6, z, { vx: -dx / d * sp, vz: -dz / d * sp, vy: 0.1, wild: true }).id; },
    dbgObjs() { return objects.filter((o) => !o.dead).map((o) => [o.key, o.state, Math.round(o.age * 10) / 10, o.restSince, Math.min(...crowd.filter(isActive).map((c) => Math.hypot(c.x - o.x, c.z - o.z))).toFixed(2)]); },
    lootNums() { return [...lootEl.querySelectorAll("button")].map((b) => [b.dataset.n, b.textContent.slice(0, 22)]); },
    interact() { doInteract(); },
    phaseInfo() { return { phase: game.phase, period: game.period, t: game.phaseT }; },
    tut() { return tut && { i: tut.i, id: TUT_STEPS[tut.i].id, t: tut.t, frozen: tut.frozen, lockMove: tut.lockMove, blind: tut.blind, waitNext: tut.waitNext, looked: tut.looked, moved: tut.moved,
      mon: tut.mon && { state: tut.mon.state, d: Math.hypot(tut.mon.x - player.x, tut.mon.z - player.z) }, card: tutCard.hidden ? "" : tutCard.textContent.trim(), dim: +tutDim.style.opacity,
      lk: tut.locker && { i: SPOTS.indexOf(tut.locker), d: spotDist(tut.locker), why: spotBlocked(tut.locker), it: interactTarget()?.kind, hidden: !!player.hidden }, caughtN: tut.caughtN ?? 0 }; },
    tutGo(i) { tutGo(i); }, tutNext() { tutAdvance(); }, tutLook(r) { if (tut) tut.looked += r; },
    barks() { return staff.map((s) => (performance.now() < s.barkUntil ? s.bubble.textContent : null)); },
    ads() { return { interstitialsToday: Ads.interstitialsToday, rewardedToday: { ...Ads.rewardedToday } }; },
    setHeat(h) { if (h != null) { game.heat = h; game.heatPending = 0; } },
    heat() { return { heat: game.heat, pending: game.heatPending, stars: game.stars, survival: game.survival, alarmT: game.alarmT }; },
    wanted() { return staff.filter((s) => s.wanted).map((s) => [s.key, s.wanted, s.state]); },
    cone(k) { const T = staff[k].type; return { half: Math.round(coneHalf(T) * 1800 / Math.PI) / 10, range: Math.round(T.visionRange * staffMult("vision") * 10) / 10 }; },
    objects() { return objects.filter((o) => !o.dead).map((o) => ({ key: o.key, state: o.state, x: o.x, y: o.y, z: o.z, bounces: o.bounces, life: o.life })); },
    dropItem(key, dx, dz) { const o = spawnObject(key, "pickup", player.x + dx, REST_Y[key] ?? 0.04, player.z + dz); return o.id; },
    hotbar() { return game.hotbar.map((s) => s && `${s.key}${s.uses > 1 ? "x" + s.uses : ""}`); },
    playerState() { return { slipT: player.slipT, stuckT: player.stuckT, dazeT: player.dazeT, riding: !!player.ride, x: player.x, z: player.z, rideSpeed: player.ride?.speed ?? 0, heading: player.heading }; },
    jumpOff() { jumpOff(); },
    board() { return player.board ? { vx: player.board.vx, vz: player.board.vz } : null; },
    staffFull(k) { const s = staff[k]; return { camping: !!s.camping, state: s.state, stunT: s.stunT, distractT: s.distractT, x: s.x, z: s.z, key: s.key, fleeT: s.fleeT ?? 0, facing: s.facing }; },
    searchTo(k, x, z) { const st = staff[k]; st.state = "search"; st.searchT = -30; st.lastX = st.tx = x; st.lastZ = st.tz = z; },
    nodes() { return NODES.map((n) => ({ id: n.id, x: n.x, z: n.z })); },
    tidyInfo() { return staff.map((s) => ({ key: s.key, state: s.state, obj: s.tidyObj && !s.tidyObj.dead && s.state === "tidy" ? s.tidyObj.id : null, stunT: s.stunT, tidyT: s.tidyT, x: s.x, z: s.z, pauseT: s.pauseT })); },
    rummage() { rummageLocker(); },
    burst() { burstOut(); },
    runs() { return loadRuns(); },
    forceScore(sc, per) { game.score = sc; game.periodsSkipped = per; },
    clearRuns() { saveRuns([]); },
    tally(o) { if (o) Object.assign(game.tally, o); return { ...game.tally }; },
    endRun() { game.strikes = CFG.strikes.max - 1; game.phase = "skipping"; game.passShield = false; caught(staff[0]); return game.state; },
    runs() { return loadRuns(); },
    seedRuns(a) { saveRuns(a); },
    kickMe() { const i = game.hotbar.findIndex((x) => x?.key === "kickMe"); if (i >= 0) stickKickMe(i); },
    penInfo() { return staff.map((s) => ({ key: s.key, kickMe: !!s.kickMe, penned: !!s.penned, x: s.x, z: s.z, facing: s.facing })); },
    gathered() { return crowd.filter((c) => c.mode === "gather").length; },
    dares() { return { active: game.dares.map((m) => ({ id: m.id, n: m.n, need: m.need, p: m.p, got: m.got, text: DARES[m.id].text(m) })), offer: game.dareOffer?.id ?? null, done: game.daresDone }; },
    takeDare() { takeDare(); },
    forceDare(id) { const m = { id, n: 0, need: DARES[id].need, p: {}, got: [] }; if (DARES[id].setup && !DARES[id].setup(m)) return false; game.dares.push(m); renderDares(); return m.p; },
    dareEvent(t, d) { dareEvent(t, d); },
    grabRoll() { grabRoll(); },
    trails() { return tpTrails.length; },
    trailInfo() { return tpTrails.map((tr) => ({ n: tr.pts.length, done: tr.done, held: tr.pts.filter((p) => p.held).length,
      maxY: Math.round(Math.max(...tr.pts.map((p) => p.y)) * 100) / 100, minY: Math.round(Math.min(...tr.pts.map((p) => p.y)) * 100) / 100,
      snagged: tr.pts.filter((p) => p.held && p.y > 0.5).length })); },
    noticeTime(k, d, phase) { const ph = game.phase; game.phase = phase; const r = noticeRate(staff[k], d, 0); game.phase = ph; return Math.round(10 / r) / 10; },
    stairs() { return STAIRS.map((sp) => ({ i: SPOTS.indexOf(sp), floor: sp.floor, h: sp.h, t: sp.t })); },
    floor() { return floorOf(player.x); },
    banners() { return BANNERS.map((b) => { const p = hallPos(b.h, b.t, 0); return { h: b.h, t: b.t, x: p.x, z: p.z, text: b.text }; }); },
    stuck() { return { player: player.stuckT, staff: staff.map((s) => s.stuckT ?? 0) }; },
    lockers() { return SPOTS.map((sp, i) => ({ i, kind: sp.kind })).filter((x) => x.kind === "locker").map((x) => x.i); },
    selectSlot(i) { selectSlot(i); },
    lastBell() { game.period = periodsToday(); if (game.phase !== "skipping") startSkipping(); game.phaseT = phaseLen("skipping") - 0.05; },
    dismissal() { return { on: !!game.dismissal, t: game.phaseT, len: phaseLen(), gone: crowd.filter((c) => c.mode === "gone").length, toExit: crowd.filter((c) => c.door === ENTRANCE_DOOR || c.door?.kind === "stairs").length, mark: exitMarkEl.style.display === "block" ? exitMarkEl.textContent : "" }; },
    exitPos() { const E = ENTRANCE_DOOR, f = hallPos(E.h, E.t, E.wallLat - E.side * 3, {}); return { x: f.x, z: f.z, nx: E.side * HALLS[E.h].nx, nz: E.side * HALLS[E.h].nz }; },
    posts() { return { posts: game.posts.map((i) => SPOTS[i].kind + (SPOTS[i].room ? " " + SPOTS[i].room : "")), guards: staff.filter((s) => s.key === "postedGuard").map((s) => [s.post?.kind, s.state, Math.round(s.x * 10) / 10, Math.round(s.z * 10) / 10]) }; },
    spots(kind) { return SPOTS.map((sp, i) => ({ i, kind: sp.kind, room: sp.room, type: sp.roomType, floor: HALLS[sp.h].floor })).filter((x) => x.kind === kind); },
    nextMorning() { morningSetup(); },
    perk() { return { perk: game.perk ?? null, hotbar: game.hotbar.map((it) => it?.key ?? null), dares: game.dares.map((m) => DARES[m.id].text(m)) }; },
    lockerOdds(n) { const c = {}; for (let i = 0; i < n; i++) { const k = pickWeighted(pickWeighted(Object.values(CFG.lockers.kinds).map(([sh, it]) => [it, sh]))); c[k] = (c[k] ?? 0) + 1; } return c; },
    forcePeel() { game.peelT = 0; },
    squawks() { return staff.map((st) => st.state); },
    disguise() { return { t: player.disguiseT ?? 0, mesh: !!player.kid?.userData.disguise }; },
    chase(k) { startChase(staff[k]); },
    sees(k) { return canSeePlayer(staff[k], 1, true).seen; },
    staffKeys() { const m = {}; for (const s of staff) m[s.key] = (m[s.key] ?? 0) + 1; return m; },
    crowdModes() { const m = {}; for (const c of crowd) m[c.mode] = (m[c.mode] ?? 0) + 1; return m; },
    phaseLens() { return { passing: phaseLen("passing"), skipping: phaseLen("skipping") }; },
    insideWalls() {   // how many people are standing inside a wall (should be 0)
      const inWall = (x, z) => WALLS.some((b) => x > b.x0 + 0.05 && x < b.x1 - 0.05 && z > b.z0 + 0.05 && z < b.z1 - 0.05);
      return { crowd: crowd.filter((c) => c.mode === "wander" && inWall(c.x, c.z)).length, staff: staff.filter((s) => inWall(s.x, s.z)).length };
    },
  });
}
