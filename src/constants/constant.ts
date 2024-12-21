export const constant = {
  PORT: process.env.PORT ?? 5000,
  ACCESS_TOKEN_NAME: process.env.ACCESS_TOKEN_NAME ?? 'access-token',
  ACCESS_TOKEN_MAX_AGE: process.env.ACCESS_TOKEN_MAX_AGE ?? '24h',
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY ?? 'jwt-secret',
  UPLOAD_DIR: process.env.UPLOAD_DIR ?? 'uploads',
};
