module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
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
      email: {
        type: DataTypes.STRING,
      },
      phone:{
        type:DataTypes.STRING,
      },
      password:{
        type:DataTypes.STRING,
      }
    });
    return User;
  };