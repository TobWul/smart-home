import * as z from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  NOTION_API_KEY: z.string().min(1, { message: "NOTION_API_KEY is required" }),
  PORT: z.string().optional().default("2022"),
});

type Env = z.infer<typeof envSchema>;

export const ENV: Env = envSchema.parse(process.env);
