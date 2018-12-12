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
        console.log(error);
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

}
