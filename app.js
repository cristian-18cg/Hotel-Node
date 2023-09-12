require('colors');

//console.log(`${'M'.red}${'e'.yellow}${'n'.blue}${'u'.green}`); //consola con color diferente cada letra
const { format, parseISO, isValid, isBefore } = require('date-fns');
const { guardarDb } = require("./helpers/guardarArchivo");
const { mostrarMenu } = require('./helpers/mensajes');
const { inquirerMenu, pausa, leerInput } = require('./helpers/inquirer');
const cliente = require('./models/cliente');
const Servicio = require('./models/servicios');
//const Tareas = require('./models/tareas');
//const Tarea = require('./models/tarea');
const { guardarDB } = require('./helpers/guardarArchivo');

const main = async () => {//programacion por promesas

  let opt = "";
  const servicio = new Servicio();

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case '1':
        const nombres = await leerInput(`${'Nombres del cliente: '.yellow}`);
        const apellidos = await leerInput(`${'Apellidos del cliente: '.yellow}`);
        const fecha_incio_reserva = await obtenerFechaReserva();
        const fecha_fin_reserva = await obtenerFechafin(fecha_incio_reserva);
        servicio.crearReserva(nombres, apellidos, fecha_incio_reserva, fecha_fin_reserva);
        console.log('Cliente creado exitosamente.');
        break;


      case '2':
        console.log(servicio.listadoArr);
        break;

      case '3':
        const clientesconReservaActiva = servicio.buscarClientesconReservaActivada(); //llamamos la funcion en servicios de buscar clientes con reserva en null
        if (clientesconReservaActiva.length > 0) {
          console.log(`${'Clientes con reserva activada:'.yellow}`);
          clientesconReservaActiva.forEach((cliente, index) => { // se usa un foreach para que recorra la lista uno a uno y poder imprimir el index al lado
            console.log(`${index + 1}. ${'Nombres:'.cyan} ${cliente.nombres} ${cliente.apellidos}`);
          });
        }
        else {
          console.log('No hay clientes con reserva activada.');
        }
        await pausa();
        break;

      case '4':
        const clientesSinReserva = servicio.buscarClientesSinReservaActivada(); //llamamos la funcion en servicios de buscar clientes con reserva en null
        if (clientesSinReserva.length > 0) {
          console.log(`${'Clientes sin reserva activada:'.yellow}`);
          clientesSinReserva.forEach((cliente, index) => { // se usa un foreach para que recorra la lista uno a uno y poder imprimir el index al lado
            console.log(`${index + 1}. ${'Nombres:'.cyan} ${cliente.nombres} ${cliente.apellidos}`);
          });
          const indexSeleccionado = await leerInput('Ingrese el índice del cliente que desea activar (o presione Enter para cancelar): ');

          if (indexSeleccionado.trim() !== '') {
            const indice = parseInt(indexSeleccionado) - 1;
            if (indice >= 0 && indice < clientesSinReserva.length) {
              const clienteSeleccionado = clientesSinReserva[indice];
              clienteSeleccionado.reserva_activa = true;
              console.log(`Reserva activada para ${clienteSeleccionado.nombres} ${clienteSeleccionado.apellidos}.`);
            } else {
              console.log('Índice inválido. La reserva no se activó.');
            }
          } else {
            console.log('Operación cancelada.');
          }

        } else {
          console.log('No hay clientes sin reserva activada.');
        }

        await pausa();
        break;

      case '5':
        const clientessinAseo = servicio.clientessinAseo();
        if (clientessinAseo.length > 0) {
          console.log(`${'Clientes sin aseo:'.yellow}`);
          clientessinAseo.forEach((cliente, index) => {
            console.log(`${index + 1}. ${'Nombres:'.cyan} ${cliente.nombres} ${cliente.apellidos}`);
          });
          const indexSeleccionado = await leerInput('Ingrese el índice del cliente que ya se le hizo aseo (o presione Enter para cancelar): ');

          if (indexSeleccionado.trim() !== '') {
            const indice = parseInt(indexSeleccionado) - 1;
            if (indice >= 0 && indice < clientessinAseo.length) {
              const clienteSeleccionado = clientessinAseo[indice];
              clienteSeleccionado.aseo = true;
              console.log(`El aseo al cuarto de ${clienteSeleccionado.nombres} ${clienteSeleccionado.apellidos} ha sido ${'realizado.'.cyan}`);
            } else {
              console.log('Índice inválido. El aseo no se realizo.');
            }
          } else {
            console.log('Operación cancelada.');
          }

        } else {
          console.log('No hay clientes con aseo pendiente.');
        }
        await pausa();
        break;

      case '6':
        const clientessinDesayuno = servicio.clientessinDesayuno();
        if (clientessinDesayuno.length > 0) {
          console.log(`${'Clientes sin desayuno:'.yellow}`);
          clientessinDesayuno.forEach((cliente, index) => {
            console.log(`${index + 1}. ${'Nombres:'.cyan} ${cliente.nombres} ${cliente.apellidos}`);
          });
          const indexSeleccionado = await leerInput('Ingrese el índice del cliente que ya obtuvo desayuno (o presione Enter para cancelar): ');

          if (indexSeleccionado.trim() !== '') {
            const indice = parseInt(indexSeleccionado) - 1;
            if (indice >= 0 && indice < clientessinDesayuno.length) {
              const clienteSeleccionado = clientessinDesayuno[indice];
              clienteSeleccionado.desayuno = true;
              console.log(`El desayuno al cliente ${clienteSeleccionado.nombres} ${clienteSeleccionado.apellidos} ha sido ${'entregado.'.cyan}`);
            } else {
              console.log('Índice inválido. El desayuno no se completo.');
            }
          } else {
            console.log('Operación cancelada.');
          }

        } else {
          console.log('No hay clientes con desayuno pendiente.');
        }
        await pausa();
        break;
      case '7':
        const clientesConReserva = servicio.listadoArr;
        if (clientesConReserva.length > 0) {
          console.log('Clientes con reserva:');
          clientesConReserva.forEach((cliente, index) => {
            console.log(`${index + 1}. Nombres: ${cliente.nombres} ${cliente.apellidos}`);
          });

          const indexSeleccionado = await leerInput('Ingrese el índice del cliente cuya reserva desea eliminar (o presione Enter para cancelar): ');

          if (indexSeleccionado.trim() !== '') {
            const indice = parseInt(indexSeleccionado) - 1;
            if (indice >= 0 && indice < clientesConReserva.length) {
              const clienteSeleccionado = clientesConReserva[indice];
              const confirmacion = await leerInput(`¿Está seguro que desea eliminar todo el registro del cliente ${clienteSeleccionado.nombres} ${clienteSeleccionado.apellidos}? (s/n): `);

              if (confirmacion.toLowerCase() === 's') {
                
                delete servicio._listado[clienteSeleccionado.id];// Eliminamos el  cliente
                console.log(`Registro del cliente ${clienteSeleccionado.nombres} ${clienteSeleccionado.apellidos} eliminado.`);
              } else {
                console.log('Operación cancelada.');
              }
            } else {
              console.log('Índice inválido. No se eliminó ningún registro.');
            }
          } else {
            console.log('Operación cancelada.');
          }
        } else {
          console.log('No hay clientes con reserva.');
        }
        await pausa();
        break;


      default:
        break;
    }
    guardarDB(servicio.listadoArr);
    await pausa();
  } while (opt != '0')




}

