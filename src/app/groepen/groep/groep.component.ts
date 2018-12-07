import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { GroepenDataService } from '../groepen-data.service';
import { Group } from '../../models/group.model';
import { Sessionmap } from '../../models/sessionmap.model';
import { EMPTY_ARRAY } from '@angular/core/src/render3/definition';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../models/user.model';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { Notification } from '../../models/notification.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  displayedColumns: string[] = ['naam', 'vooruitgang','button'];
  private leegOfNiet = false;
  private alGeladenOfNiet = false;
  private moetReloaden = false;
  private isExpanded:boolean;
  private notification:Notification;

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

  deleteThisUserFromGroup(id:string){
    let idArray = [];
    idArray.push(id);
    
    this._groupDataService.deleteUserFromGroup(idArray).subscribe(
      result => {
        this.isExpanded = false;
        this.moetReloaden = true;
      },
      (error: HttpErrorResponse) => {
        this.snackBar.open(`Error ${error.status} tijdens het verwijderen van de gebruiker uit de groep: ${error.error}`, '',
          {
            duration: 3000,
          });
      }
    ); 
    this.snackBar.open('De gebruiker is succesvol verwijderd uit ' + this.group.name +'!', '',
    {
      duration: 3000,
    });
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
            this.snackBar.open('De gebruiker is succesvol toegevoegd aan ' + this.group.name +' en verwijderd uit zijn vorige groep!', '',
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

  sendNotificationToGroup(){
    const sendNotifToGroupDialoRef = this.dialog.open(SendNotifDialog, {
      data: {
        group_name: this.group.name
      }
    });

    sendNotifToGroupDialoRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        console.log("notificatie verstuurd");
        this.notification = result;
        console.log(this.notification);

        //group.name = result;
        /*
        this._groupDataService.editGroup(this.group).subscribe(
          () => {
          },
          (error: HttpErrorResponse) => {
            this.snackBar.open(`Error ${error.status} tijdens het verzenden van een notifciatie naar de groep ${
                this.group.name
                }: ${error.error}`, '',
              {
                duration: 3000,
              });
          }
        ); */
      }
    });
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

@Component({
  selector: 'dialog-sendnotif-group',
  templateUrl: 'dialog-sendnotif-group.html',
})
export class SendNotifDialog implements OnInit{
  ngOnInit(): void {
    this.form = this.fb.group({
      notification_title: ['', Validators.required],
      notification_beschrijving: ['', Validators.required],
      notification_launchtijdstip: ['',Validators.required]
  });
  }
  private notification:Notification;
  private notification_title:string;
  private notification_beschrijving:string;
  private notification_launchtijdstip:Date;
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SendNotifDialog>,
    //@Inject(MAT_DIALOG_DATA) public data: DialogNotifData,
    @Inject(MAT_DIALOG_DATA) {notification_title,notification_beschrijving,
      notification_launchtijdstip}:Notification,
    public snackBar: MatSnackBar,
    private fb: FormBuilder) {

      this.form = fb.group({
        notification_title: [notification_title, Validators.required],
        notification_beschrijving: [notification_beschrijving, Validators.required],
        notification_launchtijdstip: [notification_launchtijdstip,Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  /*
  onYesClick(notification_title:string,notification_beschrijving:string,notification_launchtijdstip:Date):void{
    console.log(notification_title + " " +notification_beschrijving + " " + notification_launchtijdstip);
    if(notification_title == undefined || notification_beschrijving == undefined || notification_launchtijdstip == undefined)
    {
      //this.dialogRef.disableClose = true;
      this.snackBar.open('Alle velden moeten ingevuld zijn!', '',
            {
              duration: 3000,
            });
    }
    else{
    this.notification = new Notification(notification_title);
    this.notification.notification_beschrijving = notification_beschrijving;
    this.notification.notification_launchtijdstip = notification_launchtijdstip;
    this.dialogRef.close(this.notification);
    }
  } */

    onJaClick(){
      if(this.form.valid){
        this.dialogRef.close(this.form.value);
      }
      else{
        this.snackBar.open("Vul alstublieft alle velden in!", "",
        {
          duration: 3000,
        });
      }
    }
  

}

export interface DialogNotifData {
  group_name: string;
  notification_title:string;
  notification_beschrijving:string;
  notification_launchtijdstip:Date;
}
