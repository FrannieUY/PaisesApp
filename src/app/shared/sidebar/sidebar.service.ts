import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private _historial: string[] = [];
  _target?: string;

  

  get historial() {
    return [...this._historial];
  }

  setTarget(target: string) {
    this._target = target;
    console.log('setTarget', target);
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

}
