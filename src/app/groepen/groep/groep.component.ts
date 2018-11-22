import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GroepenDataService } from '../groepen-data.service';
import { Group } from '../../models/group.model';
import { Sessionmap } from '../../models/sessionmap.model';
import { EMPTY_ARRAY } from '@angular/core/src/render3/definition';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../models/user.model';

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

  constructor(private _groupDataService:GroepenDataService) {

   }

  ngOnInit() {
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
