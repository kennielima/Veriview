import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/sequelize';

interface UserAttributes {
  id?: number;
  fullName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword?: string;
}

declare module 'sequelize' {
  interface Model {
    id: number;
    fullName: string;
    email: string;
    username: string;
    password: string;
  }
}
class User extends Model { }

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
User.sync({ force: true })
  .then(() => console.log('Users table created successfully'))
  .catch((error) => console.error('Unable to create table : ', error));
export default User;