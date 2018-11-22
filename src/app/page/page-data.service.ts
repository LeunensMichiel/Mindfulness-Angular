import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType, HttpRequest} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {AudioPage, Page, TextPage} from '../models/page.model';
import {map} from 'rxjs/operators';
import {formatDate} from '@angular/common';

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
    const formdata: FormData = new FormData();

    formdata.append('page_file', file);
    formdata.append('updated_page', JSON.stringify(page.toJSON()));

    const req = new HttpRequest('PUT', `${this._appUrl}/pagefile/${page.id}`, formdata, {
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
        return Page.fromJSON(json);
      }
    }

    return null;
  }
}
