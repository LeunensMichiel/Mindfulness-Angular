import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Sessie } from '../../models/sessie.model';

@Component({
  selector: 'app-sessie',
  templateUrl: './sessie.component.html',
  styleUrls: ['./sessie.component.css']
})
export class SessieComponent implements OnInit {

  @Input() public sessie: Sessie;
  @Output() public deleteSessie = new EventEmitter<Sessie>();
  public showIcons: Boolean = false;

  constructor() { }

  ngOnInit() {
  }

  removeSessie() {
    this.deleteSessie.emit(this.sessie);
  }
}
