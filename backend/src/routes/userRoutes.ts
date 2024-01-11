import express, { Request, Response } from "express";
const router = express.Router();
import UserModel from "../models/User";
import ProfileModel from "../models/Profile";

router.post("/createUser", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Both username and password are required." });
    }

    // Create new user
    const newUser = new UserModel({
      username,
      password
    });
    const savedUser = await newUser.save();

    // Create corresponding user profile
    const newProfile = new ProfileModel({ userId: savedUser._id });
    await newProfile.save();

    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error creating user: ", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
