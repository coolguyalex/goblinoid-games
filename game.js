// Pong 3D: a small Three.js placeholder game for testing static hosting.
// Player paddle is near the camera; the CPU paddle is at the far end.
import * as THREE from "three";

const FIELD_W = 10;          // left-right
const FIELD_L = 16;          // near-far
const PADDLE_W = 2.2;
const BALL_R = 0.25;
const WIN_SCORE = 7;
const CPU_SPEED = 7.2;       // units/second the CPU paddle can move

document.getElementById("ver").textContent = THREE.REVISION;

// ---------- scene ----------
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b1020);
scene.fog = new THREE.Fog(0x0b1020, 18, 40);

const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);

scene.add(new THREE.HemisphereLight(0xbcd2ff, 0x1a1030, 0.9));
const sun = new THREE.DirectionalLight(0xffffff, 1.4);
sun.position.set(4, 12, 6);
sun.castShadow = true;
sun.shadow.mapSize.set(1024, 1024);
Object.assign(sun.shadow.camera, { left: -10, right: 10, top: 10, bottom: -10 });
scene.add(sun);

// floor + center line
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(FIELD_W, FIELD_L),
  new THREE.MeshStandardMaterial({ color: 0x16224a, roughness: 0.85 })
);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

const line = new THREE.Mesh(
  new THREE.PlaneGeometry(FIELD_W, 0.06),
  new THREE.MeshBasicMaterial({ color: 0x3a4a85 })
);
line.rotation.x = -Math.PI / 2;
line.position.y = 0.01;
scene.add(line);

// side walls
const wallMat = new THREE.MeshStandardMaterial({ color: 0x2b3a78, emissive: 0x0d1430 });
for (const side of [-1, 1]) {
  const wall = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.6, FIELD_L), wallMat);
  wall.position.set(side * (FIELD_W / 2 + 0.15), 0.3, 0);
  wall.castShadow = wall.receiveShadow = true;
  scene.add(wall);
}

function makePaddle(color) {
  const m = new THREE.Mesh(
    new THREE.BoxGeometry(PADDLE_W, 0.5, 0.35),
    new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.25 })
  );
  m.castShadow = true;
  m.position.y = 0.25;
  scene.add(m);
  return m;
}
const player = makePaddle(0x5ad1ff);
const cpu = makePaddle(0xff7a7a);
player.position.z = FIELD_L / 2 - 0.6;
cpu.position.z = -FIELD_L / 2 + 0.6;

const ball = new THREE.Mesh(
  new THREE.SphereGeometry(BALL_R, 24, 16),
  new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xfff2b0, emissiveIntensity: 0.35 })
);
ball.castShadow = true;
ball.position.y = BALL_R;
scene.add(ball);

// ---------- state ----------
const vel = new THREE.Vector2();       // x = left-right, y = along z
let score = { you: 0, cpu: 0 };
let playing = false;
let serveTimer = 0;
let targetX = 0;                       // where the player wants the paddle
const keys = new Set();

const $ = (id) => document.getElementById(id);
const overlay = $("overlay");

function serve(towardPlayer) {
  ball.position.set(0, BALL_R, 0);
  const angle = (Math.random() - 0.5) * 0.9;
  const speed = 8;
  vel.set(Math.sin(angle) * speed, Math.cos(angle) * speed * (towardPlayer ? 1 : -1));
  serveTimer = 0.8;                    // short pause before the ball moves
}

function updateScore() {
  $("youScore").textContent = score.you;
  $("cpuScore").textContent = score.cpu;
}

function showOverlay(title, msg, button) {
  $("title").textContent = title;
  $("msg").textContent = msg;
  $("goBtn").textContent = button;
  overlay.hidden = false;
  playing = false;
}

function start() {
  if (score.you >= WIN_SCORE || score.cpu >= WIN_SCORE) {
    score = { you: 0, cpu: 0 };
    updateScore();
    serve(Math.random() < 0.5);
  }
  overlay.hidden = true;
  playing = true;
}
overlay.addEventListener("click", start);
serve(true);

// ---------- input ----------
const ndc = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const hit = new THREE.Vector3();

function pointerToX(clientX, clientY) {
  ndc.set((clientX / window.innerWidth) * 2 - 1, -(clientY / window.innerHeight) * 2 + 1);
  raycaster.setFromCamera(ndc, camera);
  if (raycaster.ray.intersectPlane(groundPlane, hit)) targetX = hit.x;
}
window.addEventListener("pointermove", (e) => pointerToX(e.clientX, e.clientY));
window.addEventListener("pointerdown", (e) => pointerToX(e.clientX, e.clientY));

