import { Pipe, PipeTransform } from '@angular/core';
import {Feedback} from '../models/feedback.model';

@Pipe({
  name: 'feedbackFilter'
})
export class FeedbackPipePipe implements PipeTransform {
  /**
   * This functions filters the given feedback array using the sessionTitle
   * @param feedback (Feedback array)
   * @param sessionTitle
   */
  transform(feedback: Feedback[], sessionTitle: string): Feedback[] {
    // If the sessionTitle is empty or length 0
    // returns the feedback array without filtering
    if (!sessionTitle || sessionTitle.length === 0) {
      return feedback;
    }
    return feedback.filter(
      feedback => feedback.session.title && feedback.session.title.toLowerCase().includes(sessionTitle.toLowerCase())
    );  }

}
