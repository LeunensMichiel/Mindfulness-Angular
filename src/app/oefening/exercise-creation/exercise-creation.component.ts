import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogExerciseData } from '../exercise-list/exercise-list.component';


@Component({
  selector: 'app-exercise-creation',
  templateUrl: './exercise-creation.component.html',
  styleUrls: ['./exercise-creation.component.css']
})
export class ExerciseCreationComponent {

  constructor(
    public dialogRef: MatDialogRef<ExerciseCreationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogExerciseData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
