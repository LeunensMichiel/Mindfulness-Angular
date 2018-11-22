import { Component, OnInit, Input } from '@angular/core';
import {Page, TextPage, AudioPage, TypePage} from 'src/app/models/page.model';
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
import {GenericItem} from '../../../models/GenericCollection.model';
import {SwitchObjectWithoutSave} from '../../../models/Commands/switchObjectWithoutSave';
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

  getPages(): GenericItem[]{
    return this.exercise.list.items;
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
    console.log(value);
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
        newPage = new Page();
        break;
    }
    newPage.position = this.exercise.list.items.length;
    console.log(newPage);
    this.addCommand(new Insert(this.exercise, [newPage]));
  }

  /**
   * Deze methode word opgeroepen door de deletedPage emitter en verwijderd een page
   * van de excercise op basis van de positie van die page.
   * 
   * @param position De positie van de te verwijderen page in de exercise.
   */
  private deletePage(position) {

    this.addCommand(new Delete(this.exercise, [this.exercise.list.items[position]]));
    console.log(position);
    console.log("PAGE AT POSITION " + position + " DELETED.");
    console.log(this.exercise.list.items);
    this.openSnackbar("Pagina verwijderd!");
  }


  /**
   * Deze methode word opgeroepen door de changedPage emitter en veranderd een page
   * van de excercise.
   * 
   * @param page De page met de veranderingen.
   */
  private saveChangedPage(page) {
    console.log("SAVED CHANGED PAGE AT ANCESTOR");
    let newPage = this.convertPage(page);
    console.log(newPage);
    let oldPage = this.exercise.list.items[newPage.position];
    console.log(oldPage);
    this.addCommand(new Update(this.exercise, [oldPage, newPage]));
    console.log("POSITION: " + page.position + " - TYPE: " + page.toString() + " - TITLE: " + page.title);
  }

  private fileAddedToPage(page) {
    console.log("SAVED CHANGED PAGE AT ANCESTOR");
    let newPage = this.convertPage(page);
    console.log(newPage);
    let oldPage = this.exercise.list.items[newPage.position];
    console.log(oldPage);
    this.addCommand(new SwitchObjectWithoutSave(this.exercise, [oldPage, newPage]));
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
    this.addCommand(new Switch(this.exercise, positions));
    console.log(this.exercise.list.items);
  }

  onNewParCommand(cmd: Cmd) {
    this.addCommand(cmd);
  }

  saveItem() {
    console.log("saved");
  }

  addItem(cmd: Cmd): any {
    this.pageDataService.addPageToExercise(cmd.inputItem.id, this.convertPage(cmd.param[0]))
      .subscribe(
        success => {
          console.log(success);
          this.exercise.list.items[success.position].id = success.id
        },
        error => console.log(error)
      );
  }
  removeItem(cmd: Cmd) {
    this.pageDataService.removePage(this.convertPage(cmd.param[0]).id)
      .subscribe(
        success => console.log(success),
        error => console.log(error)
      )
  }
  changePos() {
    throw new Error("Method not implemented.");
  }
  update(cmd:Cmd) {
    console.log(cmd);
    console.log(this.convertPage(cmd.param[0]));
    this.pageDataService.updatePage(this.convertPage(cmd.param[0]))
      .subscribe(
        succes => console.log(succes),
        error => console.log(error)
      )
  }

  convertPage(page: any) {
    console.log(page);
    console.log(page.type);
    switch (page.type) {
      case TypePage.TEXT:
        return page as TextPage;
      case TypePage.AUDIO:
        return page as AudioPage;
      case TypePage.INPUT:
        return page as Page;
    }
  }
}
