// postView.js

export function renderPosts(posts) {
    const postsContainer = document.querySelector('#posts-container');
    postsContainer.innerHTML = '';
    const currentUser = JSON.parse(localStorage.getItem('user'));

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <div class="post-header">
                <span class="post-author">@${post.author.username}</span>
                <span class="post-date">${formatDate(post.createdAt)}</span>
            </div>
            <div class="post-content">${post.content}</div>
            ${post.author._id === currentUser.id ? `
                <div class="post-actions">
                    <button onclick="postController.handleDeletePost('${post._id}')">
                        Excluir
                    </button>
                </div>
            ` : ''}
        `;
        postsContainer.appendChild(postElement);
    });
}

export function updateCharCount(newPostInput) {
    const charCount = document.querySelector('#char-count');
    const remaining = 280 - newPostInput.value.length;
    charCount.textContent = remaining;
    charCount.style.color = remaining < 50 ? 'var(--error-color)' : '#657786';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
} 