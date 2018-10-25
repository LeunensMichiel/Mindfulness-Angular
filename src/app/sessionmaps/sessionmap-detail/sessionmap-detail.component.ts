import { Component, OnInit, Input } from '@angular/core';
import { Sessionmap } from 'src/app/models/sessionmap.model';

@Component({
  selector: 'app-sessionmap-detail',
  templateUrl: './sessionmap-detail.component.html',
  styleUrls: ['./sessionmap-detail.component.css']
})
export class SessionmapDetailComponent implements OnInit {

  @Input() public sesmap: Sessionmap;

  constructor() { }

  ngOnInit() {
  }

}
