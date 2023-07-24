$(document).ready(async function () {
    let items = []

    function atualizarInfo(i) {
        // atualizado há
        var diferenca = Date.now() - i.updated;

        var segundos = Math.floor(diferenca / 1000);
        var minutos = Math.floor(segundos / 60);
        var horas = Math.floor(minutos / 60);

        var updated_formatted = (minutos % 60) + "min e " + (segundos % 60) + "seg"

        if ((minutos) >= 60) updated_formatted = (horas % 60) + "h, " + updated_formatted

        // estado da máquina
        var machineStatus = {
            icon: `<i class="bi bi-record-circle-fill text-success"></i>`,
            text: `Ligado`
        }

        if (minutos > 5 && minutos < 20 && !i.shutdown.progress) {
            machineStatus.icon = `<i class="bi bi-record-circle-fill text-warning"></i>`
            machineStatus.text = 'Sem conexão'
        }
        else if (minutos >= 20 || i.shutdown.progress) {
            machineStatus.icon = `<i class="bi bi-record-circle-fill text-danger"></i>`
            machineStatus.text = 'Desligado'
        }


        var $divpc = $(`
        <div class="col" id=${i._id}>
        
        <div class="dropdown-center">
            <button class="btn btn-dark dropdown-toggle col-4" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
            ${machineStatus.icon} ${i.pc.hostname}
            </button>
            <ul class="dropdown-menu dropdown-menu-dark col-4">
    
                <li><span class="dropdown-item"><i class="bi bi-cpu text-primary"></i> Computador</span></li>
    
                <li><span class="dropdown-item"><strong>Hostname: </strong>${i.pc.hostname}</span></li>
                <li><span class="dropdown-item"><strong>Username: </strong>${i.pc.username}</span></li>
                <li><span class="dropdown-item"><strong>MAC: </strong>${i.pc.mac}</span></li>
                <li><span class="dropdown-item"><strong>IP: </strong>${i.pc.machineIp}</span></li>
    
                <li><hr  class="dropdown-divider"></li>
                <li><span class="dropdown-item"><i class="bi bi-ethernet text-primary"></i> Rede</span></li>
    
                <li><span class="dropdown-item"><strong>Conexão: </strong>${i.pc.connectionMode}</span></li>
                <li><span class="dropdown-item"><strong>IP: </strong>${i.pc.connectionIp}</span></li>
                <li><span class="dropdown-item"><strong>Transferido: </strong>${i.pc.transferred.formatted} (<i class="bi bi-bug text-danger"></i> ${i.pc.transferred.dropped})</span></li>
                <li><span class="dropdown-item"><strong>Recebido: </strong>${i.pc.received.formatted} (<i class="bi bi-bug text-danger"></i> ${i.pc.received.dropped})</span></li>
                
                <span id="${i._id}-printer">
                    <li><hr  class="dropdown-divider"></li>
                    <li><span class="dropdown-item"><i class="bi bi-printer text-primary"></i> Impressora</span></li>
    
                    <li><span class="dropdown-item"><strong>ID: </strong>${i.printer.id || "Nenhum"}</span></li>
                    <li><span class="dropdown-item"><strong>Conexão: </strong>${i.printer.name || "Nenhum"}</span></li>
                    <li><span class="dropdown-item"><strong>Modelo: </strong>${i.printer.model || "Nenhum"}</span></li>
                    <li><span class="dropdown-item"><strong>Status: </strong>${i.printer.status || "Nenhum"}</span></li>
                </span>
    
                <li><hr  class="dropdown-divider"></li>
                <li><span class="dropdown-item"><strong>${machineStatus.icon} ${machineStatus.text}</strong></span></li>
                <li><span class="dropdown-item"><i class="bi bi-arrow-clockwise"></i> Atualizado há <strong>${updated_formatted}</strong></span></li>
            </ul>
        </div>
        
        </div>
    `)
        $('#pc-list').append($divpc)
    }

    function getInfo() {
        $.get('/listagem', function (response) {
            $('#pc-list').empty();
            items = []
            response = response.sort((a, b) => a.updated - b.updated)
            response.forEach(i => {
                items.push(i)
                atualizarInfo(i)
            })
        })
    }

    $('#refresh').on('click', function () {
        getInfo()
    })

    getInfo()

    setInterval(() => {
        getInfo()
    }, 30000)

})