import { Component } from '@angular/core';
import { Pais } from '../../interfaces/paises.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
    `
      button {
        margin-right: 5px;
        margin-top: 5px;
      }
    `,
  ],
})
export class PorRegionComponent {
  regiones: string[] = [
    'EU',
    'EFTA',
    'CARICOM',
    'PA',
    'AU',
    'USAN',
    'EEU',
    'AL',
    'ASEAN',
    'CAIS',
    'CEFTA',
    'NAFTA',
    'SAARC',
  ];
  regionActiva: string = '';
  regionPaises: Pais[] = [];
  mostrarTabla: boolean = false;

  constructor(private buscarRegion: PaisService) {}

  activarRegion = (region: string): void => {
    if (region === this.regionActiva) return;
    this.mostrarTabla = false;
    this.regionActiva = region;
    this.checkClass(region);

    this.buscarRegion.buscarRegion(region).subscribe(
      (resp) => {
        this.mostrarTabla = true;
        this.regionPaises = resp;
      },
      (err) => {
        this.mostrarTabla = false;
      }
    );
  };

  checkClass = (region: string): string => {
    if (region === this.regionActiva) {
      return 'btn btn-primary';
    } else {
      return 'btn btn-outline-primary';
    }
  };
}
