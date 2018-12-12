import { Component, OnInit, Inject } from '@angular/core';
import {Group} from 'src/app/models/group.model';
import {GroepenDataService} from '../groepen-data.service';
import {HttpErrorResponse} from '@angular/common/http';
import {MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA, ErrorStateMatcher} from '@angular/material';
import { SessieDataService } from '../../sessie/sessie-data.service';
import { Sessionmap } from '../../models/sessionmap.model';
import { User } from '../../models/user.model';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SessionmapDataService } from '../../sessionmaps/sessionmap-data.service';

export interface DialogGroupData {
  group_name: string;
  sesmaps:Sessionmap[];
}

@Component({
  selector: 'app-groepen-list',
  templateUrl: './groepen-list.component.html',
  styleUrls: ['./groepen-list.component.css']
})
export class GroepenListComponent implements OnInit {
  public errorMsg: string;
  private _groups: Group[];

  private _sessionmaps:Sessionmap[];

  constructor(private groepenDataService: GroepenDataService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.groepenDataService.groups.subscribe(
      groups => {
        this._groups = groups;
      },
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${
          error.status
          } while trying to retrieve groups: ${error.error}`;
      }
    );
    this._groups = new Array();

    this.groepenDataService.sesmaps.subscribe(
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
  }

  get groups(){
    return this._groups;
  }

  get sesmaps() {
    return this._sessionmaps;
  }

  addGroup(group: Group) {
    this.groups.push(group);
  }

  verwijderGroup(group:Group){
    let index = -1;
    let grups = this.groups;
    this.groups.forEach(function(item){
      if(group._id == item._id){
        index = grups.indexOf(item);
      }
    })
    if(index > -1){
      this.groups.splice(index,1);
    }
  }

  editGroup(group: Group) {
    const modifyGroupDialoRef = this.dialog.open(GroupModifyComponent, {
      data: {
        group_name: group.name,
        sesmaps:this.sesmaps
      }
    });
    modifyGroupDialoRef.afterClosed().subscribe(result => {
      if (result) {
        //group.name = result;
        let naamEnMap:string[] = [];
        naamEnMap = result;
        if(naamEnMap.length == 1){
          group.name = result[0];
        }
        else if(naamEnMap.length == 2){
          group.name = result[0];
          let deNieuweCursus = this.sesmaps.find(e => e.id == result[1]);
          group.sessionmap = deNieuweCursus;
          group.sessionmap_id = result[1];
        }
        
        this.groepenDataService.editGroup(group).subscribe(
          () => {
          },
          (error: HttpErrorResponse) => {
            this.snackBar.open(`Error ${error.status} tijdens het wijzigen van de groep ${
                group.name
                }: ${error.error}`, '',
              {
                duration: 3000,
              });
          }
        ); 
      }
    });
  }

  removeGroup(group: Group) {
    const dialogRef = this.dialog.open(RemoveGroupDialog, {});
    // RemoveSessieDialog geeft een boolean mee om aan te tonen of ja of nee gedrukt werd
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.groepenDataService.removeGroup(group).subscribe(
            item => {
              this.verwijderGroup(item);
            },
            (error: HttpErrorResponse) => {
              this.snackBar.open(`Error ${error.status} tijdens het verwijderen van de groep ${
                  group.name
                  }: ${error.error}`, '',
                {
                  duration: 3000,
                });
            }
          );
          this.snackBar.open('Groep ' + group.name + ' is succesvol verwijderd!', '',
            {
              duration: 3000,
            });
        }
      });
  }

  voegGroepToeV2(){
    const voegGroupToeDialoRef = this.dialog.open(AddGroupDialog, {});
  
    voegGroupToeDialoRef.afterClosed().subscribe(result => {
      if(result){
        this.groups.push(result);
      }
    })
  }

}


@Component({
  selector: 'dialog-modify-group',
  templateUrl: 'dialog-modify-group.html',
})
export class GroupModifyComponent {
  private gekozenCursus:Sessionmap;

  constructor(
    public dialogRef: MatDialogRef<GroupModifyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogGroupData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  wijzigenV2(groepsnaam:string,cursus:Sessionmap){
    let naamEnMap:string[] = [];
    naamEnMap.push(groepsnaam);
    if(cursus != null && cursus != undefined){
      naamEnMap.push(cursus.id);
    }

    this.dialogRef.close(naamEnMap);
  }
}

@Component({
  selector: 'dialog-remove-group',
  templateUrl: 'dialog-remove-group.html',
})
export class RemoveGroupDialog {

  constructor(public dialogRef: MatDialogRef<RemoveGroupDialog>) {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}

@Component({
  selector: 'dialog-add-group',
  templateUrl: 'dialog-add-group.html',
  styleUrls: ['dialog-add-group.css']
})
export class AddGroupDialog implements OnInit{

  ngOnInit(): void {
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
  public newGroup:FormGroup;
  public matcher = new GroupErrorStateMatcher();
  private _sessionmaps:Sessionmap[];
  public errorMsg: string;
  private deNieuweGroep:Group;

  constructor(public dialogRef: MatDialogRef<AddGroupDialog>
  ,private fb: FormBuilder,
  private _groupDataService: GroepenDataService,
  private _sessionmapDataService:SessionmapDataService,
  public snackBar: MatSnackBar) {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
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
          group.id = result.id;
          console.log(group.sessionmap);
          this.deNieuweGroep = result;
          this.dialogRef.close(this.deNieuweGroep);
          //this.addedGroup.emit(group);
          this.snackBar.open("De groep is succesvol toegevoegd!", "", 
          {
            duration: 3000,
          });
        },
        (error: HttpErrorResponse) => {
          this.snackBar.open(`Error ${error.status} tijdens het toevoegen van een nieuwe groep: ${error.error}`, "", {
            duration: 3000,
          });
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
  
}

export class GroupErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}



