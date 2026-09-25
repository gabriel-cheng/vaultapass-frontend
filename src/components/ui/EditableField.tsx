import type { ReactNode } from "react";

interface EditableFieldProps {
  label: string;
  value: ReactNode;
  editing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  children: ReactNode;
}

export function EditableField({
  label,
  value,
  editing,
  onEdit,
  onCancel,
  children,
}: EditableFieldProps) {
  return (
    <div className="border-b border-line py-5">
      {!editing ? (
        <div className="flex items-center justify-between gap-6">
          <div className="min-w-0">
            <p className="text-xs text-muted">{label}</p>

            <p className="mt-1 truncate text-sm text-text">{value}</p>
          </div>

          <button
            type="button"
            onClick={onEdit}
            className="cursor-pointer shrink-0 text-sm text-muted transition-colors hover:text-brass"
          >
            Alterar
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <p className="text-xs text-muted">{label}</p>
          </div>

          {children}

          <div className="mt-4 flex items-center gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="cursor-pointer text-sm text-muted transition-colors hover:text-text"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
