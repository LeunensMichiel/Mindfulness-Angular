import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Sessie} from '../../models/sessie.model';
import {HttpErrorResponse} from '@angular/common/http';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {SessieDataService} from '../sessie-data.service';
import {DialogCourseData} from '../../sessionmaps/sessionmap-list/sessionmap-list.component';
import {SessionmapCreatieComponent} from '../../sessionmaps/sessionmap-creatie/sessionmap-creatie.component';
import {Observable} from 'rxjs';

export interface DialogCourseData {
  sessienaam: string;
}

@Component({
  selector: 'app-sessie-lijst',
  templateUrl: './sessie-lijst.component.html',
  styleUrls: ['./sessie-lijst.component.css']
})
export class SessieLijstComponent implements OnInit, OnDestroy {
  @Input() public sessions: Sessie[];
  private _mysessions$: Observable<Sessie[]>;
  // variabele om te bepalen of het creatie bolletje getoond wordt
  public creating: Boolean = false;
  private sesmapid: string;
  navigationSubscription;

  constructor(public dialog: MatDialog, private _sessieDataService: SessieDataService,
              public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    // this.navigationSubscription = this.router.events.subscribe((e: any) => {
    //   // If it is a NavigationEnd event re-initalise the component
    //   if (e instanceof NavigationEnd) {
    //     this.dataophalen();
    //   }
    // });

  }


  private dataophalen() {
    this.route.params.subscribe(params => {
      this.sesmapid = params['courseID'];
    });
    this._sessieDataService.sessies(this.sesmapid).subscribe(
      sessies => {
        this.sessions = sessies;
        console.log(sessies);
      },
      (error: HttpErrorResponse) => {
        this.snackBar.open(`Error ${error.status} while getting sessies: ${error.error}`, '',
          {
            duration: 3000,
          });
      }
    );
  }

  editSession(session: Sessie) {
    const modifyCourseDialoRef = this.dialog.open(SessieModifyComponent, {
      data: {
        sessienaam: session.title
      }
    });
    modifyCourseDialoRef.afterClosed().subscribe(result => {

      if (result) {
        session.title = result;
        this._sessieDataService.editSession(session).subscribe(
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

  removeSession(sessie: Sessie) {

    // dialoogvenster openen en inner class gebruiken
    const dialogRef = this.dialog.open(RemoveSessieDialog, {});
    // RemoveSessieDialog geeft een boolean mee om aan te tonen of ja of nee gedrukt werd
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this._sessieDataService.removeSessie(sessie).subscribe(
            item => {
              this.sessions = this.sessions.filter(val => item.id !== val.id);
            },
            (error: HttpErrorResponse) => {
              this.snackBar.open(`Error ${error.status} while removing session for ${
                  sessie.title
                  }: ${error.error}`, '',
                {
                  duration: 3000,
                });
            }
          );
          this.snackBar.open('Sessie ' + sessie.position + ' removed!', '',
            {
              duration: 3000,
            });
        }
      });
  }

  get sessies() {
    return this.sessions;
  }

  get sesMapID() {
    return this.sesmapid;
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
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
