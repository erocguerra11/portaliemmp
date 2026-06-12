const usuaris = [
    { usuari: 'admin', contrasenya: '02admin', rol: 'admin' },
    { usuari: 'docent', contrasenya: '1234', rol: 'docent' },
    { usuari: 'alumne', contrasenya: 'alumne', rol: 'alumne' },
];

function iniciarSessio() {
    const usuari = document.getElementById('usuari').value;
    const contrasenya = document.getElementById('contrasenya').value;

    const trobat = usuaris.find(u => u.usuari === usuari && u.contrasenya === contrasenya);

    if (trobat) {
        localStorage.setItem('rol', trobat.rol);
        localStorage.setItem('usuari', trobat.usuari);
        window.location.href = 'dashboard.html';
    } else {
        alert('Usuari o contrasenya incorrectes');
    }
}