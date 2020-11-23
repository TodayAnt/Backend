module.exports = (sequelize, DataTypes) => {
    return sequelize.define('interest',{
        id : {
            type : DataTypes.INTEGER,
            unique : true,
            autoIncrement: true,
            primaryKey: true
        },

        user_id : {
            type : DataTypes.INTEGER,
            allowNULL : false
        },

        item : {
            type : DataTypes.STRING(30),
            allowNULL : false
        },
    },
    
        {
            timestamps : true,
            paranoid : true,
        }

    )

};