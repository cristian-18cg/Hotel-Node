const { th } = require('date-fns/locale');
const{ v4: uuidv4} = require('uuid');


class Cliente{
    id='';
    nombres='';
    apellidos='';
    fecha_incio_reserva='';
    fecha_fin_reserva='';
    reserva_activa=null;
    aseo=null;
    desayuno=null;

    constructor(nombres,apellidos,fecha_incio_reserva,fecha_fin_reserva){
        this.id=uuidv4();
        this.nombres=nombres;
        this.apellidos=apellidos;
        this.fecha_incio_reserva=fecha_incio_reserva;
        this.fecha_fin_reserva=fecha_fin_reserva;

    }
}


module.exports = Cliente;