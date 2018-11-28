import {GenericItem} from './GenericCollection.model';

export enum TypeParagraph {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE'
}

export class Paragraph extends GenericItem {
  private _description: string;
  private _type: TypeParagraph;
  private _pathName: string;

  constructor(position: number = 0, type: TypeParagraph = TypeParagraph.TEXT, description: string = '', pathName: string = undefined) {
    super(position);
    this._description = description;
    this._type = type;
    this._pathName = pathName;
  }


  get pathName(): string {
    return this._pathName;
  }

  set pathName(value: string) {
    this._pathName = value;
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
    let type = undefined;
    switch (type) {
      case 'TEXT':
        type = TypeParagraph.TEXT;
        break;
      case 'IMAGE':
        type = TypeParagraph.IMAGE;
    }


    let par = new Paragraph(json.position, type, json.description, json.path_name);
    par.id = json._id;

    return par;
  }

  toJSON() {

    return {
      description: this._description,
      form_type: this.convertType(),
      path_name: this.pathName,
      ...super.toJSON()
    };
  }


}
