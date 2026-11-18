import { type RefObject, useEffect, useState } from "react";

// Returns whether the referenced element fits within the viewport height (minus
// `offset`). Used to only make a panel sticky while it's short enough — a sticky
// element taller than the screen would clip its own bottom. Re-checks on element
// resize and window resize.
export function useFitsViewport(ref: RefObject<HTMLElement | null>, offset = 0) {
    const [fits, setFits] = useState(true);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        function update() {
            if (!el) return;
            setFits(el.offsetHeight <= window.innerHeight - offset);
        }

        update();

        const resizeObserver = new ResizeObserver(update);
        resizeObserver.observe(el);
        window.addEventListener("resize", update);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("resize", update);
        };
    }, [ref, offset]);

    return fits;
}
