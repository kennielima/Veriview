

import { DataTypes, Model } from "sequelize";
import sequelize from "../db/sequelize";

declare module 'sequelize' {
    interface Model {
        id: string;
        productRating: number;
        userId: string;
        reviewId: string;
    }
}

class RatedHelpful extends Model {
    declare id: string;
}

RatedHelpful.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    helpful: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    reviewId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Reviews',
            key: 'id'
        }
    }
},
    {
        sequelize,
        modelName: 'RatedHelpful',
        freezeTableName: true,
        timestamps: true,
    }
);

export default RatedHelpful;
