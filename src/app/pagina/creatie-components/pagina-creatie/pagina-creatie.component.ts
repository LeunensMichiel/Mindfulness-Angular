import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { Page, TextPage, AudioPage, InputPage } from 'src/app/models/page.model';
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
   * -changedPagePos: emit start en eind positie van een pagina die word verplaatst.
   * -deletePage: emit de positie van een te verwijderen pagina.
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
   * pagina-creatie-lijst |
   *                      | pagina-creatie
   */
  constructor() { }

  ngOnInit() {
  }

  //================== METHODES ==================

  public get position(){
    return this.page.position;
  }

  //------------ PAGE OPERATIES ------------

  /**
   * Een nieuwe pagina word toegevoegd. De positie van de nieuwe pagina word
   * deze positie en positie van de orignele pagina word opgeteld met 1.
   * De nieuwe pagina word geëmit naar het excercise object.
   * @param value bepaalt welke soort page word toegevoegd.
   * Waarde is altijd "text", "audio" of "input".
   */
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
    newPage.position = this.position;
    this.newPage.emit(newPage);
  }

  /**
   * De huidige pagina word verwijderd. Dit gebeurt door de positie te emiiten
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
   * @param page De nieuwe op te slagen pagina.
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
    this.addParagraphCmd.emit(cmd);
  }
}
