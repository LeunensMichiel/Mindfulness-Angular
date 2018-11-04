import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Sessionmap } from 'src/app/models/sessionmap.model';
import { SessionmapDataService } from '../sessionmap-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import {MatDialog, MatDialogRef} from '@angular/material';
import {SessionmapCreatieComponent} from '../sessionmap-creatie/sessionmap-creatie.component';
import {SessionmapDetailComponent} from '../sessionmap-detail/sessionmap-detail.component';
export interface DialogCourseData {
  lesnaam: string;
}
@Component({
  selector: 'app-sessionmap-list',
  templateUrl: './sessionmap-list.component.html',
  styleUrls: ['./sessionmap-list.component.css']
})
export class SessionmapListComponent implements OnInit {
  public errorMsg: string;
  private _sesmaps: Sessionmap[];
  private lesnaam: string;

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
    const addCourseDialoRef = this.dialog.open(SessionmapCreatieComponent, {
      height: '400px',
      width: '500px',
      data: {
        lesnaam: this.lesnaam
      }
    });

    addCourseDialoRef.afterClosed().subscribe(result => {
      this.lesnaam = result;
      if (result) {
        let sesmap: Sessionmap = new Sessionmap(this.lesnaam);
        this.sessionmapDataService.addNewSessionMap(sesmap).subscribe(
          () => {},
          (error: HttpErrorResponse) => {
            this.errorMsg = `Error ${error.status} while adding  ${
              this.lesnaam
              }: ${error.error}`;
          }
        );
      }
    });
  }

  removeSessionMap(course: Sessionmap) {
    this.sessionmapDataService.deleteSessionMap(course).subscribe(
      item => (this._sesmaps = this._sesmaps.filter(val => item.id !== val.id)),
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${error.status} while removing courses for ${
          course.titleCourse
          }: ${error.error}`;
      }
    );
  }

}
