import { Component, OnInit, DoCheck, Input, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { TextPage, Page } from 'src/app/models/page.model';
import { Paragraph } from 'src/app/models/paragraph.model';
import {
  trigger,
  style,
  animate,
  transition
  // ...
} from '@angular/animations';
import { PaginaCreatieLijstComponent } from '../pagina-creatie-lijst/pagina-creatie-lijst.component';
import { Cmd } from 'src/app/models/Commands/command.model';
import { Delete } from 'src/app/models/Commands/delete.model';
import { Switch } from 'src/app/models/Commands/switch.model';
import { Update } from 'src/app/models/Commands/update.model';
import { Insert } from 'src/app/models/Commands/insert.model';
@Component({
  selector: 'app-tekst-pagina-creatie',
  templateUrl: './tekst-pagina-creatie.component.html',
  styleUrls: ['./tekst-pagina-creatie.component.css']/* ,
  animations: [
    trigger('shrinkParagraphs', [
      transition(':enter', [style({ height: 0, overflow: 'hidden' }), animate('1s ease-out', style({ height: '*' }))]),
      transition(':leave', [style({ height: '*', overflow: 'hidden'}), animate('1s ease-out', style({ height: 0}))])
    ])
  ] */
})
export class TekstPaginaCreatieComponent implements OnInit,DoCheck{
  /**
   * VARIABELEN:
   * changedpage: de emitter die de gewijzigde page naar pagina-creatie stuurt.
   * Die op zijn beurt naar de pagina-creatielijst stuurt waar ze dan word opgeslaan
   * in de databank
   */
  @Input() textPage:TextPage = null;
  @Output() changedPage = new EventEmitter<Page>();
  @Output() addParagraphCmd = new EventEmitter<Cmd>();
  title:string = "";

  /**
   * GIDS:
   * pagina-creatie-lijst |
   *                      | pagina-creatie |
   *                                       | tekst-pagina-creatie
   */
  constructor() {
   }

  ngOnInit() {
    this.title = this.textPage.title;
  }

  //================== METHODES ==================
  
  //------------ TEXTPAGE ATTRIBUTEN WIJZIGINGEN ------------

  /**$
   * ngDoCheck: word getriggerd bij wijzigingen aan de lokale variabelen,
   * dus elke keer als de gebruiker iets wijzigt in de .html.
   * Als deze wijzigingen verschillend zijn van de attributen van de lokale pagina
   * worden deze de nieuwe waarden van de pagina. De pagina word dan geëmit om 
   * te worden opgeslagen in het exercise-object
   */
  ngDoCheck(): void{
    if (this.textPage.title != this.title){
      console.log(this.textPage);
      this.changedPage.emit(this.textPage);
      this.textPage.title = this.title;
    }
  }

  //------------ TEXTPAGE PARAGRAPHS WIJZIGINGEN ------------

  /**
   * een nieuwe paragraph word toegevoegd op een bepaalde locatie 
   * in de textpage paragraphs array. De gewijzigde tekstpagina word dan geëmit
   * om op te slaan in de exercise.
   * @param par De paragraph die word toegevoegd aan de paragraphs array
   */
  addPar(type){
    var newPar = new Paragraph();
    newPar.position = this.textPage.items.length;
    newPar.type = type;
    this.addParagraphCmd.emit(new Insert([this.textPage], [newPar]));
  }

  /**
   * Een pargraaf in de paragraphs array word verwijderd. De originele word verwijderd
   * en de nieuwe versie word toegevoegd op zijn originele locatie.
   * De gewijzigde textpagina word dan geëmit en toegevoegd aan de exercise.
   * @param par De gewijzigde pargraph.
   */
  changePar(par){
    var oldPar = new Paragraph().fromJson(par);
    var newPar = this.textPage.items[oldPar.position];
    this.addParagraphCmd.emit(new Update([this.textPage], [newPar, oldPar] ))
  }
  /**
   * De paragraph op de startpositie en op de eindpositie worden van plaats verwisselt.
   * De gewijzigde textpagina word dan geëmit en toegevoegd aan de exercise.
   * @param positions een Json object met de start en eindpositie.
   */
  changeParPos(positions){
    this.addParagraphCmd.emit(new Switch([this.textPage], positions));
  }

  /**
   * De paragraph op de gegeven positie word verwijderd.
   * De gewijzigde textpagina word dan geëmit en toegevoegd aan de exercise.
   * @param position de positie van de te verwijderen paragraph.
   */
  deletePar(position){
    this.addParagraphCmd.emit(new Delete([this.textPage], [this.textPage.items[position]]));
  }
}