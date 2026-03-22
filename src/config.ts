export const SITE = {
  website: "https://talesorea.gr/", // replace this with your deployed domain
  author: "Nikos",
  profile: "https://instagram.com",
  desc: "Ενημέρωση και νέα για πραγματικά και φανταστικά θέματα στον κόσμο",
  title: "Τα Λες Ωραία",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    text: "Edit page",
    url: "https://github.com/tenekes/talesorea/edit/main/src/data/blog/",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Bangkok", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
