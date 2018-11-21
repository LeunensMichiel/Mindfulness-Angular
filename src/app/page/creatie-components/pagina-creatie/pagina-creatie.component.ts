import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import {Page, TextPage, AudioPage, TypePage} from 'src/app/models/page.model';
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
import { Cmd } from 'src/app/models/Commands/command.model';
@Component({
  selector: 'app-pagina-creatie',
  templateUrl: './pagina-creatie.component.html',
  styleUrls: ['./pagina-creatie.component.css'],
  animations: [
    /* trigger('pageTrigger', [
      state('in', style({ transform: 'translateX(0)' })),
      state('out', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-50%)', opacity: 0.5}),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition('* => out', [
        style({ transform: 'translateX(0)', opacity: 1}),
        animate('300ms ease-out', style({ opacity: 0, transform: 'translateX(50%)' }))
      ])
    ]),
    trigger('valueAnimation', [
      transition(':increment', group([
        query(':enter', [
          style({ opacity: 0.5 }),
          animate('0.8s ease-out', style('*'))
        ])
      ])),
      transition(':decrement', group([
        query(':enter', [
          style({ opacity: 0.5 }),
          animate('0.8s ease-out', style('*'))
        ])
      ]))
    ]) */
    trigger('posAnim', [
      transition(':increment', [style({ transform: 'translateX(-100%)' }), animate('500ms ease-out', style({ transform: 'translateX(0)' }))]),
      transition(':decrement', [style({ transform: 'translateX(100%)' }), animate('500ms ease-out', style({ transform: 'translateX(0%)' }))])
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
   * -enableDragView: emit een boolean waardoor alle element in de lijst veranderen
   * naar hun draggingView.
   * -dragging: deze boolean bepaalt of het huidige element wel of niet veranderd naar
   * hun draggingView. Het is het element dat word gedragged dat niet veranderd, alle
   * andere element veranderen wel.
   */
  @Input() page: Page = null;
  @Input() _position: number = 0;
  @Input() isLastElement = false;
  @Input() viewBeingDragged = false;
  @Output() newPage = new EventEmitter<Page>();
  @Output() changedPage = new EventEmitter<Page>();
  @Output() changePagePos = new EventEmitter<any>();
  @Output() deletedPage = new EventEmitter<number>();
  @Output() enableDragView = new EventEmitter<boolean>();
  @Output() addParagraphCmd = new EventEmitter<Cmd>();
  changeAnimation = true;
  public inputChoiceActive = true;
  public clicked = false;
  public dragging = this.viewBeingDragged && (!this.clicked)
  public draggable = false;

  /**
   * GIDS:
   * page-creatie-lijst |
   *                      | page-creatie
   */
  constructor() { }

  ngOnInit() {
    console.log(this.page.constructor.name);
  }

  //================== METHODES ==================

  public get position(){
    return this.page.position;
  }

  getTypePage() {
    return TypePage;
  }

  //------------ PAGE OPERATIES ------------

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
    newPage.position = this.position;
    this.newPage.emit(newPage);
  }

  /**
   * De huidige page word verwijderd. Dit gebeurt door de positie te emiiten
   * naar het exercise-object.
   */
  deletePage() {
    this.changeAnimation = false;
    console.log("PAGE AT POSITON " + this.page.position + " DELETED.")
    this.deletedPage.emit(this.page.position);
    return false;
  }

  /**
   * De veranderingen aan de bepaalde page worden geëmit naar de exercise.
   * @param page De nieuwe op te slagen page.
   */
  public saveChangedPage(page) {
    console.log("EMIT CHANGED PAGE ");
    this.changedPage.emit(page);
  }

  changePagePosition(direction) {
    this.changePagePos.emit({
      "startPos": this.page.position,
      "direction": direction == "left" ?  - 1 :  1
    })
  }

  onNewParCommand(cmd: Cmd){
    console.log(cmd);
    this.addParagraphCmd.emit(cmd);
  }
}