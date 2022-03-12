import { VercelRequest, VercelResponse } from "@vercel/node";

const handler = (request: VercelRequest, response: VercelResponse) => {
  try {
    return response.json({
      data: {
        status: 200,
        response: { data: "ok ser!" },
      },
    });
  } catch (error) {
    return response.json({
      data: {
        status: 400,
        response: error,
      },
    });
  }
};

export default handler;
