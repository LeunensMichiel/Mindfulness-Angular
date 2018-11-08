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
  @Input() public url: string;
  @Output() public deleteSessie = new EventEmitter<Sessie>();
  @Output() public modifySessie = new EventEmitter<Sessie>();

  constructor(private _sessieDataService: SessieDataService) {
    var random =  Math.floor(Math.random() * (14 - 1) + 1);
    this.url = `/src/assets/images/sessie-${random}.jpg`;
  }

  ngOnInit() {
  }

  removeSessie() {
    this.deleteSessie.emit(this.sessie);
  }

  editSessie() {
    this.modifySessie.emit(this.sessie);
  }

  addOefening(ex: Exercise) {
    // this._sessieDataService.addOefToSessie(this.sessie, ex);
  }
}
