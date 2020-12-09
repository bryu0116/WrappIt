module.exports = function(sequelize, DataTypes) {
    const Gift = sequelize.define("Gift", {
        gift: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 255]
            }
        },
        gift_desc: {
            type: DataTypes.STRING,
            validate: {
                len: [1, 255]
            }
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
        
        Gift.hasMany(models.Link, {
            onDelete: "cascade"
        });
    };
    return Gift;
};  