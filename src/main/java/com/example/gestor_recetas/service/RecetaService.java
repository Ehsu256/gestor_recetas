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

    // Método como .save son del framework

    // POST
    public Receta guadarReceta(Receta receta) {
        return recetaRepository.save(receta);
    }

    // GET ALL
    // Rember list are declared List<varType> varName,
    // and functions (have return) need a variable type when declaring

    // OBTENER TODOS
    // Recuerda que las listas se declaran como List<tipoDeVariable> nombreVariable,
    // y que las funciones (que tienen un valor de retorno) necesitan especificar un
    // tipo de dato al declararse
    public List<Receta> obtenerTodos() {
        return recetaRepository.findAll();
    }

    // GET BY ID
    // Se usa Integer ya que en la BD Esta con este termino y no LONG
    public Optional<Receta> obtenerPorId(Integer id) {
        return recetaRepository.findById(id);
    }

    // PUT
    public Receta actuReceta(Integer id, Receta detalles) {
        return recetaRepository.findById(id).map(recetaExistente -> {
            recetaExistente.setNombre(detalles.getNombre());
        }).orElseThrow(() -> new ResourceNotFoundException("Receta no encontrada con ID: " + id));
        // ^ Instanciar la clase creada en la carpeta excetion
    }
    // DELETE
    public void eliminarReceta(Integer id){
     // Se puede manejar la excepción con throw o try-catch
     // Excepciones del runtime no exige de un try-catch para manejar la excepción
        throw new ResourceNotFoundException("Receta no encontrada con ID: " + id);
    }
     // Notice it is byId, not All
     recetaRepository.deleteById(id);


}
