import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
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
export class PorCapitalComponent {

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];

  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false; 

  constructor(private paisService: PaisService) { }

  buscar( termino: string) {
    this.hayError = false;
    this.termino = termino;

    this.paisService.buscarCapital( termino )
      .subscribe( (paises) => {
        this.paises = paises;
      }, (err) => {
        this.hayError = true;
        this.paises = [];
      });
  }

  sugerencias(termino: string) {
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;

    this.paisService.buscarCapital( termino )
      .subscribe( (paises) => this.paisesSugeridos = paises.splice(0,3),
      (err) => {
        this.paisesSugeridos = [];
        this.hayError = true;
      } )
  }
  
  buscarSugerido( termino: string) {
    this.buscar( termino );
    this.mostrarSugerencias = false;
  }

}
