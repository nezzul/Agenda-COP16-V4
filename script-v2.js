document.addEventListener('DOMContentLoaded', () => {
    fetch('https://raw.githubusercontent.com/nezzul/Agenda-COP16-V4/refs/heads/main/data-v2.json')
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => new Date(a.fechaISO) - new Date(b.fechaISO));
            displayCards(data);
        });
});
function displayCards(data) {
    const container = document.getElementById('cardsContainer');
    container.innerHTML = '';
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'cardAgenda';
        card.innerHTML = `
            <div class="row card-striped grid-container">
                <div class="col-3 d-flex justify-content-center align-items-center grid-item">
                    <p><span class="badgeAgenda date-green dia">${new Date(item.fechaISO).toLocaleDateString('es-ES', { day: 'numeric' })}</span></p>
                    <p><span class="mes">${new Date(item.fechaISO).toLocaleDateString('es-ES', { month: 'long' })}</span></p>
                </div>
                <div class="col-9 d-flex justify-content-left align-items-left grid-item text-align-left">
                    <h2>${item.titulo}</h2>
                        <div class="listResumen">
                            <span class="itemResumen">
                                <p><i class="fa fa-calendar-o" aria-hidden="true"></i> <strong>Fecha:</strong> ${item.fecha}</p>
                            </span>
                            <span class="itemResumen">
                                <p><i class="fa fa-clock-o" aria-hidden="true"></i> <strong>Hora:</strong> ${item.hora}</p>
                            </span>                      
                        </div>
                        <span class="itemResumen" style="margin-bottom:15px">
                            <p><i class="fa fa-location-arrow" aria-hidden="true"></i> <strong>Lugar:</strong> ${item.lugar}</p>
                        </span>  
                        <!-- Button trigger modal -->
                            <button type="button" class="btn btn-main" data-bs-toggle="modal" data-bs-target="#exampleModal${item.id}">
                            Ver descripción del evento
                            </button>
                        </div>
                    </div>
                    <!-- Modal -->
                    <div class="modal fade" id="exampleModal${item.id}" tabindex="-1" aria-labelledby="exampleModalLabel${item.id}" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel${item.id}">${item.titulo}</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                                </div>
                                <div class="modal-body">
                                    <p style="color:#655557">${item.descripcion}</p>
                                    <br>
                                    <p style="font-style:italic; color:#eeeeee; text-align:right">ID= ${item.id}</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary-modal" data-bs-dismiss="modal">Cerrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
        `;
        container.appendChild(card);
    });
}

function filterCards() {
    const filterDate = document.getElementById('dateFilter').value;
    fetch('https://raw.githubusercontent.com/nezzul/Agenda-COP16-V4/refs/heads/main/data-v2.json')
        .then(response => response.json())
        .then(data => {
            if (filterDate) {
                const filteredData = data.filter(item => item.fechaISO.startsWith(filterDate));
                displayCards(filteredData);
            } else {
                displayCards(data);
            }
        });
}
