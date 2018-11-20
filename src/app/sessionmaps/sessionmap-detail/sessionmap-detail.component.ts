import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Sessionmap } from 'src/app/models/sessionmap.model';
import { ActivatedRoute } from '@angular/router';
import { SessionmapDataService } from '../sessionmap-data.service';

@Component({
  selector: 'app-sessionmap-detail',
  templateUrl: './sessionmap-detail.component.html',
  styleUrls: ['./sessionmap-detail.component.css']
})
export class SessionmapDetailComponent implements OnInit {

  @Input() public sessionmap: Sessionmap;

  constructor() { }


  ngOnInit() {

  }

}
