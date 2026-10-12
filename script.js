/* ---- Starfield (reacts to touch) ---- */
const sc=document.getElementById('stars'),sx=sc.getContext('2d');let S=[],W,H;
function size(){W=sc.width=innerWidth;H=sc.height=innerHeight;S=Array.from({length:Math.min(90,W/5)},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.4+.3,p:Math.random()*6,b:0}))}
size();addEventListener('resize',size);
(function loop(t){sx.clearRect(0,0,W,H);for(const s of S){s.b*=.95;s.y-=.05;if(s.y<0)s.y=H;
sx.globalAlpha=.35+.35*Math.sin(t/900+s.p)+s.b;sx.fillStyle='#f6e6cf';sx.beginPath();sx.arc(s.x,s.y,s.r+s.b*2,0,7);sx.fill()}requestAnimationFrame(loop)})(0);
sc.addEventListener('pointerdown',e=>S.forEach(s=>{if(Math.hypot(s.x-e.clientX,s.y-e.clientY)<90)s.b=1}));

/* ---- Helpers ---- */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
function show(id){$$('.screen').forEach(s=>s.classList.remove('on'));$(id).classList.add('on')}
let tt;function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('on'),2200)}
const cc=$('#confetti'),cx=cc.getContext('2d');let C=[];
function confetti(n=140){cc.width=innerWidth;cc.height=innerHeight;const col=['#e9c9a0','#f1d3d0','#b86b77','#fff6e0'];
for(let i=0;i<n;i++)C.push({x:Math.random()*cc.width,y:-20-Math.random()*200,vx:Math.random()*2-1,vy:2+Math.random()*3,w:5+Math.random()*5,r:Math.random()*6,c:col[i%4]});
if(C.length===n)(function f(){cx.clearRect(0,0,cc.width,cc.height);C=C.filter(p=>p.y<cc.height+20);C.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.r+=.1;cx.fillStyle=p.c;cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillRect(0,0,p.w,p.w*.6);cx.restore()});if(C.length)requestAnimationFrame(f)})()}

/* ---- Photos: shows a placeholder until assets/photos/photoXX.jpg exists ---- */
$$('img.photo').forEach(i=>{const miss=()=>{i.removeAttribute('src');i.classList.add('noimg');i.style.background='';i.parentElement.classList.add('ph')};i.addEventListener('error',miss);if(i.complete&&!i.naturalWidth&&i.getAttribute('src'))miss()});



/* ---- Finale ---- */
$('#cont').onclick=()=>{show('#end');confetti(120)};
$('#back').onclick=()=>show('#bookwrap');
$('#replay').onclick=()=>{for(let i=N-1;i>0;i--)setTimeout(()=>go(-1),(N-i)*140)};

/* ---- Music (never autoplays) ---- */
const au = $('#song');
const mb = $('#music');

mb.onclick = () => {
  if (au.paused) {
    au.play()
      .then(() => {
        mb.setAttribute('aria-pressed', 'true');
      })
      .catch(() => {
        toast('Music file could not be played.');
      });
  } else {
    au.pause();
    mb.setAttribute('aria-pressed', 'false');
  }
};

/* Show the Open Your Gift button after the opening lines */
setTimeout(()=>$('#openGift').classList.add('on'),10500);
document.getElementById("openGift").onclick = () => {
  window.location.href = "index1.html";
};