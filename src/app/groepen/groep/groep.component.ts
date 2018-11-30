import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { GroepenDataService } from '../groepen-data.service';
import { Group } from '../../models/group.model';
import { Sessionmap } from '../../models/sessionmap.model';
import { EMPTY_ARRAY } from '@angular/core/src/render3/definition';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../models/user.model';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';

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
  private _possibleUsers:User[];
  displayedColumns: string[] = ['naam', 'vooruitgang'];

  kolomTest: string[] = ['naam'];

  color = 'accent';
  checked = false;//this.getStatusActiefVanGroep();
  disabled = false;
  checkTekst = "Niet actief";

  isActief():boolean{
    if(this.checked == true)
    {
      return true;
    }
    else{
      return false;
    }
  }

  changed(){
    this.group.actief = this.checked;
    if(this.checked == true){
      this.checkTekst = "Actief";
    }
    else{
      this.checkTekst = "Niet actief";
    }
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
    return this.group.actief;
  }

  constructor(private _groupDataService:GroepenDataService, public snackBar: MatSnackBar, public dialog: MatDialog) {

   }

  ngOnInit() {
    this.checked = this.getStatusActiefVanGroep();
    if(this.checked == true){
      this.checkTekst = "Actief";
    }
    else{
      this.checkTekst = "Niet actief";
    }

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

  get possibleUsers(){
    return this._possibleUsers;
  }

  removeGroup(){
    this.deleteGroup.emit(this.group);
  }

  editGroup(){
    this.modifyGroup.emit(this.group);
  }

  addUserToAGroup(){
    this._groupDataService.getPossibleUsers(this.group).subscribe(
      result => {
        this._possibleUsers = result;
        console.log("MOGELIJK USERS:");
        console.log(this.possibleUsers); // = console.log(result); = console.log(this._possibleUsers);
        const addUserToGroupDialogRef = this.dialog.open(AddUserToGroupDialog, {
          data: {
            group_name: this.group.name,
            possibleUsers: this.possibleUsers
          }
        });
      },
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${
          error.status
          } tijdens het ophalen van mogelijke users: ${error.error}`;
      }
    );
    this._possibleUsers = new Array(); 

    

    /*
    addUserToGroupDialogRef.afterClosed().subscribe(result => {
      if (result) {
        //group.name = result;
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
    }); */
  }

  usersLeeg():boolean{
    if(this.users.length == 0){
      return true;
    }
    return false;
  }
}

@Component({
  selector: 'dialog-adduserto-group',
  templateUrl: 'dialog-adduserto-group.html',
})
export class AddUserToGroupDialog {

  constructor(
    public dialogRef: MatDialogRef<AddUserToGroupDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogGroupData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface DialogGroupData {
  group_name: string;
  possibleUsers:User[];
}
