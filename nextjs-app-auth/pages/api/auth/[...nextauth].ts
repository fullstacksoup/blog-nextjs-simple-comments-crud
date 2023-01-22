import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {

  providers: [
    CredentialsProvider({
      id: "domain-login",
      name: "Jennifer Smith",
      
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password", }
      },
      async authorize(credentials, req) {
        const user = { id: 1, name: "Jennifer Smith", email: "jennifers@example.com", image: 'https://randomuser.me/api/portraits/women/72.jpg' }
          
        if (user) {
          return user
        } else {
          return null  
        }
      }
    }),
    CredentialsProvider({
      id: "user-login",
      name: "Terry Oscar",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {        
        const user = { id: 2, name: "Terry Oscar", email: "terryo@example.com", image: 'https://randomuser.me/api/portraits/women/67.jpg' }
  
        if (user) {          
          return user
        } else {          
          return null  
        }
      }
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/auth/signout', 
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
