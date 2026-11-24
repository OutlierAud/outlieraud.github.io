// js/apply_category_colors.js — sets --category-color and highlights the
// matching nav link in the header.

(function () {
  function applyCategoryColor() {
    const category = document.body.getAttribute('data-category');
    if (!category) return;

    // If the category is unknown, --category-color keeps its default (--accent in base.css).
    const info = (typeof categoryStyle !== 'undefined') ? categoryStyle[category] : null;
    if (info) document.documentElement.style.setProperty('--category-color', info.color);

    document.querySelectorAll('.site-nav a').forEach(link => {
      const linkCat = link.getAttribute('data-category');
      link.classList.toggle('active', linkCat === category);
    });
  }

  if (document.body.getAttribute('data-category')) applyCategoryColor();
  document.addEventListener('componentsLoaded', applyCategoryColor);
  document.addEventListener('categoryReady', applyCategoryColor);
})();