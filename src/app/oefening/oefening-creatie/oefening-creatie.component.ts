import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-oefening-creatie',
  templateUrl: './oefening-creatie.component.html',
  styleUrls: ['./oefening-creatie.component.css']
})
export class OefeningCreatieComponent implements OnInit {
  public inputChoiceActive = true;

  constructor() { }

  ngOnInit() {
  }

  public selectInputType(event){
    this.inputChoiceActive = !this.inputChoiceActive;
  }

}
