import { Component, OnInit, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
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
  @Output() public addSes = new EventEmitter();
  public newSes: FormGroup;
  public matcher = new SessieErrorStateMatcher();

  constructor(private _fb: FormBuilder, private _sessieDataService: SessieDataService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.newSes = this._fb.group({
      number: [this._sessieDataService.sessies.length + 1, Validators.compose([Validators.required, Validators.pattern("[0-9]")])],
      title: ['', Validators.required]
    }
    );
  }

  addSessie() {
    //werkt nog niet helemaal door databank fout, aanpassingen nodig in backend project, code hier juist wel
    // this._sessieDataService.addNewSessie(new Sessie(this.newSes.value.title)).subscribe(
    //   () => {
    //     this.snackBar.open("Sessie successfully added!");
    //   },
    //   (error: HttpErrorResponse) => {
    //     this.snackBar.open(`Error ${error.status} while adding new sessie: ${error.error}`, "", {
    //       duration: 3000,
    //     });
    //     this.creating = false;
    //     this.sesReset();
    //   }
    // );

    // JARNE -> copy paste naar hierboven
    //-------

    let sessie = new Sessie(this.newSes.value.title, this.newSes.value.number);
    if (this.newSes.valid) {
      this._sessieDataService.addNewSessie(sessie);
      this.snackBar.open("Sessie " + sessie.get_nr() + ": " + sessie.get_title() + " added!", "",
        {
          duration: 3000,
        });
      this.setDisable();
    }
    else {
      this.snackBar.open("Could not add " + sessie.get_nr() + ": " + sessie.get_title(), "",
        {
          duration: 3000,
        });
    }
  }

  sessieNr(): Number {
    return this._sessieDataService.sessies.length;
  }

  setDisable() {
    this.newSes.reset();
    this.addSes.emit();
  }
}
