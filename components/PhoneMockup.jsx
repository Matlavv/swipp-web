import Image from "next/image";

export const PhoneMockup = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-start items-center w-full">
      <Image
        src="/assets/phone.png"
        alt="phone-mockup"
        width={650}
        height={600}
        priority
      />
      {/* Augmenter la marge à gauche sur les grands écrans pour décaler le texte */}
      <div className="text-center md:text-left md:flex md:flex-col md:justify-center lg:ml-20">
        <h2 className="text-5xl md:text-7xl font-bold">
          L&apos;appli au service
        </h2>
        <h2 className="text-5xl md:text-7xl font-bold text-[#34469C]">
          de l&apos;automobile
        </h2>
        <h5 className="mt-3 font-semibold md:w-2/3">
          Swipp vous permet de réserver un créneau chez un garagiste partenaire
          et de planifier la livraison de carburant à domicile. Simplifiez votre
          vie automobile avec Swipp !
        </h5>
        {/* Centre le bouton sur petits écrans et aligne à gauche sur écrans plus grands */}
        <div className="flex justify-center md:justify-start mt-5">
          <button className="px-3 py-1.5 flex gap-2 items-center rounded-xl outline outline-2">
            <div className="w-10">
              <Image
                src="/assets/google-play.svg"
                alt="Get it on Google Play"
                width={40}
                height={40}
              />
            </div>
            <div>
              <div className="text-sm font-extrabold">Installer sur</div>
              <div className="text-2xl">Google Play</div>
            </div>
          </button>
          <button className="px-3 py-1.5 flex gap-2 items-center rounded-xl outline outline-2 ml-4">
            <div className="w-10">
              <Image
                src="/assets/apple.svg"
                alt="Get it on Google Play"
                width={40}
                height={40}
              />
            </div>
            <div>
              <div className="text-sm font-extrabold">Installer sur</div>
              <div className="text-2xl">Apple Store</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
