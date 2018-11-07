import { Exercise } from "./exercise.model";
import { GenericCollection, GenericItem } from "./GenericCollection.model";

export class Sessie extends GenericCollection implements GenericItem {
  private _id: string;
  private _title: string;
  private _admin: string;

  // private _categorie: Categorie;

  constructor(title: string, position: number , oefeningen?: Exercise[]) {
    super();
    this._title = title;
    this.position = position;
    this.items = oefeningen || new Array();
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
  public set title(_title: string) {
    this._title = _title;
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

  static fromJson(json: any): Sessie {
    const ses = new Sessie(
      json.title,
      json.position,
      json.oefeningen.map(Exercise.fromJson),
    );
    ses._id = json._id;
    return ses;
  }

  toJson() {
    return {
      _id: this._id,
      title: this._title,
      position: this.position,
      oefeningen: this.items.map(oef => oef.toJson())
    };
  }
}
