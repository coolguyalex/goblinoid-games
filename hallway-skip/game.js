// Hallway Skip — build step 17 prototype.
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
  monitorsPerPeriod: [1, 1, 2, 2, 2, 3],
  guardsPerPeriod:   [0, 1, 1, 1, 1, 2],
  teachersPerPeriod: [0, 0, 1, 1, 2, 3],   // teachers standing guard at their doors

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
    count: 110,                   // try other sizes with ?crowd=N in the URL (20-250)
    cullDistance: 46,             // kids farther than this (in the fog) or out of view aren't drawn at all
    speedMin: 1.0, speedMax: 1.8, radius: 0.3,
    leaveStartFrac: 0.12,         // during passing, students head into class between these
    leaveEndFrac: 0.92,           //   fractions of the passing period
    tardyRushSpeed: 3.4,          // stragglers hurry in when the tardy bell rings
    floodSpreadSec: 3.0,          // after the period bell, students pour out over this many seconds
    coverRadius: 2.6,             // students this close to you count as cover...
    coverPerStudent: 0.2,         // ...each one cuts detection speed: rate / (1 + n * this). (Was 0.35 with 60 kids; more kids, less each)
  },

  detection: {
    suspicionRate: 1.7,           // meter per second at point-blank range, no cover
    farRateFrac: 0.35,            // fraction of that rate at the edge of vision range
    decayRate: 0.6,               // meter drain per second when not seen
    instantRange: 1.3,            // closer than this and in the cone = spotted immediately
    passingBeatMult: 2.6,         // passing period: "did I just see that?" takes this much longer
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
  },
  hiding: {
    lockerUsesPerPeriod: 3,       // shared by all lockers
    restroomSweepEverySec: 35,    // a monitor sweeps each restroom about this often...
    restroomSweepJitterSec: 8,    // ...give or take this much
    subsPerDay: [1, 2],           // how many classrooms get a substitute each day (min, max)
    bustPauseSec: 0.9,            // monitor pauses after yanking you out ("I saw you go in there")
    bootGraceSec: 1.2,            // after being booted, you can't be caught for this long
  },

  items: {
    slots: 4,
    pickupRange: 2.6,             // how close you must be to tap an item lying around
    maxLying: 24,                 // things lying around stay until staff clean them up; past this many, the oldest get swept away
    aimTimeScale: 0.5,            // the game runs at half speed while you line up a throw
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
    loot: [["spitball", 4], ["gum", 4], ["paperAirplane", 3], ["whoopee", 2], ["bananaPeel", 2], ["sprayPaint", 1], ["toiletPaper", 1],
           ["oldSock", 3], ["sandwich", 3], ["homework", 3]],
  },

  rooms: {
    grabSec: 1.5,                 // grabbing an item off a desk eats this much of your hiding time (subs: see TEACHER_TYPES)
    raidLockPeriods: 2,           // grab anything from a room and its door is locked for this many periods (no restock either)
  },

  // Short-term heat, 0-100: "they know it's me". Like a GTA wanted level.
  heat: {
    seenHavocMult: 0.25,          // seen doing havoc: heat += the points it earned * this...
    seenHavocMax: 25,             // ...but no more than this per event
    seenRunning: 12,              // a chase starts (you were seen running away)
    roomCall: 15,                 // a teacher calls security on you
    bellDrop: 0.6,                // each bell takes away this fraction (steep, per the spec)
    hiddenCoolPerSec: 1.0,        // slow cooling while hidden, to reward patience
    maxRisePerSec: 30,            // heat can't climb faster than this, so one mistake can't blow past every threshold at once
    passingCatchAt: 50,           // at or above this, staff can detain you during passing periods (PA announces it)
    shooHeat: 15,                 // caught in a passing period below that: no strike, just shooed to class (and a bit of heat)
    effect: { speed: 0.25, vision: 0.2, notice: 0.5 },   // at 100 heat: staff +25% speed, +20% vision range, +50% notice
  },
  // Persistent security level, 0-100: "they know something happened". Drops only between days.
  security: {
    loudUnseen: 3,                // loud havoc nobody saw
    loudSeen: 10,                 // loud havoc someone saw
    quietSeen: 2,                 // quiet havoc someone saw
    dayDecay: 0.4,                // overnight it drops by this fraction
    effect: { speed: 0.15, vision: 0.15, notice: 0.3 },   // at 100
    extraGuardAt: 50,             // at or above this, one extra guard is on duty...
    secondGuardAt: 100,           // ...and maxed out, two
    alarmSeen: 100, alarmUnseen: 30,   // pulling the fire alarm: maxed if anyone saw you, a big jump if not
    flood: 20,                    // flooding a bathroom
  },
  // Survival mode: anything that maxes your heat. Staff stay on high alert, heat never drops, more staff keep
  // arriving, and you score double until you're caught. Getting caught ends the run.
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
    stunSec: 3,                   // every staff member is stunned (hands over ears) this long
    items: 8,                     // items scattered around the halls; they don't vanish until picked up
  },
  flood: { points: 400, heat: 60, noiseRadius: 16 },   // flooding a bathroom: points, heat, and that bathroom is closed for the day

  // Friends in the crowd raise a hand during passing periods: tap their bubble.
  friends: {
    count: 4,
    offerRange: 9,                // bubbles show within this distance (and line of sight)
    interactRange: 2.6,           // ...but you have to be this close to take them up on it
    offers: [["highFive", 3], ["gumTrade", 2]],   // fake passes now come from gum trades (and the principal's office)
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
  barkSec: 1.8, barkCooldownSec: 3,   // staff speech bubbles

  footsteps: { hearRange: 20, patrolInterval: 0.55, chaseInterval: 0.3, volume: 0.55 },

  strikes: {
    max: 3,
    warningSceneSec: 2.6,         // strike 1: "you better get to class"
    officeSceneSec: 3.4,          // strike 2: the office
    afterStrikeGraceSec: 3.0,     // after a strike scene, staff can't see you for this long
    officeLosesPeriodPoints: true,   // strike 2 costs you everything earned this period
    alert: { vision: 1.2, notice: 1.4, speed: 1.1 },   // after strike 2, staff stay this much sharper for the rest of the day
  },
  backup: { range: 60, maxResponders: 2 },   // a radio call / yell pulls this many nearby staff toward you
  pa: { showSec: 4.5, sameKindCooldownSec: 12 },
  render: { maxPixelRatio: 1.75, coneRays: 28 },
};

if (URLQ.has("crowd")) CFG.crowd.count = Math.max(20, Math.min(250, parseInt(URLQ.get("crowd"), 10) || CFG.crowd.count));

// Staff are data: adding a type later (principal) is one entry here.
const STAFF_TYPES = {
  hallMonitor: {
    name: "hall monitor",
    patrolSpeed: 2.0, chaseSpeed: 3.7,
    visionRange: 9, visionHalfAngleDeg: 50,   // slow, wide vision cone
    sweepDeg: 25, sweepRate: 0.9,             // looks side to side while patrolling
    notice: 1.0,                              // how fast suspicion builds (multiplier)
    routes: ["outer", "eight", "top", "bottom"],   // fixed patrol loops, handed out in this order
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
  hallTeacher: {
    name: "teacher",
    stationary: true,                          // stands at their classroom door
    visionRange: 7.5, visionHalfAngleDeg: 45,
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
                   slip: ["WHOA—", "My back!"], bust: ["I SAW that.", "Nice try."], tidy: ["Who left this here?", "Unbelievable.", "*sigh* Kids."] },
  securityGuard: { suspicious: ["...", "Movement."], chase: ["Code gray hoodie!", "Freeze!"], search: ["Come out, come out..."],
                   giveUp: ["Copy. Lost visual."], slip: ["Man down!"], winded: ["*wheeze*", "Gimme... a sec..."], bust: ["Gotcha."], tidy: ["Confiscated.", "Evidence."] },
  hallTeacher:   { suspicious: ["Excuse me?"], alarm: ["HALL PASS!", "Excuse me?!", "SECURITY!"] },
  principal:     { suspicious: ["Mm-hm."], chase: ["YOUNG PERSON!", "MY OFFICE!"], search: ["Hiding won't help."],
                   giveUp: ["This isn't over."], slip: ["Who put this here?!"], bust: ["Out. Now."], tidy: ["In MY school?", "Disgraceful."] },
};
const CAUGHT_LINES = {   // strike 1, by who caught you
  hallMonitor:   ["\"You better get to class.\"", "\"Pass? No? Didn't think so.\"", "\"I'm writing this down. In pen.\""],
  securityGuard: ["\"Let's go, chief. Walk with me.\"", "\"I used to be fast like you.\"", "\"You have the right to remain in class.\""],
  hallTeacher:   ["\"Hall pass? No? Inside. Now.\"", "\"I will be emailing your parents. In ALL CAPS.\""],
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
  "I wuz hea", { draw: "coolS" }, "(He × Li × N) × Ne", "SKOOL SUX", "officer dale is a dork", "I just lost the game",
  "√-1 2³ Σ π", "d/dt (my grades) < 0", { draw: "dontRead" }, "TARDY 4 LYFE", "LUNCH LADIES R HOT", "school | prison",
  { draw: "brick", text: "ANOTHER BRICK IN THE WALL" }, "sudo rm -rf /school", "BILLIONAIRE DROPOUTS CLUB", "SPICOLI WAS RIGHT",
  "I AM THE KWISATZ HADERACH", "Tm with your mom", { draw: "heart" }, "THE EARTH IS A TORUS",
];
const LUNCHES = ["mystery tacos.", "rectangle pizza.", "the meatloaf (again).", "\"breakfast for lunch.\"", "chicken nuggets of uncertain origin.", "soup?"];

// Hiding spots are data: a new kind is one entry here (placement lives in LAYOUT).
const SPOT_TYPES = {
  locker:    { label: "Locker", halfW: 0.45, maxStaySec: 15,
               stayLine: "Cramped. Smells like old gym socks.", timeoutLine: "Too cramped! You tumble out." },
  restroom:  { label: "Restroom", halfW: 0.75, maxStaySec: 45,
               stayLine: "Nobody questions a long bathroom break.", timeoutLine: "Someone's pounding on the stall door. Time to go." },
  classroom: { label: "Room", halfW: 0.6 },   // stay time comes from who's teaching
};
// Who's in the room. backfire = chance per grab that they pick up the phone and call security.
const TEACHER_TYPES = {
  teacher: { label: "Teacher", bootSec: 4, silhouette: 0x2b2f3a, backfire: 0.3,
             stayLine: "\"Can I help you?\"", bootLine: "\"Nice try. Out.\"" },
  sub:     { label: "Sub", bootSec: 14, silhouette: 0x3a7d44, backfire: 0.05, grabSec: 0.75,
             stayLine: "The sub is reading a magazine. You're under a desk.", bootLine: "The sub finally looks up: \"Are you even in this class?\"" },
  office:  { label: "Secretary", bootSec: 3, silhouette: 0x7a4b8c, backfire: 0.5,
             stayLine: "The secretary is on hold with the district. You duck behind the counter.", bootLine: "\"Do you have an appointment? No? Out.\"" },
};
// Rooms as shops: what's lying on the desks, by room type. A new room type is one line.
const ROOM_TYPES = {
  classroom: { label: "", loot: [["spitball", 4], ["paperAirplane", 4], ["gum", 3], ["bananaPeel", 1]], count: [1, 2] },
  science:   { label: "Science lab", plaque: 0x2ecc71, loot: [["stinkBomb", 4], ["slime", 3], ["whoopee", 2], ["bananaPeel", 1]], count: [1, 2] },
  art:       { label: "Art room", plaque: 0xe67e22, loot: [["sprayPaint", 4], ["wheelieChair", 3], ["paperAirplane", 2], ["gum", 1]], count: [1, 2] },
  gym:       { label: "Gym", plaque: 0xe74c3c, loot: [["basketball", 4], ["football", 3], ["frisbee", 3]], count: [1, 2] },
  office:    { label: "Main office", plaque: 0x34495e, door: 0x4a3426, staff: "office", count: [2, 3],
               loot: [["wheelieChair", 2], ["whoopee", 2], ["gum", 2], ["bananaPeel", 2]],
               // once-per-day specials: the confiscated drawer (points), a fake hall pass, and the master key
               specials: { prize: { icon: "🗄️", label: "Raid the confiscated-stuff drawer", points: 300 },
                           fakePass: { icon: "🎫", label: "Swipe a hall pass" },
                           masterKey: { icon: "🔑", label: "Lift the master key" } } },
};

// Items are data. kind: "throw" (flick it), "ride" (flick to launch yourself), "instant" (tap to use).
// hit: what happens when it hits someone. Hitting staff always pays more. Stun "flinch" = a stagger, "fall" = flat on the floor.
const ITEM_TYPES = {
  paperAirplane: { label: "Paper airplane", icon: "✈️", kind: "throw", flight: "glide2", speed: [6, 11], pitchDeg: 8, gravity: 1.2, glide: true,
                   // two-stage flight: soars over heads (fly-over points), then drops to head height (can hit people)
                   cruiseY: 2.55, highSec: [0.45, 1.3], lowY: 1.35, sinkRate: 0.75, drag: 0.25,
                   perStudent: 10, crowdLandBonus: 50, crowdLandCount: 3,
                   hit: { student: 20, staff: 80, studentSec: 0.5, staffSec: 0.7, style: "flinch" } },
  // Same two-stage flight as the paper airplane, but it unrolls as it goes and leaves a streamer of toilet paper behind
  // (it stays until the custodian clears it overnight). From the restrooms.
  toiletPaper:   { label: "Toilet paper", icon: "🧻", kind: "throw", flight: "glide2", speed: [6, 10], pitchDeg: 8, gravity: 1.2, glide: true,
                   cruiseY: 2.5, highSec: [0.5, 1.4], lowY: 1.4, sinkRate: 0.8, drag: 0.3,
                   perStudent: 10, crowdLandBonus: 30, crowdLandCount: 3, trailPointsPerM: 4,
                   hit: { student: 15, staff: 60, studentSec: 0.4, staffSec: 0.6, style: "flinch" } },
  // Same idea again, but it stays up much longer and you can pick it back up. Gym only.
  frisbee:       { label: "Frisbee", icon: "🥏", kind: "throw", flight: "glide2", recoverable: true, speed: [9, 14], pitchDeg: 6, gravity: 1.2, glide: true,
                   cruiseY: 2.3, highSec: [1.0, 2.2], lowY: 1.3, sinkRate: 0.45, drag: 0.12,
                   perStudent: 8, crowdLandBonus: 30, crowdLandCount: 3,
                   hit: { student: 25, staff: 100, studentSec: 0.6, staffSec: 0.9, style: "flinch" } },
  spitball:      { label: "Spitball", icon: "🫧", kind: "throw", uses: 3, speed: [12, 18], pitchDeg: 4, gravity: 6,
                   hit: { student: 25, staff: 75, studentSec: 0.4, staffSec: 0.8, style: "flinch" } },
  bananaPeel:    { label: "Banana peel", icon: "🍌", kind: "throw", speed: [2, 4.5], pitchDeg: 35, gravity: 9.8,
                   maxSlips: 5,   // stays down until a staff member slips on it (and cleans it up) or it's been slipped on 5 times
                   slipStaffSec: 2.5, slipStudentSec: 1.0, slipPlayerSec: 0.8, staffPoints: 150, studentPoints: 30 },
  whoopee:       { label: "Whoopee cushion", icon: "💨", kind: "throw", recoverable: true, trap: true, speed: [3, 8], pitchDeg: 35, gravity: 9.8,
                   noiseRadius: 14, points: 50 },   // goes off when someone steps on it (you too)
  basketball:    { label: "Basketball", icon: "🏀", kind: "throw", recoverable: true, speed: [5, 11], pitchDeg: 30, gravity: 9.8,
                   bounces: [6, 8], restitution: 0.72, noiseRadius: 10, bouncePoints: 5,
                   hit: { student: 35, staff: 140, studentSec: 1.0, staffSec: 1.8, style: "fall", minSpeed: 2 } },
  football:      { label: "Football", icon: "🏈", kind: "throw", recoverable: true, speed: [8, 15], pitchDeg: 26, gravity: 9.8,
                   bounces: [4, 7], restitution: [0.45, 0.85], erratic: 1.3,   // each bounce turns it up to ±1.3 rad, at a random bounciness
                   noiseRadius: 10, bouncePoints: 6,
                   hit: { student: 35, staff: 140, studentSec: 1.0, staffSec: 1.8, style: "fall", minSpeed: 2 } },
  stinkBomb:     { label: "Stink bomb", icon: "🧪", kind: "throw", speed: [4, 9], pitchDeg: 30, gravity: 9.8,   // science labs only
                   points: 60, cloudRadius: 2.3, cloudSec: 10, noiseRadius: 12,
                   perStudent: 15, perStaff: 60, studentGagSec: 0.8, staffGagSec: 1.4 },   // extra points for everyone who walks through it
  // Science labs: lands as a puddle (or on whoever it hits). The first few people to step in it are stuck for a few
  // seconds: staff can still look around and yell, they just can't move.
  slime:         { label: "Slime", icon: "🟢", kind: "throw", trap: true, speed: [4, 9], pitchDeg: 25, gravity: 9.8,
                   radius: 0.6, maxSticks: 3, stickStaffSec: 4, stickStudentSec: 2.5, stickPlayerSec: 1.5, staffPoints: 120, studentPoints: 30 },
  sprayPaint:    { label: "Spray paint", icon: "🎨", kind: "spray", uses: 3, points: 100, wallRange: 1.7 },   // art rooms only
  masterKey:     { label: "Master key", icon: "🔑", kind: "key", uses: 3 },   // the principal's office only: opens locked or used doors
  wheelieChair:  { label: "Wheelie chair", icon: "🪑", kind: "ride", rideSpeed: 9.5, maxRideSec: 3, dazeSec: 1.5, leftoverSec: 3,
                   studentPoints: 40 },
  gum:           { label: "Gum", icon: "🍬", kind: "instant", points: 100, line: "You stick gum under the water fountain. Gross. +havoc" },
  // Junk from lockers: takes up a slot until you toss it (select it to drop it). Staff tidy it up like anything else.
  oldSock:       { label: "Old gym sock", icon: "🧦", kind: "junk", line: "You drop the sock. It lands with a damp slap." },
  sandwich:      { label: "Moldy sandwich", icon: "🥪", kind: "junk", line: "You toss the sandwich. Something in it moved." },
  homework:      { label: "Crumpled homework", icon: "📄", kind: "junk", line: "You toss someone's homework. It's a D-minus anyway." },
};
const REST_Y = { basketball: 0.2, football: 0.14, wheelieChair: 0, whoopee: 0.08, frisbee: 0.03, slime: 0.02 };   // how high items sit on the floor (default 0.04)

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
    { h: 0, t: 9.75, room: 101 }, { h: 0, t: 19.5, room: 102, type: "science" }, { h: 0, t: 29.25, room: 103 },
    { h: 1, t: 8.5, room: 104, type: "art" }, { h: 6, t: 29, side: -1, room: 105, type: "office" }, { h: 6, t: 10, side: -1, room: 106 },
    { h: 5, t: 8.5, room: 107 },
    { h: 6, t: 14, side: 1, room: 201, type: "gym" }, { h: 6, t: 25, side: 1, room: 202 }, { h: 2, t: 8.5, room: 203, type: "science" },
    { h: 3, t: 9.75, room: 204 }, { h: 3, t: 19.5, room: 205, type: "art" }, { h: 3, t: 29.25, room: 206 }, { h: 4, t: 8.5, room: 207 },
  ],
  hideLockers: [ { h: 0, t: 4 }, { h: 0, t: 25 }, { h: 1, t: 13 }, { h: 2, t: 4 }, { h: 3, t: 27 }, { h: 4, t: 13 }, { h: 5, t: 4 } ],
  restrooms: [ { h: 2, t: 12 }, { h: 5, t: 12 } ],
  fireAlarms: [ { h: 6, t: 14.5, side: -1 }, { h: 1, t: 13.5 }, { h: 3, t: 24.5 } ],   // side defaults to the classroom wall
};

