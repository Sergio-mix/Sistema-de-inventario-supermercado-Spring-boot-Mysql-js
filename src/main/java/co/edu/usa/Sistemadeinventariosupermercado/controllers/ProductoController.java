package co.edu.usa.Sistemadeinventariosupermercado.controllers;

import co.edu.usa.Sistemadeinventariosupermercado.model.Producto;
import co.edu.usa.Sistemadeinventariosupermercado.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("api/producto/")
public class ProductoController {

    @Autowired
    private ProductoRepository productoRepository;

    /**
     * Método para obtener la lista de productos
     *
     * @return lista de productos
     */
    @GetMapping("get")
    private List<Producto> list() {
        try {
            return (List<Producto>) productoRepository.findAll();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return null;
    }

    /**
     * Método para obtener Producto por id
     *
     * @param id id
     * @return producto
     */
    @GetMapping("getProducto/{id}")
    private Optional<Producto> getProducto(@PathVariable("id") Long id) {
        try {
            return productoRepository.findById(id);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return Optional.empty();
    }

    /**
     * Método para validar el nombre
     *
     * @param nombre nombre a validar
     * @return false || true
     */
    @GetMapping("getProductoNombre/{nombre}")
    private Map<String, Object> validarNombre(@PathVariable("nombre") String nombre) {
        Map<String, Object> result = new Hashtable<>();
        try {
            List<Producto> productos = (List<Producto>) productoRepository.findAll();
            for (Producto producto : productos) {
                if (producto.getNombre().equals(nombre)) {
                    result.put("status", true);
                    return result;
                }
            }
            result.put("status", false);
            return result;
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return null;
    }

    /**
     * Método de informe de la tienda
     *
     * @return informe
     */
    @GetMapping("getInforme")
    private Map<String, Object> informe() {
        try {
            List<Producto> productos = (List<Producto>) productoRepository.findAll();

            productos.sort(new Comparator<Producto>() {
                @Override
                public int compare(Producto p1, Producto p2) {
                    return Float.compare(p1.getPrecio(), p2.getPrecio());
                }
            });

            float promedioDePrecios = 0;
            float valorInventario = 0;
            List<String> preciosMasAltos = new ArrayList<>();

            for (Producto producto : productos) {
                promedioDePrecios += producto.getPrecio();
                valorInventario += producto.getPrecio() * producto.getInventario();
                preciosMasAltos.add(producto.getNombre());
            }

            Collections.reverse(preciosMasAltos);

            Map<String, Object> informe = new Hashtable<>();
            informe.put("max", productos.get(productos.size() - 1).getNombre());
            informe.put("min", productos.get(0).getNombre());
            informe.put("promedio", promedioDePrecios / productos.size());
            informe.put("valorInventario", valorInventario);
            informe.put("preciosMasAltos", preciosMasAltos);

            return informe;
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return null;
    }

    /**
     * Método para agregar un Producto
     *
     * @param producto nuevo producto
     */
    @PostMapping("save")
    private void add(@RequestBody Producto producto) {
        try {
            productoRepository.save(producto);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    /**
     * Método para eliminar un producto
     *
     * @param producto id del producto
     */
    @PostMapping("remove")
    private void remove(@RequestBody Long producto) {
        try {
            productoRepository.deleteById(producto);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

}
