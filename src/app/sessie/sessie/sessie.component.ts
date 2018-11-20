import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Session } from '../../models/session.model';
import { Exercise } from '../../models/exercise.model';
import { SessieDataService } from '../sessie-data.service';

@Component({
  selector: 'app-sessie',
  templateUrl: './sessie.component.html',
  styleUrls: ['./sessie.component.css']
})
export class SessieComponent implements OnInit {
  @Input() public session: Session;
  @Input() public url: string;
  @Output() public deleteSession = new EventEmitter<Session>();
  @Output() public modifySession = new EventEmitter<Session>();

  constructor() {
    let random =  Math.floor(Math.random() * (14 - 1) + 1);
    this.url = `assets/images/sessie-${random}.jpg`;

  }

  ngOnInit() {
  }

  removeSession() {
    this.deleteSession.emit(this.session);
  }

  editSession() {
    this.modifySession.emit(this.session);
  }

}
