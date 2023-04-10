import { Request, Response } from "express";
import db from "../models";
import cloudinary from "../utils/cloudinary";
import { AuthRequest } from "../middleware/verifyJWT";

const User = db.User;

export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req: AuthRequest, res: Response) => {
  const { phoneNumber } = req.params;

  try {
    const user = await db.User.findByPk(phoneNumber);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export const updateUser = async (req: AuthRequest, res: Response) => {
  const { phoneNumber } = req.user;
  const { about } = req.body;

  try {
    // const user = await User.findByPk(phoneNumber);
    // const publicIdMatches = user.profilePicture?.match(/\/[^/]*$/);
    // const publicId = publicIdMatches[0].slice(1);

    const [numUpdated, updatedUsers] = await User.update(
      { about },
      {
        where: { phoneNumber },
        returning: true,
      }
    );

    // if (profilePicture && user.profilePicture) {
    //   await cloudinary.uploader.destroy(publicId);
    // }

    if (numUpdated === 0) {
      throw new Error(`Could not find user with phone number ${phoneNumber}`);
    }
    res.status(200).json(updatedUsers[0]);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUserContacts = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { contactsNumbers } = req.query;

  try {
    const contacts = await User.findAll({
      where: {
        phoneNumber: contactsNumbers,
      },
    });
    
    res.status(200).json({ contacts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (req: AuthRequest, res: Response) => {
  const { phoneNumber } = req.params;
  try {
    const numDeleted = await User.destroy({ where: { phoneNumber } });
    if (numDeleted === 0) {
      throw new Error(`Could not find user with phone number ${phoneNumber}`);
    }
    res.sendStatus(204);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
