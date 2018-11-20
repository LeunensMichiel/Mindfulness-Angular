import {Exercise} from '../../models/exercise.model';
import {Session} from '../../models/session.model';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {GenericItem} from '../../models/GenericCollection.model';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ExerciseCreationComponent} from '../exercise-creation/exercise-creation.component';
import {ExerciseDataService} from '../exercise-data.service';

export interface DialogExerciseData {
  exercise_title: string;
  isCreation: boolean;
}

@Component({
  selector: 'app-oefeninglijst',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css'],
  animations: [
    trigger('shrinkOut', [
      transition(':increment', [style({transform: 'translateX(-100%)'}), animate('500ms ease-out', style({transform: 'translateX(0%)'}))]),
      transition(':decrement', [style({transform: 'translateX(100%)'}), animate('500ms ease-out', style({transform: 'translateX(0%)'}))]),
      transition(':enter', [style({width: 0, opacity: 0, overflow: 'hidden'}), animate('500ms ease-out', style({width: '*', opacity: 1}))]),
      transition(':leave', [style({width: '*', opacity: 1, overflow: 'hidden'}), animate('500ms ease-out', style({width: 0, opacity: 0}))])
    ])
  ]
})
export class ExerciseListComponent implements OnInit {
  private _session: Session;
  private _naam: string;
  public items: Exercise[];

  constructor(public dialog: MatDialog,
              private _route: ActivatedRoute,
              public snackBar: MatSnackBar,
              private _exerciseDataService: ExerciseDataService
  ) {}

  ngOnInit() {
    this._route.data.subscribe(item =>{
      this._session = item['session'];
      console.log(this._session);
    });

  }

  onAdd(ex: Exercise, isCreation: boolean) {
    const addExDialogRef = this.dialog.open(ExerciseCreationComponent, {
      height: '400px',
      width: '500px',
      data: {
        exercise_title: this._naam,
        isCreation: isCreation
      }
    });

    addExDialogRef.afterClosed().subscribe(result => {

      if (result) { // This checks if there has been a input
        // We use for creation and updating of a exercise the same dialog
        if (isCreation) {
          let ex = new Exercise(result);
          ex.position = this._session.list.items.length;
          this.addExercise(ex);
        } else {
          ex.title = result;
          this.updateExercise(ex);
        }
      }
    });
  }

  updateExercise(exercise: Exercise) {
    this._exerciseDataService.updateExercise(exercise).subscribe(
      () => {
        this.snackBar.open('Oefeningen gewijzigd!');
      },
      (error: HttpErrorResponse) => {
        this.snackBar.open(`Error ${error.status} tijdens het opslaan van oefening: ${error.error}`, '', {
          duration: 3000,
        });
        console.log(error);
      }
    );
  }

  addExercise(exercise: Exercise) {
    this._exerciseDataService.addExerciseToSession(exercise, this._session.id).subscribe(
      result => {
        this._session.list.addItem(result);
        this.snackBar.open('Oefeningen opgeslaan!', '', {
          duration: 3000,
        });
      },
      (error: HttpErrorResponse) => {
        this.snackBar.open(`Error ${error.status} tijdens het opslaan van oefening: ${error.error}`, '', {
          duration: 3000,
        });
        console.log(error);
      }
    );
  }

  removeExercise(exercise: Exercise) {
    // dialoogvenster openen en inner class gebruiken (toont niet)
    const dialogRef = this.dialog.open(RemoveExerciseDialog, {
      height: '250px',
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this._exerciseDataService.removeExercise(exercise).subscribe(
            result => {
              this._session.list.deleteItem(result.position);
              this.snackBar.open('Oefeningen verwijderd!', '', {
                duration: 3000,
              });
            },
            (error: HttpErrorResponse) => {
              this.snackBar.open(`Error ${error.status} tijdens het verwijderen van oefening: ${error.error}`, '', {
                duration: 3000,
              });
              console.log(error);
            }
          )
        }
      });
  }

  get exercises(): GenericItem[] {
    return this._session.list.items;
  }

}

/*
  Extra klasse voor remove exercise dialoogvenster met zijn eigen html code
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
