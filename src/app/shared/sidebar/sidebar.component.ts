import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PaisService } from 'src/app/pais/services/pais.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent {

  @Output() onClick : EventEmitter<string> = new EventEmitter();

  get historial() {
    return this.PaisService.historial;
  }

  constructor(
    private PaisService: PaisService
  ) { }

  buscar( value: string ) {
    this.onClick.emit( value );
    console.log( "emitiendo:", value );
  }

  limpiar() {
    console.log('limpiando historial...');
    localStorage.clear();
    window.location.reload();
  }

}
