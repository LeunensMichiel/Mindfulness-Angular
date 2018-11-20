import {Cmd, TypeCmd} from './command.model';
import {GenericCollection, GenericItem, GenericItemWithList} from '../GenericCollection.model';


export class Update extends Cmd {


  constructor(inputItem: GenericItemWithList, param: any[]) {
    super(inputItem, TypeCmd.UPDATE, param);
    console.log(param);
  }

  execute(): boolean {
    this.inputItem.list.changeItem(this.param[0]);
    return true;
  }

  undo() {
    this.inputItem.list.changeItem(this.param[1]);
  }


}
