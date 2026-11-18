import { type RefObject, useEffect, useState } from "react";

// Tracks whether an overflow-x container can still scroll left / right, so the
// caller can show or hide scroll affordances. Pass `contentKey` (e.g. the item
// count) so the check re-runs when the scrollable content changes, not only on
// scroll and window resize.
export function useScrollOverflow(ref: RefObject<HTMLElement | null>, contentKey?: unknown) {
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        function update() {
            if (!el) return;
            setCanScrollLeft(el.scrollLeft > 0);
            setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
        }

        update();
        el.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        return () => {
            el.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, [ref, contentKey]);

    return { canScrollLeft, canScrollRight };
}
