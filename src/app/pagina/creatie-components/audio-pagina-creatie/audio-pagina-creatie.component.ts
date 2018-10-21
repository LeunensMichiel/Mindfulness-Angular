import { Component, OnInit, Input, OnChanges, SimpleChanges, DoCheck, EventEmitter, Output } from '@angular/core';
import { AudioPage, Page } from 'src/app/models/page.model';

@Component({
  selector: 'app-audio-pagina-creatie',
  templateUrl: './audio-pagina-creatie.component.html',
  styleUrls: ['./audio-pagina-creatie.component.css']
})
export class AudioPaginaCreatieComponent implements OnInit, DoCheck {
  @Input() audioPage:AudioPage = null;
  @Output() changedPage = new EventEmitter<Page>();
  title: string = "";
  fileUrl: string = "";

  constructor() { }

  ngOnInit() { }

  ngDoCheck(): void {
    if (this.audioPage.title != this.title || this.audioPage.fileUrl != this.fileUrl){
      this.audioPage.title = this.title;
      this.audioPage.fileUrl = this.fileUrl;
      console.log("AUDIOPAGE ON POSITION " + this.audioPage.position + " CHANGED.")
      this.changedPage.emit(this.audioPage);
    }
  } 
}
