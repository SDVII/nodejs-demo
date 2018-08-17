export interface Note {
    title: string;
    body: string;
}
declare class Notes {
    private age;
    constructor(age: number);
    readonly Age: number;
    addNote(title: string, body: string): Note | boolean;
    getAll(): Note[];
    getNote(title: string): Note | boolean;
    removeNote(title: string): Note | boolean;
    saveNote(notes: Note[]): boolean;
}
export { Notes };
