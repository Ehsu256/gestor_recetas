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
    // TODO: Es posible que haya que cambiar idUsuario a id_usuario para que no existan conflictos con la base de datos
    private Integer idReceta;
    private String nombreReceta;
    private String ingredientes;
    private String instrucciones;
    private String enlace;
    private String NER;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="idUsuario")
    
    @JsonBackReference
    private Usuario usuario;
}
