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
/**
 * Deze component is verantwoordelijk om een groep te tonen
 * Hierin zit ook de functionaliteit om gebruikers toe te voegen aan een groep, gebruikers te verwijderen en notificaties te verzenden naar een groep
 */
export class GroepComponent implements OnInit {
  @Input() public group: Group;
  //de functionaliteit om een groep te verwijderen en te wijzigen zit in GroepenListComponent
  @Output() public deleteGroup = new EventEmitter<Group>();
  @Output() public modifyGroup = new EventEmitter<Group>();

  public errorMsg: string;
  // de gebruikers van een groep
  private _users:User[] = null; 
  // mogelijke gebruikers, dus gebruikers die aan een groep kunnen toegevoegd worden
  private _possibleUsers:User[];
  // nodig voor de selection list die je ziet als je een of meerdere gebruikers wilt toevoegen aan een groep
  private selectedOptions:string[] = null;
  // nodig voor de tabel die je ziet als je de expansion panel 'groepsleden' opent
  displayedColumns: string[] = ['naam', 'vooruitgang','button'];
  // zitten er gebruikers in de groep of niet => is de groep leeg of niet
  private leegOfNiet = false;
  // is de expansion panel van 'groepsleden' al eens geladen of niet
  private alGeladenOfNiet = false;
  // moeten we de expansion panel van 'groepsleden' herladen of niet
  private moetReloaden = false;
  // is de expansion panel van 'groepsleden' opengeklapt
  private isExpanded:boolean;
  private notification:Notification;

  kolomTest: string[] = ['naam'];

  color = 'accent';
  checked = false;//this.getStatusActiefVanGroep();
  disabled = false;
  checkTekst = "Niet actief";

  /**
   * Functie om te weten of de groep actief is of niet
   */
  isActief():boolean{
    if(this.checked == true)
    {
      return true;
    }
    else{
      return false;
    }
  }

  /**
   * Functie om de variabele actief op actief of niet actief te zetten
   * Om van actief naar niet actief te veranderen, of van niet actief naar actief
   */
  changed(){
    this.group.actief = this.checked;
    if(this.checked == true){
      this.checkTekst = "Actief";
    }
    else{
      this.checkTekst = "Niet actief";
    }
    if(this.group.sessionmap_id == undefined){
      this.group.sessionmap_id = null;
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

  /**
   * Functie die de huidige status van de variabele actief returnt
   */
  getStatusActiefVanGroep():boolean{
    return this.group.actief;
  }

  constructor(private _groupDataService:GroepenDataService, public snackBar: MatSnackBar, public dialog: MatDialog) {

   }

   /**
    * In de onInit wordt de tekst van actief of niet actief geset, naargelang de status van de variabele actief van de groep
    */
  ngOnInit() {
    this.checked = this.getStatusActiefVanGroep();
    if(this.checked == true){
      this.checkTekst = "Actief";
    }
    else{
      this.checkTekst = "Niet actief";
    }

  }

  /**
   * getter voor de gebruikers die in de groep zitten
   */
  get users(){
    return this._users;
  }

  /**
   * getter voor de gebruikers die kunnen toegevoegd worden aan de groep
   */
  get possibleUsers(){
    return this._possibleUsers;
  }

  removeGroup(){
    this.deleteGroup.emit(this.group);
  }

  editGroup(){
    this.modifyGroup.emit(this.group);
  }

  /**
   * Functie die een gebruiker verwijdert van een groep
   * @param id de string van de gebruiker die verwijderd moet worden wordt meegegeven
   */
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

  /**
   * Funcie om een of meerdere gebruikers toe te voegen aan de groep
   * We geven de groepsnaam en de mogelijke gebruikers mee als data aan de dialog
   */
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

  /**
   * Functie die checkt of er gebruikers in een groep zitten, dit is nodig om in de html te tonen of er gebruikers zijn of niet
   */
  usersLeeg():boolean{
    if(this.users != null && this.users.length == 0){
      return true;
    }
    return false;
  }

  /**
   * Deze functie wordt aangeroepen als de expansion panel opengedaan/uitgeklapt wordt
   * we halen de gebruikers van de groep hierop als we dit nog niet gedaan hadden
   */
  onExpand(){
    this.isExpanded = true;
    if(this.users == null || this.moetReloaden == true){
    this._groupDataService.getUsers(this.group).subscribe(
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

  /**
   * Deze functie verzendt een notificatie naar alle leden van de groep
   * De datum waarop de notificatie moet verzonden worden wordt meegegeven, de gebruiker kiest dit
   * Het tijdstip staat standaar op 12 uur 's middags
   */
  sendNotificationToGroup(){
    const sendNotifToGroupDialoRef = this.dialog.open(SendNotifDialog, {
      data: {
        group_name: this.group.name
      }
    });

    sendNotifToGroupDialoRef.afterClosed().subscribe(result => {
      if (result) {
        this.notification = result;
        this.notification.notification_launchtijdstip.setHours(13);

        this._groupDataService.sendNotificationToGroup(this.group,this.notification).subscribe(
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
        ); 
        this.snackBar.open('De notificatie is succesvol verzonden naar de groepsleden van '+ this.group.name + '!', '',
        {
          duration: 3000,
        });
      }
    });
  } 

  openDialog(): void {
    const dialogRef = this.dialog.open(QrGroupDialog, {
      width: '250px',
      data: {group_id: this.group._id}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}

/**
 * Deze component is verantwoordelijk voor de dialog van een of meerdere gebruikers toe te voegen aan een groep
 */
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

  /**
   * Deze functie wordt aangeroepen als er een verandering is in de selection list
   * @param list de selection list wordt meegegeven
   */
  public onAreaListControlChanged(list){
    this.selectedOptions = list.selectedOptions.selected.map(item => item.value);
}
}

/**
 * Dit is de interface die we gebruiken voor de data in de dialog
 */
export interface DialogGroupData {
  group_name: string;
  possibleUsers:User[];
  selectedOptions:string[];
}

/**
 * Deze component is verantwoordelijk voor de dialog die een notificatie verzendt naar een groep
 * we gebruiken een form voor validatie van de invoer
 */
@Component({
  selector: 'dialog-sendnotif-group',
  templateUrl: 'dialog-sendnotif-group.html',
  styleUrls: ['dialog-sendnotif-group.css']
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
  minDate = new Date();

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
/**
 * Dit is de interface die we gebruiken voor de data in de dialog
 */
export interface DialogNotifData {
  group_name: string;
  group_id: string;
  notification_title:string;
  notification_beschrijving:string;
  notification_launchtijdstip:Date;
}


@Component({
  selector: 'qr-group-dialog',
  templateUrl: 'qr-group-dialog.html',
})
export class QrGroupDialog implements OnInit {
  groupId = this.data.group_id;
  dialog: any;
  snackBar: any;

  constructor(
    public dialogRef: MatDialogRef<QrGroupDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogNotifData,) {
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDownloadClick(): void {
    this.downloadUrl(document.getElementsByClassName('qrcode').item(0).getElementsByTagName('img').item(0).src, this.groupId.replace(' ', '_'));
  }

  downloadUrl(url: string, fileName: string) {
    let a: any = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.style = 'display: none';
    a.click();
    a.remove();
  };

}
