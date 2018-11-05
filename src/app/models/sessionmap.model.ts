
import { Sessie } from './sessie.model';
export class Sessionmap {
  private _id: string;
  private _titleCourse: string;
  private _sessions: Sessie[];

  // private _categorie: Categorie;

  constructor(titleCourse: string, sessions: Sessie[] = []) {
    this._titleCourse = titleCourse;
    this._sessions = sessions;
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
   * Getter sessions
   * @return {Sessie[]}
   */
  public get sessions(): Sessie[] {
    return this._sessions;
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

  /**
   * Setter sessions
   * @param {Sessie[]} value
   */
  public set sessions(value: Sessie[]) {
    this._sessions = value;
  }


  static fromJSON(json: any): Sessionmap {
    const sesmap = new Sessionmap(
      json.titleCourse,
      json.sessions.map(Sessie.fromJson)
    );
    sesmap._id = json._id;
    return sesmap;
  }

  toJSON() {
    return {
      _id: this._id,
      titleCourse: this._titleCourse,
      sessions: this._sessions.map(ses => ses.toJSON())
    };
  }
}
