import {Exercise} from './exercise.model';
import {GenericCollection, GenericItem} from './GenericCollection.model';

export class Session extends GenericCollection implements GenericItem {
  _id: string;
  private _title: string;
  private _admin: string;
  private _position: number;

  // private _categorie: Categorie;

  constructor(title: string = '', position: number = 0) {
    super();
    this._title = title;
    this._position = position;
    this.items = new Array();
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
   * @param _id value
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
   * @param title value
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
   * @param pos value
   */
  public set position(pos: number) {
    this._position = pos;
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

  static fromJson(json: any) {
    const ses = new Session(
      json.title,
      json.position
    );
    if (json.hasOwnProperty('exercises')) {
      ses.items = json.exercises.map(it => {
        return Exercise.fromJson(it);
      });
    }
    ses._id = json._id;
    return ses;
  }

  toJSON() {
    return {
      _id: this._id,
      title: this._title,
      position: this._position,
    };
  }
}
