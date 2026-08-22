(function(){
var PIXEL_ID='852328267846215';
var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var anoEl=document.getElementById('ano');
if(anoEl){anoEl.textContent=new Date().getFullYear()}

/* ---- Meta Pixel, so apos o consentimento ---- */
var pixelReady=false;
function loadPixels(){
 if(pixelReady)return; pixelReady=true;
 !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
 if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
 t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
 fbq('init',PIXEL_ID);
 fbq('track','PageView');
}
function track(evt,params){if(pixelReady&&window.fbq){fbq('track',evt,params||{})}}

var cc=document.getElementById('cc'),K='pg_consent',v=null;
try{v=localStorage.getItem(K)}catch(e){}
function setConsent(val){try{localStorage.setItem(K,val)}catch(e){}if(cc){cc.classList.remove('show')}if(val==='all'){loadPixels()}}
if(v==='all'){loadPixels()}else if(v!=='min'&&cc){setTimeout(function(){cc.classList.add('show')},1600)}
var ok=document.getElementById('ccOk'),no=document.getElementById('ccNo');
if(ok){ok.onclick=function(){setConsent('all')}}
if(no){no.onclick=function(){setConsent('min')}}

/* clique em qualquer CTA que leve ao checkout */
document.querySelectorAll('a[href*="pay.kiwify.com.br"]').forEach(function(a){
 a.addEventListener('click',function(){
  track('InitiateCheckout',{content_name:'Pack de Gestao',value:67,currency:'BRL',source:a.getAttribute('data-cta')||'link'});
 });
});
/* chegou na secao da oferta */
var oferta=document.getElementById('oferta');
if(oferta&&'IntersectionObserver' in window){
 var oio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){oio.unobserve(e.target);track('ViewContent',{content_name:'Oferta Pack de Gestao'})}})},{threshold:.4});
 oio.observe(oferta);
}

/* ---- entradas em cascata ---- */
document.querySelectorAll('.friction,.steps,.fit,.metrics,.offer ul,.mod ol').forEach(function(g){
 Array.prototype.forEach.call(g.children,function(el,i){el.style.setProperty('--d',(i*0.06)+'s')});
});
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:.06});
document.querySelectorAll('.rv:not(.in),.rule').forEach(function(el){io.observe(el)});

/* ---- contadores e riscos ---- */
function countUp(el){var n=parseInt(el.getAttribute('data-n'),10),sfx=el.getAttribute('data-suffix')||'',t0=null;
 if(isNaN(n)){return}
 function step(t){if(!t0)t0=t;var p=Math.min((t-t0)/900,1),e=1-Math.pow(1-p,3);el.textContent=Math.round(n*e)+sfx;if(p<1)requestAnimationFrame(step)}
 requestAnimationFrame(step)}
if(reduce){
 document.querySelectorAll('.tally').forEach(function(t){t.classList.add('hold')});
 document.querySelectorAll('b[data-n]').forEach(function(b){b.textContent=b.getAttribute('data-n')+(b.getAttribute('data-suffix')||'')});
}else{
 var cio=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;cio.unobserve(e.target);
  e.target.querySelectorAll('b[data-n]').forEach(countUp);
  var t=e.target.querySelector('.tally');
  if(t){Array.prototype.forEach.call(t.children,function(el,k){el.style.setProperty('--d',(0.2+k*0.13)+'s')})}})},{threshold:.3});
 document.querySelectorAll('.story').forEach(function(el){cio.observe(el)});
}

/* ---- header, parallax e cta fixo ---- */
var header=document.querySelector('header'),sticky=document.querySelector('.sticky'),bridge=document.querySelector('.bridge'),
    notes=document.querySelectorAll('.note'),stack=document.querySelector('.modules .stack'),ticking=false,depths=[.05,.11,.07,.14];
function frame(){
 var y=window.pageYOffset||document.documentElement.scrollTop;
 if(header){header.classList.toggle('scrolled',y>24)}
 if(sticky&&bridge){sticky.classList.toggle('on',bridge.getBoundingClientRect().top<0)}
 if(!reduce){
  if(y<1000){Array.prototype.forEach.call(notes,function(n,i){n.style.transform='translateY('+(-y*(depths[i]||.08)).toFixed(1)+'px)'})}
  if(stack){var r=stack.getBoundingClientRect();
   if(r.top<innerHeight&&r.bottom>0){var p=(innerHeight-r.top)/(innerHeight+r.height);stack.style.transform='translateY('+((0.5-p)*26).toFixed(1)+'px)'}}
 }
 ticking=false;
}
addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(frame)}},{passive:true});
frame();
})();
