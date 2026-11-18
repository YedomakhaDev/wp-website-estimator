import { type MouseEvent as ReactMouseEvent, type RefObject, useEffect, useRef, useState } from "react";

// How far the pointer must move before a press counts as a drag (and not a click).
const DRAG_THRESHOLD_PX = 5;

// Click-and-drag horizontal scrolling for an overflow container (e.g. the tab
// strip). Returns the mousedown handler to put on the element, whether a drag is
// in progress (for the cursor), and `shouldSwallowClick` to call from a child's
// onClick so a drag that ends on it doesn't also trigger that click.
export function useDragToScroll(ref: RefObject<HTMLElement | null>) {
    const dragState = useRef<{ startX: number; startScrollLeft: number } | null>(null);
    const hasDraggedRef = useRef(false);
    const [isDragging, setIsDragging] = useState(false);

    function onMouseDown(event: ReactMouseEvent) {
        const el = ref.current;
        if (!el || event.button !== 0) return;
        dragState.current = { startX: event.clientX, startScrollLeft: el.scrollLeft };
        hasDraggedRef.current = false;
        setIsDragging(true);
    }

    useEffect(() => {
        if (!isDragging) return;

        function handleMouseMove(event: MouseEvent) {
            const el = ref.current;
            if (!el || !dragState.current) return;
            const delta = event.clientX - dragState.current.startX;
            if (Math.abs(delta) > DRAG_THRESHOLD_PX) hasDraggedRef.current = true;
            el.scrollLeft = dragState.current.startScrollLeft - delta;
        }

        function handleMouseUp() {
            dragState.current = null;
            setIsDragging(false);
        }

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, ref]);

    function shouldSwallowClick() {
        if (hasDraggedRef.current) {
            hasDraggedRef.current = false;
            return true;
        }
        return false;
    }

    return { isDragging, onMouseDown, shouldSwallowClick };
}
