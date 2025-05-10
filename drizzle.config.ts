import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './lib/db/schemas/index.ts',
  dialect: 'postgresql',
  dbCredentials: { url: process.env.DB_URL_PG_NEON! },
  strict: true,
  out: './lib/db/migrations',
})
