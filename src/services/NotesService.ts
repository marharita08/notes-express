import NotesRepository from "../repositories/NotesRepository";
import CategoriesRepository from "../repositories/CategoriesRepository";
import {INote} from "../model/Note";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import {RouteError} from "../other/classes";
import {findDates} from "../helpers/findDates";
import {IStats} from "../model/Stats";
import ErrorMessages from "../constants/ErrorMessages";

async function getAll():Promise<INote[]> {
    return NotesRepository.getAll();
}

async function getOne(id: number): Promise<INote | undefined> {
    const persists = await NotesRepository.persists(id);
    if (!persists) {
        throw new RouteError(
            HttpStatusCodes.NOT_FOUND,
            ErrorMessages.NOTE_NOT_FOUND_ERR,
        );
    }
    return NotesRepository.getOne(id);
}

async function addOne(name: string, category: string, content: string): Promise<void> {
    const persists = await CategoriesRepository.persists(category);
    if (!persists) {
        throw new RouteError(
            HttpStatusCodes.NOT_FOUND,
            ErrorMessages.CATEGORY_NOT_FOUND_ERR(category),
        );
    }
    const created = new Date().toLocaleDateString();
    const dates = findDates(content);
    const archived = false;
    return NotesRepository.add({name, created, category, content, dates, archived});
}

async function updateFields(id: number, name: string, category: string, content: string): Promise<void> {
    const persists = await NotesRepository.persists(id);
    if (!persists) {
        throw new RouteError(
            HttpStatusCodes.NOT_FOUND,
            ErrorMessages.NOTE_NOT_FOUND_ERR,
        );
    }
    const categoryPersists = await CategoriesRepository.persists(category);
    if (!categoryPersists) {
        throw new RouteError(
            HttpStatusCodes.NOT_FOUND,
            ErrorMessages.CATEGORY_NOT_FOUND_ERR(category),
        );
    }
    const dates = findDates(content);
    return NotesRepository.updateFields(id, name, category, content, dates);
}

async function updateArchived(id: number, archived: boolean): Promise<void> {
    const persists = await NotesRepository.persists(id);
    if (!persists) {
        throw new RouteError(
            HttpStatusCodes.NOT_FOUND,
            ErrorMessages.NOTE_NOT_FOUND_ERR,
        );
    }
    return NotesRepository.updateArchived(id, archived);
}

async function _delete(id: number): Promise<void> {
    const persists = await NotesRepository.persists(id);
    if (!persists) {
        throw new RouteError(
            HttpStatusCodes.NOT_FOUND,
            ErrorMessages.NOTE_NOT_FOUND_ERR,
        );
    }
    return NotesRepository.delete(id);
}

async function getStats(): Promise<IStats[]> {
    const categories = await CategoriesRepository.getAll();
    const notes = await NotesRepository.getAll();
    const stats: IStats[] = [];
    categories.forEach((category: string) => {
        const active = countActiveNotesByCategory(notes, category);
        const archived = countArchivedNoteByCategory(notes, category);
        stats.push({category, active, archived});
    });
    return stats;
}

function countActiveNotesByCategory(notes: INote[], category: string) {
    return notes.filter((note: INote) => note.category === category && !note.archived).length;
}

function countArchivedNoteByCategory(notes: INote[], category: string) {
    return notes.filter((note: INote) => note.category === category && note.archived).length;
}

export default {
    getAll,
    getOne,
    addOne,
    updateFields,
    updateArchived,
    delete: _delete,
    getStats
} as const;

