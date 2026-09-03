(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Keep only one edition label (an earlier sync accidentally duplicated it).
  const stamps = $$('.hero .edition-stamp');
  stamps.slice(1).forEach(el => el.remove());
  if (stamps[0]) stamps[0].textContent = 'PRIVATE BUSINESS EDITION · 2026';

  // Customer TZ: top-right registration CTA. Google Form URL was not supplied,
  // so it currently opens the dedicated registration page already created for the project.
  const registrationUrl = 'participants.html';
  const headerCta = $('.header-cta');
  if (headerCta) {
    headerCta.href = registrationUrl;
    headerCta.innerHTML = 'Реєстрація <span>↗</span>';
    headerCta.setAttribute('aria-label', 'Реєстрація учасників');
  }

  // Navigation: add registration and outcomes without disturbing the approved composition.
  $$('.desktop-nav, .mobile-menu nav').forEach(nav => {
    if (!nav.querySelector('a[href="#outcomes"]')) {
      const programLink = nav.querySelector('a[href="#program"]');
      const link = document.createElement('a');
      link.href = '#outcomes';
      link.textContent = 'Що отримаєте';
      if (programLink) nav.insertBefore(link, programLink);
    }
    if (!nav.querySelector('a[href="participants.html"]')) {
      const locationLink = nav.querySelector('a[href="#location"]');
      const link = document.createElement('a');
      link.href = registrationUrl;
      link.textContent = 'Реєстрація';
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

  // Public participants live on the dedicated page, not inside the long landing page.
  const embeddedParticipants = $('#participants');
  if (embeddedParticipants) embeddedParticipants.remove();

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

  // Keep the footer aligned with the new section and registration page.
  const footerLinks = $('.footer-links');
  if (footerLinks && !footerLinks.querySelector('a[href="#outcomes"]')) {
    const link = document.createElement('a');
    link.href = '#outcomes';
    link.textContent = 'Що отримаєте';
    footerLinks.insertBefore(link, footerLinks.firstChild);
  }

  // Smooth-close the mobile menu for dynamically inserted links too.
  $$('.mobile-menu a').forEach(a => a.addEventListener('click', () => {
    document.body.classList.remove('menu-open');
    $('.mobile-menu')?.setAttribute('aria-hidden', 'true');
    $('.menu-toggle')?.setAttribute('aria-expanded', 'false');
  }));
})();
