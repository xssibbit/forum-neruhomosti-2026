(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Load the compact participant section styles.
  if (!document.querySelector('link[href^="participants-main.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'participants-main.css?v=20260904-hero4';
    document.head.append(link);
  }

  // Final UX refinements requested after desktop/mobile review.
  if (!$('#forum-ux-refinements')) {
    const style = document.createElement('style');
    style.id = 'forum-ux-refinements';
    style.textContent = `
      /* Make the two sections after hero feel different, shorter and more visual. */
      .about{padding-top:clamp(78px,6.8vw,108px)!important;padding-bottom:clamp(74px,6vw,96px)!important}
      .about-layout{grid-template-columns:minmax(0,.88fr) minmax(320px,.58fr)!important;gap:clamp(46px,8vw,120px)!important;align-items:end!important}
      .about .section-title{font-size:clamp(56px,5.6vw,88px)!important;max-width:760px!important}
      .about-copy p{max-width:560px!important;margin:0!important;font-size:clamp(16px,1.22vw,19px)!important;line-height:1.62!important;color:#b9c9c3!important}
      .benefit-grid{grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:10px!important;margin-top:58px!important}
      .benefit{min-height:178px!important;padding:22px!important;display:flex!important;flex-direction:column!important;justify-content:space-between!important;border:1px solid rgba(219,234,227,.12)!important;background:#0c3028!important;transition:transform .25s ease,background .25s ease!important}
      .benefit:nth-child(1){background:#0b5b45!important}
      .benefit:nth-child(2){background:#102b26!important}
      .benefit:nth-child(3){background:#a77a45!important}
      .benefit:nth-child(4){background:#0d3d31!important}
      .benefit:hover{transform:translateY(-4px)!important;background:#11624b!important}
      .benefit>span{margin:0 0 auto!important;color:#58ddb5!important;font-size:9px!important;letter-spacing:.14em!important}
      .benefit:nth-child(3)>span{color:#f4e7d4!important}
      .benefit h3{margin:22px 0 8px!important;font-family:Georgia,"Times New Roman",serif!important;font-size:clamp(22px,2vw,30px)!important;font-weight:400!important;color:#f3f2ec!important;line-height:1!important}
      .benefit p{max-width:250px!important;margin:0!important;color:#aabdb6!important;font-size:12px!important;line-height:1.45!important}
      .benefit:nth-child(3) p{color:#f0e0ca!important}
      .benefit:after{display:none!important}

      .outcomes{padding-top:clamp(72px,6vw,94px)!important;padding-bottom:clamp(74px,6vw,98px)!important;background:linear-gradient(115deg,#071c19 0%,#092a23 58%,#0b4536 100%)!important}
      .outcomes:after{content:"07"!important;right:.03em!important;top:-.08em!important;font-size:clamp(180px,22vw,330px)!important;color:rgba(227,240,234,.026)!important}
      .outcomes-head{display:flex!important;align-items:flex-end!important;justify-content:space-between!important;gap:40px!important}
      .outcomes-head .section-title{font-size:clamp(52px,5.4vw,82px)!important;max-width:820px!important}
      .outcomes-head p{display:none!important}
      .outcomes-marker{flex:0 0 auto;padding:10px 12px;border:1px solid rgba(216,231,225,.2);color:#a8bbb4;font-size:9px;font-weight:800;letter-spacing:.17em;text-transform:uppercase}
      .outcome-grid{display:grid!important;grid-template-columns:repeat(7,minmax(0,1fr))!important;gap:0!important;margin-top:48px!important;border:1px solid rgba(215,230,224,.18)!important;border-right:0!important}
      .outcome-item,.outcome-item:last-child{grid-column:auto!important;min-height:132px!important;padding:18px 16px!important;border:0!important;border-right:1px solid rgba(215,230,224,.18)!important;background:rgba(255,255,255,.012)!important}
      .outcome-item:nth-child(1){background:#0b503f!important}
      .outcome-item:nth-child(4){background:#112d27!important}
      .outcome-item:nth-child(7){background:#a77a45!important}
      .outcome-item span{font-size:8px!important;color:#39d4a5!important}
      .outcome-item:nth-child(7) span{color:#f4e4cf!important}
      .outcome-item strong{font-size:clamp(17px,1.45vw,23px)!important;line-height:1.08!important}

      /* Partner logos: compact, intentional brand plates instead of huge white rectangles. */
      .partners{padding-top:66px!important;padding-bottom:66px!important;background:linear-gradient(135deg,#0b3d31,#10231f)!important;color:#eef2ee!important}
      .partner-row{grid-template-columns:minmax(0,1fr) auto!important;gap:38px!important;padding:26px 0!important;border-color:rgba(219,233,227,.17)!important}
      .partner-label span{color:#f0f2ee!important}
      .partner-label small{color:#9db0a9!important;max-width:520px!important}
      .logo-box{justify-self:end!important;width:122px!important;height:122px!important;padding:9px!important;background:#f3f2ed!important;border:1px solid rgba(255,255,255,.16)!important;box-shadow:none!important;overflow:hidden!important}
      .logo-box img{width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;object-fit:contain!important;filter:none!important}
      .partner-afnu .logo-box img{transform:scale(1.16)!important}
      .wide-logo{width:276px!important;height:92px!important;padding:12px 17px!important}
      .partner-dim .logo-box img{transform:scale(1.04)!important}

      /* Countdown on phones must always stay in one line. */
      @media(max-width:760px){
        .about{padding-top:62px!important;padding-bottom:62px!important}
        .about-layout{grid-template-columns:1fr!important;gap:20px!important}
        .about .section-title{font-size:clamp(40px,11vw,52px)!important}
        .about-copy p{font-size:14px!important;line-height:1.55!important}
        .benefit-grid{display:grid!important;grid-template-columns:1fr 1fr!important;gap:8px!important;margin-top:34px!important}
        .benefit{min-height:150px!important;padding:16px!important}
        .benefit h3{margin-top:18px!important;font-size:21px!important}
        .benefit p{font-size:11px!important;line-height:1.4!important}

        .outcomes{padding-top:60px!important;padding-bottom:60px!important}
        .outcomes-head{display:block!important}
        .outcomes-head .section-title{font-size:clamp(39px,10.7vw,50px)!important;max-width:330px!important}
        .outcomes-marker{display:inline-block!important;margin-top:18px!important}
        .outcome-grid{display:grid!important;grid-auto-flow:column!important;grid-template-columns:none!important;grid-auto-columns:min(72vw,270px)!important;overflow-x:auto!important;overscroll-behavior-inline:contain!important;scroll-snap-type:x mandatory!important;-webkit-overflow-scrolling:touch!important;scrollbar-width:none!important;margin-top:30px!important;border-right:1px solid rgba(215,230,224,.18)!important}
        .outcome-grid::-webkit-scrollbar{display:none!important}
        .outcome-item{min-height:138px!important;scroll-snap-align:start!important;padding:18px!important}
        .outcome-item strong{font-size:23px!important}

        .countdown-wrap{gap:22px!important}
        .countdown{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:4px!important;width:100%!important;border:0!important;border-top:0!important}
        .countdown>div{min-width:0!important;padding:13px 3px 12px!important;border:0!important;background:#0d3f33!important;text-align:center!important}
        .countdown>div:nth-child(even){background:#162420!important}
        .countdown strong{font-size:clamp(27px,8.6vw,38px)!important;line-height:.95!important;letter-spacing:-.055em!important}
        .countdown span{display:block!important;margin-top:6px!important;font-size:6.5px!important;letter-spacing:.065em!important;white-space:nowrap!important}

        .partners{padding-top:48px!important;padding-bottom:48px!important}
        .partner-row{grid-template-columns:minmax(0,1fr) auto!important;gap:14px!important;padding:20px 0!important}
        .partner-label{min-width:0!important}
        .partner-label span{font-size:9px!important}
        .partner-label small{max-width:160px!important;font-size:10px!important;line-height:1.35!important}
        .logo-box{width:88px!important;height:88px!important;padding:6px!important}
        .wide-logo{width:148px!important;height:58px!important;padding:7px 10px!important}
      }
      @media(max-width:360px){
        .countdown{gap:3px!important}
        .countdown>div{padding-left:2px!important;padding-right:2px!important}
        .countdown strong{font-size:26px!important}
        .countdown span{font-size:5.8px!important;letter-spacing:.04em!important}
        .benefit-grid{grid-template-columns:1fr!important}
        .benefit{min-height:130px!important}
      }
    `;
    document.head.append(style);
  }

  // Keep only one edition label (an earlier sync accidentally duplicated it).
  const stamps = $$('.hero .edition-stamp');
  stamps.slice(1).forEach(el => el.remove());
  stamps.forEach(el => el.remove());

  // Registration is on the main page, under the countdown.
  const registrationUrl = '#participants';
  const headerCta = $('.header-cta');
  if (headerCta) {
    headerCta.href = registrationUrl;
    headerCta.innerHTML = 'Реєстрація <span>↗</span>';
    headerCta.setAttribute('aria-label', 'Реєстрація учасників');
  }

  // Navigation: outcomes + registration on the landing page.
  $$('.desktop-nav, .mobile-menu nav').forEach(nav => {
    if (!nav.querySelector('a[href="#outcomes"]')) {
      const programLink = nav.querySelector('a[href="#program"]');
      const link = document.createElement('a');
      link.href = '#outcomes';
      link.textContent = 'Що отримаєте';
      if (programLink) nav.insertBefore(link, programLink);
    }

    const oldParticipant = nav.querySelector('a[href="participants.html"]');
    if (oldParticipant) {
      oldParticipant.href = registrationUrl;
      oldParticipant.textContent = 'Учасники';
    } else if (!nav.querySelector('a[href="#participants"]')) {
      const locationLink = nav.querySelector('a[href="#location"]');
      const link = document.createElement('a');
      link.href = registrationUrl;
      link.textContent = 'Учасники';
      if (locationLink) nav.insertBefore(link, locationLink);
      else nav.append(link);
    }
  });

  // Hero copy from the customer TZ.
  const heroLead = $('.hero-lead');
  if (heroLead) heroLead.textContent = 'Два дні практики, кейсів, нетворкінгу та майстер-класів від провідних експертів ринку нерухомості.';
  const heroPrimary = $('.hero-actions .button.primary');
  if (heroPrimary) heroPrimary.innerHTML = 'Забронювати місце <span>↗</span>';
  const heroSecondary = $('.hero-actions .button.ghost');
  if (heroSecondary) {
    heroSecondary.href = registrationUrl;
    heroSecondary.innerHTML = 'Реєстрація учасників <span>↓</span>';
  }

  // Short, sales-focused about section. No duplicate paragraphs.
  const aboutTitle = $('#about .section-title');
  if (aboutTitle) aboutTitle.innerHTML = 'Чому варто<br><span>бути тут?</span>';
  const aboutCopy = $('#about .about-copy');
  if (aboutCopy) {
    aboutCopy.innerHTML = '<p>Два дні практики та знайомств із людьми, які формують сучасний ринок нерухомості.</p>';
  }
  const benefitGrid = $('#about .benefit-grid');
  if (benefitGrid) {
    benefitGrid.innerHTML = `
      <article class="benefit"><span>01</span><div><h3>Практика</h3><p>Інструменти, які можна застосувати одразу.</p></div></article>
      <article class="benefit"><span>02</span><div><h3>Реальні кейси</h3><p>Конкретні рішення замість зайвої теорії.</p></div></article>
      <article class="benefit"><span>03</span><div><h3>Нетворкінг</h3><p>Нові професійні контакти за два дні.</p></div></article>
      <article class="benefit"><span>04</span><div><h3>Партнерства</h3><p>Люди та можливості для наступного кроку.</p></div></article>`;
  }

  // New TZ block: "Що ви отримаєте" — compact horizontal editorial rail.
  const about = $('#about');
  if (about && !$('#outcomes')) {
    const section = document.createElement('section');
    section.className = 'section outcomes';
    section.id = 'outcomes';
    const items = [
      'Актуальні знання',
      'Покрокові інструменти',
      'Нові контакти',
      'Практичні кейси',
      'Відповіді на питання',
      'Знайомства з партнерами',
      'Натхнення'
    ];
    section.innerHTML = `
      <div class="container">
        <div class="section-kicker">ЩО ВИ ОТРИМАЄТЕ</div>
        <div class="outcomes-head">
          <h2 class="section-title">Що залишиться<br><span>після форуму.</span></h2>
          <span class="outcomes-marker">7 результатів</span>
        </div>
        <div class="outcome-grid" aria-label="Результати участі">
          ${items.map((item, i) => `<article class="outcome-item"><span>${String(i + 1).padStart(2, '0')}</span><strong>${item}</strong></article>`).join('')}
        </div>
      </div>`;
    about.insertAdjacentElement('afterend', section);
  }

  // Program corrections from the TZ.
  const findRow = (panel, time) => $$('.schedule-row', panel).find(row => $('time', row)?.textContent.trim() === time);
  const setRow = (row, person, title, description = '') => {
    if (!row) return;
    const tag = $('.tag', row);
    const h3 = $('h3', row);
    let p = $('p', row);
    if (tag) tag.textContent = person;
    if (h3) h3.textContent = title;
    if (description) {
      if (!p) {
        p = document.createElement('p');
        h3?.insertAdjacentElement('afterend', p);
      }
      p.textContent = description;
    }
  };

  const day1 = $('#day1');
  setRow(findRow(day1, '11:45–12:30'), 'Катерина Сапожнікова', 'Від об’єкта до особистого бренду: система роботи рієлтора на DIM.RIA');
  setRow(findRow(day1, '14:00–14:30'), 'Максим Давидюк', 'Таргетована реклама в нерухомості');

  const day2 = $('#day2');
  const day2Rows = $$('.schedule-row', day2).filter(row => $('time', row)?.textContent.trim() === '10:00–13:00');
  if (day2Rows[1]) setRow(day2Rows[1], 'Яна Коваленко', 'Наступний рівень ШІ в нерухомості', 'На майстер-класі ми будемо не слухати про можливості ШІ, а створювати власні робочі інструменти для нерухомості.');
  if (day2Rows[2]) setRow(day2Rows[2], 'Нестор Слюсаренко', 'Як виявити справжню мотивацію власника та отримати ексклюзивний договір без тиску');
  if (day2Rows[3]) setRow(day2Rows[3], 'Андрій Леонов', 'Як виявити справжні потреби клієнта', 'Робота із запереченнями без конфлікту. Техніки досягнення взаємовигідних домовленостей.');
  if (day2Rows[4]) setRow(day2Rows[4], 'Максим Давидюк · Марина Кушнір', 'Таргетована реклама в нерухомості', 'Як не «зливати» бюджет на рекламу, яка не дає результатів.');

  // Tickets: explicit -10% and late registration price from the TZ.
  const ticketIntro = $('.ticket-heading p');
  if (ticketIntro) ticketIntro.innerHTML = 'Рання реєстрація вже відкрита. Для груп від 10 осіб та мешканців прифронтових територій діє <strong>знижка −10%</strong>.';
  const groupCard = $('.ticket-card.contact-card');
  if (groupCard) {
    const p = $('p', groupCard);
    if (p) p.innerHTML = '<strong>−10% знижка</strong> для груп від 10 осіб та мешканців прифронтових територій.';
  }
  const ticketGrid = $('.ticket-grid');
  if (ticketGrid && !$('.late-registration')) {
    const late = document.createElement('div');
    late.className = 'late-registration';
    late.innerHTML = '<span class="late-label">Пізня реєстрація</span><div><strong>3 500 ₴</strong><p>Вартість участі з 15 вересня 2026 року.</p></div><b>з 15.09</b>';
    ticketGrid.insertAdjacentElement('afterend', late);
  }

  // Registration + compact participant list directly under the countdown.
  const countdownSection = $('.countdown-section');
  if (countdownSection && !$('#participants')) {
    const section = document.createElement('section');
    section.className = 'section participants-section';
    section.id = 'participants';
    section.innerHTML = `
      <div class="container">
        <div class="section-kicker">05 / РЕЄСТРАЦІЯ УЧАСНИКІВ</div>
        <div class="participants-head">
          <h2 class="section-title">Ви вже<br><span>придбали квиток?</span></h2>
          <p>Заповніть коротку форму після оплати. Вкажіть ПІБ, агентство / компанію та місто.</p>
        </div>

        <div class="registration-layout">
          <form class="registration-form" id="participant-form">
            <h3>Дані учасника</h3>
            <p>Усі поля обов’язкові.</p>
            <label class="form-field">
              <span>Прізвище, ім’я, по батькові</span>
              <input name="fullName" autocomplete="name" maxlength="120" required placeholder="Наприклад: Коваленко Яна Сергіївна">
            </label>
            <label class="form-field">
              <span>Агентство / компанія</span>
              <input name="agency" autocomplete="organization" maxlength="120" required placeholder="Назва агентства">
            </label>
            <label class="form-field">
              <span>Місто</span>
              <input name="city" autocomplete="address-level2" maxlength="100" required placeholder="Наприклад: Вінниця">
            </label>
            <label class="form-consent">
              <input type="checkbox" name="consent" required>
              <span>Погоджуюся на публікацію мого ПІБ та агентства у списку учасників.</span>
            </label>
            <button class="button primary" type="submit">Надіслати дані <span>↗</span></button>
            <p class="form-status" id="participant-status" aria-live="polite"></p>
          </form>

          <div class="participant-list">
            <div class="participant-list-head">
              <h3>Зареєстровані учасники</h3>
              <span class="participant-count" id="participant-count">0 УЧАСНИКІВ</span>
            </div>
            <div class="participant-tools">
              <label class="participant-search">
                <input id="participant-search" type="search" autocomplete="off" placeholder="Пошук за ПІБ" aria-label="Пошук учасника за ПІБ">
              </label>
              <span class="participant-result-note" id="participant-result-note">Показано всіх</span>
            </div>
            <div class="participant-scroll" id="participant-scroll">
              <div id="participant-rows"><p class="participant-empty">Перші зареєстровані учасники з’являться тут.</p></div>
            </div>
            <div class="participant-pagination" id="participant-pagination">
              <button type="button" id="participant-prev">← Назад</button>
              <span class="participant-page-label" id="participant-page-label">1 / 1</span>
              <button type="button" id="participant-next">Далі →</button>
            </div>
          </div>
        </div>
      </div>`;
    countdownSection.insertAdjacentElement('afterend', section);

    const KEY = 'forum-neruhomosti-2026-participants-v1';
    const form = $('#participant-form');
    const rows = $('#participant-rows');
    const count = $('#participant-count');
    const status = $('#participant-status');
    const search = $('#participant-search');
    const note = $('#participant-result-note');
    const prev = $('#participant-prev');
    const next = $('#participant-next');
    const pageLabel = $('#participant-page-label');
    const mobileQuery = matchMedia('(max-width: 760px)');
    let page = 1;
    const mobilePageSize = 6;

    const read = () => {
      try {
        const value = JSON.parse(localStorage.getItem(KEY) || '[]');
        return Array.isArray(value) ? value.filter(x => x && x.name && x.agency) : [];
      } catch {
        return [];
      }
    };
    const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
    const matches = items => {
      const q = (search?.value || '').trim().toLocaleLowerCase('uk');
      return q ? items.filter(item => item.name.toLocaleLowerCase('uk').includes(q)) : items;
    };

    const render = () => {
      const all = read();
      const filtered = matches(all);
      count.textContent = `${all.length} УЧАСНИКІВ`;
      note.textContent = search?.value.trim() ? `Знайдено: ${filtered.length}` : `Показано: ${filtered.length}`;

      const isMobile = mobileQuery.matches;
      const pages = Math.max(1, Math.ceil(filtered.length / mobilePageSize));
      page = Math.min(Math.max(1, page), pages);
      const visible = isMobile ? filtered.slice((page - 1) * mobilePageSize, page * mobilePageSize) : filtered;

      rows.innerHTML = visible.length
        ? visible.map((p, i) => {
            const n = isMobile ? (page - 1) * mobilePageSize + i + 1 : i + 1;
            return `<div class="participant-row"><span class="participant-index">${String(n).padStart(2, '0')}</span><strong>${esc(p.name)}</strong><span class="agency">${esc(p.agency)}</span></div>`;
          }).join('')
        : `<p class="participant-empty">${search?.value.trim() ? 'За цим ПІБ нічого не знайдено.' : 'Перші зареєстровані учасники з’являться тут.'}</p>`;

      pageLabel.textContent = `${page} / ${pages}`;
      prev.disabled = page <= 1;
      next.disabled = page >= pages;
    };

    search?.addEventListener('input', () => { page = 1; render(); });
    prev?.addEventListener('click', () => { if (page > 1) { page--; render(); } });
    next?.addEventListener('click', () => { const pages = Math.max(1, Math.ceil(matches(read()).length / mobilePageSize)); if (page < pages) { page++; render(); } });
    mobileQuery.addEventListener?.('change', () => { page = 1; render(); });

    form?.addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get('fullName') || '').trim();
      const agency = String(data.get('agency') || '').trim();
      const city = String(data.get('city') || '').trim();
      const consent = data.get('consent');
      status.className = 'form-status';

      if (!name || !agency || !city || !consent) {
        status.textContent = 'Заповніть усі поля та підтвердьте згоду.';
        status.classList.add('error');
        return;
      }

      const items = read();
      const duplicate = items.some(item => item.name.toLocaleLowerCase('uk') === name.toLocaleLowerCase('uk'));
      if (!duplicate) {
        items.push({name, agency, city, createdAt: new Date().toISOString()});
        localStorage.setItem(KEY, JSON.stringify(items));
      }

      form.reset();
      search.value = '';
      page = 1;
      render();
      status.textContent = duplicate ? 'Цей учасник уже є у списку.' : 'Дані прийнято. У списку показано лише ПІБ та агентство.';
      status.classList.add('ok');
    });

    render();
  }

  // Embedded Google Map under the approved photo/address block.
  const location = $('#location');
  if (location && !$('.location-map', location)) {
    const map = document.createElement('div');
    map.className = 'container location-map';
    map.innerHTML = '<iframe title="Готель Франція, Вінниця — Google Map" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=%D0%B2%D1%83%D0%BB%D0%B8%D1%86%D1%8F%20%D0%A1%D0%BE%D0%B1%D0%BE%D1%80%D0%BD%D0%B0%2034%2C%20%D0%92%D1%96%D0%BD%D0%BD%D0%B8%D1%86%D1%8F&output=embed"></iframe>';
    location.append(map);
  }

  // Partner logos: keep the actual brand assets, but present them as compact marks.
  const partnerRows = $$('.partners .partner-row');
  if (partnerRows[0]) partnerRows[0].classList.add('partner-afnu');
  if (partnerRows[1]) partnerRows[1].classList.add('partner-dim');
  const dimImg = $('.partner-dim .logo-box img');
  if (dimImg) dimImg.alt = 'DIM.RIA';

  // Final sales push and contacts from the TZ.
  const finalTitle = $('.final-copy h2');
  if (finalTitle) finalTitle.innerHTML = 'Не відкладайте<br><span>рішення.</span>';
  const finalText = $('.final-copy > p');
  if (finalText) finalText.textContent = 'До початку форуму залишилося небагато часу. Забронюйте місце вже сьогодні.';
  const finalButton = $('.final-copy .button');
  if (finalButton) finalButton.innerHTML = 'Забронювати місце <span>↗</span>';

  const contactPanel = $('.contact-panel');
  if (contactPanel) {
    contactPanel.innerHTML = `
      <p>Є питання щодо участі?</p>
      <a href="tel:+380964796620">+380 (96) 479 66 20</a>
      <a href="tg://resolve?phone=380964796620">Telegram · +380 (96) 479 66 20 ↗</a>
      <a href="mailto:sazonovashans@gmail.com">sazonovashans@gmail.com</a>
      <a target="_blank" rel="noopener" href="https://www.instagram.com/afnuvinnytsia/">Instagram · @afnuvinnytsia ↗</a>
      <a target="_blank" rel="noopener" href="https://www.facebook.com/vro.asnu/">Facebook · ВРВ АФНУ ↗</a>`;
  }

  // Footer: keep registration on the main page.
  const footerLinks = $('.footer-links');
  if (footerLinks) {
    const oldParticipant = footerLinks.querySelector('a[href="participants.html"]');
    if (oldParticipant) {
      oldParticipant.href = registrationUrl;
      oldParticipant.textContent = 'Учасники';
    }
    if (!footerLinks.querySelector('a[href="#outcomes"]')) {
      const link = document.createElement('a');
      link.href = '#outcomes';
      link.textContent = 'Що отримаєте';
      footerLinks.insertBefore(link, footerLinks.firstChild);
    }
  }

  // Smooth-close the mobile menu for dynamically inserted links too.
  $$('.mobile-menu a').forEach(a => a.addEventListener('click', () => {
    document.body.classList.remove('menu-open');
    $('.mobile-menu')?.setAttribute('aria-hidden', 'true');
    $('.menu-toggle')?.setAttribute('aria-expanded', 'false');
  }));
})();
