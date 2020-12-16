module.exports = (sequelize, DataTypes) => {
    return sequelize.define('gauth',{
        id : {
            type : DataTypes.INTEGER,
            unique : true,
            autoIncrement: true,
            primaryKey: true
        },

        user_id : {
            type : DataTypes.INTEGER,
            unique : true
        },

        admittion : {
            type : DataTypes.INTEGER,
            defaultValue : 0,
            allowNULL : false
        },

        refresh : {
            type : DataTypes.STRING(200),
            allowNull : true,
            unique : true,
        },

        gmail : {
            type : DataTypes.STRING(30),
            allowNull : true,
            unique : true,
        }
    },
    
        {
            timestamps : true,
            paranoid : true,
        }

    
    )

};