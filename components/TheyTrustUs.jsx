import Image from "next/image";

const press = [
  "auchan",
  "europcar",
  "sixt",
  "hertz",
  "citroen",
  "edf",
  "orange",
  "ada",
];

const TheyTrustUs = () => {
  return (
    <section id="press">
      <div className="py-14">
        <div className="container mx-auto px-4 md:px-8">
          <h3 className="text-center text-xl font-semibold text-gray-500">
            Nos clients
          </h3>
          <div className="relative mt-6">
            <div className="grid grid-cols-2 place-items-center gap-2 md:gap-4 lg:grid-cols-4 xl:gap-x-6 2xl:grid-cols-8">
              {press.map((logo, idx) => (
                <Image
                  key={idx}
                  src={`../assets/press/${logo}.png`}
                  width={200}
                  height={100}
                  alt={`logo-${logo}`}
                />
              ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 h-full w-1/3 bg-gradient-to-r from-white dark:from-black"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 h-full w-1/3 bg-gradient-to-l from-white dark:from-black"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TheyTrustUs;
