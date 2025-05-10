import { createAuthClient } from 'better-auth/react'
import { oneTapClient } from 'better-auth/client/plugins'

export const authClient = createAuthClient({
  plugins: [
    oneTapClient({
      clientId: process.env.NEXT_PUBLIC_AUTH_GOOGLE_ID!,
      autoSelect: false,
      cancelOnTapOutside: true,
      context: 'signin',
      additionalOptions: {},
      promptOptions: {
        baseDelay: 1000,
        maxAttempts: 5,
      },
    }),
  ],
  fetchOptions: {
    onError(e: any) {
      if (e?.error?.status === 429) {
        console.error('Too many requests. Please try again later.')
      } else {
        console.error('Auth Client Error:', e)
      }
    },
  },
})

export const { signUp, signIn, signOut, useSession } = authClient
