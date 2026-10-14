import { Link } from "react-router-dom";
import {
  ArrowDownRight,
  ArrowRight,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

import { PublicHeader } from "../../../components/layout/PublicHeader";
import { Button } from "../../../components/ui/Button";
import { CredentialPreview } from "../../../components/layout/CredentialPreview";
import { useCurrentUser } from "../../auth/api/useCurrentUser";
import { Logotype } from "../../../components/layout/Logotype";

export function HomePage() {
  const currentUser = useCurrentUser();

  const isAuthenticated = currentUser.isSuccess && currentUser.data !== null;

  const isUnauthenticated = currentUser.isSuccess === false;

  return (
    <div className="min-h-screen bg-ink">
      <PublicHeader />

      <main>
        {/* 01 — Hero */}
        <section className="border-b border-line">
          <div className="mx-auto grid max-w-5xl items-center gap-14 px-6 py-20 sm:py-28 lg:grid-cols-[1fr_0.9fr] lg:gap-12">
            <div>
              <p className="mb-6 flex items-center gap-3 font-mono text-xs tracking-widest text-muted">
                <Logotype type="link" text="seu cofre digital" />
              </p>

              <h1 className="max-w-xl text-4xl font-medium leading-tight tracking-tight text-text sm:text-5xl lg:text-6xl">
                Suas credenciais.
                <span className="mt-2 block text-muted">Sob seu controle.</span>
              </h1>

              <p className="mt-7 max-w-lg text-base leading-7 text-muted">
                Reúna suas informações de acesso em um só lugar. Uma maneira
                mais organizada de gerenciar as credenciais que fazem parte da
                sua rotina.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-5">
                {isUnauthenticated && (
                  <>
                    <Link to="/register">
                      <Button>Criar minha conta</Button>
                    </Link>

                    <Link
                      to="/login"
                      className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-text"
                    >
                      Já tenho uma conta
                      <ArrowRight size={15} />
                    </Link>
                  </>
                )}

                {isAuthenticated && (
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-2 text-sm text-text transition-colors hover:text-brass"
                  >
                    Abrir meu cofre
                    <ArrowRight size={15} />
                  </Link>
                )}
              </div>

              <div className="mt-10 flex items-center gap-3 border-t border-line pt-5">
                <LockKeyhole
                  size={16}
                  strokeWidth={1.5}
                  className="shrink-0 text-brass"
                />

                <p className="text-xs leading-5 text-muted">
                  Organização e cuidado com suas informações de acesso.
                </p>
              </div>
            </div>

            <CredentialPreview />
          </div>
        </section>

        {/* 02 — Organização */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
            <div className="grid gap-8 sm:grid-cols-[0.85fr_1.15fr] sm:gap-16">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-muted">
                  01 / Organização
                </p>

                <h2 className="mt-5 text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
                  Menos dispersão.
                  <span className="block text-muted">Mais clareza.</span>
                </h2>
              </div>

              <div className="sm:pt-8">
                <p className="text-base leading-7 text-muted">
                  Entre contas pessoais, ferramentas de trabalho e serviços do
                  dia a dia, é fácil perder o controle de onde cada informação
                  está.
                </p>

                <p className="mt-5 text-base leading-7 text-muted">
                  O VaultaPass oferece um espaço dedicado para cadastrar,
                  consultar e gerenciar suas credenciais, com uma experiência
                  objetiva e sem distrações.
                </p>

                <div className="mt-7">
                  <Link
                    to="/register"
                    className="inline-flex items-center gap-2 text-sm text-text transition-colors hover:text-brass"
                  >
                    Conheça o VaultaPass
                    <ArrowDownRight size={16} />
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-14 grid border-y border-line sm:grid-cols-3">
              <article className="border-b border-line py-6 sm:border-b-0 sm:border-r sm:pr-6">
                <p className="font-mono text-xs text-muted">01</p>

                <KeyRound
                  size={20}
                  strokeWidth={1.4}
                  className="mt-5 text-brass"
                />

                <h3 className="mt-4 text-base font-medium text-text">
                  Centralize
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted">
                  Mantenha as credenciais cadastradas em um espaço dedicado.
                </p>
              </article>

              <article className="border-b border-line py-6 sm:border-b-0 sm:border-r sm:px-6">
                <p className="font-mono text-xs text-muted">02</p>

                <LockKeyhole
                  size={20}
                  strokeWidth={1.4}
                  className="mt-5 text-brass"
                />

                <h3 className="mt-4 text-base font-medium text-text">
                  Consulte
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted">
                  Encontre as informações cadastradas quando precisar delas.
                </p>
              </article>

              <article className="py-6 sm:pl-6">
                <p className="font-mono text-xs text-muted">03</p>

                <ShieldCheck
                  size={20}
                  strokeWidth={1.4}
                  className="mt-5 text-brass"
                />

                <h3 className="mt-4 text-base font-medium text-text">
                  Gerencie
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted">
                  Tenha um espaço dedicado ao gerenciamento das suas informações
                  de acesso.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* 03 — Segurança */}
        <section className="border-b border-line">
          <div className="mx-auto grid max-w-5xl gap-10 px-6 py-20 sm:py-24 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted">
                02 / Segurança e privacidade
              </p>

              <h2 className="mt-5 max-w-lg text-3xl font-medium leading-tight tracking-tight text-text sm:text-4xl">
                Segurança não precisa de promessas grandiosas.
              </h2>

              <p className="mt-6 max-w-lg text-base leading-7 text-muted">
                Credenciais são informações que merecem cuidado. Por isso, é
                importante considerar como a aplicação gerencia o acesso e
                protege os dados durante a comunicação e o armazenamento.
              </p>
            </div>

            <div className="border-t border-line">
              <article className="flex gap-4 border-b border-line py-5">
                <ShieldCheck
                  size={19}
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0 text-brass"
                />

                <div>
                  <h3 className="text-sm font-medium text-text">
                    Autenticação
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted">
                    O acesso às áreas pessoais é gerenciado pela autenticação da
                    conta.
                  </p>
                </div>
              </article>

              <article className="flex gap-4 border-b border-line py-5">
                <LockKeyhole
                  size={19}
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0 text-brass"
                />

                <div>
                  <h3 className="text-sm font-medium text-text">
                    Comunicação HTTPS
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted">
                    A comunicação com o serviço utiliza HTTPS, que protege os
                    dados transmitidos contra leitura e alteração durante o
                    transporte, dentro dos limites do protocolo.
                  </p>
                </div>
              </article>

              <article className="flex gap-4 py-5">
                <KeyRound
                  size={19}
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0 text-brass"
                />

                <div>
                  <h3 className="text-sm font-medium text-text">
                    Proteção das credenciais armazenadas
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted">
                    O armazenamento das credenciais conta com criptografia. Os
                    detalhes sobre o método, o gerenciamento das chaves e o
                    alcance dessa proteção devem ser avaliados em conjunto com a
                    implementação.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* 04 — Chamada final */}
        <section>
          <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              03 / Seu próximo passo
            </p>

            <div className="mt-6 flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-medium leading-tight tracking-tight text-text sm:text-5xl">
                  Um lugar para suas credenciais.
                  <span className="mt-2 block text-muted">
                    Uma rotina mais organizada.
                  </span>
                </h2>

                <p className="mt-6 max-w-lg text-base leading-7 text-muted">
                  Comece a reunir suas informações de acesso em um espaço
                  dedicado a elas.
                </p>
              </div>

              <div className="flex shrink-0 flex-col items-center gap-13">
                <img
                  src="/logo/sizes/vaultapass_250x205.png"
                  alt="VaultaPass"
                  width={250}
                  height={205}
                />

                <div className="flex flex-wrap items-center gap-5">
                  {isUnauthenticated && (
                    <>
                      <Link to="/register">
                        <Button>Criar minha conta</Button>
                      </Link>

                      <Link
                        to="/login"
                        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-text"
                      >
                        Já tenho uma conta
                        <ArrowRight size={15} />
                      </Link>
                    </>
                  )}

                  {isAuthenticated && (
                    <Link
                      to="/dashboard"
                      className="inline-flex items-center gap-2 text-sm text-text transition-colors hover:text-brass"
                    >
                      Abrir meu cofre
                      <ArrowRight size={15} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
