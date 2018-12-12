import { Component, OnInit, Input, OnChanges, SimpleChanges, DoCheck, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { AudioPage, Page } from 'src/app/models/page.model';
import { MatSnackBar } from '@angular/material';
import { UploadService } from '../../upload.service';
import {PageDataService} from '../../page-data.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-audio-pagina-creatie',
  templateUrl: './audio-pagina-creatie.component.html',
  styleUrls: ['./audio-pagina-creatie.component.css']
})
export class AudioPaginaCreatieComponent implements OnInit {
  /**
   * Article we used for file upload:
   *
   * Sauce: https://grokonez.com/frontend/angular/angular-6/angular-6-upload-files-download-files-to-node-js-restapis-server-express-multer-bootstrap
   */


  /**
   * VARIABELEN:
   * changedpage: de emitter die de gewijzigde page naar page-creatie stuurt.
   * Die op zijn beurt naar de page-creatielijst stuurt waar ze dan word opgeslaan
   * in de databank
   */
  @Input() audioPage:AudioPage;
  @Output() changedPage = new EventEmitter<Page>();
  @Output() onFileAddedToPage = new EventEmitter<Page>();
  @ViewChild('fileInput') fileInputRef: ElementRef;
  pathAudio: string = "";
  audioFile: File;
  audio:any;
  playing = false;
  audioCurrentTime = 0;
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: {percentage: number} = {percentage: 0};

  /**
   * GIDS:
   * page-creatie-lijst |
   *                      | page-creatie |
   *                                       | audio-page-creatie
   */

  constructor(private _pageDataService: PageDataService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.pathAudio = this.audioPage.audioFilename;

  }

  //================== METHODES ==================

  //------------ AUDIOPAGE ATTRIBUTEN WIJZIGINGEN ------------

  selectFile(event) {
    this.selectedFiles = event.target.files;

    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);

    this._pageDataService.updatePageWithFile(this.audioPage, this.currentFileUpload).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          let page = AudioPage.fromJSON(event.body);
          this.pathAudio = page.audioFilename;
          this.onFileAddedToPage.emit(page);
          this.currentFileUpload = undefined;
        } else {
          this.snackBar.open('File upload was unsuccesvol', '', {
            duration: 3000,
          });
        }

      });
    this.selectedFiles = undefined;
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
      console.log(e);
      this.audio = new Audio(reader.result.toString());
      this.audio.currentTime = this.audioCurrentTime;
      this.audio.play();
    };
    reader.readAsDataURL(this.fileInputRef.nativeElement.files[0]);
  }

  pauseAudio(){
    this.playing = false;
    this.audioCurrentTime = this.audio.currentTime;
    this.audio.pause();
  }
}
