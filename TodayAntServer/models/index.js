'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config')[env];
const db = {};
const sequelize = new Sequelize ({
  hostname: config.hostname,
  database: config.database,
  username: config.username,
  password: config.password,
  dialect:  config.dialect
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Gauth = require('./gauth')(sequelize, Sequelize);
db.Interest = require('./interest')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.Keyword = require('./keyword')(sequelize, Sequelize);

// Model간 관계
//User-Gauth(N:1)     user_id-id
db.User.hasOne(db.Gauth, { foreignKey: 'user_id', sourceKey: 'id'});
db.Gauth.belongsTo(db.User, { foreignKey: 'user_id', sourceKey: 'id'});


//Interest-User(N:1)     user_id-id
db.User.hasMany(db.Interest, { foreignKey: 'user_id', sourceKey: 'id'});
db.Interest.belongsTo(db.User, { foreignKey: 'user_id', sourceKey: 'id'});

//Post-User(N:1)     user_id-id
db.User.hasMany(db.Post, { foreignKey: 'user_id', sourceKey: 'id'});
db.Post.belongsTo(db.User, { foreignKey: 'user_id', sourceKey: 'id'});

//Post-Interest(N:1)     interest_id-id
db.Interest.hasMany(db.Post, { foreignKey: 'interest_id', sourceKey: 'id'});
db.Post.belongsTo(db.Interest, { foreignKey: 'interest_id', sourceKey: 'id'});

//Keyword-Interest(N:1)     interest_id-id
db.Interest.hasMany(db.Keyword, { foreignKey: 'interest_id', sourceKey: 'id'});
db.Keyword.belongsTo(db.Interest, { foreignKey: 'interest_id', sourceKey: 'id'});

module.exports = db;
