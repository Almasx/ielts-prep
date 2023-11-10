"use client";

import clsx from "clsx";
import { forwardRef } from "react";
import type { IField } from "~/app/_components/types";

export type ITextFieldProps<T> = {
  className?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  label?: string;
  placeholder?: string;
} & IField<T>;

const TextField = forwardRef<
  HTMLInputElement,
  ITextFieldProps<HTMLInputElement>
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
  ) => (
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
        <input
          name={name}
          {...{ value: value }}
          ref={ref}
          onChange={(e) => {
            onChange && onChange(e);
          }}
          onBlur={(e) => {
            onBlur && onBlur(e);
          }}
          placeholder={placeholder}
          className={clsx(
            "border-neutral-200 bg-white ",
            "ease peer w-full rounded-2xl border px-5 py-3 text-sm focus:outline-none",
            "text-black  placeholder:text-black/30 ",
            error && "border-red-500 bg-red-500/10",
            startIcon !== null && "pl-12",
            className,
          )}
        />
        {endIcon !== null && (
          <div className="absolute right-5 top-1/2 -translate-y-1/2">
            {endIcon}
          </div>
        )}
        {Boolean(label) && (
          <label
            htmlFor={name}
            className="absolute left-0.5 top-1.5 z-10 origin-[0] -translate-y-4
                         translate-x-3 transform rounded-md border border-neutral-200 bg-white/80
                         px-1.5 py-0.5 text-xs text-black duration-300"
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
  ),
);

TextField.displayName = "TextField";

export default TextField;
