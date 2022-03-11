import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { SiweMessage } from "siwe";
import {
  findUser,
  insertUser,
  updateUserRefreshToken,
} from "../../libs/admin_fetchUser";
import { signJwt, uuidv4 } from "../../libs/jwt";
import { sealData } from "iron-session";

// TODO verifying a SIWE message and creating the user session.
// typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    siwe: SiweMessage;
  }
}

const OneHour = new Date(Date.now() + 1000 * 60 * 60 * 1).toISOString();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  if (method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }

  try {
    const { message, signature } = req.body;

    req.session.siwe = await new SiweMessage(message).validate(signature);
    await req.session.save();

    const address = req.session.siwe.address;

    const fingerprint = await sealData(req.session.siwe, {
      password: process.env.NEXT_PUBLIC_IRON_SALT,
    });

    const user = await findUser(address);
    if (!user) {
      const refreshToken = uuidv4();
      const newUser = await insertUser(address, refreshToken, OneHour);
      const jwt = signJwt(fingerprint, newUser);
      return res.json({ jwt, refreshToken, ok: true });
    }

    const refreshToken = uuidv4();
    await updateUserRefreshToken(user.id, refreshToken, OneHour);
    const jwt = signJwt(fingerprint, user);
    return res.json({ jwt, refreshToken, ok: true });
  } catch (_error) {
    res.json({ ok: false });
  }
};

export type IronOptions = {
  cookieName: string;
  password: string;
  cookieOptions: any;
};

export const ironOptions = {
  cookieName: process.env.NEXT_PUBLIC_COOKIE,
  password: process.env.NEXT_PUBLIC_IRON_SALT,
  cookieOptions: {
    secure: process.env.NODE_ENV !== "production",
  },
} as IronOptions;

export default withIronSessionApiRoute(handler, ironOptions);
