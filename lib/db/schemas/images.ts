import { sql } from 'drizzle-orm'
import { pgTable, text, timestamp, pgEnum } from 'drizzle-orm/pg-core'

export const uploadedImages = pgTable('uploaded_images', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  url: text('url').notNull(),
  ownerId: text('owner_id').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  finishedAt: timestamp('finished_at'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const imageStatus = pgEnum('status', [
  'pending',
  'processing',
  'completed',
  'failed',
])

export const generatedImages = pgTable('generated_images', {
  id: text('id').primaryKey(),
  url: text('url').notNull(),
  ownerId: text('owner_id').notNull(),
  prompt: text('prompt').notNull(),
  uploadedImageIds: text('uploaded_image_ids').array(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  finishedAt: timestamp('finished_at'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  status: imageStatus('status').notNull().default('pending'),
})

export const generatedStickers = pgTable('generated_stickers', {
  id: text('id').primaryKey(),
  url: text('url').notNull(),
  ownerId: text('owner_id').notNull(),
  prompt: text('prompt').notNull(),
  generatedImageIds: text('generated_image_ids').array(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  finishedAt: timestamp('finished_at'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  status: imageStatus('status').notNull().default('pending'),
})
