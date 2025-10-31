package com.example.gestor_recetas.repository;

import com.example.gestor_recetas.model.Receta; // Pendiente por crear
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecetaRepository extends JpaRepository<Receta, Integer> {
  
}
