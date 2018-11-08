
import { Sessie } from './sessie.model';
import {GenericCollection, GenericItem} from './GenericCollection.model';
export class Sessionmap extends GenericCollection implements GenericItem{
  private _id: string;
  private _titleCourse: string;
  //private _sessions: Sessie[];

  // private _categorie: Categorie;

  constructor(titleCourse?: string) {
    super();
    this._titleCourse = titleCourse || "";
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

  fromJson(json: any) {
    const sesmap = new Sessionmap();
    sesmap._titleCourse = json.titleCourse;
    if (json.hasOwnProperty("sessions")){
      sesmap.items = json.sessions.map(it => {
        var ses = new Sessie();
        return ses.fromJson(it);
      });
    }

    sesmap._id = json._id;
    return sesmap;
  }

  toJSON() {
    return {
      _id: this._id,
      titleCourse: this._titleCourse,
      items: this.items.map(ses => ses.toJSON())
    };
  }
}
