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
  @Input() public session: Sessie;
  @Input() public url: string;
  @Output() public deleteSession = new EventEmitter<Sessie>();
  @Output() public modifySession = new EventEmitter<Sessie>();

  constructor(private _sessionDataService: SessieDataService) {
    var random =  Math.floor(Math.random() * (14 - 1) + 1);
    this.url = `assets/images/sessie-${random}.jpg`;

  }

  ngOnInit() {
  }

  removeSessie() {
    this.deleteSession.emit(this.session);
  }

  editSessie() {
    this.modifySession.emit(this.session);
  }

  addOefening(ex: Exercise) {
    // this._sessieDataService.addOefToSessie(this.sessie, ex);
  }
}
