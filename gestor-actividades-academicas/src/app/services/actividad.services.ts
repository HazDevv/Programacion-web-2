import { Injectable, signal, computed } from '@angular/core';
import { Actividad } from '../models/actividad.models';

@Injectable({ providedIn: 'root' })
export class ActividadService {

  private _actividades = signal<Actividad[]>([]);

  actividades = this._actividades.asReadonly();

  pendientes = computed(() => this._actividades().filter(a => !a.completada).length);
  completadas = computed(() => this._actividades().filter(a => a.completada).length);
  totalActividades = computed(() => this._actividades().length);

  agregarActividad(nueva: Actividad) {
    //aquis se pega al inicio
    this._actividades.update(listaActual => [nueva, ...listaActual]);
  }

  eliminar(id: number) {
  // .update() nos permite modificar el valor del Signal
  this._actividades.update(listaActual => 
    // .filter() crea un nuevo arreglo con todos los elementos 
    // cuyo identificador sea distinto al que voy a borrar
    listaActual.filter(actividad => actividad.id !== id)
    );
  }

  cambiarEstado(id: number) {
    this._actividades.update(lista => 
      lista.map(a => a.id === id ? { ...a, completada: !a.completada } : a)
    );
  }

  filtroActual = signal<'todas' | 'pendientes' | 'completadas'>('todas');
  listaFiltradas = computed(() => {
    const lista = this._actividades();
    const filtro = this.filtroActual();

    if (filtro === 'pendientes') return lista.filter(a => !a.completada);
    if (filtro === 'completadas') return lista.filter(a => a.completada);
    return lista; // 'todas'
  });



}


//AQUI SE GUARDA LA LISTA DE ACTIVIDADES DONDE SE AVISA QUE
//  ENTRA  Y QUE SALE