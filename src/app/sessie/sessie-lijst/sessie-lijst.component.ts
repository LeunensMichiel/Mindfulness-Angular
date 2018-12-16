import {Component, Input,  OnInit} from '@angular/core';
import {Session} from '../../models/session.model';
import {HttpErrorResponse} from '@angular/common/http';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SessieDataService} from '../sessie-data.service';
import {Observable} from 'rxjs';
import {Sessionmap} from '../../models/sessionmap.model';


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
  }

  getSessions() {
    return this.sessionmap.sessions.items;
  }

  addSession(session: Session) {

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
          this.snackBar.open('Sessie removed!', '',
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

