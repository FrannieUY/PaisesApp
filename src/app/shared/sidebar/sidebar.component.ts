import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { PaisService } from 'src/app/pais/services/pais.service';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent {

  

  get historial() {
    return this.SidebarService.historial;
  }

  constructor(
    private SidebarService: SidebarService
  ) { }

  buscar( value: string ) {
    // this.onClick.emit( value );
    // console.log( "emitiendo:", value );
    this.SidebarService.setTarget( value );
    // console.log( this.historial );
  }

  limpiar() {
    console.log('limpiando historial...');
    localStorage.clear();
    window.location.reload();
  }

}
