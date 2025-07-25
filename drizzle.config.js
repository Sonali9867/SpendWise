import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.jsx",
  dbCredentials: {
    url:DATABASE_URL,
  }
});
