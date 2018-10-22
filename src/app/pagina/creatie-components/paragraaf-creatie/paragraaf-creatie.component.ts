import { Component, OnInit, Input, Output, EventEmitter, DoCheck } from '@angular/core';
import { Paragraph } from 'src/app/models/paragraph.model';

@Component({
  selector: 'app-paragraaf-creatie',
  templateUrl: './paragraaf-creatie.component.html',
  styleUrls: ['./paragraaf-creatie.component.css']
})
export class ParagraafCreatieComponent implements OnInit, DoCheck {
  @Input() par:Paragraph = new Paragraph();
  @Input() position:number = 0
  @Input() isLastElement = false;
  @Output() newPar = new EventEmitter<Paragraph>();
  @Output() changedParPos = new EventEmitter<any>();
  @Output() changedPar = new EventEmitter<Paragraph>();
  @Output() deletePar = new EventEmitter<number>();
  content:string = "";

  constructor() { }

  ngOnInit() {
  }

  addPar(type){
    var newPar = new Paragraph();
    newPar.position = this.position;
    newPar.type = type;
    this.newPar.emit(newPar);
  }

  changeParPosition(direction){
    var endPos = this.position;
    endPos = (direction == "up")?endPos-= 1:endPos+= 1;
    this.changedParPos.emit(
      {
        "startPos":this.position,
        "endPos":endPos
      }
    )
  }
/**
 * verwijderd de geslecteerde paragraph
 * returnt false omdat de button anders de pagina herlaad
 */
  removePar(){
    console.log("PARAGRAPH AT POSITON " + this.par.position + " REMOVED");
    this.deletePar.emit(this.par.position);
    return false;
  }

  ngDoCheck(){
    if (this.par.content != this.content) {
      console.log("PARAGRAPH AT POSITION " + this.par.position + " CHANGED")
      this.par.content = this.content;
      this.changedPar.emit(this.par);
      console.log(this.content);
    }
  }
}
