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

  @Input() _sesmap: Sessionmap;

  constructor(private route: ActivatedRoute) { }

  get sesmap(): Sessionmap {
    return this._sesmap;
  }

  ngOnInit() {
    this.route.data.subscribe(item =>
      this._sesmap = item['sesmap']);
  }

}
