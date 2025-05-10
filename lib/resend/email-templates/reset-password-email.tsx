import * as React from 'react'
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

interface ResetPasswordEmailProps {
  username?: string
  resetUrl: string
}

const ResetPasswordEmail = ({
  username,
  resetUrl,
}: ResetPasswordEmailProps) => {
  const currentYear = new Date().getFullYear()
  const displayName = username || 'there'

  return (
    <Html>
      <Head />
      <Preview>Reset your password</Preview>
      <Tailwind>
        <Body className='bg-gray-100 font-sans py-10'>
          <Container className='bg-white rounded-lg shadow-md mx-auto p-6 md:p-10 max-w-xl'>
            <Section className='mt-8'>
              <Heading className='text-2xl font-bold text-gray-800 mb-6 text-center'>
                Password Reset Request
              </Heading>
              <Text className='text-base text-gray-700 mb-6'>
                Hello {displayName},
              </Text>
              <Text className='text-base text-gray-700 mb-6'>
                We received a request to reset the password associated with your
                account. If you didn't make this request, you can safely ignore
                this email. Your password will not be changed.
              </Text>
              <Text className='text-base text-gray-700 mb-8'>
                To reset your password, click the button below:
              </Text>
              <Section className='text-center mb-8'>
                <Button
                  className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md no-underline text-center'
                  href={resetUrl}
                >
                  Reset Your Password
                </Button>
              </Section>
              <Text className='text-base text-gray-700 mb-6'>
                This password reset link will expire in a short time.
              </Text>
              <Text className='text-base text-gray-700 mb-8'>
                If the button above doesn't work, copy and paste the following
                link into your browser:
              </Text>
              <Text className='text-sm text-blue-600 mb-8 break-words'>
                <Link href={resetUrl} className='text-blue-600 underline'>
                  {resetUrl}
                </Link>
              </Text>
              <Text className='text-base text-gray-700 mb-2'>Thank you,</Text>
              <Text className='text-base font-semibold text-gray-800 mb-8'>
                The {process.env.NEXT_PUBLIC_APP_NAME || 'MyApp'} Team
              </Text>
            </Section>
            <Section className='border-t border-gray-200 pt-6 text-center'>
              <Text className='text-xs text-gray-500 m-0'>
                Your Company Name, 123 Address St, City, Country
              </Text>
              <Text className='text-xs text-gray-500 m-0'>
                © {currentYear} Your Company Name. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

ResetPasswordEmail.PreviewProps = {
  username: 'John Doe',
  resetUrl: '@https://example.com/reset-password?token=preview123456789',
} as ResetPasswordEmailProps

export default ResetPasswordEmail
