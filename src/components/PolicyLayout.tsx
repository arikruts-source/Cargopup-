export function PolicyLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="mx-auto w-full max-w-2xl px-4 py-12">
      <h1 className="font-serif text-4xl text-[var(--ink)]">{title}</h1>
      <div className="mt-6 space-y-4 text-base leading-7 text-[var(--ink)]">{children}</div>
    </article>
  );
}
