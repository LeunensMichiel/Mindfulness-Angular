import { Component, OnInit, Input, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { Exercise } from 'src/app/models/exercise.model';
import {ExerciseDataService} from '../exercise-data.service';

@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.component.html',
  styleUrls: ['./exercise-detail.component.css']
})
export class ExerciseDetailComponent implements OnInit {
  @Input() exercise: Exercise;
  @Output() public deletedExercise = new EventEmitter<Exercise>();
  @Output() public modifiedExercise = new EventEmitter<Exercise>();
  @Input() _position: number = 0;
  public dropdownVisible = false;

  constructor(private _exerciseDataService: ExerciseDataService) { }

  ngOnInit() {
  }

  get pages() {

    return this.exercise.list.items.filter(it => {
      if (it) {
        return  (it !== (undefined || null));
      }
    });

  }

  removeExercise() {
    this.deletedExercise.emit(this.exercise);
  }

  modify() {
    this.modifiedExercise.emit(this.exercise);
  }
}
