import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { Page, TextPage, AudioPage, InputPage } from 'src/app/models/page.model';

@Component({
  selector: 'app-pagina-creatie',
  templateUrl: './pagina-creatie.component.html',
  styleUrls: ['./pagina-creatie.component.css']
})
export class PaginaCreatieComponent implements OnInit, OnChanges {
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
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes:SimpleChanges){
    console.log(changes);
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
    newPage.position = this.position;
    this.newPage.emit(newPage);
  }

  dragStarted(event){
    console.log("DRAGSTARTCHECK");
    this.clicked = true;
    console.log(this.clicked);
    this.enableDragView.emit(true);
    event.dataTransfer.setData("text", this.position);
  }

  dragEnded(event){
    console.log("DRAGENDCHECK");
    this.clicked = false;
    console.log(this.clicked);
    this.enableDragView.emit(false);
  }

  deletePage(){
    console.log("PAGE AT POSITON " + this.page.position + " DELETED.")
    this.deletedPage.emit(this.page.position);
    return false;
  }

  public saveChangedPage(page){
    console.log("EMIT CHANGED PAGE ");
    this.changedPage.emit(page);
  }

  public selectInputType(event) {
    this.inputChoiceActive = !this.inputChoiceActive;
  }
  
  drop(ev: any) {
    ev.preventDefault();
    event.stopPropagation();
    var data:DataTransfer = ev.dataTransfer;
    console.log(data.getData("text"));
    this.changePagePos.emit({
      "startPos":data.getData("text"),
      "endPos":this.position
    });
  }

  allowDrop(ev) {
    ev.preventDefault();
    event.stopPropagation();
  }
}
