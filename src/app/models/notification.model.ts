/**
 * Modelklasse voor een notificatie, een groep kan notificaties hebben
 * Een beheerder kan notificaties verzenden naar alle groepsleden van een groep
 */
export class Notification{
    _notification_title:string;
    _notification_beschrijving:string;
    /**
     * een notificatie heeft een datum waarop hij getoond wordt aan de groep
     * Momenteel staat het tijdstip standaard op 12 uur 's middags
     */
    _notification_launchtijdstip:Date;

    constructor(notification_title:string = ''){
        this._notification_title = notification_title;
    }

    public get notification_title():string{
        return this._notification_title;
    }

    public get notification_beschrijving():string{
        return this._notification_beschrijving;
    }

    public get notification_launchtijdstip():Date{
        return this._notification_launchtijdstip;
    }

    public set notification_title(value:string){
        this._notification_title = value;
    }

    public set notification_beschrijving(value:string){
        this._notification_beschrijving = value;
    }

    public set notification_launchtijdstip(value:Date){
        this._notification_launchtijdstip = value;
    }

    /*
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
    } */
}
