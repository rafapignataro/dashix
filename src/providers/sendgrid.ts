export const emailServer = {
  host: String(process.env.SMTP_HOST),
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: String(process.env.SMTP_USER),
    pass: String(process.env.SMTP_PASSWORD)
  },
}

export const emailFrom = process.env.SMTP_FROM;