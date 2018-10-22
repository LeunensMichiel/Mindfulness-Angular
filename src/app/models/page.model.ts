import { Paragraph } from "./paragraph.model";

export interface Page {
    title: string;
    position: number;

    toString(): string
}

export class AudioPage implements Page{
    position: number;
    title: string;
    fileUrl: string;

    constructor(){
        this.position = 0;
        this.title = "";
        this.fileUrl = "";
    }

    toString(): string {
        return 'audio';
    }
}

export class TextPage implements Page {
    position: number;
    title: string;
    text: string;
    paragraphs: Paragraph[];

    constructor(){
        this.position = 0;
        this.title = "";
        this.text = "";
        this.paragraphs = [new Paragraph()];
    }

    public addPar(position: number, par:Paragraph){
        this.paragraphs
            .filter( par => par.position >= position )
            .forEach( par => par.position += 1);
        par.position = position;
        this.paragraphs.splice(position += 1, 0, par);
        this.paragraphs.sort((a, b) => a.position - b.position);
    }

    public deletePar(position: number){
        this.paragraphs.splice(position, 1);
        this.paragraphs
            .filter( par => par.position >= position)
            .forEach( par => par.position -= 1); 
    }

    public changeParPosition(startPos: number, endPos: number): boolean{
        if(startPos != endPos && endPos >= 0 && endPos < this.paragraphs.length){
            this.paragraphs[startPos].position = endPos;
            this.paragraphs[endPos].position = startPos;
            this.paragraphs.sort((a, b) => a.position - b.position);
            return true;
        }
        return false;
    }

    public changePar(par:Paragraph){
        this.paragraphs[par.position] = par;
    }

    toString(): string {
        return 'text';
    }
}

export class InputPage implements Page {
    position: number;
    title: string;
    input: string;

    constructor(){
        this.position = 0;
        this.title = "";
        this.input = "";
    }

    toString(): string {
        return 'invoer';
    }
}