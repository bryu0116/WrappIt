module.exports = function(sequelize, DataTypes) {
    const Link = sequelize.define("Link", {
        gift_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 255]
            }
        },
        gift_id: {
            type: DataTypes.INTEGER,
            references: {
              model: Gift,
              key: 'id', 
            }
        }
    });

    Link.associate = function(models) {
        Link.belongsTo(models.Gift, {
          foreignKey: {
            allowNull: false
          }
        });
    };
    return Link;
};  