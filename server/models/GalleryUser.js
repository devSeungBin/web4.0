const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class GalleryUser extends Model { }

    GalleryUser.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gallery_id: {
            type: DataTypes.STRING,
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
        modelName: 'GalleryUser',
    });



    (async () => { 
        try {
            await sequelize.sync();
            console.log("[DB] GalleryUser 테이블이 생성되었습니다.");
        } catch(error) {
            console.log(`[DB] GalleryUser 테이블 생성에 실패했습니다: ${error}`);
        }
    })();

    return GalleryUser;
};