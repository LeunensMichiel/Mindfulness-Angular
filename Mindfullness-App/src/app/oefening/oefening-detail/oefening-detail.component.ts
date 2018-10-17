import { Component, OnInit, Input } from '@angular/core';
import { Exercise } from 'src/app/models/exercise.model';

@Component({
  selector: 'app-oefening-detail',
  templateUrl: './oefening-detail.component.html',
  styleUrls: ['./oefening-detail.component.css']
})
export class OefeningDetailComponent implements OnInit {
  @Input() excersice: Exercise
  public pages= [
    {
      title: "intro",
      type: 'text'
    },
    {
      title: "deel 1",
      type: 'text'
    },
    {
      title: "deel 2",
      type: 'text'
    },
    {
      title: "denk aan een deur",
      type: 'text'
    },
    {
      title: "denk aan je moeder",
      type: 'text'
    },
    {
      title: "het leven heeft geen nut",
      type: 'text'
    },
    {
      title: "vol hoofd",
      type: 'text'
    },
    {
      title: "mijn stem",
      type: 'audio'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
