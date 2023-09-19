const { Sequelize, DataTypes } = require("sequelize");

module.exports = (Sequelize,DataTypes) =>{
    const Payment = Sequelize.define("payment",{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
          },
          fullname: {
            type: DataTypes.STRING,
          },
          cartNumber:{
            type:DataTypes.INTEGER,
          },
          CVV:
          {
            type:DataTypes.INTEGER,
          },
          
    });
    return Payment;
}