import NotesRepository from "../repositories/NotesRepository";
import CategoriesRepository from "../repositories/CategoriesRepository";
import {INote} from "../model/Note";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import {RouteError} from "../other/classes";
import {findDates} from "../helpers/findDates";
import {IStats} from "../model/Stats";
import ErrorMessages from "../constants/ErrorMessages";

interface INoteAddUpdate {
    name: string,
    category_id: number,
    content: string,
}

async function getAll():Promise<INote[]> {
    return NotesRepository.getAll();
}

async function getOne(id: number): Promise<INote | null> {
    const persists = await NotesRepository.persists(id);
    if (!persists) {
        throw new RouteError(
            HttpStatusCodes.NOT_FOUND,
            ErrorMessages.NOTE_NOT_FOUND_ERR,
        );
    }
    return NotesRepository.getOne(id);
}

async function addOne(note: INoteAddUpdate): Promise<number> {
    const persists = await CategoriesRepository.persists(note.category_id);
    if (!persists) {
        throw new RouteError(
            HttpStatusCodes.NOT_FOUND,
            ErrorMessages.CATEGORY_NOT_FOUND_ERR,
        );
    }
    const dates = findDates(note.content);
    const archived = false;
    return NotesRepository.add({...note, dates, archived});
}

async function update(id: number, note: INoteAddUpdate): Promise<void> {
    const persists = await NotesRepository.persists(id);
    if (!persists) {
        throw new RouteError(
            HttpStatusCodes.NOT_FOUND,
            ErrorMessages.NOTE_NOT_FOUND_ERR,
        );
    }
    const categoryPersists = await CategoriesRepository.persists(note.category_id);
    if (!categoryPersists) {
        throw new RouteError(
            HttpStatusCodes.NOT_FOUND,
            ErrorMessages.CATEGORY_NOT_FOUND_ERR,
        );
    }
    const dates = findDates(note.content);
    return NotesRepository.update(id, {...note, dates});
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
    const stats: IStats[] = [];
    for (const category of categories) {
        const active = await NotesRepository.countActiveNotesByCategory(category.category_id);
        const archived = await NotesRepository.countArchivedNotesByCategory(category.category_id);
        stats.push({category: category.category, active, archived})
    }
    return stats;
}

export default {
    getAll,
    getOne,
    addOne,
    update,
    updateArchived,
    delete: _delete,
    getStats
} as const;

