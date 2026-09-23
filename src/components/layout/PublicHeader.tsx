import { Link } from "react-router-dom";

export function PublicHeader() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link to="/" className="font-mono text-sm text-text">
          vaultapass
        </Link>

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
      </div>
    </header>
  );
}
