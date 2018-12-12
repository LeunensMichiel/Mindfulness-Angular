import {GenericItem} from './GenericCollection.model';

/**
 * This class contains a description of a checklistitem and extends from genericItem
 */
export class CheckListItem extends GenericItem {

  constructor(position: number = 0, message: string = '') {
    super(position, message);
  }

  get message(): string {
    return this.title;
  }

  set message(message: string) {
    this.title = message;
  }

  static fromJSON(json: any): CheckListItem {
    let multipleChoiceItem = new CheckListItem(json.position, json.message);

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
