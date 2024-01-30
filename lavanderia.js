document.addEventListener("DOMContentLoaded", function () {
    // Realizar una solicitud GET de Axios para obtener los datos JSON
    axios.get('db.json')
      .then(function (response) {
        // Extraer los datos relevantes del JSON
        const lavadoras = response.data.lavanderia.lavadoras;
        const secadoras = response.data.lavanderia.secadoras;
  
        // Rellenar la tabla con los datos
        populateTable('Lavadora', lavadoras);
        populateTable('Secadora', secadoras);

        // Actualizar el tiempo de ciclo cada 1 segundo (ajusta según tus necesidades)
        setInterval(updateTiempoCiclo, 60000);
      })
      .catch(function (error) {
        console.error('Error al obtener los datos:', error);
      });
  });

function populateTable(tipoElectrodomestico, data) {
    // Obtener el elemento del cuerpo de la tabla
    const tableBody = document.getElementById('laundryTableBody');
  
    // Iterar a través de los datos y crear filas de la tabla
    data.forEach(function (electrodomestico) {
        // Agregar clase 'en-uso' o 'libre' dependiendo del estado
        const statusClass = electrodomestico.en_uso ? 'en-uso' : 'libre';
  
        const row = `<tr>
            <td>${electrodomestico.id}</td>
            <td>${tipoElectrodomestico}</td>
            <td class="${statusClass}">${electrodomestico.en_uso ? 'En uso' : 'Libre'}</td>
            <td id="tiempo_${electrodomestico.id}">${electrodomestico.tiempo_ciclo}</td>
        </tr>`;
  
        // Añadir la fila al cuerpo de la tabla
        tableBody.innerHTML += row;
    });
}

function updateTiempoCiclo() {
    // Obtener todos los elementos de tiempo de ciclo y actualizar en tiempo real
    const elementosTiempo = document.querySelectorAll('[id^="tiempo_"]');
  
    elementosTiempo.forEach(function (elemento) {
        // Obtener el tiempo de ciclo actual y restar 1 segundo
        let tiempoActual = parseInt(elemento.textContent);
        if (!isNaN(tiempoActual) && tiempoActual > 0) {
            tiempoActual--;
            elemento.textContent = tiempoActual;
        }
    });
}
