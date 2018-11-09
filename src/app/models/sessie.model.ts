import { Exercise } from "./exercise.model";
import { GenericCollection, GenericItem } from "./GenericCollection.model";
import { Paragraph } from './paragraph.model';

export class Sessie extends GenericCollection implements GenericItem {
  private _id: string;
  private _title: string;
  private _admin: string;
  private _position: number;
  // private _categorie: Categorie;

  constructor(title?: string, position?: number, private _sesmapID?: string) {
    super();
    this._title = title || "";
    this.items = new Array();
    this._position = position || 0;
    // this._categorie = categorie;*/
  }

  /**
   * Getter id
   * @return {string}
   */
  public get id(): string {
    return this._id;
  }

  /**
   * Setter id
   * @param {string} value
   */
  public set id(_id: string) {
    this._id = _id;
  }

  /**
     * Getter title
     * @return {string}
     */
  public get title(): string {
    return this._title;
  }

  /**
   * Setter title
   * @param {string} value
   */
  public set title(title: string) {
    this._title = title;
  }

  /**
   * Getter position
   * @return {number}
   */
  public get position(): number {
    return this._position;
  }

  /**
   * Setter position
   * @param {number} value
   */
  public set position(pos: number) {
    this._position = pos;
  }

  public get sesmapID(): string {
    return this._sesmapID;
  }
  public set sesmapID(id: string) {
    this._sesmapID = id;
  }
  /**
   * Getter admin
   * @return {string}
   */
  public get admin(): string {
    return this._admin;
  }

  /**
   * Setter admin
   * @param {string} value
   */
  public set admin(_admin: string) {
    this._admin = _admin;
  }
  fromJson(json: any) {
    const ses = new Sessie();
    console.log(json);
    ses._title = json.title;
    ses._position = json.position;
    if (json.hasOwnProperty("items")) {
      ses.items = json.items.map(it => {
        var oef = new Exercise();
        return oef.fromJson(it);
      });
    }
    ses._sesmapID = json.sessionmap_id;
    ses._id = json._id;
    return ses;
  }

  toJSON() {
    return {
      _id: this._id,
      title: this._title,
      position: this._position,
      items: this.items.map(oef => oef.toJSON()),
      sessionmap_id: this._sesmapID
    };
  }
}
