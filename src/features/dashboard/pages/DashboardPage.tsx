import { useMemo, useState } from "react";
import { ArrowRight, Plus, Search, ShieldCheck } from "lucide-react";
import { PublicHeader } from "../../../components/layout/PublicHeader";
import { CredentialGrid } from "../../credentials/components/CredentialGrid";
import { useCredentials } from "../../credentials/api/useCredentials";
import type { Credential } from "../../credentials/types";
import { useNavigate } from "react-router-dom";

export function DashboardPage() {
  const credentials = useCredentials();

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const filteredCredentials = useMemo(() => {
    if (!credentials.data) {
      return [];
    }

    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return credentials.data;
    }

    return credentials.data.filter((credential) => {
      return (
        credential.platformName.toLowerCase().includes(normalizedSearch) ||
        credential.login.toLowerCase().includes(normalizedSearch) ||
        (credential.email ?? "").toLowerCase().includes(normalizedSearch)
      );
    });
  }, [credentials.data, search]);

  function handleSelectCredential(credential: Credential) {
    navigate(`/credentials/${credential.id}`);
  }

  return (
    <div className="min-h-screen bg-ink">
      <PublicHeader />

      <main className="mx-auto max-w-6xl px-6 py-10 sm:py-14">
        <section>
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck
                  size={16}
                  strokeWidth={1.5}
                  className="text-brass"
                />

                <p className="font-mono text-xs uppercase tracking-widest text-muted">
                  cofre pessoal
                </p>
              </div>

              <h1 className="mt-3 text-3xl font-medium tracking-tight text-text sm:text-4xl">
                Suas credenciais
              </h1>

              <p className="mt-3 max-w-lg text-sm leading-6 text-muted">
                Todos os seus acessos protegidos em um único lugar.
              </p>
            </div>

            <button
              type="button"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                self-start
                bg-brass
                px-4
                py-2.5
                text-sm
                font-medium
                text-ink
                transition
                hover:brightness-110
                sm:self-auto
                cursor-pointer
              "
              onClick={() => navigate("/credentials/new")}
            >
              <Plus size={17} strokeWidth={1.75} />
              Nova credencial
            </button>
          </div>
        </section>

        <section className="mt-12 border-t border-line pt-5">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted">
                suas credenciais
              </p>

              {!credentials.isPending && (
                <p className="mt-2 text-sm text-text">
                  {credentials.data?.length ?? 0}{" "}
                  {credentials.data?.length === 1
                    ? "credencial"
                    : "credenciais"}
                </p>
              )}
            </div>

            <div className="relative w-full sm:w-72">
              <Search
                size={16}
                strokeWidth={1.5}
                className="
                  pointer-events-none
                  absolute
                  left-0
                  top-1/2
                  -translate-y-1/2
                  text-muted
                "
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar credenciais"
                className="
                  w-full
                  border-b
                  border-line
                  bg-transparent
                  py-2
                  pl-7
                  pr-2
                  text-sm
                  text-text
                  outline-none
                  placeholder:text-muted
                  focus:border-brass
                "
              />
            </div>
          </div>
        </section>

        <section className="mt-6">
          {credentials.isPending && (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-36 border border-line bg-surface"
                />
              ))}
            </div>
          )}

          {credentials.isError && (
            <div className="border-t border-line py-12">
              <p className="font-mono text-xs text-danger">
                Não foi possível carregar suas credenciais.
              </p>
            </div>
          )}

          {credentials.isSuccess && credentials.data.length === 0 && (
            <div className="border-y border-line py-16">
              <div className="max-w-md">
                <p className="font-mono text-xs uppercase tracking-widest text-muted">
                  cofre vazio
                </p>

                <h2 className="mt-3 text-xl font-medium text-text">
                  Sua primeira credencial começa aqui.
                </h2>

                <p className="mt-3 text-sm leading-6 text-muted">
                  Adicione uma conta para começar a organizar seus acessos
                  dentro do VaultaPass.
                </p>

                <button
                  type="button"
                  className="
                      mt-6
                      inline-flex
                      items-center
                      gap-2
                      text-sm
                      text-brass
                      transition-colors
                      hover:text-text
                    "
                >
                  Criar primeira credencial
                  <ArrowRight size={15} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          )}

          {credentials.isSuccess &&
            credentials.data.length > 0 &&
            filteredCredentials.length === 0 && (
              <div className="border-y border-line py-16">
                <p className="font-mono text-xs uppercase tracking-widest text-muted">
                  nenhuma correspondência
                </p>

                <h2 className="mt-3 text-xl font-medium text-text">
                  Nenhuma credencial encontrada.
                </h2>

                <p className="mt-3 text-sm text-muted">
                  Tente buscar por plataforma, login ou e-mail.
                </p>
              </div>
            )}

          {credentials.isSuccess && filteredCredentials.length > 0 && (
            <CredentialGrid
              credentials={filteredCredentials}
              onSelect={handleSelectCredential}
            />
          )}
        </section>
      </main>
    </div>
  );
}
