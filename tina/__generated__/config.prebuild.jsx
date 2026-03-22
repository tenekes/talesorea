// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch: "main",
  // Get this from tina.io
  clientId: process.env.TINA_PUBLIC_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public"
    }
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
            }
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "image",
            name: "ogImage",
            label: "Post Image"
          },
          { type: "string", name: "author", label: "Author" },
          {
            type: "datetime",
            name: "pubDatetime",
            label: "Date",
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            options: [
              { label: "\u03A6\u03B1\u03BD\u03C4\u03B1\u03C3\u03AF\u03B1", value: "\u03C6\u03B1\u03BD\u03C4\u03B1\u03C3\u03AF\u03B1" },
              { label: "\u039C\u03C5\u03B8\u03BF\u03C0\u03BB\u03B1\u03C3\u03AF\u03B1", value: "\u03BC\u03C5\u03B8\u03BF\u03C0\u03BB\u03B1\u03C3\u03AF\u03B1" },
              { label: "\u0395\u03B9\u03B4\u03AE\u03C3\u03B5\u03B9\u03C2", value: "\u03B5\u03B9\u03B4\u03AE\u03C3\u03B5\u03B9\u03C2" },
              { label: "\u039D\u03AD\u03B1", value: "\u03BD\u03AD\u03B1" },
              { label: "\u03A4\u03B5\u03C7\u03BD\u03BF\u03BB\u03BF\u03B3\u03AF\u03B1", value: "\u03C4\u03B5\u03C7\u03BD\u03BF\u03BB\u03BF\u03B3\u03AF\u03B1" },
              { label: "\u039A\u03BF\u03B9\u03BD\u03C9\u03BD\u03B9\u03BA\u03AC", value: "\u03BA\u03BF\u03B9\u03BD\u03C9\u03BD\u03B9\u03BA\u03AC" },
              { label: "\u0395\u03BD\u03B7\u03BC\u03AD\u03C1\u03C9\u03C3\u03B7", value: "\u03B5\u03BD\u03B7\u03BC\u03AD\u03C1\u03C9\u03C3\u03B7" }
            ]
          },
          { type: "boolean", name: "featured", label: "Featured Post" },
          { type: "boolean", name: "draft", label: "Draft" },
          { type: "rich-text", name: "body", label: "Body", isBody: true }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
