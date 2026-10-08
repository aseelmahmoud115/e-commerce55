"use client";
import { forwardRef, InputHTMLAttributes, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

type Props = InputHTMLAttributes<HTMLInputElement> & { leftIcon?: React.ReactNode };

const PasswordInput = forwardRef<HTMLInputElement, Props>(function PasswordInput(
  { className = "", leftIcon, ...props },
  ref,
) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative flex items-center">
      {leftIcon && <span className="pointer-events-none absolute inset-s-4 text-sm text-gray-400">{leftIcon}</span>}
      <input ref={ref} {...props} type={show ? "text" : "password"} className={`input-fc pe-12 ${leftIcon ? "ps-11" : ""} ${className}`} />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute inset-e-3 flex size-8 items-center justify-center rounded-lg text-gray-400 transition hover:text-gray-700"
      >
        {show ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );
});

export default PasswordInput;
