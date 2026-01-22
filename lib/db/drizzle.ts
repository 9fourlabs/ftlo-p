import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import dotenv from 'dotenv';

dotenv.config();

// Lazy initialization to prevent build-time errors
let client: ReturnType<typeof postgres> | undefined;
let db: ReturnType<typeof drizzle> | undefined;

export function getDb() {
  if (!db) {
    if (!process.env.POSTGRES_URL) {
      throw new Error('POSTGRES_URL environment variable is not set');
    }
    
    client = postgres(process.env.POSTGRES_URL);
    db = drizzle(client, { schema });
  }
  
  return db;
}

// For backwards compatibility
export { getDb as db };