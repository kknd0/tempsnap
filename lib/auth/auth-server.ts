import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '@/lib/db'
import { oneTap } from 'better-auth/plugins'
import { stripe as stripePlugin } from '@better-auth/stripe'
import { stripe } from '@/lib/stripe'
import { sendEmail } from '@/lib/resend'
import VerificationEmail from '@/lib/resend/email-templates/verification-email'
import ResetPasswordEmail from '@/lib/resend/email-templates/reset-password-email'

const appName = process.env.NEXT_PUBLIC_APP_NAME ?? 'myapp'

export const auth = betterAuth({
  appName,
  database: drizzleAdapter(db, {
    provider: 'pg',
    usePlural: true,
  }),
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await sendEmail(
        user.email,
        `${appName} Verify your email address`,
        VerificationEmail({
          username: user.name,
          verificationUrl: url,
        })
      )
    },
    autoSignInAfterVerification: true,
    expiresIn: 60 * 60 * 24 * 30,
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      await sendEmail(
        user.email,
        `${appName} Reset your password`,
        ResetPasswordEmail({ username: user.name, resetUrl: url })
      )
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ['email-password', 'google'],
    },
  },
  plugins: [
    oneTap(),
    stripePlugin({
      stripeClient: stripe,
      stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
      createCustomerOnSignUp: true,
      subscription: {
        enabled: true,
        plans: [
          {
            name: 'Creator Essentials',
            priceId: 'price_1RL4i4I1IE3yz54FpEaZWuCB',
            annualDiscountPriceId: 'price_1RL4mFI1IE3yz54FhfbB9RZT',
            freeTrial: {
              days: 15,
              onTrialStart: async (subscription) => {
                const userId = subscription.referenceId
                // Send welcome email to user
              },
            },
          },
          {
            name: 'Unlimited Pro',
            priceId: 'price_1RL4ieI1IE3yz54Fl4yxcmnj',
            annualDiscountPriceId: 'price_1RL4l5I1IE3yz54F4IGXsdPj',
            freeTrial: {
              days: 15,
              onTrialStart: async (subscription) => {
                const userId = subscription.referenceId
                // Send welcome email to user
              },
            },
          },
        ],
      },
    }),
  ],
  socialProviders: {
    google: {
      clientId: process.env.AUTH_GOOGLE_ID ?? '',
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? '',
    },
  },
})

export type UserSessionType = typeof auth.$Infer.Session
