module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [1, 50]
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
      }
    }, {
      timestamps: false
    });

    User.associate = function(models) {
      User.hasMany(models.Giftee, {
        onDelete: "cascade"
      });
    };

    return User;
};
