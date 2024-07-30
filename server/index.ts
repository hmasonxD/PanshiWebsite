import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const port = process.env.SERVER_PORT || 3001;

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.post('/api/signup', async (req, res) => {
  try {
    const { email, password, firstName, gender, birthday } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        gender,
        birthday: new Date(birthday),
      },
    });
    res.json({ id: newUser.id, email: newUser.email });
  } catch (error) {
    console.error('Error in /api/signup:', error);
    res.status(500).json({ error: 'Error creating user', details: error instanceof Error ? error.message : String(error) });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid password' });
    }
    res.json({ id: user.id, email: user.email });
  } catch (error) {
    console.error('Error in /api/login:', error);
    res.status(500).json({ error: 'Error logging in', details: error instanceof Error ? error.message : String(error) });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});