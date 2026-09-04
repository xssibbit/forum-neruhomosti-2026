(() => {
  const id = 'hero-reference-final-css';
  const old = document.getElementById(id);
  if (old) old.remove();
  const link = document.createElement('link');
  link.id = id;
  link.rel = 'stylesheet';
  link.href = 'hero-reference-final.css?v=20260904-ref-final';
  document.head.appendChild(link);
})();
