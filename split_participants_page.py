from pathlib import Path
import re

p = Path('index.html')
s = p.read_text()

# Keep the current visual source as-is; only move the participant block to its own page.
section_match = re.search(r'\n\s*<section class="section participants(?:-section)?" id="participants">.*?</section>\s*\n', s, re.S)
if section_match:
    s = s[:section_match.start()] + '\n' + s[section_match.end():]

# The hero registration CTA should open the dedicated participant page.
s = s.replace('href="#participants"', 'href="participants.html"')

# Add a participants link to desktop/mobile navigation where possible.
nav_anchor = '<a href="#tickets">Квитки</a>'
if 'href="participants.html">Учасники</a>' not in s:
    s = s.replace(nav_anchor, nav_anchor + '\n      <a href="participants.html">Учасники</a>', 2)

# Footer link (compact markup variants).
s = s.replace('<a href="#tickets">Квитки</a><a href="#location">Локація</a>', '<a href="#tickets">Квитки</a><a href="participants.html">Учасники</a><a href="#location">Локація</a>')

# Remove participant-only script from the homepage; the separate page owns it now.
s = s.replace('  <script src="participants.js?v=20260903" defer></script>\n', '')
p.write_text(s)

# Build a dedicated page that deliberately uses the same visual language as the supplied/current site.
participants = '''<!doctype html>
<html lang="uk">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <meta name="theme-color" content="#0b2b22">
  <meta name="description" content="Реєстрація та список учасників Форуму нерухомості 2026 у Вінниці.">
  <title>Учасники — Форум нерухомості 2026</title>
  <link rel="stylesheet" href="live-match.css?v=20260903">
  <style>
    :root{--bg:#0e1a1b;--panel:#0b4938;--panel2:#102c26;--text:#f2f5f4;--muted:#b7c4c0;--gold:#c9a16c;--line:rgba(194,211,205,.2);--green:#10c895;--pad:clamp(18px,4vw,64px);--max:1320px}
    *{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:linear-gradient(145deg,#091815,#0e2420 58%,#10372d);color:var(--text);font-family:Inter,ui-sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;min-height:100vh}a{color:inherit;text-decoration:none}.container{width:min(var(--max),calc(100% - var(--pad)*2));margin:auto}
    .page-header{position:sticky;top:0;z-index:20;height:76px;background:rgba(7,38,32,.94);backdrop-filter:blur(18px);border-bottom:1px solid var(--line)}.header-inner{height:100%;display:flex;align-items:center;justify-content:space-between;gap:20px}.brand{display:flex;align-items:center;gap:12px}.brand-mark{width:38px;height:38px;border:1px solid rgba(255,255,255,.28);display:grid;place-items:center}.brand-mark svg{width:26px;stroke:#fff;stroke-width:1.7}.brand-text{display:flex;flex-direction:column;line-height:1}.brand-text b{font-size:13px;letter-spacing:.14em}.brand-text small{margin-top:5px;color:#90a49d;font-size:8px;letter-spacing:.14em}.back{min-height:44px;padding:0 16px;display:inline-flex;align-items:center;gap:13px;border:1px solid rgba(255,255,255,.25);font-size:11px;font-weight:800;letter-spacing:.05em;text-transform:uppercase}.back:hover{border-color:var(--gold);color:var(--gold)}
    .hero{padding:clamp(70px,8vw,120px) 0 55px}.kicker{color:var(--gold);font-size:10px;font-weight:800;letter-spacing:.18em;text-transform:uppercase}.hero-grid{display:grid;grid-template-columns:1.2fr .65fr;gap:8vw;align-items:end;margin-top:20px}.hero h1{margin:0;font-family:Georgia,"Times New Roman",serif;font-weight:400;font-size:clamp(54px,7vw,100px);line-height:.9;letter-spacing:-.055em}.hero h1 span{color:#879a93}.hero p{margin:0;color:var(--muted);font-size:17px;line-height:1.7}.stats{display:flex;gap:10px;margin-top:32px}.stat{padding:14px 18px;border:1px solid var(--line);min-width:130px}.stat strong{display:block;font-family:Georgia,"Times New Roman",serif;font-size:32px;font-weight:400;color:var(--green)}.stat span{color:#91a69e;font-size:9px;letter-spacing:.12em;text-transform:uppercase}
    .workspace{display:grid;grid-template-columns:minmax(330px,.72fr) minmax(0,1.28fr);gap:24px;align-items:start;padding:0 0 100px}.registration-form{position:sticky;top:100px;padding:32px;background:var(--panel);border:1px solid rgba(77,208,168,.3)}.registration-form h2{margin:0 0 8px;font-family:Georgia,"Times New Roman",serif;font-size:36px;font-weight:400}.registration-form>p{margin:0 0 28px;color:#bcd0ca;line-height:1.55}.form-field{display:block;margin-top:16px}.form-field span{display:block;margin-bottom:8px;color:#dbe6e2;font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.form-field input{width:100%;min-height:54px;padding:0 15px;border:1px solid rgba(222,234,230,.26);border-radius:0;background:var(--panel2);color:#fff;font:inherit;outline:none}.form-field input:focus{border-color:#c59b65;box-shadow:0 0 0 2px rgba(197,155,101,.18)}.form-consent{display:flex;gap:11px;align-items:flex-start;margin:20px 0;color:#bfd0cb;font-size:13px;line-height:1.5}.form-consent input{width:18px;height:18px;flex:0 0 auto;accent-color:#a9824f}.submit{width:100%;min-height:56px;padding:0 18px;border:0;background:#a9824f;color:#fff;font:inherit;font-size:11px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;display:flex;align-items:center;justify-content:space-between}.submit:disabled{opacity:.6;cursor:wait}.form-status{min-height:22px;margin:15px 0 0;color:#d9c09e;font-size:14px;line-height:1.5}
    .participant-panel{min-width:0}.list-toolbar{display:grid;grid-template-columns:1fr auto;gap:20px;align-items:end;padding:22px 0;border-top:1px solid rgba(201,177,139,.42);border-bottom:1px solid var(--line)}.list-toolbar h2{margin:0;font-family:Georgia,"Times New Roman",serif;font-size:clamp(32px,4vw,50px);font-weight:400}.participant-count{color:var(--gold);font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;text-align:right}.search-wrap{margin:20px 0 10px}.search-wrap input{width:100%;min-height:52px;padding:0 16px;border:1px solid var(--line);background:#10231f;color:#fff;font:inherit;outline:none}.search-wrap input:focus{border-color:var(--gold)}.search-wrap input::placeholder{color:#718a82}.participant-columns{display:grid;grid-template-columns:1.2fr 1fr;gap:24px;padding:12px 14px;color:#789087;font-size:9px;font-weight:800;letter-spacing:.13em;text-transform:uppercase;border-bottom:1px solid var(--line)}.participant-row{display:grid;grid-template-columns:1.2fr 1fr;gap:24px;padding:20px 14px;border-bottom:1px solid rgba(194,211,205,.16)}.participant-row:nth-child(even){background:#142523}.participant-row strong{font-size:16px;line-height:1.45}.participant-row span{color:#b4c1bd;line-height:1.45}.participant-empty{padding:46px 14px;color:#91a29d}.list-foot{padding:18px 0;color:#7f948d;font-size:12px;line-height:1.5;border-bottom:1px solid var(--line)}
    @media(max-width:900px){.hero-grid,.workspace{grid-template-columns:1fr}.hero-grid{gap:22px}.registration-form{position:static}.workspace{gap:48px}.hero{padding-top:55px}}
    @media(max-width:620px){.page-header{height:64px}.brand-text small{display:none}.back{padding:0 12px;font-size:9px}.hero h1{font-size:clamp(44px,13vw,61px)}.hero p{font-size:15px}.stats{display:grid;grid-template-columns:1fr 1fr}.stat{min-width:0}.registration-form{padding:24px 18px}.registration-form h2{font-size:30px}.list-toolbar{grid-template-columns:1fr}.participant-count{text-align:left}.participant-columns{display:none}.participant-row{grid-template-columns:1fr;gap:5px;padding:18px 12px}.participant-row span{color:var(--gold)}.workspace{padding-bottom:70px}}
  </style>
</head>
<body>
  <header class="page-header"><div class="container header-inner"><a class="brand" href="index.html"><span class="brand-mark"><svg viewBox="0 0 48 48" fill="none"><path d="M10 34V18l14-8 14 8v16"/><path d="M16 34V22l8-4 8 4v12"/><path d="M8 38h32"/></svg></span><span class="brand-text"><b>ФОРУМ</b><small>НЕРУХОМОСТІ · 2026</small></span></a><a class="back" href="index.html">← На головну</a></div></header>
  <main>
    <section class="hero"><div class="container"><div class="kicker">05 / РЕЄСТРАЦІЯ УЧАСНИКІВ</div><div class="hero-grid"><h1>Учасники<br><span>форуму 2026.</span></h1><p>Після оплати квитка заповніть дані. У відкритому списку відображаються тільки ПІБ учасника та агентство / компанія.</p></div><div class="stats"><div class="stat"><strong id="hero-count">0</strong><span>зареєстровано</span></div><div class="stat"><strong>25–26</strong><span>вересня</span></div></div></div></section>
    <div class="container workspace">
      <form class="registration-form" id="participantForm"><h2>Дані учасника</h2><p>Усі поля обов’язкові.</p><label class="form-field"><span>Прізвище, ім’я, по батькові</span><input name="fullName" autocomplete="name" maxlength="120" required placeholder="Наприклад: Коваленко Яна Сергіївна"></label><label class="form-field"><span>Агентство / компанія</span><input name="agency" maxlength="120" required placeholder="Назва агентства"></label><label class="form-field"><span>Номер або призначення платежу</span><input name="paymentRef" maxlength="80" required placeholder="Номер транзакції з квитанції"></label><label class="form-consent"><input type="checkbox" name="consent" required><span>Погоджуюся на публікацію мого ПІБ та агентства у списку учасників.</span></label><button class="submit" type="submit">Надіслати дані <span>↗</span></button><p class="form-status" id="formMessage" aria-live="polite"></p></form>
      <section class="participant-panel"><div class="list-toolbar"><h2>Зареєстровані учасники</h2><span class="participant-count" id="participantCount">0 УЧАСНИКІВ</span></div><div class="search-wrap"><input id="participantSearch" type="search" placeholder="Пошук за ПІБ або агентством…" autocomplete="off"></div><div class="participant-columns"><span>Учасник</span><span>Агентство / компанія</span></div><div id="participantList"><p class="participant-empty">Перші зареєстровані учасники з’являться тут.</p></div><div class="list-foot">Список оптимізований для 100+ учасників. Використовуйте пошук, щоб швидко знайти людину або агентство.</div></section>
    </div>
  </main>
  <script>
    const KEY='forum-neruhomosti-2026-participants-v1';
    const form=document.querySelector('#participantForm'), list=document.querySelector('#participantList'), count=document.querySelector('#participantCount'), heroCount=document.querySelector('#hero-count'), status=document.querySelector('#formMessage'), search=document.querySelector('#participantSearch');
    const read=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'[]').filter(x=>x&&x.name&&x.agency)}catch{return[]}};
    const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const render=()=>{const all=read(),q=(search.value||'').trim().toLocaleLowerCase('uk'),items=q?all.filter(p=>(p.name+' '+p.agency).toLocaleLowerCase('uk').includes(q)):all;count.textContent=`${all.length} ${all.length===1?'УЧАСНИК':'УЧАСНИКІВ'}`;heroCount.textContent=all.length;list.innerHTML=items.length?items.map(p=>`<div class="participant-row"><strong>${esc(p.name)}</strong><span>${esc(p.agency)}</span></div>`).join(''):`<p class="participant-empty">${q?'Нічого не знайдено.':'Перші зареєстровані учасники з’являться тут.'}</p>`};
    search.addEventListener('input',render);render();
    form.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(form),name=String(data.get('fullName')||'').trim(),agency=String(data.get('agency')||'').trim(),payment=String(data.get('paymentRef')||'').trim(),consent=data.get('consent');status.textContent='';if(!name||!agency||!payment||!consent){status.textContent='Заповніть усі поля та підтвердьте згоду.';return}const items=read();if(items.some(p=>p.name.toLocaleLowerCase('uk')===name.toLocaleLowerCase('uk'))){status.textContent='Цей учасник уже є у списку на цьому пристрої.';return}items.push({name,agency,createdAt:new Date().toISOString()});localStorage.setItem(KEY,JSON.stringify(items));form.reset();status.textContent='Дані прийнято. У відкритому списку показано лише ПІБ та агентство.';render()});
  </script>
</body>
</html>'''
Path('participants.html').write_text(participants)
print('Split participants into participants.html')
