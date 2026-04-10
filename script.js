// -- Full-page Moving Stars Canvas ------------------------------------------
(function () {
  const canvas = document.getElementById("stars-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const NUM_STARS = 220;
  let stars = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function newStar() {
    return {
      x:            Math.random() * canvas.width,
      y:            Math.random() * canvas.height,
      r:            Math.random() * 1.6 + 0.3,
      alpha:        Math.random() * 0.7 + 0.2,
      speed:        Math.random() * 0.22 + 0.04,
      twinkleSpeed: Math.random() * 0.016 + 0.004,
      twinkleDir:   Math.random() > 0.5 ? 1 : -1,
    };
  }

  function init() {
    resize();
    stars = Array.from({ length: NUM_STARS }, newStar);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const s of stars) {
      s.y -= s.speed;
      s.alpha += s.twinkleSpeed * s.twinkleDir;
      if (s.alpha >= 1)   { s.alpha = 1;   s.twinkleDir = -1; }
      if (s.alpha <= 0.15){ s.alpha = 0.15; s.twinkleDir = 1; }
      if (s.y < -4) {
        s.x = Math.random() * canvas.width;
        s.y = canvas.height + 4;
      }
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  init();
  draw();
})();

// -- Theme toggle (legacy) ---------------------------------------------------
const toggle = document.getElementById("themeToggle");
if (toggle) {
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
}
