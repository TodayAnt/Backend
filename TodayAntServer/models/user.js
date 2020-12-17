module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user',{
        id : {
            type : DataTypes.INTEGER,
            unique : true,
            autoIncrement: true,
            primaryKey: true
        },

        refresh : {
            type : DataTypes.STRING(200),
            allowNull : true,
            unique : true,
        },

        email :{
            type : DataTypes.STRING(30),
            allowNull : true,
            unique : true,
        },

        gmail : {
            type : DataTypes.STRING(30),
            allowNull : true,
        },

        password : {
            type : DataTypes.STRING(200),
            allowNull : true,
        },

        salt : {
            type : DataTypes.STRING(64),
            allowNull : true,
        },
        
        nickname : {
            type : DataTypes.STRING(40),
            allowNull : true,
            unique : true
        },

        status : {
            type : DataTypes.TINYINT(1),
            allowNull : true,
            defaultValue : 1,
        },

        phone_num :{
            type : DataTypes.STRING(100)
        },

        gender : {
            type : DataTypes.TINYINT(1),
            allowNull : false,
            defaultValue : 1, 
        },
    
    },
    
        {
            timestamps : true,
            paranoid : true,
        }

    
    )

};