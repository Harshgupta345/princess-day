// script.js - all animations + helpers
document.addEventListener('DOMContentLoaded', ()=>{
  // add page fade
  document.querySelectorAll('.container').forEach(c=> c.classList.add('page-fade'));

  // init floating hearts
  initFloatingHearts(12);

  // if typewriter present
  const tw = document.querySelector('.typewriter');
  if(tw){
    startTypewriter(tw, tw.dataset.text || tw.textContent, 28);
  }

  // button sparkle on click
  document.addEventListener('click', (e)=>{
    const t = e.target.closest('.btn, .open-btn');
    if(t) {
      sparkleAt(e.clientX, e.clientY, 12);
      t.classList.add('pulse');
      setTimeout(()=>t.classList.remove('pulse'), 900);
    }
  });

  // emoji rain on pages with data-emoji attribute
  if(document.body.dataset.emoji === 'true'){
    startEmojiRain(14);
  }

  // listen for confetti triggers (element with data-confetti="true")
  document.querySelectorAll('[data-confetti]').forEach(el=>{
    el.addEventListener('click', ()=> {
      runConfettiUltra();
    });
  });

  // attach fancy click open on index -> if any
  const openBtn = document.getElementById('openBtn');
  if(openBtn){
    openBtn.addEventListener('click', (ev)=>{
      // sparkle + bounce
      openBtn.animate([{transform:'scale(1)'},{transform:'scale(1.06)'},{transform:'scale(1)'}], {duration:550,easing:'cubic-bezier(.2,.9,.3,1)'});
      setTimeout(()=> location.href='letter.html', 550);
    });
  }
});

/* ---------- Typewriter ---------- */
function startTypewriter(el, text, speed=30){
  el.textContent = '';
  let i=0;
  const id = setInterval(()=>{
    el.textContent += text.charAt(i);
    i++;
    if(i>=text.length) clearInterval(id);
  }, speed);
}

/* ---------- Floating Hearts ---------- */
function initFloatingHearts(count=10){
  const container = document.createElement('div');
  container.className = 'floating-hearts';
  for(let i=0;i<count;i++){
    const hb = document.createElement('div');
    hb.className = 'heart-bubble';
    hb.innerHTML = '💗';
    // random start left + delay + size
    const left = Math.random()*100;
    const size = 18 + Math.random()*36;
    hb.style.left = left + '%';
    hb.style.bottom = (-10 - Math.random()*30) + 'px';
    hb.style.width = size+'px';
    hb.style.height = size+'px';
    hb.style.fontSize = (size*0.6)+'px';
    hb.style.opacity = 0.8 + Math.random()*0.2;
    container.appendChild(hb);
    animateHeartUp(hb);
  }
  document.body.appendChild(container);

  // stickers (two)
  addFloatingSticker('🌸', '10%', '20%', 8000, 18);
  addFloatingSticker('🎀', '84%', '30%', 9000, -18);
}

function animateHeartUp(el){
  const dur = 8000 + Math.random()*9000;
  const leftDrift = (Math.random()*40 - 20);
  el.animate([
    { transform: `translateY(0) translateX(0) rotate(${Math.random()*40-20}deg)` , opacity: el.style.opacity },
    { transform: `translateY(-120vh) translateX(${leftDrift}px) rotate(${Math.random()*360}deg)`, opacity: 0.05 }
  ], { duration: dur, iterations: Infinity, easing: 'linear', delay: Math.random()*2000 });
}

/* ---------- Sparkles on click ---------- */
function sparkleAt(cx, cy, n=10){
  const parent = document.createElement('div');
  parent.style.position='fixed';
  parent.style.left=0; parent.style.top=0; parent.style.pointerEvents='none'; parent.style.zIndex=9999;
  document.body.appendChild(parent);
  for(let i=0;i<n;i++){
    const s = document.createElement('div');
    s.className='sparkle';
    s.style.left = (cx + (Math.random()*80 - 40)) + 'px';
    s.style.top = (cy + (Math.random()*30 - 15)) + 'px';
    s.style.width = s.style.height = (6 + Math.random()*10) + 'px';
    s.style.background = ['#FFD166','#FF6AA2','#9AD0F5','#8BE4D4'][Math.floor(Math.random()*4)];
    parent.appendChild(s);
    const dx = (Math.random()*220 - 110);
    const dy = (-60 - Math.random()*220);
    s.animate([
      { transform: 'translate(0,0) scale(1)', opacity:1 },
      { transform: `translate(${dx}px, ${dy}px) scale(.3) rotate(${Math.random()*360}deg)`, opacity:0 }
    ], { duration: 700 + Math.random()*600, easing:'cubic-bezier(.2,.9,.2,1)' });
    setTimeout(()=> s.remove(), 1400);
  }
  setTimeout(()=> parent.remove(), 1600);
}

