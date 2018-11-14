import { Component, OnInit, Output, Input, ViewEncapsulation, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormGroupDirective,
  NgForm
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessieDataService } from "../sessie-data.service";
import { Session } from "../../models/session.model";
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
  @Output() public addSession = new EventEmitter();
  @Input() public numberOfSessions: number;
  public newSession: FormGroup;
  public matcher = new SessieErrorStateMatcher();

  constructor(private _fb: FormBuilder, private _sessionDataService: SessieDataService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.newSession = this._fb.group({
      title: ['', Validators.required]
    }
    );
  }

  onSubmit() {
    if (this.newSession.valid) {
      let session = new Session(this.newSession.value.title, this.numberOfSessions);
      this.addSession.emit(session);
    }
    else {
      this.snackBar.open("Vul alle velden correct in, aub", "",
        {
          duration: 3000,
        });
    }
  }

  setDisable() {
    this.newSession.reset();
    this.disable.emit();
  }
}
