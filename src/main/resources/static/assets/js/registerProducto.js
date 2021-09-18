async function registrarProducto() {
    let nombreS = document.getElementById('txtNombre').value;
    let precioS = document.getElementById('txtPrecio').value;
    let inventarioS = document.getElementById('txtInventario').value;

    if (nombreS !== "" && precioS !== "" && inventarioS !== "") {
        let validar = await validateName(nombreS);
        if (validar.status === false) {
            await fetch('http://localhost:8080/api/producto/save', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    codigo: null,
                    nombre: nombreS,
                    precio: precioS,
                    inventario: inventarioS
                })
            });
            doOpen("tables.html");
        } else {
            alert("El nombre (" + nombreS + ") ya se encuentra registrado");
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

function validateName(name) {
    return new Promise(resolve => {
        return resolve(
            fetch('http://localhost:8080/api/producto/getProductoNombre/' + name, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json()).then(text => {
                return text;
            })
        );
    });
}

function doOpen(url) {
    document.location.target = "_blank";
    document.location.href = url;
}

