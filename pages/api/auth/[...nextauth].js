// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
var jwt = require("jwt-simple");
export default NextAuth({
  providers: [  
    // OAuth authentication providers
    Providers.Auth0({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      domain: process.env.AUTH0_DOMAIN,
    }),
  ],
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    // encode: async ({ secret, token, maxAge }) => {
    //   var payload = token;
    //   // var iat = Math.floor(Date.now() / 1000);
    //   // var exp = iat + maxAge;

    //   // payload.iat = iat;
    //   // payload.exp = exp;

    //   var encodedToken = jwt.encode(payload, secret);
    //   console.log(encodedToken)
    //   return encodedToken;
    // },
    // decode: async ({ secret, token, maxAge }) => {
    //   var decodedToken = jwt.decode(token, secret);
    //   console.log(decodedToken)
    //   return decodedToken;
    // },
  },

  callbacks: {
    signIn: async (user, account, profile) => {
      return Promise.resolve(true);
    },
    session: async (session, user) => {
      return Promise.resolve(session);
    },
    jwt: async (token, user, account, profile, isNewUser) => {
      const isSignIn = user ? true : false;
      // Add auth_time to token on signin in
      if (isSignIn) {
        token.aud = process.env.REALM_APP_ID;
      }
     
      // user && (token.user = user);
      return Promise.resolve(token);
    },
  },
});
