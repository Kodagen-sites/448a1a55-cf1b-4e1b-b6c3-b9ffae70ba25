type Socials = {
  instagram?: string;
  linkedin?: string;
  x?: string;
  youtube?: string;
  facebook?: string;
  tiktok?: string;
};

function Instagram() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="w-4 h-4">
      <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.9.3 2.4.5.6.2 1.1.5 1.6 1s.8 1 1 1.6c.2.5.4 1.2.5 2.4.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.3 1.9-.5 2.4-.2.6-.5 1.1-1 1.6s-1 .8-1.6 1c-.5.2-1.2.4-2.4.5-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.9-.3-2.4-.5-.6-.2-1.1-.5-1.6-1s-.8-1-1-1.6c-.2-.5-.4-1.2-.5-2.4C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.3-1.9.5-2.4.2-.6.5-1.1 1-1.6s1-.8 1.6-1c.5-.2 1.2-.4 2.4-.5C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.2 0-3.5 0-4.7.1-1.1.1-1.7.2-2.1.4-.5.2-.9.4-1.3.8s-.6.8-.8 1.3c-.2.4-.3 1-.4 2.1C2.6 8.5 2.6 8.8 2.6 12s0 3.5.1 4.7c.1 1.1.2 1.7.4 2.1.2.5.4.9.8 1.3s.8.6 1.3.8c.4.2 1 .3 2.1.4 1.2.1 1.5.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.4.5-.2.9-.4 1.3-.8s.6-.8.8-1.3c.2-.4.3-1 .4-2.1.1-1.2.1-1.5.1-4.7s0-3.5-.1-4.7c-.1-1.1-.2-1.7-.4-2.1-.2-.5-.4-.9-.8-1.3s-.8-.6-1.3-.8c-.4-.2-1-.3-2.1-.4-1.2-.1-1.5-.1-4.7-.1zm0 3.1a5.1 5.1 0 1 1 0 10.2 5.1 5.1 0 0 1 0-10.2zm0 1.8a3.3 3.3 0 1 0 0 6.6 3.3 3.3 0 0 0 0-6.6zm5.4-2.1a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z" />
    </svg>
  );
}
function LinkedIn() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="w-4 h-4">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7 0h3.8v1.8h.06c.53-.95 1.84-1.95 3.79-1.95 4.05 0 4.8 2.67 4.8 6.15V21H18.6v-5.5c0-1.31-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21H10V9z" />
    </svg>
  );
}
function X() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="w-4 h-4">
      <path d="M18.244 2H21l-6.55 7.486L22 22h-6.79l-4.61-6.024L5.36 22H2.6l7.014-8.018L2 2h6.94l4.16 5.5L18.244 2zm-2.38 18h1.69L7.21 4H5.4l10.464 16z" />
    </svg>
  );
}

const ICONS: Record<string, React.ComponentType> = {
  instagram: Instagram,
  linkedin: LinkedIn,
  x: X,
};

export function SocialLinks({ socials }: { socials: Socials }) {
  const entries = Object.entries(socials).filter(([, v]) => v && v.length > 0);
  if (entries.length === 0) return null;
  return (
    <div className="flex items-center gap-3">
      {entries.map(([key, url]) => {
        const Icon = ICONS[key];
        if (!Icon) return null;
        return (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={key}
            className="w-8 h-8 rounded-full flex items-center justify-center border border-contrast/20 text-contrast/70 hover:text-contrast hover:border-contrast/50 transition-colors"
          >
            <Icon />
          </a>
        );
      })}
    </div>
  );
}
