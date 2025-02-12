// Floating heart animation
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 3 + 2 + "s";
  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 4000);
}

setInterval(createHeart, 500);

// Show game when button is clicked
function showGame() {
  document.getElementById("gameContainer").classList.remove("hidden");
  startGame();
}

// Simple Heart Catching Game
function startGame() {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 400;
  canvas.height = 300;

  let player = { x: 180, y: 260, width: 40, height: 40 };
  let hearts = [];
  let score = 0;

  function drawPlayer() {
    ctx.fillStyle = "red";
    ctx.fillRect(player.x, player.y, player.width, player.height);
  }

  function drawHearts() {
    ctx.fillStyle = "pink";
    hearts.forEach((heart, index) => {
      ctx.fillRect(heart.x, heart.y, 20, 20);
      heart.y += 2;
      if (heart.y > canvas.height) {
        hearts.splice(index, 1);
      }
      if (
        heart.y + 20 > player.y &&
        heart.x > player.x &&
        heart.x < player.x + player.width
      ) {
        score++;
        hearts.splice(index, 1);
      }
    });
  }

  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawHearts();
    requestAnimationFrame(gameLoop);
  }

  setInterval(() => {
    hearts.push({ x: Math.random() * 380, y: 0 });
  }, 1000);

  document.addEventListener("mousemove", (e) => {
    player.x = e.clientX - canvas.offsetLeft - player.width / 2;
  });

  gameLoop();
}
