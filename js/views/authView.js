// authView.js

export function showRegister() {
    document.querySelector('#login-form').classList.add('hidden');
    document.querySelector('#register-form').classList.remove('hidden');
}

export function showLogin() {
    document.querySelector('#register-form').classList.add('hidden');
    document.querySelector('#login-form').classList.remove('hidden');
}

export function showAuthContainer() {
    document.querySelector('#auth-container').classList.remove('hidden');
    document.querySelector('#main-container').classList.add('hidden');
    document.querySelector('#profile-container').classList.add('hidden');
}

export function showMainContainer() {
    document.querySelector('#auth-container').classList.add('hidden');
    document.querySelector('#main-container').classList.remove('hidden');
    document.querySelector('#profile-container').classList.add('hidden');
} 