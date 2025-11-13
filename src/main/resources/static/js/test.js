async function obtenerReceta() {
  console.log('obtenerReceta()');
  const response = await fetch('http://localhost:8080/api/recetas/2');
  const result = await response.json();

  console.log(result);
}
obtenerReceta();