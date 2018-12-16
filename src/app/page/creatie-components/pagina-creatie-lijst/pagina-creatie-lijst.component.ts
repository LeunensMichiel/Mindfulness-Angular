import {Component, OnInit, Input} from '@angular/core';
import {Page, TextPage, AudioPage, TypePage, InputPage} from 'src/app/models/page.model';
import {Exercise} from 'src/app/models/exercise.model';
import {Cmd} from 'src/app/models/Commands/command.model';
import {Delete} from 'src/app/models/Commands/delete.model';
import {MatSnackBar} from '@angular/material';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';
import {Insert} from 'src/app/models/Commands/insert.model';
import {Update} from 'src/app/models/Commands/update.model';
import {Switch} from 'src/app/models/Commands/switch.model';
import {CmdImplementation} from 'src/app/models/Commands/commandImplementation.model';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {PageDataService} from '../../page-data.service';
import {GenericItem} from '../../../models/GenericCollection.model';
import {SwitchObjectWithoutSave} from '../../../models/Commands/switchObjectWithoutSave';

@Component({
  selector: 'app-pagina-creatie-lijst',
  templateUrl: './pagina-creatie-lijst.component.html',
  styleUrls: ['./pagina-creatie-lijst.component.css'],
  animations: [
    trigger('shrinkOut', [
      transition(':increment', [style({transform: 'translateX(-100%)'}), animate('500ms ease-out', style({transform: 'translateX(0%)'}))]),
      transition(':decrement', [style({transform: 'translateX(100%)'}), animate('500ms ease-out', style({transform: 'translateX(0%)'}))]),
      transition(':enter', [style({width: 0, opacity: 0, overflow: 'hidden'}), animate('500ms ease-out', style({width: '*', opacity: 1}))]),
      transition(':leave', [style({width: '*', opacity: 1, overflow: 'hidden'}), animate('500ms ease-out', style({width: 0, opacity: 0}))])
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
      item => (this.exercise = item['exercise']),
      (error: HttpErrorResponse) => {
        this.openSnackbar(`Error ${error.status} while getting exercise: ${error.error}`);
      }
    );
  }

  get pages(): GenericItem[] {
    return this.exercise.list.items.filter(it => {
      if (it) {
        return (it !== (undefined || null));
      }
    });
  }

  /**
   * Deze methode toont een snackbar als er een verandering gebeurt.
   *
   * @param message Boodschap die word getoond.
   */
  private openSnackbar(message: string) {
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
    let newPage = null;
    switch (value) {
      case 'text':
        newPage = new TextPage();
        break;
      case 'audio':
        newPage = new AudioPage();
        break;
      case 'input':
        newPage = new InputPage();
        break;
    }

    newPage.position = this.exercise.list.items.length;
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
    this.openSnackbar('Pagina verwijderd!');
  }


  /**
   * Deze methode word opgeroepen door de changedPage emitter en veranderd een page
   * van de excercise.
   *
   * @param page De page met de veranderingen.
   */
  public saveChangedPage(page) {
    let newPage = Page.convertPage(page);
    let oldPage = this.exercise.list.items[newPage.position];
    this.addCommand(new Update(this.exercise, [oldPage, newPage]));
  }

  /**
   * This function creates a command that changes a page with file
   * @param page
   */
  public fileAddedToPage(page) {
    let newPage = Page.convertPage(page);
    let oldPage = this.exercise.list.items[newPage.position];
    this.addCommand(new SwitchObjectWithoutSave(this.exercise, [oldPage, newPage]));
  }

  /**
   * Deze methode word opgeroepen door de changeParPos emitter en veranderd de page
   * op de startpositie naar de page op de eindpositie.
   *
   * @param positions een JSON die de eind en start positie bevat
   */
  public changePagePos(positions) {
    this.exercise.list.changeItemPos(positions.startPos, positions.direction);
    this.addCommand(new Switch(this.exercise, positions));
  }


  /**
   * This function adds a page that's in the command via the pageDataService
   * @param cmd
   */
  addItem(cmd: Cmd): any {
    this.pageDataService.addPageToExercise(cmd.inputItem.id, Page.convertPage(cmd.param[0]))
      .subscribe(
        success => {
          this.exercise.list.items[success.position].id = success.id;
        },
        error => {
          this.openSnackbar('Error bij toevoegen Pagina!');

        }
      );
  }

  /**
   * This function removes the page that's in the command out of the database via the pageDataService
   * @param cmd
   */
  removeItem(cmd: Cmd) {
    this.pageDataService.removePage(Page.convertPage(cmd.param[0]).id)
      .subscribe(
        success => {
        },
        error => this.openSnackbar('Error bij verwijderen Pagina!')
      );
  }

  /**
   * This function changes the position of two page that's in the command via the pageDataService
   * @param cmd
   */
  changePos(cmd: Switch): void {
    let page1 = this.exercise.list.getItem(cmd.extraParam.startPos);
    let page2 = this.exercise.list.getSecondItem(cmd.extraParam.startPos, cmd.extraParam.direction);
    if (page2 != null) {
      this.pageDataService.updatePagesPos(page1 as Page, page2 as Page)
        .subscribe(
          success => {
          },
          error => this.openSnackbar('Error bij verwisselen Pagina!')
        );
    }
  }

  /**
   * This function updates the page that's in the command via the pageDataService
   * @param cmd
   */
  update(cmd: Cmd): void {

    this.pageDataService.updatePage(Page.convertPage(cmd.param[0]))
      .subscribe(
        succes => {
        },
        error => this.openSnackbar('Error bij het updaten pagina')
      );
  }


}
