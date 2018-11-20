import {GenericItem, GenericItemWithList} from '../GenericCollection.model';

export abstract class Cmd {
  private _param: GenericItem[];
  private _type: TypeCmd;
  private _inputItem: GenericItemWithList;

  protected constructor(
    inputItem: GenericItemWithList = null,
    type: TypeCmd,
    param: GenericItem[] = []
  ) {
    this._param = param;
    this._type = type;
    this._inputItem = inputItem;
  }


  get param(): GenericItem[] {
    return this._param;
  }

  set param(value: GenericItem[]) {
    this._param = value;
  }

  get type(): TypeCmd {
    return this._type;
  }

  set type(value: TypeCmd) {
    this._type = value;
  }

  get inputItem(): GenericItemWithList {
    return this._inputItem;
  }

  set inputItem(value: GenericItemWithList) {
    this._inputItem = value;
  }

  abstract execute(): boolean;

  abstract undo();

  toString() {
    return TypeCmd[this.type];
  }
}

export enum TypeCmd {
  INSERT,
  UPDATE,
  SWITCH,
  DELETE
}
