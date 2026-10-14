import {
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  Mail,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Logotype } from "./Logotype";

const contacts = [
  {
    label: "E-mail",
    href: "mailto:gabriel_carvalho.contato@outlook.com",
    icon: Mail,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/5518991163599",
    icon: MessageCircle,
  },
  {
    label: "GitHub",
    href: "https://github.com/gabriel-cheng",
    icon: Code2,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/gabriel-henrique-ita/",
    icon: BriefcaseBusiness,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-8 sm:py-12 lg:px-10">
        <div className="grid grid-cols-1 justify-items-center gap-10 sm:grid-cols-2 sm:justify-items-start sm:gap-x-12 sm:gap-y-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(120px,0.7fr)_minmax(160px,0.8fr)] lg:gap-16">
          {/* Identidade */}
          <div className="w-full max-w-sm text-center sm:text-left">
            <div className="flex justify-center sm:justify-start">
              <Logotype type="link" text="vaultapass" />
            </div>

            <p className="mt-4 text-sm leading-6 text-muted">
              Suas credenciais, organizadas em um espaço dedicado à sua
              segurança e praticidade.
            </p>
          </div>

          {/* Navegação */}
          <div className="w-fit">
            <h2 className="text-center font-mono text-xs uppercase tracking-widest text-muted sm:text-left">
              Navegação
            </h2>

            <nav className="mt-4 flex flex-col items-center gap-3 sm:items-start">
              <Link
                to="/"
                className="text-sm text-text transition-colors hover:text-brass"
              >
                Página inicial
              </Link>

              <Link
                to="/login"
                className="text-sm text-text transition-colors hover:text-brass"
              >
                Entrar
              </Link>

              <Link
                to="/register"
                className="text-sm text-text transition-colors hover:text-brass"
              >
                Criar conta
              </Link>
            </nav>
          </div>

          {/* Contato */}
          <div className="w-fit">
            <h2 className="text-center font-mono text-xs uppercase tracking-widest text-muted sm:text-left">
              Contato
            </h2>

            <nav className="mt-4 flex flex-col gap-3 sm:items-start">
              {contacts.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("https://") ? "_blank" : undefined}
                  rel={
                    href.startsWith("https://")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group inline-flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-text"
                >
                  <Icon size={15} strokeWidth={1.7} />
                  <span>{label}</span>
                  <ArrowUpRight
                    size={12}
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-5 items-center text-xs text-muted sm:mt-12 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} VaultaPass. Todos os direitos
            reservados.
          </span>

          <span>Desenvolvido por Gabriel Carvalho.</span>
        </div>
      </div>
    </footer>
  );
}
