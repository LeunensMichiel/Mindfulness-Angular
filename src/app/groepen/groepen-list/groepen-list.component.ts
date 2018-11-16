import { Component, OnInit, Inject } from '@angular/core';
import {Group} from 'src/app/models/group.model';
import {GroepenDataService} from '../groepen-data.service';
import {HttpErrorResponse} from '@angular/common/http';
import {MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SessieDataService } from '../../sessie/sessie-data.service';

export interface DialogGroupData {
  group_name: string;
}

@Component({
  selector: 'app-groepen-list',
  templateUrl: './groepen-list.component.html',
  styleUrls: ['./groepen-list.component.css']
})
export class GroepenListComponent implements OnInit {
  public errorMsg: string;
  private _groups: Group[];

//  constructor(private groepenDataService: GroepenDataService, private sessieDataService:SessieDataService, public dialog: MatDialog) { }
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
  }

  get groups(){
    return this._groups;
  }

  editSession(group: Group) {
    const modifyGroupDialoRef = this.dialog.open(GroupModifyComponent, {
      data: {
        group_name: group.name
      }
    });
    modifyGroupDialoRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        group.name = result;
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

  /*
  get sessienaam(id:string){
    this.sessieDataService.getSessie(id).subscribe(
        group.sessienaam = this.sessienaam;
    );
  } */
}


@Component({
  selector: 'dialog-modify-group',
  templateUrl: 'dialog-modify-group.html',
})
export class GroupModifyComponent {

  constructor(
    public dialogRef: MatDialogRef<GroupModifyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogGroupData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

