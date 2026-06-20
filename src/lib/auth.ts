import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "CUSTOMER",
      },
    },
  },

  emailAndPassword: {
    enabled: true,
  },

  // Synchronize Better Auth users with the internal User table
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          return {
            data: {
              ...user,
              role: "CUSTOMER" as const,
            },
          };
        },
      },
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
    updateAge: 60 * 60 * 24, // Refresh session if older than 1 day
  },

  trustedOrigins: [process.env.BETTER_AUTH_URL ?? "http://localhost:3000"],
});

export type Session = typeof auth.$Infer.Session;