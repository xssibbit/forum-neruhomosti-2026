from pathlib import Path

path = Path('index.html')
s = path.read_text(encoding='utf-8')

# Cache-bust the approved visual layer.
s = s.replace('live-match.css?v=20260903', 'live-match.css?v=20260903-final')

# Load customer-TZ content corrections after the original site script.
script_tag = '  <script src="tz-enhancements.js?v=20260903-final"></script>\n'
if 'tz-enhancements.js' not in s:
    s = s.replace('</body>', script_tag + '</body>', 1)

path.write_text(s, encoding='utf-8')

assert 'live-match.css?v=20260903-final' in s
assert 'tz-enhancements.js?v=20260903-final' in s
print('Final approved design/TZ assets attached to index.html')
