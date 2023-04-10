const Sequelize = require('sequelize');
import { Request, Response } from "express";
import db from "../models";
import {AuthRequest} from '../middleware/verifyJWT'

const Message = db.Message;
const Chat = db.Chat;

export const getAllMessages = async (req: Request, res: Response) => {
  try {
    const messages = await Message.findAll();
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export const getUserMessages = async (req: Request, res: Response) => {
  const UserPhoneNumber = req.params.id;

  try {
    const messages = await Message.findAll({ where: { UserPhoneNumber } });
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export const sendMessage = async (req: AuthRequest, res: Response) => {
  const UserPhoneNumber = req.user.phoneNumber;
  const ChatId = req.params.chatId;
  const { content } = req.body;

  try {
    const chat = await Chat.findByPk(ChatId);
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    const messages = await Message.create({ content, ChatId, UserPhoneNumber });
    chat.changed('updatedAt', true)
    await chat.update({ updatedAt: Sequelize.literal('CURRENT_TIMESTAMP') });
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};


export const deleteMessage = async (req: Request, res: Response) => {
  const { UserId, MessageId } = req.body;

  try {
    const messages = await Message.destroy({ where: { MessageId, UserId } });
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
