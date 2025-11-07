package com.example.gestor_recetas.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
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

  // Relación Many-to-One
  @ManyToOne(fetch=FetchType.LAZY)
  @JoinColumn(name="usuario_id")

  @JsonBackReference
  private Usuario usuario;
}
