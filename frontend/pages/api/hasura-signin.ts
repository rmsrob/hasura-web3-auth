import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import { findUser, updateUserRefreshToken } from "../../libs/admin_fetchUser";
import { setFingerprintCookieAndSignJwt } from "../../libs/userCookieJWT";
import { uuidv4 } from "../../libs/jwt";

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
    // console.log("/api/hasura-login endpoint hit");
    const { address } = req.body.input.params;
    console.log("finding user with address", address);

    const user = await findUser(address);
    if (!user) return res.status(400).json({ message: "User not found" });
    console.log("found user", user);

    // Update user refresh token and refresh token expiration
    const refresh_token = uuidv4();
    console.log("updating user refresh token", refresh_token);
    console.log("user ID", user.id);
    await updateUserRefreshToken(
      user.id,
      refresh_token,
      // 1 hour, UTC time in ISO format
      new Date(Date.now() + 1000 * 60 * 60 * 1).toISOString()
    );

    // Generate a random string that will constitute the fingerprint for this user
    const fingerprint = crypto.randomBytes(50).toString("hex");

    // Add the fingerprint in a hardened cookie to prevent Token Sidejacking
    // https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html#token-sidejacking
    const jwt = setFingerprintCookieAndSignJwt(fingerprint, res, user);

    console.log("returning jwt", jwt);
    return res.json({ jwt, refreshToken: user.refresh_token });
  } catch (error) {
    console.log("/api/actions/login endpoint error", error);
    return res.status(400).json({ message: "Error logging in" });
  }
}
