import {Component, Input, OnInit} from '@angular/core';
import {Paragraph} from '../../models/paragraph.model';
import {DownloadService} from '../../download.service';

@Component({
  selector: 'paragraph-detail',
  templateUrl: './paragraph-detail.component.html',
  styleUrls: ['./paragraph-detail.component.css']
})
export class ParagraphDetailComponent implements OnInit {
  @Input() paragraph: Paragraph;
  public isImageLoading: Boolean = true;
  public image: any;
  public contentImage: any;

  constructor(private _downloadDataService: DownloadService) { }

  ngOnInit() {
    this.paragraph.description;

    if (this.paragraph.imageFilename) {
      this.showImage(this.paragraph.imageFilename);
    }
  }

  showImage(imagePath: string) {
    this.isImageLoading = true;

    this._downloadDataService.getParagraphImage(imagePath).subscribe(
      data => {

        this.createImageFromBlob(data);
      },
      error => {
        console.log(error);
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
