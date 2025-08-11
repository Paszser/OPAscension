(function () {
  const DURATION = 900; // Debe coincidir con --flip-duration en flip.css

  document.addEventListener('DOMContentLoaded', () => {
    // Crea el overlay para la animación
    const overlay = document.createElement('div');
    overlay.id = 'page-flip';
    document.body.appendChild(overlay);

    // Intercepta clics en enlaces dentro de la zona del periódico
    const scopeSelector = '.op-paperf';
    delegate(scopeSelector, 'a', (a, ev) => {
      if (a.target === '_blank' || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;

      const href = a.getAttribute('href');
      if (!href) return;

      // Evita animar enlaces externos
      const isExternal = href.startsWith('http') && !href.includes(location.hostname);
      if (isExternal) return;

      ev.preventDefault();
      document.body.classList.add('flip-out');
      setTimeout(() => { window.location.href = href; }, DURATION - 50);
    });

    // También soporta elementos con data-href (no solo <a>)
    delegate(scopeSelector, '[data-href]', (el, ev) => {
      const href = el.getAttribute('data-href');
      if (!href) return;
      ev.preventDefault();
      document.body.classList.add('flip-out');
      setTimeout(() => { window.location.href = href; }, DURATION - 50);
    });
  });

  // Función para delegar eventos
  function delegate(rootSelector, targetSelector, handler) {
    const root = document.querySelector(rootSelector) || document;
    root.addEventListener('click', function (ev) {
      const el = ev.target.closest(targetSelector);
      if (!el || !root.contains(el)) return;
      handler(el, ev);
    });
  }
})();
