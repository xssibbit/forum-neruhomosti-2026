const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const header=$('#header'), menuBtn=$('.menu-toggle'), mobileMenu=$('.mobile-menu');
const setMenu=open=>{document.body.classList.toggle('menu-open',open);menuBtn?.setAttribute('aria-expanded',String(open));menuBtn?.setAttribute('aria-label',open?'Закрити меню':'Відкрити меню');mobileMenu?.setAttribute('aria-hidden',String(!open))};
window.addEventListener('scroll',()=>header?.classList.toggle('scrolled',scrollY>20),{passive:true});
menuBtn?.addEventListener('click',()=>setMenu(!document.body.classList.contains('menu-open')));$$('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.classList.contains('menu-open'))setMenu(false)});

const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}}),{threshold:.1,rootMargin:'0px 0px -30px'});$$('.reveal').forEach(el=>revealObserver.observe(el));

$$('.day-tab').forEach(tab=>tab.addEventListener('click',()=>{$$('.day-tab').forEach(t=>{t.classList.remove('active');t.setAttribute('aria-selected','false')});tab.classList.add('active');tab.setAttribute('aria-selected','true');$$('.schedule').forEach(p=>p.hidden=p.id!==tab.dataset.day)}));

const speakers=[
 ['01','Яна Коваленко','ШІ · НЕРУХОМІСТЬ','Співзасновниця SOYKA REALTY TEAM. Авторка майстер-класів з ШІ для рієлторів.','https://forumneruhomosti.com.ua/wp-content/uploads/2026/08/Kovalenko.webp'],
 ['02','Нестор Слюсаренко','ПРОДАЖІ · УГОДИ','Член АФНУ. Голова Івано-Франківського регіонального відділення АФНУ.','https://forumneruhomosti.com.ua/wp-content/uploads/2026/08/Slusarenko.webp'],
 ['03','Андрій Леонов','ПЕРЕГОВОРИ','Бізнес-тренер. Підприємець.','https://forumneruhomosti.com.ua/wp-content/uploads/2026/08/Leonov.webp'],
 ['04','Максим Давидюк','ТАРГЕТ · РЕКЛАМА','Таргетолог.','https://forumneruhomosti.com.ua/wp-content/uploads/2026/08/Daviduk.webp'],
 ['05','Катерина Сапожнікова','БРЕНД · DIM.RIA','Менеджерка по роботі з ключовими клієнтами DIM.RIA.','https://forumneruhomosti.com.ua/wp-content/uploads/2026/08/Sapojnikova.webp'],
 ['06','Ігор Балака','БРЕНД · ІНВЕСТИЦІЇ','Віце-президент АФНУ. Експерт з нерухомості, інвестицій та особистого бренду.','https://forumneruhomosti.com.ua/wp-content/uploads/2026/08/Balaka.webp'],
 ['07','Володимир Яцуба','УПРАВЛІННЯ','Член АФНУ, NAR. Директор АН «Стиль Естейт».','https://forumneruhomosti.com.ua/wp-content/uploads/2026/08/Yacuba.webp'],
 ['08','Тетяна Мишковська','ПРАВО · ПРАКТИКА','Практикуюча адвокатка з 15-річним досвідом.','https://forumneruhomosti.com.ua/wp-content/uploads/2026/08/Myshkovska.webp'],
 ['09','Галина Поліщук','ДЕРЖПРОГРАМИ','Засновниця «Крамниці Нерухомості». Член АФНУ, NAR.','https://forumneruhomosti.com.ua/wp-content/uploads/2026/08/Polishuk.webp'],
 ['10','Віктор Замрій','КОНТЕНТ · МЕДІА','Режисер, сценарист і креативний продюсер.','https://forumneruhomosti.com.ua/wp-content/uploads/2026/08/Zamriy_2.webp']
];
const speakerGrid=$('#speakerGrid'), dialog=$('#speakerDialog');
if(speakerGrid){speakerGrid.innerHTML=speakers.map(([no,name,topic,desc,img])=>`<article class="speaker-card reveal" tabindex="0" role="button" aria-label="Відкрити профіль: ${name}" data-no="${no}" data-name="${name}" data-topic="${topic}" data-desc="${desc}" data-img="${img}"><div class="speaker-photo"><img src="${img}" alt="${name}" loading="lazy"><span class="speaker-index">${no}</span></div><div class="speaker-info"><h3>${name}</h3><p>${desc}</p><small>${topic}</small></div></article>`).join('');$$('.speaker-card',speakerGrid).forEach(el=>revealObserver.observe(el));}
const openSpeaker=card=>{if(!dialog)return;$('.dialog-photo img',dialog).src=card.dataset.img;$('.dialog-photo img',dialog).alt=card.dataset.name;$('#dialogNumber').textContent=`СПІКЕР · ${card.dataset.no}`;$('#dialogName').textContent=card.dataset.name;$('#dialogTopic').textContent=card.dataset.topic;$('#dialogDescription').textContent=card.dataset.desc;dialog.showModal();document.body.classList.add('dialog-open')};
speakerGrid?.addEventListener('click',e=>{const card=e.target.closest('.speaker-card');if(card)openSpeaker(card)});speakerGrid?.addEventListener('keydown',e=>{const card=e.target.closest('.speaker-card');if(card&&(e.key==='Enter'||e.key===' ')){e.preventDefault();openSpeaker(card)}});$('.dialog-close')?.addEventListener('click',()=>dialog.close());dialog?.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});dialog?.addEventListener('close',()=>document.body.classList.remove('dialog-open'));

