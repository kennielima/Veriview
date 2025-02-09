

import { DataTypes, Model } from "sequelize";
import sequelize from "../db/sequelize";

declare module 'sequelize' {
    interface Model {
        id: string;
        name: string;
        rating: number;
    }
}

class Product extends Model {
    declare id: string
}

Product.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
},
    {
        sequelize,
        modelName: 'Product',
        tableName: 'Products',
        timestamps: true,
    }
);

export default Product;
