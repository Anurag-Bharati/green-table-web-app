import { firestore } from "@/config/firebase/firebase";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cert } from "firebase-admin/app";

const serviceAccount = {
  type: process.env.FIREBASE_ADMIN_TYPE,
  project_id: process.env.FIREBASE_ADMIN_PROJECT_ID,
  private_key_id: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_ADMIN_CLIENT_ID,
  auth_uri: process.env.FIREBASE_ADMIN_AUTH_URI,
  token_uri: process.env.FIREBASE_ADMIN_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL,
};

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.SECRET,
  // adapter: FirestoreAdapter(firestore),
  adapter: FirestoreAdapter({
    credential: cert(serviceAccount),
    db: firestore,
  }),
  pages: { signIn: "/auth" },
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token, user }) {
      // Send properties additional property to the client
      session.user.id = token.sub;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
