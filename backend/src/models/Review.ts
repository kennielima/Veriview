

import { DataTypes, Model } from "sequelize";
import sequelize from "../db/sequelize";
import User from "./User";
import Product from "./Product";

declare module 'sequelize' {
    interface Model {
        id: number;
        title: string;
        brand: string;
        content: string;
        rating: string;
    }
}


class Review extends Model {
    declare id: number
}

Review.init({
        id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT || DataTypes.BLOB,
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
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id'
        }
    }
},
    {
        sequelize,
        modelName: 'Review',
        tableName: 'Reviews',
        timestamps: true,
    }
);
User.hasMany(Review, { 
    foreignKey: 'userId',
    as: 'reviews' 
  });
  Review.belongsTo(User, { 
    foreignKey: 'userId',
    as: 'user' 
  });
  Review.belongsTo(Product, { 
    foreignKey: 'productId',
    as: 'product' 
  });

export default Review;




// const Review = sequelize.define('Reviews', { //DEFINE METHOD
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     title: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     content: {
//         type: DataTypes.TEXT || DataTypes.BLOB,
//         allowNull: false
//     },
//     rating: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         validate: {
//             min: 1,
//             max: 5
//         }
//     },
//     // userId: {
//     //     type: DataTypes.INTEGER,
//     //     allowNull: false,
//     //     references: {
//     //         model: 'User',
//     //         key: 'id'
//     //     }
//     // }
// },
//     {
//         modelName: 'Review',
//         tableName: 'Reviews',
//         timestamps: true,
//     }
// );
// User.hasMany(Review, { 
//     foreignKey: 'userId',
//     as: 'reviews' 
//   });
//   Review.belongsTo(User, { 
//     foreignKey: 'userId',
//     as: 'user' 
//   });

// export default Review;

