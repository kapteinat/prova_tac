class ProfileController {
    constructor() {
        this.profileContainer = document.querySelector('#profile-container');
        this.mainContainer = document.querySelector('#main-container');
        this.showProfileBtn = document.querySelector('#show-profile');
        this.backToFeedBtn = document.querySelector('#back-to-feed');
        this.editProfileBtn = document.querySelector('#edit-profile-btn');
        this.editProfileForm = document.querySelector('#edit-profile-form');
        this.cancelEditBtn = document.querySelector('#cancel-edit');
        this.profilePostsContainer = document.querySelector('#profile-posts-container');

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.showProfileBtn.addEventListener('click', this.showProfile.bind(this));
        this.backToFeedBtn.addEventListener('click', this.showMainContainer.bind(this));
        this.editProfileBtn.addEventListener('click', this.showEditForm.bind(this));
        this.cancelEditBtn.addEventListener('click', this.hideEditForm.bind(this));
        this.editProfileForm.addEventListener('submit', this.handleProfileUpdate.bind(this));
    }

    async showProfile() {
        this.mainContainer.classList.add('hidden');
        this.profileContainer.classList.remove('hidden');
        await this.loadProfile();
        await this.loadUserPosts();
    }

    showMainContainer() {
        this.profileContainer.classList.add('hidden');
        this.mainContainer.classList.remove('hidden');
    }

    showEditForm() {
        this.editProfileBtn.classList.add('hidden');
        this.editProfileForm.classList.remove('hidden');
    }

    hideEditForm() {
        this.editProfileForm.classList.add('hidden');
        this.editProfileBtn.classList.remove('hidden');
    }

    async loadProfile() {
        try {
            const profile = await Api.getProfile();
            document.querySelector('#profile-username').textContent = `@${profile.username}`;
            document.querySelector('#profile-email').textContent = profile.email;
            document.querySelector('#edit-username').value = profile.username;
            document.querySelector('#edit-email').value = profile.email;
        } catch (error) {
            console.error('Erro ao carregar perfil:', error);
        }
    }

    async loadUserPosts() {
        try {
            const posts = await Api.getMyPosts();
            this.renderUserPosts(posts);
        } catch (error) {
            console.error('Erro ao carregar posts do usuário:', error);
        }
    }

    async handleProfileUpdate(event) {
        event.preventDefault();
        const username = document.querySelector('#edit-username').value;
        const email = document.querySelector('#edit-email').value;

        try {
            const response = await Api.updateProfile(username, email);
            localStorage.setItem('user', JSON.stringify(response.user));
            this.hideEditForm();
            await this.loadProfile();
            alert('Perfil atualizado com sucesso!');
        } catch (error) {
            alert(error.message);
        }
    }

    renderUserPosts(posts) {
        this.profilePostsContainer.innerHTML = '';
        
        if (posts.length === 0) {
            this.profilePostsContainer.innerHTML = '<p>Você ainda não fez nenhuma postagem.</p>';
            return;
        }

        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.innerHTML = `
                <div class="post-header">
                    <span class="post-date">${this.formatDate(post.createdAt)}</span>
                </div>
                <div class="post-content">${post.content}</div>
                <div class="post-actions">
                    <button onclick="postController.handleDeletePost('${post._id}')">
                        Excluir
                    </button>
                </div>
            `;
            this.profilePostsContainer.appendChild(postElement);
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