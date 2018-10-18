import { Excercise } from "../../models/excercise.model";
import { Component, OnInit, Input } from "@angular/core";
import { OefeningDetailComponent } from "../oefening-detail/oefening-detail.component";
import { TextPage, AudioPage } from "src/app/models/page.model";

@Component({
  selector: "app-oefeninglijst",
  templateUrl: "./oefeninglijst.component.html",
  styleUrls: ["./oefeninglijst.component.css"]
})
export class OefeninglijstComponent implements OnInit {
  textPage:TextPage = new TextPage();
  textPage1:TextPage = new TextPage();
  textPage2:TextPage = new TextPage();
  textPage3:TextPage = new TextPage();
  audioPage:AudioPage = new AudioPage();
  excersice:Excercise = new Excercise();
  public oefeningen:Excercise[]
  

  constructor() {
    
  }

  ngOnInit() {
    this.excersice.pages = [
      this.textPage,
      this.textPage1,
      this.textPage2,
      this.textPage3,
      this.audioPage
    ]
    this.oefeningen = [
      this.excersice
    ]
  }
}
