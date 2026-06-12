//COMPROVAR QUE L'USUARI HA INICIAT SESSIÓ I MOSTRAR EL SEU ROL

const usuari = localStorage.getItem('usuari');
const rol = localStorage.getItem('rol');

if (!usuari) {
    window.location.href = 'index.html';
}

document.getElementById('nom-usuari').textContent = 'Usuari: ' + usuari.toUpperCase();
document.getElementById('rol-usuari').textContent = 'Rol: ' + rol.charAt(0).toUpperCase() + rol.slice(1);

//FUNCIO DE TANCAR SESSIÓ
function tancarSessio() {
    localStorage.removeItem('usuari');
    localStorage.removeItem('rol');
    window.location.href = 'index.html';    
}

let docents = JSON.parse(localStorage.getItem('docents') || '[]');
renderitzarLlista();

function afegirDocent() {
    const nom = document.getElementById('inputNom').value.trim();
    const correu = document.getElementById('inputCorreu').value.trim();
    let valid = true;

    document.getElementById('inputNom').classList.remove('error');
    document.getElementById('errNom').textContent = '';
    document.getElementById('inputCorreu').classList.remove('error');
    document.getElementById('errCorreu').textContent = '';

    if (!nom) {
        document.getElementById('inputNom').classList.add('error');
        document.getElementById('errNom').textContent = 'El nom és obligatori.';
        valid = false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correu) {
        document.getElementById('inputCorreu').classList.add('error');
        document.getElementById('errCorreu').textContent = 'El correu és obligatori.';
        valid = false;
    } else if (!emailRegex.test(correu)) {
        document.getElementById('inputCorreu').classList.add('error');
        document.getElementById('errCorreu').textContent = 'El correu no és vàlid.';
        valid = false;
    }

    if (!valid) return;

    docents.push({ id: Date.now(), nom, correu });
    docents.sort((a, b) => a.nom.localeCompare(b.nom));
    localStorage.setItem('docents', JSON.stringify(docents));

    document.getElementById('inputNom').value = '';
    document.getElementById('inputCorreu').value = '';

const toast = document.getElementById('toastOk');    
    toast.style.display = 'block';
    setTimeout(() => toast.style.display = 'none', 3000);

    renderitzarLlista();
}

function renderitzarLlista() {
    const llista = document.getElementById('llistaDocents');

    if (docents.length === 0) {
        llista.innerHTML = '<p><p class="sense-docents">Encara no hi ha docents registrats.</p>';
        return;

    }

    llista.innerHTML = '';

    docents.forEach(docent => {
        const inicials = docent.nom.split(' ').map(p => p[0]).join('').substring(0, 2).toUpperCase();
        const item = document.createElement('div');
        item.className = 'docent-item';
       item.innerHTML = `
            <div class="docent-info">
                <div class="docent-avatar">${inicials}</div>
                <div>
                    <div class="docent-nom">${docent.nom}</div>
                    <div class="docent-correu">${docent.correu}</div>
                </div>
            </div>
            <div class="docent-accions">
                <button class="btn-copiar" onclick="copiarCorreu('${docent.correu}', this)">📋 Copiar correu</button>
                <button class="btn-eliminar" onclick="eliminarDocent(${docent.id})">✕</button>
            </div>
        `;
        llista.appendChild(item);
    });
}

function copiarCorreu(correu, btn) {
    navigator.clipboard.writeText(correu).then(() => {
        btn.textContent = '✅ Copiat!';
        btn.classList.add('copiat');
        setTimeout(() => {
            btn.textContent = '📋 Copiar correu';
            btn.classList.remove('copiat');
        }, 2000);
    });
}

function eliminarDocent(id) {
    docents = docents.filter(d => d.id !== id);
    localStorage.setItem('docents', JSON.stringify(docents));
    renderitzarLlista();
}

