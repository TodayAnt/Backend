module.exports = (sequelize, DataTypes) => {
    return sequelize.define('itemcode',{
        id : {
            type : DataTypes.INTEGER,
            unique : true,
            autoIncrement: true,
            primaryKey: true
        },

        item : {
            type : DataTypes.STRING(30),
            allowNULL : false
        },

        code : {
            type : DataTypes.STRING(15),
            allowNULL : false
        },

    },
        {
            timestamps : true,
            //paranoid : true,
        }
    )

};