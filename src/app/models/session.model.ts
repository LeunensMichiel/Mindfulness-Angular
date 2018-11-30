import {Exercise} from './exercise.model';
import {GenericCollection, GenericItemWithList} from './GenericCollection.model';

export class Session extends GenericItemWithList {
  private _file : File;
  private _imageName: string;

  constructor(title: string = '', position: number = 0, pathImage: string = undefined, file: File = undefined) {
    super(position, title, new GenericCollection());
    this.file = file;
    this._imageName = pathImage;
  }


  get imageName(): string {
    return this._imageName;
  }

  set imageName(value: string) {
    this._imageName = value;
  }

  get file(): File {
    return this._file;
  }

  set file(value: File) {
    this._file = value;
  }

  static fromJSON(json: any) {
    const ses = new Session(
      json.title,
      json.position,
      json.path_image
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
      image_name: this.imageName,
      exercises: this.list.items.map(exercise => exercise.toJSON()),
      ...super.toJSON()
    };
  }
}
