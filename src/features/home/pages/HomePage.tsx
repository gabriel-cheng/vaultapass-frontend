import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/Button";
import { PublicHeader } from "../../../components/layout/PublicHeader";

export function HomePage() {
  return (
    <div className="min-h-screen bg-ink">
      <PublicHeader />

      <main>
        <section className="mx-auto flex min-h-[calc(100vh-65px)] max-w-5xl items-center px-6">
          <div className="max-w-2xl">
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
              vaultapass
            </p>

            <h1 className="text-4xl font-medium leading-tight text-text sm:text-5xl">
              Seu cofre pessoal para credenciais.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-muted">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              vitae justo eget magna fermentum iaculis.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <Link to="/register">
                <Button>Criar conta</Button>
              </Link>

              <Link
                to="/login"
                className="text-sm text-muted transition-colors hover:text-text"
              >
                Entrar
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-line">
          <div className="mx-auto max-w-5xl px-6 py-16">
            <div className="grid gap-10 sm:grid-cols-3">
              <div>
                <p className="font-mono text-xs text-muted">01</p>

                <h2 className="mt-3 text-base font-medium text-text">
                  Credenciais
                </h2>

                <p className="mt-2 text-sm leading-6 text-muted">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>

              <div>
                <p className="font-mono text-xs text-muted">02</p>

                <h2 className="mt-3 text-base font-medium text-text">
                  Controle
                </h2>

                <p className="mt-2 text-sm leading-6 text-muted">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>

              <div>
                <p className="font-mono text-xs text-muted">03</p>

                <h2 className="mt-3 text-base font-medium text-text">
                  Privacidade
                </h2>

                <p className="mt-2 text-sm leading-6 text-muted">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
