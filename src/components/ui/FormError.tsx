interface FormErrorProps {
  children: React.ReactNode;
}

export function FormError({ children }: FormErrorProps) {
  return <p className="font-mono text-xs text-danger">{children}</p>;
}
