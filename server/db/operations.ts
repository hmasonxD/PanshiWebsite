import { db } from './index';
import { users } from './schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';

export async function createUser(email: string, password: string, firstName: string, gender: string, birthday: Date) {
  const hashedPassword = await bcrypt.hash(password, 10);
  
  return db.insert(users).values({
    email,
    password: hashedPassword,
    firstName,
    gender,
    birthday,
  }).returning();
}

export async function getUserByEmail(email: string) {
  const [user] = await db.select().from(users).where(eq(users.email, email));
  return user;
}

export async function verifyUser(email: string, password: string) {
  const user = await getUserByEmail(email);
  if (!user) return null;
  
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;
  
  return user;
}