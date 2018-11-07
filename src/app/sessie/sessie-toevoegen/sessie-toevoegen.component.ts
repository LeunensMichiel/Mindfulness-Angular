import { Component, OnInit, Output, Input, ViewEncapsulation, EventEmitter } from '@angular/core';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SessieDataService } from "../sessie-data.service";
import { Sessie } from "../../models/sessie.model";
import { HttpErrorResponse } from "@angular/common/http";

export class SessieErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-sessie-toevoegen',
  templateUrl: './sessie-toevoegen.component.html',
  styleUrls: ['./sessie-toevoegen.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SessieToevoegenComponent implements OnInit {
  @Output() public disable = new EventEmitter();
  @Input() public aantal: number;
  @Input() sesMapid: string;
  public newSes: FormGroup;
  public matcher = new SessieErrorStateMatcher();

  constructor(private _fb: FormBuilder, private _sessieDataService: SessieDataService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.newSes = this._fb.group({
      number: [this.aantal, Validators.compose([Validators.required, Validators.pattern("[0-9]")])],
      title: ['', Validators.required]
    }
    );
  }

  addSessie() {
    let sessie = new Sessie(this.newSes.value.title, this.newSes.value.number, this.sesMapid);
    if (this.newSes.valid) {
      this._sessieDataService.addNewSessie(sessie).subscribe(
        () => {
          this.snackBar.open("Sessie successfully added!");
        },
        (error: HttpErrorResponse) => {
          this.snackBar.open(`Error ${error.status} while adding new sessie: ${error.error}`, "", {
            duration: 3000,
          });
          this.setDisable();
        }
      );
    }
    else {
      this.snackBar.open("Please fill in all fields correctly!", "",
        {
          duration: 3000,
        });
    }
  }

  setDisable() {
    this.newSes.reset();
    this.disable.emit();
  }
}
