class PostController {
    constructor() {
        this.postForm = document.querySelector('.post-form');
        this.postsContainer = document.querySelector('#posts-container');
        this.newPostInput = document.querySelector('#new-post');
        this.charCount = document.querySelector('#char-count');
        this.postBtn = document.querySelector('#post-btn');

        this.initializeEventListeners();
        this.loadPosts();
    }

    initializeEventListeners() {
        this.postBtn.addEventListener('click', this.handleNewPost.bind(this));
        this.newPostInput.addEventListener('input', this.updateCharCount.bind(this));
    }

    async handleNewPost(event) {
        event.preventDefault();
        const content = this.newPostInput.value.trim();

        if (!content) {
            alert('Por favor, escreva algo para publicar.');
            return;
        }

        try {
            await Api.createPost(content);
            this.newPostInput.value = '';
            this.updateCharCount();
            this.loadPosts();
        } catch (error) {
            alert(error.message);
        }
    }

    updateCharCount() {
        const remaining = 280 - this.newPostInput.value.length;
        this.charCount.textContent = remaining;
        this.charCount.style.color = remaining < 50 ? 'var(--error-color)' : '#657786';
    }

    async loadPosts() {
        try {
            const posts = await Api.getPosts();
            this.renderPosts(posts);
        } catch (error) {
            console.error('Erro ao carregar posts:', error);
        }
    }

    async handleDeletePost(postId) {
        if (!confirm('Tem certeza que deseja excluir esta postagem?')) {
            return;
        }

        try {
            await Api.deletePost(postId);
            this.loadPosts();
        } catch (error) {
            alert(error.message);
        }
    }

    renderPosts(posts) {
        this.postsContainer.innerHTML = '';
        const currentUser = JSON.parse(localStorage.getItem('user'));

        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.innerHTML = `
                <div class="post-header">
                    <span class="post-author">@${post.author.username}</span>
                    <span class="post-date">${this.formatDate(post.createdAt)}</span>
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
            this.postsContainer.appendChild(postElement);
        });
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
} 