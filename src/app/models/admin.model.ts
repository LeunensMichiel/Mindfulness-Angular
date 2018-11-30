
export class Admin {

  private _firstname: string;
  private _lastname: string;
  private _email: string;
  private _token: string;
  private _id: string;


  constructor(firstname: string = '', lastname: string = '', email: string = '') {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }

  get firstname(): string {
    return this._firstname;
  }

  set firstname(value: string) {
    this._firstname = value;
  }

  get lastname(): string {
    return this._lastname;
  }

  set lastname(value: string) {
    this._lastname = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  generateFullname(): string {
    return `${this.firstname} ${this.lastname}`;
  }

  static fromJSON(json: any): Admin {
    let admin = new Admin(json.firstname, json.lastname, json.email);

    admin.id = json._id;

    return admin;
  }

  toJSON() {
    return {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      token: this.token
    };
  }

  toString(): string {
    return this.generateFullname()
  }
}
