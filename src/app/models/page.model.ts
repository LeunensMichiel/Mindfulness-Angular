import {Paragraph, TypeParagraph} from './paragraph.model';
import {GenericCollection, GenericItem, GenericItemWithList} from './GenericCollection.model';
import {CheckListItem} from './CheckListItem';

export class Page extends GenericItemWithList {
  private _type: TypePage;

  constructor(position: number = 0, title: string = '', type: TypePage) {
    super(position, title);
    this._type = type;
  }

  get type(): TypePage {
    return this._type;
  }

  set type(value: TypePage) {
    this._type = value;
  }


  toJSON() {
    return {
      type: TypePage[this.type],
      ...super.toJSON()
    };
  }

  toString(): string {
    return TypePage[this.type];
  }


}

export enum TypePage {
  AUDIO,
  INPUT,
  TEXT
}

export class AudioPage extends Page {
  private _audioFilename: string;

  constructor(position: number = 0, title: string = '', audioFilename: string = '') {
    super(position, title, TypePage.AUDIO);
    this._audioFilename = audioFilename;
  }

  get audioFilename(): string {
    return this._audioFilename;
  }

  set audioFilename(value: string) {
    this._audioFilename = value;
  }

  toJSON() {
    return {
      audio_filename: this._audioFilename,
      ...super.toJSON()
    };
  }

  static fromJSON(json: any): AudioPage {
    let page = new AudioPage(json.position, json.title, json.audio_filename);
    page.id = json._id;
    return page;
  }


}

export class TextPage extends Page {


  constructor(position: number = 0, title: string = '') {
    super(position, title, TypePage.TEXT);
  }

  toJSON() {

    return {
      ...super.toJSON(),
      paragraphs: this.list.items.map(it => {
        let par = it as Paragraph;
        return par.toJSON();
      })
    };
  }

  static fromJSON(json: any): Page {
    let page = new TextPage(json.position, json.title);
    page.id = json._id;
    if (json.hasOwnProperty('paragraphs')) {
      if (json.paragraphs.length !== 0) {
        page.list = new GenericCollection(json.paragraphs.map(it => {
          return Paragraph.fromJSON(it);
        }));
      }

    }
    return page;
  }


}

export enum TypeInputPage {
  TEXT,
  IMAGE,
  MULTIPLE_CHOICE,
  EMPTY
}

export class InputPage extends Page {
  private _typeInput: TypeInputPage;

  constructor(position: number = 0, title: string = '', typeInput: TypeInputPage = TypeInputPage.EMPTY) {
    super(position, title, TypePage.INPUT);
    this.typeInput = typeInput;
  }


  get typeInput(): TypeInputPage {
    return this._typeInput;
  }

  set typeInput(value: TypeInputPage) {
    this._typeInput = value;
  }

  static filterInputPage(typeString: string): TypeInputPage {
    switch (typeString) {
      case 'TEXT': {
        return TypeInputPage.TEXT;
      }
      case 'IMAGE': {
        return TypeInputPage.IMAGE;
      }
      case 'MULTIPLE_CHOICE': {
        return TypeInputPage.MULTIPLE_CHOICE;
      }
      case 'EMPTY': {
        return TypeInputPage.EMPTY;
      }
    }

  }

  convertType(): string {
    switch (this.typeInput) {
      case TypeInputPage.IMAGE:
        return 'IMAGE';
      case TypeInputPage.TEXT:
        return 'TEXT';
      case TypeInputPage.MULTIPLE_CHOICE:
        return 'MULTIPLE_CHOICE';
      case TypeInputPage.EMPTY:
        return 'EMPTY';
    }
  }

  toJSON() {
    return {
      type_input: this.convertType(),
      position: this.position,
      multiple_choice_items: this.list.items.map(it => {
        let item = it as CheckListItem;
        return item.toJSON();
      }),
      ...super.toJSON()
    };
  }

  static fromJSON(json: any): Page {
    const page = new InputPage(json.position, json.title, InputPage.filterInputPage(json.type_input));
    page.id = json._id;

    if (json.hasOwnProperty('multiple_choice_items') && page.typeInput === TypeInputPage.MULTIPLE_CHOICE) {
      if (json.multiple_choice_items.length !== 0) {
        page.list = new GenericCollection(json.multiple_choice_items.map(
          it => {
            return CheckListItem.fromJSON(it);
          }
        ));
      }
    }
    return page;
  }


}




