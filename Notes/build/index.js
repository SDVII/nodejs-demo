"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var os = __importStar(require("os"));
var yargs = __importStar(require("yargs"));
var notes_1 = require("./notes");
var userInfo = os.userInfo();
// fs.appendFile('./notes/greetings.txt', `hello${userInfo.uid}`, function (error) {
//     if (error)
//         console.log(error);
// });
var notes = new notes_1.Notes(7);
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
var args = yargs
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
var command = yargs.argv._[0];
// Note: don't forget to run tsc -watch first
//example: run in terminal -> node build/index.js add
if (command == 'add') {
    var res = notes.addNote(args.title, args.body);
    if (res == false) {
        console.log("No notes has been added");
    }
    else {
        console.log(res);
    }
}
else if (command == "list") {
    var allNotes = notes.getAll();
    console.log(allNotes);
}
else if (command == "read") {
    var res = notes.getNote(args.title);
    debugger;
    if (res == false) {
        console.log("Note was not retrieved");
    }
    else {
        console.log(res);
    }
}
else if (command == "remove") {
    var res = notes.removeNote(args.title);
    if (res == false) {
        console.log("Nothing got deleted");
    }
    else {
        console.log(res);
    }
}
else {
    console.log("unknown");
}
