import { AuthenticationError } from 'apollo-server';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

// check if the user is authenticated by token
function checkAuth(context) {

  const authHeader = context.req.headers.authorization;

  if (authHeader) {
      const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {

        const user = jwt.verify(token, process.env.SECRET_KEY);
        return user;
      } catch {
        throw new AuthenticationError(
          "Invalid/Expired token",
        );
      }
    } else {
            throw new AuthenticationError(
              "Authentication token must be 'Bearer [token]",
            );
      }

  } else {
    throw new Error('Authorization header must be provided');
  }

}

export default checkAuth;
