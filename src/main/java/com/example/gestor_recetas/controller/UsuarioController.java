package com.example.gestor_recetas.controller;

import com.example.gestor_recetas.model.Usuario;
import com.example.gestor_recetas.service.UsuarioService;
import com.example.gestor_recetas.exceptions.ResourceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("api/usuarios")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<Usuario> crearUsuario(@RequestBody Usuario usuario) {
        Usuario nuevoUsuario = usuarioService.guardarUsuario(usuario);
        return new ResponseEntity<>(nuevoUsuario, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> obtenerTodos() {
        return new ResponseEntity<>(usuarioService.obtenerTodos(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Autor> obtenerPorId(@PathVariable Integer id) {
        return usuarioService.obtenerPorId(id).
    }

    @PutMapping("/{id}")


    @DeleteMapping("/{id}")
}