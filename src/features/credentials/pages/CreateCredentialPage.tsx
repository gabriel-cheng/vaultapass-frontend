import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { PublicHeader } from "../../../components/layout/PublicHeader";
import { Button } from "../../../components/ui/Button";
import { FormError } from "../../../components/ui/FormError";
import { Input } from "../../../components/ui/Input";

import { useCreateCredential } from "../api/useCreateCredential";

export function CreateCredentialPage() {
  const navigate = useNavigate();

  const createCredential = useCreateCredential();

  const [platformName, setPlatformName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");

  const canSubmit =
    platformName.trim() !== "" && login.trim() !== "" && password.trim() !== "";

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    createCredential.mutate(
      {
        platformName: platformName.trim(),
        login: login.trim(),
        password,
        email: email.trim() || null,
        link: link.trim() || null,
        description: description.trim() || null,
      },
      {
        onSuccess: (credential) => {
          navigate(`/credentials/${credential.id}`);
        },
      },
    );
  }

  return (
    <div className="min-h-screen bg-ink">
      <PublicHeader />

      <main className="mx-auto max-w-3xl px-6 py-10">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-text"
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          Voltar para credenciais
        </Link>

        <header className="mt-10 border-b border-line pb-8">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            nova credencial
          </p>

          <h1 className="mt-3 text-3xl font-medium text-text">
            Criar credencial
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
            Adicione uma nova credencial ao seu cofre.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="mt-8">
          <section>
            <div className="border-b border-line py-6">
              <Input
                id="platform-name"
                label="Plataforma *"
                value={platformName}
                onChange={(event) => setPlatformName(event.target.value)}
                placeholder="Ex.: Spotify"
                required
                autoFocus
              />
            </div>

            <div className="border-b border-line py-6">
              <Input
                id="credential-login"
                label="Login *"
                value={login}
                onChange={(event) => setLogin(event.target.value)}
                placeholder="Seu login"
                required
              />
            </div>

            <div className="border-b border-line py-6">
              <Input
                id="credential-password"
                label="Senha *"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Senha da credencial"
                className="font-mono"
                required
              />
            </div>

            <div className="border-b border-line py-6">
              <Input
                id="credential-email"
                label="E-mail (opcional)"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="E-mail associado"
              />
            </div>

            <div className="border-b border-line py-6">
              <Input
                id="credential-link"
                label="Link (opcional)"
                type="url"
                value={link}
                onChange={(event) => setLink(event.target.value)}
                placeholder="https://..."
              />
            </div>

            <div className="border-b border-line py-6">
              <div className="border-b border-line pb-2 transition-colors focus-within:border-brass">
                <label
                  htmlFor="credential-description"
                  className="block text-xs text-muted"
                >
                  Descrição (opcional)
                </label>

                <textarea
                  id="credential-description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Adicione uma descrição..."
                  className="
                    mt-1
                    min-h-28
                    w-full
                    resize-y
                    bg-transparent
                    text-sm
                    leading-6
                    text-text
                    outline-none
                    placeholder:text-muted/60
                  "
                />
              </div>
            </div>
          </section>

          {createCredential.isError && (
            <div className="mt-6">
              <FormError>
                {createCredential.error.response?.data ??
                  "Não foi possível criar a credencial."}
              </FormError>
            </div>
          )}

          <div className="mt-8 flex items-center justify-end gap-5">
            <Link
              to="/dashboard"
              className="text-sm text-muted transition-colors hover:text-text"
            >
              Cancelar
            </Link>

            <Button
              type="submit"
              disabled={!canSubmit || createCredential.isPending}
            >
              Criar credencial
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
