import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Page, TextPage, AudioPage, InputPage } from 'src/app/models/page.model';

@Component({
  selector: 'app-pagina-creatie',
  templateUrl: './pagina-creatie.component.html',
  styleUrls: ['./pagina-creatie.component.css']
})
export class PaginaCreatieComponent implements OnInit {
  @Input() page: Page = null;
  @Input() position: number = 0;
  @Input() isLastElement = false;
  @Output() newPage = new EventEmitter<Page>();
  @Output() changedPage = new EventEmitter<Page>();
  @Output() deletedPage = new EventEmitter<number>();
  public inputChoiceActive = true;

  constructor() { }

  ngOnInit() {
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

}
