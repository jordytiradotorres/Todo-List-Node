const colors = require('colors');
const Tarea = require('./Tarea');

class Tareas {
  constructor() {
    this._listado = {};
  }

  get listadoArr() {
    const listado = [];

    Object.keys(this._listado).forEach((key) => {
      let tarea = this._listado[key];
      listado.push(tarea);
    });

    return listado;
  }

  crearTarea(desc = '') {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  listadoCompleto() {
    console.log('');
    this.listadoArr.forEach(({ desc, completadoEn }, index) => {
      let idx = `${index + 1}`.green;
      let isCompleted = !completadoEn ? 'Pendiente'.red : 'Completada'.green;

      console.log(`\t${idx}. ${desc} :: ${isCompleted}`);
    });
  }

  listarPendientesCompletadas(completadas = true) {
    let contador = 0;

    this.listadoArr.forEach(({ desc, completadoEn }) => {
      let isCompleted = !completadoEn ? 'Pendiente'.red : 'Completada'.green;

      if (completadas) {
        if (completadoEn) {
          console.log(`\t${++contador + '.'.green} ${desc} :: ${isCompleted}`);
        }
      } else {
        if (!completadoEn) {
          console.log(`\t${++contador + '.'.green} ${desc} :: ${isCompleted}`);
        }
      }
    });
  }

  borrarTarea(id = '') {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  toggleCompletados(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];

      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

module.exports = Tareas;
