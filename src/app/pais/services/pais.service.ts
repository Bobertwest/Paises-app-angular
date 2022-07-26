import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pais } from '../interfaces/paises.interface';

@Injectable({
  providedIn: 'root',
})
export class PaisService {
  private apiUrl: string = 'https://restcountries.com';
  private apiVersion2: string = 'v2';
  private apiVersion3: string = 'v3.1';

  constructor(private http: HttpClient) {}

  buscarPais = (termino: string): Observable<Pais[]> => {
    const url = `${this.apiUrl}/${this.apiVersion3}/name/${termino}`;
    return this.http.get<Pais[]>(url);
  };

  buscarcapital = (termino: string): Observable<Pais[]> => {
    const url = `${this.apiUrl}/${this.apiVersion3}/capital/${termino}`;
    return this.http.get<Pais[]>(url);
  };

  paisPorAlpha = (id: string): Observable<Pais[]> => {
    const url = `${this.apiUrl}/${this.apiVersion3}/alpha/${id}`;
    return this.http.get<Pais[]>(url);
  };

  buscarRegion = (id: string): Observable<Pais[]> => {
    const url = `${this.apiUrl}/${this.apiVersion2}/regionalbloc/${id}`;
    return this.http.get<Pais[]>(url);
  };
}
