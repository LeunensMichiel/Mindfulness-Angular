import {Page, TextPage, AudioPage, TypePage} from './page.model';
import {GenericCollection, GenericItem, GenericItemWithList} from './GenericCollection.model';

export class Exercise extends GenericItemWithList {


  constructor(title: string = '', position: number = 0) {
    super(position, title, new GenericCollection());
  }

  static fromJson(json: any): Exercise {
    const ex = new Exercise(json.title, json.position);
    if (json.hasOwnProperty('pages')) {
      ex.list = new GenericCollection(json.pages.map(it => {
        if (typeof it != 'string') {
          switch (it.type) {
            case 'TEXT':
              return TextPage.fromJSON(it);
            case 'AUDIO':
              return AudioPage.fromJSON(it);
            case 'INPUT':
              return Page.fromJSON(it);
          }
        }
      }));
    }

    ex.id = json._id;
    console.log(ex);
    return ex;
  }


  toJSON() {
    return {
      pages: this.list.items.map(page => page.toJSON()),
      ...super.toJSON()
    };
  }
}
