export const STAGE = process.env.STAGE!;
export const isProduction = STAGE === "production";

export const MONGODB_URL = process.env.MONGODB_URL!;

export const TEMPLATE_DIR = process.env.TEMPLATE_DIR!;
export const IMAGE_DIR = process.env.FILES_DIR!;

export const DB__NET42 = process.env.DB__NET42!;

export const RPC_HTTP = process.env.RPC_HTTP!;
export const RPC_WSS = process.env.RPC_WSS!;

export const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS!;

export const RECAPTCHA_SECRETKEY = process.env.RECAPTCHA_SECRETKEY!;

export const AWS_ID = process.env.AWS_ID!;
export const AWS_KEY = process.env.AWS_KEY!;

export const S3_BUCKET = process.env.S3_BUCKET!;
export const S3_REGION = process.env.S3_REGION!;

export const WEB3_STORAGE_API_TOKEN = process.env.WEB3_STORAGE_API_TOKEN!;

export const SIGNER_PRIVATE_KEY = process.env.SIGNER_PRIVATE_KEY!;

export const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID!;
export const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET!;
export const STRAVA_REDIRECT = process.env.STRAVA_REDIRECT!;
export const STRAVA_UI_REDIRECT = process.env.STRAVA_UI_REDIRECT!;
