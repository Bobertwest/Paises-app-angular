import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Pais } from '../../interfaces/paises.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class PorPaisComponent {
  termino: string = '';
  noEncontrado: boolean = false;
  huboError: boolean = false;
  mostrarTabla: boolean = false;
  loading: boolean = false;
  paises: Pais[] = [];
  paisesSujeridos: Pais[] = [];
  mostrarbuscar: boolean = false;

  constructor(private paisService: PaisService, private router: Router) {}

  buscar = (termino: string): void => {
    this.mostrarbuscar = false;
    this.termino = termino;
    this.mostrarTabla = false;
    this.noEncontrado = false;
    this.huboError = false;
    if (this.termino.trim().length > 0) {
      this.loading = true;
      this.paisService.buscarPais(this.termino).subscribe(
        (resp) => {
          this.paises = resp;
          this.mostrarTabla = true;
          this.loading = false;
        },
        (error) => {
          this.paises = [];
          this.mostrarTabla = false;
          if (error.status === 404) {
            this.huboError = false;
            this.noEncontrado = true;
          } else {
            this.noEncontrado = false;
            this.huboError = true;
          }
          this.loading = false;
        }
      );
    } else {
      return;
    }
  };

  sugerencias = (termino: string): void => {
    this.mostrarbuscar = true;
    this.termino = termino;
    this.huboError = false;
    this.noEncontrado = false;
    this.paisService.buscarPais(this.termino).subscribe(
      (resp) => {
        this.paisesSujeridos = resp.splice(0, 5);
      },
      (err) => (this.paisesSujeridos = [])
    );
  };

  buscarSujerido = (termino: string): void => {
    this.termino = termino;
    this.buscar(this.termino);
  };
}
