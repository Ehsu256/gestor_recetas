// Crear receta
document.getElementById('formReceta').addEventListener('submit', async (event) => {
  event.preventDefault();
  console.log('subir receta');
  
  const nombre = document.getElementById('nombre').value;
  const ingredientes = document.getElementById('ingredientes').value;
  const instrucciones = document.getElementById('instrucciones').value;

  const respuestaCrearReceta = await fetch('http://localhost:8080/api/recetas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id_usuario: 1,
      nombre_receta: nombre,
      ingredientes: ingredientes,
      instrucciones: instrucciones,
      ner: null,
      enlace: null
    })
  });
  const resultadoCrearReceta = await respuestaCrearReceta.json();
  console.log(resultadoCrearReceta);
});