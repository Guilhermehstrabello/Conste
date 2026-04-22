import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

const projectId = process.env.SANITY_PROJECT_ID || "xbew5yei";  // Fallback para o ID atual
const dataset = process.env.SANITY_DATASET || "production";

export default defineConfig({
  name: "conste-blog-studio",
  title: "Conste Blog Studio",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
