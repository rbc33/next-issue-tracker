import NextAuth from 'next-auth/next'
import { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/prisma/client'

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		async redirect({ baseUrl }) {
			return baseUrl
		},
	},
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
