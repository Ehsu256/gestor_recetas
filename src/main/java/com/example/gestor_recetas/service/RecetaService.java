//lógica del negocio
//para instanciar los metodos del CRUD (JPA)

package com.example.gestor_recetas.service;

import com.example.gestor_recetas.model.Receta;
import com.example.gestor_recetas.repository.RecetaRepository;
import com.example.gestor_recetas.exceptions.ResourceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class RecetaService {
    @Autowired // Instancia la clase, "inyección de depencendias"
    private RecetaRepository recetaRepository;

    // POST
    public Receta guardarReceta(Receta receta) {
        return recetaRepository.save(receta);
    }

    // OBTENER TODOS
    public List<Receta> obtenerTodos() {
        return recetaRepository.findAll();
    }

    // GET BY ID
    // Se usa Integer ya que en la BD está como INT y no LONG
    public Optional<Receta> obtenerPorId(Integer id) {
        return recetaRepository.findById(id);
    }

    // PUT
    public Receta actualizarReceta(Integer id, Receta detalles) {
        return recetaRepository.findById(id).map(recetaExistente -> {
            recetaExistente.setNombre(detalles.getNombre());
            recetaExistente.setIngredientes(detalles.getIngredientes());
            recetaExistente.setInstrucciones(detalles.getInstrucciones());
            recetaExistente.setEnlace(detalles.getEnlace());
            recetaExistente.setFuente(detalles.getFuente());
            // recetaExistente.setNER(detalles.getNER());
            return recetaRepository.save(recetaExistente);

        }).orElseThrow(() -> new ResourceNotFoundException("Receta no encontrada con ID: " + id));
    }

    // DELETE
    public void eliminarReceta(Integer id) {
        if (!recetaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Receta no encontrada con ID: " + id);
        }
        recetaRepository.deleteById(id);
    }
}