

export class Admin {

  private _firstname: string;
  private _lastname: string;
  private _email: string;
  private _token: string;
  private _id: string;
  private _adminActive: boolean;
  private _role: Role;

  constructor(firstname: string = '', lastname: string = '', email: string = '', role: Role = new Role(), adminActif: boolean = false) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.role = role;
    this.adminActive = adminActif;
  }


  get adminActive(): boolean {
    return this._adminActive;
  }

  set adminActive(value: boolean) {
    this._adminActive = value;
  }

  get role(): Role {
    return this._role;
  }

  set role(value: Role) {
    this._role = value;
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
    let admin = new Admin(
      json.firstname,
      json.lastname,
      json.email,
      json.admin_active
    );

    if (json.hasOwnProperty("roles")){
      admin.role = Role.fromJSON(json.roles);
    }

    admin.id = json._id;

    return admin;
  }

  toJSON() {
    return {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      admin_active: this.adminActive,
      roles: this.role.toJSON(),
      token: this.token,
    };
  }

  toString(): string {
    return this.generateFullname()
  }
}

export class Role {
  private _admin: boolean;
  private _superAdmin: boolean;

  constructor(admin: boolean = false, superAdmin: boolean = false) {
    this.admin = admin;
    this.superAdmin = superAdmin;
  }


  get admin(): boolean {
    return this._admin;
  }

  set admin(value: boolean) {
    this._admin = value;
  }

  get superAdmin(): boolean {
    return this._superAdmin;
  }

  set superAdmin(value: boolean) {
    this._superAdmin = value;
  }

  static fromJSON(json: any): Role {
    return new Role(json.admin, json.super_admin);
  }

  toJSON() {
    return {
      admin: this.admin,
      super_admin: this.superAdmin
    }
  }
}
