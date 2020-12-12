module.exports = function(sequelize, DataTypes) {
    const Gift = sequelize.define("Gift", {
        gift: {
            type: DataTypes.STRING,
            allowNull: false,
            // validate: {
            //     len: [1, 255]
            // }
        },
        author: {
            type: DataTypes.STRING,
        },
        gift_desc: {
            type: DataTypes.STRING,
        },
        gift_url: {
            type: DataTypes.STRING
            // allowNull: false,
            // validate: {
            //     isUrl: true
            // }
        },
        img_url: {
            type: DataTypes.STRING
            // allowNull: false,
            // validate: {
            //     isUrl: true
            // }
        }
    }, {
        timestamps: false
    });

    Gift.associate = function(models) {
        Gift.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
    };
    return Gift;
};  