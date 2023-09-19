module.exports = (sequelize, DataTypes) => {
    const CartItem = sequelize.define("cartItem", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      }
    });
  
    return CartItem;
  };
   