window.addEventListener("keydown", (e) => {
  keys.add(e.key.toLowerCase());
  if ((e.key === " " || e.key === "Enter") && !playing) start();
  else if (e.key === "Escape" && playing) showOverlay("Paused", "Take a breather.", "Click or tap to resume");
});
window.addEventListener("keyup", (e) => keys.delete(e.key.toLowerCase()));
window.addEventListener("blur", () => {
  keys.clear();
  if (playing) showOverlay("Paused", "The game pauses when the window loses focus.", "Click or tap to resume");
});

// ---------- loop ----------
const halfW = FIELD_W / 2;
const paddleLimit = halfW - PADDLE_W / 2;
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

function bounceOffPaddle(paddle, dirZ) {
  // where on the paddle it hit (-1..1) steers the ball, like classic Pong
  const offset = clamp((ball.position.x - paddle.position.x) / (PADDLE_W / 2), -1, 1);
  const speed = Math.min(vel.length() * 1.05, 20);
  const angle = offset * 1.0;
  vel.set(Math.sin(angle) * speed, Math.cos(angle) * speed * dirZ);
}

function step(dt) {
  // player: keys nudge the target, mouse/touch set it directly
  const kb = (keys.has("arrowright") || keys.has("d") ? 1 : 0) - (keys.has("arrowleft") || keys.has("a") ? 1 : 0);
  if (kb) targetX = player.position.x + kb * 12 * dt * 3;
  targetX = clamp(targetX, -paddleLimit, paddleLimit);
  player.position.x += (targetX - player.position.x) * Math.min(1, dt * 18);

  // cpu: follows the ball with a speed cap, so it can be beaten
  const aim = vel.y < 0 ? ball.position.x : 0;
  const dx = clamp(aim - cpu.position.x, -CPU_SPEED * dt, CPU_SPEED * dt);
  cpu.position.x = clamp(cpu.position.x + dx, -paddleLimit, paddleLimit);

  if (serveTimer > 0) { serveTimer -= dt; return; }

  ball.position.x += vel.x * dt;
  ball.position.z += vel.y * dt;
  ball.rotation.x += vel.y * dt * 2;
  ball.rotation.z -= vel.x * dt * 2;

  // side walls
  if (Math.abs(ball.position.x) > halfW - BALL_R) {
    ball.position.x = Math.sign(ball.position.x) * (halfW - BALL_R);
    vel.x *= -1;
  }

  // paddles
  const nearZ = player.position.z - 0.175 - BALL_R;
  const farZ = cpu.position.z + 0.175 + BALL_R;
  if (vel.y > 0 && ball.position.z >= nearZ && ball.position.z <= nearZ + 0.6 &&
      Math.abs(ball.position.x - player.position.x) <= PADDLE_W / 2 + BALL_R) {
    ball.position.z = nearZ;
    bounceOffPaddle(player, -1);
  } else if (vel.y < 0 && ball.position.z <= farZ && ball.position.z >= farZ - 0.6 &&
      Math.abs(ball.position.x - cpu.position.x) <= PADDLE_W / 2 + BALL_R) {
    ball.position.z = farZ;
    bounceOffPaddle(cpu, 1);
  }

  // scoring
  if (ball.position.z > FIELD_L / 2 + 1) { score.cpu++; afterPoint(false); }
  else if (ball.position.z < -FIELD_L / 2 - 1) { score.you++; afterPoint(true); }
}

function afterPoint(youScored) {
  updateScore();
  if (score.you >= WIN_SCORE) showOverlay("You win!", `${score.you} – ${score.cpu}. The hosting works, too.`, "Play again");
  else if (score.cpu >= WIN_SCORE) showOverlay("CPU wins", `${score.you} – ${score.cpu}. Better luck next round.`, "Play again");
  serve(!youScored);
}

function resize() {
  const w = window.innerWidth, h = window.innerHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  // pull the camera back on narrow (portrait) screens so the whole field fits
  const back = w / h < 1 ? 13 + (1 - w / h) * 9 : 13;
  camera.position.set(0, back * 0.78, back);
  camera.lookAt(0, 0, -1);
  camera.updateProjectionMatrix();
}
window.addEventListener("resize", resize);
resize();

const clock = new THREE.Clock();
renderer.setAnimationLoop(() => {
  const dt = Math.min(clock.getDelta(), 0.05);   // avoid huge jumps after a tab switch
  if (playing) step(dt);
  renderer.render(scene, camera);
});