main();


const obtenerFechaReserva = async () => {
  let reservaDate;

  do {
    const reservaStr = await leerInput(`${'\nIngresa fecha de inicio de reserva'.yellow} ${'(YYYY-MM-DD):'.cyan}`);

    // Intenta parsear la fecha ingresada
    reservaDate = parseISO(reservaStr);

    // Verifica si la fecha es válida
    if (!isValid(reservaDate)) {
      console.log('La fecha ingresada no es válida. Debe tener el formato YYYY-MM-DD.');
    }
  } while (!isValid(reservaDate));

  // La fecha es válida, puedes formatearla o usarla según sea necesario
  const fechaFormateada = format(reservaDate, 'dd/MM/yyyy');
  console.log(`Fecha ingresada: ${fechaFormateada}`);

  // Puedes devolver la fecha válida si la necesitas en otro lugar del código
  return reservaDate;
};

const obtenerFechafin = async (fecha_incio_reserva) => {
  let reservaDate;
  let validfecha;

  do {
    const reservaStr = await leerInput(`${'\nIngresa fecha fin de reserva'.yellow} ${'(YYYY-MM-DD):'.cyan}`);
    reservaDate = parseISO(reservaStr);
    if (!isValid(reservaDate) && isBefore(reservaDate, fecha_incio_reserva)) {
      console.log('La fecha ingresada no es válida. Debe tener el formato YYYY-MM-DD.');
    } else if (reservaDate <= fecha_incio_reserva) {
      console.log('La fecha ingresada debe ser mayor que la fecha de inicio de la reserva.');
    }
  } while (!isValid(reservaDate) || reservaDate <= fecha_incio_reserva);

  // La fecha es válida, puedes formatearla o usarla según sea necesario
  const fechaFormateada = format(reservaDate, 'dd/MM/yyyy');
  console.log(`Fecha ingresada: ${fechaFormateada}`);

  // Puedes devolver la fecha válida si la necesitas en otro lugar del código
  return reservaDate;
};