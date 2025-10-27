import NextAuth from 'next-auth/next'
import { AuthOptions } from 'next-auth'

export const authOptions: AuthOptions = {
	providers: [
		// Add your providers here
	],
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
