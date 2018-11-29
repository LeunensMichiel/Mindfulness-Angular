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
    console.log(this.checked);
    this.group.actief = this.checked;
    if(this.checked == true){
      this.checkTekst = "Actief";
    }
    else{
      this.checkTekst = "Niet actief";
    }
    console.log(this.checkTekst);
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

  constructor(private _groupDataService:GroepenDataService, public snackBar: MatSnackBar, public dialog: MatDialog) {

   }

  ngOnInit() {
    console.log("INIT");
    console.log(this.group);
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
        console.log(result);
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
    console.log("logje2");
    console.log(this._possibleUsers);
    return this._possibleUsers;
  }

  removeGroup(){
    this.deleteGroup.emit(this.group);
  }

  editGroup(){
    this.modifyGroup.emit(this.group);
  }

  addUserToAGroup(){
    console.log("log1");

    
    this._groupDataService.getPossibleUsers(this.group).subscribe(
      result => {
        this._possibleUsers = result;
        console.log("MOGELIJK USERS:");
        console.log(result);
      },
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${
          error.status
          } while trying to retrieve groups: ${error.error}`;
      }
    );
    this._possibleUsers = new Array(); 

    const addUserToGroupDialogRef = this.dialog.open(AddUserToGroupDialog, {
      data: {
        group_name: this.group.name
      }
    });
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
    });
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
}
