import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "./lib/dbConnect";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      session.user.admin = user.admin || false;
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      const { db } = await clientPromise;
      const result = await db.collection("users").insertOne({
        id: user.id,
        email: user.email,
        admin: false,
      });
      console.log(`Created user: ${result.insertedId}`);
    },
    async linkAccount({ user, account }) {
      const { db } = await clientPromise;
      await db.collection("accounts").updateOne(
        { userId: user.id },
        {
          $set: {
            userId: user.id,
            provider: account.provider,
            providerAccountId: account.providerAccountId,
          },
        },
        { upsert: true }
      );
    },
    async session({ session, user }) {
      const { db } = await clientPromise;
      const sessionData = await db
        .collection("sessions")
        .findOne({ userId: user.id });
      session.user.id = user.id;
      session.user.admin = user.admin || false;
      return session;
    },
  },
};

export default NextAuth(authOptions);
