import { Logotype } from "./Logotype";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-5 px-6 py-7 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Logotype type="link" text="vaultapass" />

          <p className="mt-2 text-xs text-muted">
            Suas credenciais. Sob seu controle.
          </p>
        </div>

        <p className="text-xs text-muted">
          © {new Date().getFullYear()} VaultaPass. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
