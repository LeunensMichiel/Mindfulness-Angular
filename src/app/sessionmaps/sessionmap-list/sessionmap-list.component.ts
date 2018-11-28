import {Component, OnInit} from '@angular/core';
import {Sessionmap} from 'src/app/models/sessionmap.model';
import {SessionmapDataService} from '../sessionmap-data.service';
import {HttpErrorResponse} from '@angular/common/http';
import {MatDialog} from '@angular/material';
import {SessionmapCreatieComponent} from '../sessionmap-creatie/sessionmap-creatie.component';

export interface DialogCourseData {
  sessionmap_title: string;
  isCreation: boolean;
}

@Component({
  selector: 'app-sessionmap-list',
  templateUrl: './sessionmap-list.component.html',
  styleUrls: ['./sessionmap-list.component.css']
})
export class SessionmapListComponent implements OnInit {
  public errorMsg: string;
  private _sessionmaps: Sessionmap[];
  private _selectedSessionmap: Sessionmap;

  constructor(private _sessionmapDataService: SessionmapDataService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this._sessionmapDataService.sesmaps.subscribe(
      sesmaps => {
        this._sessionmaps = sesmaps.sort((a, b) => a.titleCourse.localeCompare(b.titleCourse));
        if (sesmaps.length !== 0) {
          this._selectedSessionmap = this._sessionmaps[0];
        }
      },
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${
          error.status
          } while trying to retrieve sessionmaps: ${error.error}`;
      }
    );
    this._sessionmaps = new Array();
  }

  get sesmaps() {
    return this._sessionmaps;
  }

  get selectedSessionmap() {
    return this._selectedSessionmap;
  }

  onAdd(isCreation: boolean) {
    let addCourseDialoRef;
    if (isCreation) {
      addCourseDialoRef = this.dialog.open(SessionmapCreatieComponent, {
        data: {
          sessionmap_title: "",
          isCreation: isCreation
        }
      });
    } else {
      addCourseDialoRef = this.dialog.open(SessionmapCreatieComponent, {
        data: {
          sessionmap_title: this._selectedSessionmap.titleCourse,
          isCreation: isCreation
        }
      });
    }

    addCourseDialoRef.afterClosed().subscribe(result => {
      //Als er iets is ingevuld in de input
      if (result) {
        //We herbruiken hetzelfde dialoog. Is het een creatie of wijzigdialoog?
        if (isCreation) {
          let sesmap: Sessionmap = new Sessionmap(result);
          this._sessionmapDataService.addNewSessionMap(sesmap).subscribe(
            sesmap => {
              this._sessionmaps.push(sesmap);
              this._sessionmaps = this._sessionmaps.sort((a, b) => a.titleCourse.localeCompare(b.titleCourse));

            },
            (error: HttpErrorResponse) => {
              this.errorMsg = `Error ${error.status} while adding  ${
                result
                }: ${error.error}`;
            }
          );
        } else {
          this.selectedSessionmap.titleCourse = result;
          this._sessionmapDataService.updateSessionMap(this._selectedSessionmap).subscribe(
            () => {
            },
            (error: HttpErrorResponse) => {
              this.errorMsg = `Error ${error.status} while editing  ${
                result
                }: ${error.error}`;
            }
          );
        }
      }
    });
  }

  removeSessionMap() {
    this._sessionmapDataService.deleteSessionMap(this._selectedSessionmap).subscribe(
      item => (this._sessionmaps = this._sessionmaps.filter(val => item.id !== val.id)),
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${error.status} while removing courses for ${
          this._selectedSessionmap.titleCourse
          }: ${error.error}`;
      }
    );
  }

  selectSessionmap(sessionmap_id: number) {

    this._selectedSessionmap = this._sessionmaps[sessionmap_id];
  }

}
