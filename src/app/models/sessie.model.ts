import { Exercise } from "./exercise.model";
export class Sessie {
  private _id: string;
  private _title: string;
  private _nr: number;
  private _oefeningen: string[];
  private _admin: string;

  // private _categorie: Categorie;

  constructor(title: string, /*nr: number , oefeningen?: string[]*/) {
    this._title = title;
    //this._nr = nr;
    /*this._oefeningen = oefeningen || new Array();
    // this._categorie = categorie;*/
  }

  public get_id(): string {
    return this._id;
  }

  public set_id(_id: string): void {
    this._id = _id;
  }

  public get_title(): string {
    return this._title;
  }

  public set_title(_title: string): void {
    this._title = _title;
  }

  public get_nr(): number {
    return this._nr;
  }

  public set_nr(_nr: number): void {
    this._nr = _nr;
  }

  public get_oefeningen(): string[] {
    return this._oefeningen;
  }

  public set_oefeningen(_oefeningen: string[]): void {
    this._oefeningen = _oefeningen;
  }

  public get_admin(): string {
    return this._admin;
  }

  public set_admin(_admin: string): void {
    this._admin = _admin;
  }

  static fromJSON(json: any): Sessie {
    const ses = new Sessie(
    json.title,
    //json.nr
      //json.oefeningen.map(Exercise.fromJSON),
    );
    ses._id = json._id;
    return ses;
  }

  toJSON() {
    return {
      _id: this._id,
      title: this._title,
      //nr: this._nr
    };
  }
}
