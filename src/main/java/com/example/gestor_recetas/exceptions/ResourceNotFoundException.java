package com.example.gestor_recetas.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@SuppressWarnings("unused") // Omitir error por no utilizar variables

@ResponseStatus
// Cuando un elemento no exista en la base de datos - 
// Se hará un llamado a esta clase para manejar la excepción
public class ResourceNotFoundException extends RuntimeException {
  public ResourceNotFoundException(String message){
    super(message);
  }
}
