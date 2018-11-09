import { Component, OnInit, Input } from '@angular/core';
import { ViewportRuler, ScrollDispatcher, ScrollDispatchModule } from '@angular/cdk/scrolling'
import { Page, TextPage, AudioPage, InputPage } from 'src/app/models/page.model';
import { Exercise } from 'src/app/models/exercise.model';
import { Cmd } from 'src/app/models/Commands/command.model';
import { Delete } from 'src/app/models/Commands/delete.model';
import { MatSnackBar } from '@angular/material';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';
import { Insert } from 'src/app/models/Commands/insert.model';
import { Update } from 'src/app/models/Commands/update.model';
import { Switch } from 'src/app/models/Commands/switch.model';
import { CmdImplementation } from 'src/app/models/Commands/commandImplementation.model';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { PageDataService } from '../../page-data.service';
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
export class PaginaCreatieLijstComponent extends CmdImplementation implements OnInit {
  /**
   * VARIABELEN:
   * -dragging: Een boolean die aangeeft of de elementen in de lijst standardView
   * of draggingView gebruiken.
   */
  private exercise: Exercise = new Exercise();
  constructor(private _route: ActivatedRoute, public snackBar: MatSnackBar, private pageDataService: PageDataService) {
    super();
  }

  ngOnInit() {
    this.exercise = new Exercise();
    this._route.data.subscribe(
      item => (this.exercise = item["exercise"]),
      (error: HttpErrorResponse) => {
        this.openSnackbar(`Error ${error.status} while getting exercise: ${error.error}`)
      }
    )
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

  /**
   * Deze methode word opgeroepen door de newPage emitter en voegt een nieuwe page
   * toe aan de excercise.
   * 
   * @param page De nieuwe page die word toegevoegd aan de excercise.
   */
  private addPage(value) {
    console.log(this.exercise);
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
   * Deze methode word opgeroepen door de deletedPage emitter en verwijderd een page
   * van de excercise op basis van de positie van die page.
   * 
   * @param position De positie van de te verwijderen page in de exercise.
   */
  private deletePage(position) {
    this.addCommand(new Delete([this.exercise], [this.exercise.items[position]]));
    console.log(position)
    console.log("PAGE AT POSITION " + position + " DELETED.");
    console.log(this.exercise.items);
    this.openSnackbar("Pagina verwijderd!");
  }


  /**
   * Deze methode word opgeroepen door de changedPage emitter en veranderd een page
   * van de excercise.
   * 
   * @param page De page met de veranderingen.
   */
  private saveChangedPage(page) {
    console.log("SAVED CHANGED PAGE AT ANCESTOR")
    var oldPage = this.filterPage(page);
    var newPage = this.exercise.items[oldPage.position];
    console.log(newPage);
    this.addCommand(new Update([this.exercise], [newPage, oldPage]));
    console.log("POSITION: " + page.position + " - TYPE: " + page.toString() + " - TITLE: " + page.title);
  }

  /**
   * Deze methode word opgeroepen door de changeParPos emitter en veranderd de page
   * op de startpositie naar de page op de eindpositie.
   * 
   * @param positions een JSON die de eind en start positie bevat
   */
  private changePagePos(positions) {
    console.log(positions);
    this.addCommand(new Switch([this.exercise], positions));
    console.log(this.exercise.items);
  }

  private filterPage(page): Page {
    switch (page.constructor.name) {
      case "TextPage":
        return new TextPage().fromJson(page);
      case "AudioPage":
        return new AudioPage().fromJson(page);
      case "InputPage":
        return new InputPage().fromJson(page);
    }
    return null;
  }

  onNewParCommand(cmd: Cmd) {
    this.addCommand(cmd);
  }

  saveItem() {
    console.log("saved");
  }

  addItem(cmd: Cmd): any {
    this.pageDataService.addPageToExercise(cmd.inputItems[0]._id, this.filterJson(cmd.param[0]))
      .subscribe(
        success => this.exercise.items[success.position]._id = success._id,
        error => console.log(error)
      );
  }
  removeItem(cmd: Cmd) {
    this.pageDataService.removePage(this.filterJson(cmd.param[0])._id)
      .subscribe(
        success => console.log(success),
        error => console.log(error)
      )
  }
  changePos() {
    throw new Error("Method not implemented.");
  }
  update() {
    throw new Error("Method not implemented.");
  }

  filterJson(json: any) {
    console.log(json.constructor.name);
    switch (json.constructor.name) {
      case "TextPage":
        return new TextPage().fromJson(json);
      case "AudioPage":
        return new AudioPage().fromJson(json);
      case "InputPage":
        return new InputPage().fromJson(json);
    }
  }
}
