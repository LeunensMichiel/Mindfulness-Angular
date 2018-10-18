export class Sessie {
    private _id: string;
    private _nr: number;
    private _oefeningen: string[];
    private _admin: string;
    // private _categorie: Categorie;

    constructor(nr: number, oefeningen?: string[]) {
        this._nr = nr;
        this._oefeningen = oefeningen || new Array();
        // this._categorie = categorie;
    }

    static fromJSON(json: any) : Sessie {
        const sessie = new Sessie(
            json.nr,
            // json.categorie,
            json.oefeningen
        );
        sessie._id = json._id;
        return sessie;
    }

    get nr(): Number {
        return this._nr;
    }
    
    // get categorie(): Categorie {
    //     return this._categorie;
    // }

    get oefeningen(): String[] {
        return this._oefeningen;
    }

    toJSON() {
        return {
            _id: this._id,
            // categorie: this._categorie,
            oefeningen: this._oefeningen
        };
    }
}