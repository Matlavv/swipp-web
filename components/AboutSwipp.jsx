import Image from "next/image";

export const AboutSwipp = () => {
  return (
    <div className="bg-[#34469C] flex flex-col md:flex-row justify-center items-center py-10 gap-36">
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <div className="mb-20 flex">
          <div className="mr-4 flex flex-col justify-center items-center">
            <div className="bg-white w-1 h-36 mb-2"></div>
          </div>
          <div>
            <h1 className="text-4xl text-white font-bold">
              Recevez votre carburant
            </h1>
            <h1 className="text-4xl text-[#B2FFFF] font-bold">
              Où vous voulez
            </h1>
            <p className="text-lg text-white mt-5 max-w-md">
              Swipp vous livre votre carburant directement à votre domicile.
              Fini les stations-service, faites le plein sans bouger de chez
              vous.
            </p>
          </div>
        </div>
        <div className="flex">
          <div className="mr-4 flex flex-col justify-center items-center">
            <div className="bg-[#B2FFFF] w-1 h-36"></div>
          </div>
          <div>
            <h1 className="text-4xl text-white font-bold">
              Réparez votre véhicule
            </h1>
            <h1 className="text-4xl text-[#B2FFFF] font-bold">En deux clics</h1>
            <p className="text-lg text-white mt-5 max-w-md">
              Swipp vous permet de trouver un garage agréé en deux clics. Prenez
              rendez-vous pour votre véhicule en toute simplicité.
            </p>
          </div>
        </div>
      </div>
      <div>
        <Image
          src="/assets/phone_historic.png"
          alt="phone-mockup"
          width={350}
          height={300}
          priority
        />
      </div>
    </div>
  );
};
