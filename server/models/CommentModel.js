const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Comment extends Model { }

    Comment.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        image_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        comment: {
            type: DataTypes.TEXT,
        },
        isSecret: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        password: {
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
        modelName: 'Comment',
    });



    (async () => { 
        try {
            await sequelize.sync();
            console.log("[DB] Comment 테이블이 생성되었습니다.");
        } catch(error) {
            console.log(`[DB] Comment 테이블 생성에 실패했습니다: ${error}`);
        }
    })();

    return Comment;
};