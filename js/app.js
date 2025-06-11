// Inicializa os controladores quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    window.authController = new AuthController();
    window.postController = new PostController();
    window.profileController = new ProfileController();
}); 