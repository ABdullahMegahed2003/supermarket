import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/Auth", "/Register", "/admin", "/profile", "/Cart"],
    },
    sitemap: "https://supermarket-hazel.vercel.app/sitemap.xml",
  };
}