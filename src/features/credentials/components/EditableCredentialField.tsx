import type { ReactNode } from "react";

interface EditableCredentialFieldProps {
  label: string;
  value: ReactNode;
  editing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  children: ReactNode;
}

export function EditableCredentialField({
  label,
  value,
  editing,
  onEdit,
  onCancel,
  children,
}: EditableCredentialFieldProps) {
  return (
    <div className="border-b border-line py-6">
      {!editing ? (
        <div className="flex items-center justify-between gap-6">
          <div className="min-w-0">
            <p className="text-xs text-muted">{label}</p>

            <div className="mt-2 min-w-0">{value}</div>
          </div>

          <button
            type="button"
            onClick={onEdit}
            className="
              shrink-0
              text-sm
              text-muted
              transition-colors
              hover:text-brass
              cursor-pointer
            "
          >
            Alterar
          </button>
        </div>
      ) : (
        <div>
          <p className="mb-4 text-xs text-muted">{label}</p>

          {children}

          <div className="mt-4 flex items-center gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="
                text-sm
                text-muted
                transition-colors
                hover:text-text
                cursor-pointer
              "
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
