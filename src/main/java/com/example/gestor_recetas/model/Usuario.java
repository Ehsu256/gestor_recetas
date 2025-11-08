package com.example.gestor_recetas.model;

import java.util.List;
import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import lombok.Data;

@Entity
@Data
@NoArgsConstructor
public class Usuario {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY) // Para hacer un ID autoincrementable?
  private Integer idUsuario;
  private String correo;
  private String contraseña;
  private String rol;
  private String redes;

  // Relación Uno a Muchos
  @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)

  @JsonManagedReference
  // Para tabla usuario
  private List<Receta> receta = new ArrayList<>();
}
