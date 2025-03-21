

import { DataTypes, Model } from "sequelize";
import sequelize from "../db/sequelize";
import Review from "./Review";

declare module 'sequelize' {
    interface Model {
        id: string;
        name: string;
        averageRating: number;
        ratingsCount: number;
    }
}

class Product extends Model {
    declare id: string;
    reviews?: Review[];
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
    averageRating: {
        type: DataTypes.DECIMAL(2, 1),
        allowNull: false,
        validate: { min: 1, max: 5 }
    },
    ratingsCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
},
    {
        sequelize,
        modelName: 'Product',
        tableName: 'Products',
        timestamps: true,
    }
);

export default Product;
