agregarInformetxt();

function informe() {
    return new Promise(resolve => {
        return resolve(
            fetch('http://localhost:8080/api/producto/getInforme', {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json()).then(text => {
                return text;
            })
        );
    });
}

async function agregarInformetxt() {
    let info = await informe();
    document.getElementById('txt1').innerHTML = info.max;
    document.getElementById('txt2').innerHTML = info.min;
    document.getElementById('txt3').innerHTML = info.promedio;
    document.getElementById('txt4').innerHTML = info.valorInventario;

    let listHtml = '';
    for (let nombre of info.preciosMasAltos) {
        let fila =
            "<tr><td>" + nombre + "</td>";

        listHtml += fila;
    }

    document.querySelector('#table tbody').outerHTML = listHtml;
}