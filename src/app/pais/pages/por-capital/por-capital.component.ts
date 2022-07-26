import { Component } from '@angular/core';
import { Capital } from '../../interfaces/capitales.interface';
import { Pais } from '../../interfaces/paises.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [],
})
export class PorCapitalComponent {
  termino: string = 'Hola mundo';
  noEncontrado: boolean = false;
  huboError: boolean = false;
  mostrarTabla: boolean = false;
  loading: boolean = false;
  capital: Pais[] = [];

  constructor(private capitalService: PaisService) {}

  buscar = (termino: string): void => {
    this.termino = termino;
    this.mostrarTabla = false;
    this.noEncontrado = false;
    this.huboError = false;
    if (this.termino.trim().length > 0) {
      this.loading = true;
      this.capitalService.buscarcapital(this.termino).subscribe(
        (resp) => {
          this.capital = resp;
          this.mostrarTabla = true;
          this.loading = false;
        },
        (error) => {
          this.capital = [];
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

  sugerencias = (event: string): void => {
    this.huboError = false;
    this.noEncontrado = false;
  };
}
