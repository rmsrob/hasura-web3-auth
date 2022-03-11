import * as jwt from "jsonwebtoken";
import crypto from "crypto";

const HASURA_GRAPHQL_JWT_SECRET = {
  type: process.env.HASURA_JWT_SECRET_TYPE || "HS256",
  key:
    process.env.HASURA_JWT_SECRET_KEY ||
    "this-is-a-generic-HS256-secret-key-and-you-should-really-change-it",
};

export function sha256(value: string) {
  return crypto.createHash("sha256").update(value, "utf8").digest("hex");
}

export function uuidv4() {
  let result: string, i: string, j: number;
  result = "";
  for (j = 0; j < 32; j++) {
    if (j == 8 || j == 12 || j == 16 || j == 20) result = result + "-";
    i = Math.floor(Math.random() * 16)
      .toString(16)
      .toUpperCase();
    result = result + i;
  }
  return result;
}

interface GenerateJWTParams {
  allowedRoles: string[];
  defaultRole: string;
  otherClaims?: Record<string, string>;
  expiresIn?: string;
}

export function generateHasuraJWT(params: GenerateJWTParams) {
  const payload = {
    "https://hasura.io/jwt/claims": {
      "x-hasura-allowed-roles": params.allowedRoles,
      "x-hasura-default-role": params.defaultRole,
      ...params.otherClaims,
    },
  };

  return jwt.sign(payload, HASURA_GRAPHQL_JWT_SECRET.key, {
    algorithm: HASURA_GRAPHQL_JWT_SECRET.type as "HS256" | "RS512",
    expiresIn: params.expiresIn || "1h",
  });
}

export function signJwt(fingerprint: string, user: any) {
  return generateHasuraJWT({
    allowedRoles: ["user"],
    defaultRole: "user",
    expiresIn: "5m",
    otherClaims: {
      "X-Hasura-User-Id": String(user.id),
      "X-User-Fingerprint": sha256(fingerprint),
    },
  });
}
