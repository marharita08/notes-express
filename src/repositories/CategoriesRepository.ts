import orm from './MockOrm';

async function getAll(): Promise<string[]> {
    const db = await orm.openDb();
    return db.categories;
}

export default {
    getAll
} as const;
