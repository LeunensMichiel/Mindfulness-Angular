import {Cmd, TypeCmd} from './command.model';
import {GenericItemWithList} from '../GenericCollection.model';

export class Switch extends Cmd {
  private _extraParam: any;


  constructor(inputItem: GenericItemWithList, extraParam: any) {
    super(inputItem, TypeCmd.SWITCH);
    this._extraParam = extraParam;
  }

  get extraParam(): any {
    return this._extraParam;
  }

  set extraParam(value: any) {
    this._extraParam = value;
  }

  execute(): boolean {
    this.inputItem[0].changeItemPos(this._extraParam.startPos, this._extraParam.direction);
    return true;
  }

  undo() {
    this.inputItem[0].changeItemPos(this._extraParam.startPos, this._extraParam.direction);
  }


}
