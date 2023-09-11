
// Obtén una referencia al formulario y al elemento donde mostrarás los resultados
const searchInput = document.getElementById('inputBuscar');
const searchButton = document.getElementById('btnBuscar');
const resultDiv = document.getElementById('contenedor');

searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        // Prevenir el comportamiento predeterminado del Enter en un formulario
        event.preventDefault();
        // Hacer clic en el botón
        searchButton.click();
    }
});


// Agrega un evento de escucha al formulario
searchButton.addEventListener('click', function (e) {
    e.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
    const cantItems = document.getElementById('inputCantImages').value -1;

    // Obtiene el valor del input
    const query = searchInput.value.trim();

    // Realiza la solicitud a la API de la NASA con el término de búsqueda
    fetch(`https://images-api.nasa.gov/search?q=${query}`)
        .then(response => response.json())
        .then(data => {
            // Verifica si se encontraron resultados
            if (data.collection.items.length === 0) {
                resultDiv.innerHTML = '<p>No se encontraron imágenes para este término de búsqueda.</p>';
            } else {
                // Se cargan los datos de las fotos
                // La cantidad depende del valor ingresado en la const cantitems -1
                const items = data.collection.items;
                let htmlContent = `<div class='row'>`;
    
                console.log(htmlContent)

                for (let i = 0; i <= cantItems; i++) {

                    let item = items[i];
                    let image = item.links[0].href;
                    
                    htmlContent += `
                    <div class="col-md-6 col-lg-3">
                        <div class="card text-center">
                            <div class="card-header">${query} -${i+1}</div>
                            <div class="card-body">
                                <img src="${image}" alt="${item.data[0].title}" class="card-img-top imagen">
                                <div class="card-title">${item.data[0].title}</div>
                            </div>
                        </div>
                    </div>
                    `;
                }; 
                htmlContent += `</div>`
                resultDiv.innerHTML = htmlContent;
       
            };
        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
});
