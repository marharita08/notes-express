import { Model, DataTypes } from 'sequelize';
import sequelize  from "../repositories/SequelizeORM";

export interface ICategory {
    category_id: number,
    name: string
}

class Category extends Model<ICategory> {
    category_id!: number;
    name!: string
}

Category.init({
    category_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'categories',
    timestamps: false,
});

export default Category;
