import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import { uuidv4 } from "../../libs/jwt";
import { insertUser } from "../../libs/admin_fetchUser";
import { setFingerprintCookieAndSignJwt } from "../../libs/userCookieJWT";

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // console.log("/api/hasura-signup endpoint hit");
    const { address } = req.body.input.params;
    const refresh_token = uuidv4();

    const user = await insertUser(
      address,
      refresh_token,
      // 1 hour, UTC time in ISO format
      new Date(Date.now() + 1000 * 60 * 60 * 1).toISOString()
    );

    // Generate a random string that will constitute the fingerprint for this user
    const fingerprint = crypto.randomBytes(50).toString("hex");

    // Add the fingerprint in a hardened cookie to prevent Token Sidejacking
    // https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html#token-sidejacking
    const jwt = setFingerprintCookieAndSignJwt(fingerprint, res, user);
    return res.json({ jwt, refreshToken: refresh_token });
  } catch (error) {
    // console.log("/api/actions/signup endpoint error", error);
    return res.status(400).json({ message: "Error signing up" });
  }
}
