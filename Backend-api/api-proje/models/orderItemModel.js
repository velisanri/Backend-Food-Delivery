module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define("orderItem", {
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
      },
    });
  
    return OrderItem;
  };
   