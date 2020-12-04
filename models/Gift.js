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
        },
        giftee_id: {
            type: DataTypes.INTEGER,
            references: {
              model: Giftee,
              key: 'id', 
            }
        }
    });

    Gift.associate = function(models) {
        Gift.belongsTo(models.Giftee, {
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