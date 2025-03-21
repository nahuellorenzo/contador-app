import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./src/app/db/schema.ts",
    out: "./supabase/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});