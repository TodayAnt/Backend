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

        code : {
            type : DataTypes.STRING(10),
            allowNULL : false
        },

        keyword1 : {
            type : DataTypes.STRING(45),
            allowNULL : true
        },

        keyword2 : {
            type : DataTypes.STRING(45),
            allowNULL : true
        },

        keyword3 : {
            type : DataTypes.STRING(45),
            allowNULL : true
        },

        keyword4 : {
            type : DataTypes.STRING(45),
            allowNULL : true
        },

        keyword5 : {
            type : DataTypes.STRING(45),
            allowNULL : true
        },

        keyword6 : {
            type : DataTypes.STRING(45),
            allowNULL : true
        },

        keyword7 : {
            type : DataTypes.STRING(45),
            allowNULL : true
        },

        keyword8 : {
            type : DataTypes.STRING(45),
            allowNULL : true
        },

        keyword9 : {
            type : DataTypes.STRING(45),
            allowNULL : true
        },

        keyword10 : {
            type : DataTypes.STRING(45),
            allowNULL : true
        },
    },
    
        {
            timestamps : true,
            //paranoid : true,
        }

    )

};