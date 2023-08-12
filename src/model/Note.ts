import { Model, DataTypes, Optional } from 'sequelize';
import sequelize  from "../repositories/SequelizeORM";
import Category from "./Category";

export interface INote {
    note_id: number,
    name: string,
    created: Date,
    category_id: number,
    content: string,
    dates?: string,
    archived: boolean,
}

interface INoteCreation extends Optional<INote, 'note_id' | 'created'> {}

class Note extends Model<INote, INoteCreation> implements INote {
    note_id!: number;
    name!: string;
    created!: Date;
    category_id!: number;
    content!: string;
    dates?: string;
    archived!: boolean;
}

Note.init({
    note_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING(300),
        allowNull: false
    },
    created: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    dates: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    archived: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
},  {
    sequelize,
    tableName: 'notes',
    createdAt: 'created',
    updatedAt: false
});

Note.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

export default Note;
