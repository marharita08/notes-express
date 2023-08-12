import CategoriesRepository from "../repositories/CategoriesRepository";
import {ICategory} from "../model/Category";

async function getAll(): Promise<ICategory[]> {
    return CategoriesRepository.getAll();
}

async function persists(category_id: number): Promise<boolean> {
    return CategoriesRepository.persists(category_id);
}

export default {
    getAll,
    persists
} as const;
