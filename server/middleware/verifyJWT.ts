import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import db from "../models";

const User = db.User;
type UserType = typeof User;

interface AuthRequest extends Request {
  user?: UserType;
}

const verifyJWT = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401);
    return res.status(401).send({ error: "Not authorized, no token" });
  }

  try {
    const { phoneNumber } = jwt.verify(
      token,
      process.env.JWT_SECRET as Secret
    ) as JwtPayload;
    req.user = await User.findByPk(phoneNumber);
    next();
  } catch (error) {
    console.log("JWT verification failed:", error);
    return res.status(403).send({ error: "Not authorized" });
  }
};

export { AuthRequest, verifyJWT };