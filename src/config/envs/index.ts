import dotenv from "dotenv";
import { parseEnv, port } from "znv";
import { z } from "zod";

const envs = {
  ...process.env,
  ...dotenv.config().parsed,
  ...dotenv.config({ path: `.env.${process.env.NODE_ENV}` }).parsed
};
export const isProduction = process.env.NODE_ENV === "production";

const typedEnv = parseEnv(envs, {
  PORT: z.optional(port()),
  MONGODB_CONNECTION: {
    schema: z.string().url(),
    defaults: {
      test: "mongodb://127.0.0.1"
    }
  },
  DATABASE_URL: {
    schema: z.string().url(),
    defaults: {
      test: "mysql://127.0.0.1"
    }
  }
});

export { typedEnv as envs };
