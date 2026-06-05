const usuari = localStorage.getItem('usuari');
const rol = localStorage.getItem('rol');

if (!usuari) {
    window.location.href = 'index.html';
}

document.getElementById('nom-usuari').textContent = 'Usuari: ' + usuari.toUpperCase();
document.getElementById('rol-usuari').textContent = 'Rol: ' + rol.charAt(0).toUpperCase() + rol.slice(1);

if (rol === 'alumne') {   
    document.querySelector('.targetes').innerHTML = '<p> No tens accés a cap aplicació.</p>';
}

function tancarSessio() {
    localStorage.clear();
    window.location.href = 'index.html';
}
