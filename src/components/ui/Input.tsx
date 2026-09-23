import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({
  label,
  id,
  type = "text",
  className = "",
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="border-b border-line pb-2 transition-colors focus-within:border-brass">
      <label htmlFor={id} className="block text-xs text-muted">
        {label}
      </label>

      <div className="flex items-center">
        <input
          id={id}
          type={inputType}
          className={`
            w-full
            bg-transparent
            pt-1
            text-text
            outline-none
            ${className}
          `}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            className="ml-2 pt-1 text-muted transition-colors hover:text-text cursor-pointer"
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {showPassword ? (
              <EyeOff size={16} strokeWidth={1.5} />
            ) : (
              <Eye size={16} strokeWidth={1.5} />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
