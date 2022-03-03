import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { SiweMessage } from "siwe";

// TODO verifying a SIWE message and creating the user session.
// typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    siwe: SiweMessage;
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const { message, signature } = req.body;
        console.log("step 1 verif", message, signature);
        const siweMessage = new SiweMessage(message);
        const fields = await siweMessage.validate(signature);

        req.session.siwe = fields;
        await req.session.save();

        res.json({ ok: true });
      } catch (_error) {
        res.json({ ok: false });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
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
