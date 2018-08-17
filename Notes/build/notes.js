"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var _ = __importStar(require("lodash"));
var Notes = /** @class */ (function () {
    function Notes(age) {
        this.age = 22;
        this.age = age;
    }
    Object.defineProperty(Notes.prototype, "Age", {
        get: function () {
            return this.age;
        },
        enumerable: true,
        configurable: true
    });
    Notes.prototype.addNote = function (title, body) {
        console.log("title : " + title);
        console.log("body : " + body);
        var notes = this.getAll();
        var notesNum = notes.length;
        var newNote = {
            title: title,
            body: body
        };
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
    };
    Notes.prototype.getAll = function () {
        var allNotes = [];
        try {
            allNotes = JSON.parse(fs.readFileSync("./notes/notes.json", 'utf8'));
        }
        catch (error) {
            console.log(error);
        }
        return (allNotes);
    };
    Notes.prototype.getNote = function (title) {
        var allNotes = this.getAll();
        var wantedNote;
        try {
            wantedNote = _.find(allNotes, ['title', title]);
        }
        catch (error) {
            console.log(error);
        }
        if (typeof (wantedNote) == 'undefined') {
            return (false);
        }
        return (wantedNote);
    };
    Notes.prototype.removeNote = function (title) {
        var allNotes = this.getAll();
        var wantedNote = this.getNote(title);
        if (wantedNote == false) {
            return (false);
        }
        else {
            allNotes = _.pullAllBy(allNotes, [wantedNote], 'title');
            this.saveNote(allNotes);
            return wantedNote;
        }
    };
    Notes.prototype.saveNote = function (notes) {
        try {
            fs.writeFileSync('./notes/notes.json', JSON.stringify(notes));
            return (true);
        }
        catch (error) {
            console.log(error);
            return (false);
        }
    };
    return Notes;
}());
exports.Notes = Notes;
