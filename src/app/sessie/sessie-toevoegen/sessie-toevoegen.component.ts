import { Sessie } from './../../models/sessie.model';
import { SessieDataService } from './../sessie-data.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sessie-toevoegen',
  templateUrl: './sessie-toevoegen.component.html',
  styleUrls: ['./sessie-toevoegen.component.css']
})
export class SessieToevoegenComponent implements OnInit {
  public errorMsg: string;

  constructor(public snackbar: MatSnackBar, private _sessieDataService: SessieDataService) { }

  ngOnInit() {
  }

  onSubmit() {
    //Even hardcoded om te testen
    const sessie = new Sessie('zotte sessie', 5);

    this._sessieDataService.addNewSessie(sessie).subscribe(
      item => {
        this.snackbar.open("Sessie is aangemaakt! Joepie!", "", {
          duration: 2000
        });
      },
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${error.status} while adding sessie
          }: ${error.error}`;
      }
    );
  }
}
