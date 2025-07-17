import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.jsx",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_HuWCiwmr0p5A@ep-blue-cell-a8z24zmr-pooler.eastus2.azure.neon.tech/SpendWise?sslmode=require&channel_binding=require",
  }
});
