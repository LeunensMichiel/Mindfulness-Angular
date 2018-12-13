import {Component, OnInit, ViewChild} from '@angular/core';
import {AdminDataService} from '../admin-data.service';
import {Admin} from '../../models/admin.model';
import {MatPaginator, MatSnackBar, MatTableDataSource} from '@angular/material';



@Component({
  selector: 'admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {

  private _activatedAdmins: Admin[] = [];
  private _deactivatedAdmins: Admin[] = [];
  displayedColumnsActivateTable: string[] = ['name', 'email', 'status'];
  displayedColumnsDeactivateTable: string[] = ['name', 'email', 'status', "delete"];


  constructor(private _adminDataService: AdminDataService, public snackBar: MatSnackBar) {
  }

  ngOnInit(): void {

    this._adminDataService.getActiveAdmin().subscribe(
      result => {
        console.log(result);
        this._activatedAdmins = result;
      },
      err => {
        this.openSnackbar(`Fout bij ophalen geactiveerde beheerders!`);
      }
    );

    this._adminDataService.getNonActifAdmin().subscribe(
      result => {
        this._deactivatedAdmins = result;
      },
      err => {
        this.openSnackbar(`Fout bij ophalen gedeactiveerde beheerders!`);

      }
    );

  }


  get activatedAdmins(): Admin[] {
    return this._activatedAdmins;
  }

  get deactivatedAdmins(): Admin[] {
    return this._deactivatedAdmins;
  }


  set activatedAdmins(value: Admin[]) {
    this._activatedAdmins = value;
  }

  set deactivatedAdmins(value: Admin[]) {
    this._deactivatedAdmins = value;
  }

  changeStatus(admin: Admin) {
    this._adminDataService.updateAdmin(admin).subscribe(
      result => {
        this.moveItem(result);

      },
      err => {
        console.log(err);
      }
    );
  }

  private moveItem(admin: Admin) {
    if (admin.adminActive) {
      this.deactivatedAdmins = this.deactivatedAdmins.filter(val => admin.id !== val.id);
      this.activatedAdmins.push(admin);
      this.activatedAdmins = this.activatedAdmins.slice(0);

    } else {
      this.activatedAdmins = this.activatedAdmins.filter(val => admin.id !== val.id);
      this.deactivatedAdmins.push(admin);
      this.deactivatedAdmins = this.deactivatedAdmins.slice(0);
    }
  }

  deleteAdmin(admin: Admin) {
    this._adminDataService.deleteAdmin(admin).subscribe(
      result => {
        this.deactivatedAdmins = this.deactivatedAdmins.filter(val => result.id !== val.id);
        this.openSnackbar(`Beheerder succesvol verwijderd!`);
      },
      err => {
        this.openSnackbar(`Beheerder unsuccesvol verwijderd!`);

      }
    );
  }


  makeTableScrollable(list: Admin[]): string {
    if (list.length > 5) {
      return "example-container"
    }
  }

  /**
   * Deze methode toont een snackbar als er een verandering gebeurt.
   *
   * @param message Boodschap die word getoond.
   */
  private openSnackbar(message) {
    this.snackBar.open(message, 'ok', {
      duration: 1500
    });
  }

}
