import {Cmd, TypeCmd} from './command.model';
import {GenericItemWithList} from '../GenericCollection.model';

export class SwitchObjectWithoutSave extends Cmd {


  constructor(inputItem: GenericItemWithList, param: any[]) {
    super(inputItem, TypeCmd.SWITCHWITHOUTSAVE, param);
  }



  execute(): boolean {
    this.inputItem.list.changeItem(this.param[0]);
    return true;
  }

  undo() {
    // this.inputItem.list.changeItemPos(this._extraParam.startPos, this._extraParam.direction);
  }


}
