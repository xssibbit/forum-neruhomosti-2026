from pathlib import Path
import subprocess

BASE_COMMIT = "72950123a9c22ca743afb0963b6bb2e059079fa7"
s = subprocess.check_output(["git", "show", f"{BASE_COMMIT}:index.html"], text=True)

# Load the visual override after the original single-file stylesheet.
if "live-match.css" not in s:
    s = s.replace("</head>", '  <link rel="stylesheet" href="live-match.css?v=20260903">\n</head>', 1)

# Published hero copy.
if "PRIVATE BUSINESS EDITION · 2026" not in s:
    s = s.replace(
        '<div class="hero-copy reveal">',
        '<div class="hero-copy reveal">\n          <div class="edition-stamp">PRIVATE BUSINESS EDITION · 2026</div>',
        1,
    )
s = s.replace(
    '<a class="button ghost" href="#program">Дивитися програму <span>↓</span></a>',
    '<a class="button ghost" href="#participants">РЕЄСТРАЦІЯ УЧАСНИКІВ <span>↓</span></a>',
)

# Participants navigation link in desktop/mobile menus.
s = s.replace(
    '<a href="#tickets">Квитки</a>\n      <a href="#location">Локація</a>',
    '<a href="#tickets">Квитки</a>\n      <a href="#participants">Учасники</a>\n      <a href="#location">Локація</a>',
)

if 'id="participants"' not in s:
    section = """    <section class="section participants" id="participants">
      <div class="container">
        <div class="section-kicker reveal">05 / РЕЄСТРАЦІЯ УЧАСНИКІВ</div>
        <div class="participants-head">
          <h2 class="section-title reveal">Ви вже придбали квиток?<br><span>Заповніть дані після оплати.</span></h2>
          <p class="reveal delay-1">У загальному списку відображатимуться лише ім’я учасника та його агентство.</p>
        </div>
        <div class="participants-layout">
          <form class="participant-form reveal" id="participantForm">
            <div class="form-head"><strong>Дані учасника</strong><small>Усі поля обов’язкові.</small></div>
            <label><span>ПРІЗВИЩЕ, ІМ’Я, ПО БАТЬКОВІ</span><input name="fullName" required maxlength="120" autocomplete="name" placeholder="Прізвище, ім’я, по батькові"></label>
            <label><span>АГЕНТСТВО / КОМПАНІЯ</span><input name="agency" required maxlength="120" autocomplete="organization" placeholder="Агентство / компанія"></label>
            <label><span>НОМЕР АБО ПРИЗНАЧЕННЯ ПЛАТЕЖУ</span><input name="paymentRef" required maxlength="160" placeholder="Номер або призначення платежу"></label>
            <label class="consent"><input type="checkbox" name="consent" required><span>Погоджуюся на публікацію мого ПІБ та агентства у списку учасників.</span></label>
            <button class="button primary wide" type="submit">НАДІСЛАТИ ДАНІ <span>↗</span></button>
            <p class="form-message" id="formMessage" role="status" aria-live="polite"></p>
          </form>
          <div class="participants-public reveal delay-1">
            <div class="participants-title"><div><small>Зареєстровані учасники</small><h3>Учасники форуму</h3></div><strong id="participantCount">0 <span>УЧАСНИКІВ</span></strong></div>
            <div id="participantList" class="participant-list"><p class="empty-state">Перші зареєстровані учасники з’являться тут.</p></div>
          </div>
        </div>
      </div>
    </section>

"""
    s = s.replace('    <section class="section countdown-section">', section + '    <section class="section countdown-section">', 1)

# Footer link.
s = s.replace(
    '<a href="#tickets">Квитки</a><a href="#location">Локація</a>',
    '<a href="#tickets">Квитки</a><a href="#participants">Учасники</a><a href="#location">Локація</a>',
)

# Isolated registration behavior.
if "participants.js" not in s:
    s = s.replace("</body>", '  <script src="participants.js?v=20260903" defer></script>\n</body>', 1)

Path("index.html").write_text(s)

assert "live-match.css" in s
assert 'id="participants"' in s
assert "РЕЄСТРАЦІЯ УЧАСНИКІВ" in s
print(f"Wrote index.html: {len(s)} bytes")
