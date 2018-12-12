import {Page, TextPage, AudioPage, TypePage, InputPage} from './page.model';
import {GenericCollection, GenericItem, GenericItemWithList} from './GenericCollection.model';

/**
 * This class extends GenericItemWithList
 * It is used as list item in Session
 */
export class Exercise extends GenericItemWithList {


  constructor(title: string = '', position: number = 0) {
    super(position, title, new GenericCollection());
  }

  /**
   * This function returns a Exercise
   * @param json
   */
  static fromJson(json: any): Exercise {
    const ex = new Exercise(json.title, json.position);
    if (json.hasOwnProperty('pages')) {
      ex.list = new GenericCollection();
      json.pages.forEach(it => {
        let page;

        /**
         * Here we check what kind of page the it variable is.
         * There are 3 types of pages [TEXT, INPUT, AUDIO]
         */
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
