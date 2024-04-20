const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Image extends Model { }

    Image.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        gallery_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tag: {
            type: DataTypes.TEXT,
        },
        descript: {
            type: DataTypes.TEXT,
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
        modelName: 'Image',
    });



    (async () => { 
        try {
            await sequelize.sync();
            console.log("[DB] Image 테이블이 생성되었습니다.");
        } catch(error) {
            console.log(`[DB] Image 테이블 생성에 실패했습니다: ${error}`);
        }
    })();

    return Image;
};