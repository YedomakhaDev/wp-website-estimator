import { useState } from "react";

import { Modal } from "@/common/Modal";

interface AssumptionsModalProps {
    assumptions: string[];
}

export function AssumptionsModal({ assumptions }: AssumptionsModalProps) {
    const [open, setOpen] = useState(false);
    const title = `Assumptions (${assumptions.length})`;

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="flex w-full cursor-pointer items-center justify-between border-t border-border pt-6 text-sm font-medium text-foreground"
            >
                <span>{title}</span>
                <span className="text-muted-foreground">▸</span>
            </button>

            <Modal open={open} onClose={() => setOpen(false)} title={title}>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    {assumptions.map((assumption) => (
                        <li key={assumption}>{assumption}</li>
                    ))}
                </ul>
            </Modal>
        </>
    );
}
