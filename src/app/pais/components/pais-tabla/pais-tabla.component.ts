import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-pais-tabla',
  templateUrl: './pais-tabla.component.html',
  styleUrls: ['./pais-tabla.component.sass']
})
export class PaisTablaComponent{

  @Input() paises: Country[] = [];

  constructor(private PaisService: PaisService) { }
}
