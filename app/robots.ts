import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/Cart",
        "/Auth",
        "/Register",
        "/profile",
        "/checkout",
        "/admin",
        "/contact",
      ],
    },
    sitemap: "https://supermarket-hazel.vercel.app/sitemap.xml",
  };
}