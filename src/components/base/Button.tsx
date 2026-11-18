import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

// cva() keeps every Tailwind combination for the button in one place and turns
// `variant`/`size` into typed props. `buttonVariants` is also exported so a
// plain element (or a Next.js <Link>) can borrow the same styles via
// className={buttonVariants({ ... })} without rendering a <Button>.
const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-control text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-40",
    {
        variants: {
            variant: {
                primary: "bg-primary text-primary-foreground hover:bg-primary/90",
                secondary: "border border-border text-foreground hover:bg-background",
            },
            size: {
                sm: "px-3 py-1.5",
                md: "px-4 py-2",
                lg: "px-5 py-2.5",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    },
);

// `asChild` renders the child element (e.g. an <a>) with the button's classes
// instead of a <button>. Without it, Button is a normal <button> and accepts
// every native button attribute through ...props. In React 19 `ref` is just a
// regular prop, so forwardRef is no longer needed.
export interface ButtonProps extends ComponentProps<"button">, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { buttonVariants };
