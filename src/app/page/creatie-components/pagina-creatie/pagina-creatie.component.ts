import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Page, TextPage, AudioPage, TypePage, InputPage} from 'src/app/models/page.model';
import {
  trigger,
  style,
  animate,
  transition,
} from '@angular/animations';
import {Cmd} from 'src/app/models/Commands/command.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-pagina-creatie',
  templateUrl: './pagina-creatie.component.html',
  styleUrls: ['./pagina-creatie.component.css'],
  animations: [
    trigger('posAnim', [
      transition(':increment', [style({transform: 'translateX(-100%)'}), animate('500ms ease-out', style({transform: 'translateX(0)'}))]),
      transition(':decrement', [style({transform: 'translateX(100%)'}), animate('500ms ease-out', style({transform: 'translateX(0%)'}))])
    ])
  ]
})
export class PaginaCreatieComponent implements OnInit {
  /**
   * VARIABELEN:
   * -newPage: emit nieuwe Pagina naar de exercise.
   * -changedPage: emit een veranderde Pagina naar de exercise.
   * -changedPagePos: emit start en eind positie van een page die word verplaatst.
   * -deletePage: emit de positie van een te verwijderen page.

   * -dragging: deze boolean bepaalt of het huidige element wel of niet veranderd naar
   * hun draggingView. Het is het element dat word gedragged dat niet veranderd, alle
   * andere element veranderen wel.
   */
  @Input() page: Page;
  @Input() _position: number = 0;
  @Input() isLastElement = false;
  @Input() viewBeingDragged = false;
  @Output() newPage = new EventEmitter<Page>();
  @Output() changedPage = new EventEmitter<Page>();
  @Output() onFileAddedToPage = new EventEmitter<Page>();
  @Output() changePagePos = new EventEmitter<any>();
  @Output() deletedPage = new EventEmitter<number>();
  changeAnimation = true;
  public pageForm: FormGroup;
  /**
   * GIDS:
   * page-creatie-lijst |
   *                      | page-creatie
   */
  constructor(private _fb: FormBuilder) {
  }

  ngOnInit() {
    this.pageForm = this._fb.group({
      title: [this.page.title, [Validators.maxLength(30)]]
    });
  }

  //================== METHODES ==================

  public get position() {
    return this.page.position;
  }

  getTypePage() {
    return TypePage;
  }

  //------------ PAGE OPERATIES ------------

  /**
   * This function changes the title of the page
   * It does not matter what page it is
   */
  onChangeTitle(): void {
    /**
     * The title of the page is only be changed when the form is valid
     */
    if ((this.pageForm.dirty || this.pageForm.touched) && this.pageForm.valid) {
      this.page.title = this.pageForm.value.title;

      this.saveChangedPage(this.page);
    }
  }

  /**
   * Een nieuwe page word toegevoegd. De positie van de nieuwe page word
   * deze positie en positie van de orignele page word opgeteld met 1.
   * De nieuwe page word geëmit naar het excercise object.
   * @param value bepaalt welke soort page word toegevoegd.
   * Waarde is altijd "text", "audio" of "input".
   */
  addPage(value) {
    var newPage = null;
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
    newPage.position = this.position;
    this.newPage.emit(newPage);
  }

  public fileAddedToPage(page) {
    this.onFileAddedToPage.emit(page);
  }

  /**
   * De huidige page word verwijderd. Dit gebeurt door de positie te emiiten
   * naar het exercise-object.
   */
  deletePage() {
    this.changeAnimation = false;
    this.deletedPage.emit(this.page.position);
    return false;
  }

  /**
   * De veranderingen aan de bepaalde page worden geëmit naar de exercise.
   * @param page De nieuwe op te slagen page.
   */
  public saveChangedPage(page) {
    this.changedPage.emit(page);
    return false;
  }

  /**
   * This function changes the position of a page
   * It is triggered when the arrows in the view are clicked
   * @param direction -> defines if the page should move to the right or left
   */
  changePagePosition(direction) {
    this.changePagePos.emit({
      'startPos': this.page.position,
      'direction': direction == 'left' ? -1 : 1
    });
    return false;
  }


}
