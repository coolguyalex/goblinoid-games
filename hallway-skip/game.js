// Hallway Skip — build step 7 prototype.
// Step 1: hallway, joystick, a hall monitor that chases, a crowd that thins, and the bell.
// Step 2: tap-to-interact and hiding spots: lockers, restrooms, classrooms (teacher and sub boot timers).
// Step 3: security guard, the three-strike ladder, and the PA announcer.
// Step 4: the six-period day, escalating days, hall teachers, save at the bell. Figure-8 floor plan.
// Step 5: four-slot hotbar, tap-then-flick throwing with an arc preview, and the first seven items.
// Step 6: rooms as shops (loot tables by room type, grabbing costs boot time, teachers can call security) and despawn timers.
// Step 7: heat ("they know it's me") and the persistent security level ("they know something happened").
import * as THREE from "three";

// =====================================================================================
// CONFIG — every tunable number lives here. Values marked "guess" come from the spec.
// =====================================================================================
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
    count: 60,
    speedMin: 1.0, speedMax: 1.8, radius: 0.3,
    leaveStartFrac: 0.12,         // during passing, students head into class between these
    leaveEndFrac: 0.92,           //   fractions of the passing period
    tardyRushSpeed: 3.4,          // stragglers hurry in when the tardy bell rings
    floodSpreadSec: 3.0,          // after the period bell, students pour out over this many seconds
    coverRadius: 2.6,             // students this close to you count as cover...
    coverPerStudent: 0.35,        // ...each one cuts detection speed: rate / (1 + n * this)
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
    hallSpawnsPerPeriod: 3,       // items that turn up lying in the halls each period...
    maxLying: 8,                  // ...up to this many at once
    aimTimeScale: 0.5,            // the game runs at half speed while you line up a throw
    flickFullFrac: 0.32,          // a drag this long (fraction of the screen's short side) is a full-power throw
    minFlickPx: 22,               // shorter than this counts as a tap (cancels the throw)
    diminish: 0.6,                // each repeat of the same havoc in one period is worth this much of the last
    blinkSec: 5,                  // recoverable items blink for this long before they vanish
  },

  rooms: {
    grabSec: 1.5,                 // grabbing an item off a desk eats this much of your hiding time (subs: see TEACHER_TYPES)
    hallItemLifeSec: 45,          // items lying in the halls vanish after this long (blinking at the end)
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
    extraGuardAt: 50,             // at or above this, one extra guard is on duty
    lastDayAt: 100,               // end a day maxed out and tomorrow is the LAST DAY...
    lastDayPeriods: 3,            // ...a short, frantic scoring sprint
    lastDayScoreMult: 2,
  },

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
  heatHigh:   ["Attention staff: you may now detain students in the halls between classes.", "Staff, eyes open during passing periods. You know who you're looking for."],
  securityUp: ["We've had reports of... noises. All staff, stay alert.", "Whoever is responsible for the whoopee cushions: we will find you."],
  lastDay:    ["This is your principal speaking. Today, the hoodie goes down.", "Lockdown drill. Just kidding. Unless...?"],
};

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
  science:   { label: "Science lab", plaque: 0x2ecc71, loot: [["bananaPeel", 3], ["whoopee", 2], ["spitball", 2]], count: [1, 2] },
  art:       { label: "Art room", plaque: 0xe67e22, loot: [["wheelieChair", 3], ["paperAirplane", 3], ["gum", 2]], count: [1, 2] },
  gym:       { label: "Gym", plaque: 0xe74c3c, loot: [["basketball", 6], ["whoopee", 1]], count: [1, 2] },
  office:    { label: "Main office", plaque: 0x34495e, door: 0x4a3426, staff: "office", count: [2, 3],
               loot: [["wheelieChair", 2], ["whoopee", 2], ["basketball", 2], ["bananaPeel", 2]],
               rarePrize: { points: 300, label: "Raid the confiscated-stuff drawer" } },   // once per day
};

// Items are data. kind: "throw" (flick it), "ride" (flick to launch yourself), "instant" (tap to use).
const ITEM_TYPES = {
  paperAirplane: { label: "Paper airplane", icon: "✈️", kind: "throw", speed: [6, 11], pitchDeg: 8, gravity: 1.2, glide: true,
                   perStudent: 10, crowdLandBonus: 50, crowdLandCount: 3, spawnWeight: 3 },
  spitball:      { label: "Spitball", icon: "🫧", kind: "throw", uses: 3, speed: [12, 18], pitchDeg: 4, gravity: 6, hitPoints: 25, spawnWeight: 4 },
  bananaPeel:    { label: "Banana peel", icon: "🍌", kind: "throw", speed: [3, 8], pitchDeg: 35, gravity: 9.8, lifeSec: 40,
                   slipStaffSec: 2.5, slipStudentSec: 1.0, slipPlayerSec: 0.8, staffPoints: 150, studentPoints: 30, spawnWeight: 2 },
  whoopee:       { label: "Whoopee cushion", icon: "💨", kind: "throw", recoverable: true, speed: [3, 8], pitchDeg: 35, gravity: 9.8,
                   noiseRadius: 14, lifeSec: 20, points: 50, spawnWeight: 2 },
  basketball:    { label: "Basketball", icon: "🏀", kind: "throw", recoverable: true, speed: [5, 11], pitchDeg: 30, gravity: 9.8,
                   bounces: [6, 8], restitution: 0.72, noiseRadius: 10, lingerSec: 5, bouncePoints: 5, spawnWeight: 2 },
  wheelieChair:  { label: "Wheelie chair", icon: "🪑", kind: "ride", rideSpeed: 9.5, maxRideSec: 3, dazeSec: 1.5, leftoverSec: 3,
                   studentPoints: 40, spawnWeight: 1 },
  gum:           { label: "Gum", icon: "🍬", kind: "instant", points: 100, line: "You stick gum under the water fountain. Gross. +havoc", spawnWeight: 3 },
};
const REST_Y = { basketball: 0.2, wheelieChair: 0, whoopee: 0.08 };   // how high items sit on the floor (default 0.04)

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
  hideLockers: [ { h: 0, t: 4 }, { h: 0, t: 14.5 }, { h: 0, t: 25 }, { h: 0, t: 35 }, { h: 1, t: 4 }, { h: 1, t: 13 },
                 { h: 2, t: 4 }, { h: 3, t: 5 }, { h: 3, t: 27 }, { h: 3, t: 34 }, { h: 4, t: 4 }, { h: 4, t: 13 }, { h: 5, t: 4 } ],
  restrooms: [ { h: 2, t: 12 }, { h: 5, t: 12 } ],
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
  const sp = addSpot("classroom", d.h, d.t, side, { room: d.room, roomType: d.type ?? "classroom", R, teacher: R.staff ?? "teacher", sil, note, loot: [], prizeTaken: false });
  sp.glow.push(door.material);
}
function rollSubs() {
  const rooms = SPOTS.filter((sp) => sp.kind === "classroom");
  const [lo, hi] = CFG.hiding.subsPerDay;
  let n = lo + Math.floor(Math.random() * (hi - lo + 1));
  for (const sp of rooms) { sp.teacher = sp.R.staff ?? "teacher"; sp.prizeTaken = false; }
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
  if (hood) { const hd = new THREE.Mesh(new THREE.IcosahedronGeometry(0.25, 0), lambert(hood)); hd.position.set(0, 1.36, -0.08); hd.scale.set(1, 1, 0.9); g.add(hd); }
  if (hat) { const ht = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.1, 0.48), lambert(hat)); ht.position.set(0, 1.52, 0.05); g.add(ht); }
  g.scale.setScalar(scale);
  scene.add(g);
  return g;
}

