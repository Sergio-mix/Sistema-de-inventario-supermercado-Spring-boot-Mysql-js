package co.edu.usa.Sistemadeinventariosupermercado.model;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class Producto {
    @Id
    private Long codigo;

    private String nombre;

    private Float precio;

    private Integer inventario;
}
