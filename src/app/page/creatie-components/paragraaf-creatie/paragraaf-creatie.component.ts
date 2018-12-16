import {Component, OnInit, Input, Output, EventEmitter, DoCheck} from '@angular/core';
import {Paragraph, TypeParagraph} from 'src/app/models/paragraph.model';
import {DownloadService} from '../../../download.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-paragraaf-creatie',
  templateUrl: './paragraaf-creatie.component.html',
  styleUrls: ['./paragraaf-creatie.component.css']
})
export class ParagraafCreatieComponent implements OnInit {
  /**
   * VARIABELEN:
   * -newPar: De emitter die de nieuwe paragraph naar tekst-page-creatie stuurt.
   * -changedRar: De emitter die de gewijzigde paragraph naar tekst-page-creatie stuurt.
   * -changedParPos: De emitter die de posities van de te wisselen pargrafen doorstuurt.
   * -deletePar: De emitter die de positie van de te verwijderen paragraph doorstuurt.
   */
  @Input() par: Paragraph;
  @Input() position: number;
  @Input() isLastElement = false;
  @Output() changedParPos = new EventEmitter<any>();
  @Output() changedPar = new EventEmitter<Paragraph>();
  @Output() deletePar = new EventEmitter<number>();
  @Output() addImage = new EventEmitter<any>();

  public isImageLoading: Boolean = true;
  public image: any;
  public paragraphForm: FormGroup;


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
  constructor(private _downloadDataService: DownloadService, private _fb: FormBuilder) {
  }

  ngOnInit() {
    this.paragraphForm = this._fb.group({
      description: [this.par.description, [Validators.maxLength(250)]]
    });


    if (this.par.imageFilename) {
      this.showImage(this.par.imageFilename);
    }
  }

  /**
   * This Image retrieves the Images from the server via the downloadDataService
   * @param imagePath
   */
  showImage(imagePath: string) {
    this.isImageLoading = true;

    this._downloadDataService.getParagraphImage(imagePath).subscribe(
      data => {

        this.createImageFromBlob(data);
      },
      error => {
      }
    );
  }

  /**
   * This functions converts the given blob to a data url
   * And sets it in the view
   * @param image
   */
  private createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener('load', () => {
      this.image = (reader.result.toString()).split(',')[1];
      this.isImageLoading = false;

    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }


  //------------ PARGRAPH ATTRIBUTEN WIJZIGINGEN ------------

  /**
   *  ngDoCheck: word getriggerd bij wijzigingen aan de lokale variabelen,
   * dus elke keer als de gebruiker iets wijzigt in de .html.
   * Als deze wijzigingen verschillend zijn van de attributen van de lokale pargraaf
   * worden deze de nieuwe waarden van de paragraaf. De paragraaf word dan geëmit om
   * te worden opgeslagen in het page-object
   */
  onChangeDescription() {
    if (this.paragraphForm.valid && (this.paragraphForm.dirty || this.paragraphForm.touched)) {
      this.par.description = this.paragraphForm.value.description;

      this.changedPar.emit(this.par);
    }
  }

  /**
   * This function emits the image and the paragraph to text page creation
   * Text page creation saves the image on the server
   * @param event
   */
  onChangeImage(event: any) {
    let file = event.target.files.item(0);

    this.addImage.emit({
      file: file,
      par: this.par
    });
  }

  //------------ PARAGRAPH WIJZIGINGEN ------------

  /**
   * De paragraph op de startpositie en op de eindpositie worden van plaats verwisselt.
   * De gewijzigde Paragrafen word dan geëmit en toegevoegd aan de Tekst-Pagina.
   * @param direction Toont de richting aan van de verplaatsing.
   * Waarde is altijd "up" of "down".
   */
  changeParPosition(direction) {
    let endPos = this.position;
    (direction == 'up') ? endPos = -1 : endPos = 1;
    this.changedParPos.emit(
      {
        startPos: this.position,
        direction: endPos
      }
    );
  }

  /**
   * De hudige pargraaf word geëmit en word dan verwijderd uit de tekstpagina.
   * Retunt false omdat de methode is gebonden aan een click event van een button.
   * Zonder de false return word de methode niet uitgevoerd.
   */
  removePar(): boolean {
    this.deletePar.emit(this.par.position);
    return false;
  }

}
