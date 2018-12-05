import {GenericItem} from './GenericCollection.model';

export enum TypeParagraph {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE'
}

export class Paragraph extends GenericItem {
  private _description: string;
  private _type: TypeParagraph;
  private _imageFilename: string;

  constructor(position: number = 0, type: TypeParagraph = TypeParagraph.TEXT, description: string = '', imageFilename: string = undefined) {
    super(position);
    this._description = description;
    this._type = type;
    this._imageFilename = imageFilename;
  }


  get imageFilename(): string {
    return this._imageFilename;
  }

  set imageFilename(value: string) {
    this._imageFilename = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get type(): TypeParagraph {
    return this._type;
  }

  set type(value: TypeParagraph) {
    this._type = value;
  }

  convertType(): string {
    switch (this.type) {
      case TypeParagraph.IMAGE:
        return 'IMAGE';

      case TypeParagraph.TEXT:
        return 'TEXT';
    }
  }

  static fromJSON(json: any): Paragraph {
    let type;
    switch (json.form_type) {
      case 'TEXT':
        type = TypeParagraph.TEXT;
        break;
      case 'IMAGE':
        type = TypeParagraph.IMAGE;
    }


    let par = new Paragraph(json.position, type, json.description, json.image_filename);
    par.id = json._id;

    return par;
  }

  toJSON() {

    return {
      description: this._description,
      form_type: this.convertType(),
      image_filename: this.imageFilename,
      ...super.toJSON()
    };
  }


}
