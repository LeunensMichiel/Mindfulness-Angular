import { Session } from "./session.model";

/**
 * Modelklasse voor user, wordt gebruikt voor in groepen
 */
export class User{
    private _id:string;
    private _firstname:string;
    private _lastname:string;
    private _email:string;
    private _session:Session;

    constructor(){
    }

    public get id():string{
        return this._id;
    }

    public get firstname():string{
        return this._firstname;
    }

    public get lastname():string{
        return this._lastname;
    }

    public get session():Session{
        return this._session;
    }

    public set id(value:string){
        this._id = value;
    }

    public set session(value:Session){
        this._session = value;
    }

    public set firstname(value:string){
        this._firstname = value;
    }

    public set lastname(value:string){
        this._lastname = value;
    }

    public set email(value:string){
        this._email = value;
    }

    static fromJson(json:any){
        const user = new User();
        user.id = json._id;
        user.firstname = json.firstname;
        user.lastname = json.lastname;
        user.email = json.email;
        user.session = json.current_session_id;
        return user;
    }

    toJSON(){
        return{
            _id:this._id,
            firstname:this.firstname,
            lastname:this.lastname,
            email:this.email,
        };
    }
}
