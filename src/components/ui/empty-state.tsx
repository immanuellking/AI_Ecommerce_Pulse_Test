import type { ReactNode } from "react";

export function EmptyState({ icon, title, description, children }: { icon?: ReactNode; title: string; description?: string; children?: ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-[20px] border border-line px-6 py-14 text-center">
      {icon && <div className="mb-5 grid size-16 place-items-center rounded-full bg-surface">{icon}</div>}
      <h2 className="text-xl font-bold lg:text-2xl">{title}</h2>
      {description && <p className="mt-2 max-w-md text-muted">{description}</p>}
      {children && <div className="mt-6 flex flex-wrap justify-center gap-3">{children}</div>}
    </div>
  );
}
