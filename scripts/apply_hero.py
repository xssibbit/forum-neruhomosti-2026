from pathlib import Path

p = Path('index.html')
s = p.read_text(encoding='utf-8')
start_marker = '    <section class="hero">'
next_marker = '    <section class="section about" id="about">'
start = s.find(start_marker)
end = s.find(next_marker)
if start == -1 or end == -1 or end <= start:
    raise SystemExit(f'hero markers not found: start={start}, end={end}')

hero = '''    <section class="hero ref-hero" aria-labelledby="ref-hero-title">
      <div class="ref-hero-left">
        <div class="ref-hero-star" aria-hidden="true">✦</div>
        <div class="ref-hero-date"><strong>25–26</strong><span>ВЕРЕСНЯ · ВІННИЦЯ</span></div>
        <h1 class="ref-hero-title" id="ref-hero-title"><span>ФОРУМ</span><em>НЕРУХОМОСТІ</em></h1>
        <p class="ref-hero-desc">Два дні практики, кейсів, нетворкінгу та майстер-класів від провідних експертів ринку нерухомості.</p>
        <div class="ref-hero-venue"><span class="ref-hero-pin" aria-hidden="true"></span><div><b>Місце проведення заходу:</b> готельно-ресторанний комплекс «Mont Blanc», Hotel France · вул. Соборна, 34 · Вінниця</div></div>
        <div class="ref-hero-actions">
          <a class="ref-hero-btn primary" href="#tickets">КУПИТИ КВИТОК <i>◇</i></a>
          <a class="ref-hero-btn secondary" href="#participants">БРОНЮВАННЯ МІСЦЯ <i>▣</i></a>
        </div>
      </div>
      <div class="ref-hero-visual" aria-hidden="true"><img src="assets/hero-main.jpg?v=20260904-hardfinal2" alt=""></div>
      <div class="ref-hero-blend" aria-hidden="true"></div>
    </section>

'''

s = s[:start] + hero + s[end:]

# Remove obsolete final hero loaders/links if present.
for token in [
    '<link rel="stylesheet" href="hero-reference-final.css?v=20260904-direct2">\n',
    '<script src="hero-reference-final.js?v=20260904-ref-final"></script>\n',
    '<link rel="stylesheet" href="hero-hard-final.css?v=20260904-hardfinal1">\n',
]:
    s = s.replace(token, '')

link = '  <link rel="stylesheet" href="hero-hard-final.css?v=20260904-hardfinal2">\n'
s = s.replace('</head>', link + '</head>')
s = s.replace('assets/hero-main.jpg?v=20260904-hardfinal1', 'assets/hero-main.jpg?v=20260904-hardfinal2')
p.write_text(s, encoding='utf-8')
print('hero replaced successfully')