// Things pushed against a wall. Side defaults to the outer (locker) wall.
const OBSTACLES = [
  { name: "vending machine", h: 0, t: 18.7, halfLen: 0.7, depth: 0.85, height: 2.0, color: 0xc0392b },
  { name: "vending machine", h: 0, t: 20.3, halfLen: 0.7, depth: 0.85, height: 2.0, color: 0x2e86c1 },
  { name: "trophy case",     h: 6, t: 19.5, side: -1, halfLen: 1.4, depth: 0.7, height: 1.9, color: 0x8e6b3e },
  { name: "water fountain",  h: 1, t: 8.5, halfLen: 0.45, depth: 0.5, height: 1.0, color: 0xbfc9d1 },
  { name: "bench",           h: 3, t: 12, halfLen: 1.3, depth: 0.55, height: 0.5, color: 0x7a5230 },
  { name: "bench",           h: 4, t: 8.5, halfLen: 1.3, depth: 0.55, height: 0.5, color: 0x7a5230 },
];

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
  const H = { name: def.name, a, b, ax: A.x, az: A.z, len, dx, dz, nx: -dz, nz: dx };
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
const camera = new THREE.PerspectiveCamera(CFG.camera.fov, 1, 0.1, 120);
scene.add(new THREE.HemisphereLight(0xffffff, 0x8a7f6a, 1.15));
const sun = new THREE.DirectionalLight(0xffffff, 0.75);
sun.position.set(6, 14, 9);
scene.add(sun);

const lambert = (color) => new THREE.MeshLambertMaterial({ color, flatShading: true });
function box(w, h, d, color, x, y, z) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), lambert(color));
  m.position.set(x, y, z); scene.add(m); return m;
}
// a box lying flat against a hall wall, centered at (h, t, lat)
function wallBox(h, t, lat, w, hgt, d, color, y) { const p = hallPos(h, t, lat); const m = box(w, hgt, d, color, p.x, y, p.z); m.rotation.y = wallRot(h); return m; }

// Floor: checker tiles via vertex colors.
{
  const W = LAYOUT.outerHalf.x * 2, D = LAYOUT.outerHalf.z * 2;
  const g = new THREE.PlaneGeometry(W, D, W, D).toNonIndexed();
  g.rotateX(-Math.PI / 2);
  const pos = g.attributes.position, colors = new Float32Array(pos.count * 3);
  const a = new THREE.Color(0xdcd6c8), b = new THREE.Color(0xb9b2a2);
  for (let i = 0; i < pos.count; i += 6) {   // two triangles per tile
    let cx = 0, cz = 0;
    for (let k = 0; k < 6; k++) { cx += pos.getX(i + k); cz += pos.getZ(i + k); }
    const c = (Math.floor(cx / 6 + 100) + Math.floor(cz / 6 + 100)) % 2 ? a : b;
    for (let k = 0; k < 6; k++) c.toArray(colors, (i + k) * 3);
  }
  g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  scene.add(new THREE.Mesh(g, new THREE.MeshLambertMaterial({ vertexColors: true })));
}

// Walls
{
  const H = LAYOUT.wallHeight, ox = LAYOUT.outerHalf.x, oz = LAYOUT.outerHalf.z;
  for (const b of LAYOUT.blocks) {
    const w = b.x1 - b.x0, d = b.z1 - b.z0, cx = (b.x0 + b.x1) / 2, cz = (b.z0 + b.z1) / 2;
    box(w, H, d, b.color, cx, H / 2, cz);
    box(w + 0.02, 0.25, d + 0.02, 0x6b8cae, cx, 1.05, cz);   // stripe
  }
  box(ox * 2 + 1, H, 0.5, 0xcfc5ad, 0, H / 2, -oz - 0.25);
  box(ox * 2 + 1, H, 0.5, 0xcfc5ad, 0, H / 2, oz + 0.25);
  box(0.5, H, oz * 2 + 1, 0xcfc5ad, -ox - 0.25, H / 2, 0);
  box(0.5, H, oz * 2 + 1, 0xcfc5ad, ox + 0.25, H / 2, 0);
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
      if (near(LAYOUT.hideLockers, h, t, 0.75) || near(LAYOUT.restrooms, h, t, 1.0)) continue;
      positions.push({ h, t });
    }
  });
  const lockerGeo = new THREE.BoxGeometry(0.56, 2.0, LAYOUT.lockerDepth);
  const lockers = new THREE.InstancedMesh(lockerGeo, lambert(0xffffff), positions.length);
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
  sp.glow.push(wallBox(h, t, wl + side * LAYOUT.lockerDepth / 2, 0.9, 2.1, LAYOUT.lockerDepth, 0x7d9a86, 1.05).material);
  for (let k = 0; k < 3; k++) wallBox(h, t, wl - side * 0.01, 0.5, 0.035, 0.02, 0x2a3a30, 1.62 + k * 0.09);
}
for (const { h, t } of LAYOUT.restrooms) {
  const side = HALLS[h].outerSide, wl = wallLat(h, side), sp = addSpot("restroom", h, t, side, { nextSweep: 0 });
  sp.glow.push(wallBox(h, t, wl + side * (LAYOUT.lockerDepth - 0.04), 1.3, 2.25, 0.08, 0x3f9c9a, 1.125).material);
  wallBox(h, t, wl + side * (LAYOUT.lockerDepth - 0.09), 0.42, 0.42, 0.03, 0xf4f4f4, 2.55);
  wallBox(h, t, wl + side * (LAYOUT.lockerDepth - 0.11), 0.12, 0.2, 0.02, 0x3f9c9a, 2.5);
  wallBox(h, t, wl + side * (LAYOUT.lockerDepth - 0.11), 0.09, 0.09, 0.02, 0x3f9c9a, 2.66);
}
for (const d of LAYOUT.doors) {
  const H = HALLS[d.h], side = d.side ?? (H.sideType[1] === "block" ? 1 : -1), wl = wallLat(d.h, side);
  const R = ROOM_TYPES[d.type ?? "classroom"];
  const door = wallBox(d.h, d.t, wl - side * 0.03, 1.2, 2.2, 0.08, R.door ?? 0x8b5a2b, 1.1);
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
for (const t of [5, 19.5, 34]) {   // the main hall's bare walls get bulletin boards
  wallBox(6, t, wallLat(6, 1) - 0.03, 2.2, 1.1, 0.05, 0xc49a6c, 1.7);
  for (let k = 0; k < 4; k++) wallBox(6, t - 0.75 + k * 0.5, wallLat(6, 1) - 0.06, 0.32, 0.42, 0.02, pick([0xffffff, 0xfff1a8, 0xa8e6ff, 0xffc2d4]), 1.7 + (k % 2 ? 0.15 : -0.12));
}

// =====================================================================================
// Characters
// =====================================================================================
function makePerson({ body, skin = 0xf1c27d, scale = 1, hat = null, hood = null }) {
  const g = new THREE.Group();
  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.27, 0.32, 1.05, 7), lambert(body));
  torso.position.y = 0.55; g.add(torso);
  const head = new THREE.Mesh(new THREE.IcosahedronGeometry(0.23, 0), lambert(skin));
  head.position.y = 1.32; g.add(head);
  const eyes = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.06, 0.05), lambert(0x222222));
  eyes.position.set(0, 1.36, 0.2); g.add(eyes);           // shows which way they face (+z)
  g.userData.eyes = eyes;
  if (hood) { const hd = new THREE.Mesh(new THREE.IcosahedronGeometry(0.25, 0), lambert(hood)); hd.position.set(0, 1.36, -0.08); hd.scale.set(1, 1, 0.9); g.add(hd); }
  if (hat) { const ht = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.1, 0.48), lambert(hat)); ht.position.set(0, 1.52, 0.05); g.add(ht); }
  g.scale.setScalar(scale);
  scene.add(g);
  return g;
}

// ---------- player ----------
const player = {
  x: 0, z: 0, vx: 0, vz: 0, heading: 0, stamina: 1, sprinting: false, winded: false, shoveCD: 0,
  hidden: null, hideT: 0, hideArmed: false, graceT: 0, invisT: 0, pushSpot: null, pushT: 0, slipT: 0, dazeT: 0, stuckT: 0, ride: null,
  mesh: makePerson({ body: 0x8a8f99, hood: 0x7b808a }),   // the gray hoodie
};

