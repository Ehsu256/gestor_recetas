document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const correoLogin = document.getElementById('correoLogin').value;
  const claveLogin = document.getElementById('claveLogin').value;

  const respuestaUsuarios = await fetch('http://localhost:8080/api/usuarios');
  const resultadoUsuarios = await respuestaUsuarios.json();

  for (let i = 0; i < resultadoUsuarios.length; i++) {
    if (correoLogin == resultadoUsuarios[i].correo && claveLogin == resultadoUsuarios[i].contraseña) {
      alert('Sesión iniciada con éxito');
      window.location.href = "../templates/crear-editar.html";
      return; // Detiene ejecución de más código una vez se haya encontrado una coincidencia
    }
  }

  alert('Correo o contraseña incorrectos');
});