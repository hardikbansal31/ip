import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(
            "http://localhost:8080/api/auth/login",
            credentials
          );
          console.log("API Login Response:", res.data); // ✅ Debug API Response

          const user = res.data;

          if (user && user.token && user.username) {
            return {
              token: user.token,
              username: user.username, // ✅ Ensure username is included
            };
          }
          return null;
        } catch (error) {
          console.error("Login failed:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.username = user.username;
        console.log("Updated JWT Token:", token); // ✅ Ensure username is stored
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = { username: token.username }; // ✅ Explicitly set username
      console.log("Updated Session Data:", session);
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
