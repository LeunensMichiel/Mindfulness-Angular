import { Component, OnInit } from '@angular/core';
import { Sessionmap } from 'src/app/models/sessionmap.model';
import { SessionmapDataService } from '../sessionmap-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import {MatDialog, MatDialogRef} from '@angular/material';
import {SessionmapCreatieComponent} from '../sessionmap-creatie/sessionmap-creatie.component';

@Component({
  selector: 'app-sessionmap-list',
  templateUrl: './sessionmap-list.component.html',
  styleUrls: ['./sessionmap-list.component.css']
})
export class SessionmapListComponent implements OnInit {
  public errorMsg: string;
  private _sesmaps: Sessionmap[];
  private lesnaam: string;
  addCourseDialoRef: MatDialogRef<SessionmapCreatieComponent>;


  constructor(private sessionmapDataService: SessionmapDataService, public dialog : MatDialog) { }

  ngOnInit(): void {
    this.sessionmapDataService.sesmaps.subscribe(
      sesmaps => (this._sesmaps = sesmaps),
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${
          error.status
        } while trying to retrieve sessionmaps: ${error.error}`;
      }
    );
  }

  get sesmaps() {
    return this._sesmaps;
  }

  onAdd() {
    this.addCourseDialoRef = this.dialog.open(SessionmapCreatieComponent, {
      height: '400px',
      width: '500px',
      data: {
        lesnaam: ''
      }
    });

    this.addCourseDialoRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.lesnaam = result;
    });

  }
}
