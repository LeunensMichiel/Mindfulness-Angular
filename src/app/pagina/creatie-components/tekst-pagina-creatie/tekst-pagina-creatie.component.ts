import { Component, OnInit, DoCheck, Input, Output, EventEmitter } from '@angular/core';
import { TextPage, Page } from 'src/app/models/page.model';

@Component({
  selector: 'app-tekst-pagina-creatie',
  templateUrl: './tekst-pagina-creatie.component.html',
  styleUrls: ['./tekst-pagina-creatie.component.css']
})
export class TekstPaginaCreatieComponent implements OnInit,DoCheck {
  @Input() textPage:TextPage = null;
  @Output() changedPage = new EventEmitter<Page>();
  title:string = "";

  constructor() { }

  ngOnInit() {
  }
  
  ngDoCheck(): void{
    if (this.textPage.title != this.title){
      this.textPage.title = this.title;
      console.log("TEXTPAGE ON POSITION " + this.textPage.position + " CHANGED.");
      this.changedPage.emit(this.textPage);
    }
  }

  addPar(par){
    this.textPage.addPar(par.position, par);
    console.log(this.textPage.paragraphs);
    console.log("TEXTPAGE ON POSITION " + this.textPage.position + " CHANGED.");
    this.changedPage.emit(this.textPage);
  }

  changeParPos(positions){
    console.log(positions);
    console.log(this.textPage.changeParPosition(positions.startPos, positions.endPos));
    this.changedPage.emit(this.textPage);
  }
}
