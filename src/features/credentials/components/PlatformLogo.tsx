import { useState } from "react";

interface PlatformLogoProps {
  platformName: string;
  link: string | null;
}

function getLogoSource(
  platformName: string,
  link: string | null,
): string | null {
  const token = import.meta.env.VITE_LOGO_DEV_PUBLIC_KEY;

  if (!token) {
    return null;
  }

  let identifier: string;

  if (link) {
    try {
      const url = new URL(link);
      identifier = url.hostname.replace(/^www\./, "");
    } catch {
      identifier = `name/${encodeURIComponent(platformName)}`;
    }
  } else {
    identifier = `name/${encodeURIComponent(platformName)}`;
  }

  return `https://img.logo.dev/${identifier}?token=${token}&size=128&format=webp&theme=dark&fallback=404`;
}

export function PlatformLogo({ platformName, link }: PlatformLogoProps) {
  const initial = platformName.charAt(0).toUpperCase();

  const logoSource = getLogoSource(platformName, link);

  const [hasError, setHasError] = useState(false);

  if (!logoSource || hasError) {
    return (
      <div
        className="
          flex
          size-11
          shrink-0
          items-center
          justify-center
          border
          border-line
          bg-ink
          font-mono
          text-sm
          text-muted
          transition-colors
          group-hover:border-brass
          group-hover:text-brass
        "
      >
        {initial}
      </div>
    );
  }

  return (
    <div
      className="
        flex
        size-11
        shrink-0
        items-center
        justify-center
        overflow-hidden
        border
        border-line
        bg-ink
        transition-colors
        group-hover:border-brass
      "
    >
      <img
        src={logoSource}
        alt={`${platformName} logo`}
        width={32}
        height={32}
        className="size-8 object-contain"
        onError={() => setHasError(true)}
      />
    </div>
  );
}
