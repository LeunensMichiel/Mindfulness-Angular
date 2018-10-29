import { Component, OnInit, Input, Output, EventEmitter, DoCheck } from '@angular/core';
import { Page,InputPage } from 'src/app/models/page.model';

@Component({
  selector: 'app-input-pagina-creatie',
  templateUrl: './input-pagina-creatie.component.html',
  styleUrls: ['./input-pagina-creatie.component.css']
})
export class InputPaginaCreatieComponent implements OnInit, DoCheck {
  /**
   * VARIABELEN:
   * changedpage: de emitter die de gewijzigde page naar pagina-creatie stuurt.
   * Die op zijn beurt naar de pagina-creatielijst stuurt waar ze dan word opgeslaan
   * in de databank
   */
  @Input() inputPage:InputPage = null;
  @Output() changedPage = new EventEmitter<Page>();
  title:string = "";

  /**
   * GIDS:
   * pagina-creatie-lijst |
   *                      | pagina-creatie |
   *                                       | input-pagina-creatie
   */
  constructor() { }

  ngOnInit() {
  }

  //================== METHODES ==================

  //------------ INPUTPAGE ATTRIBUTEN WIJZIGINGEN ------------

/**
   * METHODES:
   * ngDoCheck: word getriggerd bij wijzigingen aan de lokale variabelen,
   * dus elke keer als de gebruiker iets wijzigt in de .html.
   * Als deze wijzigingen verschillend zijn van de attributen van de lokale pagina
   * worden deze de nieuwe waarden van de pagina. De pagina word dan geëmit om 
   * te worden opgeslagen in het exercise-object
   */
  ngDoCheck(): void {
    if (this.inputPage.title != this.title){
      this.inputPage.title = this.title;
      console.log("INPUTPAGE ON POSITION " + this.inputPage.position + " CHANGED.");
      this.changedPage.emit(this.inputPage);
    }
  }
}
