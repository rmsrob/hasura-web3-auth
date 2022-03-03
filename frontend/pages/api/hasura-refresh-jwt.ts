import { NextApiRequest, NextApiResponse } from "next";
import { generateHasuraJWT, sha256, uuidv4 } from "../../libs/jwt";
import { findUserf, updateUserRefreshToken } from "../../libs/admin_fetchUser";
import { IronOptions } from "./login";
import { withIronSessionApiRoute } from "iron-session/next/dist";
import { sealData } from "iron-session";

export const config = {
  api: {
    bodyParser: true,
  },
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { refreshToken, fingerprintHash } = req.body.input;
    const fingerprintCookie = await sealData(req.session.siwe, {
      password: process.env.NEXT_PUBLIC_IRON_SALT,
    });

    if (!fingerprintCookie)
      return res.status(400).json({ message: "Unable to refresh JWT token" });

    const fingerprintCookieHash = sha256(fingerprintCookie);
    if (fingerprintHash != fingerprintCookieHash)
      return res.status(400).json({ message: "Unable to refresh JWT token" });

    const user = await findUserf(refreshToken);
    if (!user) return res.status(400).json({ message: "User not found" });

    const newRefreshToken = uuidv4();
    await updateUserRefreshToken(
      user.id,
      newRefreshToken,
      new Date(Date.now() + 1000 * 60 * 60 * 1).toISOString() // 1 hour
    );

    const jwt = generateHasuraJWT({
      expiresIn: "5m",
      allowedRoles: ["user"],
      defaultRole: "user",
      otherClaims: {
        "X-Hasura-User-Id": String(user.id),
      },
    });

    return res.json({ jwt, refresh_token: newRefreshToken });
  } catch (error) {
    return res.status(400).json({ message: "Error issuing jwt token refresh" });
  }
}

export const ironOptions = {
  cookieName: process.env.NEXT_PUBLIC_COOKIE,
  password: process.env.NEXT_PUBLIC_IRON_SALT,
  cookieOptions: {
    secure: process.env.NODE_ENV !== "production",
  },
} as IronOptions;

export default withIronSessionApiRoute(handler, ironOptions);
