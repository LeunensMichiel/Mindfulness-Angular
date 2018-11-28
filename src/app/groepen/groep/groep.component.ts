import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GroepenDataService } from '../groepen-data.service';
import { Group } from '../../models/group.model';
import { Sessionmap } from '../../models/sessionmap.model';
import { EMPTY_ARRAY } from '@angular/core/src/render3/definition';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../models/user.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-groep',
  templateUrl: './groep.component.html',
  styleUrls: ['./groep.component.css']
})
export class GroepComponent implements OnInit {
  @Input() public group: Group;
  @Output() public deleteGroup = new EventEmitter<Group>();
  @Output() public modifyGroup = new EventEmitter<Group>();
  public errorMsg: string;
  private _users:User[]; 

  color = 'accent';
  checked = false;//this.getStatusActiefVanGroep();
  disabled = false;

  changed(){
    console.log(this.checked);
    this.group.actief = this.checked;
    this._groupDataService.editGroup(this.group).subscribe(
      () => {
      },
      (error: HttpErrorResponse) => {
        this.snackBar.open(`Error ${error.status} tijdens het wijzigen van de groep ${
            this.group.name
            }: ${error.error}`, '',
          {
            duration: 3000,
          });
      }
    );
  }

  getStatusActiefVanGroep():boolean{
    console.log("VOLGENDE:");
    console.log(this.group);
    console.log(this.group.actief);
    return this.group.actief;
  }

  constructor(private _groupDataService:GroepenDataService, public snackBar: MatSnackBar) {

   }

  ngOnInit() {
    console.log("INIT");
    console.log(this.group);
    this.checked = this.getStatusActiefVanGroep();

    this._groupDataService.getEmails(this.group).subscribe(
      result => {
        this._users = result;
      },
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${
          error.status
          } while trying to retrieve groups: ${error.error}`;
      }
    );
    this._users = new Array(); 
  }

  get users(){
    return this._users;
  }

  removeGroup(){
    this.deleteGroup.emit(this.group);
  }

  editGroup(){
    this.modifyGroup.emit(this.group);
  }

  usersLeeg():boolean{
    if(this.users.length == 0){
      return true;
    }
    return false;
  }
}
