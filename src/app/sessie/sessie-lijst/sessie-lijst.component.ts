import {Component, Inject, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Session} from '../../models/session.model';
import {HttpErrorResponse, HttpEventType, HttpResponse} from '@angular/common/http';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatDialogConfig} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SessieDataService} from '../sessie-data.service';
import {DialogCourseData} from '../../sessionmaps/sessionmap-list/sessionmap-list.component';
import {Observable} from 'rxjs';
import {Sessionmap} from '../../models/sessionmap.model';
import {GenericItem} from '../../models/GenericCollection.model';
import {AudioPage} from '../../models/page.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import {NgxAutoScroll} from "ngx-auto-scroll";
import { element } from '@angular/core/src/render3';

export interface DialogCourseData {
  session_title: string;
}

@Component({
  selector: 'app-sessie-lijst',
  templateUrl: './sessie-lijst.component.html',
  styleUrls: ['./sessie-lijst.component.css']
})
export class SessieLijstComponent implements OnInit {
  @Input() public sessionmap: Sessionmap;
  private _mysessions$: Observable<Session[]>;
  // variabele om te bepalen of het creatie bolletje getoond wordt
  public creating: Boolean = false;
  @ViewChild(NgxAutoScroll) ngxAutoScroll: NgxAutoScroll;

  constructor(public dialog: MatDialog, private _sessionDataService: SessieDataService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    console.log(this.sessionmap);
  }

  getSessions() {
    return this.sessionmap.sessions.items;
  }

  addSession(session: Session) {
    // this._sessionDataService.addNewSession(session, this.sessionmap.id).subscribe(
    //   event => {
    //     if (event.type === HttpEventType.UploadProgress) {
    //       this.progress.percentage = Math.round(100 * event.loaded / event.total);
    //     } else if (event instanceof HttpResponse) {
    //       console.log('File is completely uploaded!');
    //       let page = AudioPage.fromJSON(event.body);
    //       this.audioFilename = page.audioFilename;
    //       console.log(page.audioFilename);
    //     }
    //     this.sessionmap.sessions.addItem(event);
    //     this.snackBar.open('Session successfully added!', '', {
    //       duration: 3000,
    //     });
    //     this.creating = false;
    //   },
    //   (error: HttpErrorResponse) => {
    //     this.snackBar.open(`Error ${error.status} while adding new sessie: ${error.error}`, '', {
    //       duration: 3000,
    //     });
    //     this.creating = false;
    //   }
    // );

    this.sessionmap.sessions.addItem(session);
    this.creating = false;


  } 


  removeSession(session: Session) {

    // dialoogvenster openen en inner class gebruiken
    const dialogRef = this.dialog.open(RemoveSessieDialog, {});
    // RemoveSessieDialog geeft een boolean mee om aan te tonen of ja of nee gedrukt werd
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this._sessionDataService.removeSession(session).subscribe(
            item => {
              this.sessionmap.sessions.deleteItem(session.position);
              // this.sessionmap.items = this.sessionmap.items.filter(val => item.id !== val.id);
            },
            (error: HttpErrorResponse) => {
              this.snackBar.open(`Error ${error.status} while removing session for ${
                  session.title
                  }: ${error.error}`, '',
                {
                  duration: 3000,
                });
            }
          );
          this.snackBar.open('Session ' + session.position + ' removed!', '',
            {
              duration: 3000,
            });
        }
      });
  }

  scrollDown(): void{
    console.log(document.getElementById('sessie'));
    document.getElementById("sessie").scrollIntoView({behavior: 'smooth'});
  }

}


/*
  Extra klasse voor remove sessie dialoogvenster met zijn eigen html code
*/
@Component({
  selector: 'dialog-remove-sessie',
  templateUrl: 'dialog-remove-sessie.html',
})
export class RemoveSessieDialog {

  constructor(public dialogRef: MatDialogRef<RemoveSessieDialog>) {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}

