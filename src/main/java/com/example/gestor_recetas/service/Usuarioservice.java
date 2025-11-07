package com.example.gestor_recetas.service;


import com.example.gestor_recetas.model.Receta;
import com.example.gestor_recetas.model.Usuario;
import com.example.gestor_recetas.repository.RecetaRepository;
import com.example.gestor_recetas.repository.UsuarioRepository;
import com.example.gestor_recetas.exceptions.ResourceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
  @Autowired
  private RecetaRepository recetaRepository;
  @Autowired
  private UsuarioRepository usuarioRepository;

  //POST
  public Usuario guardarUsuario(Usuario usuario){
  Integer recetaId = usuario.getReceta().getId();
  Receta receta = recetaRepository.findById(recetaId)
    .orElseThrow(() -> new ResourceNotFoundException("Receta no encontrada con ID: " + idReceta));
  Usuario.setReceta(receta);
  return usuarioRepository.save(usuario);
}
  // GET ALL
  public List<Usuario> obtenerTodos(){
    return usuarioRepository.findAll();

}
// GET BY ID
public Optional<Usuario> obtenerPorId(Integer id){
  return usuarioRepository.findById(id);
}

 // PUT (Requiere que el Libro y el nuevo Autor (si se cambia) existan)
public Usuario actualizarUsuario(Integer id, Usuario detalles) {
  return usuarioRepository.findById(id).map(usuarioExistente -> {
    usuarioExistente.setCorreo(detalles.getCorreo());
    usuarioExistente.setContraseña(detalles.getContraseña());
    usuarioExistente.setRol(detalles.getRol());
    usuarioExistente.setRedes(detalles.getRedes());

    if (detalles.getReceta() != null && detalles.getReceta().getId() != null) {
      Integer nuevaRecetaId = detalles.getReceta().getId();
      Receta nuevaReceta = recetaRepository.findById(nuevaRecetaId)
        .orElseThrow(() -> new ResourceNotFoundException("Error: Receta con ID " + nuevaReceta + " no existe."));
      usuarioExistente.setReceta(nuevaReceta);
    }
     return usuarioRepository.save(usuarioExistente);
    }).orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con ID: " + id));
  }

  // DELETE
  public void eliminarUsuario(Integer id){
    if(!usuarioRepository.existsById(id)){
      throw new ResourceNotFoundException("Usuario no encontrado con ID: " + id);
    }
    usuarioRepository.deleteById(id);
  }
}