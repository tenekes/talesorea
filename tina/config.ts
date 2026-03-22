import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch: "main",

  // Get this from tina.io
  clientId: process.env.TINA_PUBLIC_CLIENT_ID || "",
  // Get this from tina.io
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  // Uncomment to allow cross-origin requests from non-localhost origins
  // during local development (e.g. GitHub Codespaces, Gitpod, Docker).
  // Use 'private' to allow all private-network IPs (WSL2, Docker, etc.)
  // server: {
  //   allowedOrigins: ['https://your-codespace.github.dev'],
  // },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/r/content-modelling-collections/
  schema: {
    collections: [
      {
        name: "post",
        label: "Blog Posts",
        path: "src/data/blog",
        format: "md",
        ui: {
          // This part fixes the -----.md issue
          filename: {
            readonly: false, // Set to true if you want Tina to handle it automatically
            slugify: (values) => {
              // This converts "My New Post" to "my-new-post"
              return `${values?.title?.toLowerCase().replace(/ /g, "-") || "new-post"}`;
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true // Forces you to type a title first
          },
          { type: "string", name: "author", label: "Author" },
          {
            type: "datetime",
            name: "pubDatetime",
            label: "Date",
            required: true // Stops Astro from crashing on empty dates
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true // Stops Astro from crashing on empty descriptions
          },
          { type: "string", name: "tags", label: "Tags", list: true },
          { type: "boolean", name: "featured", label: "Featured Post" },
          { type: "boolean", name: "draft", label: "Draft" },
          { type: "rich-text", name: "body", label: "Body", isBody: true },
        ],
      },
    ],
  },
});
