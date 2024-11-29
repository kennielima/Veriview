import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/sequelize';

declare module 'sequelize' {
  interface Model {
    id: number;
    fullName: string;
    email: string;
    username: string;
    password: string;
  }
}
class User extends Model {
  declare id: number
}

User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'Users'
  }
)
export default User;





// const User = sequelize.define('Users', { //DEFINE METHOD
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   fullName: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// },
//   {
//     modelName: 'User',
//     tableName: 'Users',
//      timestamps: true,
//   }
// );

// export default User;
