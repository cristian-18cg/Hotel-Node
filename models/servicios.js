const Cliente = require("./cliente");



class Servicio {
    _listado = {};
    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const cliente = this._listado[key];
            listado.push(cliente)
        })
        return listado;
    }

    constructor() {
        this._listado = {}

    }

    crearReserva(nombres = '', apellidos = '', fecha_incio_reserva = '', fecha_fin_reserva = '') {
        const cliente = new Cliente(nombres, apellidos, fecha_incio_reserva, fecha_fin_reserva);
        this._listado[cliente.id] = cliente;
    }

    buscarClientesSinReservaActivada() {
        const clientesSinReservaActivada = [];
        for (const clienteId in this._listado) {
            const cliente = this._listado[clienteId];
            if (!cliente.reserva_activa) {
                clientesSinReservaActivada.push(cliente);
            }
        }
        return clientesSinReservaActivada;
    }

    buscarClientesconReservaActivada(){
        const clientesconReservaActivada = [];
        for (const clienteId in this._listado) {
            const cliente = this._listado[clienteId];
            if (cliente.reserva_activa) {
                clientesconReservaActivada.push(cliente);
            }
        }
        return clientesconReservaActivada;
    }

    clientessinAseo(){
        const clientessinAseo = [];
        for (const clienteId in this._listado){
            const cliente = this._listado[clienteId];
            if (!cliente.aseo && cliente.reserva_activa){
                clientessinAseo.push(cliente)
            }
        }
        return clientessinAseo;
    }
    clientessinDesayuno(){
        const clientessinDesayuno = [];
        for (const clienteId in this._listado){
            const cliente = this._listado[clienteId];
            if (!cliente.desayuno && cliente.reserva_activa){
                clientessinDesayuno.push(cliente)
            }
        }
        return clientessinDesayuno;
    }

}

module.exports = Servicio;