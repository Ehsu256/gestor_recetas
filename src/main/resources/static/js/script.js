// Variable global para simular el estado de sesión
let usuarioLogueado = null;
// Lista global de recetas cargadas desde el backend
let todasLasRecetas = [];

async function cargarRecetas() {
  const recetasContainer = document.getElementById('recetas'); 
  recetasContainer.innerHTML = '<p class="loading-message">Cargando recetas de la base de datos local...</p>';

  const respuestaRecetas = await fetch('http://localhost:8080/api/recetas');
  const resultadoRecetas = await respuestaRecetas.json();

  // Rellenar la lista global de recetas de forma segura
  todasLasRecetas = [];
  for (let i = 0; i < resultadoRecetas.length; i++) {
    const r = resultadoRecetas[i];
    todasLasRecetas.push({
      id: r.id_receta,
      nombre: r.nombre_receta ?? 'Sin nombre',
      imagen: r.enlace ?? '',
      ingredientes: r.ingredientes ?? '',
      instrucciones: r.instrucciones ?? ''
    });
  }

  mostrarRecetasEnDOM(todasLasRecetas);
}
cargarRecetas();


function filtrarRecetas() {
  const terminoBusqueda = document.getElementById('searchInput').value.toLowerCase();

  const recetasFiltradas = todasLasRecetas.filter(receta => {
    return (
      receta.nombre.toLowerCase().includes(terminoBusqueda) ||
      (receta.ingredientes && receta.ingredientes.toLowerCase().includes(terminoBusqueda))
    );
  });

  mostrarRecetasEnDOM(recetasFiltradas);
}


function mostrarRecetasEnDOM(recetas) {
  const recetasContainer = document.getElementById('recetas');
  recetasContainer.innerHTML = '';

  if (recetas.length === 0) {
    recetasContainer.innerHTML = '<p>No se encontraron recetas que coincidan con la búsqueda.</p>';
    return;
  }

  const isLoggedIn = !!usuarioLogueado;

  recetas.forEach(receta => {
    const divReceta = document.createElement('div');
    divReceta.classList.add('receta-card');

    let htmlReceta = `
        <h3>${receta.nombre}</h3>
        ${receta.imagen && receta.imagen.includes('http') ? `<img src="${receta.imagen}" alt="${receta.nombre}">` : ''}
        <p>${(receta.ingredientes || '').substring(0, 150)}...</p>
      `;

    if (isLoggedIn) {
      htmlReceta += `
                <div class="card-actions">
                    <button class="action-btn modify-btn" onclick="editarReceta(${receta.id})">Modificar</button>
                    <button class="action-btn delete-btn" onclick="borrarReceta(${receta.id})">Borrar</button>
                </div>
            `;
    }

    divReceta.innerHTML = htmlReceta;

    // Abrir modal al clickear la tarjeta
    divReceta.addEventListener('click', () => openModal(receta));

    // Evitar que los botones dentro de la tarjeta disparen el modal (si existen)
    const modifyBtn = divReceta.querySelector('.modify-btn');
    if (modifyBtn) {
      modifyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (typeof editarReceta === 'function') editarReceta(receta.id);
        else alert('Función "editarReceta" no implementada.');
      });
    }
    const deleteBtn = divReceta.querySelector('.delete-btn');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (typeof borrarReceta === 'function') borrarReceta(receta.id);
        else alert('Función "borrarReceta" no implementada.');
      });
    }

    recetasContainer.appendChild(divReceta);
  });
}

// Modal: abrir con datos de la receta
function openModal(receta) {
  const modal = document.getElementById('recetaModal');
  const modalBody = document.getElementById('modalBody');
  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <h2>${receta.nombre}</h2>
    ${receta.imagen && receta.imagen.includes('http') ? `<img class="modal-image" src="${receta.imagen}" alt="${receta.nombre}">` : ''}
    <h3>Ingredientes</h3>
    <p>${receta.ingredientes || 'No hay ingredientes registrados.'}</p>
    <h3>Instrucciones</h3>
    <p>${receta.instrucciones || 'No hay instrucciones registradas.'}</p>
  `;

  modal.style.display = 'block';
}

function closeModal() {
  const modal = document.getElementById('recetaModal');
  if (!modal) return;
  modal.style.display = 'none';
}

// Cerrar modal si se hace click fuera del contenido
window.addEventListener('click', function (event) {
  const modal = document.getElementById('recetaModal');
  if (modal && event.target === modal) {
    closeModal();
  }
});