// ---------- crowd (instanced: one mesh for bodies, one for heads) ----------
const crowd = [];
const crowdBodies = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.26, 0.3, 1.0, 6).translate(0, 0.5, 0), lambert(0xffffff), CFG.crowd.count);
const crowdHeads = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(0.21, 0).translate(0, 1.24, 0), lambert(0xffffff), CFG.crowd.count);
crowdBodies.setColorAt(0, new THREE.Color(0xffffff)); crowdHeads.setColorAt(0, new THREE.Color(0xffffff));   // per-kid colors, filled in each frame
crowdBodies.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
crowdHeads.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
// drawCrowd() does its own per-kid culling; three.js would otherwise cull the whole crowd using a bounding sphere
// computed once from the first frame, so every kid vanished at some camera angles.
crowdBodies.frustumCulled = crowdHeads.frustumCulled = false;
scene.add(crowdBodies, crowdHeads);
const DOOR_SPOTS = () => SPOTS.filter((sp) => sp.kind === "classroom");
{
  for (let i = 0; i < CFG.crowd.count; i++) {
    crowd.push({ shirt: new THREE.Color(pick(SHIRT_COLORS)), skin: new THREE.Color(pick(SKIN_COLORS)), h: 0, t: 0, to: 0, lat: 0, x: 0, z: 0, targetLat: 0, speed: 1, mode: "gone", leaveAt: 0, door: null,
      spawnAt: 0, retargetT: 0, bob: Math.random() * 10, heading: 0, scale: rand(0.88, 1.08), slipT: 0 });
  }
}

// ---------- staff ----------
const staff = [];
const markersEl = document.getElementById("markers");
function spawnStaff(typeKey, place) {
  const T = STAFF_TYPES[typeKey];
  const mesh = makePerson({ body: T.vestColor, skin: pick(SKIN_COLORS), scale: T.scale, hat: T.hatColor });
  if (typeKey === "principal") {   // a red tie
    const tie = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.4, 0.04), lambert(0xc0392b));
    tie.position.set(0, 0.85, 0.3); mesh.add(tie);
  }
  if (T.stationary) {   // a coffee mug, so teachers read differently from a distance
    const mug = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.14, 6), lambert(0xffffff));
    mug.position.set(0.3, 0.85, 0.2); mesh.add(mug);
  }
  const RAYS = CFG.render.coneRays;
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array((RAYS + 2) * 3), 3));
  const idx = []; for (let i = 0; i < RAYS; i++) idx.push(0, i + 1, i + 2);
  geo.setIndex(idx);
  const cone = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0xfff2a8, transparent: true, opacity: 0.28, depthWrite: false, side: THREE.DoubleSide }));
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
    const doors = DOOR_SPOTS().filter((sp) => !taken.has(sp) && !sp.R.staff);
    doors.sort((a, b) => spotDist(b) - spotDist(a));
    const sp = pick(doors.slice(0, Math.max(1, Math.ceil(doors.length / 2))));
    const p = hallPos(sp.h, sp.t + 0.95, sp.wallLat - sp.side * 0.55);
    return { post: sp, x: p.x, z: p.z, facing: Math.atan2(-sp.side * HALLS[sp.h].nx, -sp.side * HALLS[sp.h].nz) };
  }
  const n = staff.filter((s) => s.key === typeKey).length;
  const routeName = T.routes ? T.routes[n % T.routes.length] : null;
  let best = null, bestD = -1;
  for (let k = 0; k < 12; k++) {
    let place;
    if (routeName) {
      const R = LAYOUT.routes[routeName].map(nodeIndex), rstep = Math.random() < 0.5 ? 1 : -1, i = Math.floor(Math.random() * R.length);
      const from = R[i], to = R[mod(i + rstep, R.length)], h = hallBetween(from, to);
      place = { h, t: rand(0, HALLS[h].len), to, route: R, ri: mod(i + rstep, R.length), rstep };
    } else {
      const h = Math.floor(Math.random() * HALLS.length);
      place = { h, t: rand(0, HALLS[h].len), to: Math.random() < 0.5 ? HALLS[h].a : HALLS[h].b };
    }
    const p = hallPos(place.h, place.t, 0), d = Math.hypot(p.x - player.x, p.z - player.z);
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
// Keyboard players get faint key hints (E bubbles, slot numbers). Touching the screen switches them off again.
let usingKeys = false;
function setUsingKeys(on) { if (usingKeys === on) return; usingKeys = on; document.body.classList.toggle("kbd", on); }
window.addEventListener("pointerdown", (e) => { if (e.pointerType === "touch") setUsingKeys(false); }, true);
window.addEventListener("keydown", (e) => {
  const k = e.key.toLowerCase();
  keys.add(k);
  if (/^(w|a|s|d|e|shift|arrow\w+|[1-9]| )$/.test(k)) setUsingKeys(true);
  if ((e.key === " " || e.key === "Enter") && game.state !== "playing") { e.preventDefault(); onOverlayTap(); return; }
  if (game.state !== "playing") return;
  if (e.key === "Escape") { if (game.aim) cancelAim(); else pause(); return; }
  if (k.startsWith("arrow") || k === " ") e.preventDefault();   // no page scrolling
  if (game.aim && k.startsWith("arrow") && !game.aim.kb) startKeyAim(game.aim);   // arrows take over a mouse aim
  if (k === " " && game.aim && !e.repeat) { keyThrow(); return; }
  if (/^[1-9]$/.test(e.key) && !e.repeat) {
    if (player.hidden) { lootEl.querySelectorAll("button")[+e.key - 1]?.click(); return; }   // grab the Nth thing on the desk
    selectSlot(+e.key - 1, true); return;
  }
  if (k === "e" && !e.repeat) doInteract();
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
  let it = null, id = CFG.items.pickupRange;
  for (const o of objects) if (pickable(o)) { const d = Math.hypot(o.x - player.x, o.z - player.z); if (d < id) { id = d; it = o; } }
  if (it) return { kind: "item", o: it, x: it.x, y: it.y + 0.5, z: it.z, label: `pick up ${it.T.label.toLowerCase()}` };
  const al = nearestAlarm();
  if (al && !game.alarmPulled) { const p = hallPos(al.h, al.t, al.wl - al.side * 0.2, {}); return { kind: "alarm", a: al, x: p.x, y: 1.9, z: p.z, label: performance.now() < al.armT ? "PULL IT" : "fire alarm" }; }
  const sp = nearestSpot();
  if (sp && (!spotBlocked(sp) || (keyOpens(sp) && hasKey()))) { const p = hallPos(sp.h, sp.t, sp.wallLat - sp.side * 0.1, {}); return { kind: "spot", sp, x: p.x, y: 2.0, z: p.z, label: spotBlocked(sp) ? "unlock 🔑" : "hide" }; }
  return null;
}
function doInteract() {
  const t = interactTarget();
  if (!t) { const sp = nearestSpot(); if (sp) enterSpot(sp); return; }   // shows why it's blocked
  if (t.kind === "leave") exitSpot(false);
  else if (t.kind === "plane") catchPlane(t.o);
  else if (t.kind === "friend") friendTap(t.c);
  else if (t.kind === "item") pickUp(t.o);
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
  input.x = x; input.y = y; input.m = m;
}

// =====================================================================================
// Game state
// =====================================================================================
const game = { state: "title", day: 1, period: 1, phase: "passing", phaseT: 0, score: 0, time: 0,
  strikes: 0, highAlert: false, periodScore: 0, periodsSkipped: 0, dayPeriodsSkipped: 0, sceneT: 0, sceneEnd: null,
  lockerUses: 0, pendingOffice: false, hotbar: [], aim: null, havocCount: {}, heat: 0, heatPending: 0, security: 0, survival: false, survivalT: 0, nextArrivalT: 0, nextRadioT: 0, alarmT: 0, alarmPulled: false,
  unseenT: 0, nearMissT: 0, passShield: false, nextPlaneT: 0, nerveAcc: 0 };
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
  return alertMult(k) * dayMult(day) * (1 + CFG.heat.effect[k] * game.heat / 100) * (1 + CFG.security.effect[k] * game.security / 100);
}
const periodsToday = () => CFG.periodsPerDay;
function phaseLen(phase = game.phase) {
  const D = CFG.days, n = game.day - 1;
  return phase === "passing" ? Math.max(D.minPassingSec, CFG.passingSec + D.passingSecPerDay * n)
                             : Math.min(D.maxSkippingSec, CFG.skippingSec + D.skippingSecPerDay * n);
}

// ---- save at the bell, so a returning player lands at "Day 1, Period 4" ----
const SAVE_KEY = "hallwaySkip.save.v1";
function saveGame() {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify({ day: game.day, period: game.period, score: Math.floor(game.score),
    strikes: game.strikes, highAlert: game.highAlert, periodsSkipped: game.periodsSkipped, security: Math.round(game.security), survival: game.survival })); } catch (e) { /* storage blocked: fine */ }
}
function loadSave() { try { const s = JSON.parse(localStorage.getItem(SAVE_KEY)); return s && s.day ? s : null; } catch (e) { return null; } }
function clearSave() { try { localStorage.removeItem(SAVE_KEY); } catch (e) { /* fine */ } }

// Kid walks in from the entrance; the hall is full of students already out and about.
function morningSetup() {
  const { h, t } = LAYOUT.entrance, side = HALLS[h].outerSide;
  const p = hallPos(h, t, wallLat(h, side) - side * 0.8);
  player.x = p.x; player.z = p.z; player.vx = player.vz = 0;
  player.heading = hallHeading(h, -1);
  cam.yaw = player.heading; manualCamT = 0;
  player.hidden = null; player.mesh.visible = true; player.graceT = 0; player.invisT = 0; player.pushT = 0; player.pushSpot = null;
  ui.hide.hidden = true;
  for (const c of crowd) {
    c.h = Math.floor(Math.random() * HALLS.length); c.t = rand(0, HALLS[c.h].len);
    if (c.h === h && Math.abs(c.t - t) < 2.5) c.t = (c.t + 5) % HALLS[h].len;
    const [lo, hi] = latLimits(c.h, c.t);
    c.lat = c.targetLat = rand(lo, hi);
    c.to = Math.random() < 0.5 ? HALLS[c.h].a : HALLS[c.h].b;
    hallPos(c.h, c.t, c.lat, c);
    c.speed = rand(CFG.crowd.speedMin, CFG.crowd.speedMax);
    c.mode = "wander"; c.retargetT = rand(1, 4);
  }
  clearStaff();
  clearObjects(); cancelAim(); clearGraffiti(); clearTrails();   // the custodian scrubs the walls (and takes down the TP) overnight
  if (player.ride) { scene.remove(player.ride.chair); player.ride = null; }
  player.slipT = player.dazeT = player.stuckT = 0; player.mesh.rotation.z = 0; player.stamina = 1; player.winded = false;
  game.hotbar = Array(CFG.items.slots).fill(null); renderHotbar();
  rollSubs();             // first, so sub rooms get their extra desk loot
  resetSpotsForPeriod();
  for (const sp of SPOTS) if (sp.kind === "restroom") {
    sp.nextSweep = game.time + rand(12, CFG.hiding.restroomSweepEverySec);
    sp.closed = false; if (sp.puddle) sp.puddle.visible = false;   // mopped overnight
  }
  game.alarmPulled = false; stopAlarm();
  startPassing(true);
  if (game.strikes >= 2) ensurePrincipal(false);
  for (const c of crowd) if (c.friend) c.friend.cd = rand(0, 6);
}

function resetGame(save = null) {
  game.day = save?.day ?? 1; game.period = save?.period ?? 1; game.score = save?.score ?? 0; game.time = 0;
  game.strikes = save?.strikes ?? 0; game.highAlert = save?.highAlert ?? false;
  game.periodScore = 0; game.periodsSkipped = save?.periodsSkipped ?? 0; game.dayPeriodsSkipped = 0;
  game.security = save?.security ?? 0; game.heat = game.heatPending = 0;
  game.survival = !!save?.survival; game.survivalT = 0; game.alarmT = 0;
  if (game.survival) { game.heat = 100; game.highAlert = true; }   // a saved run in survival mode stays in it
  game.unseenT = 0; game.nearMissT = 0; game.passShield = false;
  paLast = {}; Ads.newDay();
  morningSetup();
}
function resetSpotsForPeriod() {
  game.lockerUses = CFG.hiding.lockerUsesPerPeriod;
  for (const sp of SPOTS) {
    sp.used = false; sp.rummaged = false; sp.tpTaken = false;
    if (sp.kind === "classroom") {
      // raided last period: locked for a while, and nothing gets restocked until it opens again
      if (sp.raided) { sp.lockedUntil = game.period + CFG.rooms.raidLockPeriods - 1; sp.raided = false; }
      if (!roomLocked(sp)) {   // restock the desks
        const [lo, hi] = sp.R.count, n = lo + Math.floor(Math.random() * (hi - lo + 1)) + (sp.teacher === "sub" ? 1 : 0);
        sp.loot = Array.from({ length: n }, () => pickWeighted(sp.R.loot));
      }
      sp.lootVer = (sp.lootVer ?? 0) + 1;
      sp.lockSign.visible = roomLocked(sp);
    }
  }
}

function startPassing(first) {
  game.phase = "passing"; game.phaseT = 0; game.periodScore = 0;
  game.havocCount = {}; game.nextPlaneT = rand(...CFG.airplanes.everySec);
  const P = phaseLen("passing"), doors = DOOR_SPOTS();
  for (const c of crowd) {
    c.leaveAt = game.alarmT > 0 ? Infinity : rand(CFG.crowd.leaveStartFrac, CFG.crowd.leaveEndFrac) * P;   // nobody goes to class during a fire alarm
    c.door = pick(doors);
    if (!first) { c.mode = "spawning"; c.spawnAt = rand(0, CFG.crowd.floodSpreadSec); c.speed = rand(CFG.crowd.speedMin, CFG.crowd.speedMax); }
  }
  // staff for this period (the within-day curve); they stay on for the rest of the day
  for (const [key, table, line] of [["hallMonitor", CFG.monitorsPerPeriod], ["securityGuard", CFG.guardsPerPeriod, "guardOnDuty"], ["hallTeacher", CFG.teachersPerPeriod, "teacherOut"]]) {
    let have = staff.filter((st) => st.key === key).length;
    const S = CFG.security, extra = key !== "securityGuard" ? 0 : (game.security >= S.extraGuardAt ? 1 : 0) + (game.security >= S.secondGuardAt ? 1 : 0);
    const want = perPeriod(table) + extra;
    if (have < want && line && game.state === "playing") pa(line);
    while (have < want) { spawnStaff(key, pickStaffPlace(key)); have++; }
  }
  if (game.period === periodsToday() && !first) setTimeout(() => game.state === "playing" && game.period === periodsToday() && pa("lastPeriod"), 2500);
}

