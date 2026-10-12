const $$=s=>[...document.querySelectorAll(s)];
// fade in as she scrolls
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
$$('.rv').forEach(el=>io.observe(el));

const starsCanvas = document.getElementById("stars");
const ctx = starsCanvas.getContext("2d");

let stars = [];

function resizeStars() {
  const dpr = window.devicePixelRatio || 1;

  starsCanvas.width = window.innerWidth * dpr;
  starsCanvas.height = window.innerHeight * dpr;
  starsCanvas.style.width = window.innerWidth + "px";
  starsCanvas.style.height = window.innerHeight + "px";

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  createStars();
}

function createStars() {
  stars = [];

  const count = Math.floor(
    (window.innerWidth * window.innerHeight) / 7000
  );

  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.7 + 0.3,
      speed: Math.random() * 0.02 + 0.005
    });
  }
}

function drawStars(time) {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (const star of stars) {
    const twinkle =
      star.alpha +
      Math.sin(time * star.speed) * 0.25;

    ctx.beginPath();
    ctx.arc(
      star.x,
      star.y,
      star.radius,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = `rgba(255, 240, 220, ${Math.max(0.1, twinkle)})`;
    ctx.fill();
  }

  requestAnimationFrame(drawStars);
}

window.addEventListener("resize", resizeStars);

resizeStars();
requestAnimationFrame(drawStars);

// placeholder if a photo is missing
$$('img.photo').forEach(i=>{const miss=()=>{i.removeAttribute('src');i.classList.add('noimg')};i.addEventListener('error',miss);if(i.complete&&!i.naturalWidth)miss()});
// placeholder if a video is missing
$$('video').forEach(v=>v.addEventListener('error',()=>{v.removeAttribute('src');v.poster='';v.removeAttribute('controls');v.style.background='repeating-linear-gradient(45deg,#f5e6e3,#f5e6e3 8px,#f9efec 8px,#f9efec 16px)'}));
// music (never autoplays)
const au=document.getElementById('song'),mb=document.getElementById('music');
mb.onclick=()=>{if(au.paused){au.play().then(()=>mb.setAttribute('aria-pressed','true')).catch(()=>{})}else{au.pause();mb.setAttribute('aria-pressed','false')}};
/* ---- Flow ---- */
$('#openGift').onclick=()=>{$('#flash').classList.add('on');confetti(60);setTimeout(()=>{show('#letter');$('#flash').classList.remove('on')},900)};
$('#toBook').onclick=()=>{show('#bookwrap');$('#book').focus()};

setTimeout(()=>$('#openGift').classList.add('on'),10500);