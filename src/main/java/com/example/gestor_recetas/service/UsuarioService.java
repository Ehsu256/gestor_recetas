package com.example.gestor_recetas.service;

import com.example.gestor_recetas.model.Usuario;
import com.example.gestor_recetas.repository.UsuarioRepository;
import com.example.gestor_recetas.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
  @Autowired
  private UsuarioRepository usuarioRepository;

  // POST
  public Usuario guardarUsuario(Usuario usuario){
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

  // PUT
  // Sin actualizar el correo porque con este el usuario iniciará sesión
  public Usuario actualizarUsuario(Integer id, Usuario detalles) {
    return usuarioRepository.findById(id).map(usuarioExistente -> {
      usuarioExistente.setContraseña(detalles.getContraseña());
      usuarioExistente.setRol(detalles.getRol());
      usuarioExistente.setRedes(detalles.getRedes());
      return usuarioRepository.save(usuarioExistente);
    })
      .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con ID: " + id));
  }

  // DELETE
  public void eliminarUsuario(Integer id) {
    if(!usuarioRepository.existsById(id)) {
      throw new ResourceNotFoundException("Usuario no encontrado con ID: " + id);
    }
    usuarioRepository.deleteById(id);
  }
}