function startSkipping() {
  game.phase = "skipping"; game.phaseT = 0;
  playBell();
  banner("TARDY BELL<small>Hall's clearing out. Stay hidden until the next bell.</small>");
  if (game.alarmT <= 0) for (const c of crowd) if (c.mode === "wander" || c.mode === "toClass") { c.mode = "toClass"; c.speed = CFG.crowd.tardyRushSpeed; }
}

function periodSurvived() {
  playBell();
  game.periodsSkipped++; game.dayPeriodsSkipped++;
  if (!game.survival) { game.heat *= 1 - CFG.heat.bellDrop; game.heatPending *= 1 - CFG.heat.bellDrop; }
  if (game.period >= periodsToday()) { dayOver(); return; }
  game.period++;
  resetSpotsForPeriod();
  if (player.hidden?.kind === "classroom") exitSpot(false, "Bell! You slip out with the class.");
  banner(`BELL! +${CFG.pointsPerPeriod}<small>Period ${game.period - 1} skipped. Blend into the crowd.</small>`);
  startPassing(false);
  saveGame();
}

// End of the day: a summary screen, then the next (harder) day starts in the morning.
function dayOver() {
  game.state = "dayEnd";
  releaseControls();
  ui.banner.classList.remove("show"); bannerTimer = 0;
  if (player.hidden) exitSpot(false);
  game.score += CFG.days.dayBonus;
  const D = CFG.days, next = game.day + 1;
  $("dayTitle").textContent = `DAY ${game.day} SURVIVED!`;
  $("dayStats").innerHTML = `${game.dayPeriodsSkipped} periods skipped today · +${D.dayBonus} day bonus<br><b>Score ${Math.floor(game.score)}</b> · Strikes ${game.strikes}/${CFG.strikes.max}<br><small>Tomorrow's lunch: ${pick(LUNCHES)}</small>`;
  const pass = Math.max(D.minPassingSec, CFG.passingSec + D.passingSecPerDay * (next - 1));
  const skip = Math.min(D.maxSkippingSec, CFG.skippingSec + D.skippingSecPerDay * (next - 1));
  const S = CFG.security, before = Math.round(game.security);
  game.security *= 1 - S.dayDecay;
  $("dayNext").innerHTML = (game.survival ? `<b class="warn">You're still in SURVIVAL MODE. They'll be waiting for you tomorrow.</b> ` : "") +
    `Day ${next}: staff are faster and sharper. Passing ${pass}s, skipping ${skip}s. School alert ${before}% → ${Math.round(game.security)}% overnight` +
    (game.security >= S.extraGuardAt ? ` (${game.security >= S.secondGuardAt ? "two extra guards" : "an extra guard"} on duty).` : ".");
  $("dayPassBtn").hidden = !Ads.canRewarded("fakePass") || game.passShield;
  $("dayEnd").hidden = false;
  game.day = next; game.period = 1; game.highAlert = game.survival; game.dayPeriodsSkipped = 0;
  if (!game.survival) game.heat = game.heatPending = 0;
  saveGame();
}
function startNextDay() {
  $("dayEnd").hidden = true;
  Ads.newDay();
  morningSetup();
  game.state = "playing";
  if (game.survival) {
    banner(`DAY ${game.day} · SURVIVAL<small>They didn't forget. Every staff member is looking for you.</small>`, 3.2);
    setTimeout(() => game.state === "playing" && pa("survival"), 1500);
  } else {
    banner(`DAY ${game.day}<small>New day, same hoodie. New subs today.</small>`, 2.6);
    setTimeout(() => game.state === "playing" && pa("newDay", null, null, { d: game.day }), 1500);
  }
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

function caught(st) {
  cancelAim();
  if (player.ride) endRide(false);
  if (game.phase === "passing" && game.heat < CFG.heat.passingCatchAt && !game.survival) { shoo(st); return; }
  game.unseenT = 0;
  if (game.passShield) {   // the fake pass: one free get-out
    game.passShield = false;
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
    const E = game.survival || game.heat >= 100 ? RUN_ENDINGS.maxed : game.heat >= CFG.heat.passingCatchAt ? RUN_ENDINGS.high : RUN_ENDINGS.normal;
    $("caughtTitle").textContent = E.title;
    $("caughtText").innerHTML = `The ${st.type.name} walks you to the office. ${pick(E.lines)}<br>` +
      (game.survival ? `You lasted ${Math.round(game.survivalT)} seconds in survival mode.<br>` : "") +
      `<b>Score ${Math.floor(game.score)}</b> · Day ${game.day}, period ${game.period} · ${game.periodsSkipped} period${game.periodsSkipped === 1 ? "" : "s"} skipped`;
    $("caught").hidden = false;
    return;
  }
  game.state = "scene"; game.sceneT = 0;
  const office = game.strikes === 2;
  game.sceneEnd = office ? CFG.strikes.officeSceneSec : CFG.strikes.warningSceneSec;
  const lost = office && CFG.strikes.officeLosesPeriodPoints ? Math.floor(game.periodScore) : 0;
  $("strikeTitle").textContent = office ? "STRIKE 2 · THE OFFICE" : "STRIKE 1 · WARNING";
  $("strikeLine").textContent = office
    ? `${pick(OFFICE_RANTS)} Staff will be watching you for the rest of the day.`
    : `The ${st.type.name} catches you. ${pick(CAUGHT_LINES[st.key] ?? [st.type.caughtLine])}`;
  $("strikeExcuse").textContent = `Your excuse: "${pick(EXCUSES)}" It does not work.`;
  $("strikeSub").textContent = office ? (lost ? `-${lost} points (this period's skipping)` : "") : "One more and you're going to the office.";
  $("strikeDots").innerHTML = strikeDotsHtml();
  const canForge = Ads.canRewarded("forgeNote");
  $("forgeBtn").hidden = !canForge;
  if (canForge) game.sceneEnd += 3.5;   // a little longer, so there's time to decide
  $("strike").className = "overlay " + (office ? "office" : "warning");
  $("strike").hidden = false;
  if (office) { game.score -= lost; game.periodScore = 0; }
  pa(office ? "strike2" : "strike1");
  // everyone backs off
  for (const o of staff) {
    if (o.type.stationary) o.state = "post";
    else if (o.state !== "patrol") { o.state = "return"; setReturnPoint(o); }
    o.suspicion = 0; o.calledBackup = false; o.chaseT = 0; o.windedT = 0; o.pauseT = 0.8;
  }
  game.pendingOffice = office;
}

// Caught during a passing period while heat is low: no strike, just "get to class!" and a little heat.
function shoo(st, line = null) {
  toast(line ?? `The ${st.type.name}: "Get to class!" (No strike: heat is low during passing.)`, 2.6);
  playBlip([520, 390], 0.1, "triangle", 0.07);
  if (!line) addHeat(CFG.heat.shooHeat);
  for (const o of staff) {
    if (o.type.stationary) { o.suspicion = 0; o.alarmT = Math.max(o.alarmT, 3); continue; }
    if (o.state !== "patrol") { o.state = "return"; setReturnPoint(o); }
    o.suspicion = 0; o.calledBackup = false; o.pauseT = 1.0;
  }
  player.invisT = 2.0;
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
  game.state = "playing";
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
  tryFullscreenLandscape();
  saveGame();
}
function onOverlayTap(e) {
  initAudio();
  if (game.state === "title") {   // only the buttons do anything on the title screen
    const id = e?.target?.id ?? "startBtn";
    if (id === "aboutBtn") { $("about").hidden = false; return; }
    if (id === "startBtn" || id === "continueBtn") startRun(id === "continueBtn" ? loadSave() : null);
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
  if (player.ride) { updateRide(dt); return; }
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
  const sp = CFG.player.speed * (player.sprinting ? CFG.sprint.speedMult : 1);
  const ox = player.x, oz = player.z;
  player.x += mx * sp * dt; player.z += mz * sp * dt;
  // students jostle you out of the way (sprinting, you barge through them instead)
  player.shoveCD = Math.max(0, player.shoveCD - dt);
  for (const c of crowd) {
    if (c.mode === "gone" || c.mode === "spawning") continue;
    const dx = player.x - c.x, dz = player.z - c.z, d = Math.hypot(dx, dz), min = CFG.player.radius + CFG.crowd.radius;
    if (d < min && d > 1e-4) {
      if (player.sprinting) { shove(c); player.x += (dx / d) * (min - d) * 0.3; player.z += (dz / d) * (min - d) * 0.3; }
      else { player.x += (dx / d) * (min - d); player.z += (dz / d) * (min - d); }
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
  player.mesh.position.set(player.x, moving ? Math.abs(Math.sin(game.time * 11)) * 0.07 : 0, player.z);
  player.mesh.rotation.y = player.heading;
}

// ---- sprinting ----
function updateSprint(dt) {
  const S = CFG.sprint, want = (keys.has("shift") || sprintTouch) && input.m > 0;
  if (player.winded && player.stamina >= S.restartAt) player.winded = false;
  player.sprinting = want && !player.winded && player.stamina > 0;
  if (player.sprinting) { player.stamina = Math.max(0, player.stamina - dt / S.staminaSec); if (player.stamina <= 0) { player.winded = true; toast("Out of breath!"); } }
  else player.stamina = Math.min(1, player.stamina + dt / S.rechargeSec);
}
// barging through a kid: they stagger aside, nearby staff turn to look, and if one sees you it's a bit of heat
function shove(c) {
  const S = CFG.sprint;
  if (c.slipT <= 0) {
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
      const d = c.door;
      c.mode = "exiting"; c.h = d.h; c.t = d.t + rand(-0.4, 0.4); c.lat = d.wallLat;
      const [lo, hi] = latLimits(c.h, c.t);
      c.targetLat = rand(lo, hi);
      c.to = Math.random() < 0.5 ? HALLS[c.h].a : HALLS[c.h].b;
      c.door = pick(DOOR_SPOTS());
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
      if (game.phase === "passing" && game.phaseT >= c.leaveAt) c.mode = "toClass";
    } else if (c.mode === "toClass") {
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
function drawCrowd() {
  projScreen.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse); frustum.setFromProjectionMatrix(projScreen);
  const cx = camera.position.x, cz = camera.position.z, far = CFG.crowd.cullDistance;
  let n = 0;
  for (const c of crowd) {
    if (c.mode === "gone" || c.mode === "spawning") continue;
    if (crowdCull) {
      if (Math.hypot(c.x - cx, c.z - cz) > far) continue;
      cullSphere.center.set(c.x, 0.7, c.z);
      if (!frustum.intersectsSphere(cullSphere)) continue;
      if (!lineOfSight(cx, cz, c.x, c.z) && !lineOfSight(player.x, player.z, c.x, c.z) &&   // (also their shoulders, so a kid
          !lineOfSight(cx, cz, c.x + 0.35, c.z + 0.35) && !lineOfSight(cx, cz, c.x - 0.35, c.z - 0.35)) continue;   // peeking round a corner shows)
    }
    crowdMatrix.position.set(c.x, Math.abs(Math.sin(game.time * 8 + c.bob)) * 0.05, c.z);
    crowdMatrix.rotation.set(c.slipT <= 0 ? 0 : c.stunStyle === "flinch" ? 0.3 + Math.sin(game.time * 16) * 0.15 : c.stunStyle === "stuck" ? Math.sin(game.time * 10 + c.bob) * 0.12 : 1.35, c.heading, 0, "YXZ");
    crowdMatrix.scale.setScalar(c.scale);
    crowdMatrix.updateMatrix();
    crowdBodies.setMatrixAt(n, crowdMatrix.matrix); crowdHeads.setMatrixAt(n, crowdMatrix.matrix);
    crowdBodies.setColorAt(n, c.shirt); crowdHeads.setColorAt(n, c.skin);
    n++;
  }
  crowdDrawn = n;
  crowdBodies.count = crowdHeads.count = n;
  crowdBodies.instanceMatrix.needsUpdate = crowdHeads.instanceMatrix.needsUpdate = true;
  if (n) crowdBodies.instanceColor.needsUpdate = crowdHeads.instanceColor.needsUpdate = true;
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
  const pr = hallProject(st.x, st.z);
  st.h = pr.h; st.t = pr.t;
  st.to = Math.random() < 0.5 ? HALLS[pr.h].a : HALLS[pr.h].b;
  if (st.route) { const i = st.route.indexOf(st.to); if (i >= 0) st.ri = i; }
}

function canSeePlayer(st, rangeMult, needCone) {
  if (player.hidden || st.stunT > 0) return { seen: false, d: Infinity };
  const T = st.type, dx = player.x - st.x, dz = player.z - st.z, d = Math.hypot(dx, dz);
  if (player.invisT > 0) return { seen: false, d };   // just served a strike: a moment to get away
  if (d > T.visionRange * staffMult("vision") * rangeMult) return { seen: false, d };
  if (needCone && Math.abs(angDiff(st.facing, Math.atan2(dx, dz))) > (T.visionHalfAngleDeg * Math.PI) / 180) return { seen: false, d };
  return { seen: lineOfSight(st.x, st.z, player.x, player.z), d };
}
// suspicion builds faster up close, slower in a crowd and during passing periods
function noticeRate(st, d, cover) {
  const D = CFG.detection, T = st.type;
  const closeness = Math.max(0, 1 - d / (T.visionRange * staffMult("vision")));
  let rate = D.suspicionRate * T.notice * staffMult("notice") * (D.farRateFrac + (1 - D.farRateFrac) * closeness);
  rate /= 1 + cover * CFG.crowd.coverPerStudent;
  if (player.sprinting) rate *= CFG.sprint.noticeMult;   // a running kid stands out
  if (game.phase === "passing") rate /= D.passingBeatMult;
  return rate;
}

function patrolChooser(st) {
  if (!st.route) return randomOnward;
  return (w, node) => {
    const R = st.route;
    if (node === R[st.ri]) st.ri = mod(st.ri + st.rstep, R.length);
    const target = R[st.ri];
    return target === node ? randomOnward(w, node) : NEXT[node][target];
  };
}

function updateStaff(dt, cover) {
  const D = CFG.detection;
  for (const st of staff) {
    const T = st.type;
    st.sweep += dt * T.sweepRate;
    let speed = 0;
    st.distractT = Math.max(0, st.distractT - dt);
    if (st.stunT > 0) {   // slipped on a banana peel (flat on the floor), or hit by something (staggering)
      st.stunT -= dt;
      st.mesh.rotation.z = st.stunT <= 0 ? 0 : st.stunStyle === "flinch" ? Math.sin(game.time * 16) * 0.28 : 1.3;
      st.mesh.position.set(st.x, 0, st.z);
      st.cone.visible = st.stunT <= 0;
      continue;
    }
    if (st.pauseT > 0) {   // "I saw you go in there." — a beat before chasing
      st.pauseT -= dt;
      st.facing = lerpAngle(st.facing, Math.atan2(player.x - st.x, player.z - st.z), damp(8, dt));
      st.mesh.position.set(st.x, 0, st.z); st.mesh.rotation.y = st.facing;
      updateCone(st);
      continue;
    }

    const stuck = st.stuckT > 0, snap = stuck ? [st.x, st.z, st.h, st.t, st.to, st.ri] : null;   // in slime: can look and yell, can't move
    if (stuck) st.stuckT -= dt;
    if (st.state === "post") {
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
        toast("Teacher: \"HEY! Where's your hall pass?!\"", 2.2);
        bark(st, "alarm", true);
        callBackup(st, false);
      }
      const base = st.post ? Math.atan2(-st.post.side * HALLS[st.post.h].nx, -st.post.side * HALLS[st.post.h].nz) : st.facing;
      const want = st.suspicion > 0.05 ? Math.atan2(player.x - st.x, player.z - st.z) : st.distractT > 0 ? Math.atan2(st.dX - st.x, st.dZ - st.z) : base + Math.sin(st.sweep) * (T.sweepDeg * Math.PI / 180);
      st.facing = lerpAngle(st.facing, want, damp(st.suspicion > 0.05 ? 5 : 2, dt));
    } else if (st.state === "patrol" || st.state === "return" || st.state === "tidy") {
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
        if (st.tidyScanT <= 0 && st.suspicion < 0.05) { st.tidyScanT = 0.4; const o = findTidy(st); if (o) setTidy(st, o); }
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
    } else if (st.state === "bust") {
      // they saw you duck into a hiding spot: go yank you out
      speed = chaseSpeed(st, dt);
      const sp = st.bustSpot, f = spotFront(sp, {});
      if (!player.hidden && canSeePlayer(st, D.chaseSightRangeMult, false).seen) startChase(st);
      else if (navToward(st, f.x, f.z, speed, dt) < 0.75) {
        if (player.hidden === sp) {
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
    // the squint: suspicious staff narrow their eyes and lean in
    const squint = st.suspicion > 0.05 && !isAlarmed(st);
    st.mesh.userData.eyes.scale.y = squint ? 0.3 : 1; st.mesh.rotation.x = squint ? 0.12 : 0;
    if (squint && !st.wasSus) bark(st, "suspicious");
    st.wasSus = squint;
    updateCone(st);
  }
}
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
  const others = staff.filter((o) => o !== caller && !o.type.stationary && o.state !== "chase" && o.state !== "bust")
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
  if (st.state !== "chase") { playBlip([520, 780], 0.1, "square", 0.08); addHeat(CFG.heat.seenRunning); bark(st, "chase"); }   // "Hey!"
  st.state = "chase"; st.suspicion = 1;
  st.lastX = player.x; st.lastZ = player.z;
}

const CONE_COLORS = { patrol: new THREE.Color(0xfff2a8), suspicious: new THREE.Color(0xffa94d), chase: new THREE.Color(0xff4d4d) };
const isAlarmed = (st) => st.state === "chase" || st.state === "search" || st.state === "bust" ||
  (st.state === "post" && st.alarmT > st.type.alarmCooldownSec - 3);
function updateCone(st) {
  const T = st.type, RAYS = CFG.render.coneRays, half = (T.visionHalfAngleDeg * Math.PI) / 180;
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
function updateMarkers() {
  const w = window.innerWidth, h = window.innerHeight;
  for (const st of staff) {
    const chasing = isAlarmed(st);
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
  const v = Math.round(player.stamina * 50) / 50;
  if (v === lastStam) return;
  lastStam = v;
  $("staminaMeter").hidden = v >= 1; $("staminaFill").style.width = v * 100 + "%";
  $("staminaMeter").classList.toggle("out", player.winded);
}
let lastHud = "";
function updateHud() {
  const left = Math.max(0, Math.ceil(phaseLen() - game.phaseT));
  const label = `DAY ${game.day} · PERIOD ${game.period} · ${game.phase === "passing" ? "PASSING" : "SKIPPING"}`;
  const label2 = game.survival ? label.replace(/ · (PASSING|SKIPPING)$/, " · SURVIVAL") : label;
  const multTxt = [streakMult() > 1 ? `STREAK ×${streakMult()}` : "", game.nearMissT > 0 ? "NEAR MISS ×2" : "", game.survival ? `SURVIVAL ×${CFG.survival.scoreMult}` : ""].filter(Boolean).join(" · ");
  const key = multTxt + game.passShield + label2 + left + Math.floor(game.score) + "|" + game.lockerUses + "|" + game.strikes + game.highAlert + "|" + Math.round(game.heat) + "|" + Math.round(game.security);
  if (key === lastHud) return;
  lastHud = key;
  ui.label.textContent = label2;
  $("heatFill").style.width = game.heat + "%"; $("secFill").style.width = game.security + "%";
  $("heatMeter").classList.toggle("hot", game.heat >= CFG.heat.passingCatchAt);
  ui.timer.textContent = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}`;
  ui.phase.className = game.phase + (game.survival ? " survival" : "");
  ui.score.textContent = Math.floor(game.score);
  ui.uses.textContent = `LOCKERS ×${game.lockerUses}`;
  ui.uses.classList.toggle("out", game.lockerUses === 0);
  $("mult").textContent = multTxt;
  $("passIcon").hidden = !game.passShield;
  $("strikes").innerHTML = strikeDotsHtml() + (game.highAlert ? `<b>HIGH ALERT</b>` : "");
}

function update(dt) {
  game.time += dt; game.phaseT += dt;
  if (game.phase === "passing" && game.phaseT >= phaseLen("passing")) startSkipping();
  else if (game.phase === "skipping") {
    const pts = (CFG.pointsPerPeriod / phaseLen("skipping")) * dt * scoreMult() * streakMult();
    game.score += pts; game.periodScore += pts;
    if (game.phaseT >= phaseLen("skipping")) { periodSurvived(); if (game.state !== "playing") return; }
  }
  updatePlayer(dt);
  updateRestrooms();
  updateCrowd(dt);
  updateStaff(dt, crowdCoverCount());
  if (game.state === "playing") { updateObjects(dt); updateHeat(dt); updateRisk(dt); updateFriends(dt); updateAirplanes(dt); updateAlarm(dt); }
}

// =====================================================================================
// Hiding: entering, staying, getting booted
// =====================================================================================
const roomLocked = (sp) => sp.kind === "classroom" && game.period <= sp.lockedUntil;
const hasKey = () => game.hotbar.some((it) => it && it.key === "masterKey");
// the master key opens doors that are locked or already used (not a teacher standing in the doorway)
function keyOpens(sp) {
  if (game.alarmT > 0 || sp.closed) return false;   // not during a fire alarm, and not a flooded bathroom
  if (sp.kind === "classroom") return (roomLocked(sp) || sp.used) && !staff.some((s) => s.post === sp);
  return sp.kind === "restroom" && sp.used;
}
function spotBlocked(sp) {   // why this spot can't be used right now ("" if it can)
  if (sp.kind === "locker") return game.lockerUses > 0 ? "" : "No locker uses left this period";
  if (sp.kind === "classroom" && game.alarmT > 0) return "Fire alarm! Every classroom is locked";
  if (sp.closed) return "Out of order (somebody flooded it)";
  if (roomLocked(sp)) return `Room ${sp.room} is locked (you raided it)`;
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
  const why = spotBlocked(sp);
  if (why && keyOpens(sp) && hasKey()) {   // the master key
    const i = game.hotbar.findIndex((it) => it && it.key === "masterKey");
    consumeSlot(i); toast("🔑 The master key works.");
    playBlip([1200, 900], 0.05, "square", 0.05);
  } else if (why) { toast(why); playBlip([180], 0.08, "square", 0.04); return false; }
  if (sp.kind === "locker") game.lockerUses--; else sp.used = true;
  const f = spotFront(sp, {});
  player.hidden = sp; player.hideT = 0; player.hideArmed = false; player.pushT = 0; player.pushSpot = null;
  player.x = f.x; player.z = f.z; player.vx = player.vz = 0;
  player.mesh.visible = false;
  stick.x = stick.y = 0;
  // Did anyone see you go in?
  for (const st of staff) {
    if (st.type.stationary) continue;
    const d = Math.hypot(st.x - f.x, st.z - f.z);
    if (!lineOfSight(st.x, st.z, f.x, f.z)) continue;
    if ((st.state === "chase" || st.state === "search") && d < st.type.visionRange * CFG.detection.chaseSightRangeMult) {
      st.state = "bust"; st.bustSpot = sp;
    } else if ((st.state === "patrol" || st.state === "return" || st.state === "tidy") && st.suspicion > 0.5 && d < st.type.visionRange) {
      st.state = "search"; st.searchT = 0; st.lastX = st.tx = f.x; st.lastZ = st.tz = f.z;   // "...was that a kid?"
    }
  }
  playBlip([260, 200], 0.07, "triangle", 0.07);
  ui.hide.hidden = false;
  updateHidePanel();
  return true;
}

function exitSpot(booted, msg = "") {
  const sp = player.hidden;
  if (!sp) return;
  player.hidden = null; player.mesh.visible = true; player.pushT = 0;
  const f = hallPos(sp.h, sp.t, sp.frontLat - sp.side * 0.1);
  player.x = f.x; player.z = f.z;
  const H = HALLS[sp.h];
  player.heading = Math.atan2(-sp.side * H.nx, -sp.side * H.nz);   // facing out into the hall
  ui.hide.hidden = true;
  if (booted) {
    player.graceT = CFG.hiding.bootGraceSec;
    banner(`BOOTED!<small>${msg}</small>`, 2.6);
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

function hideLimit(sp) { return sp.kind === "classroom" ? TEACHER_TYPES[sp.teacher].bootSec : sp.T.maxStaySec; }
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
    const sweepIn = sp.nextSweep - game.time;
    if (sweepIn < left) warn = `Sweep in ${Math.ceil(sweepIn)}s!`;
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
  const key = sp.kind === "classroom" ? `${sp.room}:${sp.lootVer}:${sp.loot.length}:${[...sp.taken]}:${game.passShield}` : `${sp.kind}${sp.h}:${sp.t}:${!!sp.rummaged}:${!!sp.tpTaken}`;
  if (lootEl.dataset.key === key) return;
  lootEl.dataset.key = key; lootEl.innerHTML = "";
  if (sp.kind === "restroom") {   // the bathroom flood: big points and heat, and it's closed for the rest of the day
    const b = document.createElement("button"); b.type = "button"; b.className = "prize";
    b.innerHTML = `🚽 Flood the toilets<small>+${CFG.flood.points} · lots of heat</small>`;
    b.addEventListener("click", floodRestroom);
    if (!sp.tpTaken) {
      const t = document.createElement("button"); t.type = "button";
      t.innerHTML = `🧻 Grab a roll<small>-1s</small>`;
      t.addEventListener("click", grabRoll);
      lootEl.appendChild(t);
    }
    lootEl.appendChild(b);
    return;
  }
  if (sp.kind === "locker") {   // a blind grab: could be good, could be junk
    if (sp.rummaged) { lootEl.innerHTML = `<span class="none">You already went through this one.</span>`; return; }
    const b = document.createElement("button"); b.type = "button";
    b.innerHTML = `🎒 Rummage around<small>-${CFG.lockers.rummageSec}s · might be junk</small>`;
    b.addEventListener("click", rummageLocker);
    lootEl.appendChild(b);
    return;
  }
  if (sp.kind !== "classroom") return;
  const grab = TEACHER_TYPES[sp.teacher].grabSec ?? CFG.rooms.grabSec;
  sp.loot.forEach((k, i) => {
    const b = document.createElement("button"); b.type = "button";
    b.innerHTML = `${ITEM_TYPES[k].icon} ${ITEM_TYPES[k].label}<small>-${grab}s</small>`;
    b.addEventListener("click", () => grabLoot(i));
    lootEl.appendChild(b);
  });
  for (const [id, X] of Object.entries(sp.R.specials ?? {})) {   // once-per-day specials (the principal's office)
    if (sp.taken.has(id)) continue;
    const b = document.createElement("button"); b.type = "button"; b.className = "prize";
    const note = id === "prize" ? `+${X.points} · ` : id === "fakePass" && game.passShield ? "you have one · " : "";
    b.innerHTML = `${X.icon} ${X.label}<small>${note}-${grab}s</small>`;
    b.addEventListener("click", () => grabLoot(id));
    lootEl.appendChild(b);
  }
  if (!lootEl.children.length) lootEl.innerHTML = `<span class="none">Nothing left on the desks.</span>`;
}
function grabLoot(i) {
  const sp = player.hidden;
  if (!sp || sp.kind !== "classroom" || game.state !== "playing") return;
  const TT = TEACHER_TYPES[sp.teacher];
  if (typeof i === "string") {   // a special
    if (sp.taken.has(i)) return;
    if (i === "prize") havoc("rarePrize", sp.R.specials.prize.points, "Confiscated stash!", { x: player.x, z: player.z });
    else if (i === "fakePass") {
      if (game.passShield) { toast("You already have a fake pass."); return; }
      game.passShield = true; popup("🎫 Fake pass! Your next catch doesn't count.", "item"); playBlip([523, 659, 784], 0.08, "triangle", 0.06);
    } else if (i === "masterKey") {   // already have one: it's topped back up instead of taking a second slot
      const k = game.hotbar.find((it) => it && it.key === "masterKey");
      if (k) { k.uses = ITEM_TYPES.masterKey.uses; renderHotbar(); popup("🔑 Master key (topped up)", "item"); }
      else if (!addItem("masterKey")) return;
    }
    sp.taken.add(i);
  } else {
    if (!addItem(sp.loot[i])) return;   // inventory full: nothing happens
    sp.loot.splice(i, 1);
  }
  sp.raided = true;   // locked for a while from the next bell
  player.hideT += TT.grabSec ?? CFG.rooms.grabSec;
  if (Math.random() < TT.backfire) roomBackfire(sp);
  updateHidePanel();
}
function grabRoll() {
  const sp = player.hidden;
  if (!sp || sp.kind !== "restroom" || sp.tpTaken || game.state !== "playing") return;
  if (!addItem("toiletPaper")) return;
  sp.tpTaken = true; player.hideT += 1;
  updateHidePanel();
}
function rummageLocker() {
  const sp = player.hidden;
  if (!sp || sp.kind !== "locker" || sp.rummaged || game.state !== "playing") return;
  const key = pickWeighted(CFG.lockers.loot);
  if (!addItem(key)) return;   // inventory full: nothing happens
  sp.rummaged = true;
  player.hideT += CFG.lockers.rummageSec;
  if (ITEM_TYPES[key].kind === "junk") toast(`${ITEM_TYPES[key].icon} Junk. Great. (Select it to toss it.)`);
  updateHidePanel();
}
// The teacher spots you rummaging and calls security: the nearest guard (or anyone free) heads for the door.
function roomBackfire(sp) {
  toast(`${TT_NAME(sp)} picks up the phone: "Security to room ${sp.room}."`, 2.6);
  playBlip([880, 0, 880], 0.12, "sine", 0.05);
  const f = spotFront(sp, {});
  const free = staff.filter((s) => !s.type.stationary && s.state !== "chase" && s.state !== "bust")
    .sort((a, b) => (b.key === "securityGuard") - (a.key === "securityGuard") || Math.hypot(a.x - f.x, a.z - f.z) - Math.hypot(b.x - f.x, b.z - f.z));
  const st = free[0];
  if (st) { const d = Math.hypot(st.x - f.x, st.z - f.z); st.state = "search"; st.searchT = -Math.min(16, d / (st.type.chaseSpeed * 0.8)); st.lastX = st.tx = f.x; st.lastZ = st.tz = f.z; }
  onRoomBackfire(sp);
}
const TT_NAME = (sp) => (sp.teacher === "office" ? "The secretary" : sp.teacher === "sub" ? "The sub" : "The teacher");
function onRoomBackfire(sp) { addHeat(CFG.heat.roomCall); }   // short-term heat only; the security level is for loud havoc

function updateRestrooms() {
  for (const sp of SPOTS) {
    if (sp.kind !== "restroom" || game.time < sp.nextSweep) continue;
    const J = CFG.hiding.restroomSweepJitterSec;
    sp.nextSweep = game.time + CFG.hiding.restroomSweepEverySec + rand(-J, J);
    if (player.hidden !== sp) continue;
    exitSpot(true, "Restroom sweep! A monitor shoos everyone out.");
    pa("sweep");
    // the nearest monitor who isn't busy comes to see who that was
    const f = spotFront(sp, {});
    let best = null, bd = Infinity;
    for (const st of staff) { const d = Math.hypot(st.x - f.x, st.z - f.z); if (!st.type.stationary && st.state !== "chase" && st.state !== "bust" && d < bd) { bd = d; best = st; } }
    if (best) { best.state = "search"; best.searchT = -Math.min(16, bd / (best.type.chaseSpeed * 0.8)); best.lastX = best.tx = f.x; best.lastZ = best.tz = f.z; }
  }
}

// Tap on a world object: find the spot whose on-screen outline (a vertical line from floor to door top) is nearest the finger.
const projA = new THREE.Vector3(), projB = new THREE.Vector3();
function handleTap(x, y) {
  if (player.hidden) return;
  if (tryTapPickup(x, y)) return;
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
  let best = null, bd = CFG.interact.tapRadiusPx;
  for (const sp of SPOTS) {
    if (spotDist(sp) > CFG.interact.range) continue;
    const p = hallPos(sp.h, sp.t, sp.wallLat, tmp);
    projA.set(p.x, 0.1, p.z).applyMatrix4(camera.matrixWorldInverse);
    if (projA.z > -0.2) continue;   // behind the camera
    projA.set(p.x, 0.1, p.z).project(camera); projB.set(p.x, 2.2, p.z).project(camera);
    const ax = (projA.x + 1) / 2 * w, ay = (1 - projA.y) / 2 * h, bx = (projB.x + 1) / 2 * w, by = (1 - projB.y) / 2 * h;
    const vx = bx - ax, vy = by - ay, t = clamp(((x - ax) * vx + (y - ay) * vy) / (vx * vx + vy * vy || 1), 0, 1);
    const d = Math.hypot(x - (ax + vx * t), y - (ay + vy * t));
    if (d < bd) { bd = d; best = sp; }
  }
  if (best) enterSpot(best);
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
    const reach = d < CFG.interact.range && !blocked;
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
    if (sp.kind === "locker") text = blocked ? "Locker · none left" : "Locker";
    else if (sp.kind === "restroom") text = sp.closed ? "Restroom · out of order" : blocked ? "Restroom · used" : `Restroom · sweep in ${Math.max(0, Math.ceil(sp.nextSweep - game.time))}s`;
    else { text = `Room ${sp.room}${sp.R.label ? " · " + sp.R.label : ""} · ${TEACHER_TYPES[sp.teacher].label}${blocked ? (game.alarmT > 0 ? " · locked (fire alarm)" : roomLocked(sp) ? " · locked" : sp.used ? " · used" : " · guarded") : ""}`; if (sp.teacher === "sub") cls += " sub"; }
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
function makeItemMesh(key) {
  const g = new THREE.Group();
  const m = (geo, color) => { const mesh = new THREE.Mesh(geo, lambert(color)); g.add(mesh); return mesh; };
  switch (key) {
    case "paperAirplane": { const a = m(new THREE.ConeGeometry(0.16, 0.5, 3), 0xffffff); a.rotation.x = Math.PI / 2; a.scale.set(1.6, 1, 0.25); break; }
    case "spitball": m(new THREE.IcosahedronGeometry(0.07, 0), 0xf4f4f4); break;
    case "toiletPaper": { const r = m(new THREE.CylinderGeometry(0.1, 0.1, 0.18, 10), 0xf6f6f0); r.rotation.z = Math.PI / 2; break; }
    case "frisbee": m(new THREE.CylinderGeometry(0.2, 0.17, 0.04, 14), 0xff5a36); break;
    case "slime": { const b = m(new THREE.IcosahedronGeometry(0.13, 1), 0x7ee84a); b.material.emissive.setHex(0x1d4a0c); g.userData.blob = b; break; }
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
    case "stinkBomb": {
      m(new THREE.CylinderGeometry(0.07, 0.09, 0.22, 7), 0x8fd14f);
      const cap = m(new THREE.CylinderGeometry(0.05, 0.05, 0.06, 7), 0x5b3a8c); cap.position.y = 0.14;
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
function removeObject(o) { if (o.trailMesh) { scene.remove(o.trailMesh); o.trailMesh.geometry.dispose(); o.trailMesh = null; } scene.remove(o.mesh); scene.remove(o.ring); if (o.cloud) { scene.remove(o.cloud); o.cloud.material.dispose(); } o.dead = true; }
function clearObjects() { for (const o of objects) removeObject(o); objects.length = 0; }

function pickWeighted(pairs) {
  let r = Math.random() * pairs.reduce((a, [, w]) => a + w, 0);
  for (const [k, w] of pairs) if ((r -= w) <= 0) return k;
  return pairs[0][0];
}
// What can turn up "found" (fire alarm spill, gum trades): the locker table without the junk.
const goodLoot = () => CFG.lockers.loot.filter(([k]) => ITEM_TYPES[k].kind !== "junk");
// Things lying around stay until staff tidy them up. If the halls fill up anyway, the oldest get swept away.
const isLying = (o) => !o.dead && (o.state === "pickup" || o.state === "resting" || o.state === "trap");
function capLying() {
  const lying = objects.filter(isLying);
  for (let i = 0; i < lying.length - CFG.items.maxLying; i++) removeObject(lying[i]);
}

// ---- hotbar ----
const hotbarEl = $("hotbar");
for (let i = 0; i < CFG.items.slots; i++) {
  const b = document.createElement("button"); b.className = "slot empty"; b.type = "button"; b.dataset.key = i + 1;
  b.addEventListener("pointerdown", (e) => { e.preventDefault(); e.stopPropagation(); selectSlot(i); });
  hotbarEl.appendChild(b);
}
function renderHotbar() {
  [...hotbarEl.children].forEach((b, i) => {
    const it = game.hotbar[i];
    b.innerHTML = it ? `${ITEM_TYPES[it.key].icon}${it.uses > 1 ? `<small>${it.uses}</small>` : ""}` : "";
    b.classList.toggle("empty", !it); b.classList.toggle("active", game.aim?.slot === i);
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
  if (T.kind === "key") { toast(`Master key: walk into a locked door to open it (${it.uses} use${it.uses === 1 ? "" : "s"} left)`, 2.4); return; }
  if (T.kind === "junk") {   // toss it: it lands at your feet, and staff will tidy it up
    consumeSlot(i); toast(T.line);
    spawnObject(it.key, "resting", player.x + Math.sin(player.heading) * 0.6, 0.04, player.z + Math.cos(player.heading) * 0.6);
    capLying(); playBlip([300, 200], 0.06, "triangle", 0.04); return;
  }
  if (T.kind === "instant") { consumeSlot(i); toast(T.line); havoc(it.key, T.points, T.label, { x: player.x, z: player.z }); return; }
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
  const sp = T.speed[0] + (T.speed[1] - T.speed[0]) * L.power, p = (T.pitchDeg * Math.PI) / 180;
  return { vx: L.dx * Math.cos(p) * sp, vy: Math.sin(p) * sp, vz: L.dz * Math.cos(p) * sp };
}
const THROW_Y = 1.3;
function release(a, L = flickLaunch(a)) {
  const T = ITEM_TYPES[a.key];
  player.heading = Math.atan2(L.dx, L.dz);
  consumeSlot(a.slot);
  cancelAim();
  if (T.kind === "ride") { startRide(L); return; }
  const o = spawnObject(a.key, "flying", player.x + L.dx * 0.45, THROW_Y, player.z + L.dz * 0.45, launchVel(T, L));
  if (T.bounces) o.maxBounces = Math.floor(rand(T.bounces[0], T.bounces[1] + 1));
  if (T.flight === "glide2") initPlane(o, L.power, T);
  if (a.key === "toiletPaper") o.trail = [[o.x, o.y, o.z]];
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
  if (T.kind === "ride") { sim.vx = L.dx * T.rideSpeed; sim.vz = L.dz * T.rideSpeed; } else Object.assign(sim, launchVel(T, L));
  const plane = T.flight === "glide2";
  if (plane) initPlane(sim, L.power, T);
  const every = plane ? 6 : 4;   // the plane flies farther, so space its dots out more
  let i = 0, stopped = false;
  for (let k = 0; k < 200 && i < ARC_N; k++) {
    if (!stopped) {
      if (plane) planeStep(sim, step, T);
      else if (T.kind !== "ride") { sim.vy -= T.gravity * step; if (T.glide) sim.vy = Math.max(sim.vy, -0.9); }
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
    else if (o.state === "trap") (o.key === "slime" ? slimeCheck : trapCheck)(o);
    else if (o.state === "resting" && o.key === "whoopee") stepOnCushion(o);
    else if (o.state === "cloud") stinkCloud(o, dt);
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
  st.stunT = Math.max(st.stunT, sec); st.stunStyle = style;
  if (st.state === "chase" || st.state === "bust") { st.state = "search"; st.searchT = 0; st.lastX = st.tx = player.x; st.lastZ = st.tz = player.z; }
}
// ---- staff tidying up: they walk over to things lying around and pick them up ----
function claimedBy(o) { return staff.find((s) => s.state === "tidy" && s.tidyObj === o) ?? null; }
function setTidy(st, o, wait = 0) { if (st.type.stationary) return; st.state = "tidy"; st.tidyObj = o; st.tidyT = -wait; }
// what staff notice: anything lying around, except traps nobody has set off yet
function tidyable(o) {
  if (o.dead || o.wild) return false;
  if (o.state === "trap") return o.slips > 0;
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
  if (isStaff) {
    stunStaff(who, Hh.staffSec, Hh.style);
    // a stagger leaves them looking your way; a fall gives you time to get away
    if (Hh.style === "flinch") { who.suspicion = Math.max(who.suspicion, 0.6); who.distractT = 1.5; who.dX = player.x; who.dZ = player.z; }
    bark(who, "slip", true);
    playBlip([700, 300], 0.1, "sawtooth", 0.07);
    havoc(o.key + "Staff", Hh.staff, `${o.T.label} hits the ${who.type.name}!`, { x: o.x, z: o.z, loud: Hh.style === "fall" });
  } else {
    who.slipT = Math.max(who.slipT, Hh.studentSec); who.stunStyle = Hh.style;
    havoc(o.key + "Student", Hh.student, o.key === "spitball" ? "Spitball! Ew!" : `${o.T.label} hits a kid!`, { x: o.x, z: o.z });
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
  if (o.stage === 1) o.vy = (T.cruiseY - o.y) * 4;
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
  if (o.trail) growTrail(o);
  if (o.key === "frisbee") o.mesh.rotation.y += dt * 14;   // spinning
  if (o.key === "slime") {   // splat on whoever it hits: they're standing in it
    const p = personHit(o, 0.45, 2.0);
    if (p) { o.x = p.who.x; o.z = p.who.z; o.y = REST_Y.slime; landObject(o); return; }
  }
  if (o.key === "spitball") {
    const p = personHit(o, 0.45, 2.1);
    if (p) { hitPerson(o, p.who, p.isStaff); removeObject(o); return; }
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
      if (o.wild) { o.state = "spent"; o.life = 1.5; break; }
      if (n) havoc(o.key, n * T.perStudent + (crowdLand ? T.crowdLandBonus : 0), `${name} over ${n} kid${n === 1 ? "" : "s"}${crowdLand ? " · crowd landing!" : ""}`, { x: o.x, z: o.z });
      else if (!o.hitSet?.size && !o.trail) popup(`The ${T.label.toLowerCase()} lands. Nobody notices.`, "meh");
      if (o.trail) finishTrail(o);
      if (o.key === "frisbee") { o.state = "resting"; o.mesh.rotation.set(0, o.mesh.rotation.y, 0); break; }   // pick it back up
      o.state = "spent"; o.life = o.trail ? 0.6 : 1.5; break;
    }
    case "slime": o.state = "trap"; o.mesh.userData.blob.scale.set(4.2, 0.22, 4.2); break;   // a puddle
    case "spitball": o.state = "spent"; o.life = 0.4; break;
    case "bananaPeel": o.state = "trap"; o.mesh.rotation.y = Math.random() * 6; break;
    case "whoopee": o.state = "resting"; o.armedAt = o.age + 0.4; break;   // waits for someone to step on it
    case "basketball": case "football": o.state = "rolling"; break;
    case "stinkBomb": popStinkBomb(o); break;
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
  if (who?.type) { bark(who, "slip", true); setTidy(who, o, CFG.tidy.afterTrapSec); }   // they pick it up (it can't go off again)
  makeNoise(o.x, o.z, o.T.noiseRadius, true, who?.type ? who : null);
}
// Goes off when anyone steps on it: staff, a student, or you (then the staff come to see who it was).
function stepOnCushion(o) {
  if (o.age < (o.armedAt ?? 1) || o.noiseCD > 0 || claimedBy(o)) return;   // (not while someone's coming to pick it up)
  const on = (x, z, r) => Math.hypot(x - o.x, z - o.z) < r;
  const st = staff.find((s) => on(s.x, s.z, 0.55));
  if (st) { cushionNoise(o, st); return; }
  if (crowd.some((c) => isActive(c) && on(c.x, c.z, 0.5))) { cushionNoise(o, null); return; }
  if (!player.hidden && on(player.x, player.z, 0.45)) cushionNoise(o, "player");
}
// A noise: staff nearby either come to investigate (pull) or just turn and look.
function makeNoise(x, z, radius, pull, except = null) {
  for (const st of staff) {
    const d = Math.hypot(st.x - x, st.z - z);
    if (st === except || d > radius || st.state === "chase" || st.state === "bust" || st.stunT > 0) continue;
    if (pull && !st.type.stationary) {
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
    if (st.type.stationary || st.stunT > 0 || o.hitSet.has(st) || Math.hypot(st.x - o.x, st.z - o.z) > 0.55) continue;
    stunStaff(st, T.slipStaffSec, "fall"); bark(st, "slip", true);
    playBlip([700, 300], 0.12, "sawtooth", 0.07);
    havoc("bananaStaff", T.staffPoints, `Wipeout! The ${st.type.name} slips`, { x: o.x, z: o.z, loud: true });
    if (slipped(st)) return;
    if (!claimedBy(o)) setTidy(st, o, CFG.tidy.afterTrapSec);
  }
  for (const c of crowd) {
    if (!isActive(c) || c.slipT > 0 || o.hitSet.has(c) || Math.hypot(c.x - o.x, c.z - o.z) > 0.45) continue;
    c.slipT = T.slipStudentSec; c.stunStyle = "fall";
    havoc("bananaStudent", T.studentPoints, "A kid slips!", { x: o.x, z: o.z });
    if (slipped(c)) return;
  }
  if (o.age > 1.2 && !player.hidden && !player.ride && player.slipT <= 0 && !o.hitSet.has(player) && Math.hypot(player.x - o.x, player.z - o.z) < 0.45) {
    player.slipT = T.slipPlayerSec; toast("You slipped on your own banana peel!");
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
    if (st.type.stationary || o.hitSet.has(st) || !near(st.x, st.z)) continue;
    st.stuckT = T.stickStaffSec;
    st.bubble.textContent = pick(["I'm STUCK!", "Is this... SLIME?!", "Ugh, my shoes!"]); st.barkUntil = performance.now() + 1800; st.barkAt = game.time;
    playBlip([220, 160, 240], 0.1, "sine", 0.08);   // squelch
    havoc("slimeStaff", T.staffPoints, `Slimed! The ${st.type.name} is stuck`, { x: o.x, z: o.z, loud: true });
    if (!claimedBy(o)) setTidy(st, o, CFG.tidy.afterTrapSec);   // they clean it up once they're free
    stuck(st);
    if (o.slips >= T.maxSticks) return;
  }
  for (const c of crowd) {
    if (!isActive(c) || o.hitSet.has(c) || !near(c.x, c.z)) continue;
    c.slipT = T.stickStudentSec; c.stunStyle = "stuck";
    havoc("slimeStudent", T.studentPoints, "A kid's stuck in the slime!", { x: o.x, z: o.z });
    stuck(c);
    if (o.slips >= T.maxSticks) return;
  }
  if (o.age > 1.2 && !player.hidden && !player.ride && player.stuckT <= 0 && !o.hitSet.has(player) && near(player.x, player.z)) {
    player.stuckT = T.stickPlayerSec; toast("Ew! You stepped in your own slime.");
    stuck(player);
  }
}
// toilet paper: a streamer along its flight path, hanging down in loops. Stays until the custodian clears it overnight.
const tpTrails = [];
const tpMat = new THREE.MeshBasicMaterial({ color: 0xf4f4ee, side: THREE.DoubleSide });
function trailGeometry(pts) {
  const pos = [];
  for (let i = 1; i < pts.length; i++) {   // a ribbon, sagging between points
    const [ax, ay, az] = pts[i - 1], [bx, by, bz] = pts[i];
    const sagA = 0.25 * Math.abs(Math.sin(i * 0.9)), sagB = 0.25 * Math.abs(Math.sin((i + 1) * 0.9));
    const a0 = [ax, ay - sagA, az], a1 = [ax, ay - sagA - 0.16, az], b0 = [bx, by - sagB, bz], b1 = [bx, by - sagB - 0.16, bz];
    pos.push(...a0, ...a1, ...b0, ...b0, ...a1, ...b1);   // an upright strip (seen from the side)...
    const dx = bx - ax, dz = bz - az, dl = Math.hypot(dx, dz) || 1, px = -dz / dl * 0.09, pz = dx / dl * 0.09;
    const c0 = [ax - px, ay - sagA, az - pz], c1 = [ax + px, ay - sagA, az + pz], d0 = [bx - px, by - sagB, bz - pz], d1 = [bx + px, by - sagB, bz + pz];
    pos.push(...c0, ...c1, ...d0, ...d0, ...c1, ...d1);   // ...and a flat one crossing it (seen from behind or below)
    if (i % 4 === 0) {   // a loose end hanging toward the floor, crossed so it shows from any angle
      const len = Math.min(by - 0.3, 1.2), w = 0.06;
      pos.push(bx - w, by, bz, bx + w, by, bz, bx - w, by - len, bz, bx - w, by - len, bz, bx + w, by, bz, bx + w, by - len, bz);
      pos.push(bx, by, bz - w, bx, by, bz + w, bx, by - len, bz - w, bx, by - len, bz - w, bx, by, bz + w, bx, by - len, bz + w);
    }
  }
  return new THREE.BufferGeometry().setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
}
function growTrail(o) {
  const last = o.trail[o.trail.length - 1];
  if (Math.hypot(o.x - last[0], o.z - last[2]) < 0.35) return;
  o.trail.push([o.x, o.y, o.z]);
  if (o.trailMesh) { scene.remove(o.trailMesh); o.trailMesh.geometry.dispose(); }
  o.trailMesh = new THREE.Mesh(trailGeometry(o.trail), tpMat); scene.add(o.trailMesh);
}
function finishTrail(o) {
  let len = 0;
  for (let i = 1; i < o.trail.length; i++) len += Math.hypot(o.trail[i][0] - o.trail[i - 1][0], o.trail[i][2] - o.trail[i - 1][2]);
  if (o.trailMesh) { tpTrails.push(o.trailMesh); o.trailMesh = null; }
  while (tpTrails.length > 8) { const m = tpTrails.shift(); scene.remove(m); m.geometry.dispose(); }
  if (len >= 2) havoc("tpTrail", Math.round(len * o.T.trailPointsPerM), `TP'd ${Math.round(len)} m of hallway!`, { x: o.x, z: o.z });
  o.trailLen = len;
  o.trail = null;
}
function clearTrails() { for (const m of tpTrails) { scene.remove(m); m.geometry.dispose(); } tpTrails.length = 0; }

// ---- the stink bomb: pops on landing (noise pulls staff over), then a cloud that pays for everyone who walks through ----
const cloudGeo = new THREE.IcosahedronGeometry(1, 1);
function popStinkBomb(o) {
  const T = o.T;
  o.state = "cloud"; o.life = T.cloudSec; o.mesh.visible = false;
  o.cloud = new THREE.Mesh(cloudGeo, new THREE.MeshBasicMaterial({ color: 0x9bd44a, transparent: true, opacity: 0.32, depthWrite: false }));
  o.cloud.position.set(o.x, 0.7, o.z); o.cloud.scale.set(T.cloudRadius, 0.9, T.cloudRadius); scene.add(o.cloud);
  playBlip([140, 90, 60], 0.14, "sawtooth", 0.09);
  havoc("stinkBomb", T.points, "Stink bomb!", { x: o.x, z: o.z, loud: true });
  makeNoise(o.x, o.z, T.noiseRadius, true, o);
}
function stinkCloud(o, dt) {
  const T = o.T, k = o.life / T.cloudSec;
  o.cloud.material.opacity = 0.32 * Math.min(1, k * 3);
  o.cloud.rotation.y += dt * 0.4; o.cloud.scale.y = 0.9 + Math.sin(o.age * 2) * 0.08;
  o.hitSet ??= new Set();
  const inside = (x, z) => Math.hypot(x - o.x, z - o.z) < T.cloudRadius;
  for (const st of staff) {
    if (o.hitSet.has(st) || !inside(st.x, st.z)) continue;
    o.hitSet.add(st); stunStaff(st, T.staffGagSec, "flinch");
    st.bubble.textContent = pick(["*cough*", "UGH. What IS that?", "*gag*"]); st.barkUntil = performance.now() + 1500; st.barkAt = game.time;
    addScore(T.perStaff, `The ${st.type.name} walks into the stink`, "small");
  }
  for (const c of crowd) {
    if (!isActive(c) || o.hitSet.has(c) || !inside(c.x, c.z)) continue;
    o.hitSet.add(c); c.slipT = Math.max(c.slipT, T.studentGagSec); c.stunStyle = "flinch";
    addScore(T.perStudent, "Ew!", "small");
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
  return true;
}
function clearGraffiti() { for (const g of graffiti) { scene.remove(g.mesh); g.mesh.material.map.dispose(); g.mesh.material.dispose(); } graffiti.length = 0; }

// ---- the wheelie chair: flick to launch yourself, no steering ----
function startRide(L) {
  player.ride = { dx: L.dx, dz: L.dz, t: 0, chair: makeItemMesh("wheelieChair") };
  player.heading = Math.atan2(L.dx, L.dz);
  toast("WHEEEEE!");
  playBlip([400, 600, 800], 0.07, "triangle", 0.06);
}
function updateRide(dt) {
  const R = player.ride, T = ITEM_TYPES.wheelieChair;
  R.t += dt;
  const ox = player.x, oz = player.z, want = T.rideSpeed * dt;
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
  player.ride = null; scene.remove(R.chair);
  spawnObject("wheelieChair", "spent", player.x - R.dx * 0.6, 0, player.z - R.dz * 0.6, { life: T.leftoverSec });
  player.mesh.position.y = 0;
  if (crash) { player.dazeT = T.dazeSec; playBlip([200, 120], 0.12, "sawtooth", 0.08); popup("CRASH!", "bad"); }
}

// ---- picking things up ----
function pickable(o) { return o.state === "pickup" || (o.state === "resting" && o.T.recoverable); }
function pickUp(o) { if (!addItem(o.key, o.key === "spitball" ? o.uses : undefined)) return false; removeObject(o); return true; }
function pickupNearest() {
  let best = null, bd = CFG.items.pickupRange;
  for (const o of objects) if (pickable(o)) { const d = Math.hypot(o.x - player.x, o.z - player.z); if (d < bd) { bd = d; best = o; } }
  if (best) { pickUp(best); return true; }
  return false;
}
function tryTapPickup(x, y) {
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
  if (best) { pickUp(best); return true; }
  return false;
}

// ---- havoc: flat points for mischief, worth less each time you repeat it in a period ----
function scoreMult() { return (game.survival ? CFG.survival.scoreMult : 1) * (game.nearMissT > 0 ? CFG.scoring.nearMissMult : 1); }
function streakMult() { const S = CFG.scoring; return Math.min(S.streakMax, 1 + Math.floor(game.unseenT / S.streakStepSec) * S.streakStep); }
function havoc(kind, base, label, opts = {}) {
  const n = game.havocCount[kind] ?? 0;
  game.havocCount[kind] = n + 1;
  const pts = Math.max(1, Math.round(base * Math.pow(CFG.items.diminish, n) * scoreMult()));
  game.score += pts;
  popup(`+${pts} ${label}`);
  onHavoc(kind, pts, opts);
  return pts;
}
// Heat if someone saw you do it; the security level goes up for loud havoc even if nobody did.
function onHavoc(kind, pts, opts) {
  const seen = staff.some((st) => canSeePlayer(st, 1, !(st.state === "chase" || st.state === "search")).seen);
  const S = CFG.security;
  if (seen) {
    addHeat(Math.min(CFG.heat.seenHavocMax, pts * CFG.heat.seenHavocMult));
    addSecurity(opts.loud ? S.loudSeen : S.quietSeen);
    popup("...and they SAW that.", "bad");
  } else if (opts.loud) addSecurity(S.loudUnseen);
}
function addHeat(n) { game.heatPending += n; }
function addSecurity(n) {
  const before = game.security;
  game.security = Math.min(100, game.security + n);
  if (before < CFG.security.extraGuardAt && game.security >= CFG.security.extraGuardAt) pa("securityUp");
}
// heat flows in no faster than maxRisePerSec; cools slowly while you're hidden
function updateHeat(dt) {
  const H = CFG.heat, before = game.heat;
  if (game.survival) { game.heat = 100; game.heatPending = 0; updateSurvival(dt); return; }   // pinned at the max
  const flow = Math.min(game.heatPending, H.maxRisePerSec * dt);
  game.heatPending -= flow;
  game.heat = Math.min(100, game.heat + flow);
  if (game.heat >= 100) { startSurvival(); return; }   // anything that maxes your heat
  if (player.hidden) game.heat = Math.max(0, game.heat - H.hiddenCoolPerSec * dt);
  if (before < H.passingCatchAt && game.heat >= H.passingCatchAt) {
    pa("heatHigh");
    banner("HEAT RISING<small>Staff can now detain you during passing periods too.</small>", 2.6);
  }
}
// ---- survival mode ----
function startSurvival() {
  if (game.survival) return;
  game.survival = true; game.survivalT = 0; game.heat = 100; game.heatPending = 0; game.highAlert = true;
  game.nextArrivalT = CFG.survival.staffEverySec; game.nextRadioT = 4;
  banner(`SURVIVAL MODE<small>Heat maxed. Every staff member is after you. Points ×${CFG.survival.scoreMult} until they catch you.</small>`, 3.4);
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
    if (staff.filter((s) => !s.type.stationary).length < V.maxStaff) {
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
    const free = staff.filter((o) => !o.type.stationary && o.state !== "chase" && o.state !== "bust" && o.stunT <= 0)
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
  if (performance.now() > a.armT) { a.armT = performance.now() + 2500; toast("🔥 Tap the fire alarm again to PULL it. (This starts survival mode.)", 2.5); playBlip([300], 0.06, "square", 0.05); return; }
  pullFireAlarm(a);
}
function pullFireAlarm(a) {
  const F = CFG.fireAlarm, f = alarmFront(a, {});
  game.alarmPulled = true; game.alarmT = F.sec;
  const seen = staff.some((st) => canSeePlayer(st, 1, !(st.state === "chase" || st.state === "search")).seen);
  havoc("fireAlarm", F.points, "FIRE ALARM!", { x: f.x, z: f.z });
  game.security = Math.min(100, seen ? CFG.security.alarmSeen : game.security + CFG.security.alarmUnseen);
  // everyone freezes, hands over their ears
  for (const st of staff) { stunStaff(st, F.stunSec, "flinch"); st.suspicion = 0; st.bubble.textContent = pick(["MY EARS!", "Is that real?!", "Not again..."]); st.barkUntil = performance.now() + 1800; }
  // students pour out of every classroom and stay out while it rings
  for (const c of crowd) {
    if (c.mode === "gone" || c.mode === "spawning") { c.mode = "spawning"; c.spawnAt = game.phaseT + rand(0, 2.5); c.door = pick(DOOR_SPOTS()); c.speed = rand(CFG.crowd.speedMin, CFG.crowd.speedMax) * 1.3; }
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
    for (const c of crowd) if (isActive(c)) { if (game.phase === "skipping") { c.mode = "toClass"; c.door = pick(DOOR_SPOTS()); } else c.leaveAt = game.phaseT + rand(2, 8); }
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
  addHeat(Fl.heat);
  addSecurity(CFG.security.flood);
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

const popupsEl = $("popups");
function popup(text, cls = "") {
  const el = document.createElement("div"); el.className = "pop " + cls; el.textContent = text;
  popupsEl.appendChild(el); setTimeout(() => el.remove(), 1600);
  while (popupsEl.children.length > 4) popupsEl.firstChild.remove();
}

// =====================================================================================
// Step 8: the principal, friends and passing-period mini-games, risk scoring
// =====================================================================================
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
      if (st.type.stationary || st.nearCD > 0 || st.stunT > 0 || st.state === "chase" || st.state === "bust") continue;
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
const OFFER_ICONS = { highFive: "✋", gumTrade: "🍬?", fakePass: "🎫" };
const OFFER_LABELS = { highFive: "High five", gumTrade: "Trade gum", fakePass: "Fake pass" };
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
    addScore(R.highFivePoints, "High five!", "item"); playBlip([880, 1320], 0.06, "square", 0.06);
  } else if (F.offer === "gumTrade") {
    const i = game.hotbar.findIndex((s) => s && s.key === "gum");
    if (i < 0) { toast("Friend: \"Got any gum?\" (Bring them gum to trade.)"); return; }
    addScore(R.gumTradePoints, "Gum trade!", "item");
    if (!game.passShield) {   // the main way to get a fake pass
      consumeSlot(i); game.passShield = true;
      popup("🎫 They slip you a fake pass! Your next catch doesn't count.", "item"); playBlip([523, 659, 784], 0.08, "triangle", 0.06);
    } else {
      const got = pickWeighted(goodLoot().filter(([k]) => k !== "gum"));
      game.hotbar[i] = { key: got, uses: ITEM_TYPES[got].uses ?? 1 }; renderHotbar();
      popup(`Traded gum for ${ITEM_TYPES[got].icon} ${ITEM_TYPES[got].label}`, "item"); playBlip([660, 990], 0.06, "triangle", 0.06);
    }
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

// ---- paper airplanes: kids toss them across the hall during passing; walk into one (or tap it) to catch it ----
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
  for (const o of objects) {
    if (!o.wild || o.state !== "flying" || player.hidden) continue;
    if (o.y < 2.3 && Math.hypot(o.x - player.x, o.z - player.z) < CFG.airplanes.catchRadius) catchPlane(o);
  }
}
function catchPlane(o) {
  if (!addItem("paperAirplane")) return;
  addScore(CFG.airplanes.catchPoints, "Caught it!", "item");
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
resetGame();        // lay out the scene behind the title screen
updateCrowd(0.016); drawCrowd(); for (const st of staff) updateCone(st);

renderer.setAnimationLoop(() => {
  const dt = Math.min(clock.getDelta(), 0.05);
  if (game.state === "playing") update(dt * (game.aim ? CFG.items.aimTimeScale : 1));
  if (game.state === "scene") { game.sceneT += dt; if (game.sceneT >= game.sceneEnd) endScene(); }
  if (paTimer > 0) { paTimer -= dt; if (paTimer <= 0) $("pa").classList.remove("show"); }
  if (bannerTimer > 0) { bannerTimer -= dt; if (bannerTimer <= 0) ui.banner.classList.remove("show"); }
  if (toastTimer > 0) { toastTimer -= dt; if (toastTimer <= 0) ui.toast.classList.remove("show"); }
  drawCrowd();
  updateCamera(dt);
  if (game.state === "playing") updateKeyAim(dt);
  updateAimPreview();
  updateKeyHint();
  drawStamina();
  drawObjects();
  updateMarkers();
  updateSpotsUI();
  drawFriends();
  updateHud();
  renderer.render(scene, camera);
  if (debug) { fpsAcc += dt; fpsN++; if (fpsAcc > 0.5) { ui.fps.textContent = `${Math.round(fpsN / fpsAcc)} fps · ${crowdDrawn}/${crowd.length} kids drawn`; fpsAcc = fpsN = 0; } }
});

if (debug) {   // a small test panel for phone playtests (only with ?debug in the URL)
  const css = document.createElement("style");
  css.textContent = `#dbg { position: fixed; left: 50%; bottom: max(6px, env(safe-area-inset-bottom)); transform: translateX(-50%); z-index: 5;
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
  add("Skip to last period", () => {
    const last = typeof periodsToday === "function" ? periodsToday() : CFG.periodsPerDay;
    game.period = last - 1; game.phase = "skipping"; game.phaseT = phaseLen("skipping") - 0.05;
  });
  let gi = 0;
  add("Give item", () => { const k = Object.keys(ITEM_TYPES); addItem(k[gi++ % k.length]); });
  add("Heat +30", () => { addHeat(30); });
  add("Max heat (survival)", () => { game.heat = 100; game.heatPending = 0; });
  add("School alert 100%", () => { game.security = 100; });
  add("Get a strike", () => { const st = staff.find((s) => !s.type.stationary) ?? staff[0], ph = game.phase; game.phase = "skipping"; caught(st); game.phase = ph; });
  add("Principal", () => { ensurePrincipal(true); });
  // a spot a few meters ahead of the kid, in the hall
  const ahead = (d) => { const x = player.x + Math.sin(player.heading) * d, z = player.z + Math.cos(player.heading) * d; const g = { x, z }; collide(g, 0.4); return g; };
  add("Staff ahead (back turned)", () => {
    const st = staff.find((s) => !s.type.stationary);
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
  spots: SPOTS.map((sp) => ({ kind: sp.kind, h: sp.h, t: sp.t, room: sp.room, teacher: sp.teacher, blocked: spotBlocked(sp) })) }; }, CFG, STAFF_TYPES, TEACHER_TYPES, ROOM_TYPES, ITEM_TYPES };
if (debug) {   // test-only helpers (only with ?debug in the URL)
  Object.assign(window.__hallwaySkip, {
    place(h, t, lat) { const p = hallPos(h, t, lat); player.x = p.x; player.z = p.z; },
    placeXZ(x, z) { player.x = x; player.z = z; },
    inFrontOf(k, dist) { const st = staff[k]; player.x = st.x + Math.sin(st.facing) * dist; player.z = st.z + Math.cos(st.facing) * dist;
      cam.yaw = player.heading = st.facing + Math.PI; manualCamT = 99; },
    spotFront(i) { const sp = SPOTS[i], f = spotFront(sp, {}); return { x: f.x, z: f.z, h: sp.h, t: sp.t, wallLat: sp.wallLat, frontLat: sp.frontLat, side: sp.side }; },
    faceSpot(i) { const sp = SPOTS[i], H = HALLS[sp.h]; cam.yaw = player.heading = Math.atan2(sp.side * H.nx, sp.side * H.nz); manualCamT = 99; },
    faceHall(h, dir) { cam.yaw = player.heading = hallHeading(h, dir); manualCamT = 99; },
    staffTo(k, x, z, state) { const st = staff[k]; st.x = x; st.z = z; if (state) { st.state = state; st.suspicion = 1; } },
    setTime(t) { game.phaseT = t; },
    catchNow(k = 0) { caught(staff[k]); },
    sweepNow(i) { SPOTS[i].nextSweep = game.time; },
    give(key, uses) { return addItem(key, uses); },
    // throw an item from the hotbar: yaw = world heading, power 0..1
    throwAt(key, power, yaw) {
      if (!game.hotbar.some((x) => x && x.key === key)) addItem(key);
      const slot = game.hotbar.findIndex((x) => x && x.key === key);
      game.aim = { slot, key }; release(game.aim, { dx: Math.sin(yaw), dz: Math.cos(yaw), power });
      return objects.length ? objects[objects.length - 1].id : null;
    },
    obj(id) { const o = objects.find((x) => x.id === id); return o ? { claimed: claimedBy(o)?.key ?? null, popped: !!o.popped, state: o.state, x: o.x, y: o.y, z: o.z, stage: o.stage, slips: o.slips, life: o.life, hits: o.hitSet?.size ?? 0, flown: o.flown.size, dead: !!o.dead } : null; },
    heading() { return player.heading; },
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
    sprintInfo() { return { stamina: Math.round(player.stamina * 100) / 100, sprinting: player.sprinting, winded: player.winded }; },
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
    unpost() { for (const st of staff) if (st.post) st.post = null; },
    hideT() { return player.hideT; },
    friends() { return crowd.filter((c) => c.friend).map((c) => ({ offer: c.friend.offer, cd: c.friend.cd, x: c.x, z: c.z, mode: c.mode, i: crowd.indexOf(c) })); },
    friendTo(i, offer) { const c = crowd[i]; c.friend.offer = offer; c.friend.cd = 0; c.slipT = 0; c.mode = "wander"; c.x = player.x + 1.5; c.z = player.z; const pr = hallProject(c.x, c.z); c.h = pr.h; c.t = pr.t; c.lat = pr.lat; c.leaveAt = 999; },
    tapFriend(i) { friendTap(crowd[i]); },
    risk() { return { unseenT: game.unseenT, streak: streakMult(), nearMissT: game.nearMissT, passShield: game.passShield }; },
    setUnseen(t) { game.unseenT = t; },
    spawnPrincipal() { ensurePrincipal(true); return staff.findIndex((s) => s.key === "principal"); },
    forcePlane() { game.nextPlaneT = 0; },
    barks() { return staff.map((s) => (performance.now() < s.barkUntil ? s.bubble.textContent : null)); },
    ads() { return { interstitialsToday: Ads.interstitialsToday, rewardedToday: { ...Ads.rewardedToday } }; },
    setHeat(h, s) { if (h != null) { game.heat = h; game.heatPending = 0; } if (s != null) game.security = s; },
    heat() { return { heat: game.heat, pending: game.heatPending, security: game.security, survival: game.survival, alarmT: game.alarmT }; },
    objects() { return objects.filter((o) => !o.dead).map((o) => ({ key: o.key, state: o.state, x: o.x, y: o.y, z: o.z, bounces: o.bounces, life: o.life })); },
    dropItem(key, dx, dz) { const o = spawnObject(key, "pickup", player.x + dx, REST_Y[key] ?? 0.04, player.z + dz); return o.id; },
    hotbar() { return game.hotbar.map((s) => s && `${s.key}${s.uses > 1 ? "x" + s.uses : ""}`); },
    playerState() { return { slipT: player.slipT, dazeT: player.dazeT, riding: !!player.ride, x: player.x, z: player.z }; },
    staffFull(k) { const s = staff[k]; return { state: s.state, stunT: s.stunT, distractT: s.distractT, x: s.x, z: s.z, key: s.key }; },
    searchTo(k, x, z) { const st = staff[k]; st.state = "search"; st.searchT = -30; st.lastX = st.tx = x; st.lastZ = st.tz = z; },
    nodes() { return NODES.map((n) => ({ id: n.id, x: n.x, z: n.z })); },
    tidyInfo() { return staff.map((s) => ({ key: s.key, state: s.state, obj: s.tidyObj && !s.tidyObj.dead && s.state === "tidy" ? s.tidyObj.id : null, stunT: s.stunT, tidyT: s.tidyT, x: s.x, z: s.z, pauseT: s.pauseT })); },
    rummage() { rummageLocker(); },
    grabRoll() { grabRoll(); },
    trails() { return tpTrails.length; },
    stuck() { return { player: player.stuckT, staff: staff.map((s) => s.stuckT ?? 0) }; },
    lockers() { return SPOTS.map((sp, i) => ({ i, kind: sp.kind })).filter((x) => x.kind === "locker").map((x) => x.i); },
    selectSlot(i) { selectSlot(i); },
    phaseLens() { return { passing: phaseLen("passing"), skipping: phaseLen("skipping") }; },
    insideWalls() {   // how many people are standing inside a wall (should be 0)
      const inWall = (x, z) => WALLS.some((b) => x > b.x0 + 0.05 && x < b.x1 - 0.05 && z > b.z0 + 0.05 && z < b.z1 - 0.05);
      return { crowd: crowd.filter((c) => c.mode === "wander" && inWall(c.x, c.z)).length, staff: staff.filter((s) => inWall(s.x, s.z)).length };
    },
  });
}
