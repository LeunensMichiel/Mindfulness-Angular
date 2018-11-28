import {Component, Input, OnInit} from '@angular/core';
import {Feedback} from '../../models/feedback.model';

@Component({
  selector: 'feedback',
  templateUrl: './feedback-detail.component.html',
  styleUrls: ['./feedback-detail.component.css']
})
export class FeedbackDetailComponent implements OnInit {
  @Input() public feedback: Feedback;

  constructor() { }

  ngOnInit() {
  }

}
