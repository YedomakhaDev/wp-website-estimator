import { MetadataRoute } from "next";
import { IS_LIVE } from "@/lib/site-content";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: IS_LIVE ? "/" : undefined,
            disallow: IS_LIVE ? undefined : "/",
        },
    };
}
