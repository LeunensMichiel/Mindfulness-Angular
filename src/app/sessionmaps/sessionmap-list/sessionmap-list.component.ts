import { Component, OnInit } from '@angular/core';
import { Sessionmap } from 'src/app/models/sessionmap.model';
import { SessionmapDataService } from '../sessionmap-data.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sessionmap-list',
  templateUrl: './sessionmap-list.component.html',
  styleUrls: ['./sessionmap-list.component.css']
})
export class SessionmapListComponent implements OnInit {
  public errorMsg: string;
  private _sesmaps: Sessionmap[];

  constructor(private sessionmapDataService: SessionmapDataService) { }

  ngOnInit(): void {
    this.sessionmapDataService.sesmaps.subscribe(
      sesmaps => (this._sesmaps = sesmaps),
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${
          error.status
        } while trying to retrieve recipes: ${error.error}`;
      }
    );
  }

  get sesmaps() {
    return this._sesmaps;
  }

}
