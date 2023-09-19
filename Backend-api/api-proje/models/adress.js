const { Sequelize, DataTypes } = require("sequelize");

module.exports = (Sequelize,DataTypes) =>{
    const Adres = Sequelize.define("adres",{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
          },
          firstname: {
            type: DataTypes.STRING,
          },
          lastname: {
            type: DataTypes.STRING,
          },
          phone:{
            type:DataTypes.STRING,
          },
          city:{
            type:DataTypes.STRING,
          },
          adress:
          {
            type:DataTypes.STRING,
          },
          

    });

    return Adres;
}