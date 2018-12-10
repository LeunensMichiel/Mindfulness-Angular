export class GenericCollection {
  private _items: GenericItem[];

  constructor(items: GenericItem[] = []) {
    this._items = items;
  }

  get items(): GenericItem[] {
    return this._items;
  }

  set items(value: GenericItem[]) {
    this._items = value;
  }

  public setItem(value: GenericItem) {
    this.items[value.position] = value;
  }

  public addItem(item: GenericItem) {
    this.items.push(item);
  }

  public deleteItem(position: number) {
    let item = this.items[position];
    this.items.splice(position, 1);
    this.items
      .filter(it => it.position >= position)
      .forEach(it => {
        if (it) {
          it.position -= 1;
        }
      });
    return item;
  }

  public changeItemPos(startPos: number, direction: number): boolean {
    let endPos = (startPos + direction);
    if (startPos != endPos && endPos >= 0 && endPos < this._items.length) {
      let item = this._items[endPos];
      this._items[endPos] = this._items[startPos];
      this._items[endPos].position = endPos;
      this._items[startPos] = item;
      this._items[startPos].position = startPos;
      return true;
    }
    return false;
  }

  public getItem(position: number): GenericItem {
    return this.items[position];
  }

  public getSecondItem(position: number, direction: number): GenericItem {
    let endPos = (position + direction);
    if (position != endPos && endPos >= 0 && endPos < this._items.length) {
      return this.items[endPos];
    }

    return null;

  }

  public changeItem(item: GenericItem) {
    this._items[item.position] = item;
  }

}

export abstract class GenericItem {
  private _position: number;
  private _title: string;
  private _id: string;

  protected constructor(position: number = 0, title: string = '') {
    this._position = position;
    this._title = title;
  }


  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get position(): number {
    return this._position;
  }

  set position(value: number) {
    this._position = value;
  }

  toJSON() {
    return {
      _id: this._id,
      title: this._title,
      position: this._position,
    };
  }

}

export abstract class GenericItemWithList extends GenericItem {
  private _list: GenericCollection;

  protected constructor(position: number = 0, title: string = '', list: GenericCollection = new GenericCollection()) {
    super(position, title);
    this._list = list;
  }


  get list(): GenericCollection {
    return this._list;
  }

  set list(value: GenericCollection) {
    this._list = value;
  }

  toJSON() {
    return super.toJSON();
  }
}


