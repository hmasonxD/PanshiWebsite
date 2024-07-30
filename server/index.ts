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

app.get('/api/user-profile/:id', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
      firstName: user.firstName,
      email: user.email,
      gender: user.gender,
      birthday: user.birthday,
      phoneNumber: user.phoneNumber,
      bio: user.profile?.bio,
      photos: user.profile?.photos,
      prompts: user.profile?.prompts,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Error fetching user profile' });
  }
});

app.put('/api/user-profile/:id', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { bio, photos, prompts } = req.body;
    const updatedProfile = await prisma.profile.upsert({
      where: { userId },
      update: { bio, photos, prompts },
      create: { userId, bio, photos, prompts },
    });
    res.json(updatedProfile);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Error updating user profile' });
  }
});

app.put('/api/user/:id', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { firstName, email, gender, birthday, phoneNumber } = req.body;
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName,
        email,
        gender,
        birthday: birthday ? new Date(birthday) : undefined,
        phoneNumber,
      },
    });
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Error updating user' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});