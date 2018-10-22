import { Component, OnInit } from '@angular/core';
import {ViewportRuler,ScrollDispatcher, ScrollDispatchModule} from '@angular/cdk/scrolling'
import { Page, TextPage } from 'src/app/models/page.model';
import { Excercise } from 'src/app/models/excercise.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-pagina-creatie-lijst',
  templateUrl: './pagina-creatie-lijst.component.html',
  styleUrls: ['./pagina-creatie-lijst.component.css']
})
export class PaginaCreatieLijstComponent implements OnInit {
  excercise:Excercise = new Excercise();
  public dragging = false;
  constructor() { }

  ngOnInit() {
    this.excercise = new Excercise();
  }

  dragStarted(event){
    this.dragging = true;
  }

  dragEnded(event){
    this.dragging = false;
  }

  addPage(page:Page){
    this.excercise.addPage(page.position, page);
  }

  deletePage(position){
    console.log(position)
    this.excercise.deletePage(position);
    console.log("PAGE AT POSITION " + position + " DELETED.");
    console.log(this.excercise.pages);
  }

  saveChangedPage(page){
    console.log("SAVED CHANGED PAGE AT ANCESTOR")
    this.excercise.pages[page.position]= page;
    console.log("POSITION: " + page.position + " - TYPE: " + page.toString() + " - TITLE: " + page.title );
    console.log(this.excercise.pages);
  }

  changePagePos(positions){
    console.log(positions);
    this.excercise.changePagePosition(positions.startPos, positions.endPos);
    console.log(this.excercise.pages); 
  }
}
