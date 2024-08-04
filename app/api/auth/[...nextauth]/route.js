import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// This is a simple in-memory user store. In a real application, you'd use a database.
const users = [
  { id: "1", name: "User", email: "user@example.com", password: "password" },
];

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Find user in the mock database
        const user = users.find((user) => user.email === credentials.email);

        if (user && user.password === credentials.password) {
          // Any object returned will be saved in `user` property of the JWT
          return { id: user.id, name: user.name, email: user.email };
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // First time jwt callback is run, user object is available
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Add property to session, like an access_token from a provider.
      session.user.id = token.id;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signUp: "/auth/signup", // Add this line to include the sign-up page
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };
