class AuthController {
    constructor() {
        this.loginForm = document.querySelector('#login-form form');
        this.registerForm = document.querySelector('#register-form form');
        this.showRegisterLink = document.querySelector('#show-register');
        this.showLoginLink = document.querySelector('#show-login');
        this.logoutBtn = document.querySelector('#logout-btn');
        this.logoutBtnProfile = document.querySelector('#logout-btn-profile');

        this.initializeEventListeners();
        this.checkAuth();
    }

    initializeEventListeners() {
        this.loginForm.addEventListener('submit', this.handleLogin.bind(this));
        this.registerForm.addEventListener('submit', this.handleRegister.bind(this));
        this.showRegisterLink.addEventListener('click', this.showRegister.bind(this));
        this.showLoginLink.addEventListener('click', this.showLogin.bind(this));
        this.logoutBtn.addEventListener('click', this.handleLogout.bind(this));
        this.logoutBtnProfile.addEventListener('click', this.handleLogout.bind(this));
    }

    async handleLogin(event) {
        event.preventDefault();
        const email = document.querySelector('#login-email').value;
        const password = document.querySelector('#login-password').value;

        try {
            const response = await Api.login(email, password);
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            this.showMainContainer();
        } catch (error) {
            alert(error.message);
        }
    }

    async handleRegister(event) {
        event.preventDefault();
        const username = document.querySelector('#register-username').value;
        const email = document.querySelector('#register-email').value;
        const password = document.querySelector('#register-password').value;

        try {
            const response = await Api.register(username, email, password);
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            this.showMainContainer();
        } catch (error) {
            alert(error.message);
        }
    }

    handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.showAuthContainer();
    }

    showRegister() {
        document.querySelector('#login-form').classList.add('hidden');
        document.querySelector('#register-form').classList.remove('hidden');
    }

    showLogin() {
        document.querySelector('#register-form').classList.add('hidden');
        document.querySelector('#login-form').classList.remove('hidden');
    }

    showAuthContainer() {
        document.querySelector('#auth-container').classList.remove('hidden');
        document.querySelector('#main-container').classList.add('hidden');
        document.querySelector('#profile-container').classList.add('hidden');
    }

    showMainContainer() {
        document.querySelector('#auth-container').classList.add('hidden');
        document.querySelector('#main-container').classList.remove('hidden');
        document.querySelector('#profile-container').classList.add('hidden');
    }

    checkAuth() {
        const token = localStorage.getItem('token');
        if (token) {
            this.showMainContainer();
        } else {
            this.showAuthContainer();
        }
    }
} 