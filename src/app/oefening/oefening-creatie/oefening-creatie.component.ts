import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Exercise } from '../../models/exercise.model';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

@Component({
  selector: 'app-oefening-creatie',
  templateUrl: './oefening-creatie.component.html',
  styleUrls: ['./oefening-creatie.component.css']
})
export class OefeningCreatieComponent implements OnInit {
  @Output() public newOef = new EventEmitter<Exercise>();
  private _newOef: FormGroup;

  constructor() { }

  ngOnInit() {
    this._newOef = new FormGroup({
      title: new FormControl()
    });
  }

  addOefening() {
    this.newOef.emit(new Exercise());
  }
}
