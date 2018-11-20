import { Component, OnInit, Input, OnChanges, SimpleChanges, DoCheck, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { AudioPage, Page } from 'src/app/models/page.model';
import { MatSnackBar } from '@angular/material';
import { UploadService } from '../../upload.service';

@Component({
  selector: 'app-audio-pagina-creatie',
  templateUrl: './audio-pagina-creatie.component.html',
  styleUrls: ['./audio-pagina-creatie.component.css']
})
export class AudioPaginaCreatieComponent implements OnInit, DoCheck {
  /**
   * VARIABELEN:
   * changedpage: de emitter die de gewijzigde page naar page-creatie stuurt.
   * Die op zijn beurt naar de page-creatielijst stuurt waar ze dan word opgeslaan
   * in de databank
   */
  @Input() audioPage:AudioPage;
  @Output() changedPage = new EventEmitter<Page>();
  @ViewChild('fileInput') fileInputRef: ElementRef
  title: string = "";
  fileUrl: string = "";
  audioFile: File;
  audio:any;
  playing = false;
  audioCurrentTime = 0;
  /**
   * GIDS:
   * page-creatie-lijst |
   *                      | page-creatie |
   *                                       | audio-page-creatie
   */

  constructor(private _uploadDataService: UploadService) { }

  ngOnInit() {
    this.title = this.audioPage.title;
    this.fileUrl = this.audioPage.fileUrl;

  }

  //================== METHODES ==================

  //------------ AUDIOPAGE ATTRIBUTEN WIJZIGINGEN ------------

  /**
   * METHODES:
   * ngDoCheck: word getriggerd bij wijzigingen aan de lokale variabelen,
   * dus elke keer als de gebruiker iets wijzigt in de .html.
   * Als deze wijzigingen verschillend zijn van de attributen van de lokale page
   * worden deze de nieuwe waarden van de page. De page word dan geëmit om
   * te worden opgeslagen in het exercise-object
   */
  ngDoCheck(): void {
    if (this.audioPage.title != this.title || this.audioPage.fileUrl != this.fileUrl){
      this.audioPage.title = this.title;
      this.audioPage.fileUrl = this.fileUrl;
      this.changedPage.emit(this.audioPage);
      this._uploadDataService.upload(this.fileInputRef.nativeElement.files[0]);
      this.resetAudio();
      console.log(this.fileUrl)
      console.log("AUDIOPAGE ON POSITION " + this.audioPage.position + " CHANGED.");
    }
  } 

  resetAudio(){
    this.playing = false;
    if(this.audio != null)
      this.audio.pause();
    this.audio = null;
  }

  playAudio(){
    this.playing = true;
    var reader = new FileReader();
    reader.onload = (e) => {
      console.log(e)
      this.audio = new Audio(reader.result.toString());
      this.audio.currentTime = this.audioCurrentTime;
      this.audio.play();
    }
    reader.readAsDataURL(this.fileInputRef.nativeElement.files[0]);
  }

  pauseAudio(){
    this.playing = false;
    this.audioCurrentTime = this.audio.currentTime;
    this.audio.pause();
  }
}
