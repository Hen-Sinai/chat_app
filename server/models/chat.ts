"use strict";

import { Model, UUIDV4 } from "sequelize";

interface ChatAttributes {
  id: string;
  name: string;
  profilePicture: string;
  chatType: "private" | "group";
  createdAt?: Date;
  updatedAt?: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Chat extends Model<ChatAttributes> implements ChatAttributes {
    id!: string;
    name!: string;
    profilePicture!: string;
    chatType!: "private" | "group";
    createdAt?: Date;
    updatedAt?: Date;
    static associate(models: any) {
      // define association here
      Chat.hasMany(models.Message);
      Chat.belongsToMany(models.User, { through: 'UserChat' });
    }
  }
  Chat.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      chatType: {
        type: DataTypes.ENUM("private", "group"),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profilePicture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true
        }
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
      modelName: "Chat",
    }
  );
  return Chat;
};
