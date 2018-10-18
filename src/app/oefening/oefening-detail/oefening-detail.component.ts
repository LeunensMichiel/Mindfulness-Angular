import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Excercise } from 'src/app/models/excercise.model';

@Component({
  selector: 'app-oefening-detail',
  templateUrl: './oefening-detail.component.html',
  styleUrls: ['./oefening-detail.component.css']
})
export class OefeningDetailComponent implements OnInit {
  @Input() excersice: Excercise
  public dropdownVisible = false;

  constructor() { }

  public hideDropdown(event){
    console.log("check");
  }

  ngOnInit() {
  }
  
  ngOnChange(changes:SimpleChanges){
    console.log(changes);
  }

}
