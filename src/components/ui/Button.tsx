interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({
  children,
  className = "",
  disabled = false,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={`
        rounded-sm
        bg-brass
        py-2.5
        px-2.5
        font-medium
        text-ink
        transition
        hover:brightness-110
        disabled:opacity-50
        ${disabled ? "cursor-default" : "cursor-pointer"}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
