import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SidebarService } from 'src/app/shared/sidebar/sidebar.service';

import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  get httpParams () {
    return new HttpParams()
    .set( 'fields', 'name,capital,cca2,flags,population' );
  }

  constructor(
    private http: HttpClient,
    private SidebarService: SidebarService
    ) {  }

  buscarPais(termino: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${ termino }`;
    this.SidebarService.historialBusqueda( termino );
    return this.http.get<Country[]>( url, {params: this.httpParams} );
  }

  buscarCapital(termino: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${ termino }`;
    this.SidebarService.historialBusqueda( termino );
    return this.http.get<Country[]>( url, {params: this.httpParams} );
  }

  buscarRegion(region: string): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${ region }`;
    this.SidebarService.historialBusqueda( region );
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