/* ---------- Emoji Rain ---------- */
function startEmojiRain(count=12){
  const parent = document.createElement('div');
  parent.className = 'emoji-rain';
  document.body.appendChild(parent);
  const emojis = ['💖','✨','🌸','🎀','🍬','🩷','🐱‍👤','🧸'];
  for(let i=0;i<count;i++){
    const e = document.createElement('div');
    e.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    e.style.position='absolute';
    e.style.left = (Math.random()*100) + '%';
    e.style.top = (-10 - Math.random()*20)+'%';
    e.style.fontSize = (18 + Math.random()*26)+'px';
    e.style.opacity = 0.95;
    e.style.pointerEvents = 'none';
    parent.appendChild(e);
    const dur = 3000 + Math.random()*2400;
    e.animate([
      { transform: 'translateY(0) rotate(0deg)', opacity:1 },
      { transform: `translateY(110vh) rotate(${Math.random()*720-360}deg)`, opacity:0.1 }
    ], { duration: dur, iterations: Infinity, delay: Math.random()*2000, easing:'linear' });
  }
}

/* ---------- Confetti Ultra ---------- */
function runConfettiUltra(){
  const parent = document.createElement('div');
  parent.className = 'confetti';
  document.body.appendChild(parent);
  const colors = ['#FF6AA2','#FFD166','#9AD0F5','#8BE4D4','#FFB8E6'];
  const total = 90;
  for(let i=0;i<total;i++){
    const el = document.createElement('div');
    el.style.position='absolute';
    el.style.left = (50 + (Math.random()*140 - 70)) + '%';
    el.style.top = (10 + Math.random()*10) + '%';
    el.style.width = (6 + Math.random()*14)+'px';
    el.style.height = (10 + Math.random()*16)+'px';
    el.style.background = colors[Math.floor(Math.random()*colors.length)];
    el.style.opacity = 0.95;
    el.style.transform = `rotate(${Math.random()*360}deg)`;
    el.style.borderRadius = (Math.random()>0.6? '2px':'50%');
    parent.appendChild(el);

    const dx = (Math.random()*800 - 400);
    const dy = (300 + Math.random()*500);
    const rot = (Math.random()*720 - 360);
    el.animate([
      { transform: `translate(0,0) rotate(0deg)`, opacity:1 },
      { transform: `translate(${dx}px, ${dy}px) rotate(${rot}deg)`, opacity:0.15 }
    ], { duration: 1600 + Math.random()*1600, easing:'cubic-bezier(.2,.9,.2,1)' });

    setTimeout(()=> el.remove(), 3400);
  }

  // extra heart bursts
  for(let j=0;j<8;j++){
    setTimeout(()=> {
      const h = document.createElement('div');
      h.className='heart-burst';
      h.style.position='absolute';
      h.style.left = (40 + Math.random()*20)+'%';
      h.style.top = (20 + Math.random()*10)+'%';
      h.style.fontSize = (20 + Math.random()*40)+'px';
      h.textContent = '💗';
      parent.appendChild(h);
      h.animate([
        { transform:'translateY(0) scale(1)', opacity:1 },
        { transform:'translateY(240px) scale(.2)', opacity:0 }
      ], { duration: 1400 + Math.random()*600, easing:'cubic-bezier(.2,.9,.2,1)' });
      setTimeout(()=> h.remove(), 2100);
    }, j*140);
  }

  setTimeout(()=> parent.remove(), 3800);
}

/* ---------- Floating Sticker helper ---------- */
function addFloatingSticker(emoji, left='10%', top='10%', dur=8000, rot=10){
  const s = document.createElement('div');
  s.className='sticker';
  s.innerHTML = `<div style="font-size:28px">${emoji}</div>`;
  s.style.left = left; s.style.top = top; s.style.zIndex = 2; s.style.transform = `rotate(${rot}deg)`;
  document.body.appendChild(s);
  s.animate([
    { transform: `translateY(0) rotate(${rot}deg)`},
    { transform: `translateY(-18px) rotate(${rot+6}deg)`},
    { transform: `translateY(0) rotate(${rot}deg)`}
  ], { duration: dur, iterations: Infinity, easing: 'ease-in-out' });
}
