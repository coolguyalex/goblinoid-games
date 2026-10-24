// Hallway Skip — build step 2 prototype.
// Step 1: one looping hallway, joystick, a hall monitor that chases, a crowd that thins, and the bell.
// Step 2: tap-to-interact and hiding spots: lockers, restrooms, classrooms (teacher and sub boot timers).
import * as THREE from "three";

// =====================================================================================
// CONFIG — every tunable number lives here. Values marked "guess" come from the spec.
// =====================================================================================
const CFG = {
  periodsPerDay: 6,
  passingSec: 25,                 // guess
  skippingSec: 60,                // guess
  pointsPerPeriod: 100,           // earned across the skipping phase (~5/3 per second)

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
    count: 50,
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

  footsteps: { hearRange: 20, patrolInterval: 0.55, chaseInterval: 0.3, volume: 0.55 },
  monitorsPerPeriod: [1, 1, 2, 2, 2, 3],   // within-day difficulty (expanded in build step 4)
  render: { maxPixelRatio: 1.75, coneRays: 28 },
};

// Staff are data: adding a type later (security guard, principal) is one entry here.
const STAFF_TYPES = {
  hallMonitor: {
    patrolSpeed: 2.0, chaseSpeed: 3.7,
    visionRange: 9, visionHalfAngleDeg: 50,   // slow, wide vision cone
    sweepDeg: 25, sweepRate: 0.9,             // looks side to side while patrolling
    vestColor: 0xe8c547, scale: 1.12,
  },
};

// Floor plan: a ring corridor around a block of classrooms (one floor, fixed layout).
const LAYOUT = {
  outerHalf: { x: 22, z: 13 },    // inside face of the outer walls
  innerHalf: { x: 17, z: 8 },     // classroom block
  lockerDepth: 0.3,
  wallHeight: 3.2,
  doorS: [7.5, 15.5, 23.5, 31.5, 49.5, 67.5, 75.5, 83.5, 91.5, 109.5],  // classroom doors, ring distance
  entranceS: 19.5,
  hideLockerS: [4, 26, 33, 42, 63, 70, 88, 95, 101, 117],   // lockers big enough to hide in
  restroomS: [55, 112],
};

// Things pushed against the outer wall. Ring coordinates; each must sit within one straight hallway.
const OBSTACLES = [
  { name: "vending machine", s: 13.0, halfLen: 0.7, depth: 0.85, height: 2.0, color: 0xc0392b },
  { name: "vending machine", s: 14.6, halfLen: 0.7, depth: 0.85, height: 2.0, color: 0x2e86c1 },
  { name: "trophy case",     s: 49.5, halfLen: 1.4, depth: 0.7,  height: 1.9, color: 0x8e6b3e },
  { name: "water fountain",  s: 104,  halfLen: 0.45, depth: 0.5, height: 1.0, color: 0xbfc9d1 },
  { name: "bench",           s: 80,   halfLen: 1.3, depth: 0.55, height: 0.5, color: 0x7a5230 },
];

// Hiding spots are data: a new kind is one entry here (placement lives in LAYOUT).
const SPOT_TYPES = {
  locker:    { label: "Locker", side: "outer", halfW: 0.45, maxStaySec: 15,
               stayLine: "Cramped. Smells like old gym socks.", timeoutLine: "Too cramped! You tumble out." },
  restroom:  { label: "Restroom", side: "outer", halfW: 0.75, maxStaySec: 45,
               stayLine: "Nobody questions a long bathroom break.", timeoutLine: "Someone's pounding on the stall door. Time to go." },
  classroom: { label: "Room", side: "inner", halfW: 0.6 },   // stay time comes from who's teaching
};
const TEACHER_TYPES = {
  teacher: { label: "Teacher", bootSec: 4, silhouette: 0x2b2f3a,
             stayLine: "\"Can I help you?\"", bootLine: "\"Nice try. Out.\"" },
  sub:     { label: "Sub", bootSec: 14, silhouette: 0x3a7d44,
             stayLine: "The sub is reading a magazine. You're under a desk.", bootLine: "The sub finally looks up: \"Are you even in this class?\"" },
};

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
// Ring corridor: positions along the hallway as (s = distance around the loop, lat = sideways offset)
// Angles everywhere: heading a points along (sin a, cos a) in the x/z plane.
// =====================================================================================
const RX = (LAYOUT.innerHalf.x + LAYOUT.outerHalf.x) / 2;     // corridor centerline
const RZ = (LAYOUT.innerHalf.z + LAYOUT.outerHalf.z) / 2;
const INNER_LAT = LAYOUT.innerHalf.x - RX;                    // classroom wall (negative)
const OUTER_LAT = LAYOUT.outerHalf.x - LAYOUT.lockerDepth - RX; // locker faces (positive)
const SEGS = [
  { x0: -RX, z0: RZ, dx: 1, dz: 0, len: 2 * RX, nx: 0, nz: 1 },
  { x0: RX, z0: RZ, dx: 0, dz: -1, len: 2 * RZ, nx: 1, nz: 0 },
  { x0: RX, z0: -RZ, dx: -1, dz: 0, len: 2 * RX, nx: 0, nz: -1 },
  { x0: -RX, z0: -RZ, dx: 0, dz: 1, len: 2 * RZ, nx: -1, nz: 0 },
];
let PERIM = 0;
for (const seg of SEGS) { seg.s0 = PERIM; PERIM += seg.len; }

