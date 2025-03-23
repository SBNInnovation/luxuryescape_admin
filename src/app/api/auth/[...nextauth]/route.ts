import NextAuth, { User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios"
import { JWT } from "next-auth/jwt"

// Update interface to match actual API response
interface AuthResponse {
  success: boolean
  message: string
  token: string
  data: {
    _id: string
    email: string
    name: string
    phone: string
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials) {
          return null
        }

        try {
          const res = await axios.post<AuthResponse>(
            `${process.env.NEXT_PUBLIC_API_URL_PROD}/login`,
            {
              email: credentials.identifier,
              password: credentials.password,
            }
          )

          // Extract data from the updated response structure
          const { token, data } = res.data

          if (data) {
            return {
              jwt: token, // Now using 'token' instead of 'jwt'
              id: data._id,
              email: data.email,
              name: data.name,
              phone: data.phone, // Added phone field
            }
          }
          return null
        } catch (error: any) {
          console.error("Authentication error:", error)
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            throw new Error(error.response.data.error.message)
          }
          throw new Error("Authentication failed")
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }: { token: JWT; user?: User }) => {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.phone = (user as any).phone // Added phone field
        token.jwt = (user as any).jwt
      }
      return token
    },
    session: async ({ session, token }: { session: any; token: JWT }) => {
      session.user = {
        id: token.id,
        email: token.email,
        name: token.name,
        phone: token.phone, // Added phone field
      }
      session.jwt = token.jwt
      return session
    },
  },
  pages: {
    signIn: "/",
    signOut: "/",
  },
  debug: true,
})

export { handler as GET, handler as POST }
