import {Component, OnInit, DoCheck, Input, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges} from '@angular/core';
import {TextPage, Page, AudioPage} from 'src/app/models/page.model';
import {Paragraph, TypeParagraph} from 'src/app/models/paragraph.model';

import {Cmd} from 'src/app/models/Commands/command.model';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {PageDataService} from '../../page-data.service';
import {GenericCollection} from '../../../models/GenericCollection.model';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-tekst-pagina-creatie',
  templateUrl: './tekst-pagina-creatie.component.html',
  styleUrls: ['./tekst-pagina-creatie.component.css']
})
export class TekstPaginaCreatieComponent implements OnInit {
  /**
   * VARIABELEN:
   * changedpage: de emitter die de gewijzigde page naar page-creatie stuurt.
   * Die op zijn beurt naar de page-creatielijst stuurt waar ze dan word opgeslaan
   * in de databank
   */
  @Input() textPage: TextPage;
  @Output() changedPage = new EventEmitter<Page>();
  @Output() onFileAddedToPage = new EventEmitter<Page>();

  title: string = '';

  /**
   * GIDS:
   * page-creatie-lijst |
   *                      | page-creatie |
   *                                       | tekst-page-creatie
   */
  constructor(private _pageDataService: PageDataService, public snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  //================== METHODES ==================


  //------------ TEXTPAGE PARAGRAPHS WIJZIGINGEN ------------

  /**
   * een nieuwe paragraph word toegevoegd op een bepaalde locatie
   * in de textpage paragraphs array. De gewijzigde tekstpagina word dan geëmit
   * om op te slaan in de exercise.
   * @param par De paragraph die word toegevoegd aan de paragraphs array
   */
  addPar(type) {
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

  /**
   * This function is triggered when there is a image added to a paragraph
   * It saves the image on the server via the pageDataService
   * @param json
   */
  addImage(json: any) {

    // this.progress.percentage = 0;
    // this.currentFileUpload = this.selectedFiles.item(0);
    this._pageDataService.updatePageParagraphFile(this.textPage,json.par, json.file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          // this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          let json: any = event.body;
          this.textPage.list = new GenericCollection(json.paragraphs.map(it => {return Paragraph.fromJSON(it)}));
          this.onFileAddedToPage.emit(this.textPage);
          // this.onFileAddedToPage.emit(page);
          // this.currentFileUpload = undefined;
        }

      },
      error => {
        this.snackBar.open('File upload was unsuccesvol', '', {
          duration: 3000,
        });
      });
  }
}
