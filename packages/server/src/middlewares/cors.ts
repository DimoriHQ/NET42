import cors from "@koa/cors";

export const corsMiddleware = cors({
  origin: (ctx): string => {
    const validDomains = ["http://localhost:5173"];
    if (validDomains.indexOf(ctx.request.header.origin!) !== -1) {
      return ctx.request.header.origin || "";
    }
    return "";
  },
  credentials: true,
});
