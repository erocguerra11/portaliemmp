const usuari = localStorage.getItem('usuari');
const rol = localStorage.getItem('rol');

if (!usuari) {
    window.location.href = 'index.html';
}

document.getElementById('nom-usuari').textContent = 'Usuari: ' + usuari.toUpperCase();
document.getElementById('rol-usuari').textContent = 'Rol: ' + rol.charAt(0).toUpperCase() + rol.slice(1);

if (rol === 'alumne') {   
    document.querySelector('main').innerHTML = `
        <div class="sense access">
        <h2>Sense accés</h2>
        <h3>No tens permisos per accedir a aquesta secció.</p>
        <h4>Contacta amb l'administrador si creus que és un error.</p>
        </div>
    `;
}

function tancarSessio() {
    localStorage.removeItem('usuari');
    localStorage.removeItem('rol');
    window.location.href = 'index.html';
}