"use client";

import { IconX } from "@tabler/icons-react";
import { type MouseEvent, type ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

// Mount to open, unmount to close. Built on the native <dialog> so it renders
// in the top layer (the snap sections animate transform/filter, which would
// otherwise trap a fixed overlay) and gets focus trapping and Esc for free.
export const Modal = ({
  onClose,
  labelledBy,
  className,
  children,
}: {
  onClose: () => void;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previousOverflow;
    };
  }, []);

  // The dialog has no padding, so a click landing on it directly is the backdrop.
  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) event.currentTarget.close();
  };

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-labelledby={labelledBy}
      onClose={onClose}
      onClick={handleBackdropClick}
      className={cn(
        "m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-4xl overflow-hidden rounded-[2rem] border border-zinc-950/10 bg-white p-0 text-zinc-950 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)] outline-none duration-200 animate-in fade-in-0 zoom-in-95 backdrop:bg-zinc-950/70 backdrop:backdrop-blur-sm motion-reduce:animate-none dark:border-white/[0.12] dark:bg-zinc-900 dark:text-white",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => dialogRef.current?.close()}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-zinc-950/60 text-white backdrop-blur transition-colors hover:bg-zinc-950/80"
      >
        <IconX className="h-4 w-4" />
      </button>
      <div className="max-h-[calc(100dvh-2rem-2px)] overflow-y-auto overscroll-contain">{children}</div>
    </dialog>,
    document.body,
  );
};
