// import { authenticate } from "@/services/authService"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier: credentials?.email,
            password: credentials?.password,
          }),
        });
        const user = await res.json();
        console.log('user', user);

        if (user) {
          return user
        } else {
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) { // 로그인 시, 사용자 정보를 토큰에 추가
      if (user) {
        const data = user
        token.jwt = data.jwt;
        token.id = data.user.id;
        token.username = data.user.username;
        token.email = data.user.email;
      }
      return token;
    },
    async session({ session, token }) { // JWT 콜백에서 추가된 사용자 정보를 세션에 반영
      session.jwt = token.jwt;
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.email = token.email;
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },
  // pages: {
  //   signIn: '/auth/signin',
  //   signOut: '/auth/signout',
  //   error: '/auth/error', // Error code passed in query string as ?error=
  //   verifyRequest: '/auth/verify-request', // (used for check email message)
  //   newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  // },
  // database: process.env.NEXT_PUBLIC_DATABASE_URL,
  // secret: process.env.NEXTAUTH_SECRET, // 여기 Secret Key
  // jwt: {
  //   maxAge: 1 * 24 * 60 * 60, // 1 day
  // },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }