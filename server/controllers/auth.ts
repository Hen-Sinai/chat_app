import { Request, Response } from "express";
import db from "../models";
import jwt, { Secret } from "jsonwebtoken";
import cloudinary from "../utils/cloudinary";

const User = db.User;

export const login = async (req: Request, res: Response) => {
  const { phoneNumber } = req.body;

  // Check if the user exists
  const user = await User.findOne({ where: { phoneNumber } });
  if (!user) {
    return res
      .status(401)
      .json({ message: "Invalid phone number or password" });
  }

  // Create and send the JWT token
  const token = jwt.sign(
    { phoneNumber: user.phoneNumber },
    process.env.JWT_SECRET as Secret
  );
  res.status(201).json({ user, token });
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { phoneNumber, name } = req.body;

    const existingUser = await User.findOne({
      where: {
        phoneNumber: phoneNumber,
      },
    });
    if (existingUser) {
      res
        .status(409)
        .json({ message: "User with this phone number already exists" });
      return;
    }

    const newUser = await User.create({
      phoneNumber: phoneNumber,
      name: name
    });

    // Create and send the JWT token
    const token = await jwt.sign(
      { phoneNumber: newUser.phoneNumber },
      process.env.JWT_SECRET as Secret
    );
    res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("jwt");
    res.status(200).send({ message: "Logged out successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while logging out." });
  }
};
