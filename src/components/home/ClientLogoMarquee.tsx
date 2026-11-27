import Image from "next/image";

const clients = [
  { name: "Pür & Simple", src: "/images/clients/pur-and-simple.jpg" },
  { name: "Mary Brown's Chicken", src: "/images/clients/mary-browns.png" },
  { name: "Taco Bell", src: "/images/clients/taco-bell.png" },
  { name: "BFF", src: "/images/clients/bff.png" },
  { name: "KFC", src: "/images/clients/kfc.png" },
  { name: "Maverick's Donut Company", src: "/images/clients/mavericks.png" },
  { name: "Teriyaki Experience", src: "/images/clients/teriyaki-experience.jpeg" },
  { name: "Fresh Burger", src: "/images/clients/fresh-burger.png" },
  { name: "Playa Bowls", src: "/images/clients/playa-bowls.jpeg" },
];

function LogoRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      className="flex shrink-0 items-center gap-12 pr-12 md:gap-20 md:pr-20"
      aria-hidden={hidden || undefined}
    >
      {clients.map((client) => (
        <li key={client.name} className="relative h-16 w-32 shrink-0 mix-blend-multiply md:h-20 md:w-40">
          <Image
            src={client.src}
            alt={hidden ? "" : client.name}
            fill
            sizes="160px"
            className="object-contain grayscale brightness-110 contrast-125 opacity-70 transition duration-500 ease-out-expo hover:grayscale-0 hover:opacity-100"
          />
        </li>
      ))}
    </ul>
  );
}

export function ClientLogoMarquee() {
  return (
    <section className="bg-warm-50 py-section-sm" aria-labelledby="clients-heading">
      <div className="max-site section-padding mb-10 md:mb-14">
        <h2
          id="clients-heading"
          className="font-display italic text-display-md text-center text-charcoal text-balance"
        >
          Spaces we&rsquo;ve built for brands people love
        </h2>
      </div>

      <div className="marquee relative flex overflow-hidden">
        <div className="marquee-track flex w-max bg-warm-50">
          <LogoRow />
          <LogoRow hidden />
        </div>
      </div>
    </section>
  );
}
