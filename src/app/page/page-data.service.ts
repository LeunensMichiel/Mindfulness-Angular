import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page, TextPage, AudioPage, TypePage} from '../models/page.model';
import {map} from 'rxjs/operators';

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

  updatePage(page: Page) {
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

  private filterJson(json: any) {
    switch (json.type) {
      case TypePage.TEXT: {
        return TextPage.fromJSON(json);
      }
      case TypePage.AUDIO: {
        return AudioPage.fromJSON(json);
      }
      case TypePage.INPUT: {
        return Page.fromJSON(json);
      }
    }

    return null;
  }
}
