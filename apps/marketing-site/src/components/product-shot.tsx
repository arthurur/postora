import Image from 'next/image';

export function ProductShot({ priority = false }: { priority?: boolean }) {
  return (
    <figure className="product-shot">
      <a
        className="product-desktop"
        href="/images/postora-calendar.webp"
        aria-label="Ampliar calendário do Postora"
      >
        <Image
          src="/images/postora-calendar.webp"
          alt="Calendário real do Postora com publicações fictícias de uma criadora, do Café Aurora e da Agência Horizonte."
          width={1200}
          height={820}
          sizes="(max-width: 1050px) 90vw, 580px"
          priority={priority}
        />
      </a>
      <a
        className="product-mobile"
        href="/images/postora-list.webp"
        aria-label="Ampliar lista de publicações do Postora"
      >
        <Image
          src="/images/postora-list.webp"
          alt="Calendário real do Postora na visualização de lista, com rascunhos e posts agendados para uma criadora, o Café Aurora e a Agência Horizonte."
          width={600}
          height={650}
          sizes="90vw"
          priority={priority}
        />
      </a>
      <figcaption>
        Interface real, conteúdo fictício. Toque na imagem para ampliar.
      </figcaption>
    </figure>
  );
}
