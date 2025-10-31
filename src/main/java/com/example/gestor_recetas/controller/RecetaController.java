// CAMBIAR SEGÚN COMO QUEDEN LOS OTROS ARCHIVOS (en model y service)

// Utilizando Integer en vez de Long para las IDs porque las IDs
// están definidas como Int en MySQL

package com.example.gestor_recetas.controller;

import com.example.gestor_recetas.model.Receta; // Pendiente por crear
import com.example.gestor_recetas.service.RecetaService;
import com.example.gestor_recetas.exceptions.ResourceNotFoundException;

import org.apache.tomcat.util.file.ConfigurationSource.Resource;
import org.hibernate.boot.beanvalidation.IntegrationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController // Para el manejo de la API
@RequestMapping("api/recetas") // Endpoint para las peticiones (http://localhost:8080/api/recetas)
public class RecetaController {
  @Autowired
  private RecetaService recetaService;

  // POST (enviar información a la BD)
  @PostMapping
  public ResponseEntity<Receta> crearReceta(@RequestBody Receta receta) {
    Receta nuevaReceta = recetaService.guardarReceta(receta);
    return new ResponseEntity<>(nuevaReceta, HttpStatus.CREATED);
  }

  // GET todos (consultar todos los campos de la tabla recetas)
  @GetMapping
  public ResponseEntity<List<Receta>> obtenerTodos() {
    return new ResponseEntity<>(recetaService.obtenerTodos(), HttpStatus.OK);
  }

  // GET por ID (consultar un sólo campo de acuerdo a la ID que se especifique en la petición)
  @GetMapping("/{id}")
  public ResponseEntity<Receta> ObtenerPorId(@PathVariable Integer id) {
    return recetaService.obtenerPorId(id).map(receta -> new ResponseEntity<>(autor, HttpStatus.OK))
      .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
  }

  // PUT (actualizar un campo de la tabla recetas)
  @PutMapping
  public ResponseEntity<Receta> actualizarReceta(@PathVariable Integer id, @RequestBody Receta detalles) {
    // Agarra la ID del path y el body del request (puesto en una variable "detalles")
    // Luego se utilizan para identificar el campo a modificar (ID) y con qué datos modificarlo (detalles)
    try {
      Receta recetaActualizada = recetaService.actualizarReceta(id, detalles);
      return new ResponseEntity<>(recetaActualizada, HttpStatus.OK);
    } catch (ResourceNotFoundException e) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  // DELTE (eliminar un campo de la tabla recetas)
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> eliminarReceta(@PathVariable Integer id) {
    try {
      recetaService.eliminarReceta(id);
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (ResourceNotFoundException e) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }
}