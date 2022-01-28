const colors = require('colors');
const { guardarData, leerData } = require('./helpers/guardarArchivo');
const {
  inquirerMenu,
  pause,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoCheckList,
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

const main = async () => {
  let op = '';

  const tareas = new Tareas();
  const tareasDB = leerData();

  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    op = await inquirerMenu();

    switch (op) {
      case '1':
        const desc = await leerInput('Descripcion: ');
        tareas.crearTarea(desc);
        break;

      case '2':
        tareas.listadoCompleto();
        break;
      case '3':
        tareas.listarPendientesCompletadas(true);
        break;
      case '4':
        tareas.listarPendientesCompletadas(false);
        break;
      case '5':
        const ids = await mostrarListadoCheckList(tareas.listadoArr);
        tareas.toggleCompletados(ids);
        break;
      case '6':
        const id = await listadoTareasBorrar(tareas.listadoArr);

        if (id !== '0') {
          const ok = await confirmar('Estas Seguro?');
          if (ok) {
            tareas.borrarTarea(id);
            console.log('\nTarea Borrada');
          }
        }

        break;

      default:
        break;
    }

    guardarData(tareas.listadoArr);

    if (op !== '0') await pause();
  } while (op !== '0');
};

main();
