import { Injectable } from '@angular/core';
import { HttpRequest, HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  public upload(file: File) {
    console.log(file);
    this.http
      .post( '/files/upload/', file)
      .pipe();
    /* const status = {};
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const req = new HttpRequest('POST', '/files/image', formData, {
      reportProgress: true
    });

    const progress = new Subject<number>();
    console.log("check");
    let startTime = new Date().getTime();
    this.http.request(req).subscribe(event => {
      console.log(event);
      if (event.type === HttpEventType.UploadProgress) {
        // calculate the progress percentage

        const percentDone = Math.round((100 * event.loaded) / event.total);
        // pass the percentage into the progress-stream
        progress.next(percentDone);
      } else if (event instanceof HttpResponse) {
        // Close the progress-stream if we get an answer form the API
        // The upload is complete
        progress.complete();
      }
    });

    // Save every progress-observable in a map of all observables
    status[file.name] = {
      progress: progress.asObservable()
    }; */
  }
}
