import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { GroepenDataService } from '../groepen-data.service';
import { Group } from '../../models/group.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorStateMatcher } from '@angular/material/core';

export class GroupErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-groep-creatie',
  templateUrl: './groep-creatie.component.html',
  styleUrls: ['./groep-creatie.component.css']
})
export class GroepCreatieComponent implements OnInit {
  @Output() public disable = new EventEmitter();
  public newGroup:FormGroup;
  public matcher = new GroupErrorStateMatcher();

  constructor(
    private fb: FormBuilder,
    private _groupDataService: GroepenDataService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.newGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      sessiemapnaam: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  addGroup(){
    let group = new Group(this.newGroup.value.name, this.newGroup.value.sessiemapnaam);
    if(this.newGroup.valid){
      this._groupDataService.addNewGroup(group)
      .subscribe(
        () => {
          this.snackBar.open("De groep is succesvol toegevoegd!", "", 
          {
            duration: 3000,
          });
          this.setDisable();
        },
        (error: HttpErrorResponse) => {
          this.snackBar.open(`Error ${error.status} tijdens het toevoegen van een nieuwe groep: ${error.error}`, "", {
            duration: 3000,
          });
          this.setDisable();
        }
      ); 
    }
    else{
      this.snackBar.open("Vul alstublieft alle velden in!", "",
        {
          duration: 3000,
        });
    }
  }

  setDisable() {
    this.newGroup.reset();
    this.disable.emit();
  }

}
