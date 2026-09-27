import { useState } from "react";
import { ArrowUpRight, KeyRound, Trash2 } from "lucide-react";
import type { Credential } from "../types";
import { useDeleteCredential } from "../api/useDeleteCredential";
import { PlatformLogo } from "./PlatformLogo";

interface CredentialCardProps {
  credential: Credential;
  onClick: () => void;
}

export function CredentialCard({ credential, onClick }: CredentialCardProps) {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const deleteCredential = useDeleteCredential();

  function handleDeleteClick() {
    setIsConfirmingDelete(true);
  }

  function handleCancelDelete() {
    setIsConfirmingDelete(false);
  }

  function handleConfirmDelete() {
    deleteCredential.mutate(credential.id);
  }

  return (
    <div
      className="
        group
        w-full
        border
        border-line
        bg-surface
        transition-colors
        hover:border-muted
      "
    >
      <button
        type="button"
        onClick={onClick}
        className="
          w-full
          p-5
          text-left
          focus:outline-none
          focus:border-brass
          cursor-pointer
        "
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-4">
            <PlatformLogo
              platformName={credential.platformName}
              link={credential.link}
            />

            <div className="min-w-0">
              <h2 className="truncate text-base font-medium text-text">
                {credential.platformName}
              </h2>

              <p className="mt-1 truncate font-mono text-xs text-muted">
                {credential.login}
              </p>
            </div>
          </div>

          <ArrowUpRight
            size={17}
            strokeWidth={1.5}
            className="
              shrink-0
              text-muted
              opacity-0
              transition-all
              group-hover:translate-x-0.5
              group-hover:-translate-y-0.5
              group-hover:text-text
              group-hover:opacity-100
            "
          />
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-2">
            <KeyRound
              size={14}
              strokeWidth={1.5}
              className="shrink-0 text-muted"
            />

            <span className="truncate font-mono text-xs text-muted">
              {credential.email || "Sem e-mail associado"}
            </span>
          </div>

          <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-muted">
            acesso
          </span>
        </div>
      </button>

      <div className="border-t border-line px-5 py-3">
        {!isConfirmingDelete ? (
          <button
            type="button"
            onClick={handleDeleteClick}
            className="
              inline-flex
              items-center
              gap-2
              font-mono
              text-[10px]
              uppercase
              tracking-wider
              text-danger
              transition-colors
              hover:text-text
              cursor-pointer
            "
          >
            <Trash2 size={13} strokeWidth={1.5} />
            Excluir credencial
          </button>
        ) : (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-text">
              Excluir esta credencial permanentemente?
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleCancelDelete}
                disabled={deleteCredential.isPending}
                className="
                  font-mono
                  text-[10px]
                  uppercase
                  tracking-wider
                  text-muted
                  transition-colors
                  hover:text-text
                  disabled:opacity-50
                  cursor-pointer
                  disabled:cursor-default
                "
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={deleteCredential.isPending}
                className="
                  inline-flex
                  items-center
                  gap-2
                  font-mono
                  text-[10px]
                  uppercase
                  tracking-wider
                  text-danger
                  transition-colors
                  hover:text-text
                  disabled:opacity-50
                  cursor-pointer
                  disabled:cursor-default
                "
              >
                <Trash2 size={13} strokeWidth={1.5} />

                {deleteCredential.isPending
                  ? "Excluindo..."
                  : "Confirmar exclusão"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
