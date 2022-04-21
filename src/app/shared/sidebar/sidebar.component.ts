import { Component, OnInit } from '@angular/core';
import { PaisService } from 'src/app/pais/services/pais.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent {

  get historial() {
    return this.PaisService.historial;
  }

  constructor(
    private PaisService: PaisService
  ) { }

  buscar( value: string ) {
    this.PaisService.buscarPais( value );
    // console.log( 'Se busca:', value );
  }

  limpiar() {
    console.log('limpiando historial...');
    localStorage.clear();
    window.location.reload();
  }

}
