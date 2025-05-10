import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
  Link,
} from '@react-email/components'
import * as React from 'react'

interface VerificationEmailProps {
  username?: string
  verificationUrl: string
}

const VerificationEmail = ({
  username,
  verificationUrl,
}: VerificationEmailProps) => {
  const currentYear = new Date().getFullYear()
  const displayName = username || 'there'

  return (
    <Html>
      <Head />
      <Preview>Verify your email address to activate your account</Preview>
      <Tailwind>
        <Body className='bg-gray-100 font-sans py-10'>
          <Container className='bg-white rounded-lg shadow-md mx-auto p-6 md:p-10 max-w-xl'>
            <Section className='mt-8'>
              <Heading className='text-2xl font-bold text-gray-800 mb-4 text-center'>
                Verify Your Email Address
              </Heading>
              <Text className='text-base text-gray-700 mb-6'>
                Hello {displayName},
              </Text>
              <Text className='text-base text-gray-700 mb-6'>
                Thank you for creating an account! To complete your registration
                and activate your account, please verify your email address by
                clicking the button below.
              </Text>
              <Section className='text-center mb-8'>
                <Button
                  className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md no-underline text-center'
                  href={verificationUrl}
                >
                  Verify Email Address
                </Button>
              </Section>
              <Text className='text-base text-gray-700 mb-6'>
                This verification link is valid for a limited time. If you did
                not create an account, please disregard this email.
              </Text>
              <Text className='text-base text-gray-700 mb-8'>
                If the button above doesn't work, you can also verify your email
                by copying and pasting the following link into your browser:
              </Text>
              <Text className='text-sm text-blue-600 mb-8 break-words'>
                <Link
                  href={verificationUrl}
                  className='text-blue-600 underline'
                >
                  {verificationUrl}
                </Link>
              </Text>
              <Text className='text-base text-gray-700 mb-2'>
                Best regards,
              </Text>
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

VerificationEmail.PreviewProps = {
  username: 'Jane Smith',
  verificationUrl: '@https://example.com/verify?token=preview123456789',
} as VerificationEmailProps

export default VerificationEmail
