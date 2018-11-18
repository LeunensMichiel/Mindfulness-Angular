import { Page, TextPage, AudioPage, InputPage } from "./page.model";
import { GenericCollection, GenericItem } from "./GenericCollection.model";
import { Paragraph } from "./paragraph.model";

export class Exercise extends GenericCollection implements GenericItem {
    _id: string;
    private _title: string;

    constructor(title: string = "", position: number = 0) {
        super();
        this._title = title;
        this.position = position;
    }

    /**
   * Getter id
   * @return {string}
   */
    public get id(): string {
        return this._id;
    }

    /**
     * Setter id
     * @param _id value
     */
    public set id(_id: string) {
        this._id = _id;
    }

    /**
       * Getter title
       * @return {string}
       */
    public get title(): string {
        return this._title;
    }

    /**
     * Setter title
     * @param _title value
     */
    public set title(_title: string) {
        this._title = _title;
    }

    /**
     * Getter pages
     * @return {GenericItem[]}
     */
    public get pages(): GenericItem[] {
        return this.items;
    }

    /**
     * Setter pages
     * @param pages value
     */
    public set pages(pages: GenericItem[]) {
        this.items = pages;
    }

    public addPage(page: Page) {
        page.position = this.items.length;
        this.items.push(page);
    }

    public deletePage(position: number) {
        this.items.splice(position, 1);
        this.items
            .filter(page => page.position >= position)
            .forEach(p => p.position -= 1);
    }

    public changePagePosition(startPos: number, direction: number) {
        var endPos = (startPos + direction);
        if (startPos != endPos && endPos >= 0 && endPos < this.items.length) {
            this.items[startPos].position = endPos;
            this.items[endPos].position = startPos;
            this.items.sort((a, b) => a.position - b.position);
            return true;
        }
        return false;
    }

    static fromJson(json: any): Exercise {
        const ex = new Exercise(json.title, json.position);
        if (json.hasOwnProperty("pages")) {
            ex.items = json.pages.map(it => {
                if (typeof it != 'string') {
                    switch (it.type) {
                        case "TEXT":
                            return new TextPage().fromJson(it);
                        case "AUDIO":
                            return new AudioPage().fromJson(it);
                        case "INPUT":
                            return new InputPage().fromJson(it);
                    }
                }
            });
        }

        ex._id = json._id;
        return ex;
    }

    toJSON() {
        return {
            _id: this._id,
            title: this._title,
            position: this.position
          // TODO add tojson for pages
            // pages: this.items.map(page => page.toJSON())
        };
    }
}
