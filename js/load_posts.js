// js/load_posts.js — fetches /json/<category>.json, renders the featured
// post, filter buttons, and post grid. Reads post.viz as the card
// thumbnail (existing field). Defines functions only; load_category.js
// calls loadPosts() once the landing header is in the DOM.

const genreIcons = {
  'r':                '/assets/icons/r.png',
  'sql':              '/assets/icons/sql.png',
  'powerbi':          '/assets/icons/powerbi.png',
  'data-science':     '/assets/icons/ml.png',
  'techniques':       '/assets/icons/tableau.png',
  'general':          '/assets/icons/tableau.png',
};

let allPosts = [];
let currentCategory = '';
let currentFilter = 'all';

async function loadPosts(category) {
  currentCategory = category || document.body.getAttribute('data-category');
  const regularContainer = document.getElementById('regular-posts-container');
  if (!currentCategory) {
    if (regularContainer) regularContainer.innerHTML =
      '<div class="error">No category set on this page.</div>';
    return;
  }

  try {
    const response = await fetch(`/json/${currentCategory}.json`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (!data.posts) throw new Error(`json/${currentCategory}.json is missing a "posts" array`);

    allPosts = data.posts;
    renderPosts();
    setupFilterButtons();
  } catch (err) {
    console.error(err);
    if (regularContainer) regularContainer.innerHTML =
      `<div class="error">Failed to load posts: ${err.message}</div>`;
  }
}

function renderPosts() {
  const featured = allPosts.find(post => post.featured === true);
  let regular = allPosts.filter(post => post.featured !== true);
  if (currentFilter !== 'all') regular = regular.filter(post => post.genre === currentFilter);

  const featuredContainer = document.getElementById('featured-post-container');
  if (featuredContainer) featuredContainer.innerHTML = featured ? renderCard(featured, true) : '';

  const regularContainer = document.getElementById('regular-posts-container');
  if (regularContainer) {
    regularContainer.innerHTML = regular.length
      ? regular.slice(0, 6).map(post => renderCard(post, false)).join('')
      : '<p class="no-posts">No posts match the selected filter.</p>';
  }
}

function renderCard(post, featured) {
  const label = featured ? 'Featured' : post.genre.replace('-', ' ').toUpperCase();
  const href = `/post.html?cat=${currentCategory}&id=${post.id}`;
  const thumb = post.viz
    ? `<a href="${href}" class="card__thumb"><img src="${post.viz}" alt="${post.title}"></a>`
    : '';

  if (featured) {
    return `
      <article class="card card--featured">
        <div class="card__meta">
          ${getIconHtml(post.genre)}
          <span>${label}</span>
        </div>
        ${thumb}
        <div class="card__body">
          <h3 class="card__title"><a href="${href}">${post.title}</a></h3>
          <div class="card__date">${formatDate(post.date)}</div>
          <p class="card__excerpt">${post.excerpt}</p>
          <a href="${href}" class="card__link">Read the story →</a>
        </div>
      </article>`;
  }

  return `
    <article class="card">
      <div class="card__meta">
        ${getIconHtml(post.genre)}
        <span>${label}</span>
      </div>
      ${thumb}
      <div class="card__body">
        <h3 class="card__title"><a href="${href}">${post.title}</a></h3>
        <div class="card__date">${formatDate(post.date)}</div>
        <p class="card__excerpt">${post.excerpt}</p>
        <a href="${href}" class="card__link">Read →</a>
      </div>
    </article>`;
}

function getIconHtml(genre) {
  const iconPath = genreIcons[genre] || genreIcons.general;
  return `<img src="${iconPath}" alt="${genre}" class="genre-icon" width="16" height="16">`;
}

function formatDate(dateStr) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

function setupFilterButtons() {
  const filterContainer = document.getElementById('filter-buttons');
  if (!filterContainer) return;

  const genres = [...new Set(allPosts.map(post => post.genre))];
  filterContainer.innerHTML = ['all', ...genres].map(genre => `
    <button class="filter-btn ${currentFilter === genre ? 'active' : ''}" data-filter="${genre}">
      ${genre === 'all' ? 'All' : genre.replace('-', ' ').toUpperCase()}
    </button>`).join('');

  filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentFilter = btn.getAttribute('data-filter');
      renderPosts();
      filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}
