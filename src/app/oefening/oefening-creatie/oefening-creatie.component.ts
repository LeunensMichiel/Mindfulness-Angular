import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Exercise } from '../../models/exercise.model';

@Component({
  selector: 'app-oefening-creatie',
  templateUrl: './oefening-creatie.component.html',
  styleUrls: ['./oefening-creatie.component.css']
})
export class OefeningCreatieComponent implements OnInit {
  @Output() public newOef = new EventEmitter<Exercise>();
  public inputChoiceActive = true;

  constructor() { }

  ngOnInit() {
  }

  public selectInputType(event){
    this.inputChoiceActive = !this.inputChoiceActive;
  }

  addOefening() {
    this.newOef.emit(new Exercise());
  }
}
