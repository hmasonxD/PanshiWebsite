import express from 'express';
import multer from 'multer';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const port = process.env.SERVER_PORT || 3001;

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// CORS configuration
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Root route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// User signup
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

// User login
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

// Get user profile
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
      profileIcon: user.profile?.profileIcon,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Error fetching user profile' });
  }
});

// Update user profile
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

// Update user information
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

// Upload photo
app.post('/api/user-profile/:id/upload-photo', upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const userId = parseInt(req.params.id);
    const photoUrl = `/uploads/${req.file.filename}`;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let updatedProfile;
    if (user.profile) {
      const updatedPhotos = [...(user.profile.photos || []), photoUrl];
      updatedProfile = await prisma.profile.update({
        where: { userId },
        data: {
          photos: updatedPhotos,
        },
      });
    } else {
      updatedProfile = await prisma.profile.create({
        data: {
          userId,
          photos: [photoUrl],
        },
      });
    }

    res.json({ photoUrl, photos: updatedProfile.photos });
  } catch (error) {
    console.error('Error uploading photo:', error);
    res.status(500).json({ error: 'Error uploading photo' });
  }
});

// Upload profile icon
app.post('/api/user-profile/:id/upload-profile-icon', upload.single('profileIcon'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const userId = parseInt(req.params.id);
    const profileIconUrl = `/uploads/${req.file.filename}`;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let updatedProfile;
    if (user.profile) {
      updatedProfile = await prisma.profile.update({
        where: { userId },
        data: {
          profileIcon: profileIconUrl,
        },
      });
    } else {
      updatedProfile = await prisma.profile.create({
        data: {
          userId,
          profileIcon: profileIconUrl,
        },
      });
    }

    res.json({ profileIconUrl: updatedProfile.profileIcon });
  } catch (error) {
    console.error('Error uploading profile icon:', error);
    res.status(500).json({ error: 'Error uploading profile icon' });
  }
});

// Get all users with their like status for the current user
app.get('/api/users', async (req, res) => {
  try {
    const currentUserId = req.query.currentUserId ? parseInt(req.query.currentUserId as string) : undefined;
    
    const users = await prisma.user.findMany({
      include: { 
        profile: true,
        ...(currentUserId ? {
          receivedLikes: {
            where: {
              likerId: currentUserId
            }
          }
        } : {})
      },
    });
    
    res.json(users.map(user => ({
      id: user.id,
      firstName: user.firstName,
      age: user.birthday ? Math.floor((new Date().getTime() - new Date(user.birthday).getTime()) / 3.15576e+10) : null,
      bio: user.profile?.bio,
      profileIcon: user.profile?.profileIcon,
      isLiked: currentUserId ? user.receivedLikes.length > 0 : undefined
    })));
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// Like a user
app.post('/api/like/:userId', async (req, res) => {
  try {
    const likerId = parseInt(req.body.likerId);
    const likedId = parseInt(req.params.userId);
    
    const existingLike = await prisma.like.findFirst({
      where: {
        likerId,
        likedId,
      },
    });

    if (existingLike) {
      return res.status(400).json({ error: 'User already liked' });
    }

    const like = await prisma.like.create({
      data: {
        likerId,
        likedId,
      },
    });
    
    res.json(like);
  } catch (error) {
    console.error('Error liking user:', error);
    res.status(500).json({ error: 'Error liking user' });
  }
});

// Unlike a user
app.delete('/api/like/:userId', async (req, res) => {
  try {
    const likerId = parseInt(req.query.likerId as string);
    const likedId = parseInt(req.params.userId);
    
    const existingLike = await prisma.like.findFirst({
      where: {
        likerId,
        likedId,
      },
    });

    if (!existingLike) {
      return res.status(404).json({ error: 'Like not found' });
    }

    await prisma.like.delete({
      where: {
        id: existingLike.id
      },
    });
    
    res.json({ message: 'User unliked successfully' });
  } catch (error) {
    console.error('Error unliking user:', error);
    res.status(500).json({ error: 'Error unliking user' });
  }
});

// Get likes for a user
app.get('/api/likes/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const likes = await prisma.like.findMany({
      where: {
        likedId: userId,
      },
      include: {
        liker: true,
      },
    });
    res.json(likes.map(like => ({
      id: like.id,
      likerId: like.likerId,
      likerName: like.liker.firstName,
    })));
  } catch (error) {
    console.error('Error fetching likes:', error);
    res.status(500).json({ error: 'Error fetching likes' });
  }
});

// Get conversations for a user
app.get('/api/conversations', async (req, res) => {
  try {
    const userId = parseInt(req.query.userId as string);
    const conversations = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId },
          { recipientId: userId },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
      distinct: ['senderId', 'recipientId'],
      include: {
        sender: {
          include: { profile: true }
        },
        recipient: {
          include: { profile: true }
        },
      },
    });
    
    res.json(conversations.map(conv => ({
      id: conv.id,
      userId: conv.senderId === userId ? conv.recipientId : conv.senderId,
      userName: conv.senderId === userId ? conv.recipient.firstName : conv.sender.firstName,
      lastMessage: conv.content,
      profileIcon: conv.senderId === userId ? conv.recipient.profile?.profileIcon : conv.sender.profile?.profileIcon,
    })));
  } catch (error) {
    console.error('Error fetching conversations:', error);
    res.status(500).json({ error: 'Error fetching conversations' });
  }
});

// Get messages between two users
app.get('/api/messages/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const currentUserId = parseInt(req.query.currentUserId as string);
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId, recipientId: currentUserId },
          { senderId: currentUserId, recipientId: userId },
        ],
      },
      orderBy: { createdAt: 'asc' },
      include: {
        sender: {
          include: { profile: true }
        },
      },
    });
    res.json(messages.map(message => ({
      ...message,
      senderProfileIcon: message.sender.profile?.profileIcon,
    })));
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Error fetching messages' });
  }
});
// Send a message
app.post('/api/messages', async (req, res) => {
  try {
    const { senderId, recipientId, content } = req.body;
    const message = await prisma.message.create({
      data: {
        senderId,
        recipientId,
        content,
      },
      include: {
        sender: {
          include: { profile: true }
        },
      },
    });
    
    res.json({
      ...message,
      senderName: message.sender.firstName,
      senderProfileIcon: message.sender.profile?.profileIcon,
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Error sending message' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});