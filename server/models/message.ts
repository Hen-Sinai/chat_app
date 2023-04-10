'use strict';

import {
  Model, UUIDV4
} from 'sequelize';

interface MessageAttributes {
  id: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Message extends Model<MessageAttributes> 
  implements MessageAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    content!: string;
    createdAt?: Date;
    updatedAt?: Date;
    static associate(models: any) {
      // define association here
      Message.belongsTo(models.User)
      Message.belongsTo(models.Chat)
    }
  };
  Message.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
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
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};