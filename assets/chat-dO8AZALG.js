import{t as T,u as l}from"./utils-CG6mtOFN.js";const u=[{userId:"0",messages:[{id:"0",sender:0,time:"2024-10-07T12:20:20.321Z",text:"Ghbdtn!"},{id:"1",sender:0,time:"2024-10-07T12:40:20.321Z",text:"Привет! Как дела?"}]},{userId:"1",messages:[{id:"0",sender:0,time:"2024-10-07T12:20:20.321Z",text:"Дай деняг"},{id:"1",sender:1,time:"2024-10-07T12:40:20.321Z",text:"Нет"},{id:"2",sender:0,time:"2024-10-07T12:50:20.321Z",text:"Дай деняг"}]},{userId:"2",messages:[{id:"0",sender:1,time:"2024-10-07T12:20:20.321Z",text:"Встретимся?"},{id:"1",sender:0,time:"2024-10-07T12:40:20.321Z",text:"Да, давай завтра"}]},{userId:"3",messages:[{id:"0",sender:1,time:"2024-10-07T12:20:20.321Z",text:"Где деньги?"},{id:"1",sender:0,time:"2024-10-07T12:20:20.321Z",text:"У меня сейчас столько нет. Давай завтра"}]},{userId:"4",messages:[{id:"0",sender:1,time:"2024-10-07T12:20:20.321Z",text:"Го"}]},{userId:"5",messages:[{id:"0",sender:1,time:"2024-10-07T12:20:20.321Z",text:"Привет"}]},{userId:"6",messages:[{id:"0",sender:0,time:"2024-10-07T12:20:20.321Z",text:"Домашку кто делать будет? Я что ли?"}]},{userId:"7",messages:[{id:"0",sender:0,time:"2024-10-07T12:20:20.321Z",text:"Повышение тебе не светит"}]},{userId:"8",messages:[{id:"0",sender:1,time:"2024-10-07T12:20:20.321Z",text:"Пойдем гулять?"}]},{userId:"9",messages:[{id:"0",sender:1,time:"2024-10-07T12:20:20.321Z",text:"ааааа"},{id:"1",sender:0,time:"2024-10-07T12:20:20.321Z",text:"ууу"}]},{userId:"10",messages:[{id:"0",sender:1,time:"2024-10-07T12:20:20.321Z",text:"Я все потерял :("},{id:"1",sender:0,time:"2024-10-07T12:20:20.321Z",text:"мда..."}]}],o=document.querySelector(".messages"),g=document.querySelector(".message__inner"),x=s=>{const e=_(s);g.append(e),o.scrollTop=o.scrollHeight},p=s=>{let e=new DocumentFragment;for(let a of s){let t=_(a);e.append(t)}g.append(e),o.scrollTop=o.scrollHeight},_=s=>{let e=document.createElement("li"),a=document.createElement("span"),t=document.createElement("div"),n=document.createElement("span");if(e.append(a),e.append(t),t.append(n),e.className="message",s.sender===1){e.className+=" message--my";let r=document.createElement("div");t.className="message__info message__info--my",t.append(r),r.className="material-icons",r.innerText="done_all"}else e.className+=" message--another",t.className="message__info message__info--another";return a.className="message__text",n.className="message__info-time",a.innerText=s.text,n.innerText=T(s.time),e},S=document.querySelector(".header__settings"),I=s=>{const e=JSON.parse(localStorage.getItem("CHATS")),t=(e?e.concat(l):l).find(n=>n.id===s.toString());N(t)},N=s=>{let e=document.createElement("div"),a=document.createElement("img"),t=document.createElement("div"),n=document.createElement("span"),r=document.createElement("span");e.className="header__user",a.className="header__user-image",t.className="header__user-info",n.className="header__user-name",r.className="header__user-last-time",e.append(a),e.append(t),t.append(n),t.append(r),a.setAttribute("src",s.avatar),n.innerText=s.name,r.innerText="был(а) 2 часа назад",S.before(e)},E=document.querySelector(".header__dropdown-button"),c=document.querySelector(".header__dropdown"),d=document.querySelector(".form-input"),i=new URLSearchParams(document.location.search).get("chatId"),h=`MESSAGES_${i}`;I(i);let f=0,m=[];v();L();p(m);document.addEventListener("submit",Z.bind(void 0));E.addEventListener("click",()=>{c.classList.toggle("header__dropdown--open")});document.addEventListener("click",s=>{c.classList.contains("header__dropdown--open")&&!s.target.classList.contains("header__dropdown-item")&&!s.target.classList.contains("header__dropdown-button")&&c.classList.remove("header__dropdown--open")});function Z(s){if(s.preventDefault(),d.value==="")return;const e={id:f++,sender:1,time:new Date,text:d.value};m.push(e),localStorage.setItem(h,JSON.stringify(m)),x(e),d.value="",d.focus()}function L(){const s=localStorage.getItem(h);if(!s)return;const e=JSON.parse(s);m.push(...e)}function v(){if(!u)return;const s=u.find(a=>a.userId===i.toString());if(!s)return;const e=s.messages;f=Number(e[e.length-1].id)+1,p(e)}