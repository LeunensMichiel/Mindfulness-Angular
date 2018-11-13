// eventuele imports

export class Group{
    _id:string;
    _name:string;
    _sessionmap_id:string;

    constructor(name?:string,sessionmap_id?:string){
        //super();
        this._name = name;
        this._sessionmap_id = sessionmap_id;
    }

    public get id():string{
        return this._id;
    }

    public get name():string{
        return this._name;
    }

    public get sessionmap_id():string{
        return this._sessionmap_id;
    }

    public set id(value:string){
        this._id = value;
    }

    public set name(value:string){
        this._name = value;
    }

    public set sessionmap_id(value:string){
        this._sessionmap_id = value;
    }

    fromJson(json:any){
        const group = new Group();
        group._name = json.name;
        group._sessionmap_id = json.sessionmap_id;
        group._id = json._id;
        return group;
    }

    toJSON(){
        return{
            _id:this._id,
            name:this._name,
            sessionmap_id:this._sessionmap_id
        };
    }
}