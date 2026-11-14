export function KitPhoto({ className = "" }: { className?: string }) {
  return (
    <img
      src="/dog-on-kit.jpg"
      alt="A golden retriever sitting on a black rear-bench seat cover"
      className={`aspect-[4/3] w-full rounded-[28px] object-cover ${className}`}
    />
  );
}
