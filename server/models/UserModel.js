const keys = require('../config/key');
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
    class User extends Model { }

    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
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
                len: [6, 255],
            },
        },
        role: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        token: {
            type: DataTypes.STRING,
        },
        tokenExp: {
            type: DataTypes.INTEGER,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, {
        sequelize,
        modelName: 'User',
        hooks : {
            beforeCreate : (async (user) => {
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(user.dataValues.password, saltRounds);
                user.dataValues.password = hashedPassword;
            }),
        },
    });

    User.prototype.comparePassword = ((userPW, requestPW, callback) => {
        bcrypt.compare(requestPW, userPW, (err, isMatch) => {
            if (err) {
                return callback(err);
            }
            return callback(null, isMatch);
        });
    });

    User.prototype.generateToken = (async (user, callback) => {
        var token = jwt.sign(user.dataValues.id, keys.JWT_SECRET_KEY);

        user.token = token;
        try {
            await user.save();
            return callback(null, user);
        } catch (error) {
            return callback(error);
        }
    });

    User.prototype.findByToken = (async (requestToken, callback) => {
        jwt.verify(requestToken, keys.JWT_SECRET_KEY, async (err, decoded) => {

            const user = await User.findOne({ where: { id: decoded, token: requestToken } });

            if (err) {
                return callback(err);
            }
            return callback(null, user);
        });
    });

    User.prototype.deleteToken = (async (user, callback) => {
        user.token = null;

        try {
            await user.save();
            return callback(null, user);
        } catch (error) {
            return callback(err);
        }
    });


    (async () => {
        try {
            await sequelize.sync();
            console.log("[DB] User 테이블이 생성되었습니다.");
        } catch(error) {
            console.log(`[DB] User 테이블 생성에 실패했습니다: ${error}`);
        }
    })();

    return User;
};