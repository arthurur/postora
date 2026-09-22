import Image from 'next/image';

// The adjacent platform name supplies the accessible label.
export function BrandIcon({ src }: { src: string }) {
  return (
    <Image
      className="brand-icon"
      src={src}
      alt=""
      width={20}
      height={20}
      unoptimized
    />
  );
}
