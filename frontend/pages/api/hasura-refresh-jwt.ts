import { NextApiRequest, NextApiResponse } from "next";
import { generateHasuraJWT, sha256, uuidv4 } from "../../libs/jwt";
import {
  findUser,
  findUserf,
  updateUserRefreshToken,
} from "../../libs/admin_fetchUser";
import { FINGERPRINT_COOKIE_NAME } from "../../libs/userCookieJWT";

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
    // console.log("/api/hasura-refresh-token endpoint hit");
    console.log(req.cookies);
    const { refreshToken, fingerprintHash } = req.body.input;
    console.log("refresh", refreshToken, fingerprintHash);

    const fingerprintCookie = req.cookies[FINGERPRINT_COOKIE_NAME];
    console.log({ fingerprintCookie });
    if (!fingerprintCookie)
      return res.status(400).json({ message: "Unable to refresh JWT token" });

    // Compute a SHA256 hash of the received fingerprint in cookie in order to compare
    // it to the fingerprint hash stored in the token
    const fingerprintCookieHash = sha256(fingerprintCookie);
    // console.log({ fingerprintCookie, fingerprintCookieHash, fingerprintHash });

    if (fingerprintHash != fingerprintCookieHash) {
      return res.status(400).json({ message: "Unable to refresh JWT token" });
    }

    const user = await findUserf(refreshToken);
    if (!user) return res.status(400).json({ message: "User not found" });

    // Update user refresh token and refresh token expiration
    await updateUserRefreshToken(
      user.id,
      uuidv4(),
      new Date(Date.now() + 1000 * 60 * 60 * 1).toISOString()
    );

    const jwt = generateHasuraJWT({
      expiresIn: "5m",
      allowedRoles: ["user"],
      defaultRole: "user",
      otherClaims: {
        "X-Hasura-User-Id": String(user.id),
      },
    });

    return res.json({ jwt });
  } catch (error) {
    // console.log("/api/actions/refresh-token endpoint error", error);
    return res.status(400).json({ message: "Error issuing jwt token refresh" });
  }
}
