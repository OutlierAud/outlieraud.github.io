// js/load_page.js — powers narrative pages (about/intro.html,
// contact/getintouch.html). Reads the category from the URL's first
// path segment, sets data-category on <body>, and lets
// load_components.js fetch the content fragment declared in
// data-content.

(function () {
  function init() {
    const category = window.location.pathname.split('/').filter(Boolean)[0] || '';
    if (!category) return;

    document.body.setAttribute('data-category', category);

    const info = (typeof categoryStyle !== 'undefined') ? categoryStyle[category] : null;
    if (info) document.title = `Outlier Aud | ${info.name}`;

    document.dispatchEvent(new Event('categoryReady'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();