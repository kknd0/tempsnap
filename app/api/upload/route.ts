// app/api/upload/route.ts
import {
  createUploadRouteHandler,
  route,
  UploadFileError,
} from 'better-upload/server'
import { auth } from '@/lib/auth/auth-server'
import { headers } from 'next/headers'
import { r2 } from 'better-upload/server/helpers'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import { uploadedImages } from '@/lib/db/schemas'

if (
  !process.env.CF_ACCOUNT_ID ||
  !process.env.CF_ACCESS_KEY_ID ||
  !process.env.CF_SECRET_ACCESS_KEY
) {
  throw new Error('Missing R2 configuration')
}

const R2Client = r2({
  accountId: process.env.CF_ACCOUNT_ID!,
  accessKeyId: process.env.CF_ACCESS_KEY_ID!,
  secretAccessKey: process.env.CF_SECRET_ACCESS_KEY!,
})

const bucketName = process.env.R2_BUCKET_NAME ?? 'apsu'

export const { POST } = createUploadRouteHandler({
  client: R2Client,
  bucketName,
  routes: {
    images: route({
      multipleFiles: true,
      maxFiles: 10,
      onBeforeUpload: async ({ files, clientMetadata }) => {
        const session = await auth.api.getSession({
          headers: await headers(),
        })

        // if (!session?.user) {
        //   redirect('/api/auth/signin')
        // }
        // const extension = files.name.split('.').pop()

        return {
          generateObjectKey: ({ file }) => {
            return 'renamed-' + crypto.randomUUID() + '-' + file.name
          },
        }
      },
      multipart: true,
      onAfterSignedUrl: async ({ clientMetadata, files, metadata }) => {
        // save the file to the database
        // db.insert ...
        const image = await db
          .insert(uploadedImages)
          .values([
            ...files.map((file) => ({
              id: crypto.randomUUID(),
              name: file.name,
              url: `https://cdn.snap2sticker.com/${file.objectKey}`,
              ownerId: '123',
            })),
          ])
          .returning()
        return {
          metadata: {
            uploadedImageIds: [...image.map((i) => i.id)],
          },
        }
      },
      signedUrlExpiresIn: 15 * 60, // 15 minutes
      maxFileSize: 1024 * 1024 * 15, // 15MB
      partSignedUrlExpiresIn: 15 * 60, // 15 minutesxs
    }),
  },
})
