import {Exercise} from './exercise.model';
import {GenericCollection, GenericItemWithList} from './GenericCollection.model';

export class Session extends GenericItemWithList {
  private _file : File;
  private _imageFilename: string;

  constructor(title: string = '', position: number = 0, imageFilename: string = undefined, file: File = undefined) {
    super(position, title, new GenericCollection());
    this.file = file;
    this._imageFilename = imageFilename;
  }


  get imageFilename(): string {
    return this._imageFilename;
  }

  set imageFilename(value: string) {
    this._imageFilename = value;
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
      json.image_filename
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
      image_filename: this.imageFilename,
      exercises: this.list.items.map(exercise => exercise.toJSON()),
      ...super.toJSON()
    };
  }
}
