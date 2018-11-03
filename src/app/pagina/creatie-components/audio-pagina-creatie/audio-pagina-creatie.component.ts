import { Component, OnInit, Input, OnChanges, SimpleChanges, DoCheck, EventEmitter, Output } from '@angular/core';
import { AudioPage, Page } from 'src/app/models/page.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-audio-pagina-creatie',
  templateUrl: './audio-pagina-creatie.component.html',
  styleUrls: ['./audio-pagina-creatie.component.css']
})
export class AudioPaginaCreatieComponent implements OnInit, DoCheck {
  /**
   * VARIABELEN:
   * changedpage: de emitter die de gewijzigde page naar pagina-creatie stuurt.
   * Die op zijn beurt naar de pagina-creatielijst stuurt waar ze dan word opgeslaan
   * in de databank
   */
  @Input() audioPage:AudioPage = null;
  @Output() changedPage = new EventEmitter<Page>();
  title: string = "";
  fileUrl: string = "";

  /**
   * GIDS:
   * pagina-creatie-lijst |
   *                      | pagina-creatie |
   *                                       | audio-pagina-creatie
   */

  constructor() { }

  ngOnInit() { 
  }

  //================== METHODES ==================

  //------------ AUDIOPAGE ATTRIBUTEN WIJZIGINGEN ------------

  /**
   * METHODES:
   * ngDoCheck: word getriggerd bij wijzigingen aan de lokale variabelen,
   * dus elke keer als de gebruiker iets wijzigt in de .html.
   * Als deze wijzigingen verschillend zijn van de attributen van de lokale pagina
   * worden deze de nieuwe waarden van de pagina. De pagina word dan geëmit om 
   * te worden opgeslagen in het exercise-object
   */
  ngDoCheck(): void {
    if (this.audioPage.title != this.title || this.audioPage.fileUrl != this.fileUrl){
      this.changedPage.emit(this.audioPage);
      this.audioPage.title = this.title;
      this.audioPage.fileUrl = this.fileUrl;
      console.log("AUDIOPAGE ON POSITION " + this.audioPage.position + " CHANGED.");
    }
  } 
}
