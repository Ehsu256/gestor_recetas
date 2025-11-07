package com.example.gestor_recetas.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonBackReference;

//Notación
@Entity
@Data
@NoArgsConstructor

public class Receta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nombre;
    private String ingredientes;
    private String instrucciones;
    private String enlace;
    private String fuente;
    // private String NER; // Se puede usar el Json como texto

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="idUsuario")
    
    @JsonBackReference
    private Usuario usuario;
}
