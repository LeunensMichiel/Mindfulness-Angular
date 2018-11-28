import {Component, OnInit, DoCheck, Input, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges} from '@angular/core';
import {TextPage, Page, AudioPage} from 'src/app/models/page.model';
import {Paragraph, TypeParagraph} from 'src/app/models/paragraph.model';

import {Cmd} from 'src/app/models/Commands/command.model';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {PageDataService} from '../../page-data.service';


@Component({
  selector: 'app-tekst-pagina-creatie',
  templateUrl: './tekst-pagina-creatie.component.html',
  styleUrls: ['./tekst-pagina-creatie.component.css']
})
export class TekstPaginaCreatieComponent implements OnInit, DoCheck {
  /**
   * VARIABELEN:
   * changedpage: de emitter die de gewijzigde page naar page-creatie stuurt.
   * Die op zijn beurt naar de page-creatielijst stuurt waar ze dan word opgeslaan
   * in de databank
   */
  @Input() textPage: TextPage;
  @Output() changedPage = new EventEmitter<Page>();
  @Output() addParagraphCmd = new EventEmitter<Cmd>();
  title: string = '';

  /**
   * GIDS:
   * page-creatie-lijst |
   *                      | page-creatie |
   *                                       | tekst-page-creatie
   */
  constructor(private _pageDataService: PageDataService) {
  }

  ngOnInit() {
    this.title = this.textPage.title;
  }

  //================== METHODES ==================

  //------------ TEXTPAGE ATTRIBUTEN WIJZIGINGEN ------------

  /**$
   * ngDoCheck: word getriggerd bij wijzigingen aan de lokale variabelen,
   * dus elke keer als de gebruiker iets wijzigt in de .html.
   * Als deze wijzigingen verschillend zijn van de attributen van de lokale page
   * worden deze de nieuwe waarden van de page. De page word dan geëmit om
   * te worden opgeslagen in het exercise-object
   */
  ngDoCheck(): void {
    if (this.textPage.title != this.title) {
      this.textPage.title = this.title;
      this.changedPage.emit(this.textPage);
    }
  }

  //------------ TEXTPAGE PARAGRAPHS WIJZIGINGEN ------------

  /**
   * een nieuwe paragraph word toegevoegd op een bepaalde locatie
   * in de textpage paragraphs array. De gewijzigde tekstpagina word dan geëmit
   * om op te slaan in de exercise.
   * @param par De paragraph die word toegevoegd aan de paragraphs array
   */
  addPar(type) {
    console.log(type);
    let typePar;
    switch (type) {
      case "TEXT":
        typePar = TypeParagraph.TEXT;
        break;
      case "IMAGE":
        typePar = TypeParagraph.IMAGE;
        break;
    }

    let newPar = new Paragraph(this.textPage.list.items.length, typePar);
    console.log(newPar);
    this.textPage.list.addItem(newPar);
    this.changedPage.emit(this.textPage);
  }



  /**
   * Een pargraaf in de paragraphs array word verwijderd. De originele word verwijderd
   * en de nieuwe versie word toegevoegd op zijn originele locatie.
   * De gewijzigde textpagina word dan geëmit en toegevoegd aan de exercise.
   * @param par De gewijzigde pargraph.
   */
  changePar(par) {
    this.textPage.list.changeItem(par);
    this.changedPage.emit(this.textPage);
  }

  /**
   * De paragraph op de startpositie en op de eindpositie worden van plaats verwisselt.
   * De gewijzigde textpagina word dan geëmit en toegevoegd aan de exercise.
   * @param positions een Json object met de start en eindpositie.
   */
  changeParPos(positions) {
    this.textPage.list.changeItemPos(positions.startPos, positions.direction);
    this.changedPage.emit(this.textPage);
  }

  /**
   * De paragraph op de gegeven positie word verwijderd.
   * De gewijzigde textpagina word dan geëmit en toegevoegd aan de exercise.
   * @param position de positie van de te verwijderen paragraph.
   */
  deletePar(position) {
    this.textPage.list.deleteItem(position);
    this.changedPage.emit(this.textPage);
  }

  addImage(json: any) {

    // this.progress.percentage = 0;
    // this.currentFileUpload = this.selectedFiles.item(0);

    // this._pageDataService.updatePageParagraphFile(this.textPage,json.par_pos, json.file).subscribe(
    //   event => {
    //     if (event.type === HttpEventType.UploadProgress) {
    //       // this.progress.percentage = Math.round(100 * event.loaded / event.total);
    //     } else if (event instanceof HttpResponse) {
    //       console.log('File is completely uploaded!');
    //       let page = TextPage.fromJSON(event.body);
    //       console.log(page);
    //       // this.onFileAddedToPage.emit(page);
    //       // this.currentFileUpload = undefined;
    //     }
    //
    //   });
    // this.selectedFiles = undefined;
  }
}