function segAt(s) { s = mod(s, PERIM); for (const seg of SEGS) if (s < seg.s0 + seg.len) return seg; return SEGS[3]; }
function ringPos(s, lat, out = {}) {
  s = mod(s, PERIM);
  const seg = segAt(s), t = s - seg.s0;
  out.x = seg.x0 + seg.dx * t + seg.nx * lat;
  out.z = seg.z0 + seg.dz * t + seg.nz * lat;
  return out;
}
function ringProject(x, z) {
  let best = { d: Infinity, s: 0, lat: 0 };
  for (const seg of SEGS) {
    const t = clamp((x - seg.x0) * seg.dx + (z - seg.z0) * seg.dz, 0, seg.len);
    const cx = seg.x0 + seg.dx * t, cz = seg.z0 + seg.dz * t;
    const d = Math.hypot(x - cx, z - cz);
    if (d < best.d) best = { d, s: seg.s0 + t, lat: (x - cx) * seg.nx + (z - cz) * seg.nz };
  }
  return best;
}
function ringDelta(a, b) { let d = mod(b - a, PERIM); if (d > PERIM / 2) d -= PERIM; return d; }
function ringHeading(s, dir) { const seg = segAt(s); return Math.atan2(seg.dx * dir, seg.dz * dir); }

// =====================================================================================
// Collision world: axis-aligned boxes {x0, z0, x1, z1}
// =====================================================================================
const WALLS = [];
{
  const ox = LAYOUT.outerHalf.x - LAYOUT.lockerDepth, oz = LAYOUT.outerHalf.z - LAYOUT.lockerDepth;
  const ix = LAYOUT.innerHalf.x, iz = LAYOUT.innerHalf.z, T = 2;
  WALLS.push({ x0: -ix, z0: -iz, x1: ix, z1: iz });                        // classroom block
  WALLS.push({ x0: -ox - T, z0: -oz - T, x1: ox + T, z1: -oz });           // north
  WALLS.push({ x0: -ox - T, z0: oz, x1: ox + T, z1: oz + T });             // south
  WALLS.push({ x0: -ox - T, z0: -oz - T, x1: -ox, z1: oz + T });           // west
  WALLS.push({ x0: ox, z0: -oz - T, x1: ox + T, z1: oz + T });             // east
  for (const ob of OBSTACLES) {
    const a = ringPos(ob.s - ob.halfLen, OUTER_LAT - ob.depth), b = ringPos(ob.s + ob.halfLen, OUTER_LAT);
    ob.box = { x0: Math.min(a.x, b.x), z0: Math.min(a.z, b.z), x1: Math.max(a.x, b.x), z1: Math.max(a.z, b.z) };
    WALLS.push(ob.box);
  }
}

// Distance along a ray to the first wall (Infinity if none within maxT).
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
  box(LAYOUT.innerHalf.x * 2, H, LAYOUT.innerHalf.z * 2, 0xd9cdb0, 0, H / 2, 0);
  box(ox * 2 + 1, H, 0.5, 0xcfc5ad, 0, H / 2, -oz - 0.25);
  box(ox * 2 + 1, H, 0.5, 0xcfc5ad, 0, H / 2, oz + 0.25);
  box(0.5, H, oz * 2 + 1, 0xcfc5ad, -ox - 0.25, H / 2, 0);
  box(0.5, H, oz * 2 + 1, 0xcfc5ad, ox + 0.25, H / 2, 0);
  // stripe along the classroom block
  box(LAYOUT.innerHalf.x * 2 + 0.02, 0.25, LAYOUT.innerHalf.z * 2 + 0.02, 0x6b8cae, 0, 1.05, 0);
}

