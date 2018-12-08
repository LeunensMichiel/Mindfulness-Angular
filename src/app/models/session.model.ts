import {Exercise} from './exercise.model';
import {GenericCollection, GenericItemWithList} from './GenericCollection.model';

export class Session extends GenericItemWithList {
  private _file : File;
  private _imageFilename: string;
  private _description: string;

  constructor(title: string = '', position: number = 0, imageFilename: string = undefined, file: File = undefined, description: string = '') {
    super(position, title, new GenericCollection());
    this.file = file;
    this._imageFilename = imageFilename;
    this._description = description;
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

  get description(): string{
    return this._description;
  }

  set description(value: string){
    this._description = value;
  }

  static fromJSON(json: any) {
    const ses = new Session(
      json.title,
      json.position,
      json.image_filename,
      json.description
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
      description: this._description,
      exercises: this.list.items.map(exercise => exercise.toJSON()),
      ...super.toJSON()
    };
  }
}
