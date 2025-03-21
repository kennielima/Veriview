

import { DataTypes, Model } from "sequelize";
import sequelize from "../db/sequelize";

declare module 'sequelize' {
    interface Model {
        id: string;
        productRating: number;
        userId: string;
        productId: string;
    }
}

class UserRating extends Model {
    declare id: string;
}

UserRating.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    // productName: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    // },
    productRating: {
        type: DataTypes.DECIMAL(2, 1),
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    productId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Products',
            key: 'id'
        }
    }
},
    {
        sequelize,
        modelName: 'UserRating',
        tableName: 'UserRatings',
        timestamps: true,
    }
);

export default UserRating;
