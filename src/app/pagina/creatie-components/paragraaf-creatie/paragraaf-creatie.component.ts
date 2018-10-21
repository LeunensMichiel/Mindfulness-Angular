import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Paragraph } from 'src/app/models/paragraph.model';

@Component({
  selector: 'app-paragraaf-creatie',
  templateUrl: './paragraaf-creatie.component.html',
  styleUrls: ['./paragraaf-creatie.component.css']
})
export class ParagraafCreatieComponent implements OnInit {
  @Input() par:Paragraph = null
  @Input() position:number = 0
  @Input() isLastElement = false;
  @Output() newPar = new EventEmitter<Paragraph>();
  @Output() changedParPos = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  addPar(type){
    var newPar = new Paragraph();
    newPar.position = 0;
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
}
