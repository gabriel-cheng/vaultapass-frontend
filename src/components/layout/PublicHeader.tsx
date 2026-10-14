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
    currentUser.isSuccess &&
    !currentUser.isFetching &&
    currentUser.data !== null &&
    currentUser.data !== undefined;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/logo/sizes/vaultapass_250x205.png"
            alt="VaultaPass"
            className="h-8 w-auto"
          />

          <span className="font-mono text-sm text-text">VAULTAPASS</span>
        </Link>

        {isAuthenticated && currentUser.data ? (
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
