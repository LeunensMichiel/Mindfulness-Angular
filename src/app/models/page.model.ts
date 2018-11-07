import { Paragraph } from "./paragraph.model";
import { GenericCollection, GenericItem } from "./GenericCollection.model";

export interface Page {
    title: string;
    position: number;

    toJSON(): any;
    fromJson(json: any): Page;

    toString(): string
}

export class AudioPage implements Page, GenericItem {
    position: number;
    title: string;
    fileUrl: string;

    constructor() {
        this.position = 0;
        this.title = "";
        this.fileUrl = "";
    }

  toJSON() {
        return {
            title: this.title,
            fileUrl: this.fileUrl,
            position: this.position
        }
    }

    fromJson(json: any): Page {
        const page = new AudioPage()
        page.title = json.title;
        page.fileUrl = json.fileUrl;
        page.position = json.position;
        return page;
    }

    toString(): string {
        return 'audio';
    }
}

export class TextPage extends GenericCollection implements Page, GenericItem {
    position: number;
    title: string;
    text: string;

    constructor() {
        super();
        this.position = 0;
        this.title = "";
        this.text = "";
        this.items = [new Paragraph()];
    }

  toJSON() {
        return {
            title: this.title,
            text: this.text,
            position: this.position,
            items: this.items.map(it => it.toJSON)
        }
    }

    fromJson(json: any): Page {
        const page = new TextPage();
        page.position = json.position;
        page.title = json.title;
        page.text = json.text;
        page.items = json.items.map(it => {
            var par = new Paragraph();
            return par.fromJson(it);
        });
        return page;
    }

    toString(): string {
        return 'text';
    }
}

export class InputPage implements Page, GenericItem {
    position: number;
    title: string;
    input: string;

    constructor() {
        this.position = 0;
        this.title = "";
        this.input = "";
    }

  toJSON() {
        return {
            title: this.title,
            input: this.input,
            position: this.position
        }
    }
    fromJson(json: any): Page {
        const page = new InputPage();
        page.position = json.position;
        page.title = json.title;
        page.input = page.input;
        return page;
    }

    toString(): string {
        return 'invoer';
    }
}
