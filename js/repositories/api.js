const API_URL = 'https://mini-twitter-api-vy9q.onrender.com';

class Api {
    static async request(endpoint, options = {}) {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...options.headers
        };

        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                ...options,
                headers
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erro na requisição');
            }

            return data;
        } catch (error) {
            console.error('Erro na requisição:', error);
            throw error;
        }
    }

    // Autenticação
    static async register(username, email, password) {
        return this.request('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({ username, email, password })
        });
    }

    static async login(email, password) {
        return this.request('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
    }

    // Postagens
    static async createPost(content) {
        return this.request('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ content })
        });
    }

    static async getPosts() {
        return this.request('/api/posts');
    }

    static async getMyPosts() {
        return this.request('/api/posts/my-posts');
    }

    static async deletePost(postId) {
        return this.request(`/api/posts/${postId}`, {
            method: 'DELETE'
        });
    }

    // Perfil
    static async getProfile() {
        return this.request('/api/users/profile');
    }

    static async updateProfile(username, email) {
        return this.request('/api/users/profile', {
            method: 'PUT',
            body: JSON.stringify({ username, email })
        });
    }
} 