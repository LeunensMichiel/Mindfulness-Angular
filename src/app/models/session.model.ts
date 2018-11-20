import {Exercise} from './exercise.model';
import {GenericCollection, GenericItemWithList} from './GenericCollection.model';

export class Session extends GenericItemWithList {


  constructor(title: string = '', position: number = 0) {
    super(position, title, new GenericCollection());
  }

  static fromJson(json: any) {
    const ses = new Session(
      json.title,
      json.position
    );
    if (json.hasOwnProperty('exercises')) {
      ses.list = new GenericCollection(json.exercises.map(it => {

        return Exercise.fromJson(it);
      }));
    }
    ses.id = json._id;
    return ses;
  }

  toJSON() {
    return {
      exercises: this.list.items.map(exercise => exercise.toJSON()),
      ...super.toJSON()
    };
  }
}
