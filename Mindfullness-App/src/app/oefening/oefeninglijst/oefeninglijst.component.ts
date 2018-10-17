import { Exercise } from "./../../models/exercise.model";
import { Component, OnInit, Input } from "@angular/core";
import { OefeningDetailComponent } from "../oefening-detail/oefening-detail.component";

@Component({
  selector: "app-oefeninglijst",
  templateUrl: "./oefeninglijst.component.html",
  styleUrls: ["./oefeninglijst.component.css"]
})
export class OefeninglijstComponent implements OnInit {
  public _oefeningen: Exercise[];

  constructor() {

  }
  
  get oefeningen() {
    return this._oefeningen;
  }
  ngOnInit() {}
}
