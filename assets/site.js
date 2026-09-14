document.documentElement.classList.add('js-nav');
const menu=document.querySelector('.menu'),nav=document.querySelector('.nav');
menu?.addEventListener('click',()=>{const open=nav?.classList.toggle('open');menu.setAttribute('aria-expanded',String(!!open));menu.textContent=open?'閉じる':'メニュー'});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('open')){nav.classList.remove('open');menu?.setAttribute('aria-expanded','false');if(menu)menu.textContent='メニュー';menu?.focus()}});
const reveals=[...document.querySelectorAll('.reveal')];
if('IntersectionObserver' in window&&reveals.length){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}}),{threshold:.12});document.documentElement.classList.add('motion-ready');reveals.forEach(el=>io.observe(el))}
const opening=document.querySelector('.opening');
if(opening&&!matchMedia('(prefers-reduced-motion: reduce)').matches&&!sessionStorage.getItem('mikkyou-opened')){opening.classList.add('active');const leave=()=>{opening.classList.add('hide');document.documentElement.classList.remove('opening-lock');sessionStorage.setItem('mikkyou-opened','1')};document.documentElement.classList.add('opening-lock');setTimeout(leave,2300);opening.querySelector('button')?.addEventListener('click',leave)}else{opening?.remove()}
