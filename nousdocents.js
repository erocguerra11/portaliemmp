const usuari = document.getElementById("usuari");
const rol = document.getElementById("rol");

if (!localStorage.getItem('usuari')) {
    window.location.href = 'index.html';
}

document.getElementById('nom-usuari').textContent = 'Usuari: ' + localStorage.getItem('usuari').toUpperCase();
document.getElementById('rol-usuari').textContent = 'Rol: ' + localStorage.getItem('rol').charAt(0).toUpperCase() + localStorage.getItem('rol').slice(1);

function tancarSessio() {
    localStorage.removeItem('usuari');
    localStorage.removeItem('rol');
    window.location.href = 'index.html';
}