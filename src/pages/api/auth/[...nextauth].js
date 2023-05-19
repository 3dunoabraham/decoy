import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,            
            // authorization: {
            //   params: {
            //     prompt: "consent",
            //     access_type: "offline",
            //     response_type: "code"
            //   }
            // },
            // callbacks: {
            //     async jwt({ token, user, account }) {
            //       // Persist the OAuth access_token to the token right after signin
                
            //       if (account) {
            //         token.id_token = account.id_token;
            //         console.log("session.id_token", token.id_token)
            //       }
            //       return token;
            //     },
            //     async session({ session, token }) {
            //       // Send properties to the client, like an access_token from a provider.
            //       session.id_token = token.id_token;
            //       console.log("session.id_token", session.id_token)
            //       return session;
            //     },
            //   },
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
}

export default NextAuth(authOptions)