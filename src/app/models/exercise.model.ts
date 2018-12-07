import {Page, TextPage, AudioPage, TypePage, InputPage} from './page.model';
import {GenericCollection, GenericItem, GenericItemWithList} from './GenericCollection.model';

export class Exercise extends GenericItemWithList {


  constructor(title: string = '', position: number = 0) {
    super(position, title, new GenericCollection());
  }

  static fromJson(json: any): Exercise {
    const ex = new Exercise(json.title, json.position);
    if (json.hasOwnProperty('pages')) {
      ex.list = new GenericCollection();
      json.pages.forEach(it => {
        let page;
        if (typeof it != 'string') {
          switch (it.type) {
            case 'TEXT':
              page = TextPage.fromJSON(it);
              break;
            case 'AUDIO':
              page = AudioPage.fromJSON(it);
              break;
            case 'INPUT':
              page = InputPage.fromJSON(it);
              break;
          }
          ex.list.setItem(page);
        }
      });
    }

    ex.id = json._id;
    return ex;
  }


  toJSON() {
    return {
      pages: this.list.items.map(page => page.toJSON()),
      ...super.toJSON()
    };
  }
}
