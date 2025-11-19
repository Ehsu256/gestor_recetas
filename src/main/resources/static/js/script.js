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
  for (let i = 0; i < 12; i++) {
    const r = resultadoRecetas[i];
    todasLasRecetas.push({
      id: r.id_receta ?? r.id,
      nombre: r.nombre_receta ?? r.nombre ?? 'Sin nombre',
      imagen: r.enlace ?? r.imagen ?? '',
      ingredientes: r.ingredientes ?? r.desc ?? '',
      instrucciones: r.instrucciones ?? r.pasos ?? ''
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
      (receta.ingredientes && receta.ingredientes.toLowerCase().includes(terminoBusqueda)) ||
      (receta.instrucciones && receta.instrucciones.toLowerCase().includes(terminoBusqueda))
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

// --- Funciones CRUD (Modificar y Borrar) ---

/**
 * Prepara el formulario para el modo CREACIÓN (Guardar).
 */
// function prepararFormularioCreacion() {
//   const form = document.getElementById('formReceta');
//   document.getElementById('formTitle').textContent = 'Agregar Nueva Receta';
//   document.getElementById('submitButton').textContent = 'Guardar';
//   document.getElementById('recetaId').value = '';
//   form.reset();
//   form.style.display = 'flex';
// }

// function editarReceta(id) {
//   const receta = todasLasRecetas.find(r => r.id === id);
//   if (!receta) {
//     alert('Receta no encontrada.');
//     return;
//   }

//   const form = document.getElementById('formReceta');
//   document.getElementById('formTitle').textContent = `Modificar Receta: ${receta.nombre}`;
//   document.getElementById('submitButton').textContent = 'Guardar Cambios';

//   // Rellenar formulario con datos de la receta
//   document.getElementById('recetaId').value = receta.id;
//   document.getElementById('nombre').value = receta.nombre;
//   document.getElementById('imagen').value = receta.imagen;
//   document.getElementById('desc').value = receta.desc.replace('...', '');

//   form.style.display = 'flex';
//   document.getElementById('recetas').scrollIntoView({ behavior: 'smooth' });
// }

// function borrarReceta(id) {
//   if (!confirm('¿Estás seguro de que quieres borrar esta receta?')) {
//     return;
//   }

//   const initialLength = todasLasRecetas.length;
//   todasLasRecetas = todasLasRecetas.filter(r => r.id !== id);

//   if (todasLasRecetas.length < initialLength) {
//     alert('Receta eliminada.');
//     mostrarRecetasEnDOM(todasLasRecetas);
//   } else {
//     alert('Error al intentar eliminar la receta.');
//   }
// }


// document.getElementById('loginForm').addEventListener('submit', function (event) {
//   event.preventDefault();
//   const usuario = document.getElementById('usuarioLogin').value;
//   const clave = document.getElementById('claveLogin').value;

//   const usuarios = obtenerUsuarios();

//   if (usuarios[usuario] && usuarios[usuario].clave === clave) {
//     usuarioLogueado = usuario;
//     alert(`¡Bienvenido de vuelta, ${usuario}!`);
//     mostrarSeccion('recetas');
//   } else {
//     alert('Credenciales incorrectas o usuario no registrado.');
//   }
// });

// LÓGICA UNIFICADA DE GUARDAR Y MODIFICAR 
// document.getElementById('formReceta').addEventListener('submit', function (event) {
//   event.preventDefault();

//   const id = document.getElementById('recetaId').value;
//   const nombre = document.getElementById('nombre').value.trim();
//   const imagen = document.getElementById('imagen').value.trim();
//   const desc = document.getElementById('desc').value.trim();

//   if (!nombre || !desc) {
//     alert('Por favor, ingresa el nombre y la descripción de la receta.');
//     return;
//   }

//   if (id) {
//     // --- MODO MODIFICAR ---
//     const index = todasLasRecetas.findIndex(r => r.id === parseInt(id));
//     if (index !== -1) {
//       todasLasRecetas[index].nombre = nombre;
//       todasLasRecetas[index].imagen = imagen || todasLasRecetas[index].imagen;
//       todasLasRecetas[index].desc = desc;
//       alert(`¡Receta "${nombre}" modificada exitosamente!`);
//     }
//   } else {
//     // --- MODO CREAR (Guardar) ---
//     const nuevaReceta = {
//       id: generarId(),
//       nombre: nombre,
//       imagen: imagen || 'https://source.unsplash.com/random/300x200/?food,cooking',
//       desc: desc
//     };
//     todasLasRecetas.push(nuevaReceta);
//     alert(`¡Receta "${nombre}" creada exitosamente!`);
//   }

//   document.getElementById('formReceta').reset();
//   mostrarSeccion('recetas');
// });

/**
 * Cierra la sesión y redirige a la pantalla de login.
 */
// function cerrarSesion() {
//   usuarioLogueado = null;
//   alert('Sesión cerrada.');
//   mostrarSeccion('login');
// }