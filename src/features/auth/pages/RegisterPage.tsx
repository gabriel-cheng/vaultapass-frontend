import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../../../components/layout/AuthLayout";
import { Button } from "../../../components/ui/Button";
import { FormError } from "../../../components/ui/FormError";
import { Input } from "../../../components/ui/Input";
import { useRegister } from "../useRegister";

export function RegisterPage() {
  const navigate = useNavigate();
  const register = useRegister();

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== passwordConfirmation) {
      return;
    }

    register.mutate(
      {
        name,
        lastname,
        username,
        email,
        password,
      },
      {
        onSuccess: () => {
          navigate("/login");
        },
      },
    );
  };

  const passwordMismatch =
    passwordConfirmation.length > 0 && password !== passwordConfirmation;

  return (
    <AuthLayout>
      <div className="mb-10 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          vaultapass
        </p>

        <h1 className="mt-2 text-2xl font-medium text-text">Criar sua conta</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-5">
          <Input
            id="name"
            label="Nome"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="given-name"
            required
          />

          <Input
            id="lastname"
            label="Sobrenome"
            value={lastname}
            onChange={(event) => setLastname(event.target.value)}
            autoComplete="family-name"
            required
          />
        </div>

        <Input
          id="username"
          label="Usuário"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          autoComplete="username"
          required
        />

        <Input
          id="email"
          label="E-mail"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
        />

        <Input
          id="password"
          label="Senha"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="new-password"
          className="font-mono"
          required
        />

        <Input
          id="passwordConfirmation"
          label="Confirmar senha"
          type="password"
          value={passwordConfirmation}
          onChange={(event) => setPasswordConfirmation(event.target.value)}
          autoComplete="new-password"
          className="font-mono"
          required
        />

        {passwordMismatch && <FormError>As senhas não coincidem.</FormError>}

        {register.isError && (
          <FormError>
            {typeof register.error.response?.data === "string"
              ? register.error.response.data
              : "Não foi possível criar a conta."}
          </FormError>
        )}

        <Button
          type="submit"
          disabled={register.isPending || passwordMismatch}
          className="w-full"
        >
          {register.isPending ? "Criando conta..." : "Criar conta"}
        </Button>
      </form>

      <div className="mt-8 text-center text-sm text-muted">
        <span>Já possui uma conta? </span>

        <Link
          to="/login"
          className="text-text transition-colors hover:text-brass"
        >
          Entrar
        </Link>
      </div>
    </AuthLayout>
  );
}