// ---------- player ----------
const player = {
  x: 0, z: 0, vx: 0, vz: 0, heading: 0,
  hidden: null, hideT: 0, hideArmed: false, graceT: 0, invisT: 0, pushSpot: null, pushT: 0, slipT: 0, dazeT: 0, ride: null,
  mesh: makePerson({ body: 0x8a8f99, hood: 0x7b808a }),   // the gray hoodie
};

// ---------- crowd (instanced: one mesh for bodies, one for heads) ----------
const crowd = [];
const crowdBodies = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.26, 0.3, 1.0, 6).translate(0, 0.5, 0), lambert(0xffffff), CFG.crowd.count);
const crowdHeads = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(0.21, 0).translate(0, 1.24, 0), lambert(0xffffff), CFG.crowd.count);
crowdBodies.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
crowdHeads.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
scene.add(crowdBodies, crowdHeads);
const DOOR_SPOTS = () => SPOTS.filter((sp) => sp.kind === "classroom");
{
  const c = new THREE.Color();
  for (let i = 0; i < CFG.crowd.count; i++) {
    crowdBodies.setColorAt(i, c.setHex(pick(SHIRT_COLORS)));
    crowdHeads.setColorAt(i, c.setHex(pick(SKIN_COLORS)));
    crowd.push({ h: 0, t: 0, to: 0, lat: 0, x: 0, z: 0, targetLat: 0, speed: 1, mode: "gone", leaveAt: 0, door: null,
      spawnAt: 0, retargetT: 0, bob: Math.random() * 10, heading: 0, scale: rand(0.88, 1.08), slipT: 0 });
  }
}

// ---------- staff ----------
const staff = [];
const markersEl = document.getElementById("markers");
function spawnStaff(typeKey, place) {
  const T = STAFF_TYPES[typeKey];
  const mesh = makePerson({ body: T.vestColor, skin: pick(SKIN_COLORS), scale: T.scale, hat: T.hatColor });
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
  const st = { type: T, key: typeKey, x: 0, z: 0, h: place.h ?? 0, t: place.t ?? 0, to: place.to ?? 0, facing: 0, state: "patrol",
    suspicion: 0, lastX: 0, lastZ: 0, lastVX: 0, lastVZ: 0, searchT: 0, stepT: 0, sweep: Math.random() * 10,
    tx: 0, tz: 0, pauseT: 0, bustSpot: null, chaseT: 0, windedT: 0, alarmT: 0, calledBackup: false, stunT: 0, distractT: 0, dX: 0, dZ: 0,
    roamT: T.roamTurnSec ? rand(...T.roamTurnSec) : 0, route: place.route ?? null, ri: place.ri ?? 0, rstep: place.rstep ?? 1,
    post: place.post ?? null, mesh, cone, alert, edge };
  if (T.stationary) { st.x = place.x; st.z = place.z; st.facing = place.facing; st.state = "post"; }
  else { hallPos(st.h, st.t, 0, st); st.facing = hallHeading(st.h, st.to === HALLS[st.h].b ? 1 : -1); }
  staff.push(st);
  return st;
}
function clearStaff() {
  for (const st of staff) { scene.remove(st.mesh); scene.remove(st.cone); st.cone.geometry.dispose(); st.alert.remove(); st.edge.remove(); }
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
window.addEventListener("keydown", (e) => {
  keys.add(e.key.toLowerCase());
  if ((e.key === " " || e.key === "Enter") && game.state !== "playing") { e.preventDefault(); onOverlayTap(); }
  if (e.key === "Escape" && game.state === "playing") { if (game.aim) cancelAim(); else pause(); }
  if (/^[1-9]$/.test(e.key) && game.state === "playing" && !e.repeat) selectSlot(+e.key - 1);
  if (e.key.toLowerCase() === "e" && game.state === "playing" && !e.repeat) {   // desktop: enter / leave
    if (player.hidden) exitSpot(false);
    else if (!pickupNearest()) { const sp = nearestSpot(); if (sp) enterSpot(sp); }
  }
});
window.addEventListener("keyup", (e) => keys.delete(e.key.toLowerCase()));

function readInput() {
  let x = (keys.has("d") || keys.has("arrowright") ? 1 : 0) - (keys.has("a") || keys.has("arrowleft") ? 1 : 0);
  let y = (keys.has("w") || keys.has("arrowup") ? 1 : 0) - (keys.has("s") || keys.has("arrowdown") ? 1 : 0);
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
  lockerUses: 0, pendingOffice: false, hotbar: [], aim: null, havocCount: {}, heat: 0, heatPending: 0, security: 0, lastDay: false };
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
const perPeriod = (table) => (game.lastDay ? table[table.length - 1] : table[Math.min(game.period, table.length) - 1]);
function dayMult(perDay) { return Math.min(CFG.days.maxMult, 1 + perDay * (game.day - 1)); }
function alertMult(k) { return game.highAlert ? CFG.strikes.alert[k] : 1; }
function staffMult(k) {
  const day = { speed: CFG.days.staffSpeedPerDay, vision: CFG.days.staffVisionPerDay, notice: CFG.days.staffNoticePerDay }[k];
  return alertMult(k) * dayMult(day) * (1 + CFG.heat.effect[k] * game.heat / 100) * (1 + CFG.security.effect[k] * game.security / 100);
}
const periodsToday = () => (game.lastDay ? CFG.security.lastDayPeriods : CFG.periodsPerDay);
function phaseLen(phase = game.phase) {
  const D = CFG.days, n = game.day - 1;
  return phase === "passing" ? Math.max(D.minPassingSec, CFG.passingSec + D.passingSecPerDay * n)
                             : Math.min(D.maxSkippingSec, CFG.skippingSec + D.skippingSecPerDay * n);
}

// ---- save at the bell, so a returning player lands at "Day 1, Period 4" ----
const SAVE_KEY = "hallwaySkip.save.v1";
function saveGame() {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify({ day: game.day, period: game.period, score: Math.floor(game.score),
    strikes: game.strikes, highAlert: game.highAlert, periodsSkipped: game.periodsSkipped, security: Math.round(game.security), lastDay: game.lastDay })); } catch (e) { /* storage blocked: fine */ }
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
  clearObjects(); cancelAim();
  if (player.ride) { scene.remove(player.ride.chair); player.ride = null; }
  player.slipT = player.dazeT = 0; player.mesh.rotation.z = 0;
  game.hotbar = Array(CFG.items.slots).fill(null); renderHotbar();
  rollSubs();             // first, so sub rooms get their extra desk loot
  resetSpotsForPeriod();
  for (const sp of SPOTS) if (sp.kind === "restroom") sp.nextSweep = game.time + rand(12, CFG.hiding.restroomSweepEverySec);
  startPassing(true);
}

