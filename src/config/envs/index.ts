import dotenv from "dotenv";

export const envs = {
  ...process.env,
  ...dotenv.config().parsed,
  ...dotenv.config({ path: `.env.${process.env.NODE_ENV}` }).parsed
};
export const isProduction = process.env.NODE_ENV === "production";
