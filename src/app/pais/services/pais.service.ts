import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl: string = 'https://restcountries.com/v3.1';
  private _historial: string[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) { 

    this._historial = JSON.parse(localStorage.getItem('historial')! ) || []; 

  }

  historialBusqueda( termino: string ) {
    if( !this._historial.includes( termino ) ) {
      this._historial.unshift( termino );
      //Limite de 10 valores
      this._historial = this._historial.splice(0,10);
      console.log("Guardando en el historial:", localStorage);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
  }

  buscarPais(termino: string): Observable<Country[]> {

    const url = `${this.apiUrl}/name/${ termino }`;
    this.historialBusqueda( termino );
    return this.http.get<Country[]>( url );
  }

  buscarCapital(termino: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${ termino }`;
    this.historialBusqueda( termino );
    return this.http.get<Country[]>( url );
  }

  buscarRegion(termino: string): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${ termino }`;
    this.historialBusqueda( termino );
    return this.http.get<Country[]>( url );
  }

  getPaisPorAlpha( id: string): Observable<Country> {
    const url = `${this.apiUrl}/alpha/${ id }`;
    return this.http.get<Country>( url );
  }
  
}