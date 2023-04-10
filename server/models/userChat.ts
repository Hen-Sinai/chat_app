module.exports = (sequelize: any, DataTypes: any) => {
  const UserChat = sequelize.define('UserChat', {
    UserPhoneNumber: {
      type: DataTypes.STRING,
      references: {
        model: 'User',
        key: 'phoneNumber'
      }
    },
    ChatId: {
      type: DataTypes.UUID,
      references: {
        model: 'Chat',
        key: 'id'
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
  });

  UserChat.associate = function (models: any) {
    UserChat.belongsTo(models.User, {
      foreignKey: 'UserPhoneNumber',
      targetKey: 'phoneNumber'
    });
    UserChat.belongsTo(models.Chat, {
      foreignKey: 'ChatId',
      targetKey: 'id'
    });
  };

  return UserChat;
};
