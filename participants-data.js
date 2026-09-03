(() => {
  const KEY = 'forum-neruhomosti-2026-participants-v1';

  const seededParticipants = [
    { name: 'Реміна Вікторія Анатоліївна', agency: '—' },
    { name: 'Березюк Діна Дмитрівна', agency: '—' },
    { name: 'Приймак Світлана Іванівна', agency: '—' },
    { name: 'Шевченко Ірина Василівна', agency: '—' },
    { name: 'Міненко Євгенія Едуардівна', agency: '—' },
    { name: 'Слепенчук Ірина Петрівна', agency: '—' },
    { name: 'Кузнецова Наталія Андріївна', agency: '—' },
    { name: 'Богданець Тетяна Володимирівна', agency: '—' },
    { name: 'Підлісна Ірина Василівна', agency: '—' },
    { name: 'Богуш Ліліана', agency: '—' },
    { name: 'Козинюк Лариса', agency: '—' },
    { name: 'Гаєвська Марина', agency: '—' },
    { name: 'Кулійчук Олена Миколаївна', agency: '—' },
    { name: 'Гапченко Олександр Миколайович', agency: '—' },
    { name: 'Мацько Таїсія Петрівна', agency: '—' },
    { name: 'Маринич Вікторія Петрівна', agency: '—' },
    { name: 'Слюсар Єлизавета Миколаївна', agency: '—' },
    { name: 'Якубчак Тетяна Анатоліївна', agency: '—' },
    { name: 'Волосович Наталія Олегівна', agency: '—' },
    { name: 'Кухарук Мая Вячеславівна', agency: '—' },
    { name: 'Гилюк Юлія Ігорівна', agency: '—' },
    { name: 'Березньова Ганна Юріівна', agency: '—' },
    { name: 'Драченко Юлія Дмитрівна', agency: '—' },
    { name: 'Прилипко Галина Павлівна', agency: '—' },
    { name: 'Кушнір Любов Михайлівна', agency: '—' },
    { name: 'Григорчук Людмила Борисівна', agency: '—' },
    { name: "Дем'яненко Наталія Володимирівна", agency: '—' },
    { name: 'Дробот Анна', agency: '—' },
    { name: 'Маркова Альбіна', agency: '—' },
    { name: 'Новікова Ліліанна', agency: '—' },
    { name: 'Штельмах Ольга', agency: '—' },
    { name: 'Наконечна Альона', agency: '—' },
    { name: 'Антко Света', agency: '—' },
    { name: 'Сідлецька Таня', agency: '—' },
    { name: 'Яблочнікова Олена', agency: '—' },
    { name: 'Король Юлія', agency: '—' },
    { name: 'Біла Лілія', agency: '—' },
    { name: 'Поліщук Галина', agency: '—' },
    { name: 'Сурменко Наталія', agency: '—' },
    { name: 'Сазонова Людмила', agency: '—' },
    { name: 'Крістенчук Наталія', agency: '—' },
    { name: 'Захарченко Сергій', agency: '—' }
  ];

  let saved = [];
  try {
    saved = JSON.parse(localStorage.getItem(KEY) || '[]');
    if (!Array.isArray(saved)) saved = [];
  } catch {
    saved = [];
  }

  const merged = new Map();
  seededParticipants.forEach(person => merged.set(person.name.toLocaleLowerCase('uk'), person));
  saved
    .filter(person => person && person.name)
    .forEach(person => merged.set(String(person.name).toLocaleLowerCase('uk'), person));

  localStorage.setItem(KEY, JSON.stringify([...merged.values()]));

  // Replace the old payment-reference field with City without changing the rest of the form markup.
  const form = document.querySelector('#participantForm');
  const cityField = form?.querySelector('[name="paymentRef"]');
  if (cityField) {
    const label = cityField.closest('label');
    const labelText = label?.querySelector('span');
    if (labelText) labelText.textContent = 'Місто';
    cityField.placeholder = 'Наприклад: Вінниця';
    cityField.autocomplete = 'address-level2';
    cityField.setAttribute('aria-label', 'Місто');
  }

  const consentText = form?.querySelector('.form-consent span');
  if (consentText) {
    consentText.textContent = 'Погоджуюся на публікацію мого ПІБ та агентства у списку учасників.';
  }

  // Persist the entered city alongside the participant after the existing submit handler runs.
  form?.addEventListener('submit', () => {
    const name = String(form.querySelector('[name="fullName"]')?.value || '').trim();
    const city = String(cityField?.value || '').trim();
    if (!name || !city) return;

    setTimeout(() => {
      try {
        const items = JSON.parse(localStorage.getItem(KEY) || '[]');
        if (!Array.isArray(items)) return;
        const participant = items.find(item => String(item?.name || '').toLocaleLowerCase('uk') === name.toLocaleLowerCase('uk'));
        if (participant) {
          participant.city = city;
          localStorage.setItem(KEY, JSON.stringify(items));
        }
      } catch {}
    }, 0);
  }, true);
})();
