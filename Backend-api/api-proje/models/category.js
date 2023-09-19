module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define("category", {
      id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
    return Category;
  };  