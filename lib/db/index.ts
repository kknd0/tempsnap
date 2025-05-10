import * as schema from '@/lib/db/schemas'
import { neon } from '@neondatabase/serverless'
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http'

if (!process.env.DB_URL_PG_NEON) {
  throw new Error(
    'Database URL (DB_URL_PG_NEON) is not set in environment variables.'
  )
}

const sqlProd = neon(process.env.DB_URL_PG_NEON)

const dbProd = drizzleNeon(sqlProd, {
  schema,
  logger: process.env.NODE_ENV === 'development',
})

export const db = dbProd
