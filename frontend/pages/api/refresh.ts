import { NextApiRequest, NextApiResponse } from "next";
import { generateHasuraJWT, sha256, uuidv4 } from "../../libs/jwt";
import { findUserf, updateUserRefreshToken } from "../../libs/admin_fetchUser";
// import { IronOptions } from "./login";
// import { withIronSessionApiRoute } from "iron-session/next/dist";
// import { sealData } from "iron-session";
// import useStorage from "../../hooks/useStorage";

// export const config = {
//   api: {
//     bodyParser: true,
//   },
// };

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("api/refresh called");
  // TODO get the fingerprintHash from jwt session
  const { refreshToken } = req.body.input; //fingerprintHash
  // console.log("req body token", req.body.input)
  // console.log("req session", req.cookies)

  // TODO get the fingerprint from cookie or any other safe place
  // const fingerprintCookie = await sealData(req.session.siwe, {
  //   password: process.env.NEXT_PUBLIC_IRON_SALT,
  // });
  const fingerprintHash = "lol";
  const fingerprintCookie = fingerprintHash; //req.cookies["__User-Fgp"];
  // 9339e2886cc27b0dff076c9f9ca2dfb2efd2c364a24af01bbab2033fd5449b54ed91d37e7f06bc99b52635ee863c56f68791
  // console.log("1 - fingerprintCookie", fingerprintCookie);

  try {
    if (!fingerprintCookie)
      return res
        .status(400)
        .json({ message: "NO fingerprint! Unable to refresh JWT token" });

    // TODO compare if the both fingerprintHash
    const fingerprintCookieHash = fingerprintCookie; //sha256(fingerprintCookie);
    if (fingerprintHash != fingerprintCookieHash)
      return res
        .status(400)
        .json({ message: "checking diff! Unable to refresh JWT token" });

    const user = await findUserf(refreshToken);
    if (!user) return res.status(400).json({ message: "User not found" });

    const newRefreshToken = uuidv4();
    await updateUserRefreshToken(
      user.id,
      newRefreshToken,
      new Date(Date.now() + 1000 * 60 * 2).toISOString() // 2 min
    );

    // TODO build new fingerprint and put it inside cookie
    // console.log("refreshToken", newRefreshToken);
    // const { setItem } = useStorage();
    // setItem("refreshToken", newRefreshToken, "session");
    // sessionStorage.setItem("refreshToken", newRefreshToken);

    // TODO put the new fingerprintHash inside the jwt
    const jwt = generateHasuraJWT({
      expiresIn: "2m",
      allowedRoles: ["user"],
      defaultRole: "user",
      otherClaims: {
        "X-Hasura-User-Id": String(user.id),
        "X-User-Fingerprint": sha256(fingerprintCookie),
      },
    });

    return res.json({ jwt });
  } catch (error) {
    return res.status(400).json({ message: "Error issuing jwt token refresh" });
  }
};

export default handler;

// export const ironOptions = {
//   cookieName: process.env.NEXT_PUBLIC_COOKIE,
//   password: process.env.NEXT_PUBLIC_IRON_SALT,
//   cookieOptions: {
//     secure: process.env.NODE_ENV !== "production",
//   },
// } as IronOptions;

// export default withIronSessionApiRoute(handler, ironOptions);
