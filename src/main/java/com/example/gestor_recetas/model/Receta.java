package com.example.gestor_recetas.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Data
@NoArgsConstructor
public class Receta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_receta;
    private String nombre_receta;
    private String ingredientes;
    private String instrucciones;
    private String enlace;
    private String ner;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="id_usuario")
    
    @JsonBackReference
    private Usuario usuario;
}