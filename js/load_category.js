// js/load_category.js — powers every category landing.html. Reads the
// category from the URL's first path segment (e.g. /challenges/landing.html
// → "challenges"), builds the landing header from js/category_style.js,
// then hands off to loadPosts().

function currentCategoryFromPath() {
  return window.location.pathname.split('/').filter(Boolean)[0] || '';
}

function renderCategoryHeader(category, info) {
  const container = document.querySelector('.landing');
  if (!container) return;

  document.title = `Outlier Aud | ${info.name}`;
  document.body.setAttribute('data-category', category);
  document.dispatchEvent(new Event('categoryReady'));

  container.innerHTML = `
    <header class="page-head page-head--lg">
      <span class="page-head__eyebrow">Outlier Aud</span>
      <h1 class="page-head__title"><span class="page-head__initial">${info.name.charAt(0)}</span>${info.name.slice(1)}</h1>
      ${info.subhead ? `<p class="page-head__subhead">${info.subhead}</p>` : ''}
      <p class="page-head__desc">${info.description}</p>
    </header>
    <div id="featured-post-container" class="featured-section"></div>
    <div class="filter-bar">
      <span class="filter-bar__label">Filter by genre</span>
      <div id="filter-buttons" class="filter-buttons"></div>
    </div>
    <div id="regular-posts-container" class="category-boxes"></div>
  `;
}

function loadCategoryPage() {
  const category = currentCategoryFromPath();
  const info = (typeof categoryStyle !== 'undefined') ? categoryStyle[category] : null;
  const container = document.querySelector('.landing');

  if (!info) {
    if (container) container.innerHTML = '<div class="error">Unknown category.</div>';
    return;
  }

  renderCategoryHeader(category, info);
  loadPosts(category);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadCategoryPage);
} else {
  loadCategoryPage();
}