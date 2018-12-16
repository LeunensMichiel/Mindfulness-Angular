import {Component, OnInit, Input, Output, EventEmitter, Inject} from '@angular/core';
import {Session} from '../../models/session.model';
import {Exercise} from '../../models/exercise.model';
import {SessieDataService} from '../sessie-data.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig, MatSnackBar} from '@angular/material';
import {DownloadService} from '../../download.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { httpInterceptorProviders } from 'src/app/http-interceptors';

export interface DialogData {
  sessionId: string;
  sessionName: string;
}

@Component({
  selector: 'app-sessie',
  templateUrl: './sessie.component.html',
  styleUrls: ['./sessie.component.css']
})
export class SessieComponent implements OnInit {
  @Input() public session: Session;
  @Input() public url: string;
  public isImageLoading: Boolean = true;
  public image: any;
  @Output() public deleteSession = new EventEmitter<Session>();
  @Output() public modifySession = new EventEmitter<Session>();
  public imageUrl: string;
  sessionId: string;
  sessionName: string;

  constructor(public dialog: MatDialog, private _sessionDataService: SessieDataService, private _downloadService: DownloadService, public snackBar: MatSnackBar) {
    // let random = Math.floor(Math.random() * (14 - 1) + 1);
    // this.url = `assets/images/sessie-${random}.jpg`;

    this.url = `assets/images/placeholder-image.png`;

  }

  ngOnInit() {
    if (this.session.imageFilename) {
      this.showImage(this.session.imageFilename);
      this.isImageLoading = true;
    }
  }

  removeSession() {
    this.deleteSession.emit(this.session);
  }


  editSession() {
    const modifyCourseDialogConfig = new MatDialogConfig();

    modifyCourseDialogConfig.data = this.session;

    const modifyCourseDialoRef = this.dialog.open(SessieModifyComponent, modifyCourseDialogConfig);

    /*
    *after the dialog is closed it checks if the image is changed, to call the right api call
    */

    modifyCourseDialoRef.afterClosed().subscribe(result => {
      if (result) {
        this.session.title = result.title;
        this.session.description = result.description;
        this.session.file = result.image;
        if(result.image == null)
        {
          this._sessionDataService.editSession(this.session).subscribe(
            () => {

            },
            (error: HttpErrorResponse) => {
              this.snackBar.open(`Error ${error.status} while editing session for ${
                  this.session.title
                  }: ${error.error}`, '',
                {
                  duration: 10000,
                });
            }
          )
        }else{
          this._sessionDataService.editSessionWithImage(this.session).subscribe(
            sessionResult => {
              if(sessionResult instanceof HttpResponse){
                this.showImage(Session.fromJSON(sessionResult.body).imageFilename);
              }
            },
            (error: HttpErrorResponse) => {
              this.snackBar.open(`Error ${error.status} while editing session for ${
                  this.session.title
                  }: ${error.error}`, '',
                {
                  duration: 10000,
                });
            }
          );
          
        }

      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(QrDialog, {
      width: '250px',
      data: {sessionId: this.session.id, sessionName: this.session.title}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  showImage(imagePath: string) {
    this.isImageLoading = true;

    this._downloadService.getSessionImage(imagePath).subscribe(
      data => {

        this.createImageFromBlob(data);
      },
      error => {
        this.isImageLoading = true;
      }
    );
  }

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


}

/*
* This dialog generates a qr-code for the session title
*/

@Component({
  selector: 'qr-dialog',
  templateUrl: 'qr-dialog.html',
})
export class QrDialog implements OnInit {
  sessionId = this.data.sessionId;
  sessionName = this.data.sessionName;
  dialog: any;
  _sessionDataService: any;
  snackBar: any;

  constructor(
    public dialogRef: MatDialogRef<QrDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) {
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  /*
  *This function downloads the generated qr-code
  */

  onDownloadClick(): void {
    this.downloadUrl(document.getElementsByClassName('qrcode').item(0).getElementsByTagName('img').item(0).src, this.sessionName.replace(' ', '_'));
  }

  /*
  * this function creates a invisible download link en automaticly downloads the qr-code
  */
  downloadUrl(url: string, fileName: string) {
    let a: any = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.style = 'display: none';
    a.click();
    a.remove();
  };

}

/*
*Changes session titile, session description and session image
*/

  @Component({
    selector: 'dialog-modify-sessie',
    templateUrl: 'dialog-modify-sessie.html',
  })
  export class SessieModifyComponent {
  
    selectedFiles: FileList;
  
    form: FormGroup;
  
    constructor(
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<SessieModifyComponent>,
      @Inject(MAT_DIALOG_DATA) session:Session) {
  
        this.form = fb.group({
          title: [session.title, [Validators.maxLength(50), Validators.required ]],
          description: [session.description, [Validators.maxLength(100), Validators.required ]],
          image:[]
      });
    }
  
    selectFile(event) {
      this.selectedFiles = event.target.files;
      console.log(event.target.files);
      this.form.value.image = this.selectedFiles.item(0);
      
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    save() {
      
      this.dialogRef.close(this.form.value);
      
    }
  }

