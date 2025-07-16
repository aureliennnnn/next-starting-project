import emailjs from "emailjs-com"
import { Resend } from "resend"

// EmailJS configuration
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!
const EMAILJS_USER_ID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID!

// Resend configuration
const resend = new Resend(process.env.RESEND_API_KEY)

export class EmailService {
  // EmailJS implementation
  static async sendWithEmailJS(templateParams: any) {
    try {
      const response = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_USER_ID)
      return response
    } catch (error) {
      console.error("EmailJS error:", error)
      throw error
    }
  }

  // Resend implementation
  static async sendWithResend(params: {
    to: string[]
    subject: string
    html: string
    from?: string
  }) {
    try {
      const { data, error } = await resend.emails.send({
        from: params.from || "onboarding@resend.dev",
        to: params.to,
        subject: params.subject,
        html: params.html,
      })

      if (error) {
        throw error
      }

      return data
    } catch (error) {
      console.error("Resend error:", error)
      throw error
    }
  }

  // Unified send method
  static async send(params: {
    to: string | string[]
    subject: string
    message: string
    html?: string
    provider?: "emailjs" | "resend"
  }) {
    const provider = params.provider || "resend"
    const recipients = Array.isArray(params.to) ? params.to : [params.to]

    if (provider === "emailjs") {
      return this.sendWithEmailJS({
        to_email: recipients[0],
        subject: params.subject,
        message: params.message,
      })
    } else {
      return this.sendWithResend({
        to: recipients,
        subject: params.subject,
        html: params.html || `<p>${params.message}</p>`,
      })
    }
  }

  // Common email templates
  static async sendWelcomeEmail(email: string, name: string) {
    return this.send({
      to: email,
      subject: "Welcome to our platform!",
      html: `
        <h1>Welcome, ${name}!</h1>
        <p>Thank you for joining our platform. We're excited to have you on board!</p>
        <p>If you have any questions, feel free to reach out to our support team.</p>
      `,
    })
  }

  static async sendPasswordResetEmail(email: string, resetLink: string) {
    return this.send({
      to: email,
      subject: "Password Reset Request",
      html: `
        <h1>Password Reset</h1>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetLink}">Reset Password</a>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    })
  }
}
