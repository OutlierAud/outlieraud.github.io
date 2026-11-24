// js/load_components.js — loads header and footer partials, plus a page's
// main content if it declares one via
// <main id="mainContentContainer" data-content="/some-fragment.html">.

async function loadComponent(elementId, filePath) {
  const el = document.getElementById(elementId);
  if (!el) return false;
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    el.innerHTML = await response.text();
    return true;
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error);
    el.innerHTML = `<div class="error">Failed to load ${filePath}</div>`;
    return false;
  }
}

async function loadAllComponents() {
  const tasks = [
    loadComponent('headerContainer', '/header.html'),
    loadComponent('footerContainer', '/footer.html'),
  ];
  const contentEl = document.getElementById('mainContentContainer');
  const contentPath = contentEl && contentEl.getAttribute('data-content');
  if (contentPath) tasks.push(loadComponent('mainContentContainer', contentPath));

  await Promise.all(tasks);
  document.dispatchEvent(new Event('componentsLoaded'));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadAllComponents);
} else {
  loadAllComponents();
}