import { Component, OnInit, Inject } from "@angular/core";
import { Sessie } from "../../models/sessie.model";
import { SessieDataService } from "../sessie-data.service";
import { HttpErrorResponse } from "@angular/common/http";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: "app-sessie-lijst",
  templateUrl: "./sessie-lijst.component.html",
  styleUrls: ["./sessie-lijst.component.css"]
})
export class SessieLijstComponent implements OnInit {
  private _sessies: Sessie[] = [];
  public errorMsg: string;
  public successMsg: string;

  constructor(private _sessieDataService: SessieDataService, public dialog: MatDialog,
    public snackBar: MatSnackBar) {
    this._sessies.push(new Sessie("Sessie 1", 1))
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
  }

  addSessie() {
    this._sessieDataService.addNewSessie(new Sessie("hey", this._sessies.length + 1)).subscribe(
      () => {
        this.snackBar.open("Sessie successfully added!");
      },
      (error: HttpErrorResponse) => {
        this.snackBar.open(`Error ${error.status} while adding new sessie: ${error.error}`, "Sad");
      }
    );
  }

  removeSessie(sessie: Sessie) {
    const dialogRef = this.dialog.open(RemoveSessieDialog, {
      width: '250px',

    });
  }

  get sessies() {
    return this._sessies;
  }
}

@Component({
  selector: 'dialog-remove-sessie',
  templateUrl: 'dialog-remove-sessie.html',
})
export class RemoveSessieDialog {

  constructor(public dialogRef: MatDialogRef<RemoveSessieDialog>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    
  }

}