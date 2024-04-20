const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

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
        refreshToken: {
            type: DataTypes.STRING,
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

    User.prototype.comparePassword = ((userPW, requestPW) => {
        const isMatch = bcrypt.compareSync(requestPW, userPW);

        return isMatch;
    });

    User.prototype.saveToken = (async (user, token) => {
        user.refreshToken = token;
        try {
            await user.save();
            return true;
        } catch (error) {
            return false;
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