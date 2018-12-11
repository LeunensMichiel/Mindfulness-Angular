import { Pipe, PipeTransform } from '@angular/core';
import {Feedback} from '../models/feedback.model';

@Pipe({
  name: 'feedbackFilter'
})
export class FeedbackPipePipe implements PipeTransform {

  transform(feedback: Feedback[], sessionTitle: string): Feedback[] {
    if (!sessionTitle || sessionTitle.length === 0) {
      return feedback;
    }
    return feedback.filter(
      feedback => feedback.session.title && feedback.session.title.toLowerCase().includes(sessionTitle.toLowerCase())
    );  }

}
