const { Sequelize, DataTypes } = require('sequelize');
const mysql = require('mysql2')
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  logging: true,
});

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [6, 255], // Ensure password length is between 6 and 255 characters
    },
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW, // 현재 시간 자동 설정
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW, // 현재 시간 자동 설정
  },
});

(async () => {
  await sequelize.sync(); // Sync the defined models to the database
  console.log("User table created successfully!");
})();

module.exports = User;