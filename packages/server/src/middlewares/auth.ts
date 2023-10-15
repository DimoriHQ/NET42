import * as jose from "jose";
import { KoaContext, KoaNext } from "../global";

const jwks = jose.createRemoteJWKSet(new URL("https://authjs.web3auth.io/jwks"));

export const auth = async (ctx: KoaContext, next: KoaNext) => {
  const idToken = ctx.request.headers.authorization?.split(" ")[1];
  const body = ctx.request.body as { address: string };

  if (!idToken) {
    await next();
    return;
  }

  const jwtDecoded = await jose.jwtVerify(idToken, jwks, { algorithms: ["ES256"] });
  const address = body.address?.toLocaleLowerCase();

  // console.log(idToken, body, jwtDecoded.payload, "debug");

  if (jwtDecoded.payload.wallets[0].address === address) {
    ctx.address = address;
    ctx.isAuth = true;
  } else {
    ctx.address = "";
    ctx.isAuth = false;
  }

  await next();
};
