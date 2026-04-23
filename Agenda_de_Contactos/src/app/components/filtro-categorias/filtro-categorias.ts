import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { ContactosService } from '../../services/contactos';
import { Categoria } from '../../models/contacto';

/**
 * ==========================================================
 * COMPONENTE: FiltroCategoriasComponent
 * ==========================================================
 *
 * Este componente muestra chips para filtrar contactos por categoría.
 *
 * Su responsabilidad es:
 * - mostrar las categorías disponibles como chips
 * - manejar la selección de categoría
 * - comunicarse con el servicio para actualizar el filtro
 *
 * ¿Por qué es un componente separado?
 * - Principio de responsabilidad única
 * - Reutilizable en otras partes
 * - Fácil de mantener y probar
 * - Lógica de UI aislada
 */

@Component({
  selector: 'app-filtro-categorias',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  template: `
    <mat-card class="section-card">
      <mat-card-content>
        <div class="section-heading">
          <div class="heading-icon">
            <mat-icon>filter_list</mat-icon>
          </div>

          <div class="heading-text">
            <h2>Filtrar por categoría</h2>
            <p>Selecciona una categoría para ver los contactos</p>
          </div>
        </div>

        <div class="chips-container">
          <!-- Botón para mostrar todos (sin filtro) -->
          <button
            mat-button
            class="category-chip"
            [class.selected]="categoriaSeleccionada() === null"
            (click)="seleccionarCategoria(null)"
            color="primary"
          >
            Todos
          </button>

          <!-- Botones para cada categoría -->
          @for (categoria of categorias; track categoria) {
            <button
              mat-button
              class="category-chip"
              [class.selected]="categoriaSeleccionada() === categoria"
              (click)="seleccionarCategoria(categoria)"
              [color]="getColorCategoria(categoria)"
            >
              {{ getLabelCategoria(categoria) }}
            </button>
          }
        </div>

        @if (categoriaSeleccionada()) {
          <div class="filtro-activo">
            <mat-icon>info</mat-icon>
            <span>
              Mostrando contactos de: 
              <strong>{{ getLabelCategoria(categoriaSeleccionada()!) }}</strong>
            </span>
          </div>
        }
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    :host {
      display: block;
      margin-bottom: 24px;
    }

    .section-card {
      border-radius: 24px;
      overflow: hidden;
    }

    .section-heading {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 16px;
    }

    .heading-icon {
      display: grid;
      place-items: center;
      width: 44px;
      height: 44px;
      border-radius: 14px;
      background: rgba(37, 99, 235, 0.10);
      color: #2563eb;
      flex-shrink: 0;
    }

    .heading-text {
      min-width: 0;
    }

    .heading-text h2 {
      margin: 0 0 4px;
      font-size: 1.35rem;
      font-weight: 700;
      color: #0f172a;
    }

    .heading-text p {
      margin: 0;
      color: #64748b;
      font-size: 0.95rem;
      line-height: 1.4;
    }

    .chips-container {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 16px;
    }

    .category-chip {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border-radius: 16px;
      font-weight: 600;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.2s ease;
      border: 2px solid transparent;
      background: #f3f4f6;
    }

    .category-chip:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .category-chip.selected {
      border-color: currentColor;
      background: rgba(37, 99, 235, 0.1);
      font-weight: 700;
    }

    .category-chip mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    .filtro-activo {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 16px;
      border-radius: 12px;
      background: rgba(37, 99, 235, 0.05);
      border: 1px solid rgba(37, 99, 235, 0.15);
      color: #2563eb;
      font-size: 0.9rem;
    }

    .filtro-activo mat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
    }

    @media (max-width: 640px) {
      .chips-container {
        justify-content: center;
      }
      
      .category-chip {
        flex: 1;
        min-width: 120px;
        justify-content: center;
      }
    }
  `]
})
export class FiltroCategoriasComponent {
  private contactosService = inject(ContactosService);

  /**
   * Categorías disponibles para los chips.
   * Usamos Object.values() para obtener todos los valores del enum.
   */
  categorias = Object.values(Categoria);

  /**
   * Signal de solo lectura para obtener la categoría seleccionada actual.
   * Esto permite que el chip muestre el estado correcto.
   */
  categoriaSeleccionada = this.contactosService.categoriaSeleccionada;

  /**
   * Selecciona una categoría y actualiza el filtro.
   * 
   * @param categoria La categoría a seleccionar (null = mostrar todos)
   */
  seleccionarCategoria(categoria: Categoria | null): void {
    this.contactosService.actualizarCategoriaSeleccionada(categoria);
  }

  /**
   * Devuelve una etiqueta amigable para mostrar al usuario.
   * 
   * ¿Por qué necesitamos esto?
   * Los valores del enum están en minúsculas pero queremos mostrarlos
   * con mayúscula inicial para mejor experiencia de usuario.
   */
  getLabelCategoria(categoria: Categoria): string {
    const labels = {
      [Categoria.PERSONAL]: 'Personal',
      [Categoria.TRABAJO]: 'Trabajo',
      [Categoria.FAMILIA]: 'Familia'
    };
    return labels[categoria];
  }

  /**
   * Devuelve el ícono correspondiente a cada categoría.
   * Esto hace la interfaz más visual e intuitiva.
   */
  getIconoCategoria(categoria: Categoria): string {
    const iconos = {
      [Categoria.PERSONAL]: 'person',
      [Categoria.TRABAJO]: 'work',
      [Categoria.FAMILIA]: 'home'
    };
    return iconos[categoria];
  }

  /**
   * Devuelve el color del chip según la categoría.
   * Esto ayuda a diferenciar visualmente las categorías.
   */
  getColorCategoria(categoria: Categoria): 'primary' | 'accent' | 'warn' {
    const colores: Record<Categoria, 'primary' | 'accent' | 'warn'> = {
      [Categoria.PERSONAL]: 'primary',
      [Categoria.TRABAJO]: 'accent',
      [Categoria.FAMILIA]: 'warn'
    };
    return colores[categoria];
  }
}
