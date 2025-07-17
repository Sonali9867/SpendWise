import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Initialize Neon client with your database URL
const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);

// Export db instance with schema
export const db = drizzle(sql, { schema });



