// npm run test:email – checks the SMTP settings in .env and sends a test enquiry to MAIL_TO.
import { mailEnabled, mailer, sendEnquiryEmails } from '../server/mail.js'

if (!mailEnabled) {
  console.error('✗ E-mail is not configured. Copy .env.example to .env and fill in SMTP_HOST, SMTP_USER, SMTP_PASS and MAIL_TO.')
  process.exit(1)
}
try {
  await mailer.verify()
  console.log('✓ Connected to the mail server and logged in.')
  await sendEnquiryEmails({
    name: 'Test – AK web', email: process.env.MAIL_TO, phone: '+420 000 000 000', lang: 'cz',
    interest: ['kitchen', 'wardrobes'], message: 'Toto je zkušební poptávka z příkazu npm run test:email.',
  })
  console.log(`✓ Test sent. Check ${process.env.MAIL_TO} – you should get the notification and the customer confirmation.`)
} catch (err) {
  console.error('✗ Sending failed:', err.message)
  console.error('  Check the host, port, username and password. Many providers need an "app password" (see .env.example).')
  process.exit(1)
}
