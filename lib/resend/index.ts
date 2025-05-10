import { Resend } from 'resend'
import React from 'react' // Assuming React.ReactNode is used

if (!process.env.RESEND_API_KEY) {
  throw new Error(
    'Resend API key (RESEND_API_KEY) is not set in environment variables.'
  )
}

export const resend = new Resend(process.env.RESEND_API_KEY)

// Note: Top-level await is generally discouraged outside of ES modules.
// Consider wrapping this logic in an async function or IIFE if needed.
const domanData = await resend.domains.list()

// Note: Accessing domanData.data.data might depend on the exact API response structure.
const domainName = domanData.data?.data[0]?.name

if (!domainName) {
  throw new Error('No resend domain found , please add a domain to resend')
}

const emailAddress = `${process.env.EMAIL_ID ?? 'noreply'}@${domainName}`

export const sendEmail = async (
  to: string,
  subject: string,
  template: React.ReactNode // Changed type hint to React.ReactNode
) => {
  // Added basic error handling around email sending
  try {
    const emailData = await resend.emails.send({
      from: emailAddress, // This might fail if emailAddress has syntax error
      to,
      subject,
      react: template,
    })
    return emailData
  } catch (error) {
    console.error('Error sending email via Resend:', error)
    // Re-throw or handle the error appropriately
    throw error
  }
}
