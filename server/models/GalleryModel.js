const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Gallery extends Model { }

    Gallery.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        theme: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descript: {
            type: DataTypes.TEXT,
        },
        admin_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
        modelName: 'Gallery',
    });



    (async () => { 
        try {
            await sequelize.sync();
            console.log("[DB] Gallery 테이블이 생성되었습니다.");
        } catch(error) {
            console.log(`[DB] Gallery 테이블 생성에 실패했습니다: ${error}`);
        }
    })();

    return Gallery;
};