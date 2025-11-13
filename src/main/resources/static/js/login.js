// Variable global para simular el estado de sesión y almacenar las recetas
let usuarioLogueado = null; 
// Al inicio, todas las recetas son las simuladas.
let todasLasRecetas = []; 

// --- Generador de ID simple para simulación de recetas creadas por el usuario ---
let nextRecetaId = 1000; 

function generarId() {
    return nextRecetaId++;
}

// --- Base de datos simulada de Usuarios (usando localStorage) ---

function obtenerUsuarios() {
    const usuarios = localStorage.getItem('usuariosRecetas');
    return usuarios ? JSON.parse(usuarios) : {};
}

function guardarUsuarios(usuarios) {
    localStorage.setItem('usuariosRecetas', JSON.stringify(usuarios));
}

// 🌟 BASE DE DATOS LOCAL DE RECETAS CON IMÁGENES ESPECÍFICAS 🌟
const recetasSimuladas = [
    {
        id: 1, 
        nombre: "Lomo Saltado Clásico", 
        // 🖼️ URL de Imagen de Lomo Saltado (Corregida la URL en una sola línea)
        imagen: "http://googleusercontent.com/image_collection/image_retrieval/11010744150405635426_0", 
        desc: "Exquisito plato peruano de carne de res salteada con cebolla, tomate y papas fritas. Se sirve con arroz blanco. Un clásico de la cocina criolla."
    },
    {
        id: 2, 
        nombre: "Ajiaco Santafereño", 
        // 🖼️ URL de Imagen de Ajiaco Santafereño (Corregida la URL en una sola línea)
        imagen: "http://googleusercontent.com/image_collection/image_retrieval/14394612730857770798_0", 
        desc: "Sopa tradicional de Bogotá, Colombia, hecha a base de tres tipos de papa, pollo, mazorcas y guascas. Servida con crema de leche y alcaparras."
    },
    {
        id: 3, 
        nombre: "Tacos al Pastor", 
        // 🖼️ URL de Imagen de Tacos al Pastor (Corregida la URL en una sola línea)
        imagen: "http://googleusercontent.com/image_collection/image_retrieval/12579842187151934791_0", 
        desc: "Carne de cerdo marinada con achiote y especias, cocinada en trompo. Servida en tortillas de maíz con piña, cilantro y cebolla. Sabor auténtico de México."
    },
    {
        id: 4, 
        nombre: "Arepas Rellenas", 
        // 🖼️ URL de Imagen de Arepas Rellenas (Corregida la URL en una sola línea)
        imagen: "http://googleusercontent.com/image_collection/image_retrieval/17842995108986234346_0", 
        desc: "Pan de maíz tradicional de Venezuela o Colombia, cocinado a la parrilla o frito y relleno con queso, carne mechada o aguacate (reina pepiada)."
    },
    {
        id: 5, 
        nombre: "Paella de Marisco", 
        // 🖼️ URL de Imagen de Paella de Marisco (Corregida la URL en una sola línea)
        imagen: "http://googleusercontent.com/image_collection/image_retrieval/3460759237741572729_0", 
        desc: "Plato de arroz valenciano, cocinado con azafrán, con una mezcla de mariscos como camarones, calamares, mejillones y almejas. Rico y colorido."
    }
];

// --- Funciones de Carga y Filtrado ---

/**
 * Función que carga las recetas desde la base de datos local simulada.
 */
function cargarRecetas() {
    const recetasContainer = document.getElementById('recetas');
    recetasContainer.innerHTML = '<p class="loading-message">Cargando recetas de la base de datos local...</p>';

    // Combinar recetas simuladas con cualquier receta que el usuario haya guardado
    // Nota: Aquí, para simplicidad, solo cargamos la lista base. En una app real se cargaría de localStorage.
    todasLasRecetas = [...recetasSimuladas]; 
    
    // Muestra el contenido inmediatamente, ya que no hay espera de API.
    mostrarRecetasEnDOM(todasLasRecetas); 
}

/**
 * Filtra las recetas al escribir en el campo de búsqueda (onkeyup).
 */
function filtrarRecetas() {
    const terminoBusqueda = document.getElementById('searchInput').value.toLowerCase();
    
    if (terminoBusqueda.trim() === '') {
        mostrarRecetasEnDOM(todasLasRecetas);
        return;
    }

    const recetasFiltradas = todasLasRecetas.filter(receta => 
        receta.nombre.toLowerCase().includes(terminoBusqueda) || 
        receta.desc.toLowerCase().includes(terminoBusqueda)
    );

    mostrarRecetasEnDOM(recetasFiltradas);
}

/**
 * Función auxiliar para renderizar las recetas en el DOM (crea las tarjetas).
 */
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
            <p>${receta.desc.substring(0, 150)}...</p>
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
        recetasContainer.appendChild(divReceta);
    });
}

// --- Funciones CRUD (Modificar y Borrar) ---

/**
 * Prepara el formulario para el modo CREACIÓN (Guardar).
 */
function prepararFormularioCreacion() {
    const form = document.getElementById('formReceta');
    document.getElementById('formTitle').textContent = 'Agregar Nueva Receta';
    document.getElementById('submitButton').textContent = 'Guardar';
    document.getElementById('recetaId').value = ''; 
    form.reset();
    form.style.display = 'flex';
}

/**
 * Prepara el formulario para el modo MODIFICACIÓN.
 */