function resetGame(save = null) {
  game.day = save?.day ?? 1; game.period = save?.period ?? 1; game.score = save?.score ?? 0; game.time = 0;
  game.strikes = save?.strikes ?? 0; game.highAlert = save?.highAlert ?? false;
  game.periodScore = 0; game.periodsSkipped = save?.periodsSkipped ?? 0; game.dayPeriodsSkipped = 0;
  game.security = save?.security ?? 0; game.lastDay = save?.lastDay ?? false; game.heat = game.heatPending = 0;
  paLast = {};
  morningSetup();
}
function resetSpotsForPeriod() {
  game.lockerUses = CFG.hiding.lockerUsesPerPeriod;
  for (const sp of SPOTS) {
    sp.used = false;
    if (sp.kind === "classroom") {   // restock the desks
      const [lo, hi] = sp.R.count, n = lo + Math.floor(Math.random() * (hi - lo + 1)) + (sp.teacher === "sub" ? 1 : 0);
      sp.loot = Array.from({ length: n }, () => pickWeighted(sp.R.loot));
      sp.lootVer = (sp.lootVer ?? 0) + 1;
    }
  }
}

function startPassing(first) {
  game.phase = "passing"; game.phaseT = 0; game.periodScore = 0;
  game.havocCount = {};
  spawnHallItems();
  const P = phaseLen("passing"), doors = DOOR_SPOTS();
  for (const c of crowd) {
    c.leaveAt = rand(CFG.crowd.leaveStartFrac, CFG.crowd.leaveEndFrac) * P;
    c.door = pick(doors);
    if (!first) { c.mode = "spawning"; c.spawnAt = rand(0, CFG.crowd.floodSpreadSec); c.speed = rand(CFG.crowd.speedMin, CFG.crowd.speedMax); }
  }
  // staff for this period (the within-day curve); they stay on for the rest of the day
  for (const [key, table, line] of [["hallMonitor", CFG.monitorsPerPeriod], ["securityGuard", CFG.guardsPerPeriod, "guardOnDuty"], ["hallTeacher", CFG.teachersPerPeriod, "teacherOut"]]) {
    let have = staff.filter((st) => st.key === key).length;
    const want = perPeriod(table) + (key === "securityGuard" && game.security >= CFG.security.extraGuardAt ? 1 : 0);
    if (have < want && line && game.state === "playing") pa(line);
    while (have < want) { spawnStaff(key, pickStaffPlace(key)); have++; }
  }
  if (game.period === periodsToday() && !first && !game.lastDay) setTimeout(() => game.state === "playing" && game.period === periodsToday() && !game.lastDay && pa("lastPeriod"), 2500);
}

function startSkipping() {
  game.phase = "skipping"; game.phaseT = 0;
  playBell();
  banner("TARDY BELL<small>Hall's clearing out. Stay hidden until the next bell.</small>");
  for (const c of crowd) if (c.mode === "wander" || c.mode === "toClass") { c.mode = "toClass"; c.speed = CFG.crowd.tardyRushSpeed; }
}

function periodSurvived() {
  playBell();
  game.periodsSkipped++; game.dayPeriodsSkipped++;
  game.heat *= 1 - CFG.heat.bellDrop; game.heatPending *= 1 - CFG.heat.bellDrop;
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
  if (game.lastDay) { lastDaySurvived(); return; }
  game.state = "dayEnd";
  releaseControls();
  ui.banner.classList.remove("show"); bannerTimer = 0;
  if (player.hidden) exitSpot(false);
  game.score += CFG.days.dayBonus;
  const D = CFG.days, next = game.day + 1;
  $("dayTitle").textContent = `DAY ${game.day} SURVIVED!`;
  $("dayStats").innerHTML = `${game.dayPeriodsSkipped} periods skipped today · +${D.dayBonus} day bonus<br><b>Score ${Math.floor(game.score)}</b> · Strikes ${game.strikes}/${CFG.strikes.max}`;
  const pass = Math.max(D.minPassingSec, CFG.passingSec + D.passingSecPerDay * (next - 1));
  const skip = Math.min(D.maxSkippingSec, CFG.skippingSec + D.skippingSecPerDay * (next - 1));
  const S = CFG.security, before = Math.round(game.security);
  const tomorrowLast = game.security >= S.lastDayAt;
  game.security *= 1 - S.dayDecay;
  $("dayNext").innerHTML = tomorrowLast
    ? `<b class="warn">School alert maxed out. Tomorrow is your LAST DAY.</b> ${S.lastDayPeriods} periods, ${S.lastDayScoreMult}× points, every staff member on duty.`
    : `Day ${next}: staff are faster and sharper. Passing ${pass}s, skipping ${skip}s. School alert ${before}% → ${Math.round(game.security)}% overnight.`;
  $("dayEnd").hidden = false;
  game.day = next; game.period = 1; game.highAlert = false; game.dayPeriodsSkipped = 0; game.lastDay = tomorrowLast;
  game.heat = game.heatPending = 0;
  saveGame();
}
// Surviving the last day ends the run on your own terms.
function lastDaySurvived() {
  game.state = "caught";
  releaseControls();
  if (player.hidden) exitSpot(false);
  clearSave();
  $("caughtTitle").textContent = "Legend.";
  $("caughtText").innerHTML = `You survived the LAST DAY. Nobody ever proved a thing.<br><b>Score ${Math.floor(game.score)}</b> · ${game.day} days · ${game.periodsSkipped} periods skipped`;
  $("caught").hidden = false;
}
function startNextDay() {
  $("dayEnd").hidden = true;
  morningSetup();
  game.state = "playing";
  if (game.lastDay) {
    banner(`LAST DAY<small>${CFG.security.lastDayPeriods} periods. ${CFG.security.lastDayScoreMult}× points. Go out in style.</small>`, 3.2);
    setTimeout(() => game.state === "playing" && pa("lastDay"), 1500);
  } else {
    banner(`DAY ${game.day}<small>New day, same hoodie. New subs today.</small>`, 2.6);
    setTimeout(() => game.state === "playing" && pa("newDay", null, null, { d: game.day }), 1500);
  }
  clock.getDelta();
}

