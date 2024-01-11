import express, { Request, Response } from "express";
const router = express.Router();
import { UserModel, UserDocument } from "../models/User";

// Route: /createUser
// Create new user
router.post("/user/createUser", async (req: Request, res: Response) => {
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

    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error creating user: ", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Route: /user/saveGame/:userId
// Save user's game
router.post("/saveGame/:userId", async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    // Retrieve user document
    const user: UserDocument | null = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Update user's money and last update
    const { money } = req.body;
    user.money = money;
    user.lastUpdate = new Date();

    await user.save();

    res.status(200).json({ message: "Game saved successfully." });
  } catch (error) {
    console.error("Error saving game:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

export default router;
