import {Exercise} from '../../models/exercise.model';
import {Session} from '../../models/sessie.model';
import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CmdImplementation} from '../../models/Commands/commandImplementation.model';
import {Cmd} from 'src/app/models/Commands/command.model';
import {Insert} from 'src/app/models/Commands/insert.model';
import {GenericItem} from '../../models/GenericCollection.model';
import {SessieDataService} from '../../sessie/sessie-data.service';
import {Delete} from 'src/app/models/Commands/delete.model';
import {InputPage, TextPage, AudioPage} from '../../models/page.model';
import {Paragraph} from '../../models/paragraph.model';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {OefeningCreatieComponent} from '../oefening-creatie/oefening-creatie.component';
import {Update} from 'src/app/models/Commands/update.model';
import {ExerciseDataService} from '../exercise-data.service';

export interface DialogExerciseData {
  naam: string;
  isCreatie: boolean;
}

@Component({
  selector: 'app-oefeninglijst',
  templateUrl: './oefeninglijst.component.html',
  styleUrls: ['./oefeninglijst.component.css'],
  animations: [
    trigger('shrinkOut', [
      transition(':increment', [style({transform: 'translateX(-100%)'}), animate('500ms ease-out', style({transform: 'translateX(0%)'}))]),
      transition(':decrement', [style({transform: 'translateX(100%)'}), animate('500ms ease-out', style({transform: 'translateX(0%)'}))]),
      transition(':enter', [style({width: 0, opacity: 0, overflow: 'hidden'}), animate('500ms ease-out', style({width: '*', opacity: 1}))]),
      transition(':leave', [style({width: '*', opacity: 1, overflow: 'hidden'}), animate('500ms ease-out', style({width: 0, opacity: 0}))])
    ])
  ]
})
export class OefeninglijstComponent extends CmdImplementation implements OnInit {
  private _sessie: Session;
  private _sesid: string;
  private _naam: string;
  public items: Exercise[];

  constructor(public dialog: MatDialog, private _route: ActivatedRoute, public snackBar: MatSnackBar, private _exerciseDataService: ExerciseDataService, private _sessionDataService: SessieDataService) {
    super();
  }

  ngOnInit() {
    this._sessie = new Session();
    this._route.params.subscribe(params => {
      this._sesid = params['sessieID'];
    });
    console.log(this._sesid);
    this._sessionDataService.getSessie(this._sesid).subscribe(
      sessie => {
        console.log(sessie);
        (this._sessie = sessie);

        console.log('CHECK');
      },
      (error: HttpErrorResponse) => {
        this.snackBar.open(`Error ${error.status} while getting exercises: ${error.error}`, '',
          {
            duration: 3000,
          });
      }
    );
    this._exerciseDataService.getExercisesFromSession(this._sesid).subscribe(
      exercises => {
        this._sessie.items = exercises;
      },
      (error) => {
        console.log(error);
      }
    );
    console.log(this._sessie);
  }

  onAdd(ex: Exercise, isCreatie: boolean) {
    console.log(this.items);
    const addExDialogRef = this.dialog.open(OefeningCreatieComponent, {
      height: '400px',
      width: '500px',
      data: {
        naam: this._naam,
        isCreatie: isCreatie
      }
    });

    addExDialogRef.afterClosed().subscribe(result => {
      this._naam = result;
      //Als er iets is ingevuld in de input
      if (result) {
        //We herbruiken hetzelfde dialoog. Is het een creatie of wijzigdialoog?
        if (isCreatie) {
          let oef = new Exercise(this._naam);
          oef.position = this._sessie.items.length;
          this.addCommand(new Insert([this._sessie], [oef]));
        } else {
          ex.title = result;
          this.addCommand(new Update([this._sessie], [ex]));
        }
      }
    });
  }

  removeOefening(oef: Exercise) {
    // dialoogvenster openen en inner class gebruiken (toont niet)
    // const dialogRef = this.dialog.open(RemoveExerciseDialog, {
    //   width: '250px'
    // });

    // dialogRef.afterClosed().subscribe(
    //   data => {
    //     if (data) {
    //       this.addCommand(new Delete([this._sessie], [oef]));
    //       this.snackBar.open("Exercise " + oef.title + " removed!", "",
    //         {
    //           duration: 3000,
    //         });
    //     }
    //   });
    this.addCommand(new Delete([this._sessie], [oef]));
    this.snackBar.open('Exercise ' + oef.title + ' removed!', '',
      {
        duration: 3000,
      });
  }

  get oefeningen(): GenericItem[] {
    return this._sessie.items;
  }

  /*
    updates the current session in the database when the command timer has expired
  */
  saveItem() {
    this._sessionDataService.editSession(this._sessie).subscribe(
      () => {
        this.snackBar.open('Oefeningen opgeslaan!');
      },
      (error: HttpErrorResponse) => {
        this.snackBar.open(`Error ${error.status} while saving session: ${error.error}`, '', {
          duration: 3000,
        });
        console.log(error);
      }
    );
  }

  /*
    remove last action from the command cache
  */
  undo() {
    this.undoCurrentCommand();
  }

  addItem() {
    console.log('ADD_ITEM');
  }

  removeItem() {
    console.log('REMOVE_ITEM');
  }

  changePos() {
    console.log('CHANGE_POSITION');
  }

  update() {
    console.log('UPDATE_ITEM');
  }
}

/*
  Extra klasse voor remove oefening dialoogvenster met zijn eigen html code
*/
@Component({
  selector: 'dialog-remove-exercise',
  templateUrl: 'dialog-remove-exercise.html',
})
export class RemoveExerciseDialog {

  constructor(public dialogRef: MatDialogRef<RemoveExerciseDialog>) {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
