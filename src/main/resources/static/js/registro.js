// registro
document.getElementById('registroForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const correoRegistro = document.getElementById('correoRegistro').value;
  const claveRegistro = document.getElementById('claveRegistro').value;

  const respuestaUsuarios = await fetch('http://localhost:8080/api/usuarios');
  const resultadoUsuarios = await respuestaUsuarios.json();

  for (let i = 0; i < resultadoUsuarios.length; i++) {
    if (correoRegistro == resultadoUsuarios[i].correo) {
      alert('El correo indicado ya ha sido registrado');
      return;
    }
  }

  await fetch('http://localhost:8080/api/usuarios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      correo: correoRegistro,
      contraseña: claveRegistro,
      redes: null,
      rol: 'usuario'
    })
  });
  alert('Usuario creado con éxito');
  window.location.href = "../templates/login.html";
});