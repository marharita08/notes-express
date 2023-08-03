import orm from './MockOrm';

async function getAll(): Promise<string[]> {
    const db = await orm.openDb();
    return db.categories;
}

async function persists(category: string): Promise<boolean> {
    const db = await orm.openDb();
    const index = db.categories.indexOf(category);
    return index !== -1;
}

export default {
    getAll,
    persists
} as const;
