module.exports = function(sequelize, DataTypes) {
    const Giftee = sequelize.define("Giftee", {
        giftee: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 10]
            }
        },
        music_genre: DataTypes.STRING,
        books_genre: DataTypes.STRING,
        movies_genre: DataTypes.STRING
    }, {
        timestamps: false
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