interface Page {
    title: string;
    position: number;
    
    toString(): string
}

class AudioPage implements Page{
    position: number;
    title: string;
    fileUrl: string;

    toString(): string {
        return 'audio';
    }
}

class TextPage implements Page {
    position: number;
    title: string;
    text: string;

    toString(): string {
        return 'text';
    }
}