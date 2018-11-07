import { Component, OnInit } from "@angular/core";
import { Sessie } from "../../models/sessie.model";
import { HttpErrorResponse } from "@angular/common/http";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SessieDataService } from "../sessie-data.service";

@Component({
  selector: "app-sessie-lijst",
  templateUrl: "./sessie-lijst.component.html",
  styleUrls: ["./sessie-lijst.component.css"]
})
export class SessieLijstComponent implements OnInit {
  private _sessies: Sessie[];
  // variabele om te bepalen of het creatie bolletje getoond wordt
  public creating: Boolean = false;

  constructor(public dialog: MatDialog, private _sessieDataService: SessieDataService,
    public snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    let sessie = new Sessie("title", 0);
    // this._sessieDataService.sessies.subscribe(
    //   sessies => (this._sessies = sessies),
    //   (error: HttpErrorResponse) => {
    //     this.snackBar.open(`Error ${error.status} while getting sessies: ${error.error}`, "",
    //       {
    //         duration: 3000,
    //       });
    //   }
    // );
    // this._sessies = this._sessieDataService.sessies;
  }

  removeSessie(sessie: Sessie) {

    // dialoogvenster openen en inner class gebruiken
    const dialogRef = this.dialog.open(RemoveSessieDialog, {
      width: '250px'
    });

    // RemoveSessieDialog geeft een boolean mee om aan te tonen of ja of nee gedrukt werd
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          // this._sessieDataService.removeSessie(sessie).subscribe(
          //   () => {
          //     this.snackBar.open("Sessie successfully removed!");
          //   },
          //   (error: HttpErrorResponse) => {
          //     this.snackBar.open(`Error ${error.status} while removing sessie: ${error.error}`, "",
          // {
          //   duration: 3000,
          // });
          //   }
          // );
          this._sessieDataService.removeSessie(sessie);
          this.snackBar.open("Sessie " + sessie.position + " removed!", "",
            {
              duration: 3000,
            });
        }
      });
  }

  get sessies() {
    return this._sessies;
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

  constructor(public dialogRef: MatDialogRef<RemoveSessieDialog>) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
