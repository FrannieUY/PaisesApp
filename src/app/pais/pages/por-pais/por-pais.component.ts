import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';

import { Country, Name } from '../../interfaces/pais.interface';


@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [`
  li
    color: black
    cursor: pointer
  a
    text-decoration: none
    color: black
  a:hover
    text-decoration: none
    color: black
  `
  ]
})
export class PorPaisComponent {

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];

  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor(private PaisService: PaisService) { }

  buscar( termino: string ) {
    this.hayError = false;
    this.termino = termino;
    // console.log(this.termino);

    this.PaisService.buscarPais( termino )
      .subscribe( (paises) => {
        this.paises = paises;
      }, (err) => {
        this.hayError = true;
        this.paises = [];
      });
  }

  
  sugerencias( termino: string) {
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;
    
    this.PaisService.buscarPais( termino ) 
      .subscribe( 
        paises => this.paisesSugeridos = paises.splice(0,3),
        (err) => {
          this.paisesSugeridos = []; 
          this.hayError = true;}
        )
  }

  buscarSugerido( termino: string ) {
    this.buscar( termino );
    this.mostrarSugerencias = false;
  }
}
