// This is an example of how to read a JSON Web Token from an API route
import { getToken } from "next-auth/jwt";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import fetch from "isomorphic-unfetch";
import * as Realm from "realm-web";

const app = Realm.App.getApp(process.env.REALM_APP_ID);
const jwt = require("jwt-simple");
const graphql_url = `https://realm.mongodb.com/api/client/v2.0/app/${process.env.REALM_APP_ID}/graphql`;
const secret = process.env.NEXTAUTH_SECRET;

let encodedToken = "";

async (req, res) => {
  const token = await getToken({ req, secret });

  async function loginCustomJwt(jwt) {
    // Create a Custom JWT credential
    const credentials = Realm.Credentials.jwt(jwt);
    try {
      // Authenticate the user
      const user = await app.logIn(credentials);
      // `App.currentUser` updates to match the logged in user
      if (user.id === app.currentUser.id) return user;
    } catch (err) {
      console.error("Failed to log in", err);
    }
  }

  if (token) {
    // Signed in
    encodedToken = jwt.encode(token, secret);
  }
};

const client = new ApolloClient({
  link: new HttpLink({
    uri: graphql_url,
    fetch: async (uri, options) => {
      const accessToken = (await loginCustomJwt(encodedToken)).accessToken;
      options.headers.Authorization = `Bearer ${accessToken}`;
      return fetch(uri, options);
    },
  }),
  cache: new InMemoryCache({
    addTypename: false,
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  },
});

export default client;
