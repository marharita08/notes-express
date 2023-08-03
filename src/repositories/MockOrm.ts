import jsonfile from 'jsonfile';
import {INote} from "../model/Note";

const DB_FILE_NAME = 'database.json';


interface IDb {
    notes: INote[],
    noteIdSeq: number
}

function openDb(): Promise<IDb> {
    return jsonfile.readFile(__dirname + '/' + DB_FILE_NAME) as Promise<IDb>;
}

function saveDb(db: IDb): Promise<void> {
    return jsonfile.writeFile((__dirname + '/' + DB_FILE_NAME), db);
}


// **** Export default **** //

export default {
    openDb,
    saveDb,
} as const;
