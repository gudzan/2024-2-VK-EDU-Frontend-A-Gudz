import{u as h}from"./userList-DusYMdfS.js";const l=[{userId:"0",messages:[{id:"0",sender:0,time:"2024-10-07T12:20:20.321Z",text:"Ghbdtn!"},{id:"1",sender:0,time:"2024-10-07T12:40:20.321Z",text:"Привет! Как дела?"}]},{userId:"1",messages:[{id:"0",sender:0,time:"2024-10-07T12:20:20.321Z",text:"Дай деняг"},{id:"1",sender:1,time:"2024-10-07T12:40:20.321Z",text:"Нет"},{id:"2",sender:0,time:"2024-10-07T12:50:20.321Z",text:"Дай деняг"}]},{userId:"2",messages:[{id:"0",sender:1,time:"2024-10-07T12:20:20.321Z",text:"Встретимся?"},{id:"1",sender:0,time:"2024-10-07T12:40:20.321Z",text:"Да, давай завтра"}]},{userId:"3",messages:[{id:"0",sender:1,time:"2024-10-07T12:20:20.321Z",text:"Где деньги?"},{id:"1",sender:0,time:"2024-10-07T12:20:20.321Z",text:"У меня сейчас столько нет. Давай завтра"}]},{userId:"4",messages:[{id:"0",sender:1,time:"2024-10-07T12:20:20.321Z",text:"Го"}]},{userId:"5",messages:[{id:"0",sender:1,time:"2024-10-07T12:20:20.321Z",text:"Привет"}]},{userId:"6",messages:[{id:"0",sender:0,time:"2024-10-07T12:20:20.321Z",text:"Домашку кто делать будет? Я что ли?"}]},{userId:"7",messages:[{id:"0",sender:0,time:"2024-10-07T12:20:20.321Z",text:"Повышение тебе не светит"}]},{userId:"8",messages:[{id:"0",sender:1,time:"2024-10-07T12:20:20.321Z",text:"Пойдем гулять?"}]},{userId:"9",messages:[{id:"0",sender:1,time:"2024-10-07T12:20:20.321Z",text:"ааааа"},{id:"1",sender:0,time:"2024-10-07T12:20:20.321Z",text:"ууу"}]},{userId:"10",messages:[{id:"0",sender:1,time:"2024-10-07T12:20:20.321Z",text:"Я все потерял :("},{id:"1",sender:0,time:"2024-10-07T12:20:20.321Z",text:"мда..."}]}],T=e=>{const s=new Date(e);return`${n(s.getHours())}:${n(s.getMinutes())}`;function n(t){return t<10?`0${t}`:t}},o=document.querySelector(".messages"),u=document.querySelector(".message__inner"),x=e=>{const s=p(e);u.append(s),o.scrollTop=o.scrollHeight},g=e=>{let s=new DocumentFragment;for(let n of e){let t=p(n);s.append(t)}u.append(s),o.scrollTop=o.scrollHeight},p=e=>{let s=document.createElement("li"),n=document.createElement("span"),t=document.createElement("div"),a=document.createElement("span");if(s.append(n),s.append(t),t.append(a),s.className="message",e.sender===1){s.className+=" message--my";let r=document.createElement("div");t.className="message__info message__info--my",t.append(r),r.className="material-icons",r.innerText="done_all"}else s.className+=" message--another",t.className="message__info message__info--another";return n.className="message__text",a.className="message__info-time",n.innerText=e.text,a.innerText=T(e.time),s},S=document.querySelector(".header__settings"),I=e=>{let s=document.createElement("div"),n=document.createElement("img"),t=document.createElement("div"),a=document.createElement("span"),r=document.createElement("span");s.className="header__user",n.className="header__user-image",t.className="header__user-info",a.className="header__user-name",r.className="header__user-last-time",s.append(n),s.append(t),t.append(a),t.append(r),n.setAttribute("src",e.avatar),a.innerText=e.name,r.innerText="был(а) 2 часа назад",S.before(s)},Z=document.querySelector(".header__dropdown-button"),i=document.querySelector(".header__dropdown"),d=document.querySelector(".form-input"),c=new URLSearchParams(document.location.search).get("chatId"),_=`MESSAGES_${c}`;I(h.find(e=>e.id===c.toString()));let f=0,m=[];L();N();g(m);document.addEventListener("submit",E.bind(void 0));Z.addEventListener("click",()=>{i.classList.toggle("header__dropdown--open")});document.addEventListener("click",e=>{i.classList.contains("header__dropdown--open")&&!e.target.classList.contains("header__dropdown-item")&&!e.target.classList.contains("header__dropdown-button")&&i.classList.remove("header__dropdown--open")});function E(e){if(e.preventDefault(),d.value==="")return;const s={id:f++,sender:1,time:new Date,text:d.value};m.push(s),localStorage.setItem(_,JSON.stringify(m)),x(s),d.value="",d.focus()}function N(){const e=localStorage.getItem(_);if(!e)return;const s=JSON.parse(e);m.push(...s)}function L(){if(!l)return;const e=l.find(s=>s.userId===c.toString()).messages;f=Number(e[e.length-1].id)+1,g(e)}
