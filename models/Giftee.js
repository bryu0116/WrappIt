module.exports = function(sequelize, DataTypes) {
    const Giftee = sequelize.define("Giftee", {
        giftee: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 50]
            }
        },
        relation: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 50]
            }
        },
        personality: DataTypes.STRING,
        music: DataTypes.STRING,
        books: DataTypes.STRING,
        movies: DataTypes.STRING,
        clothing_size: DataTypes.STRING,
        user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: "User",
              key: 'id', 
            }
        }
    });

    Giftee.associate = function(models) {
        Giftee.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
        
        Giftee.hasMany(models.Gift, {
            onDelete: "cascade"
        });
    };
    return Giftee;
};  