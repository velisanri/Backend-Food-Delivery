const dbConfig = require('../config/dbConfig');
const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorAliases: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,
        }
    }
); 

const db = {}

db.products = require('./productModel.js')(sequelize, DataTypes);
db.users = require("./userModel.js")(sequelize,DataTypes);
db.orders = require("./orderModel.js")(sequelize,DataTypes);
db.orderItems = require("./orderItemModel.js")(sequelize,DataTypes);
db.carts = require("./cartModel.js")(sequelize,DataTypes);
db.cartItems = require("./cartItemModel.js")(sequelize,DataTypes);
db.adress = require("./adress.js")(sequelize,DataTypes);
db.payments = require("./payments.js")(sequelize,DataTypes);
db.categories = require("./category.js")(sequelize,DataTypes);

db.products.belongsTo(db.users);


db.users.hasMany(db.adress, { foreignKey: 'userId' });
db.users.hasMany(db.payments, { foreignKey: 'userId' });
db.users.hasMany(db.orders);
db.users.hasMany(db.products);
db.users.hasOne(db.carts);

 
db.orders.belongsTo(db.users);
db.carts.belongsTo(db.users); 
db.adress.belongsTo(db.users, { foreignKey: 'userId' });
db.payments.belongsTo(db.users, { foreignKey: 'userId' });
db.products.belongsTo(db.categories);


db.orderItems.belongsTo(db.products, {  
  foreignKey: {
    allowNull: false
  }
});

db.orderItems.belongsTo(db.orders, {
    foreignKey: {
      allowNull: false
    }
});



db.cartItems.belongsTo(db.products, {
    foreignKey: {
      allowNull: false
    }
});
db.cartItems.belongsTo(db.carts, {
    foreignKey: {
      allowNull: false
    }
});


db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.sequelize.sync({force: false})
.then(() => {
    console.log('Sequelize ve db bağlantısı oluştu'); 
    const createProducts = require("../config/products");
    createProducts();
});


module.exports = db;