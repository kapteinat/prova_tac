import { renderPosts, updateCharCount } from '../views/postView.js';

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
        updateCharCount(this.newPostInput);
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
        renderPosts(posts);
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

export { PostController }; 