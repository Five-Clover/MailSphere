import dotenv from "dotenv";
dotenv.config();

export default{
GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,

  MICROSOFT_CLIENT_ID: process.env.MICROSOFT_CLIENT_ID,
  MICROSOFT_CLIENT_SECRET: process.env.MICROSOFT_CLIENT_SECRET,
  MICROSOFT_REDIRECT_URI: process.env.MICROSOFT_REDIRECT_URI,

  SESSION_SECRET: process.env.SESSION_SECRET || "dev-secret",
  BASE_URL: process.env.BASE_URL || "http://localhost:4000",
}