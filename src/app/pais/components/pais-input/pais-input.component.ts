import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})
export class PaisInputComponent implements OnInit {

  //Enter event
  @Output() onEnter   : EventEmitter<string> = new EventEmitter();
  //OnDebounce event
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  //Placeholder input
  @Input() placeholder: string = '';

  debouncer: Subject<string> = new Subject();

  termino: string = '';

  ngOnInit(): void {
    this.debouncer
      .pipe(
        debounceTime(300))
      .subscribe( valor => {
        this.onDebounce.emit( valor );
    })
  }

  buscar() {
  this.onEnter.emit( this.termino );
  }

  teclaPresionada() {
    this.debouncer.next( this.termino )
  }


}
