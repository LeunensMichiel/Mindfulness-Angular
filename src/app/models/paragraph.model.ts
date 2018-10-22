export class Paragraph {
    public content: string;
    public position:number;
    public type:string;

    constructor(){
        this.content = "";
        this.position = 0;
        this.type = "text";
    }
}