const countdown=$('.countdown');if(countdown){const target=new Date(countdown.dataset.target).getTime(),pad=n=>String(Math.max(0,n)).padStart(2,'0');const tick=()=>{let diff=Math.max(0,target-Date.now());const d=Math.floor(diff/864e5);diff%=864e5;const h=Math.floor(diff/36e5);diff%=36e5;const m=Math.floor(diff/6e4);const s=Math.floor(diff%6e4/1000);$('#days').textContent=pad(d);$('#hours').textContent=pad(h);$('#minutes').textContent=pad(m);$('#seconds').textContent=pad(s)};tick();setInterval(tick,1000)}

// GitHub Pages is static, so this frontend fallback keeps only the public name + agency in this browser.
// The payment reference is deliberately NOT persisted. Connect a server/API here for a shared public registry.
const STORAGE_KEY='forum-neruhomosti-2026-participants-v1', form=$('#participantForm'), list=$('#participantList'), count=$('#participantCount'), message=$('#formMessage');
const readParticipants=()=>{try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]').filter(x=>x&&x.name&&x.agency)}catch{return[]}};
const esc=v=>String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const renderParticipants=()=>{const items=readParticipants();count.innerHTML=`${items.length} <span>${items.length===1?'УЧАСНИК':'УЧАСНИКІВ'}</span>`;list.innerHTML=items.length?items.map((p,i)=>`<div class="participant-row"><span>${String(i+1).padStart(2,'0')}</span><strong>${esc(p.name)}</strong><b>${esc(p.agency)}</b></div>`).join(''):'<p class="empty-state">Перші зареєстровані учасники з’являться тут.</p>'};renderParticipants();
form?.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(form),name=String(fd.get('fullName')||'').trim(),agency=String(fd.get('agency')||'').trim(),payment=String(fd.get('paymentRef')||'').trim(),consent=fd.get('consent');message.className='form-message';if(!name||!agency||!payment||!consent){message.textContent='Заповніть усі поля та підтвердьте згоду.';message.classList.add('error');return}const items=readParticipants();if(items.some(p=>p.name.toLocaleLowerCase('uk')===name.toLocaleLowerCase('uk'))){message.textContent='Цей учасник уже є у списку на цьому пристрої.';message.classList.add('error');return}items.push({name,agency,createdAt:new Date().toISOString()});localStorage.setItem(STORAGE_KEY,JSON.stringify(items));form.reset();renderParticipants();message.textContent='Дані прийнято. У списку показано лише ПІБ та агентство.';message.classList.add('ok')});