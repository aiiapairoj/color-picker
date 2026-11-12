/* Apply saved / system theme before first paint (avoids light-flash). Kept as a tiny
   external classic script so the production CSP can forbid inline scripts. */
(function () {
  var t = null;
  try { t = JSON.parse(localStorage.getItem('bp.prefs') || '{}').theme; } catch (e) { /* storage blocked */ }
  if (t !== 'light' && t !== 'dark') t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.classList.toggle('dark', t === 'dark');
})();
