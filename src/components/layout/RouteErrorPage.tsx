import { Link, useRouteError } from "react-router-dom";
import { Button } from "../ui/Button";

export function RouteErrorPage() {
  const error = useRouteError();

  const isNotFound =
    error &&
    typeof error === "object" &&
    "status" in error &&
    error.status === 404;

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6">
      <div className="w-full max-w-sm text-center">
        <p className="font-mono text-xs text-muted">
          {isNotFound ? "404" : "ERROR"}
        </p>

        <h1 className="mt-3 text-2xl font-medium text-text">
          {isNotFound ? "Página não encontrada" : "Algo deu errado"}
        </h1>

        <p className="mt-3 text-sm leading-6 text-muted">
          {isNotFound
            ? "A rota que você tentou acessar não existe."
            : "Não foi possível carregar esta página."}
        </p>

        <Link to="/" className="mt-8 inline-block">
          <Button>Voltar para a página inicial</Button>
        </Link>
      </div>
    </div>
  );
}
