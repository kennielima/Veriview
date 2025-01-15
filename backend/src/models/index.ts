import { Sequelize } from 'sequelize';
import User from './User';
import Review from './Review';
import Product from './Product';

const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.PORT),
    logging: console.log
});

User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });
Review.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(Review, { foreignKey: 'productId' });

const initializeDatabase = async () => {
    try {
        console.log('Starting database sync...');
        await sequelize.authenticate();
        console.log('Database synced successfully!');
    } catch (error) {
        console.error('Failed to sync database:', error);
    }
};
initializeDatabase();

export default { User, Review, Product, sequelize };