function releaseControls() { stick.id = look.id = null; keys.clear(); stickBase.style.display = stickKnob.style.display = "none"; }

function caught(st) {
  cancelAim();
  if (player.ride) endRide(false);
  if (game.phase === "passing" && game.heat < CFG.heat.passingCatchAt && !game.lastDay) { shoo(st); return; }
  game.strikes++;
  ui.hide.hidden = true;
  releaseControls();
  playBlip([660, 520, 390, 260], 0.13, "sawtooth", 0.07);
  if (game.strikes >= CFG.strikes.max) {   // strike 3: run over
    game.state = "caught";
    clearSave();
    pa("runOver");
    $("caughtTitle").textContent = "Run over!";
    $("caughtText").innerHTML = `The ${st.type.name} walks you to the office. Your parents are on their way.<br>` +
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
    ? "The vice principal yells at you for a solid minute. Staff will be watching you for the rest of the day."
    : `The ${st.type.name} catches you. ${st.type.caughtLine}`;
  $("strikeSub").textContent = office ? (lost ? `-${lost} points (this period's skipping)` : "") : "One more and you're going to the office.";
  $("strikeDots").innerHTML = strikeDotsHtml();
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
function shoo(st) {
  toast(`The ${st.type.name}: "Get to class!" (No strike: heat is low during passing.)`, 2.6);
  playBlip([520, 390], 0.1, "triangle", 0.07);
  addHeat(CFG.heat.shooHeat);
  for (const o of staff) {
    if (o.type.stationary) { o.suspicion = 0; o.alarmT = Math.max(o.alarmT, 3); continue; }
    if (o.state !== "patrol") { o.state = "return"; setReturnPoint(o); }
    o.suspicion = 0; o.calledBackup = false; o.pauseT = 1.0;
  }
  player.invisT = 2.0;
}

function endScene() {
  if (game.state !== "scene") return;
  $("strike").hidden = true;
  if (game.pendingOffice) {
    game.highAlert = true;
    // sent back out from the office, by the entrance
    const { h, t } = LAYOUT.entrance, side = HALLS[h].outerSide, p = hallPos(h, t, wallLat(h, side) - side * 0.8);
    player.x = p.x; player.z = p.z; player.heading = hallHeading(h, -1); cam.yaw = player.heading;
    banner("HIGH ALERT<small>Staff see farther and move faster for the rest of the day.</small>", 2.6);
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
  else if (game.state === "dayEnd") startNextDay();
  clock.getDelta();
}
for (const id of ["title", "caught", "paused", "dayEnd"]) $(id).addEventListener("click", onOverlayTap);
for (const id of ["aboutClose", "aboutX"]) $(id).addEventListener("click", () => { $("about").hidden = true; });
$("strike").addEventListener("click", () => { if (game.sceneT > 0.8) endScene(); });
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
  const f = { x: Math.sin(cam.yaw), z: Math.cos(cam.yaw) }, r = { x: -Math.cos(cam.yaw), z: Math.sin(cam.yaw) };
  const mx = r.x * input.x + f.x * input.y, mz = r.z * input.x + f.z * input.y;
  const sp = CFG.player.speed;
  const ox = player.x, oz = player.z;
  player.x += mx * sp * dt; player.z += mz * sp * dt;
  // students jostle you out of the way
  for (const c of crowd) {
    if (c.mode === "gone" || c.mode === "spawning") continue;
    const dx = player.x - c.x, dz = player.z - c.z, d = Math.hypot(dx, dz), min = CFG.player.radius + CFG.crowd.radius;
    if (d < min && d > 1e-4) { player.x += (dx / d) * (min - d); player.z += (dz / d) * (min - d); }
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

const crowdMatrix = new THREE.Object3D();
function drawCrowd() {
  crowd.forEach((c, i) => {
    const hidden = c.mode === "gone" || c.mode === "spawning";
    crowdMatrix.position.set(c.x, hidden ? -10 : Math.abs(Math.sin(game.time * 8 + c.bob)) * 0.05, c.z);
    crowdMatrix.rotation.set(c.slipT > 0 ? 1.35 : 0, c.heading, 0, "YXZ");
    crowdMatrix.scale.setScalar(hidden ? 0.0001 : c.scale);
    crowdMatrix.updateMatrix();
    crowdBodies.setMatrixAt(i, crowdMatrix.matrix);
    crowdHeads.setMatrixAt(i, crowdMatrix.matrix);
  });
  crowdBodies.instanceMatrix.needsUpdate = true; crowdHeads.instanceMatrix.needsUpdate = true;
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
    if (st.stunT > 0) {   // slipped on a banana peel
      st.stunT -= dt;
      st.mesh.rotation.z = st.stunT > 0 ? 1.3 : 0; st.mesh.position.set(st.x, 0, st.z);
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
        callBackup(st, false);
      }
      const base = st.post ? Math.atan2(-st.post.side * HALLS[st.post.h].nx, -st.post.side * HALLS[st.post.h].nz) : st.facing;
      const want = st.suspicion > 0.05 ? Math.atan2(player.x - st.x, player.z - st.z) : st.distractT > 0 ? Math.atan2(st.dX - st.x, st.dZ - st.z) : base + Math.sin(st.sweep) * (T.sweepDeg * Math.PI / 180);
      st.facing = lerpAngle(st.facing, want, damp(st.suspicion > 0.05 ? 5 : 2, dt));
    } else if (st.state === "patrol" || st.state === "return") {
      const look = canSeePlayer(st, 1, true);
      if (look.seen) {
        st.suspicion += noticeRate(st, look.d, cover) * dt;
        if (look.d < D.instantRange && game.phase === "skipping") st.suspicion = 1;
      } else st.suspicion = Math.max(0, st.suspicion - D.decayRate * dt);

      if (st.suspicion >= 1) { startChase(st); }
      else if (st.state === "return") {
        speed = T.patrolSpeed * staffMult("speed");
        const tgt = hallPos(st.h, st.t, 0);
        if (navToward(st, tgt.x, tgt.z, speed, dt) < 0.3) st.state = "patrol";
      } else {
        // patrol (monitors: a fixed loop; guards: roaming); slow down and squint while suspicious
        speed = T.patrolSpeed * staffMult("speed") * (st.suspicion > 0.05 ? D.suspiciousSlow : 1) * (st.distractT > 0 ? 0.15 : 1);
        if (T.roamTurnSec) { st.roamT -= dt; if (st.roamT <= 0) { st.roamT = rand(...T.roamTurnSec); if (Math.random() < 0.6) st.to = otherEnd(st.h, st.to); } }
        walk(st, speed * dt, patrolChooser(st));
        hallPos(st.h, st.t, 0, st);
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
        st.state = "search"; st.searchT = 0;
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
          startChase(st); st.pauseT = CFG.hiding.bustPauseSec;
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
      }
    }

    // footsteps
    if (speed > 0.2) {
      st.stepT += dt;
      const interval = st.state === "chase" ? CFG.footsteps.chaseInterval : CFG.footsteps.patrolInterval;
      if (st.stepT >= interval) { st.stepT = 0; playFootstep(st.x, st.z, st.state === "chase"); }
    }
    if (st.state !== "chase" && st.state !== "bust" && st.state !== "search") st.chaseT = Math.max(0, st.chaseT - dt);
    st.mesh.position.set(st.x, speed > 0.2 ? Math.abs(Math.sin(game.time * (st.state === "chase" ? 12 : 7))) * 0.06 : 0, st.z);
    st.mesh.rotation.y = st.facing;
    updateCone(st);
  }
}

// Guards sprint faster than you, then get winded. Everyone moves a bit faster on high alert and on later days.
function chaseSpeed(st, dt) {
  const T = st.type;
  let v = T.chaseSpeed;
  if (T.sprintSec) {
    if (st.windedT > 0) { st.windedT -= dt; v = T.windedSpeed; if (st.windedT <= 0) st.chaseT = 0; }
    else { st.chaseT += dt; if (st.chaseT > T.sprintSec) { st.windedT = T.windedSec; toast("The guard is winded! *huff* *huff*"); } }
  }
  return v * staffMult("speed");
}

// A radio call (guard) or a yell (teacher): the nearest free staff head for your position.
function callBackup(caller, announce) {
  if (announce) playBlip([1400, 1100, 1400], 0.05, "square", 0.05);   // radio chirp
  const others = staff.filter((o) => o !== caller && !o.type.stationary && o.state !== "chase" && o.state !== "bust")
    .map((o) => ({ o, d: Math.hypot(o.x - player.x, o.z - player.z) }))
    .filter((e) => e.d < CFG.backup.range).sort((a, b) => a.d - b.d).slice(0, CFG.backup.maxResponders);
  for (const { o, d } of others) {
    o.state = "search"; o.suspicion = 0.6;
    o.searchT = -Math.min(16, d / (o.type.chaseSpeed * 0.8));   // time to get there before they give up
    o.lastX = o.tx = player.x; o.lastZ = o.tz = player.z;
  }
  if (announce) pa("backup", null, null, { hall: HALLS[hallProject(player.x, player.z).h].name });
}

function startChase(st) {
  if (st.state !== "chase") { playBlip([520, 780], 0.1, "square", 0.08); addHeat(CFG.heat.seenRunning); }   // "Hey!"
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

let lastHud = "";
function updateHud() {
  const left = Math.max(0, Math.ceil(phaseLen() - game.phaseT));
  const label = `DAY ${game.day} · PERIOD ${game.period} · ${game.phase === "passing" ? "PASSING" : "SKIPPING"}`;
  const label2 = game.lastDay ? label.replace(`DAY ${game.day}`, "LAST DAY") : label;
  const key = label2 + left + Math.floor(game.score) + "|" + game.lockerUses + "|" + game.strikes + game.highAlert + "|" + Math.round(game.heat) + "|" + Math.round(game.security);
  if (key === lastHud) return;
  lastHud = key;
  ui.label.textContent = label2;
  $("heatFill").style.width = game.heat + "%"; $("secFill").style.width = game.security + "%";
  $("heatMeter").classList.toggle("hot", game.heat >= CFG.heat.passingCatchAt);
  ui.timer.textContent = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}`;
  ui.phase.className = game.phase;
  ui.score.textContent = Math.floor(game.score);
  ui.uses.textContent = `LOCKERS ×${game.lockerUses}`;
  ui.uses.classList.toggle("out", game.lockerUses === 0);
  $("strikes").innerHTML = strikeDotsHtml() + (game.highAlert ? `<b>HIGH ALERT</b>` : "");
}

function update(dt) {
  game.time += dt; game.phaseT += dt;
  if (game.phase === "passing" && game.phaseT >= phaseLen("passing")) startSkipping();
  else if (game.phase === "skipping") {
    const pts = (CFG.pointsPerPeriod / phaseLen("skipping")) * dt * scoreMult();
    game.score += pts; game.periodScore += pts;
    if (game.phaseT >= phaseLen("skipping")) { periodSurvived(); if (game.state !== "playing") return; }
  }
  updatePlayer(dt);
  updateRestrooms();
  updateCrowd(dt);
  updateStaff(dt, crowdCoverCount());
  if (game.state === "playing") { updateObjects(dt); updateHeat(dt); }
}

// =====================================================================================
// Hiding: entering, staying, getting booted
// =====================================================================================
function spotBlocked(sp) {   // why this spot can't be used right now ("" if it can)
  if (sp.kind === "locker") return game.lockerUses > 0 ? "" : "No locker uses left this period";
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
  if (why) { toast(why); playBlip([180], 0.08, "square", 0.04); return false; }
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
    } else if ((st.state === "patrol" || st.state === "return") && st.suspicion > 0.5 && d < st.type.visionRange) {
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
  const key = sp.kind === "classroom" ? `${sp.room}:${sp.lootVer}:${sp.loot.length}:${sp.prizeTaken}` : "";
  if (lootEl.dataset.key === key) return;
  lootEl.dataset.key = key; lootEl.innerHTML = "";
  if (sp.kind !== "classroom") return;
  const grab = TEACHER_TYPES[sp.teacher].grabSec ?? CFG.rooms.grabSec;
  sp.loot.forEach((k, i) => {
    const b = document.createElement("button"); b.type = "button";
    b.innerHTML = `${ITEM_TYPES[k].icon} ${ITEM_TYPES[k].label}<small>-${grab}s</small>`;
    b.addEventListener("click", () => grabLoot(i));
    lootEl.appendChild(b);
  });
  if (sp.R.rarePrize && !sp.prizeTaken) {
    const b = document.createElement("button"); b.type = "button"; b.className = "prize";
    b.innerHTML = `🗄️ ${sp.R.rarePrize.label}<small>+${sp.R.rarePrize.points} · -${grab}s</small>`;
    b.addEventListener("click", () => grabLoot("prize"));
    lootEl.appendChild(b);
  }
  if (!lootEl.children.length) lootEl.innerHTML = `<span class="none">Nothing left on the desks.</span>`;
}
function grabLoot(i) {
  const sp = player.hidden;
  if (!sp || sp.kind !== "classroom" || game.state !== "playing") return;
  const TT = TEACHER_TYPES[sp.teacher];
  if (i === "prize") {
    if (sp.prizeTaken) return;
    sp.prizeTaken = true;
    havoc("rarePrize", sp.R.rarePrize.points, "Confiscated stash!", { x: player.x, z: player.z });
  } else {
    if (!addItem(sp.loot[i])) return;   // inventory full: nothing happens
    sp.loot.splice(i, 1);
  }
  player.hideT += TT.grabSec ?? CFG.rooms.grabSec;
  if (Math.random() < TT.backfire) roomBackfire(sp);
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
  const w = window.innerWidth, h = window.innerHeight;
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
    else if (sp.kind === "restroom") text = blocked ? "Restroom · used" : `Restroom · sweep in ${Math.max(0, Math.ceil(sp.nextSweep - game.time))}s`;
    else { text = `Room ${sp.room}${sp.R.label ? " · " + sp.R.label : ""} · ${TEACHER_TYPES[sp.teacher].label}${blocked ? (sp.used ? " · used" : " · guarded") : ""}`; if (sp.teacher === "sub") cls += " sub"; }
    if (blocked) cls += " off"; else if (reach) cls += " near";
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
    case "wheelieChair": {
      const seat = m(new THREE.BoxGeometry(0.5, 0.08, 0.5), 0x2c3e66); seat.position.y = 0.45;
      const back = m(new THREE.BoxGeometry(0.5, 0.5, 0.06), 0x2c3e66); back.position.set(0, 0.75, -0.24);
      const post = m(new THREE.CylinderGeometry(0.04, 0.04, 0.35, 6), 0x555555); post.position.y = 0.25;
      for (const a of [0, 1.26, 2.51, 3.77, 5.03]) { const l = m(new THREE.BoxGeometry(0.05, 0.05, 0.32), 0x333333); l.rotation.y = a; l.position.set(Math.sin(a) * 0.15, 0.06, Math.cos(a) * 0.15); }
      break;
    }
    case "gum": m(new THREE.BoxGeometry(0.16, 0.05, 0.09), 0xff8fc8); break;
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
function removeObject(o) { scene.remove(o.mesh); scene.remove(o.ring); o.dead = true; }
function clearObjects() { for (const o of objects) removeObject(o); objects.length = 0; }

function pickWeighted(pairs) {
  let r = Math.random() * pairs.reduce((a, [, w]) => a + w, 0);
  for (const [k, w] of pairs) if ((r -= w) <= 0) return k;
  return pairs[0][0];
}
function spawnHallItems() {
  const lying = objects.filter((o) => o.state === "pickup").length;
  const table = Object.entries(ITEM_TYPES).map(([k, T]) => [k, T.spawnWeight]);
  for (let i = 0; i < CFG.items.hallSpawnsPerPeriod && lying + i < CFG.items.maxLying; i++) {
    for (let tries = 0; tries < 12; tries++) {
      const h = Math.floor(Math.random() * HALLS.length), t = rand(1.5, HALLS[h].len - 1.5), [lo, hi] = latLimits(h, t);
      const p = hallPos(h, t, rand(lo, hi));
      if (Math.hypot(p.x - player.x, p.z - player.z) < 8) continue;
      const key = pickWeighted(table);
      spawnObject(key, "pickup", p.x, REST_Y[key] ?? 0.04, p.z, { life: CFG.rooms.hallItemLifeSec });
      break;
    }
  }
}

// ---- hotbar ----
const hotbarEl = $("hotbar");
for (let i = 0; i < CFG.items.slots; i++) {
  const b = document.createElement("button"); b.className = "slot empty"; b.type = "button";
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

function selectSlot(i) {
  if (game.state !== "playing") return;
  const it = game.hotbar[i]; if (!it) return;
  if (player.hidden) { toast("Not while you're hiding"); return; }
  if (player.ride || player.dazeT > 0 || player.slipT > 0) return;
  if (game.aim?.slot === i) { cancelAim(); return; }
  const T = ITEM_TYPES[it.key];
  if (T.kind === "instant") { consumeSlot(i); toast(T.line); havoc(it.key, T.points, T.label, { x: player.x, z: player.z }); return; }
  game.aim = { slot: i, key: it.key, id: null, sx: 0, sy: 0, cx: 0, cy: 0 };
  $("aim").hidden = false;
  $("aimText").textContent = T.kind === "ride" ? "Flick to launch the wheelie chair" : `Flick to throw the ${T.label.toLowerCase()}`;
  renderHotbar();
}
function cancelAim() { if (!game.aim) return; game.aim = null; $("aim").hidden = true; arc.visible = false; renderHotbar(); }

// ---- aiming: drag anywhere, the dotted arc shows where it will go, release to throw ----
const aimEl = $("aim");
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
function release(a) {
  const T = ITEM_TYPES[a.key], L = flickLaunch(a);
  player.heading = Math.atan2(L.dx, L.dz);
  consumeSlot(a.slot);
  cancelAim();
  if (T.kind === "ride") { startRide(L); return; }
  const o = spawnObject(a.key, "flying", player.x + L.dx * 0.45, THROW_Y, player.z + L.dz * 0.45, launchVel(T, L));
  if (T.bounces) o.maxBounces = Math.floor(rand(T.bounces[0], T.bounces[1] + 1));
  playBlip([300, 520], 0.06, "triangle", 0.05);   // whoosh
}

const ARC_N = 30;
const arc = new THREE.Points(new THREE.BufferGeometry().setAttribute("position", new THREE.BufferAttribute(new Float32Array(ARC_N * 3), 3)),
  new THREE.PointsMaterial({ color: 0xffe066, size: 0.26, transparent: true, opacity: 0.95, depthTest: false }));
arc.visible = false; arc.renderOrder = 5; arc.frustumCulled = false; scene.add(arc);
function updateAimPreview() {
  const a = game.aim;
  if (!a || a.id === null || Math.hypot(a.cx - a.sx, a.cy - a.sy) < CFG.items.minFlickPx) { arc.visible = false; return; }
  const T = ITEM_TYPES[a.key], L = flickLaunch(a), pos = arc.geometry.attributes.position, step = 0.04;
  const sim = { x: player.x + L.dx * 0.45, y: T.kind === "ride" ? 0.1 : THROW_Y, z: player.z + L.dz * 0.45, vx: 0, vy: 0, vz: 0 };
  if (T.kind === "ride") { sim.vx = L.dx * T.rideSpeed; sim.vz = L.dz * T.rideSpeed; } else Object.assign(sim, launchVel(T, L));
  let i = 0, stopped = false;
  for (let k = 0; k < 120 && i < ARC_N; k++) {
    if (!stopped) {
      if (T.kind !== "ride") { sim.vy -= T.gravity * step; if (T.glide) sim.vy = Math.max(sim.vy, -0.9); }
      const nx = sim.x + sim.vx * step, nz = sim.z + sim.vz * step;
      if (!lineOfSight(sim.x, sim.z, nx, nz) || sim.y + sim.vy * step < 0.05) stopped = true;
      else { sim.x = nx; sim.z = nz; sim.y += sim.vy * step; }
    }
    if (k % 4 === 0) pos.setXYZ(i++, sim.x, sim.y, sim.z);
  }
  pos.needsUpdate = true; arc.visible = true;
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
    else if (o.state === "trap") trapCheck(o);
    else if (o.state === "resting" && o.key === "whoopee") stepOnCushion(o);
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
    const fading = (o.state === "pickup" || o.state === "resting") && o.life < CFG.items.blinkSec;
    o.mesh.visible = !(fading && Math.sin(o.life * 18) < 0);
    const reach = pickable(o) && game.state === "playing" && !player.hidden && Math.hypot(o.x - player.x, o.z - player.z) < CFG.items.pickupRange;
    o.ring.material.opacity = reach ? pulse : pickable(o) ? 0.12 : 0;
    o.ring.position.set(o.x, 0.03, o.z);
  }
}
function flyObject(o, dt) {
  const T = o.T;
  o.vy -= T.gravity * dt;
  if (T.glide) o.vy = Math.max(o.vy, -0.9);
  if (wallBounce(o, dt, T.bounces ? 0.8 : 0.15)) { if (T.bounces) bounceNoise(o); else if (T.glide) o.vy = Math.min(o.vy, -2.5); }
  o.x += o.vx * dt; o.z += o.vz * dt; o.y += o.vy * dt;
  if (o.y > LAYOUT.wallHeight - 0.2) { o.y = LAYOUT.wallHeight - 0.2; o.vy = -Math.abs(o.vy) * 0.5; }
  if (o.key === "paperAirplane") { for (const c of crowd) if (isActive(c) && Math.hypot(c.x - o.x, c.z - o.z) < 1.3) o.flown.add(c); }
  if (o.key === "spitball") {
    for (const c of crowd) if (isActive(c) && o.y < 1.7 && Math.hypot(c.x - o.x, c.z - o.z) < 0.45) {
      c.slipT = 0.35; havoc("spitball", T.hitPoints, "Spitball! Ew!", { x: o.x, z: o.z }); removeObject(o); return;
    }
    for (const st of staff) if (o.y < 2.1 && Math.hypot(st.x - o.x, st.z - o.z) < 0.5) {   // bad idea
      popup(`You hit the ${st.type.name}...`, "bad"); st.suspicion = Math.max(st.suspicion, 0.9);
      st.distractT = 1.5; st.dX = player.x; st.dZ = player.z; removeObject(o); return;
    }
  }
  const r = REST_Y[o.key] ?? 0.04;
  if (o.y <= r) {
    o.y = r;
    if (T.bounces && o.bounces < o.maxBounces && Math.abs(o.vy) > 1.2) { o.vy = -o.vy * T.restitution; o.bounces++; bounceNoise(o); }
    else landObject(o);
  }
}
function landObject(o) {
  const T = o.T;
  o.vy = 0;
  if (o.key !== "basketball") o.vx = o.vz = 0;
  switch (o.key) {
    case "paperAirplane": {
      const n = o.flown.size, near = crowd.filter((c) => isActive(c) && Math.hypot(c.x - o.x, c.z - o.z) < 2.5).length;
      const crowdLand = near >= T.crowdLandCount;
      if (n) havoc("paperAirplane", n * T.perStudent + (crowdLand ? T.crowdLandBonus : 0), `Airplane over ${n} kid${n === 1 ? "" : "s"}${crowdLand ? " · crowd landing!" : ""}`, { x: o.x, z: o.z });
      else popup("The airplane lands. Nobody notices.", "meh");
      o.state = "spent"; o.life = 1.5; break;
    }
    case "spitball": o.state = "spent"; o.life = 0.4; break;
    case "bananaPeel": o.state = "trap"; o.life = T.lifeSec; o.mesh.rotation.y = Math.random() * 6; break;
    case "whoopee": o.state = "resting"; o.life = T.lifeSec; cushionNoise(o); break;
    case "basketball": o.state = "rolling"; break;
    default: o.state = "resting"; o.life = 10;
  }
}
function rollObject(o, dt) {
  const k = Math.exp(-1.6 * dt); o.vx *= k; o.vz *= k;
  wallBounce(o, dt, 0.7);
  o.x += o.vx * dt; o.z += o.vz * dt; o.y = REST_Y[o.key] ?? 0.04;
  o.mesh.rotation.x += Math.hypot(o.vx, o.vz) * dt * 4;
  if (Math.hypot(o.vx, o.vz) < 0.25) { o.state = "resting"; o.life = o.T.lingerSec; }
}
function bounceNoise(o) {
  playFootstep(o.x, o.z, true);
  const pts = Math.round(o.T.bouncePoints * scoreMult());
  game.score += pts; popup(`+${pts} bounce`, "small");
  makeNoise(o.x, o.z, o.T.noiseRadius, false, o);
}
function cushionNoise(o) {
  if (o.noiseCD > 0) return;
  o.noiseCD = 3;
  playBlip([95, 70, 110, 60], 0.09, "sawtooth", 0.1);   // pfffft
  havoc("whoopee", o.T.points, "PFFFT!", { x: o.x, z: o.z, loud: true });
  makeNoise(o.x, o.z, o.T.noiseRadius, true, o);
}
function stepOnCushion(o) {
  if (o.age < 1 || o.noiseCD > 0) return;
  const on = (x, z, r) => Math.hypot(x - o.x, z - o.z) < r;
  if (crowd.some((c) => isActive(c) && on(c.x, c.z, 0.5)) || staff.some((s) => on(s.x, s.z, 0.55)) || (!player.hidden && on(player.x, player.z, 0.45))) cushionNoise(o);
}
// A noise: staff nearby either come to investigate (pull) or just turn and look.
function makeNoise(x, z, radius, pull) {
  for (const st of staff) {
    const d = Math.hypot(st.x - x, st.z - z);
    if (d > radius || st.state === "chase" || st.state === "bust" || st.stunT > 0) continue;
    if (pull && !st.type.stationary) {
      st.state = "search"; st.searchT = -Math.min(8, d / (st.type.chaseSpeed * 0.8));
      st.lastX = st.tx = x; st.lastZ = st.tz = z; st.suspicion = Math.max(st.suspicion, 0.3);
    } else { st.distractT = 2.2; st.dX = x; st.dZ = z; }
  }
}
function trapCheck(o) {
  const T = o.T;
  for (const st of staff) {
    if (st.type.stationary || st.stunT > 0 || Math.hypot(st.x - o.x, st.z - o.z) > 0.55) continue;
    st.stunT = T.slipStaffSec;
    if (st.state === "chase" || st.state === "bust") { st.state = "search"; st.searchT = 0; st.lastX = st.tx = player.x; st.lastZ = st.tz = player.z; }
    playBlip([700, 300], 0.12, "sawtooth", 0.07);
    havoc("bananaStaff", T.staffPoints, `Wipeout! The ${st.type.name} slips`, { x: o.x, z: o.z, loud: true });
    removeObject(o); return;
  }
  for (const c of crowd) {
    if (!isActive(c) || c.slipT > 0 || Math.hypot(c.x - o.x, c.z - o.z) > 0.45) continue;
    c.slipT = T.slipStudentSec;
    havoc("bananaStudent", T.studentPoints, "A kid slips!", { x: o.x, z: o.z });
    if (++o.slips >= 2) { removeObject(o); return; }
  }
  if (o.age > 1.2 && !player.hidden && !player.ride && player.slipT <= 0 && Math.hypot(player.x - o.x, player.z - o.z) < 0.45) {
    player.slipT = T.slipPlayerSec; toast("You slipped on your own banana peel!"); removeObject(o);
  }
}

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
    c.slipT = 1.2; havoc("chairStudent", T.studentPoints, "Chair vs. student!", { x: c.x, z: c.z, loud: true });
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
function scoreMult() { return game.lastDay ? CFG.security.lastDayScoreMult : 1; }
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
  const flow = Math.min(game.heatPending, H.maxRisePerSec * dt);
  game.heatPending -= flow;
  game.heat = Math.min(100, game.heat + flow);
  if (player.hidden) game.heat = Math.max(0, game.heat - H.hiddenCoolPerSec * dt);
  if (before < H.passingCatchAt && game.heat >= H.passingCatchAt) {
    pa("heatHigh");
    banner("HEAT RISING<small>Staff can now detain you during passing periods too.</small>", 2.6);
  }
}
const popupsEl = $("popups");
function popup(text, cls = "") {
  const el = document.createElement("div"); el.className = "pop " + cls; el.textContent = text;
  popupsEl.appendChild(el); setTimeout(() => el.remove(), 1600);
  while (popupsEl.children.length > 4) popupsEl.firstChild.remove();
}

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

const debug = new URLSearchParams(location.search).has("debug");
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
  updateAimPreview();
  drawObjects();
  updateMarkers();
  updateSpotsUI();
  updateHud();
  renderer.render(scene, camera);
  if (debug) { fpsAcc += dt; fpsN++; if (fpsAcc > 0.5) { ui.fps.textContent = `${Math.round(fpsN / fpsAcc)} fps`; fpsAcc = fpsN = 0; } }
});

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
    roomInfo() { return SPOTS.filter((sp) => sp.kind === "classroom").map((sp) => ({ room: sp.room, type: sp.roomType, teacher: sp.teacher, loot: [...sp.loot], i: SPOTS.indexOf(sp) })); },
    hideT() { return player.hideT; },
    setHeat(h, s) { if (h != null) { game.heat = h; game.heatPending = 0; } if (s != null) game.security = s; },
    heat() { return { heat: game.heat, pending: game.heatPending, security: game.security, lastDay: game.lastDay }; },
    objects() { return objects.map((o) => ({ key: o.key, state: o.state, x: o.x, y: o.y, z: o.z, bounces: o.bounces, life: o.life })); },
    dropItem(key, dx, dz) { const o = spawnObject(key, "pickup", player.x + dx, REST_Y[key] ?? 0.04, player.z + dz); return o.id; },
    hotbar() { return game.hotbar.map((s) => s && `${s.key}${s.uses > 1 ? "x" + s.uses : ""}`); },
    playerState() { return { slipT: player.slipT, dazeT: player.dazeT, riding: !!player.ride, x: player.x, z: player.z }; },
    staffFull(k) { const s = staff[k]; return { state: s.state, stunT: s.stunT, distractT: s.distractT, x: s.x, z: s.z, key: s.key }; },
    searchTo(k, x, z) { const st = staff[k]; st.state = "search"; st.searchT = -30; st.lastX = st.tx = x; st.lastZ = st.tz = z; },
    nodes() { return NODES.map((n) => ({ id: n.id, x: n.x, z: n.z })); },
    phaseLens() { return { passing: phaseLen("passing"), skipping: phaseLen("skipping") }; },
    insideWalls() {   // how many people are standing inside a wall (should be 0)
      const inWall = (x, z) => WALLS.some((b) => x > b.x0 + 0.05 && x < b.x1 - 0.05 && z > b.z0 + 0.05 && z < b.z1 - 0.05);
      return { crowd: crowd.filter((c) => c.mode === "wander" && inWall(c.x, c.z)).length, staff: staff.filter((s) => inWall(s.x, s.z)).length };
    },
  });
}
