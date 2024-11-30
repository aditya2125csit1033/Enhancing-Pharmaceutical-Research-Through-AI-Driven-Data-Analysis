module.exports = (sequelize, DataTypes)=>{
 const registerdb = sequelize.define("registerdb",{
    Username:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    Password:{
       type: DataTypes.STRING,
       allowNull: false,   
    },
    Email:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    Pfp:{
        type: DataTypes.TEXT('long'),
        allowNull: true,
    }

 });

 
 return registerdb;
};