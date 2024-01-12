import { withIronSession } from "next-iron-session";
import { NextApiRequest, NextApiResponse } from "next";

export const withSession = (handler: any) => {
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD!,
    cookieName: "my-cookie-name",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  });
};
