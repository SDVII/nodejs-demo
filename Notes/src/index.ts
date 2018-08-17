import * as os from "os";
import * as yargs from "yargs";

interface Note {
    title: string,
        body: string,
}

import {
    Notes
} from "./notes";

let userInfo = os.userInfo();

// fs.appendFile('./notes/greetings.txt', `hello${userInfo.uid}`, function (error) {
//     if (error)
//         console.log(error);
// });

let notes: Notes = new Notes(7);

//console.log(notes.Age);

/*
using builtin
console.log('Process: ', process.argv);
*/

/*
using yargs:
console.log('Yargs',args);
*/

/**
 * help() = node file.js --help -> list of available commands 
 */
const args = yargs
    .help()
    .command('add', 'Add a new note', {
        title: {
            describe: "Title of note",
            demand: true,
            alias: 't'
        },
        body: {
            describe: "Body of note",
            demand: true,
            alias: 'b'
        },
    })
    .command('list', 'List all notes')
    .command('read', 'Retrieve a note', {
        title: {
            describe: "Title of note",
            demand: true,
            alias: 't'
        },
    })
    .command('remove', 'Remove a note', {
        title: {
            describe: "Title of note",
            demand: true,
            alias: 't'
        },
    })
    .options({
        help: {
            alias: 'h',
            describe: 'help',
        },
    })
    .argv;
//let command : string = process.argv[2];
const command: string = yargs.argv._[0];

// Note: don't forget to run tsc -watch first
//example: run in terminal -> node build/index.js add

if (command == 'add') {
    let res = notes.addNote(args.title, args.body);

    if (res == false) {
        console.log("No notes has been added");
    } else {
        console.log(res);
    }

} else if (command == "list") {
    let allNotes: Note[] = notes.getAll();
    console.log(allNotes);

} else if (command == "read") {
    let res: Note | boolean | undefined = notes.getNote(args.title);
    debugger;
    if (res == false) {
        console.log("Note was not retrieved");
    } else {
        console.log(res);
    }

} else if (command == "remove") {
    let res: Note | boolean | undefined = notes.removeNote(args.title);

    if (res == false) {
        console.log("Nothing got deleted");
    } else {
        console.log(res);
    }

} else {
    console.log("unknown");
}