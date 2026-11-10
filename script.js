const menuButton=document.querySelector('.menu');
const nav=document.querySelector('.nav');
menuButton?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.textContent=open?'×':'☰';});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton?.setAttribute('aria-expanded','false');if(menuButton)menuButton.textContent='☰';}));
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
const glow=document.querySelector('.cursor-glow');
if(glow&&matchMedia('(pointer:fine)').matches){window.addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px';},{passive:true});}
