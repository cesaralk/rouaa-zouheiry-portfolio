const header=document.querySelector(".topbar");
const menu=document.querySelector(".menu-btn");
const nav=document.querySelector(".nav");

function headerState(){header.classList.toggle("scrolled",scrollY>16)}
headerState(); addEventListener("scroll",headerState,{passive:true});

menu?.addEventListener("click",()=>{
  const open=!nav.classList.contains("open");
  nav.classList.toggle("open",open);
  menu.classList.toggle("open",open);
  menu.setAttribute("aria-expanded",String(open));
  document.body.style.overflow=open?"hidden":"";
});

nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
  nav.classList.remove("open");menu.classList.remove("open");
  menu.setAttribute("aria-expanded","false");document.body.style.overflow="";
}));

const ro=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add("show");ro.unobserve(e.target)}
  })
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>ro.observe(el));

const counted=new WeakSet();
const co=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(!e.isIntersecting||counted.has(e.target))return;
    counted.add(e.target);
    const end=Number(e.target.dataset.count||0),start=performance.now(),dur=900;
    function tick(now){
      const p=Math.min((now-start)/dur,1),ease=1-Math.pow(1-p,3);
      e.target.textContent=Math.round(end*ease);
      if(p<1)requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);co.unobserve(e.target);
  })
},{threshold:.5});
document.querySelectorAll("[data-count]").forEach(el=>co.observe(el));

document.getElementById("year").textContent=new Date().getFullYear();
