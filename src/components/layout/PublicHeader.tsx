import { Link, useNavigate } from "react-router-dom";

import { useCurrentUser } from "../../features/auth/api/useCurrentUser";
import { useLogout } from "../../features/auth/api/useLogout";
import { UserMenu } from "./UserMenu";

export function PublicHeader() {
  const navigate = useNavigate();

  const currentUser = useCurrentUser();
  const logout = useLogout();

  function handleLogout() {
    logout.mutate(undefined, {
      onSuccess: () => {
        navigate("/login");
      },
    });
  }

  const isAuthenticated =
    currentUser.isSuccess && currentUser.data !== undefined;

  return (
    <header className="border-b border-line">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link to="/" className="font-mono text-sm text-text">
          vaultapass
        </Link>

        {isAuthenticated ? (
          <UserMenu
            user={currentUser.data}
            onLogout={handleLogout}
            isLoggingOut={logout.isPending}
          />
        ) : (
          <nav className="flex items-center gap-6 text-sm">
            <Link
              to="/login"
              className="text-muted transition-colors hover:text-text"
            >
              Entrar
            </Link>

            <Link
              to="/register"
              className="text-text transition-colors hover:text-brass"
            >
              Criar conta
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
