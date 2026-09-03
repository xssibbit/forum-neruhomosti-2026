(() => {
  const API = 'https://jykvmukcxlugxoyxfyvf.supabase.co/functions/v1/forum-admin-api';

  const init = () => {
    const form = document.querySelector('#participant-form');
    if (!form || form.dataset.backendBound === '1') return;
    form.dataset.backendBound = '1';

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();

      const status = document.querySelector('#participant-status');
      const button = form.querySelector('button[type="submit"]');
      const data = new FormData(form);
      const payload = {
        fullName: String(data.get('fullName') || '').trim(),
        agency: String(data.get('agency') || '').trim(),
        city: String(data.get('city') || '').trim(),
        consent: Boolean(data.get('consent'))
      };

      if (!payload.fullName || !payload.agency || !payload.city || !payload.consent) {
        if (status) {
          status.textContent = 'Заповніть усі поля та підтвердьте згоду.';
          status.className = 'form-status error';
        }
        return;
      }

      if (button) {
        button.disabled = true;
        button.dataset.oldText = button.innerHTML;
        button.innerHTML = 'Надсилаємо…';
      }
      if (status) {
        status.textContent = 'Зберігаємо вашу реєстрацію…';
        status.className = 'form-status';
      }

      try {
        const response = await fetch(API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(result.error || 'Помилка реєстрації');

        form.reset();
        if (status) {
          status.textContent = result.duplicate
            ? 'Цей учасник уже зареєстрований.'
            : 'Готово. Дані успішно передані організаторам.';
          status.className = 'form-status ok';
        }
      } catch (error) {
        if (status) {
          status.textContent = 'Не вдалося надіслати дані. Спробуйте ще раз або зверніться до організаторів.';
          status.className = 'form-status error';
        }
        console.error(error);
      } finally {
        if (button) {
          button.disabled = false;
          button.innerHTML = button.dataset.oldText || 'Надіслати дані <span>↗</span>';
        }
      }
    }, true);
  };

  init();
  if (!document.querySelector('#participant-form')) {
    const observer = new MutationObserver(() => {
      if (document.querySelector('#participant-form')) {
        init();
        observer.disconnect();
      }
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }
})();
