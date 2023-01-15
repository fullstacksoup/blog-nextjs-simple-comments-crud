import NextAuth, { NextAuthOptions } from "next-auth"
// import GoogleProvider from "next-auth/providers/google"
// import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {

  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    // }),

    // CredentialsProvider({
    //   id: "custom-login",
    //   name: 'Email and Password',
    //   credentials: {
    //     email: { label: 'Email', type: 'text'},
    //     password: { label: 'Password', type: 'password' }
    //   },
    //   authorize: async (credentials) => {
        
    //     const payload = {
    //       email: credentials.email,
    //       password: credentials.password,
    //     };
    //     // const url = process.env.NEXT_API_DOMAIN + `/api/auth/login`
            
    //     // const res = await fetch(url, {
    //     //   method: 'POST',
    //     //   body: JSON.stringify(payload),
    //     //   headers: { "Content-Type": "application/json" }
    //     // })
        
    //     // const user = await res.json()
                
    //     // If no error and we have user data, return it
    //     // if (res.ok && user) {
    //     //   return user;
    //     // }

    //     const user = { id: 3, name: credentials.email, email: "eventadmin@example.com", image: 'https://randomuser.me/api/portraits/women/67.jpg' }
        
    //     if (user) {
    //       // Any object returned will be saved in `user` property of the JWT
    //       return user
    //     } else {
    //       // If you return null then an error will be displayed advising the user to check their details.
    //       return null  
    //     }          
      
    //   }
    // }),

    CredentialsProvider({
      id: "domain-login",
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Jennifer Smith",
      
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password", }
      },
      async authorize(credentials, req) {
        const user = { id: 1, name: "Jennifer Smith", email: "jennifers@example.com", image: 'https://randomuser.me/api/portraits/women/72.jpg' }
          
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
  
        }
      }
    }),
    CredentialsProvider({
      id: "user-login",
      name: "Terry Oscar",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = { id: 2, name: "Terry Oscar", email: "terryo@example.com", image: 'https://randomuser.me/api/portraits/women/67.jpg' }
  
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin"
      return token
    },
  },
}

export default NextAuth(authOptions)
