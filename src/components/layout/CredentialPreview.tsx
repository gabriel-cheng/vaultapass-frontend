import { KeyRound } from "lucide-react";

export function CredentialPreview() {
  const previewCredentials = [
    { name: "Spotify", domain: "spotify.com", email: "meuspotify@outlook.com" },
    { name: "YouTube", domain: "youtube.com", email: "meuyoutube@gmail.com" },
    { name: "Google", domain: "google.com", email: "meugoogle@gmail.com" },
    { name: "GitHub", domain: "github.com", email: "meugithub@outlook.com" },
  ];

  const logoToken = import.meta.env.VITE_LOGO_DEV_PUBLIC_KEY;

  return (
    <div className="min-w-0 border border-line bg-surface">
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <div>
          <p className="mt-1 text-xs text-muted">Suas credenciais</p>
        </div>

        <span className="font-mono text-[10px] tracking-wider text-muted">
          DEMONSTRAÇÃO
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <p className="text-xs text-muted">Exemplo de organização</p>

        <h2 className="mt-2 text-xl font-medium text-text">Seus acessos.</h2>

        <div className="mt-6 divide-y divide-line border-y border-line">
          {previewCredentials.map((credential, index) => (
            <div
              key={credential.domain}
              className="flex min-w-0 items-center gap-3 py-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-line bg-ink">
                <img
                  src={`https://img.logo.dev/${credential.domain}?token=${logoToken}&size=128&format=webp&theme=dark&fallback=404`}
                  alt={`Logo de ${credential.name}`}
                  loading={index < 3 ? "eager" : "lazy"}
                  className="h-6 w-6 object-contain"
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-text">{credential.name}</p>
                <p className="mt-1 text-xs text-muted">{credential.email}</p>
              </div>

              <span
                aria-hidden="true"
                className="font-mono text-xs tracking-widest text-muted"
              >
                ••••••••
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="text-xs leading-5 text-muted">
            Uma visão do seu espaço pessoal.
          </p>

          <KeyRound
            size={16}
            strokeWidth={1.4}
            className="shrink-0 text-brass"
          />
        </div>
      </div>
    </div>
  );
}
