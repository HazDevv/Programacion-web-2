import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActividadService } from './services/actividad.services';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; // Provee el formato de fecha básico
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { provideNativeDateAdapter } from '@angular/material/core'; // Necesario para el calendario
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatFormFieldModule, 
    MatInputModule, MatButtonModule, MatCardModule, MatIconModule,
    MatDatepickerModule,MatAutocompleteModule,MatNativeDateModule,
    MatCheckboxModule, MatToolbarModule,MatButtonToggleModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  // Inyectamos el servicio ???????
  constructor(public service: ActividadService) {}

  nombre = '';
  materia = '';

  fechaInicio: Date | null = null;
  fechaFin: Date | null = null;
  opcionesPrioridad: string[] = ['Alta', 'Media', 'Baja'];
  prioridadSeleccionada = 'Media';

  registrar() {

      if (
      !this.nombre.trim() || 
      !this.materia.trim() || 
      !this.fechaFin || 
      !this.prioridadSeleccionada.trim()
    ) {
      return; 
    }

    this.service.agregarActividad({
      id: Date.now(),
      nombre: this.nombre,
      materia: this.materia,
      fecha: this.fechaFin.toLocaleDateString(), // Usamos la fecha de fin como entrega
      prioridad: this.prioridadSeleccionada as any,
      completada: false
    });
    
    //limpiar
    this.nombre = '';
    this.materia = '';
    this.fechaInicio = null;
    this.fechaFin = null;
  }
}