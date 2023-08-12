import Category, {ICategory} from "../model/Category";

async function getAll(): Promise<ICategory[]> {
    return Category.findAll();
}

async function persists(category_id: number): Promise<boolean> {
    let category: Category | null = await Category.findByPk(category_id);
    return category !== null;
}

export default {
    getAll,
    persists
} as const;
