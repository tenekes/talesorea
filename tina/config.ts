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
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "post",
        label: "Blog Posts",
        path: "src/data/blog",
        format: "md",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => {
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
            required: true,
          },
          {
            type: "image",
            name: "ogImage",
            label: "Post Image",
          },
          { type: "string", name: "author", label: "Author" },
          {
            type: "datetime",
            name: "pubDatetime",
            label: "Date",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            options: [
              { label: "Φαντασία", value: "φαντασία" },
              { label: "Μυθοπλασία", value: "μυθοπλασία" },
              { label: "Ειδήσεις", value: "ειδήσεις" },
              { label: "Νέα", value: "νέα" },
              { label: "Τεχνολογία", value: "τεχνολογία" },
              { label: "Κοινωνικά", value: "κοινωνικά" },
              { label: "Ενημέρωση", value: "ενημέρωση" },
            ],
          },
          { type: "boolean", name: "featured", label: "Featured Post" },
          { type: "boolean", name: "draft", label: "Draft" },
          { type: "rich-text", name: "body", label: "Body", isBody: true },
        ],
      },
    ],
  },
});