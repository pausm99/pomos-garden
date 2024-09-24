// app/api/auth/[...nextauth]/route.tsx
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { db } from "@/db/db";
import { env } from "@/lib/utils";
import { actionCreateUser, actionGetUserByEmail } from "@/actions/users";

const authHandler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: env("GOOGLE_CLIENT_ID"),
      clientSecret: env("GOOGLE_CLIENT_SECRET"),
    }),
    GithubProvider({
      clientId: env("GITHUB_CLIENT_ID"),
      clientSecret: env("GITHUB_CLIENT_SECRET"),
    }),
  ],
  secret: env("NEXTAUTH_SECRET"),
  callbacks: {
    async signIn({ user, account, profile }) {
      const userEmail = user.email;
      if (userEmail) {

        const existingUser = await db.user.findUnique({
          where: { email: userEmail },
        });

        if (!existingUser) {
          await actionCreateUser(user.name || userEmail, userEmail)
        }
        return true;
      }
      return false;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { authHandler as GET, authHandler as POST };
