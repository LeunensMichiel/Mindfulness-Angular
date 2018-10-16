interface Page {
    title: string;
    position: number;
}

class AudioPage implements Page{
    position: number;
    title: string;
    fileUrl: string;
}

class TextPage implements Page {
    position: number;
    title: string;
    text: string;
}