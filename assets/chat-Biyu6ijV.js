import{t as p,b as g,e as _,f}from"./dataService -DYm5JXEv.js";const c=document.querySelector(".messages"),l=document.querySelector(".message__inner"),u=(e,s)=>{if(!e)return;const t=document.createElement("li"),n=document.createElement("span"),a=document.createElement("div"),o=document.createElement("span");if(t.append(n),t.append(a),a.append(o),t.className="message"+(s?" message--new":""),console.log("message"+(s?" message--new":"")),e.sender===1){t.className+=" message--my";const m=document.createElement("div");a.className="message__info message__info--my",a.append(m),m.className="material-icons",m.innerText="done_all"}else t.className+=" message--another",a.className="message__info message__info--another";return n.className="message__text",o.className="message__info-time",n.innerText=e.text,o.innerText=p(e.time),t},h=e=>{const s=u(e,!0);l.append(s),c.scrollTop=c.scrollHeight},N=e=>{if(!e)return;const s=new DocumentFragment;for(let t of e){const n=u(t,!1);s.append(n)}l.append(s),c.scrollTop=c.scrollHeight},v=document.querySelector(".header__settings"),E=e=>{if(!e)return;const s=document.createElement("div"),t=document.createElement("img"),n=document.createElement("div"),a=document.createElement("span"),o=document.createElement("span");s.className="header__user",t.className="header__user-image",n.className="header__user-info",a.className="header__user-name",o.className="header__user-last-time",s.append(t),s.append(n),n.append(a),n.append(o),t.setAttribute("src",e.userAvatar),a.innerText=e.userName,o.innerText="был(а) 2 часа назад",v.before(s)},w=document.querySelector(".header__dropdown-button"),d=document.querySelector(".header__dropdown"),r=document.querySelector(".form-input"),i=new URLSearchParams(document.location.search).get("chatId"),I=g(i),y=e=>{if(e.preventDefault(),r.value==="")return;const s=f(r.value,i);h(s),r.value="",r.focus()};document.addEventListener("submit",y.bind(void 0));w.addEventListener("click",()=>{d.classList.toggle("header__dropdown--open")});document.addEventListener("click",e=>{d.classList.contains("header__dropdown--open")&&!e.target.classList.contains("header__dropdown-item")&&!e.target.classList.contains("header__dropdown-button")&&d.classList.remove("header__dropdown--open")});E(_(i));N(I);r.focus();