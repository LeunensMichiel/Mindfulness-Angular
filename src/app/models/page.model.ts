import {Paragraph} from './paragraph.model';
import {GenericCollection, GenericItem, GenericItemWithList} from './GenericCollection.model';

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

  // static fromJSON(json: any) {
  //   let page = new Page(json.position, json.title);
  //   page.id = json._id;
  //   return page;
  //
  // }

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
  PICTURE,
  MULTIPLE_CHOICE
}

export class InputPage extends Page {
  private _typeInput: TypeInputPage;

  constructor(position: number = 0, title: string = '', typeInput: TypeInputPage = undefined) {
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
      case 'PICTURE': {
        return TypeInputPage.PICTURE;
      }
      case 'MULTIPLE_CHOICE': {
        return TypeInputPage.MULTIPLE_CHOICE;
      }
    }

    return null;
  }


  toJSON() {
    return {
      type: 'INPUT',
      _id: this.id,
      title: this.title,
      position: this.position,
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
            return MultipleChoiceItem.fromJSON(it);
          }
        ));
      }
    }
    return page;
  }


}

export class MultipleChoiceItem extends GenericItem {

  constructor(position: number = 0, message: string = '') {
    super(position, message);
  }

  get message(): string {
    return this.title;
  }

  set message(message: string) {
    this.title = message;
  }

  static fromJSON(json: any): MultipleChoiceItem {
    let multipleChoiceItem = new MultipleChoiceItem(json.position, json.message);

    multipleChoiceItem.id = json._id;

    return multipleChoiceItem;
  }

  toJSON() {
    return {
      message: this.message,
      ...super.toJSON()
    };
  }

}


