(() => {
  const API = 'https://jykvmukcxlugxoyxfyvf.supabase.co/functions/v1/forum-admin-api';
  const $ = (s) => document.querySelector(s);
  const state = { key: sessionStorage.getItem('forum-admin-key') || '', page: 1, pageSize: 50, total: 0, rows: [] };

  const loginScreen = $('#login-screen');
  const dashboard = $('#dashboard');
  const loginForm = $('#login-form');
  const loginStatus = $('#login-status');
  const keyInput = $('#admin-key');
  const rowsEl = $('#rows');
  const emptyEl = $('#empty');
  const searchEl = $('#search');
  const cityEl = $('#city-filter');
  const agencyEl = $('#agency-filter');
  const pageLabel = $('#page-label');
  const prevBtn = $('#prev-btn');
  const nextBtn = $('#next-btn');

  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fmtDate = (value) => {
    if (!value) return '—';
    const d = new Date(value);
    return new Intl.DateTimeFormat('uk-UA', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' }).format(d);
  };

  async function api(params = {}, options = {}) {
    const url = new URL(API);
    Object.entries(params).forEach(([k,v]) => { if (v !== '' && v != null) url.searchParams.set(k, String(v)); });
    const response = await fetch(url, {
      ...options,
      headers: { 'x-admin-key': state.key, ...(options.headers || {}) }
    });
    const result = await response.json().catch(() => ({}));
    if (response.status === 401) throw new Error('unauthorized');
    if (!response.ok) throw new Error(result.error || 'Помилка сервера');
    return result;
  }

  function fillSelect(select, values, firstText) {
    const current = select.value;
    select.innerHTML = `<option value="">${firstText}</option>` + values.map(v => `<option value="${esc(v)}">${esc(v)}</option>`).join('');
    if ([...select.options].some(o => o.value === current)) select.value = current;
  }

  function render(data) {
    state.total = data.total || 0;
    state.rows = data.rows || [];
    $('#stat-total').textContent = data.total || 0;
    $('#stat-web').textContent = data.websiteCount || 0;
    $('#stat-manual').textContent = Math.max(0, (data.total || 0) - (data.websiteCount || 0));
    $('#result-note').textContent = `Знайдено: ${data.total || 0}`;

    fillSelect(cityEl, data.cities || [], 'Усі міста');
    fillSelect(agencyEl, data.agencies || [], 'Усі агентства');

    const pages = Math.max(1, Math.ceil((data.total || 0) / state.pageSize));
    state.page = Math.min(state.page, pages);
    pageLabel.textContent = `${state.page} / ${pages}`;
    prevBtn.disabled = state.page <= 1;
    nextBtn.disabled = state.page >= pages;

    rowsEl.innerHTML = state.rows.map((r, i) => {
      const n = (state.page - 1) * state.pageSize + i + 1;
      const agency = r.agency || '—';
      const city = r.city || '—';
      const source = r.source === 'website' ? '<span class="source-badge">сайт</span>' : '';
      return `<tr>
        <td class="number">${String(n).padStart(2,'0')}</td>
        <td class="name">${esc(r.full_name)} ${source}</td>
        <td class="${r.agency ? '' : 'muted'}">${esc(agency)}</td>
        <td class="${r.city ? '' : 'muted'}">${esc(city)}</td>
        <td>${esc(fmtDate(r.created_at))}</td>
        <td><button class="delete-btn" data-delete="${r.id}">Видалити</button></td>
      </tr>`;
    }).join('');
    emptyEl.hidden = state.rows.length > 0;
  }

  async function load() {
    $('#result-note').textContent = 'Оновлення…';
    try {
      const data = await api({
        q: searchEl.value.trim(),
        city: cityEl.value,
        agency: agencyEl.value,
        page: state.page,
        pageSize: state.pageSize
      });
      render(data);
      loginScreen.hidden = true;
      dashboard.hidden = false;
    } catch (error) {
      if (error.message === 'unauthorized') {
        state.key = '';
        sessionStorage.removeItem('forum-admin-key');
        dashboard.hidden = true;
        loginScreen.hidden = false;
        loginStatus.textContent = 'Невірний пароль.';
        loginStatus.className = 'status error';
      } else {
        $('#result-note').textContent = 'Помилка завантаження';
        console.error(error);
      }
    }
  }

  let timer;
  searchEl.addEventListener('input', () => {
    clearTimeout(timer);
    state.page = 1;
    timer = setTimeout(load, 260);
  });
  cityEl.addEventListener('change', () => { state.page = 1; load(); });
  agencyEl.addEventListener('change', () => { state.page = 1; load(); });
  $('#refresh-btn').addEventListener('click', load);
  prevBtn.addEventListener('click', () => { if (state.page > 1) { state.page--; load(); } });
  nextBtn.addEventListener('click', () => { state.page++; load(); });

  rowsEl.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-delete]');
    if (!btn) return;
    const id = Number(btn.dataset.delete);
    const row = btn.closest('tr');
    const name = row?.querySelector('.name')?.childNodes?.[0]?.textContent?.trim() || 'цього учасника';
    if (!confirm(`Видалити ${name}?`)) return;
    btn.disabled = true;
    try {
      await api({ id }, { method: 'DELETE' });
      if (state.rows.length === 1 && state.page > 1) state.page--;
      await load();
    } catch (error) {
      alert(error.message === 'unauthorized' ? 'Сесія завершена. Увійдіть знову.' : 'Не вдалося видалити запис.');
      btn.disabled = false;
    }
  });

  async function fetchAllFiltered() {
    const first = await api({ q: searchEl.value.trim(), city: cityEl.value, agency: agencyEl.value, page: 1, pageSize: 100 });
    let all = [...(first.rows || [])];
    const pages = Math.ceil((first.total || 0) / 100);
    for (let p = 2; p <= pages; p++) {
      const part = await api({ q: searchEl.value.trim(), city: cityEl.value, agency: agencyEl.value, page: p, pageSize: 100 });
      all.push(...(part.rows || []));
    }
    return all;
  }

  $('#export-btn').addEventListener('click', async () => {
    const btn = $('#export-btn');
    const old = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Готуємо CSV…';
    try {
      const items = await fetchAllFiltered();
      const q = (v) => `"${String(v ?? '').replaceAll('"','""')}"`;
      const lines = [
        ['№','ПІБ','Агентство / компанія','Місто','Дата реєстрації','Джерело'],
        ...items.map((r,i) => [i+1,r.full_name,r.agency||'',r.city||'',fmtDate(r.created_at),r.source === 'website' ? 'Сайт' : 'Вручну'])
      ].map(row => row.map(q).join(';'));
      const blob = new Blob(['\ufeff' + lines.join('\n')], { type:'text/csv;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `forum-2026-uchasnyky-${new Date().toISOString().slice(0,10)}.csv`;
      a.click();
      URL.revokeObjectURL(a.href);
    } catch (error) {
      alert('Не вдалося сформувати CSV.');
    } finally {
      btn.disabled = false;
      btn.textContent = old;
    }
  });

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    state.key = keyInput.value.trim();
    if (!state.key) return;
    loginStatus.textContent = 'Перевіряємо…';
    loginStatus.className = 'status';
    sessionStorage.setItem('forum-admin-key', state.key);
    state.page = 1;
    await load();
  });

  $('#logout-btn').addEventListener('click', () => {
    state.key = '';
    sessionStorage.removeItem('forum-admin-key');
    dashboard.hidden = true;
    loginScreen.hidden = false;
    keyInput.value = '';
    loginStatus.textContent = '';
  });

  if (state.key) load();
})();
