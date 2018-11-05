import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Sessie } from '../../models/sessie.model';
import { Exercise } from '../../models/exercise.model';
import { SessieDataService } from '../sessie-data.service';

@Component({
  selector: 'app-sessie',
  templateUrl: './sessie.component.html',
  styleUrls: ['./sessie.component.css']
})
export class SessieComponent implements OnInit {

  @Input() public sessie: Sessie;
  @Output() public deleteSessie = new EventEmitter<Sessie>();
  public showIcons: Boolean = false;

  constructor(private _sessieDataService: SessieDataService) { }

  ngOnInit() {
  }

  removeSessie() {
    this.deleteSessie.emit(this.sessie);
  }

  addOefening(ex: Exercise) {
    // this._sessieDataService.addOefToSessie(this.sessie, ex);
  }
}
