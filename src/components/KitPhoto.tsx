const photos = [
  {
    src: "/dog-on-kit.jpg",
    alt: "A golden retriever sitting on a black rear-bench seat cover",
  },
  {
    src: "/cover-detail.jpg",
    alt: "Close view of the black rear-bench cover with headrest straps and mesh windows",
  },
  {
    src: "/dog-rear-door.jpg",
    alt: "A golden retriever on the black seat cover, seen from the open rear of the car",
  },
];

export function KitPhoto({ className = "" }: { className?: string }) {
  return (
    <img
      src={photos[0].src}
      alt={photos[0].alt}
      className={`aspect-[4/3] w-full rounded-[28px] object-cover ${className}`}
    />
  );
}

export function KitPhotos() {
  const [main, ...details] = photos;
  return (
    <div className="grid gap-3">
      <img src={main.src} alt={main.alt} className="aspect-[4/3] w-full rounded-[28px] object-cover" />
      <div className="grid grid-cols-2 gap-3">
        {details.map((photo) => (
          <img
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            className="aspect-[4/3] w-full rounded-[28px] object-cover"
          />
        ))}
      </div>
    </div>
  );
}
