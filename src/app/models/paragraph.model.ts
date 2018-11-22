import {GenericItem} from './GenericCollection.model';

export enum TypeParagraph {
  TEXT ,
  IMAGE
}

export class Paragraph extends GenericItem {
  private _description: string;
  private _type: TypeParagraph;

  constructor(position: number = 0, type: TypeParagraph = TypeParagraph.TEXT, description: string = '') {
    super(position);
    this._description = description;
    this._type = type;
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

  static fromJSON(json: any): Paragraph {
    let type = undefined;
    switch (type) {
      case "TEXT":
        type = TypeParagraph.TEXT;
        break;
      case "IMAGE":
        type = TypeParagraph.IMAGE;
    }


    return  new Paragraph(json.position, type, json.description);
  }

  toJSON() {

    return {
      description: this._description,
      form_type: TypeParagraph[this.type],
      ...super.toJSON()
    };
  }


}
