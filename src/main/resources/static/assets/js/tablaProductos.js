llenarTabla();


async function llenarTabla() {
    const request = await fetch('http://localhost:8080/api/producto/get', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    const productos = await request.json();

    let listHtml = '';
    for (let producto of productos) {
        let fila =
            "<tr><td>" + producto.codigo + "</td>" +
            "<td> " + producto.nombre + "</td>" +
            "<td>" + producto.precio + "</td>" +
            "<td> " + producto.inventario + " </td>" +
            "<td><button style=\"color: #ffd025\" class=\"btn btn-sm btn-neutral\" onclick='actualizar(" + producto.codigo + ")'>Actualizar</button>" +
            "<button style=\"color: #dc4d5c\" class=\"btn btn-sm btn-neutral\" " +
            "onclick='eliminar(" + producto.codigo + ",this" + ")'>Eliminar</button></td></tr>";

        listHtml += fila;
    }

    document.querySelector('#dataTable tbody').outerHTML = listHtml;
}

async function actualizar(codigo) {
    localStorage.setItem('codigo', codigo)
    doOpen("actualizar.html");
}

function eliminar(codigo, btn) {
    fetch('http://localhost:8080/api/producto/remove', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: codigo
    });

    let row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);

}

function doOpen(url) {
    document.location.target = "_blank";
    document.location.href = url;
}