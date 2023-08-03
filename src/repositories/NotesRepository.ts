import {INote} from "../model/Note";
import orm from './MockOrm';


async function getAll(): Promise<INote[]> {
    const db = await orm.openDb();
    return db.notes;
}

async function getOne(id: number): Promise<INote | undefined> {
    const db = await orm.openDb();
    return db.notes.find((note: INote) => note.id === id);
}

async function add(note: INote): Promise<void> {
    const db = await orm.openDb();
    const id = db.noteIdSeq++;
    db.notes.push({id, ...note});
    return orm.saveDb(db);
}

async function delete_(id: number): Promise<void> {
    const db = await orm.openDb();
    db.notes = db.notes.filter((note: INote) => note.id !== id);
    return orm.saveDb(db);
}

function getIndexById(id: number, notes: INote[]): number {
    return notes.findIndex((note: INote) => note.id === id);
}

async function updateFields(id: number, name: string, category: string, content: string, dates: string): Promise<void> {
    const db = await orm.openDb();
    const index:number = getIndexById(id, db.notes);
    db.notes[index].name = name;
    db.notes[index].category = category;
    db.notes[index].content = content;
    db.notes[index].dates = dates;
    return orm.saveDb(db);
}

async function updateArchived(id: number, archived: boolean): Promise<void> {
    const db = await orm.openDb();
    const index:number = getIndexById(id, db.notes);
    db.notes[index].archived = archived;
    return orm.saveDb(db);
}

async function persists(id: number): Promise<boolean> {
    const db = await orm.openDb();
    const index = getIndexById(id, db.notes);
    return index !== -1;
}

export default {
    getOne,
    persists,
    getAll,
    add,
    updateFields,
    updateArchived,
    delete: delete_,
} as const;
