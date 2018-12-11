import {Component, OnInit} from '@angular/core';
import {FeedbackDataService} from '../feedback-data.service';
import {Feedback} from '../../models/feedback.model';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

@Component({
  selector: 'feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {
  private _feedbacks: Feedback[];
  private errorMsg: string;
  public filterFeedbackSessionTitle: string;
  public filterFeedback$ = new Subject<string>();

  constructor(private _feedbackDataService: FeedbackDataService) {
    this.filterFeedback$
      .pipe(
        distinctUntilChanged(),
        debounceTime(400),
        map(val => val.toLowerCase())
      )
      .subscribe(val => (this.filterFeedbackSessionTitle = val));
  }

  ngOnInit(): void {
    this._feedbackDataService.getFeedback().subscribe(
      feedbacks => {
        this._feedbacks = feedbacks;
      }
    );
  }


  get feedbacks(): Feedback[] {
    return this._feedbacks;
  }
}
