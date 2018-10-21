import { Component, OnInit, Input, Output, EventEmitter, DoCheck } from '@angular/core';
import { Page,InputPage } from 'src/app/models/page.model';

@Component({
  selector: 'app-input-pagina-creatie',
  templateUrl: './input-pagina-creatie.component.html',
  styleUrls: ['./input-pagina-creatie.component.css']
})
export class InputPaginaCreatieComponent implements OnInit, DoCheck {
  @Input() inputPage:InputPage = null;
  @Output() changedPage = new EventEmitter<Page>();
  title:string = "";
  constructor() { }

  ngOnInit() {
  }

  ngDoCheck(): void {
    if (this.inputPage.title != this.title){
      this.inputPage.title = this.title;
      console.log("INPUTPAGE ON POSITION " + this.inputPage.position + " CHANGED.");
      this.changedPage.emit(this.inputPage);
    }
  }
}
