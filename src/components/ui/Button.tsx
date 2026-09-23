interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`
        rounded-sm
        bg-brass
        py-2.5
        font-medium
        text-ink
        transition
        hover:brightness-110
        disabled:opacity-50
        cursor-pointer
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
