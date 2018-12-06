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
  private _users:User[] = null; 
  private _possibleUsers:User[];
  private selectedOptions:string[] = null;
  displayedColumns: string[] = ['naam', 'vooruitgang'];
  private leegOfNiet = false;
  private alGeladenOfNiet = false;
  private moetReloaden = false;
  private isExpanded:boolean;

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
    this.isExpanded = false;
    this._groupDataService.getPossibleUsers(this.group).subscribe(
      result => {
        this._possibleUsers = result;
        const addUserToGroupDialogRef = this.dialog.open(AddUserToGroupDialog, {
          data: {
            group_name: this.group.name,
            possibleUsers: this.possibleUsers
          }
        });
        
        addUserToGroupDialogRef.afterClosed().subscribe(result => {
          if (result) {
            if(result != null && result.length > 0){
              this.moetReloaden = true;
              this.selectedOptions = result;
              
            //let body = {group:this.group.id,users:this.selectedOptions}
            this._groupDataService.addUserToGroup(this.group.id,this.selectedOptions).subscribe(
              result => {
              },
              (error: HttpErrorResponse) => {
                this.snackBar.open(`Error ${error.status} tijdens het wijzigen van de gebruiker(s): ${error.error}`, '',
                  {
                    duration: 3000,
                  });
              }
            );
            this.snackBar.open('De gebruiker is succesvol toegevoegd aan ' + this.group.name +'!', '',
            {
              duration: 3000,
            });
            }
            else{
              this.snackBar.open("Geen gebruiker(s) gekozen!", "", 
              {
                duration: 3000,
              });
            }
          }
          if(result == null){
            this.snackBar.open("Geen gebruiker(s) gekozen!", "", 
            {
              duration: 3000,
            });
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
  }

  usersLeeg():boolean{
    if(this.users != null && this.users.length == 0){
      return true;
    }
    return false;
  }

  onExpand(){
    this.isExpanded = true;
    if(this.users == null || this.moetReloaden == true){
    this._groupDataService.getEmails(this.group).subscribe(
      result => {
        this._users = result;
        this.alGeladenOfNiet = true;
        if(this._users.length == 0){
          this.leegOfNiet = true;
        }
        
        if(this._users.length > 0){
          this.leegOfNiet = false;
        }
        this.moetReloaden = false;
      },
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${
          error.status
          } while trying to retrieve groups: ${error.error}`;
      }
    );
    this._users = new Array(); 
    }
  }
}

@Component({
  selector: 'dialog-adduserto-group',
  templateUrl: 'dialog-adduserto-group.html',
})
export class AddUserToGroupDialog {

  private selectedOptions:string[] = null;
  constructor(
    public dialogRef: MatDialogRef<AddUserToGroupDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogGroupData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public onAreaListControlChanged(list){
    this.selectedOptions = list.selectedOptions.selected.map(item => item.value);
}
}

export interface DialogGroupData {
  group_name: string;
  possibleUsers:User[];
  selectedOptions:string[];
}
