const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("770928523351-1b7sbtjeoloc1i675t92f0ko31ckaojn.apps.googleusercontent.com");

function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = {
    async verifyGoogleToken(ctx) {
      const { token } = ctx.request.body;
      let ticket;
      try {
        ticket = await client.verifyIdToken({
            idToken: token,
            audience: "770928523351-1b7sbtjeoloc1i675t92f0ko31ckaojn.apps.googleusercontent.com",
        });
      } catch (error) {
        ctx.throw(400, 'Invalid Google token');
      }
  
      const payload = ticket.getPayload();
      const email = payload['email'];
      const username = `${payload['given_name']} ${payload['family_name']}`;
      const googleID = payload['sub'];
      const randomPassword = generateRandomString(12); // Generate a 12-character random string
  
      // Find user in Strapi
      let user = await strapi.query('user', 'users-permissions').findOne({ email });
  
      if (!user) {
        // Instead of creating a new user, prepare a response with the new user's info
        user = {
          username,
          email,
          password: randomPassword,
          provider: 'google',
          googleID,
          confirmed: true,
          blocked: false,
        };
      }
  
      // Issue Strapi JWT token for existing users, return new user info for non-existing users
      ctx.body = user.id ? {
        jwt: strapi.plugins['users-permissions'].services.jwt.issue({
          id: user.id,
        }),
        user,
      } : {
        newUser: user,
      };
    },
  };
  