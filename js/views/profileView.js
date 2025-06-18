// profileView.js

export function showProfile(mainContainer, profileContainer) {
    mainContainer.classList.add('hidden');
    profileContainer.classList.remove('hidden');
}

export function showMainContainer(profileContainer, mainContainer) {
    profileContainer.classList.add('hidden');
    mainContainer.classList.remove('hidden');
}

export function showEditForm(editProfileBtn, editProfileForm) {
    editProfileBtn.classList.add('hidden');
    editProfileForm.classList.remove('hidden');
}

export function hideEditForm(editProfileForm, editProfileBtn) {
    editProfileForm.classList.add('hidden');
    editProfileBtn.classList.remove('hidden');
}

export function renderUserPosts(posts, profilePostsContainer) {
    profilePostsContainer.innerHTML = '';
    if (posts.length === 0) {
        profilePostsContainer.innerHTML = '<p>Você ainda não fez nenhuma postagem.</p>';
        return;
    }
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <div class="post-header">
                <span class="post-date">${formatDate(post.createdAt)}</span>
            </div>
            <div class="post-content">${post.content}</div>
            <div class="post-actions">
                <button onclick="postController.handleDeletePost('${post._id}')">
                    Excluir
                </button>
            </div>
        `;
        profilePostsContainer.appendChild(postElement);
    });
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