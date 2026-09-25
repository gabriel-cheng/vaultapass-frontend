import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import type { UserResponse } from "../../features/auth/types";

interface UserMenuProps {
  user: UserResponse;
  onLogout: () => void;
  isLoggingOut: boolean;
}

export function UserMenu({ user, onLogout, isLoggingOut }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="cursor-pointer flex size-8 items-center justify-center overflow-hidden rounded-full border border-line text-muted transition-colors hover:border-brass hover:text-text"
        aria-label="Abrir menu do usuário"
        aria-expanded={isOpen}
      >
        {user.profilePhotoUrl ? (
          <img
            src={user.profilePhotoUrl}
            alt=""
            className="size-full object-cover"
          />
        ) : (
          <User size={17} strokeWidth={1.5} />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-48 border border-line bg-surface">
          <div className="border-b border-line px-4 py-3">
            <p className="truncate text-sm font-medium text-text">
              {user.name}
            </p>

            <p className="truncate font-mono text-xs text-muted">
              @{user.username}
            </p>
          </div>

          <div className="py-1">
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted transition-colors hover:bg-ink hover:text-text"
            >
              <User size={16} strokeWidth={1.5} />
              Meu perfil
            </Link>

            <button
              type="button"
              onClick={onLogout}
              disabled={isLoggingOut}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-muted transition-colors hover:bg-ink hover:text-danger disabled:opacity-50 cursor-pointer"
            >
              <LogOut size={16} strokeWidth={1.5} />
              {isLoggingOut ? "Saindo..." : "Sair"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
