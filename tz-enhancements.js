(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Load the compact participant section styles.
  if (!document.querySelector('link[href^="participants-main.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'participants-main.css?v=20260903-2';
    document.head.append(link);
  }

  // Keep only one edition label (an earlier sync accidentally duplicated it).
  const stamps = $$('.hero .edition-stamp');
  stamps.slice(1).forEach(el => el.remove());
  if (stamps[0]) stamps[0].textContent = 'PRIVATE BUSINESS EDITION · 2026';

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
  if (heroPrimary) heroPrimary.innerHTML = 'Купити квиток <span>↗</span>';
  const heroSecondary = $('.hero-actions .button.ghost');
  if (heroSecondary) {
    heroSecondary.href = registrationUrl;
    heroSecondary.innerHTML = 'Реєстрація учасників <span>↓</span>';
  }

  // About section — exact customer message while retaining the screenshot layout.
  const aboutTitle = $('#about .section-title');
  if (aboutTitle) aboutTitle.innerHTML = 'Чому варто<br><span>бути тут?</span>';
  const aboutCopy = $('#about .about-copy');
  if (aboutCopy) {
    aboutCopy.innerHTML = '<p>Форум нерухомості — це два дні інтенсивного навчання, практичних інструментів та знайомств із людьми, які формують сучасний ринок нерухомості.</p><p>На учасників чекають практичні виступи, реальні кейси, нетворкінг, нові знайомства та можливості для партнерства.</p>';
  }

  // New TZ block: "Що ви отримаєте".
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
      'Відповіді на свої питання',
      'Знайомства з партнерами',
      'Натхнення'
    ];
    section.innerHTML = `
      <div class="container">
        <div class="section-kicker">ЩО ВИ ОТРИМАЄТЕ</div>
        <div class="outcomes-head">
          <h2 class="section-title">Результат,<br><span>який залишається.</span></h2>
          <p>Не просто два дні події — конкретні знання, інструменти, контакти та рішення, які можна застосовувати після форуму.</p>
        </div>
        <div class="outcome-grid">
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
          <p>Заповніть дані після оплати. У загальному списку відображаються лише ПІБ учасника та його агентство. Для швидкого пошуку використовуйте поле за ПІБ.</p>
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
              <span>Номер або призначення платежу</span>
              <input name="paymentRef" maxlength="100" required placeholder="Номер транзакції з квитанції">
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
    prev?.addEventListener('click', () => { if (page > 1) { page--; render(); $('#participant-list')?.scrollIntoView?.({behavior:'smooth', block:'nearest'}); } });
    next?.addEventListener('click', () => { const pages = Math.max(1, Math.ceil(matches(read()).length / mobilePageSize)); if (page < pages) { page++; render(); } });
    mobileQuery.addEventListener?.('change', () => { page = 1; render(); });

    form?.addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get('fullName') || '').trim();
      const agency = String(data.get('agency') || '').trim();
      const payment = String(data.get('paymentRef') || '').trim();
      const consent = data.get('consent');
      status.className = 'form-status';

      if (!name || !agency || !payment || !consent) {
        status.textContent = 'Заповніть усі поля та підтвердьте згоду.';
        status.classList.add('error');
        return;
      }

      const items = read();
      const duplicate = items.some(item => item.name.toLocaleLowerCase('uk') === name.toLocaleLowerCase('uk'));
      if (!duplicate) {
        // Payment reference is intentionally not published or stored in the public browser list.
        items.push({name, agency, createdAt: new Date().toISOString()});
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

  // Final sales push and contacts from the TZ.
  const finalTitle = $('.final-copy h2');
  if (finalTitle) finalTitle.innerHTML = 'Не відкладайте<br><span>рішення.</span>';
  const finalText = $('.final-copy > p');
  if (finalText) finalText.textContent = 'До початку форуму залишилося небагато часу. Забронюйте місце вже сьогодні.';
  const finalButton = $('.final-copy .button');
  if (finalButton) finalButton.innerHTML = 'Купити квиток <span>↗</span>';

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
