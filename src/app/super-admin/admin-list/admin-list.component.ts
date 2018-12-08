import {Component, OnInit, ViewChild} from '@angular/core';
import {AdminDataService} from '../admin-data.service';
import {Admin} from '../../models/admin.model';
import {MatPaginator, MatTableDataSource} from '@angular/material';

export interface PeriodicElement {
  name: string;
  email: string;
  status: number;
}

@Component({
  selector: 'admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {

  private _activatedAdmins: Admin[] = [];
  private _deactivatedAdmins: Admin[] = [];
  displayedColumns: string[] = ['name', 'email', 'status'];


  constructor(private _adminDataService: AdminDataService) {
  }

  ngOnInit() {
 console.log("test");

    this._adminDataService.getActiveAdmin().subscribe(
      result => {
        console.log(result);
        this._activatedAdmins = result;
      },
      err => {
        console.log(err);
      }
    );

    this._adminDataService.getNonActifAdmin().subscribe(
      result => {
        this._deactivatedAdmins = result;
      },
      err => {

      }
    );

  }


  get activatedAdmins(): Admin[] {
    return this._activatedAdmins;
  }

  get deactivatedAdmins(): Admin[] {
    return this._deactivatedAdmins;
  }

}
