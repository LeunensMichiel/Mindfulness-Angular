import { Component, OnInit, Input, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { Exercise } from 'src/app/models/exercise.model';

@Component({
  selector: 'app-oefening-detail',
  templateUrl: './oefening-detail.component.html',
  styleUrls: ['./oefening-detail.component.css']
})
export class OefeningDetailComponent implements OnInit {
  @Input() excersice: Exercise
  @Output() public delOef = new EventEmitter<Exercise>();
  @Output() public wijzig = new EventEmitter<Exercise>();
  @Input() _position: number = 0;
  public dropdownVisible = false;

  constructor() { }

  public hideDropdown(event) {
    console.log("check");
  }

  ngOnInit() {
    console.log(this.excersice);
  }

  ngOnChange(changes: SimpleChanges) {
    console.log(changes);
  }

  removeOefening() {
    this.delOef.emit(this.excersice);
  }

  wijzigen() {
    this.wijzig.emit(this.excersice);
  }
}
