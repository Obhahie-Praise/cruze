import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { createAuthMiddleware } from "better-auth/api";

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
    sendResetPassword: async ({ user, token }) => {
      const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reset-password?token=${token}`;
      
      const html = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e4e4e7; border-radius: 8px;">
          <h2 style="color: #09090b; margin-bottom: 16px;">Reset Your Password</h2>
          <p style="color: #71717a; font-size: 14px; line-height: 24px;">
            We received a request to reset the password for your account. Click the button below to choose a new password. This link is valid for 1 hour.
          </p>
          <div style="margin: 24px 0;">
            <a href="${resetUrl}" style="background-color: #18181b; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; font-size: 14px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p style="color: #71717a; font-size: 12px; line-height: 20px;">
            If the button doesn't work, copy and paste this link into your browser: <br/>
            <a href="${resetUrl}" style="color: #2563eb;">${resetUrl}</a>
          </p>
          <hr style="border: 0; border-top: 1px solid #e4e4e7; margin: 24px 0;" />
          <p style="color: #a1a1aa; font-size: 12px;">
            If you did not request a password reset, you can safely ignore this email.
          </p>
        </div>
      `;

      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        html,
      });
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  // Synchronize Better Auth users with the internal User table
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const role = user.email === "jeffcruze@gmail.com" ? "ADMIN" : "CUSTOMER";
          return {
            data: {
              ...user,
              role,
            },
          };
        },
      },
    },
  },

  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      // 1. Reliability Recovery: check sign-up attempts
      if (ctx.path === "/sign-up/email") {
        const { email } = ctx.body || {};
        if (email) {
          const existingUser = await prisma.user.findUnique({
            where: { email },
            include: { accounts: true },
          });
          
          if (existingUser) {
            // If the user exists but has no accounts (orphaned user record from failed signup transaction),
            // delete the user record to allow clean sign-up.
            if (existingUser.accounts.length === 0) {
              await prisma.user.delete({
                where: { id: existingUser.id },
              });
            }
          }
        }
      }
      
      // 2. Reliability Recovery: check sign-in attempts
      if (ctx.path === "/sign-in/email") {
        const { email } = ctx.body || {};
        if (email) {
          // Check if Account exists but User record is missing (inconsistent database state)
          const account = await prisma.account.findUnique({
            where: {
              providerId_accountId: {
                providerId: "email",
                accountId: email,
              },
            },
          });

          if (account) {
            const user = await prisma.user.findUnique({
              where: { id: account.userId },
            });

            if (!user) {
              // Recreate the missing user record to restore integrity
              const role = email === "jeffcruze@gmail.com" ? "ADMIN" : "CUSTOMER";
              const name = email.split("@")[0];
              await prisma.user.create({
                data: {
                  id: account.userId,
                  email,
                  name: name.charAt(0).toUpperCase() + name.slice(1),
                  role,
                  emailVerified: false,
                },
              });
            }
          }

          // Check if User exists but role is missing
          const existingUser = await prisma.user.findUnique({
            where: { email },
          });
          
          if (existingUser && !existingUser.role) {
            const role = email === "jeffcruze@gmail.com" ? "ADMIN" : "CUSTOMER";
            await prisma.user.update({
              where: { id: existingUser.id },
              data: { role },
            });
          }
        }
      }
    }),
    
    after: createAuthMiddleware(async (ctx) => {
      // Modify session length if rememberMe is false
      const sessionData = ctx.context.newSession;
      if (sessionData && sessionData.session) {
        const rememberMe = ctx.body?.rememberMe;
        if (rememberMe === false) {
          const twoDaysFromNow = new Date(Date.now() + 1000 * 60 * 60 * 24 * 2);
          await prisma.session.update({
            where: { token: sessionData.session.token },
            data: { expiresAt: twoDaysFromNow },
          });
          sessionData.session.expiresAt = twoDaysFromNow;
        }
      }
    }),
  },

  session: {
    expiresIn: 60 * 60 * 24 * 90, // 90 days global session duration
    updateAge: 60 * 60 * 24, // Refresh session if older than 1 day
  },

  trustedOrigins: [process.env.BETTER_AUTH_URL ?? "http://localhost:3000"],
});

export type Session = typeof auth.$Infer.Session;