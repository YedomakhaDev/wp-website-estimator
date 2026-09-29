"use client";

import { useEffect, useId, useRef } from "react";

// Built on native <dialog> instead of a hand-rolled overlay: showModal() gives
// us focus trapping, Escape-to-close, and top-layer stacking for free, with
// zero dependencies. The one thing we still do ourselves is lock background
// scroll, since not all browsers block wheel-scroll behind an open dialog.
type ModalProps = {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
};

export default function Modal({ open, onClose, title, children }: ModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const titleId = useId();

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (open && !dialog.open) {
            dialog.showModal();
            document.body.style.overflow = "hidden";
        } else if (!open && dialog.open) {
            dialog.close();
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        // Fires on Escape and on dialog.close(), so it's the single source of
        // truth for syncing the "closed" state back to the caller.
        function handleClose() {
            document.body.style.overflow = "";
            onClose();
        }

        dialog.addEventListener("close", handleClose);
        return () => dialog.removeEventListener("close", handleClose);
    }, [onClose]);

    return (
        <dialog
            ref={dialogRef}
            aria-labelledby={titleId}
            onClick={(event) => {
                // Clicking the backdrop reports the <dialog> itself as the
                // target (nothing else can, since the inner card fills the
                // whole box) — that's how we tell it apart from a click
                // inside the card.
                if (event.target === dialogRef.current) onClose();
            }}
            className="m-auto w-[calc(100%-2rem)] max-w-md border-0 bg-transparent p-0 backdrop:bg-slate-900/40 backdrop:backdrop-blur-[2px]"
        >
            <div className="max-h-[80vh] overflow-y-auto rounded-card border border-border bg-surface p-6 shadow-lg">
                <div className="flex items-center justify-between gap-4">
                    <h2 id={titleId} className="text-base font-semibold text-foreground">
                        {title}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-background hover:text-foreground"
                    >
                        <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                            <path
                                d="M5 5L15 15M15 5L5 15"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                </div>
                <div className="mt-4">{children}</div>
            </div>
        </dialog>
    );
}
