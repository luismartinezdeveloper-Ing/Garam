import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { leads } from './schema.js';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is required to start the server');
}

export const pool = new Pool({
  connectionString,
  max: 5,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
  ssl: connectionString.includes('sslmode=require') ? { rejectUnauthorized: false } : undefined,
});

export const db = drizzle(pool, { schema: { leads } });
