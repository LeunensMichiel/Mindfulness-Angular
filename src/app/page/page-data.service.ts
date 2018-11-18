import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Exercise} from '../models/exercise.model';
import {Page, TextPage, AudioPage, InputPage} from '../models/page.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PageDataService {

  private readonly _appUrl = '/API/page';

  constructor(private http: HttpClient) {
  }


  addPageToExercise(exerciseId: String, page: Page): Observable<Page> {
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
    return this.http
      .put(`${this._appUrl}/page/${page._id}`, page)
      .pipe(map(
        it => {
          return this.filterJson(it);
        }
      ));
  }

  filterJson(json: any) {
    if ('items' in json) {
      return new TextPage().fromJson(json);
    } else if ('fileUrl' in json) {
      return new AudioPage().fromJson(json);
    } else {
      return new InputPage().fromJson(json);
    }
    return null;
  }
}
