import {Cmd, TypeCmd} from './command.model';
import {GenericItem, GenericItemWithList} from '../GenericCollection.model';

export class Delete extends Cmd {


  constructor(inputItem: GenericItemWithList, param: any[]) {
    super(inputItem, TypeCmd.DELETE, param);
    console.log(param);
  }

  execute(): boolean {
    this.inputItem.list.deleteItem(this.param[0].position);
    return true;
  }

  undo() {
    this.inputItem.list.addItem(this.param[0]);
  }
}
