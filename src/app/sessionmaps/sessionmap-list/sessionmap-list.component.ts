import {Component, OnInit} from '@angular/core';
import {Sessionmap} from 'src/app/models/sessionmap.model';
import {SessionmapDataService} from '../sessionmap-data.service';
import {HttpErrorResponse} from '@angular/common/http';
import {MatDialog} from '@angular/material';
import {SessionmapCreatieComponent} from '../sessionmap-creatie/sessionmap-creatie.component';

export interface DialogCourseData {
  lesnaam: string;
  isCreatie: boolean;
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

  constructor(private sessionmapDataService: SessionmapDataService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.sessionmapDataService.sesmaps.subscribe(
      sesmaps => {
        this._sesmaps = sesmaps;
      },
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${
          error.status
          } while trying to retrieve sessionmaps: ${error.error}`;
      }
    );
    this._sesmaps = new Array();
  }

  get sesmaps() {
    return this._sesmaps;
  }

  onAdd(sesmap: Sessionmap, isCreatie: boolean) {
    const addCourseDialoRef = this.dialog.open(SessionmapCreatieComponent, {
      data: {
        lesnaam: this.lesnaam,
        isCreatie: isCreatie
      }
    });

    addCourseDialoRef.afterClosed().subscribe(result => {
      this.lesnaam = result;
      //Als er iets is ingevuld in de input
      if (result) {
        //We herbruiken hetzelfde dialoog. Is het een creatie of wijzigdialoog?
        if (isCreatie) {
          let sesmap: Sessionmap = new Sessionmap(this.lesnaam);
          this.sessionmapDataService.addNewSessionMap(sesmap).subscribe(
            sesmap => {
              this._sesmaps.push(sesmap);
            },
            (error: HttpErrorResponse) => {
              this.errorMsg = `Error ${error.status} while adding  ${
                this.lesnaam
                }: ${error.error}`;
            }
          );
        } else {
          sesmap.titleCourse = result;
          this.sessionmapDataService.wijzigSessionMap(sesmap).subscribe(
            () => {
            },
            (error: HttpErrorResponse) => {
              this.errorMsg = `Error ${error.status} while editing  ${
                this.lesnaam
                }: ${error.error}`;
            }
          );
        }
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
