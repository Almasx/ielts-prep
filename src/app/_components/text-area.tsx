"use client";

import { forwardRef, useRef } from "react";

import clsx from "clsx";
import type { IField } from "~/app/_components/types";

export type ITextAreaFieldProps<T> = {
  className?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  label?: string;
  placeholder?: string;
} & IField<T>;

const TextAreaField = forwardRef<
  HTMLTextAreaElement,
  ITextAreaFieldProps<HTMLTextAreaElement>
>(
  (
    {
      className = "",
      startIcon = null,
      endIcon = null,
      value,
      name,
      onChange,
      onBlur,
      label,
      placeholder,
      error,
    },
    ref,
  ) => {
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    return (
      <>
        <div
          className={clsx(
            className,
            "relative",
            (endIcon !== null ||
              startIcon !== null ||
              label !== undefined ||
              error !== undefined) &&
              "flex flex-col ",
          )}
        >
          {startIcon !== null && (
            <div className="absolute left-5 top-1/2 mr-3 -translate-y-1/2">
              {startIcon}
            </div>
          )}
          <textarea
            name={name}
            {...{ value: value }}
            ref={(node) => {
              textAreaRef.current = node;
              if (typeof ref === "function") {
                ref(node);
              }
            }}
            style={{ resize: "none" }}
            onChange={(e) => {
              onChange && onChange(e);
            }}
            onBlur={(e) => {
              onBlur && onBlur(e);
            }}
            placeholder={placeholder}
            className={clsx(
              "border-neutral-200 bg-white ",
              "ease peer w-full rounded-xl border px-5 py-3 pt-4 text-sm focus:outline-none",
              "text-black  placeholder:text-black/30 ",
              error && "border-red-500 bg-red-500/10",
              startIcon !== null && "pl-12",
              className,
            )}
          />
          {endIcon !== null && (
            <div className="absolute bottom-2 right-5">{endIcon}</div>
          )}
          {label !== undefined && (
            <label
              htmlFor={name}
              className="absolute top-1.5 z-10 origin-[0] -translate-y-4 translate-x-3
                     transform rounded-md border border-neutral-200 bg-white/80 px-1.5
                     py-0.5 text-xs text-black duration-300
                     "
            >
              {label}
            </label>
          )}
          {error && (
            <p className="mt-2 pl-1 text-sm text-red-600 dark:text-red-500">
              {error}
            </p>
          )}
        </div>
      </>
    );
  },
);

TextAreaField.displayName = "TextAreaField";

export default TextAreaField;
