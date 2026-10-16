import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Icon({ size = 24, children, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      {children}
    </svg>
  );
}

export const SearchIcon = (p: IconProps) => <Icon {...p}><circle cx="11" cy="11" r="7.5" /><path d="m20.5 20.5-4.2-4.2" /></Icon>;
export const CartIcon = (p: IconProps) => <Icon {...p}><path d="M2.5 3.5h2.6l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.7a1.5 1.5 0 0 0 1.5-1.2L21 7H5.9" /><circle cx="9.5" cy="20" r="1.2" /><circle cx="17.5" cy="20" r="1.2" /></Icon>;
export const UserIcon = (p: IconProps) => <Icon {...p}><circle cx="12" cy="12" r="9.5" /><circle cx="12" cy="10" r="3.2" /><path d="M6.2 18.4a7 7 0 0 1 11.6 0" /></Icon>;
export const MenuIcon = (p: IconProps) => <Icon {...p}><path d="M3.5 6h17M3.5 12h17M3.5 18h17" /></Icon>;
export const CloseIcon = (p: IconProps) => <Icon {...p}><path d="M6 6l12 12M18 6 6 18" /></Icon>;
export const ChevronDown = (p: IconProps) => <Icon {...p}><path d="m6 9 6 6 6-6" /></Icon>;
export const ChevronUp = (p: IconProps) => <Icon {...p}><path d="m6 15 6-6 6 6" /></Icon>;
export const ChevronRight = (p: IconProps) => <Icon {...p}><path d="m9 6 6 6-6 6" /></Icon>;
export const ArrowLeft = (p: IconProps) => <Icon {...p}><path d="M20 12H4m6-6-6 6 6 6" /></Icon>;
export const ArrowRight = (p: IconProps) => <Icon {...p}><path d="M4 12h16m-6-6 6 6-6 6" /></Icon>;
export const PlusIcon = (p: IconProps) => <Icon {...p}><path d="M12 5v14M5 12h14" /></Icon>;
export const MinusIcon = (p: IconProps) => <Icon {...p}><path d="M5 12h14" /></Icon>;
export const CheckIcon = (p: IconProps) => <Icon {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></Icon>;
export const SlidersIcon = (p: IconProps) => <Icon {...p}><path d="M6 3v6m0 4v8M12 3v10m0 4v4M18 3v4m0 4v10M4 11h4M10 15h4M16 9h4" /></Icon>;
export const TagIcon = (p: IconProps) => <Icon {...p}><path d="M3 12.6V4.5A1.5 1.5 0 0 1 4.5 3h8.1a1.5 1.5 0 0 1 1 .4l7 7a1.5 1.5 0 0 1 0 2.2l-8 8a1.5 1.5 0 0 1-2.2 0l-7-7a1.5 1.5 0 0 1-.4-1Z" /><circle cx="8" cy="8" r="1.4" /></Icon>;
export const MailIcon = (p: IconProps) => <Icon {...p}><rect x="2.5" y="5" width="19" height="14" rx="1.5" /><path d="m3 6 9 7 9-7" /></Icon>;
export const AlertIcon = (p: IconProps) => <Icon {...p}><circle cx="12" cy="12" r="9.5" /><path d="M12 7.5v5.5M12 16.5v.01" /></Icon>;
export const TruckIcon = (p: IconProps) => <Icon {...p}><path d="M2.5 6.5h11v9h-11zM13.5 9.5h4l3 3v3h-7z" /><circle cx="6.5" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></Icon>;
export const BagIcon = (p: IconProps) => <Icon {...p}><path d="M5 7.5h14l-1 13H6zM9 7.5V6a3 3 0 0 1 6 0v1.5" /></Icon>;

export function TrashIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.25 4.5H16.5v-.75A2.25 2.25 0 0 0 14.25 1.5h-4.5A2.25 2.25 0 0 0 7.5 3.75v.75H3.75a1.125 1.125 0 0 0 0 2.25H4.5V19.5a1.875 1.875 0 0 0 1.875 1.875h11.25A1.875 1.875 0 0 0 19.5 19.5V6.75h.75a1.125 1.125 0 0 0 0-2.25ZM9.75 3.75h4.5v.75h-4.5v-.75Zm7.5 15.375H6.75V6.75h10.5v12.375ZM11.25 9.75v6a1.125 1.125 0 0 1-2.25 0v-6a1.125 1.125 0 0 1 2.25 0Zm3.75 0v6a1.125 1.125 0 0 1-2.25 0v-6a1.125 1.125 0 0 1 2.25 0Z" />
    </svg>
  );
}

export function SparkleIcon({ size = 104, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 104 104" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M52 0C53.7654 27.955 76.0448 50.2347 104 52 76.0448 53.7654 53.7654 76.0448 52 104 50.2347 76.0448 27.955 53.7654 0 52 27.955 50.2347 50.2347 27.955 52 0Z" />
    </svg>
  );
}

export function VerifiedIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="10" fill="var(--color-verified)" />
      <path d="m7.5 12.3 3 3 6-6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StarShape({ fill, size = 18 }: { fill: "full" | "half" | "empty"; size?: number }) {
  const d = "M12 2.5l2.94 6.17 6.74.83-4.97 4.65 1.28 6.68L12 17.55l-5.99 3.28 1.28-6.68L2.32 9.5l6.74-.83L12 2.5z";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      {fill === "full" && <path d={d} fill="var(--color-star)" />}
      {fill === "half" && <path d="M12 2.5v15.05l-5.99 3.28 1.28-6.68L2.32 9.5l6.74-.83L12 2.5z" fill="var(--color-star)" />}
    </svg>
  );
}

export const SocialIcons = {
  twitter: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23 4.6a9 9 0 0 1-2.6.7 4.5 4.5 0 0 0 2-2.5 9 9 0 0 1-2.9 1.1 4.5 4.5 0 0 0-7.7 4.1A12.8 12.8 0 0 1 2.5 3.3a4.5 4.5 0 0 0 1.4 6 4.5 4.5 0 0 1-2-.6v.1a4.5 4.5 0 0 0 3.6 4.4 4.5 4.5 0 0 1-2 .1 4.5 4.5 0 0 0 4.2 3.1A9 9 0 0 1 1 18.3 12.7 12.7 0 0 0 7.9 20.3c8.3 0 12.8-6.9 12.8-12.8v-.6A9.1 9.1 0 0 0 23 4.6z" /></svg>
  ),
  facebook: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 8V6c0-.9.6-1.1 1-1.1h2.6V1h-3.6C10 1 9.2 3.9 9.2 5.8V8H6.8v4h2.4v11h4.8V12h3.2l.4-4H14z" /></svg>
  ),
  instagram: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" /></svg>
  ),
  github: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 1.5a10.5 10.5 0 0 0-3.3 20.5c.5.1.7-.2.7-.5v-1.8c-2.9.6-3.5-1.4-3.5-1.4-.5-1.2-1.2-1.5-1.2-1.5-.9-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.6 2.5 1.1 3.1.9.1-.7.4-1.1.7-1.4-2.3-.3-4.8-1.2-4.8-5.2 0-1.1.4-2.1 1.1-2.8-.1-.3-.5-1.4.1-2.8 0 0 .9-.3 2.9 1.1a10 10 0 0 1 5.3 0c2-1.4 2.9-1.1 2.9-1.1.6 1.4.2 2.5.1 2.8.7.7 1.1 1.7 1.1 2.8 0 4-2.5 4.9-4.8 5.2.4.3.7 1 .7 2v2.9c0 .3.2.6.7.5A10.5 10.5 0 0 0 12 1.5z" /></svg>
  ),
};
