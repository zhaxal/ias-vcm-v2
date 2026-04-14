import { resend } from "@/utils/resend";
import { betterAuth } from "better-auth";
import { admin, openAPI } from "better-auth/plugins";

import { Pool } from "pg";

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      resend.emails.send({
        from: "onboarding@resend.dev",
        to: user.email,
        subject: "Verify your email address",
        html: `<p>Click the link to verify your email: <a href="${url}">${url}</a></p>`,
      });
    },
  },
  plugins: [admin(), openAPI()],
  rateLimit: {
    enabled: false,
  },
});
