import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DialogCourseData} from '../sessionmap-list/sessionmap-list.component';

@Component({
  selector: 'app-sessionmap-creatie',
  templateUrl: './sessionmap-creatie.component.html',
  styleUrls: ['./sessionmap-creatie.component.css']
})
export class SessionmapCreatieComponent {

  constructor(
    public dialogRef: MatDialogRef<SessionmapCreatieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogCourseData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


}
