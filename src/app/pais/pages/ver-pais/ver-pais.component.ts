import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Pais } from '../../interfaces/paises.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [],
})
export class VerPaisComponent implements OnInit {
  pais!: Pais;

  constructor(
    private checkRouter: ActivatedRoute,
    private paisService: PaisService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkRouter.params
      .pipe(switchMap(({ id }) => this.paisService.paisPorAlpha(id)))
      .subscribe(
        (resp) => {
          this.pais = resp[0];
        },
        (err) => {
          if (err) {
            this.router.navigate(['']);
          }
        }
      );
  }
}
