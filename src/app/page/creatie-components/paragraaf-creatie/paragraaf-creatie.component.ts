import { Component, OnInit, Input, Output, EventEmitter, DoCheck } from '@angular/core';
import {Paragraph, TypeParagraph} from 'src/app/models/paragraph.model';
import {DownloadService} from '../../../download.service';

@Component({
  selector: 'app-paragraaf-creatie',
  templateUrl: './paragraaf-creatie.component.html',
  styleUrls: ['./paragraaf-creatie.component.css']
})
export class ParagraafCreatieComponent implements OnInit, DoCheck {
  /**
   * VARIABELEN:
   * -newPar: De emitter die de nieuwe paragraph naar tekst-page-creatie stuurt.
   * -changedRar: De emitter die de gewijzigde paragraph naar tekst-page-creatie stuurt.
   * -changedParPos: De emitter die de posities van de te wisselen pargrafen doorstuurt.
   * -deletePar: De emitter die de positie van de te verwijderen paragraph doorstuurt.
   */
  @Input() par:Paragraph = new Paragraph();
  @Input() position:number = 0;
  @Input() isLastElement = false;
  @Output() newPar = new EventEmitter<Paragraph>();
  @Output() changedParPos = new EventEmitter<any>();
  @Output() changedPar = new EventEmitter<Paragraph>();
  @Output() deletePar = new EventEmitter<number>();
  @Output() addImage = new EventEmitter<any>();

  public isImageLoading: Boolean = true;
  public image: any;
  content:string = "";

  getTypeParagraphEnum() {
    return TypeParagraph;
  }

  /**
   * GIDS:
   * page-creatie-lijst |
   *                      | page-creatie |
   *                                       | tekst-page-creatie | 
   *                                                              | paragraaf-creatie
   */
  constructor(private _downloadDataService: DownloadService) { }

  ngOnInit() {
    console.log(this.par);
    this.content = this.par.description;

    // if (this.par.pathName) {
    //   this.showImage(this.par.pathName);
    //   this.isImageLoading = true;
    //
    // } else {
    //   this.isImageLoading = false;
    // }
  }
  
  //================== METHODES ==================

  // showImage(imagePath: string) {
  //
  //   this._downloadDataService.getFile(imagePath).subscribe(
  //     data => {
  //       this.createImageFromBlob(data);
  //       this.isImageLoading = false;
  //     },
  //     error => {
  //       this.isImageLoading = false;
  //       console.log(error);
  //     }
  //   );
  // }
  //
  // private createImageFromBlob(image: Blob) {
  //   let reader = new FileReader();
  //   reader.addEventListener("load", () => {
  //     this.image = (reader.result.toString()).split(',')[1];
  //   }, false);
  //
  //   if (image) {
  //     reader.readAsDataURL(image);
  //   }
  // }
  
  //------------ PARGRAPH ATTRIBUTEN WIJZIGINGEN ------------

  /**
   *  ngDoCheck: word getriggerd bij wijzigingen aan de lokale variabelen,
   * dus elke keer als de gebruiker iets wijzigt in de .html.
   * Als deze wijzigingen verschillend zijn van de attributen van de lokale pargraaf
   * worden deze de nieuwe waarden van de paragraaf. De paragraaf word dan geëmit om 
   * te worden opgeslagen in het page-object
   */
  ngDoCheck(){
    if (this.par.description != this.content) {
      console.log("PARAGRAPH AT POSITION " + this.par.position + " CHANGED");
      this.par.description = this.content;
      this.changedPar.emit(this.par);
      console.log(this.content);
    }
  }

  //------------ PARAGRAPH WIJZIGINGEN ------------

  /**
   * De paragraph op de startpositie en op de eindpositie worden van plaats verwisselt.
   * De gewijzigde Paragrafen word dan geëmit en toegevoegd aan de Tekst-Pagina.
   * @param direction Toont de richting aan van de verplaatsing.
   * Waarde is altijd "up" of "down".
   */
  changeParPosition(direction){
    let endPos = this.position;
    (direction == "up")?endPos = -1:endPos = 1;
    this.changedParPos.emit(
      {
        startPos:this.position,
        direction:endPos
      }
    )
  }

  /**
   * De hudige pargraaf word geëmit en word dan verwijderd uit de tekstpagina.
   * Retunt false omdat de methode is gebonden aan een click event van een button.
   * Zonder de false return word de methode niet uitgevoerd.
   */
  removePar():boolean{
    console.log("PARAGRAPH AT POSITON " + this.par.position + " REMOVED");
    this.deletePar.emit(this.par.position);
    return false;
  }

  selectFile(event) {
    this.addImage.emit({
      file: event.target.files.item(0),
      par_pos: this.par.position
    })
  }
}
