(() => {
  const id = 'partner-logo-fix-css';
  if (!document.getElementById(id)) {
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = 'partner-logos.css?v=user-png-final-1';
    document.head.appendChild(link);
  }
})();

(() => {
  const form = document.querySelector('#participantForm');
  const list = document.querySelector('#participantList');
  const count = document.querySelector('#participantCount');
  const message = document.querySelector('#formMessage');
  if (!form || !list || !count) return;

  const KEY = 'forum-neruhomosti-2026-participants-v1';
  const read = () => {
    try {
      return JSON.parse(localStorage.getItem(KEY) || '[]').filter(x => x && x.name && x.agency);
    } catch {
      return [];
    }
  };
  const esc = value => String(value).replace(/[&<>"']/g, char => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[char]));
  const render = () => {
    const items = read();
    count.innerHTML = `${items.length} <span>УЧАСНИКІВ</span>`;
    list.innerHTML = items.length
      ? items.map((p, i) => `<div class="participant-row"><span>${String(i + 1).padStart(2,'0')}</span><strong>${esc(p.name)}</strong><b>${esc(p.agency)}</b></div>`).join('')
      : '<p class="empty-state">Перші зареєстровані учасники з’являться тут.</p>';
  };

  render();
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('fullName') || '').trim();
    const agency = String(data.get('agency') || '').trim();
    const city = String(data.get('city') || data.get('paymentRef') || '').trim();
    const consent = data.get('consent');
    message.className = 'form-message';

    if (!name || !agency || !city || !consent) {
      message.textContent = 'Заповніть усі поля та підтвердьте згоду.';
      message.classList.add('error');
      return;
    }

    const items = read();
    if (!items.some(item => item.name.toLocaleLowerCase('uk') === name.toLocaleLowerCase('uk'))) {
      items.push({ name, agency, city });
      localStorage.setItem(KEY, JSON.stringify(items));
    }
    form.reset();
    render();
    message.textContent = 'Дані прийнято. У списку показано ПІБ та агентство.';
    message.classList.add('ok');
  });
})();
