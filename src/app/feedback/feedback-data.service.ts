import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Feedback} from '../models/feedback.model';
import {map} from 'rxjs/operators';

@Injectable()
export class FeedbackDataService {

  private readonly _appUrl = '/API/feedback-detail';

  constructor(private http: HttpClient) {
  }

  getFeedback(): Observable<Feedback[]> {
    return this.http
      .get(`${this._appUrl}/feedback`)
      .pipe(
        map((list: any[]) =>
          list.map(
            it => {
              return Feedback.fromJSON(it);
            }
          )
        )
      );
  }

}
