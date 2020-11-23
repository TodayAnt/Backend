module.exports = (sequelize, DataTypes) => {
    return sequelize.define('keyword',{
        id : {
            type : DataTypes.INTEGER,
            unique : true,
            autoIncrement: true,
            primaryKey: true
        },

        interest_id : {
            type : DataTypes.INTEGER,
            allowNULL : false
        },

        name : {
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