import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/sequelize';
import Review from './Review';

declare module 'sequelize' {
  interface Model {
    id: string;
    fullName: string;
    email: string;
    username: string;
    password: string;
    googleId: string
  }
}
class User extends Model {
  declare id: string
  reviews?: Review[];
}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
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
    allowNull: true,
    // validate: {
    //   passwordOrGoogleId(this: any) {
    //     if (!this.password && !this.googleId) {
    //       throw new Error('Password is required if not using Google authentication');
    //     }
    //   }
    // }
  },
  googleId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
  }
},
  {
    sequelize,
    modelName: 'User',
    tableName: 'Users'
  }
)

export default User;