function editarReceta(id) {
    const receta = todasLasRecetas.find(r => r.id === id);
    if (!receta) {
        alert('Receta no encontrada.');
        return;
    }

    const form = document.getElementById('formReceta');
    document.getElementById('formTitle').textContent = `Modificar Receta: ${receta.nombre}`;
    document.getElementById('submitButton').textContent = 'Guardar Cambios';
    
    // Rellenar formulario con datos de la receta
    document.getElementById('recetaId').value = receta.id;
    document.getElementById('nombre').value = receta.nombre;
    document.getElementById('imagen').value = receta.imagen;
    document.getElementById('desc').value = receta.desc.replace('...', ''); 
    
    form.style.display = 'flex';
    document.getElementById('recetas').scrollIntoView({ behavior: 'smooth' }); 
}

/**
 * Elimina una receta.
 */
function borrarReceta(id) {
    if (!confirm('¿Estás seguro de que quieres borrar esta receta?')) {
        return;
    }

    const initialLength = todasLasRecetas.length;
    todasLasRecetas = todasLasRecetas.filter(r => r.id !== id);

    if (todasLasRecetas.length < initialLength) {
        alert('Receta eliminada.');
        mostrarRecetasEnDOM(todasLasRecetas); 
    } else {
        alert('Error al intentar eliminar la receta.');
    }
}


// --- Funciones de Navegación y Visibilidad ---

/**
 * Muestra la sección solicitada y ajusta la visibilidad de los elementos de administración.
 */
function mostrarSeccion(seccionId) {
    const loginSection = document.getElementById('login');
    const registroSection = document.getElementById('registro');
    const recetasSection = document.getElementById('recetasSection');
    const formReceta = document.getElementById('formReceta');
    const logoutBtn = document.getElementById('logoutBtn');
    const btnCrearReceta = document.getElementById('btnCrearReceta');
    
    loginSection.style.display = 'none';
    registroSection.style.display = 'none';
    recetasSection.style.display = 'none';

    if (seccionId === 'login') {
        loginSection.style.display = 'block';
    } else if (seccionId === 'registro') {
        registroSection.style.display = 'block';
    } else if (seccionId === 'recetas') {
        recetasSection.style.display = 'block';
        
        cargarRecetas(); 
        
        formReceta.style.display = 'none'; 

        if (usuarioLogueado) {
            btnCrearReceta.style.display = 'inline-block'; 
            logoutBtn.style.display = 'block'; 
        } else {
            btnCrearReceta.style.display = 'none'; 
            logoutBtn.style.display = 'none';
        }
    }
}


// --- Lógica de Registro y Login ---

document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const usuario = document.getElementById('usuarioRegistro').value;
    const clave = document.getElementById('claveRegistro').value;
    const email = document.getElementById('emailRegistro').value;
    
    const usuarios = obtenerUsuarios();

    if (usuarios[usuario]) {
        alert('Ese nombre de usuario ya existe. Elige otro.');
        return;
    }
    
    usuarios[usuario] = { clave: clave, email: email };
    guardarUsuarios(usuarios);
    
    alert(`¡Registro exitoso! Ya puedes iniciar sesión, ${usuario}.`);
    mostrarSeccion('login'); 
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const usuario = document.getElementById('usuarioLogin').value;
    const clave = document.getElementById('claveLogin').value;
    
    const usuarios = obtenerUsuarios();

    if (usuarios[usuario] && usuarios[usuario].clave === clave) {
        usuarioLogueado = usuario;
        alert(`¡Bienvenido de vuelta, ${usuario}!`);
        mostrarSeccion('recetas'); 
    } else {
        alert('Credenciales incorrectas o usuario no registrado.');
    }
});

// LÓGICA UNIFICADA DE GUARDAR Y MODIFICAR 
document.getElementById('formReceta').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const id = document.getElementById('recetaId').value;
    const nombre = document.getElementById('nombre').value.trim();
    const imagen = document.getElementById('imagen').value.trim();
    const desc = document.getElementById('desc').value.trim();

    if (!nombre || !desc) {
        alert('Por favor, ingresa el nombre y la descripción de la receta.');
        return;
    }

    if (id) {
        // --- MODO MODIFICAR ---
        const index = todasLasRecetas.findIndex(r => r.id === parseInt(id));
        if (index !== -1) {
            todasLasRecetas[index].nombre = nombre;
            todasLasRecetas[index].imagen = imagen || todasLasRecetas[index].imagen; 
            todasLasRecetas[index].desc = desc;
            alert(`¡Receta "${nombre}" modificada exitosamente!`);
        }
    } else {
        // --- MODO CREAR (Guardar) ---
        const nuevaReceta = {
            id: generarId(), 
            nombre: nombre,
            imagen: imagen || 'https://source.unsplash.com/random/300x200/?food,cooking', 
            desc: desc
        };
        todasLasRecetas.push(nuevaReceta); 
        alert(`¡Receta "${nombre}" creada exitosamente!`);
    }

    document.getElementById('formReceta').reset();
    mostrarSeccion('recetas'); 
});


/**
 * Cierra la sesión y redirige a la pantalla de login.
 */
function cerrarSesion() {
    usuarioLogueado = null;
    alert('Sesión cerrada.');
    mostrarSeccion('login'); 
}

// --- Ejecución al cargar la página ---
mostrarSeccion('recetas');