// Lockers along the outer walls (one instanced mesh), skipping obstacles and the entrance.
{
  const spacing = 0.62, positions = [];
  for (let s = 0.4; s < PERIM; s += spacing) {
    const seg = segAt(s), t = s - seg.s0;
    if (t < 0.4 || t > seg.len - 0.4) continue;                                  // corners
    if (Math.abs(ringDelta(s, LAYOUT.entranceS)) < 2.0) continue;                  // entrance doors
    if (OBSTACLES.some((o) => Math.abs(ringDelta(s, o.s)) < o.halfLen + 0.35)) continue;
    if (LAYOUT.hideLockerS.some((h) => Math.abs(ringDelta(s, h)) < 0.75)) continue;
    if (LAYOUT.restroomS.some((h) => Math.abs(ringDelta(s, h)) < 1.0)) continue;
    positions.push(s);
  }
  const lockerGeo = new THREE.BoxGeometry(0.56, 2.0, LAYOUT.lockerDepth);
  const lockers = new THREE.InstancedMesh(lockerGeo, lambert(0xffffff), positions.length);
  const m = new THREE.Object3D(), c = new THREE.Color();
  positions.forEach((s, i) => {
    const p = ringPos(s, OUTER_LAT + LAYOUT.lockerDepth / 2);
    m.position.set(p.x, 1.0, p.z);
    m.rotation.y = ringHeading(s, 1) - Math.PI / 2;   // face lies flat against the wall
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
function addSpot(kind, s, extra = {}) {
  const T = SPOT_TYPES[kind], sign = T.side === "outer" ? 1 : -1;   // +1: wall is on the locker side
  const wallLat = sign > 0 ? OUTER_LAT : INNER_LAT;
  const tag = document.createElement("div"); tag.className = "itag"; tagsEl.appendChild(tag);
  const sp = { kind, T, s, sign, wallLat, frontLat: wallLat - sign * 0.6, glow: [], used: false, tag, tagText: "", tagClass: "", ...extra };
  SPOTS.push(sp);
  return sp;
}
const wallRot = (s) => ringHeading(s, 1) - Math.PI / 2;   // box faces lie flat against the wall

for (const s of LAYOUT.hideLockerS) {
  const sp = addSpot("locker", s), h = wallRot(s);
  const p = ringPos(s, OUTER_LAT + LAYOUT.lockerDepth / 2);
  const m = box(0.9, 2.1, LAYOUT.lockerDepth, 0x7d9a86, p.x, 1.05, p.z); m.rotation.y = h;
  sp.glow.push(m.material);
  const v = ringPos(s, OUTER_LAT - 0.01);
  for (let k = 0; k < 3; k++) { const sl = box(0.5, 0.035, 0.02, 0x2a3a30, v.x, 1.62 + k * 0.09, v.z); sl.rotation.y = h; }
}
for (const s of LAYOUT.restroomS) {
  const sp = addSpot("restroom", s, { nextSweep: 0 }), h = wallRot(s);
  const p = ringPos(s, OUTER_LAT + LAYOUT.lockerDepth - 0.04);
  const d = box(1.3, 2.25, 0.08, 0x3f9c9a, p.x, 1.125, p.z); d.rotation.y = h;
  sp.glow.push(d.material);
  const q = ringPos(s, OUTER_LAT + LAYOUT.lockerDepth - 0.09);
  const plaque = box(0.42, 0.42, 0.03, 0xf4f4f4, q.x, 2.55, q.z); plaque.rotation.y = h;
  const q2 = ringPos(s, OUTER_LAT + LAYOUT.lockerDepth - 0.11);
  const fig = box(0.12, 0.2, 0.02, 0x3f9c9a, q2.x, 2.5, q2.z); fig.rotation.y = h;
  const head = box(0.09, 0.09, 0.02, 0x3f9c9a, q2.x, 2.66, q2.z); head.rotation.y = h;
}
LAYOUT.doorS.forEach((s, i) => {
  const p = ringPos(s, INNER_LAT + 0.03), h = wallRot(s);
  const door = box(1.2, 2.2, 0.08, 0x8b5a2b, p.x, 1.1, p.z); door.rotation.y = h;
  const w = ringPos(s, INNER_LAT + 0.08);
  const win = box(0.5, 0.6, 0.04, 0xa8d8ff, w.x, 1.55, w.z); win.rotation.y = h;
  // the tell: who's visible through the window, plus a sticky note on a sub's door
  const w2 = ringPos(s, INNER_LAT + 0.105);
  const sil = box(0.2, 0.3, 0.01, 0x2b2f3a, w2.x, 1.5, w2.z); sil.rotation.y = h;
  const n = ringPos(s + 0.32, INNER_LAT + 0.09);
  const note = box(0.2, 0.2, 0.02, 0xf7e463, n.x, 1.15, n.z); note.rotation.y = h;
  const sp = addSpot("classroom", s, { room: 101 + i, teacher: "teacher", sil, note });
  sp.glow.push(door.material);
});
function rollSubs() {
  const rooms = SPOTS.filter((sp) => sp.kind === "classroom");
  const [lo, hi] = CFG.hiding.subsPerDay;
  let n = lo + Math.floor(Math.random() * (hi - lo + 1));
  for (const sp of rooms) sp.teacher = "teacher";
  while (n > 0) { const sp = pick(rooms); if (sp.teacher !== "sub") { sp.teacher = "sub"; n--; } }
  for (const sp of rooms) { sp.sil.material.color.setHex(TEACHER_TYPES[sp.teacher].silhouette); sp.note.visible = sp.teacher === "sub"; }
}

// Entrance doors, obstacles.
{
  const p = ringPos(LAYOUT.entranceS, OUTER_LAT + LAYOUT.lockerDepth - 0.02);
  const d = box(2.6, 2.5, 0.08, 0x5d7c99, p.x, 1.25, p.z); d.rotation.y = ringHeading(LAYOUT.entranceS, 1) - Math.PI / 2;
  const sign = ringPos(LAYOUT.entranceS, OUTER_LAT + LAYOUT.lockerDepth - 0.06);
  const e = box(1.4, 0.3, 0.05, 0x2ecc71, sign.x, 2.75, sign.z); e.rotation.y = d.rotation.y;
}
for (const ob of OBSTACLES) {
  const b = ob.box;
  box(b.x1 - b.x0, ob.height, b.z1 - b.z0, ob.color, (b.x0 + b.x1) / 2, ob.height / 2, (b.z0 + b.z1) / 2);
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
  hidden: null, hideT: 0, hideArmed: false, graceT: 0, pushSpot: null, pushT: 0,
  mesh: makePerson({ body: 0x8a8f99, hood: 0x7b808a }),   // the gray hoodie
};

// ---------- crowd (instanced: one mesh for bodies, one for heads) ----------
const crowd = [];
const crowdBodies = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.26, 0.3, 1.0, 6).translate(0, 0.5, 0), lambert(0xffffff), CFG.crowd.count);
const crowdHeads = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(0.21, 0).translate(0, 1.24, 0), lambert(0xffffff), CFG.crowd.count);
crowdBodies.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
crowdHeads.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
scene.add(crowdBodies, crowdHeads);
{
  const c = new THREE.Color();
  for (let i = 0; i < CFG.crowd.count; i++) {
    crowdBodies.setColorAt(i, c.setHex(pick(SHIRT_COLORS)));
    crowdHeads.setColorAt(i, c.setHex(pick(SKIN_COLORS)));
    crowd.push({ s: 0, lat: 0, x: 0, z: 0, targetLat: 0, speed: 1, dir: 1, mode: "gone", leaveAt: 0, doorS: 0,
      spawnAt: 0, retargetT: 0, bob: Math.random() * 10, heading: 0, scale: rand(0.88, 1.08) });
  }
}

