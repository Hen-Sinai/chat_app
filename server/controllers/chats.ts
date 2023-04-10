import { Request, Response } from "express";
import { Op, Transaction } from "sequelize";
import db from "../models";
import { AuthRequest } from "../middleware/verifyJWT";

const Chat = db.Chat;
const User = db.User;
const Message = db.Message;
const UserChat = db.UserChat;
type ChatType = typeof Chat;
type UserType = typeof User;
type MessageType = typeof Message;

export const getAllChats = async (req: Request, res: Response) => {
  try {
    const chats = await Chat.findAll();
    res.status(200).json(chats);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getChat = async (req: Request, res: Response) => {
  const ChatId = req.params.id;
  const UserId = req.body.id;

  try {
    const chat = await Chat.findByPk(ChatId);
    const users = await chat.getUsers();
    const messages = await Message.findAll({
      where: { ChatId },
      include: {
        model: User,
        attributes: ["name", "profilePicture"],
      },
      order: [["createdAt", "DESC"]],
    });

    if (chat.chatType === "private") {
      users.forEach((user: UserType) => {
        if (user.id !== UserId) {
          chat.name = user.name;
          chat.profilePicture = user.profilePicture;
        }
      });
    }
    res.status(200).json({ chat, messages });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsersFromChats = async (req: Request, res: Response) => {
  const chatId = req.params.id;

  try {
    const chat = await Chat.findByPk(chatId);
    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }
    const users = await chat.getUsers();
    return res.json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const createChat = async (req: Request, res: Response) => {
  const { chatType, usersPhoneNumber } = req.body;
  // let { name, profilePicture } = req.body;
  let { name } = req.body;

  // TEMP!!!!
  const profilePicture =
    "https://res.cloudinary.com/dirqpzfls/image/upload/v1679066183/Anony_oekpbq.jpg";

  if (chatType === "private") {
    name = "private";
    // profilePicture = "https://example.com/profile-picture.jpg";
  }
  // check if name is empty
  try {
    const chat = await db.sequelize.transaction(
      async (t: Transaction): Promise<ChatType> => {
        const newChat = await Chat.create(
          {
            name,
            profilePicture,
            chatType,
          },
          { transaction: t }
        );

        const userChatPromises = usersPhoneNumber.map(
          async (number: string): Promise<void> => {
            const user = await User.findByPk(number, { transaction: t });
            return newChat.addUser(user, { transaction: t });
          }
        );

        await Promise.all(userChatPromises);

        return newChat;
      }
    );

    res.json(chat);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const addUserToChat = async (req: Request, res: Response) => {
  const { usersPhoneNumber } = req.body;
  const chatId = req.params.id;

  try {
    const chat = await db.Chat.findOne({ where: { id: chatId } });
    if (chat.chatType === "private") {
      return res
        .status(400)
        .json({ message: "Can't add user to private chat" });
    }

    const users = await chat.getUsers();
    users.forEach((user: UserType) => {
      if (usersPhoneNumber.includes(user.phoneNumber)) {
        return res.status(400).json({ message: "User already in chat" });
      }
    });

    const userChatPromises = usersPhoneNumber.map(
      async (number: string): Promise<void> => {
        const user = await User.findByPk(number);
        return chat.addUser(user);
      }
    );

    await Promise.all(userChatPromises);

    return res.status(200).json({ message: "User added" });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteChat = async (req: Request, res: Response) => {
  const chatId = req.params.id;

  try {
    const chat = await db.Chat.findOne({
      where: { id: chatId },
      include: [db.Message],
    });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    await Promise.all(chat.Messages.map((message: any) => message.destroy()));

    await chat.destroy();

    res.json({ message: "Chat and messages deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllChatsOfUser = async (req: AuthRequest, res: Response) => {
  const { phoneNumber } = req.user;

  try {
    const chats = await UserChat.findAll({
      where: { UserPhoneNumber: phoneNumber },
      order: [["updatedAt", "ASC"]],
      include: [
        {
          model: Chat,
          include: [
            {
              model: Message,
              order: [["createdAt", "DESC"]],
              limit: 1,
            },
            {
              model: User,
              attributes: ["name", "profilePicture"],
              through: {
                attributes: [],
              },
              where: {
                phoneNumber: {
                  [Op.ne]: phoneNumber,
                },
              },
            },
          ],
        },
      ],
    });

    res.json({ chats });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getChatData = async (req: AuthRequest, res: Response) => {
  const { chatId } = req.params;
  const { phoneNumber } = req.user;

  try {
    const chat = await Chat.findByPk(chatId, {
      include: [
        {
          model: Message,
          order: [['createdAt', 'DESC']],
          include: [{ model: User, attributes: ["name"] }],
        },
        {
          model: User,
          attributes: ["name", "profilePicture"],
          through: {
            attributes: [],
          },
          where: {
            phoneNumber: {
              [Op.ne]: phoneNumber,
            },
          },
        },
      ],
    });

    res.json({ chat });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
