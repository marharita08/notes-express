import NotesRepository from "../repositories/NotesRepository";
import {INote} from "../model/Note";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import {RouteError} from "../other/classes";
import {findDates} from "../helpers/findDates";

export const NOTE_NOT_FOUND_ERR = "Note not found";

async function getAll():Promise<INote[]> {
    return NotesRepository.getAll();
}

async function getOne(id: number): Promise<INote | undefined> {
    const persists = await NotesRepository.persists(id);
    if (!persists) {
        throw new RouteError(
            HttpStatusCodes.NOT_FOUND,
            NOTE_NOT_FOUND_ERR,
        );
    }
    return NotesRepository.getOne(id);
}

async function addOne(name: string, category: string, content: string): Promise<void> {
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
            NOTE_NOT_FOUND_ERR,
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
            NOTE_NOT_FOUND_ERR,
        );
    }
    return NotesRepository.updateArchived(id, archived);
}

async function _delete(id: number): Promise<void> {
    const persists = await NotesRepository.persists(id);
    if (!persists) {
        throw new RouteError(
            HttpStatusCodes.NOT_FOUND,
            NOTE_NOT_FOUND_ERR,
        );
    }
    return NotesRepository.delete(id);
}

export default {
    getAll,
    getOne,
    addOne,
    updateFields,
    updateArchived,
    delete: _delete,
} as const;

