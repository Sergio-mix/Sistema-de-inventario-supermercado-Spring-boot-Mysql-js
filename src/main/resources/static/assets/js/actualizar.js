const id = localStorage.getItem('codigo');
obtener();

async function obtener() {
    const producto = await obtenerObjetoPorId(id);

    document.getElementById('txtNombre').value = producto.nombre;
    document.getElementById('txtPrecio').value = producto.precio;
    document.getElementById('txtInventario').value = producto.inventario;

    return producto;
}

function obtenerObjetoPorId(id) {
    return new Promise(resolve => {
        return resolve(
            fetch('http://localhost:8080/api/producto/getProducto/' + id, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json()).then(json => {
                return json;
            })
        );
    });
}

async function actualizar() {
    let objeto = await obtenerObjetoPorId(id);
    let nombreS = document.getElementById('txtNombre').value;
    let precioS = document.getElementById('txtPrecio').value;
    let inventarioS = document.getElementById('txtInventario').value;

    if (nombreS !== ""
        && precioS !== ""
        && inventarioS !== "") {
        if (nombreS != objeto.nombre
            || precioS != objeto.precio
            || inventarioS != objeto.inventario) {
            await fetch('http://localhost:8080/api/producto/save', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    codigo: localStorage.getItem('codigo'),
                    nombre: nombreS,
                    precio: precioS,
                    inventario: inventarioS
                })
            });
            localStorage.removeItem('codigo');
            doOpen("tables.html");
        } else {
            alert("No hay cambios");
        }

    } else {
        let vacio = "";

        if (nombreS === "") {
            vacio += '(nombre)';
        }
        if (precioS === "") {
            vacio += ' (precio)';
        }
        if (inventarioS === "") {
            vacio += ' (inventario)';
        }

        alert('Hay campos vacíos: ' + vacio);
    }
}

function doOpen(url) {
    document.location.target = "_blank";
    document.location.href = url;
}