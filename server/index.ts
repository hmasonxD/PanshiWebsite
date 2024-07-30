import express from 'express';
import { db } from './db';
import { users } from './db/schema';
import bcrypt from 'bcrypt';
import cors from 'cors';
import { eq } from 'drizzle-orm';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/signup', async (req, res) => {
  try {
    const { email, password, firstName, gender, birthday } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.insert(users).values({
      email,
      password: hashedPassword,
      firstName,
      gender,
      birthday: new Date(birthday),
    }).returning();
    res.json(newUser[0]);
  } catch (error) {
    console.error('Error in /api/signup:', error);
    res.status(500).json({ error: 'Error creating user', details: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const [user] = await db.select().from(users).where(eq(users.email, email));
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
    res.status(500).json({ error: 'Error logging in', details: error.message });
  }
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});