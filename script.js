const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = {
  x: 100,
  y: 300,
  width: 50,
  height: 50,
  speed: 5
};

let keys = {};

document.addEventListener("keydown", e => (keys[e.key] = true));
document.addEventListener("keyup", e => (keys[e.key] = false));

function drawPlayer() {
  const img = new Image();
  img.src = "assets/player.png";
  ctx.drawImage(img, player.x, player.y, player.width, player.height);
}

function update() {
  if (keys["ArrowUp"]) player.y -= player.speed;
  if (keys["ArrowDown"]) player.y += player.speed;
  if (keys["ArrowLeft"]) player.x -= player.speed;
  if (keys["ArrowRight"]) player.x += player.speed;
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  update();
  drawPlayer();
  requestAnimationFrame(gameLoop);
}

gameLoop();
