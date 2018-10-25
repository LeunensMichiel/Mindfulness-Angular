import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { Page, TextPage, AudioPage, InputPage } from 'src/app/models/page.model';

@Component({
  selector: 'app-pagina-creatie',
  templateUrl: './pagina-creatie.component.html',
  styleUrls: ['./pagina-creatie.component.css']
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
  @Input() position: number = 0;
  @Input() isLastElement = false;
  @Input() viewBeingDragged = false;
  @Output() newPage = new EventEmitter<Page>();
  @Output() changedPage = new EventEmitter<Page>();
  @Output() changePagePos = new EventEmitter<any>();
  @Output() deletedPage = new EventEmitter<number>();
  @Output() enableDragView = new EventEmitter<boolean>();
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
  deletePage(){
    console.log("PAGE AT POSITON " + this.page.position + " DELETED.")
    this.deletedPage.emit(this.page.position);
    return false;
  }

  /**
   * De veranderingen aan de bepaalde page worden geëmit naar de exercise.
   * @param page De nieuwe op te slagen pagina.
   */
  public saveChangedPage(page){
    console.log("EMIT CHANGED PAGE ");
    this.changedPage.emit(page);
  }

  //------------ DRAG&DROP OPERATIES ------------

  /**
   * Deze methode word uitgevoerd zodra het element dat het onDragStarted event bevat word gedragged.
   * 
   * -1: Clicked word op true gezet waardoor het component dat word gedragt niet veranderd
   * naar de kleinere draggingView [1].
   * 
   * -2: true word geëmit op de enableDragView emitter. Dit zorgt ervoor dat alle
   * componenten worden omgezet naar hun dragview. Alleen dit component dat word gedragged
   * , en waar onDragStart dus word getriggered, word niet veranderd naar de dragview [1].
   * 
   * -3: In het datatransfer attribuut word bepaalt welke data word doorgegeven naar het
   * drop element. Hier word dus de positie doorgegeven zodat het drag element zijn positie
   * kan doorgeven aan het drop element. 
   * 
   * [1]: Er word voorkomen dat het element dat word gedragged word veranderd naar een draggingview.
   * Ik doe dat omdat als een ngIf word getriggered in een element dat word gedragged
   * het element uit de drag valt.
   * 
   * @param event event object dat word gereturnt door het onDragStart event.
   */
  dragStarted(event){
    console.log("DRAGSTARTCHECK");
    //1
    this.clicked = true;
    console.log(this.clicked);
    //2
    this.enableDragView.emit(true);
    //3
    event.dataTransfer.setData("text", this.position);
  }

  /**
   * Deze methode word uitgevoerd als het drag element word losgelaten.
   * 
   * -1: Clicked word op false gezet zodat dit component word veranderd naar zijn
   * draggingview als een ander element word gedragged. Als clicked niet terug
   * op false word gezet zal de view niet veranderen bij de start van drag&drop.
   * 
   * -2: enableDraggingView emit false zodat alle andere componenten terug worden
   * gezet naar hun standardview.
   * 
   * @param event event object dat word gereturnt door het onDragEnd event.
   */
  dragEnded(event){
    console.log("DRAGENDCHECK");
    //1
    this.clicked = false;
    console.log(this.clicked);
    //2
    this.enableDragView.emit(false);
  }

  /**
   * Deze methode word uitgevoerd als een drag element word gedropt op een 
   * drop element. Het event dat deze methode krijgt als parameter is hetzelfde
   * event dat door in onDragStart de datatransfer werd geïnitialiseerd.
   * 
   * -1: deze methodes worden uitgevoerd om te voorkomen dat het default 
   * onDrop event word uitgevoerd. zonder dat deze methodes worden geroepen
   * gaat de methode niet werken.
   * 
   * -2: Hier word het datatransfer object dat werd ingesteld in de dragstarted
   * methode opgehaald. De positie data die erin zit word opgehaald en word
   * dan geëmit naar de excercise.
   * 
   * @param ev event object dat word gereturnt door het onDrop event.
   */
  drop(ev: any) {
    //1
    ev.preventDefault();
    event.stopPropagation();
    //2
    var data:DataTransfer = ev.dataTransfer;
    console.log(data.getData("text"));
    this.changePagePos.emit({
      "startPos":data.getData("text"),
      "endPos":this.position
    });
  }

  /**
   * Deze methode word uitgevoerd als het onDragOver event word getriggered. Het
   * onDragOver event is nodig om aan te tonen dat een element op staat voor
   * een drag element in te droppen.
   * 
   * @param ev event object dat word gereturnt door het onDragOver event.
   */
  allowDrop(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    ev.dataTransfer.dropEffect = "move"
    console.log(this.position);
  }
}
