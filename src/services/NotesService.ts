import NotesRepository from "../repositories/NotesRepository";
import CategoriesService from "./CategoriesService";
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

async function getActive():Promise<INote[]> {
    return NotesRepository.getActive();
}

async function getArchived():Promise<INote[]> {
    return NotesRepository.getArchived();
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

async function addOne(note: INoteAddUpdate): Promise<INote|null> {
    const persists = await CategoriesService.persists(note.category_id);
    if (!persists) {
        throw new RouteError(
            HttpStatusCodes.NOT_FOUND,
            ErrorMessages.CATEGORY_NOT_FOUND_ERR,
        );
    }
    const dates = findDates(note.content);
    const archived = false;
    const addedNote = await NotesRepository.add({...note, dates, archived});
    return NotesRepository.getOne(addedNote.note_id);
}

async function update(id: number, note: INoteAddUpdate): Promise<INote|null> {
    const persists = await NotesRepository.persists(id);
    if (!persists) {
        throw new RouteError(
            HttpStatusCodes.NOT_FOUND,
            ErrorMessages.NOTE_NOT_FOUND_ERR,
        );
    }
    const categoryPersists = await CategoriesService.persists(note.category_id);
    if (!categoryPersists) {
        throw new RouteError(
            HttpStatusCodes.NOT_FOUND,
            ErrorMessages.CATEGORY_NOT_FOUND_ERR,
        );
    }
    const dates = findDates(note.content);
    await NotesRepository.update(id, {...note, dates});
    return NotesRepository.getOne(id);
}

async function updateArchived(id: number, archived: boolean): Promise<INote|null> {
    const persists = await NotesRepository.persists(id);
    if (!persists) {
        throw new RouteError(
            HttpStatusCodes.NOT_FOUND,
            ErrorMessages.NOTE_NOT_FOUND_ERR,
        );
    }
    await NotesRepository.updateArchived(id, archived);
    return NotesRepository.getOne(id);
}

async function _delete(id: number): Promise<INote|null> {
    const persists = await NotesRepository.persists(id);
    if (!persists) {
        throw new RouteError(
            HttpStatusCodes.NOT_FOUND,
            ErrorMessages.NOTE_NOT_FOUND_ERR,
        );
    }
    const note = await NotesRepository.getOne(id);
    await NotesRepository.delete(id);
    return note;
}

async function getStats(): Promise<IStats[]> {
    const categories = await CategoriesService.getAll();
    const stats: IStats[] = [];
    for (const category of categories) {
        const active = await NotesRepository.countActiveNotesByCategory(category.category_id);
        const archived = await NotesRepository.countArchivedNotesByCategory(category.category_id);
        stats.push({category: category.name, active, archived})
    }
    return stats;
}

export default {
    getAll,
    getActive,
    getArchived,
    getOne,
    addOne,
    update,
    updateArchived,
    delete: _delete,
    getStats
} as const;

