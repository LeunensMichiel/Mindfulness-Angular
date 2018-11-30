import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType, HttpRequest} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {AudioPage, InputPage, Page, TextPage} from '../models/page.model';
import {map} from 'rxjs/operators';
import {formatDate} from '@angular/common';
import {Paragraph} from '../models/paragraph.model';

@Injectable({
  providedIn: 'root'
})
export class PageDataService {

  private readonly _appUrl = '/API/page';

  constructor(private http: HttpClient) {
  }


  addPageToExercise(exerciseId: String, page: Page): Observable<Page> {
    console.log(page);
    const pageJson = page.toJSON();
    return this.http
      .post(`${this._appUrl}/page`, {...pageJson, exercise_id: exerciseId})
      .pipe(
        map(it => {
            return this.filterJson(it);
          }
        )
      );
  }





  removePage(page_id: String) {
    return this.http
      .delete(`${this._appUrl}/page/${page_id}`)
      .pipe(map(it => {
        console.log(it);
      }));
  }

  updatePage(page: Page): Observable<Page> {
    console.log(page);
    console.log(page.toJSON());
    return this.http
      .put(`${this._appUrl}/page/${page.id}`, page)
      .pipe(map(
        it => {
          return this.filterJson(it);
        }
      ));
  }

  updatePageWithFile(page: Page, file: File): Observable<HttpEvent<{}>> {
    const formData: FormData = new FormData();

    formData.append('page_file', file);
    formData.append('updated_page', JSON.stringify(page.toJSON()));

    const req = new HttpRequest('PUT', `${this._appUrl}/pagefile/${page.id}`, formData, {
      reportProgress: true
    });

    return this.http.request(req);

  }

  updatePageParagraphFile(page: Page, paragraph: Paragraph, file: File): Observable<HttpEvent<{}>> {
    const formData: FormData = new FormData();

    formData.append('page_file', file);
    formData.append('page_id', page.id);
    formData.append('par_pos', paragraph.position.toString());

    const req = new HttpRequest('PUT', `${this._appUrl}/pagefileparagraph/${page.id}`, formData, {
      reportProgress: true
    });

    return this.http.request(req);
  }

 private filterJson(json: any) : Page{
    switch (json.type) {
      case "TEXT": {
        return TextPage.fromJSON(json);
      }
      case "AUDIO": {
        return AudioPage.fromJSON(json);
      }
      case "INPUT": {
        return InputPage.fromJSON(json);
      }
    }

    return null;
  }
}
