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

    constructor(){
        this.position = 0;
        this.title = "";
        this.text = "";
    }

    toString(): string {
        return 'text';
    }
}