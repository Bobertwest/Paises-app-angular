import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [],
})
export class PaisInputComponent implements OnInit {
  @Input() placeholder: string = '';
  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  debounce: Subject<string> = new Subject();
  termino: string = '';

  buscar = (): void => {
    this.onEnter.emit(this.termino);
  };

  teclaPresionada = (): void => {
    this.debounce.next(this.termino);
  };

  ngOnInit(): void {
    this.debounce.pipe(debounceTime(300)).subscribe((valor) => {
      this.onDebounce.emit(valor);
    });
  }
}
