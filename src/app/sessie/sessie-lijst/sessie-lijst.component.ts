import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Sessie } from "../../models/sessie.model";
import { SessieDataService } from "../sessie-data.service";
import { HttpErrorResponse } from "@angular/common/http";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
  FormGroupDirective,
  NgForm
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

export class SessieErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: "app-sessie-lijst",
  templateUrl: "./sessie-lijst.component.html",
  styleUrls: ["./sessie-lijst.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class SessieLijstComponent implements OnInit {
  private _sessies: Sessie[];
  public creating: Boolean = false;
  public newSes: FormGroup;
  public matcher = new SessieErrorStateMatcher();
  public errorMsg: string;


  constructor(private _sessieDataService: SessieDataService, public dialog: MatDialog,
    public snackBar: MatSnackBar, private _fb: FormBuilder) {
  }

  ngOnInit(): void {
    this._sessieDataService.sessies.subscribe(
      sessies => (this._sessies = sessies),
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${
          error.status
          } while trying to retrieve recipes: ${error.error}`;
      }
    );
    this.newSes = this._fb.group({
      number: [5, Validators.compose([Validators.required, Validators.pattern("[0-9]")])],
      title: ['', Validators.required]
    }

    );
    // this._sessies = this._sessieDataService.sessies;
  }

  addSessie() {
    //werkt nog niet helemaal door databank fout, aanpassingen nodig in backend project, code hier juist wel
    this._sessieDataService.addNewSessie(new Sessie(this.newSes.value.title, 4)).subscribe(
      () => {
        this.snackBar.open("Sessie successfully added!");
      },
      (error: HttpErrorResponse) => {
        this.snackBar.open(`Error ${error.status} while adding new sessie: ${error.error}`, "", {
          duration: 3000,
        });
        this.creating = false;
        this.sesReset();
      }
    );

    // JARNE -> copy paste naar hierboven
    //-------

    // let sessie = new Sessie(this.newSes.value.title, this.newSes.value.number);
    // this._sessieDataService.addNewSessie(sessie);
    // this.snackBar.open("Sessie " + sessie.get_nr() + ": " + sessie.get_title() + " added!", "",
    //   {
    //     duration: 3000,
    //   });
    // this.creating = false;
    // this.sesReset();
  }

  // removeSessie(sessie: Sessie) {
  //   let remove: Boolean = false;
  //   const dialogRef = this.dialog.open(RemoveSessieDialog, {
  //     width: '250px'
  //   });

  //   dialogRef.afterClosed().subscribe(
  //     data => {
  //       if (data) {
  //         // this._sessieDataService.removeSessie(sessie).subscribe(
  //         //   () => {
  //         //     this.snackBar.open("Sessie successfully removed!");
  //         //   },
  //         //   (error: HttpErrorResponse) => {
  //         //     this.snackBar.open(`Error ${error.status} while removing sessie: ${error.error}`, "",
  //         // {
  //         //   duration: 3000,
  //         // });
  //         //   }
  //         // );
  //         this._sessieDataService.removeSessie(sessie);
  //       }
  //     },
  //   );
  // }

  get sessies() {
    return this._sessies;
  }

  sesReset() {
    this.newSes.reset();
    this._fb.group({
      number: [this.sessies.length + 2, Validators.compose([Validators.required, Validators.pattern("[0-9]")])]
    });
  }
}

@Component({
  selector: 'dialog-remove-sessie',
  templateUrl: 'dialog-remove-sessie.html',
})
export class RemoveSessieDialog {

  constructor(public dialogRef: MatDialogRef<RemoveSessieDialog>) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
