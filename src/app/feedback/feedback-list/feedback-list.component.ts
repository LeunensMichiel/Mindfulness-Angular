import { Component, OnInit } from '@angular/core';
import {FeedbackDataService} from '../feedback-data.service';
import {Feedback} from '../../models/feedback.model';

@Component({
  selector: 'feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {
  private _feedbacks: Feedback[];
  private errorMsg: string;

  constructor(private _feedbackDataService: FeedbackDataService) { }

  ngOnInit(): void{
    this._feedbackDataService.getFeedback().subscribe(
      feedbacks => {
        this._feedbacks = feedbacks;
      }
    )
  }


  get feedbacks(): Feedback[] {
    return this._feedbacks;
  }
}
