import * as fs from "fs";
import * as _ from "lodash";

export interface Note {
    title: string,
        body: string,
}

class Notes {
    private age: number = 22;

    constructor(age: number) {
        this.age = age;
    }

    get Age(): number {
        return this.age;
    }

    addNote(title: string, body: string): Note | boolean {
        console.log(`title : ${title}`);
        console.log(`body : ${body}`);

        let notes: Note[] = this.getAll()
        let notesNum: number = notes.length;

        let newNote: Note = {
            title,
            body
        }

        notes.push(newNote);
        notes = _.uniqWith(notes, _.isEqual);

        if (notes.length == notesNum) {
            console.log("duplicate node");
            return false;
        }

        if (this.saveNote(notes))
            return newNote;
        else
            return false;
    }

    getAll(): Note[] {
        let allNotes: Note[] = []
        try {
            allNotes = JSON.parse(fs.readFileSync("./notes/notes.json", 'utf8'));
        } catch (error) {
            console.log(error)
        }
        return (allNotes);
    }

    getNote(title: string): Note | boolean{
        let allNotes : Note[] = this.getAll();
        let wantedNote: Note | undefined;

        try {
            wantedNote = _.find(allNotes,['title',title]);   
        } catch (error) {
            console.log(error)
        }

        if(typeof(wantedNote) == 'undefined'){
            return(false)
        }

        return (wantedNote);
    }

    removeNote(title: string): Note | boolean{
        let allNotes : (Note| boolean)[] = this.getAll();
        let wantedNote : Note | boolean = this.getNote(title)

        if(wantedNote == false){
            return (false)
        }
        else{
            allNotes = _.pullAllBy(allNotes, [wantedNote], 'title');
            this.saveNote(allNotes as Note[]);
            return (wantedNote as Note);
        }
        
    }

    saveNote(notes: Note[]): boolean {
        try {
            fs.writeFileSync('./notes/notes.json', JSON.stringify(notes));
            return (true);
        } catch (error) {
            console.log(error);
            return (false);
        }
    }

}

export {
    Notes
};