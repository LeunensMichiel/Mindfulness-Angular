import { Component, OnInit } from "@angular/core";
import { Sessie } from "../../models/sessie.model";
import { SessieDataService } from "../sessie-data.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-sessie-lijst",
  templateUrl: "./sessie-lijst.component.html",
  styleUrls: ["./sessie-lijst.component.css"]
})
export class SessieLijstComponent implements OnInit {
  private _sessies: Sessie[];
  public errorMsg: string;


  constructor(private _sessieDataService: SessieDataService) {}

  ngOnInit(): void {
    this._sessieDataService.sessies.subscribe(
      sessies => (this._sessies = sessies),
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${
          error.status
        } while trying to retrieve recipes: ${error.error}`;
      }
    );
  }

  removeSessie(sessie: Sessie) {
    this._sessieDataService.removeSessie(sessie).subscribe(
      item => (this._sessies = this._sessies.filter(val => item.get_id !== val.get_id)),
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${error.status} while removing recipes for ${
          sessie.get_nr()
        }: ${error.error}`;
      }
    );
  }

  get sessies() {
    return this._sessies;
  }
}
