import { Component, OnInit, Input } from '@angular/core';
import { Page, AudioPage } from 'src/app/models/page.model';

@Component({
  selector: 'app-audio-pagina-detail',
  templateUrl: './audio-pagina-detail.component.html',
  styleUrls: ['./audio-pagina-detail.component.css']
})
export class AudioPaginaDetailComponent implements OnInit {
  @Input() page:Page = new AudioPage()

  constructor() { }

  ngOnInit() {
  }

}
