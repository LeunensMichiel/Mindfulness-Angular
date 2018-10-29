import { Component, OnInit, Input } from '@angular/core';
import { ViewportRuler, ScrollDispatcher, ScrollDispatchModule } from '@angular/cdk/scrolling'
import { Page, TextPage, AudioPage, InputPage } from 'src/app/models/page.model';
import { Exercise } from 'src/app/models/exercise.model';
import { Cmd } from 'src/app/models/Commands/command.model';
import { Delete } from 'src/app/models/Commands/delete.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  group,
  query
  // ...
} from '@angular/animations';
import { Insert } from 'src/app/models/Commands/insert.model';
import { Update } from 'src/app/models/Commands/update.model';
import { Switch } from 'src/app/models/Commands/switch.model';
@Component({
  selector: 'app-pagina-creatie-lijst',
  templateUrl: './pagina-creatie-lijst.component.html',
  styleUrls: ['./pagina-creatie-lijst.component.css'],
  animations: [
    trigger('shrinkOut', [
      transition(':increment', [style({ transform: 'translateX(-100%)' }), animate('500ms ease-out', style({ transform: 'translateX(0%)' }))]),
      transition(':decrement', [style({ transform: 'translateX(100%)' }), animate('500ms ease-out', style({ transform: 'translateX(0%)' }))]),
      transition(':enter', [style({ width: 0, opacity: 0, overflow: 'hidden' }), animate('500ms ease-out', style({ width: '*', opacity: 1 }))]),
      transition(':leave', [style({ width: '*', opacity: 1, overflow: 'hidden' }), animate('500ms ease-out', style({ width: 0, opacity: 0 }))])
    ])
  ]
})
export class PaginaCreatieLijstComponent implements OnInit {
  /**
   * VARIABELEN:
   * -dragging: Een boolean die aangeeft of de elementen in de lijst standardView
   * of draggingView gebruiken.
   */
  cmdValue: number;
  exercise: Exercise = new Exercise();
  public dragging = false;
  private cmd: Cmd = null;
  private commandCache: Cmd[];
  constructor(public snackBar: MatSnackBar) {
    this.commandCache = [];
    this.cmdValue = -1;
  }

  ngOnInit() {
    this.exercise = new Exercise();
  }

  /**
   * Deze methode toont een snackbar als er een verandering gebeurt.
   * 
   * @param message Boodschap die word getoond.
   */
  openSnackbar(message) {
    this.snackBar.open(message, 'ok', {
      duration: 1500
    });
  }

  /**
   * Deze methode word opgeroepen door de newPage emitter en voegt een nieuwe page
   * toe aan de excercise.
   * 
   * @param page De nieuwe page die word toegevoegd aan de excercise.
   */
  /* addPage(page:Page){
    this.exercise.addPage(page.position, page);
    this.openSnackbar("Pagina toegevoegd!");
  } */

  /**
   * Deze methode word opgeroepen door de deletedPage emitter en verwijderd een page
   * van de excercise op basis van de positie van die page.
   * 
   * @param position De positie van de te verwijderen page in de exercise.
   */
  deletePage(position) {
    this.addCommand(new Delete([this.exercise], [this.exercise.items[position]]));
    console.log(position)
    console.log("PAGE AT POSITION " + position + " DELETED.");
    console.log(this.exercise.items);
    this.openSnackbar("Pagina verwijderd!");
  }

  public addPage(value) {
    var newPage = null;
    switch (value) {
      case "text":
        newPage = new TextPage();
        break;
      case "audio":
        newPage = new AudioPage();
        break;
      case "input":
        newPage = new InputPage();
        break;
    }
    newPage.position = this.exercise.items.length
    this.addCommand(new Insert([this.exercise], [newPage]));
  }


  /**
   * Deze methode word opgeroepen door de changedPage emitter en veranderd een page
   * van de excercise.
   * 
   * @param page De page met de veranderingen.
   */
  saveChangedPage(page) {
    console.log("SAVED CHANGED PAGE AT ANCESTOR")
    var oldPage = this.filterPage(page);
    var newPage = this.exercise.items[oldPage.position];
    this.addCommand(new Update([this.exercise], [newPage, oldPage]));
    console.log("POSITION: " + page.position + " - TYPE: " + page.toString() + " - TITLE: " + page.title);
  }

  /**
   * Deze methode word opgeroepen door de changeParPos emitter en veranderd de page
   * op de startpositie naar de page op de eindpositie.
   * 
   * @param positions een JSON die de eind en start positie bevat
   */
  changePagePos(positions) {
    console.log(positions);
    this.addCommand(new Switch([this.exercise], positions));
    console.log(this.exercise.items);
  }

  addCommand(cmd: Cmd) {
    if (this.cmdValue < this.commandCache.length - 1) {
      this.commandCache.length = this.cmdValue + 1
    }
    this.commandCache.push(cmd);
    this.executeCurrentCommand();
  }

  onKeydown(event) {
    console.log(event.key);
    if (event.metaKey) {
      if(event.key == 'z'){
        console.log("UNDO");
        this.undoCurrentCommand();
      }
      if(event.key == 'Z'){
        console.log("REDO");
        this.executeCurrentCommand();
      }
    }
  }

  executeCurrentCommand() {
    if (this.cmdValue < this.commandCache.length - 1) {
      this.cmdValue += 1;
      this.commandCache[this.cmdValue].execute();
    }
  }

  undoCurrentCommand() {
    if (this.cmdValue >= 0) {
      this.commandCache[this.cmdValue].undo();
      this.cmdValue -= 1;
    }
  }

  filterPage(page): Page {
    if (page.items != undefined) {
      return new TextPage().fromJson(page);
    } else if (page.fileUrl != undefined) {
      return new AudioPage().fromJson(page);
    } else {
      return new InputPage().fromJson(page);
    }
    return null;
  }
}
