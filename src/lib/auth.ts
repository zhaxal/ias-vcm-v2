import { betterAuth } from "better-auth";
import { admin, openAPI } from "better-auth/plugins";

import { Pool } from "pg";

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  plugins: [admin(), openAPI()],
  rateLimit: {
    enabled: false,
  },
});
