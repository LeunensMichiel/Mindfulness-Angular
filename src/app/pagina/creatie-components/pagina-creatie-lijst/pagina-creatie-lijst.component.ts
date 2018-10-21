import { Component, OnInit } from '@angular/core';
import {ViewportRuler,ScrollDispatcher, ScrollDispatchModule} from '@angular/cdk/scrolling'
import { Page, TextPage } from 'src/app/models/page.model';
import { Excercise } from 'src/app/models/excercise.model';

@Component({
  selector: 'app-pagina-creatie-lijst',
  templateUrl: './pagina-creatie-lijst.component.html',
  styleUrls: ['./pagina-creatie-lijst.component.css']
})
export class PaginaCreatieLijstComponent implements OnInit {
  excercise:Excercise = new Excercise();
  constructor() { }

  ngOnInit() {
    this.excercise = new Excercise();
  }

  addPage(page:Page){
    this.excercise.addPage(page.position, page);
  }

  saveChangedPage(page){
    console.log("SAVED CHANGED PAGE AT ANCESTOR")
    this.excercise.pages[page.position]= page;
    console.log("POSITION: " + page.position + " - TYPE: " + page.toString() + " - TITLE: " + page.title );
    console.log(this.excercise.pages);
  }
}
