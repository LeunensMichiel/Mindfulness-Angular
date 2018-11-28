import {Component, OnInit, Input, Output, EventEmitter, Inject} from '@angular/core';
import { Session } from '../../models/session.model';
import { Exercise } from '../../models/exercise.model';
import { SessieDataService } from '../sessie-data.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DownloadService} from '../../download.service';

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
  sessionId : string;
  sessionName : string;

  constructor(public dialog: MatDialog, private _downloadService: DownloadService) {
    let random =  Math.floor(Math.random() * (14 - 1) + 1);
    this.url = `assets/images/sessie-${random}.jpg`;

  }

  ngOnInit() {
    if (this.session.pathImage) {
      this.showImage(this.session.pathImage);
      this.isImageLoading = true;
    }
  }

  removeSession() {
    this.deleteSession.emit(this.session);
  }

  editSession() {
    this.modifySession.emit(this.session);
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

    this._downloadService.getFile(imagePath).subscribe(
      data => {
        this.createImageFromBlob(data);
      },
      error => {
        this.isImageLoading = true;
        console.log(error);
      }
    );
  }

  private createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.image = (reader.result.toString()).split(',')[1];
      this.isImageLoading = false;

    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }


}

@Component({
  selector: 'qr-dialog',
  templateUrl: 'qr-dialog.html',
})
export class QrDialog implements OnInit{
  sessionId = this.data.sessionId;
  sessionName = this.data.sessionName;

  constructor(
    public dialogRef: MatDialogRef<QrDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) {
    }

    ngOnInit(){
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDownloadClick():void{
    this.downloadUrl(document.getElementsByClassName("qrcode").item(0).getElementsByTagName("img").item(0).src, this.sessionName.replace(" ", "_"));
    console.log(document.getElementsByClassName("qrcode").item(0).getElementsByTagName("img").item(0).src)
  }

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
