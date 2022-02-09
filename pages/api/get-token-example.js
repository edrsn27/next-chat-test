// This is an example of how to read a JSON Web Token from an API route
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;
import * as Realm from "realm-web";
const app = Realm.App.getApp(process.env.REALM_APP_ID);
var jwt = require("jwt-simple");

export default async (req, res) => {
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
    var encodedToken = jwt.encode(token, secret);

    loginCustomJwt(encodedToken).then((user) => {
      console.log("Successfully logged in!", user);
    });
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
};
