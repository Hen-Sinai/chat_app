import { Model } from "sequelize";

interface UserAttributes {
  name: string;
  phoneNumber: string;
  about?: string;
  profilePicture: string;
  createdAt?: Date;
  updatedAt?: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    name!: string;
    phoneNumber!: string;
    about?: string;
    profilePicture!: string;
    createdAt?: Date;
    updatedAt?: Date;

    static associate(models: any) {
      User.hasMany(models.Message);
      User.belongsToMany(models.Chat, { through: 'UserChat' });
    }
  }
  User.init(
    {
      phoneNumber: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: [10, 10],
            msg: "Phone number must be in the format of: xxxxxxxxxx",
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      about: {
        type: DataTypes.STRING,
      },
      profilePicture: {
        type: DataTypes.STRING,
        defaultValue: "https://res.cloudinary.com/dirqpzfls/image/upload/v1679066183/Anony_oekpbq.jpg",
      },
      createdAt: {
        type: "TIMESTAMP",
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
      updatedAt: {
        type: "TIMESTAMP",
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      paranoid: true,
    }
  );

  return User;
};
