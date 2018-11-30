import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Session} from '../../models/session.model';
import {HttpErrorResponse, HttpEventType, HttpResponse} from '@angular/common/http';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SessieDataService} from '../sessie-data.service';
import {DialogCourseData} from '../../sessionmaps/sessionmap-list/sessionmap-list.component';
import {Observable} from 'rxjs';
import {Sessionmap} from '../../models/sessionmap.model';
import {GenericItem} from '../../models/GenericCollection.model';
import {AudioPage} from '../../models/page.model';

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
    //       this.audioName = page.audioName;
    //       console.log(page.audioName);
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

  editSession(session: Session) {
    const modifyCourseDialoRef = this.dialog.open(SessieModifyComponent, {
      data: {
        session_title: session.title
      }
    });
    modifyCourseDialoRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        session.title = result;
        this._sessionDataService.editSession(session).subscribe(
          () => {

          },
          (error: HttpErrorResponse) => {
            this.snackBar.open(`Error ${error.status} while editing session for ${
                session.title
                }: ${error.error}`, '',
              {
                duration: 10000,
              });
          }
        );
      }
    });
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

@Component({
  selector: 'dialog-modify-sessie',
  templateUrl: 'dialog-modify-sessie.html',
})
export class SessieModifyComponent {

  constructor(
    public dialogRef: MatDialogRef<SessieModifyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogCourseData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
