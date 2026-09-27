import type { Credential } from "../types";
import { CredentialCard } from "./CredentialCard";

interface CredentialGridProps {
  credentials: Credential[];
  onSelect: (credential: Credential) => void;
}

export function CredentialGrid({ credentials, onSelect }: CredentialGridProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {credentials.map((credential) => (
        <CredentialCard
          key={credential.id}
          credential={credential}
          onClick={() => onSelect(credential)}
        />
      ))}
    </div>
  );
}
