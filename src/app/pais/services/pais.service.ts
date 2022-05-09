import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl: string = 'https://restcountries.com/v3.1';
  private _historial: string[] = [];

  get httpParams () {
    return new HttpParams()
    .set( 'fields', 'name,capital,cca2,flags,population' );
  }

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
    return this.http.get<Country[]>( url, {params: this.httpParams} );
  }

  buscarCapital(termino: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${ termino }`;
    this.historialBusqueda( termino );
    return this.http.get<Country[]>( url, {params: this.httpParams} );
  }

  buscarRegion(region: string): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${ region }`;
    this.historialBusqueda( region );
    return this.http.get<Country[]>( url, {params: this.httpParams} )
            .pipe(
              tap(console.log)
            )
  }

  getPaisPorAlpha( id: string): Observable<Country> {
    // const params = new HttpParams().set('fields', 'name,capital,cca2,flags,population,continent')

    const url = `${this.apiUrl}/alpha/${ id }`;
    return this.http.get<Country>( url );
  }
  
}