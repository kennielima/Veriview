

import { DataTypes, Model } from "sequelize";
import sequelize from "../db/sequelize";
import Review from "./Review";

declare module 'sequelize' {
    interface Model {
        id: number;
        name: string;
        rating: string;
    }
}

class Product extends Model {
    declare id: number
}

Product.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
// Product.hasMany(Review, {
//     foreignKey: 'productId',
//     as: 'reviews'
// });

export default Product;
