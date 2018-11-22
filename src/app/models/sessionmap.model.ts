import {Session} from './session.model';
import {GenericCollection, GenericItem} from './GenericCollection.model';

export class Sessionmap {
  _id: string;
  private _titleCourse: string;
  private _sessions: GenericCollection;

  // private _categorie: Categorie;

  constructor(titleCourse: string = '') {
    this._titleCourse = titleCourse;
    this._sessions = new GenericCollection();
  }


  get sessions(): GenericCollection {
    return this._sessions;
  }

  set sessions(value: GenericCollection) {
    this._sessions = value;
  }

  /**
   * Getter id
   * @return {string}
   */
  public get id(): string {
    return this._id;
  }

  /**
   * Getter titleCourse
   * @return {string}
   */
  public get titleCourse(): string {
    return this._titleCourse;
  }

  /**
   * Setter id
   * @param {string} value
   */
  public set id(value: string) {
    this._id = value;
  }

  /**
   * Setter titleCourse
   * @param {string} value
   */
  public set titleCourse(value: string) {
    this._titleCourse = value;
  }

  static fromJson(json: any) {
    const sesmap = new Sessionmap(json.titleCourse);
    if (json.hasOwnProperty('sessions')) {

      sesmap.sessions = new GenericCollection(json.sessions.map(it => {
        return Session.fromJSON(it);
      }));
    }

    sesmap.id = json._id;
    return sesmap;
  }

  toJSON() {
    return {
      _id: this.id,
      titleCourse: this.titleCourse,
    };
  }
}
