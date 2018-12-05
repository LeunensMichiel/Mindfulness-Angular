import {Component, OnInit, Input, Output, EventEmitter, DoCheck} from '@angular/core';
import {InputPage} from 'src/app/models/page.model';

@Component({
  selector: 'app-input-pagina-creatie',
  templateUrl: './input-pagina-creatie.component.html',
  styleUrls: ['./input-pagina-creatie.component.css']
})
export class InputPaginaCreatieComponent implements OnInit, DoCheck {
  /**
   * VARIABELEN:
   * changedpage: de emitter die de gewijzigde page naar page-creatie stuurt.
   * Die op zijn beurt naar de page-creatielijst stuurt waar ze dan word opgeslaan
   * in de databank
   */
  @Input() inputPage: InputPage;
  @Output() changedPage = new EventEmitter<InputPage>();
  title: string = '';

  /**
   * GIDS:
   * page-creatie-lijst |
   *                      | page-creatie |
   *                                       | input-page-creatie
   */
  constructor() {


  }

  ngOnInit() {
    console.log(this.inputPage);
    this.title = this.inputPage.title;
  }

  //================== METHODES ==================

  //------------ INPUTPAGE ATTRIBUTEN WIJZIGINGEN ------------

  /**
   * METHODES:
   * ngDoCheck: word getriggerd bij wijzigingen aan de lokale variabelen,
   * dus elke keer als de gebruiker iets wijzigt in de .html.
   * Als deze wijzigingen verschillend zijn van de attributen van de lokale page
   * worden deze de nieuwe waarden van de page. De page word dan geëmit om
   * te worden opgeslagen in het exercise-object
   */
  ngDoCheck(): void {
    if (this.inputPage.title != this.title) {
      this.inputPage.title = this.title;
      this.changedPage.emit(this.inputPage);
      console.log('INPUTPAGE ON POSITION ' + this.inputPage.position + ' CHANGED.');
    }
  }
}
