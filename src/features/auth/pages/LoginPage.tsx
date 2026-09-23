import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../useLogin";
import { AuthLayout } from "../../../components/layout/AuthLayout";
import { Input } from "../../../components/ui/Input";
import { FormError } from "../../../components/ui/FormError";
import { Button } from "../../../components/ui/Button";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const login = useLogin();

  return (
    <AuthLayout>
      <div className="mb-10 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          vaultapass
        </p>

        <h1 className="mt-2 text-2xl font-medium text-text">Entrar no cofre</h1>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();

          login.mutate(
            { username, password },
            {
              onSuccess: () => navigate("/dashboard"),
            },
          );
        }}
        className="space-y-5"
      >
        <Input
          id="username"
          label="Usuário"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />

        <Input
          id="password"
          label="Senha"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="font-mono"
          required
        />

        {login.isError && (
          <FormError>
            {typeof login.error.response?.data === "string"
              ? login.error.response.data
              : "usuário ou senha inválidos"}
          </FormError>
        )}

        <Button type="submit" disabled={login.isPending} className="w-full">
          {login.isPending ? "Entrando..." : "Entrar"}
        </Button>
      </form>
      <div className="mt-8 text-center text-sm text-muted">
        <span>Não possui uma conta? </span>

        <Link
          to="/register"
          className="text-text transition-colors hover:text-brass"
        >
          Criar conta
        </Link>
      </div>
    </AuthLayout>
  );
}
