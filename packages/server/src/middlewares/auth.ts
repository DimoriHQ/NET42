import * as jose from "jose";
import { KoaContext, KoaNext } from "../global";

const jwks = jose.createRemoteJWKSet(new URL("https://authjs.web3auth.io/jwks"));

export const auth = async (ctx: KoaContext, next: KoaNext) => {
  const idToken = ctx.request.headers.authorization?.split(" ")[1];
  let address = ctx.request.query["address"] as string;

  if (!idToken) {
    await next();
    return;
  }

  if (!address) {
    await next();
    return;
  }

  address = address.toLocaleLowerCase();

  const jwtDecoded = await jose.jwtVerify(idToken, jwks, { algorithms: ["ES256"] });

  if (jwtDecoded.payload.wallets[0].address === address) {
    ctx.address = address;
    ctx.isAuth = true;
  } else {
    ctx.address = "";
    ctx.isAuth = false;
  }

  await next();
};
