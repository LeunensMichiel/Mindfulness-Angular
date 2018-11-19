import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { GroepenDataService } from '../groepen-data.service';
import { Group } from '../../models/group.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorStateMatcher } from '@angular/material/core';
import { SessionmapDataService } from '../../sessionmaps/sessionmap-data.service';
import { Sessionmap } from '../../models/sessionmap.model';
import { Observable } from 'rxjs';

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
  @Output() public addedGroup = new EventEmitter();
  public newGroup:FormGroup;
  public matcher = new GroupErrorStateMatcher();
  private _sessionmaps:Sessionmap[];
  public errorMsg: string;

  constructor(
    private fb: FormBuilder,
    private _groupDataService: GroepenDataService,
    private _sessionmapDataService:SessionmapDataService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  
    this._groupDataService.sesmaps.subscribe(
      sesmaps => {
        this._sessionmaps = sesmaps.sort((a, b) => a.titleCourse.localeCompare(b.titleCourse));
      },
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${
          error.status
          } while trying to retrieve sessionmaps: ${error.error}`;
      }
    );
    this._sessionmaps = new Array();

    this.newGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      dropdown: ['', [Validators.required]]
    });
  }

  get sesmaps() {
    return this._sessionmaps;
  }

  addGroup(){    
    if(this.newGroup.valid){
      let group = new Group(this.newGroup.value.name, this.newGroup.value.dropdown);

      this._groupDataService.addNewGroup(group)
      .subscribe(
        result => {
          console.log(group);
          this.addedGroup.emit(group);
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
