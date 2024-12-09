import jwt, { JwtPayload } from "jsonwebtoken";

export const isTokenExpired = (token: string): boolean => {
  // const decoded = jwt.decode(token) as JwtPayload;
  // if (decoded && decoded.exp) {
  //   return decoded.exp * 1000 > Date.now(); // Convert exp to milliseconds
  // }
  // return true; // If no exp, consider it expired
  return false;
};
