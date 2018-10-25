import { Component, OnInit } from '@angular/core';
import {ViewportRuler,ScrollDispatcher, ScrollDispatchModule} from '@angular/cdk/scrolling'
import { Page, TextPage } from 'src/app/models/page.model';
import { Exercise } from 'src/app/models/exercise.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-pagina-creatie-lijst',
  templateUrl: './pagina-creatie-lijst.component.html',
  styleUrls: ['./pagina-creatie-lijst.component.css']
})
export class PaginaCreatieLijstComponent implements OnInit {
  /**
   * VARIABELEN:
   * -dragging: Een boolean die aangeeft of de elementen in de lijst standardView
   * of draggingView gebruiken.
   */
  exercise:Exercise = new Exercise();
  public dragging = false;
  constructor() { }

  ngOnInit() {
    this.exercise = new Exercise();
  }
  
  /**
   * Deze methode word opgeroepen door de newPage emitter en voegt een nieuwe page
   * toe aan de excercise.
   * 
   * @param page De nieuwe page die word toegevoegd aan de excercise.
   */
  addPage(page:Page){
    this.exercise.addPage(page.position, page);
  }

  /**
   * Deze methode word opgeroepen door de deletedPage emitter en verwijderd een page
   * van de excercise op basis van de positie van die page.
   * 
   * @param position De positie van de te verwijderen page in de exercise.
   */
  deletePage(position){
    console.log(position)
    this.exercise.deletePage(position);
    console.log("PAGE AT POSITION " + position + " DELETED.");
    console.log(this.exercise.pages);
  }

  /**
   * Deze methode word opgeroepen door de changedPage emitter en veranderd een page
   * van de excercise.
   * 
   * @param page De page met de veranderingen.
   */
  saveChangedPage(page){
    console.log("SAVED CHANGED PAGE AT ANCESTOR")
    this.exercise.pages[page.position]= page;
    console.log("POSITION: " + page.position + " - TYPE: " + page.toString() + " - TITLE: " + page.title );
    console.log(this.exercise.pages);
  }

  /**
   * Deze methode word opgeroepen door de changeParPos emitter en veranderd de page
   * op de startpositie naar de page op de eindpositie.
   * 
   * @param positions een JSON die de eind en start positie bevat
   */
  changePagePos(positions){
    console.log(positions);
    this.exercise.changePagePosition(positions.startPos, positions.endPos);
    console.log(this.exercise.pages); 
  }
}
