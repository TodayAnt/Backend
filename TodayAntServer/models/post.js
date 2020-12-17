module.exports = (sequelize, DataTypes) => {
    return sequelize.define('post',{
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

        interest_id : {
            type : DataTypes.INTEGER,
            allowNULL : false
        },

        keyword_num : {
            type : DataTypes.INTEGER,
            allowNULL : false,
            defaultValue : 0
        },

        headline : {
            type : DataTypes.STRING(100),
            allowNULL : false
        },

        summary : {
            type : DataTypes.STRING(500),
            allowNULL : true
        },
    
        upload_time: {
            type : DataTypes.DATE,
            allowNULL : false,
            defaultValue: sequelize.literal('now()')
        },

        cur_price : {
            type : DataTypes.INTEGER,
            allowNULL : true
        },
    },
    
        {
            timestamps : true,
            paranoid : true,
        }

    
    )

};