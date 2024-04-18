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
      async authorize (credentials, req) {
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
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
        
        // if (response.ok && data.token) {
        //   return { token: data.token, rfToken: data.rfToken };
        // } else {
        //   // 로그인 실패 시 처리
        //   throw new Error('Login failed!');
        // }

        // if (credentials?.email === user.email && credentials?.password === user.password) {
        //   return user
        // } else {
        //   return null
        // }

      }
    })
  ],
  // session: { 
  //   strategy: "jwt",
  //   // maxAge: 1 * 24 * 60 * 60, // 1 day
  // },
  // callbacks: {
  //   async jwt({ token, user }) {
  //     return { ...token, ...user };
  //     // token.accessToken = user.token
  //     // return token
  //   },

  //   async session({ session, token }) {
  //     session.user = token;
  //     return session;
  //   },
  // },
  // callbacks: {
  //   session: async (session, user) => {
  //     session.token = user.token;
  //     console.log('세션', session);
  //     return session;
  //   },
  //   jwt: async (token, user) => {
  //     if (user) {
  //       token = user; // { token: data.token, rfToken: data.rfToken }
  //       console.log('토큰', token);
  //     }
  //     return token;
  //   },
  // },
  pages: {
    signIn: '/auth/signin',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }