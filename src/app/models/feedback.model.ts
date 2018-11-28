import {Session} from './session.model';

export class Feedback {
  private _id: string;
  private _date: Date;
  private _message: string;
  private _session: Session;

  constructor(date: Date = new Date(), message: string = "") {
    this.date = date;
    this.message = message;
  }


  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get date(): Date {
    return this._date;
  }

  set date(value: Date) {
    this._date = value;
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }

  get session(): Session {
    return this._session;
  }

  set session(value: Session) {
    this._session = value;
  }

  static fromJSON(json: any): Feedback {
    let feedback = new Feedback(json.date, json.message);

    if (json.hasOwnProperty("session")) {
      feedback.session = Session.fromJSON(json.session);
    }

    feedback.id = json._id;

    return feedback;
  }


}
