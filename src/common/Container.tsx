import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

// The shared max-width + horizontal padding wrapper used by the header, footer
// and every section, so the page keeps one consistent content column.
export function Container({ className, ...props }: ComponentProps<"div">) {
    return <div className={cn("mx-auto max-w-content px-6", className)} {...props} />;
}
