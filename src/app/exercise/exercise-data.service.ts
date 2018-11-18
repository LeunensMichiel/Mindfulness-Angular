import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Exercise} from '../models/exercise.model';
import {Page} from '../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class ExerciseDataService {
  private readonly _appUrl = '/API/exercise';

  constructor(private http: HttpClient) {
  }

  removeExercise(ses: Exercise): Observable<Exercise> {
    return this.http
      .delete(`${this._appUrl}/exercise/${ses.id}`)
      .pipe(map((result: any) => {
        return Exercise.fromJson(result);
      }));
  }

  updateExercise(exercise: Exercise) {
    return this.http
      .put(`${this._appUrl}/exercise/${exercise.id}`, exercise)
      .pipe(
        map((result: any) => {
          return Exercise.fromJson(result);
        })
      );
  }

  addExerciseToSession(exercise: Exercise, sessionId: String): Observable<Exercise> {
    const theUrl = `${this._appUrl}/exercise`;
    const exerciseJson = exercise.toJSON();
    return this.http.post(theUrl, {...exerciseJson, session_id: sessionId}).pipe(
      map((result: any) => {
        return Exercise.fromJson(result);
      }));
  }

  getExercise(id: string): Observable<Exercise> {
    return this.http
      .get(`${this._appUrl}/exercise/${id}`)
      .pipe(
        map((result: any) => {
            return Exercise.fromJson(result);
          }
        )
      );
  }
}
