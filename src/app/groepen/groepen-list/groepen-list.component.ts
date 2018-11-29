import { Component, OnInit, Inject } from '@angular/core';
import {Group} from 'src/app/models/group.model';
import {GroepenDataService} from '../groepen-data.service';
import {HttpErrorResponse} from '@angular/common/http';
import {MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SessieDataService } from '../../sessie/sessie-data.service';
import { Sessionmap } from '../../models/sessionmap.model';
import { User } from '../../models/user.model';

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

  private _sessionmaps:Sessionmap[];

  constructor(private groepenDataService: GroepenDataService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.groepenDataService.groups.subscribe(
      groups => {
        console.log(groups);
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
        group_name: group.name
      }
    });
    modifyGroupDialoRef.afterClosed().subscribe(result => {
      if (result) {
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