// ---------- staff ----------
const staff = [];
const markersEl = document.getElementById("markers");
function spawnStaff(typeKey, s) {
  const T = STAFF_TYPES[typeKey];
  const p = ringPos(s, 0);
  const mesh = makePerson({ body: T.vestColor, skin: pick(SKIN_COLORS), scale: T.scale, hat: 0x2c3e66 });
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
  const st = { type: T, x: p.x, z: p.z, s, dir: Math.random() < 0.5 ? 1 : -1, facing: 0, state: "patrol",
    suspicion: 0, lastX: 0, lastZ: 0, lastVX: 0, lastVZ: 0, searchT: 0, stepT: 0, sweep: Math.random() * 10,
    tx: 0, tz: 0, pauseT: 0, bustSpot: null, mesh, cone, alert, edge };
  st.facing = ringHeading(s, st.dir);
  staff.push(st);
  return st;
}
function clearStaff() {
  for (const st of staff) { scene.remove(st.mesh); scene.remove(st.cone); st.cone.geometry.dispose(); st.alert.remove(); st.edge.remove(); }
  staff.length = 0;
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
const input = { x: 0, y: 0 };
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
  if (e.key === "Escape" && game.state === "playing") pause();
  if (e.key.toLowerCase() === "e" && game.state === "playing" && !e.repeat) {   // desktop: enter / leave
    if (player.hidden) exitSpot(false);
    else { const sp = nearestSpot(); if (sp) enterSpot(sp); }
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
const game = { state: "title", day: 1, period: 1, phase: "passing", phaseT: 0, score: 0, time: 0 };
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

function resetGame() {
  game.day = 1; game.period = 1; game.score = 0; game.time = 0;
  // kid walks in from the entrance
  const p = ringPos(LAYOUT.entranceS, OUTER_LAT - 0.8);
  player.x = p.x; player.z = p.z; player.vx = player.vz = 0;
  player.heading = ringHeading(LAYOUT.entranceS, 1);
  cam.yaw = player.heading; manualCamT = 0;
  // full hallway: everyone already out and about
  for (const c of crowd) {
    c.s = rand(0, PERIM);
    if (Math.abs(ringDelta(c.s, LAYOUT.entranceS)) < 2.5) c.s += 4;
    c.lat = c.targetLat = rand(INNER_LAT + 0.4, OUTER_LAT - 0.4);
    const q = ringPos(c.s, c.lat); c.x = q.x; c.z = q.z;
    c.speed = rand(CFG.crowd.speedMin, CFG.crowd.speedMax); c.dir = Math.random() < 0.5 ? 1 : -1;
    c.mode = "wander"; c.retargetT = rand(1, 4);
  }
  clearStaff();
  player.hidden = null; player.mesh.visible = true; player.graceT = 0; player.pushT = 0; player.pushSpot = null;
  ui.hide.hidden = true;
  resetSpotsForPeriod();
  for (const sp of SPOTS) if (sp.kind === "restroom") sp.nextSweep = rand(12, CFG.hiding.restroomSweepEverySec);
  rollSubs();
  startPassing(true);
}
function resetSpotsForPeriod() {
  game.lockerUses = CFG.hiding.lockerUsesPerPeriod;
  for (const sp of SPOTS) sp.used = false;
}

function startPassing(first) {
  game.phase = "passing"; game.phaseT = 0;
  const P = CFG.passingSec;
  for (const c of crowd) {
    c.leaveAt = rand(CFG.crowd.leaveStartFrac, CFG.crowd.leaveEndFrac) * P;
    c.doorS = pick(LAYOUT.doorS);
    if (!first) { c.mode = "spawning"; c.spawnAt = rand(0, CFG.crowd.floodSpreadSec); c.speed = rand(CFG.crowd.speedMin, CFG.crowd.speedMax); }
  }
  // add hall monitors for this period, far from the kid
  const want = CFG.monitorsPerPeriod[Math.min(game.period, CFG.monitorsPerPeriod.length) - 1];
  const ps = ringProject(player.x, player.z).s;
  while (staff.length < want) spawnStaff("hallMonitor", ps + PERIM / 2 + staff.length * 17);
}

function startSkipping() {
  game.phase = "skipping"; game.phaseT = 0;
  playBell();
  banner("TARDY BELL<small>Hall's clearing out. Stay hidden until the next bell.</small>");
  for (const c of crowd) if (c.mode === "wander" || c.mode === "toClass") { c.mode = "toClass"; c.speed = CFG.crowd.tardyRushSpeed; }
}

function periodSurvived() {
  playBell();
  game.period++;
  resetSpotsForPeriod();
  if (player.hidden?.kind === "classroom") exitSpot(false, "Bell! You slip out with the class.");
  if (game.period > CFG.periodsPerDay) {
    banner(`DAY ${game.day} SURVIVED!<small>Day ${game.day + 1} starts now. New subs today.</small>`, 3);
    game.day++; game.period = 1;
    rollSubs();
  } else {
    banner(`BELL! +${CFG.pointsPerPeriod}<small>Period ${game.period - 1} skipped. Blend into the crowd.</small>`);
  }
  startPassing(false);
}

function caught(st) {
  game.state = "caught";
  playBlip([660, 520, 390, 260], 0.13, "sawtooth", 0.07);
  $("caughtText").textContent = `The hall monitor walks you back to class. Day ${game.day}, period ${game.period} · Score ${Math.floor(game.score)}`;
  $("caught").hidden = false;
  ui.hide.hidden = true;
  stick.id = look.id = null; stickBase.style.display = stickKnob.style.display = "none";
}

function pause() {
  if (game.state !== "playing") return;
  game.state = "paused"; $("paused").hidden = false;
  stick.id = look.id = null; keys.clear(); stickBase.style.display = stickKnob.style.display = "none";
}
function onOverlayTap() {
  initAudio();
  if (game.state === "title" || game.state === "caught") {
    resetGame();
    $("title").hidden = true; $("caught").hidden = true;
    game.state = "playing";
    banner("PASSING PERIOD<small>Blend in. When the bell rings, don't be in class.</small>");
    tryFullscreenLandscape();
  } else if (game.state === "paused") {
    $("paused").hidden = true; game.state = "playing";
  }
  clock.getDelta();
}
for (const id of ["title", "caught", "paused"]) $(id).addEventListener("click", onOverlayTap);
$("hpLeave").addEventListener("click", () => { if (game.state === "playing") exitSpot(false); });
window.addEventListener("blur", pause);
document.addEventListener("visibilitychange", () => { if (document.hidden) pause(); });

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
function latLimits(s) {
  let lo = INNER_LAT + 0.35, hi = OUTER_LAT - 0.35;
  for (const ob of OBSTACLES) if (Math.abs(ringDelta(s, ob.s)) < ob.halfLen + 0.5) hi = Math.min(hi, OUTER_LAT - ob.depth - 0.35);
  return [lo, hi];
}

function updatePlayer(dt) {
  readInput();
  player.graceT = Math.max(0, player.graceT - dt);
  if (player.hidden) { updateHiding(dt); return; }
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
  const P = CFG.passingSec;
  for (const c of crowd) {
    if (c.mode === "gone") continue;
    if (c.mode === "spawning") {
      if (game.phaseT < c.spawnAt) continue;
      c.mode = "exiting"; c.s = c.doorS + rand(-0.4, 0.4); c.lat = INNER_LAT + 0.1; c.targetLat = rand(INNER_LAT + 0.5, OUTER_LAT - 0.5);
      c.dir = Math.random() < 0.5 ? 1 : -1; c.doorS = pick(LAYOUT.doorS);
      const q = ringPos(c.s, c.lat); c.x = q.x; c.z = q.z;
    }
    const [lo, hi] = latLimits(c.s);
    if (c.mode === "exiting") {
      c.lat += Math.sign(c.targetLat - c.lat) * c.speed * dt;
      if (Math.abs(c.targetLat - c.lat) < 0.15) c.mode = "wander";
    } else if (c.mode === "wander") {
      c.s += c.dir * c.speed * dt;
      c.retargetT -= dt;
      if (c.retargetT <= 0) { c.targetLat = rand(lo, hi); c.retargetT = rand(1.5, 4); if (Math.random() < 0.15) c.dir *= -1; }
      c.lat += (c.targetLat - c.lat) * damp(1.5, dt);
      if (game.phase === "passing" && game.phaseT >= c.leaveAt) c.mode = "toClass";
    } else if (c.mode === "toClass") {
      const ds = ringDelta(c.s, c.doorS);
      if (Math.abs(ds) > 0.3) { c.s += Math.sign(ds) * Math.min(Math.abs(ds), c.speed * dt); c.dir = Math.sign(ds); c.lat += (Math.max(lo, c.lat - 0.5) - c.lat) * damp(1, dt); }
      else { c.lat -= c.speed * dt; if (c.lat < INNER_LAT + 0.05) c.mode = "gone"; }
    }
    c.lat = c.mode === "toClass" || c.mode === "exiting" ? clamp(c.lat, INNER_LAT, hi) : clamp(c.lat, lo, hi);
    ringPos(c.s, c.lat, tmp);
    // smooth world position (also rounds off the ring's corners)
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
    crowdMatrix.rotation.y = c.heading;
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

function canSeePlayer(st, rangeMult, needCone) {
  if (player.hidden) return { seen: false, d: Infinity };
  const T = st.type, dx = player.x - st.x, dz = player.z - st.z, d = Math.hypot(dx, dz);
  if (d > T.visionRange * rangeMult) return { seen: false, d };
  if (needCone && Math.abs(angDiff(st.facing, Math.atan2(dx, dz))) > (T.visionHalfAngleDeg * Math.PI) / 180) return { seen: false, d };
  return { seen: lineOfSight(st.x, st.z, player.x, player.z), d };
}

function updateStaff(dt, cover) {
  const D = CFG.detection;
  for (const st of staff) {
    const T = st.type;
    st.sweep += dt * T.sweepRate;
    let speed = 0;
    if (st.pauseT > 0) {   // "I saw you go in there." — a beat before chasing
      st.pauseT -= dt;
      st.facing = lerpAngle(st.facing, Math.atan2(player.x - st.x, player.z - st.z), damp(8, dt));
      st.mesh.position.set(st.x, 0, st.z); st.mesh.rotation.y = st.facing;
      updateCone(st);
      continue;
    }

    if (st.state === "patrol" || st.state === "return") {
      const look = canSeePlayer(st, 1, true);
      if (look.seen) {
        const closeness = 1 - look.d / T.visionRange;
        let rate = D.suspicionRate * (D.farRateFrac + (1 - D.farRateFrac) * closeness);
        rate /= 1 + cover * CFG.crowd.coverPerStudent;
        if (game.phase === "passing") rate /= D.passingBeatMult;
        st.suspicion += rate * dt;
        if (look.d < D.instantRange && game.phase === "skipping") st.suspicion = 1;
      } else st.suspicion = Math.max(0, st.suspicion - D.decayRate * dt);

      if (st.suspicion >= 1) { startChase(st); }
      else if (st.state === "return") {
        speed = T.patrolSpeed;
        const tgt = ringPos(st.s, 0);
        if (moveToward(st, tgt.x, tgt.z, speed, dt) < 0.3) st.state = "patrol";
      } else {
        // patrol loop; slow down and squint while suspicious
        speed = T.patrolSpeed * (st.suspicion > 0.05 ? D.suspiciousSlow : 1);
        st.s += st.dir * speed * dt;
        const tgt = ringPos(st.s, 0);
        st.x = tgt.x; st.z = tgt.z;
        const base = ringHeading(st.s, st.dir);
        const want = st.suspicion > 0.05 ? Math.atan2(player.x - st.x, player.z - st.z) : base + Math.sin(st.sweep) * (T.sweepDeg * Math.PI / 180);
        st.facing = lerpAngle(st.facing, want, damp(st.suspicion > 0.05 ? 5 : 3, dt));
      }
    } else if (st.state === "chase") {
      const look = canSeePlayer(st, D.chaseSightRangeMult, false);
      speed = T.chaseSpeed;
      if (look.seen) {
        st.lastX = player.x; st.lastZ = player.z; st.lastVX = player.vx; st.lastVZ = player.vz;
        moveToward(st, player.x, player.z, speed, dt);
        if (look.d < D.catchRadius && player.graceT <= 0) { caught(st); return; }
      } else {
        st.state = "search"; st.searchT = 0;
        const g = { x: st.lastX + st.lastVX * D.predictSec, z: st.lastZ + st.lastVZ * D.predictSec };
        collide(g, 0.4); st.tx = g.x; st.tz = g.z;
      }
    } else if (st.state === "bust") {
      // they saw you duck into a hiding spot: go yank you out
      speed = T.chaseSpeed;
      const sp = st.bustSpot, f = ringPos(sp.s, sp.frontLat);
      if (!player.hidden && canSeePlayer(st, D.chaseSightRangeMult, false).seen) startChase(st);
      else if (moveToward(st, f.x, f.z, speed, dt) < 0.75) {
        if (player.hidden === sp) {
          exitSpot(true, sp.kind === "locker" ? "The hall monitor yanks the locker open: \"I saw you go in there.\""
            : sp.kind === "restroom" ? "The hall monitor bangs on the stall: \"I saw you go in there.\""
            : "The hall monitor leans in the door: \"That one's mine.\"");
          startChase(st); st.pauseT = CFG.hiding.bustPauseSec;
        } else { st.state = "search"; st.searchT = 0; st.lastX = st.tx = f.x; st.lastZ = st.tz = f.z; }
      }
    } else if (st.state === "search") {
      st.searchT += dt;
      speed = T.chaseSpeed * 0.8;
      const reached = moveToward(st, st.searchT < 0.6 ? st.lastX : st.tx, st.searchT < 0.6 ? st.lastZ : st.tz, speed, dt) < 0.3;
      if (reached) { speed = 0; st.facing += Math.sin(game.time * 3) * dt * 2.5; }   // look around
      if (canSeePlayer(st, 1, true).seen) startChase(st);
      else if (st.searchT > D.searchSec) {
        st.state = "return"; st.suspicion = 0;
        const pr = ringProject(st.x, st.z); st.s = pr.s;
        st.dir = Math.random() < 0.5 ? 1 : -1;
        playBlip([330, 260], 0.12, "triangle", 0.05);   // "hmph"
      }
    }

    // footsteps
    if (speed > 0.2) {
      st.stepT += dt;
      const interval = st.state === "chase" ? CFG.footsteps.chaseInterval : CFG.footsteps.patrolInterval;
      if (st.stepT >= interval) { st.stepT = 0; playFootstep(st.x, st.z, st.state === "chase"); }
    }
    st.mesh.position.set(st.x, speed > 0.2 ? Math.abs(Math.sin(game.time * (st.state === "chase" ? 12 : 7))) * 0.06 : 0, st.z);
    st.mesh.rotation.y = st.facing;
    updateCone(st);
  }
}

function startChase(st) {
  if (st.state !== "chase") playBlip([520, 780], 0.1, "square", 0.08);   // "Hey!"
  st.state = "chase"; st.suspicion = 1;
  st.lastX = player.x; st.lastZ = player.z;
}

const CONE_COLORS = { patrol: new THREE.Color(0xfff2a8), suspicious: new THREE.Color(0xffa94d), chase: new THREE.Color(0xff4d4d) };
function updateCone(st) {
  const T = st.type, RAYS = CFG.render.coneRays, half = (T.visionHalfAngleDeg * Math.PI) / 180;
  const range = T.visionRange * (st.state === "chase" ? CFG.detection.chaseSightRangeMult : 1);
  const pos = st.cone.geometry.attributes.position;
  pos.setXYZ(0, st.x, 0.03, st.z);
  for (let i = 0; i <= RAYS; i++) {
    const a = st.facing - half + (2 * half * i) / RAYS, dx = Math.sin(a), dz = Math.cos(a);
    const len = Math.min(range, raycast(st.x, st.z, dx, dz, range));
    pos.setXYZ(i + 1, st.x + dx * len, 0.03, st.z + dz * len);
  }
  pos.needsUpdate = true;
  const key = st.state === "chase" || st.state === "search" || st.state === "bust" ? "chase" : st.suspicion > 0.05 ? "suspicious" : "patrol";
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
    const chasing = st.state === "chase" || st.state === "search" || st.state === "bust";
    const color = chasing ? "#ff4d4d" : st.suspicion > 0.05 ? "#ffa94d" : "#ffe066";
    proj.set(st.x, 2.0 * st.type.scale, st.z).applyMatrix4(camera.matrixWorldInverse);
    const behind = proj.z > -0.2;
    proj.set(st.x, 2.0 * st.type.scale, st.z).project(camera);
    const onScreen = !behind && Math.abs(proj.x) < 0.96 && Math.abs(proj.y) < 0.96;
    if (onScreen) {
      st.edge.style.display = "none";
      const txt = chasing ? "!" : st.suspicion > 0.05 ? "?" : "";
      st.alert.style.display = txt ? "block" : "none";
      if (txt) {
        st.alert.textContent = txt; st.alert.style.color = color;
        st.alert.style.left = ((proj.x + 1) / 2) * w + "px"; st.alert.style.top = ((1 - proj.y) / 2) * h + "px";
        st.alert.style.opacity = chasing ? 1 : 0.4 + 0.6 * st.suspicion;
      }
    } else {
      st.alert.style.display = "none";
      const v = proj.set(st.x - camera.position.x, 0, st.z - camera.position.z);
      const fx = Math.sin(cam.yaw), fz = Math.cos(cam.yaw);
      const fwd = v.x * fx + v.z * fz, right = v.x * -Math.cos(cam.yaw) + v.z * Math.sin(cam.yaw);
      const a = Math.atan2(right, fwd);                     // 0 = straight ahead (top of screen)
      const sx = Math.sin(a), sy = -Math.cos(a), rx = w / 2 - 34, ry = h / 2 - 34;
      const k = Math.min(rx / Math.max(Math.abs(sx), 1e-4), ry / Math.max(Math.abs(sy), 1e-4));
      const dist = Math.hypot(st.x - player.x, st.z - player.z);
      st.edge.style.display = "block";
      st.edge.style.left = w / 2 + sx * k - 13 + "px"; st.edge.style.top = h / 2 + sy * k - 12 + "px";
      st.edge.style.transform = `rotate(${a}rad)`;
      st.edge.style.borderBottomColor = color;
      st.edge.style.opacity = chasing ? 1 : clamp(1.2 - dist / 25, 0.35, 1);
    }
  }
}

let lastHud = "";
function updateHud() {
  const total = game.phase === "passing" ? CFG.passingSec : CFG.skippingSec;
  const left = Math.max(0, Math.ceil(total - game.phaseT));
  const label = `DAY ${game.day} · PERIOD ${game.period} · ${game.phase === "passing" ? "PASSING" : "SKIPPING"}`;
  const key = label + left + Math.floor(game.score) + "|" + game.lockerUses;
  if (key === lastHud) return;
  lastHud = key;
  ui.label.textContent = label;
  ui.timer.textContent = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}`;
  ui.phase.className = game.phase;
  ui.score.textContent = Math.floor(game.score);
  ui.uses.textContent = `LOCKERS ×${game.lockerUses}`;
  ui.uses.classList.toggle("out", game.lockerUses === 0);
}

function update(dt) {
  game.time += dt; game.phaseT += dt;
  if (game.phase === "passing" && game.phaseT >= CFG.passingSec) startSkipping();
  else if (game.phase === "skipping") {
    game.score += (CFG.pointsPerPeriod / CFG.skippingSec) * dt;
    if (game.phaseT >= CFG.skippingSec) periodSurvived();
  }
  updatePlayer(dt);
  updateRestrooms();
  updateCrowd(dt);
  updateStaff(dt, crowdCoverCount());
}

// =====================================================================================
// Hiding: entering, staying, getting booted
// =====================================================================================
function spotBlocked(sp) {   // why this spot can't be used right now ("" if it can)
  if (sp.kind === "locker") return game.lockerUses > 0 ? "" : "No locker uses left this period";
  if (sp.used) return sp.kind === "restroom" ? "You already hid in this restroom this period" : `Room ${sp.room} already kicked you out this period`;
  return "";
}
function spotFront(sp, out = {}) { return ringPos(sp.s, sp.frontLat, out); }
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
  const f = ringPos(sp.s, sp.frontLat - sp.sign * 0.1);
  player.x = f.x; player.z = f.z;
  const seg = segAt(sp.s);
  player.heading = Math.atan2(-sp.sign * seg.nx, -sp.sign * seg.nz);   // facing out into the hall
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
  const pr = ringProject(player.x, player.z), seg = segAt(pr.s);
  let target = null;
  for (const sp of SPOTS) {
    if (Math.abs(ringDelta(pr.s, sp.s)) > sp.T.halfW) continue;
    if (Math.abs(sp.wallLat - pr.lat) > CFG.interact.walkInDist) continue;
    if ((mx * seg.nx + mz * seg.nz) * sp.sign > 0.55) { target = sp; break; }   // pushing into the wall
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
  const title = sp.kind === "classroom" ? `Room ${sp.room} · ${TEACHER_TYPES[sp.teacher].label}` : `In the ${sp.T.label.toLowerCase()}`;
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

function updateRestrooms() {
  for (const sp of SPOTS) {
    if (sp.kind !== "restroom" || game.time < sp.nextSweep) continue;
    const J = CFG.hiding.restroomSweepJitterSec;
    sp.nextSweep = game.time + CFG.hiding.restroomSweepEverySec + rand(-J, J);
    if (player.hidden !== sp) continue;
    exitSpot(true, "Restroom sweep! A monitor shoos everyone out.");
    // the nearest monitor who isn't busy comes to see who that was
    const f = spotFront(sp, {});
    let best = null, bd = Infinity;
    for (const st of staff) { const d = Math.hypot(st.x - f.x, st.z - f.z); if (st.state !== "chase" && st.state !== "bust" && d < bd) { bd = d; best = st; } }
    if (best) { best.state = "search"; best.searchT = -Math.min(12, bd / (best.type.chaseSpeed * 0.8)); best.lastX = best.tx = f.x; best.lastZ = best.tz = f.z; }
  }
}

// Tap on a world object: find the spot whose on-screen outline (a vertical line from floor to door top) is nearest the finger.
const projA = new THREE.Vector3(), projB = new THREE.Vector3();
function handleTap(x, y) {
  if (player.hidden) return;
  const w = window.innerWidth, h = window.innerHeight;
  let best = null, bd = CFG.interact.tapRadiusPx;
  for (const sp of SPOTS) {
    if (spotDist(sp) > CFG.interact.range) continue;
    const p = ringPos(sp.s, sp.wallLat, tmp);
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
    const blocked = spotBlocked(sp);
    const reach = d < CFG.interact.range && !blocked;
    glowColor.setRGB(1, 0.86, 0.5).multiplyScalar(reach ? pulse : 0);
    for (const m of sp.glow) m.emissive.copy(glowColor);
    // name tag
    let show = d < CFG.interact.tagRange;
    if (show) {
      const p = ringPos(sp.s, sp.wallLat - sp.sign * 0.1, tmp);
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
    else { text = `Room ${sp.room} · ${TEACHER_TYPES[sp.teacher].label}${blocked ? " · used" : ""}`; if (sp.teacher === "sub") cls += " sub"; }
    if (blocked) cls += " off"; else if (reach) cls += " near";
    if (text !== sp.tagText) { sp.tag.textContent = text; sp.tagText = text; }
    if (cls !== sp.tagClass) { sp.tag.className = cls; sp.tagClass = cls; }
  }
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
  if (game.state === "playing") update(dt);
  if (bannerTimer > 0) { bannerTimer -= dt; if (bannerTimer <= 0) ui.banner.classList.remove("show"); }
  if (toastTimer > 0) { toastTimer -= dt; if (toastTimer <= 0) ui.toast.classList.remove("show"); }
  drawCrowd();
  updateCamera(dt);
  updateMarkers();
  updateSpotsUI();
  updateHud();
  renderer.render(scene, camera);
  if (debug) { fpsAcc += dt; fpsN++; if (fpsAcc > 0.5) { ui.fps.textContent = `${Math.round(fpsN / fpsAcc)} fps`; fpsAcc = fpsN = 0; } }
});

// small read-only hook for automated playtests
window.__hallwaySkip = { get state() { return { ...game, staff: staff.map((s) => ({ state: s.state, suspicion: s.suspicion })), crowdLeft: crowd.filter((c) => c.mode !== "gone").length,
  player: { x: player.x, z: player.z, hidden: player.hidden ? `${player.hidden.kind}${player.hidden.room ? " " + player.hidden.room : ""}` : null, graceT: player.graceT },
  spots: SPOTS.map((sp) => ({ kind: sp.kind, s: sp.s, room: sp.room, teacher: sp.teacher, blocked: spotBlocked(sp) })) }; }, CFG, STAFF_TYPES };
if (debug) {   // test-only helpers (only with ?debug in the URL)
  Object.assign(window.__hallwaySkip, {
    place(s, lat) { const p = ringPos(s, lat); player.x = p.x; player.z = p.z; },
    spotFront(i) { const sp = SPOTS[i], f = spotFront(sp, {}); return { x: f.x, z: f.z, wallLat: sp.wallLat, frontLat: sp.frontLat, s: sp.s, sign: sp.sign }; },
    faceSpot(i) { const sp = SPOTS[i], seg = segAt(sp.s); cam.yaw = player.heading = Math.atan2(sp.sign * seg.nx, sp.sign * seg.nz); manualCamT = 99; },
    staffTo(k, x, z, state) { const st = staff[k]; st.x = x; st.z = z; if (state) { st.state = state; st.suspicion = 1; } },
    setTime(t) { game.phaseT = t; },
    sweepNow(i) { SPOTS[i].nextSweep = game.time; },
  });
}
