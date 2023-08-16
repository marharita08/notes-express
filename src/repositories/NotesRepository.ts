import {INote} from "../model/Note";
import Note from "../model/Note";
import Category from "../model/Category";

interface INoteUpdate {
    name: string,
    category_id: number,
    content: string,
    dates?: string,
}

interface INoteAdd extends INoteUpdate{
    archived: boolean,
}

async function getAll(): Promise<INote[]> {
    return Note.findAll({
        include: [{ model: Category, as:'category' }],
        order: [['note_id', 'ASC']],
    });
}

async function getActive(): Promise<INote[]> {
    return Note.findAll({
        where: { archived: false },
        include: [{ model: Category, as:'category' }],
        order: [['note_id', 'ASC']],
    });
}

async function getArchived(): Promise<INote[]> {
    return Note.findAll({
        where: { archived: true },
        include: [{ model: Category, as:'category' }],
        order: [['note_id', 'ASC']],
    });
}

async function getOne(id: number): Promise<INote | null> {
    return Note.findByPk(id, { include: [{ model: Category, as:'category' }] });
}

async function add(note: INoteAdd): Promise<INote> {
    return await Note.create(note);
}

async function delete_(id: number): Promise<void> {
    await Note.destroy({ where: { note_id: id }});
}

async function update(id: number, note: INoteUpdate): Promise<void> {
    await Note.update(note, { where: { note_id: id }});
}

async function updateArchived(id: number, archived: boolean): Promise<void> {
    await Note.update({ archived }, { where: { note_id: id }})
}

async function persists(id: number): Promise<boolean> {
    let note = await Note.findByPk(id);
    return note !== null;
}

async function countActiveNotesByCategory(category_id: number): Promise<number> {
    return Note.count({ where: { category_id, archived: false }});
}

async function countArchivedNotesByCategory(category_id: number): Promise<number> {
    return Note.count({ where: { category_id, archived: true }});
}

export default {
    getOne,
    persists,
    getAll,
    getActive,
    getArchived,
    add,
    update,
    updateArchived,
    delete: delete_,
    countArchivedNotesByCategory,
    countActiveNotesByCategory
} as const;
