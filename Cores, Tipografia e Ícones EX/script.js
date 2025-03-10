// script.js
function toggleThemeMenu() {
    const menu = document.querySelector('.theme-menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

function changeTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('inatelTheme', theme);
    toggleThemeMenu();
}

// Carregar tema ao iniciar
window.onload = () => {
    const savedTheme = localStorage.getItem('inatelTheme') || 'inatel';
    document.body.setAttribute('data-theme', savedTheme);
};