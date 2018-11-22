import {Paragraph} from './paragraph.model';
import {GenericCollection, GenericItem, GenericItemWithList} from './GenericCollection.model';

export class Page extends GenericItemWithList {
  private _type: TypePage;

  constructor(position: number = 0, title: string = '', type: TypePage = TypePage.INPUT) {
    super(position, title);
    this._type = type;
  }

  get type(): TypePage {
    return this._type;
  }

  set type(value: TypePage) {
    this._type = value;
  }

  static fromJSON(json: any) {
    let page = new Page(json.position, json.title);
    page.id = json._id;
    return page;

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
  private _pathAudio: string;

  constructor(position: number = 0, title: string = '', pathAudio: string = '') {
    super(position, title, TypePage.AUDIO);
    this._pathAudio = pathAudio;
  }

  get pathAudio(): string {
    return this._pathAudio;
  }

  set pathAudio(value: string) {
    this._pathAudio = value;
  }

  toJSON() {
    return {
      path_audio: this._pathAudio,
      ...super.toJSON()
    };
  }

  static fromJSON(json: any): AudioPage {
    let page = new AudioPage(json.position, json.title, json.path_audio);
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
    console.log(page);
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

// export class InputPage extends Page {
//
//   constructor(position: number = 0, title: string: ''
//
// ) {
//   super();
//
// }
//
// toJSON();
// {
//   return {
//     type: 'INPUT',
//     _id: this._id,
//     title: this.title,
//     position: this.position
//   };
// }
//
// fromJSON(json
// :
// any;
// ):
// Page;
// {
//   const page = new InputPage();
//   page._id = json._id;
//   page.position = json.position;
//   page.title = json.title;
//   return page;
// }
//
// }
