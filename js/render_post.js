// js/render_post.js - Renders a single content page (post.html) from
// /json/<category>.json (metadata) + /json/content/<category>/<id>.html (body),
// based on ?cat= and ?id= query params. To publish a new post: add an
// entry to /json/<category>.json and a matching file at
// /json/content/<category>/<id>.html.

async function loadPost() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('cat');
    const id = params.get('id');
    const bodyEl = document.getElementById('postBody');

    if (!category || !id) {
        bodyEl.innerHTML = '<div class="error">No post specified.</div>';
        return;
    }

    try {
        const listResponse = await fetch(`/json/${category}.json`);
        if (!listResponse.ok) throw new Error(`HTTP ${listResponse.status}`);
        const data = await listResponse.json();
        const post = (data.posts || []).find(p => p.id === id);
        if (!post) throw new Error('Post not found.');
        post.category = category;

        renderPostMeta(post);

        const contentResponse = await fetch(`/json/content/${category}/${id}.html`);
        bodyEl.innerHTML = contentResponse.ok
            ? await contentResponse.text()
            : `<p>${post.excerpt}</p>`;
    } catch (err) {
        console.error(err);
        bodyEl.innerHTML = `<div class="error">Failed to load post: ${err.message}</div>`;
    }
}

function renderPostMeta(post) {
    document.title = `OutlierAud | ${post.title}`;
    document.body.setAttribute('data-category', post.category);
    document.dispatchEvent(new Event('categoryReady'));

    const info = (typeof categoryStyle !== 'undefined') ? categoryStyle[post.category] : null;

    document.getElementById('firstLetter').textContent = post.title.charAt(0);
    document.getElementById('postTitleRest').textContent = post.title.slice(1);
    document.getElementById('categoryBadge').textContent = info ? info.name : post.category;
    document.getElementById('postDate').textContent = formatDate(post.date);

    const subheadEl = document.getElementById('postSubhead');
    subheadEl.textContent = post.subhead || '';
    subheadEl.hidden = !post.subhead;

    document.getElementById('backLink').setAttribute('href', (info && info.url) || '/index.html');
}

function formatDate(dateStr) {
    return new Date(`${dateStr}T00:00:00`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadPost);
} else {
    loadPost();
}