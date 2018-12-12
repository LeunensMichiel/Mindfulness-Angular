import { Sessionmap } from "./sessionmap.model";

// eventuele imports

export class Group{
    _id:string;
    _name:string;
    _sessionmap:Sessionmap;
    _sessie_naam:string;
    _sessionmap_id:string;
    _actief:boolean;

    constructor(name:string = '',sessionmap:Sessionmap = null){
        //super();
        this._name = name;
        this._sessionmap = sessionmap;

        this._actief = false;
    }

    public get id():string{
        return this._id;
    }

    public get name():string{
        return this._name;
    }

    public get sessionmap():Sessionmap{
        return this._sessionmap;
    }

    public get sessionmap_id():string{
        return this._sessionmap_id;
    }

    public get actief():boolean{
        return this._actief;
    }

    public set ses_id(value:string){
        this._sessionmap_id = value;
    }

    public set id(value:string){
        this._id = value;
    }

    public set name(value:string){
        this._name = value;
    }

    public set actief(value:boolean){
        this._actief = value;
    }

    public set sessionmap(value:Sessionmap){
        this._sessionmap = value;
    }

    public set sessionmap_id(value:string){
        this._sessionmap_id = value;
    }

    public set sessie_naam(value:string){
        this._sessie_naam = value;
    }

    public get sessie_naam():string{
        return this._sessie_naam;
    }

    static fromJSON(json:any){
        const group = new Group(
            json.name
        );
        if(json.hasOwnProperty('sessionmap_id')){
          if (json.sessionmap_id !== null) {
            group.sessionmap = Sessionmap.fromJSON(json.sessionmap_id);

          }
        }
        group._id = json._id;
        group._actief = json.actief;
        return group;
    }

    toJSON(){
        return{
            _id:this._id,
            name:this._name,
            sessionmap:this._sessionmap.toJSON(),
            actief:this._actief
        };
    }
}
