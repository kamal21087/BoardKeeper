import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // 1. Check if the user exists in the database
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // 2. Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // 3. Generate a JWT token
    const token = jwt.sign(
      { username: user.username, id: user.id }, // Payload
      process.env.JWT_SECRET as string,        // Secret key
      { expiresIn: '1h' }                      // Token expiration
    );

    // 4. Return the token to the client
    return res.status(200).json({ token });
  } catch (err) {
    console.error('Error during login:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
