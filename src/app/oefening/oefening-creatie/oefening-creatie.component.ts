import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogExerciseData } from '../oefeninglijst/oefeninglijst.component';


@Component({
  selector: 'app-oefening-creatie',
  templateUrl: './oefening-creatie.component.html',
  styleUrls: ['./oefening-creatie.component.css']
})
export class OefeningCreatieComponent {

  constructor(
    public dialogRef: MatDialogRef<OefeningCreatieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogExerciseData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
