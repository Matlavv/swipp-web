import Image from "next/image";

export const ThreeContainer = () => {
  return (
    <div className="flex flex-col mt-7 md:justify-start w-full mb-20">
      <div className="text-center md:text-left md:flex md:flex-col md:justify-center lg:ml-20">
        <h2 className="text-2xl md:text-5xl font-bold text-[#34469C]">
          Optez pour la simplicité
        </h2>
        <h2 className="text-2xl md:text-5xl font-bold">avec Swipp</h2>
      </div>
      <div className="flex flex-col md:flex-row justify-evenly mt-9">
        <div className="flex flex-col items-center">
          <div className="w-64 h-64 p-5 bg-[#B2FFFF] rounded-3xl flex flex-col justify-between mt-4">
            <p className="font-light text-sm">Simplicité</p>
            <Image
              src="/assets/timer.png"
              width={100}
              height={100}
              alt="Safe image"
              className="flex self-center"
            />
            <h5 className="font-semibold text-xl self-start">
              Trouvez un garage en deux clics
            </h5>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-64 h-64 p-5 bg-[#F5F5F5] rounded-3xl flex flex-col justify-between mt-4">
            <p className="font-light text-sm">Rapidité</p>
            <Image
              src="/assets/truck.png"
              width={100}
              height={100}
              alt="Safe image"
              className="flex self-center"
            />
            <h5 className="font-semibold p-4 text-xl">
              Faites vous livrer votre carburant chez vous
            </h5>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-64 h-64 p-5 bg-[#EFDECD] rounded-3xl flex flex-col justify-between mt-4">
            <p className="font-light text-sm">Fiabilité</p>
            <Image
              src="/assets/safe.png"
              width={100}
              height={100}
              alt="Safe image"
              className="flex self-center"
            />
            <h5 className="font-semibold text-lg">
              Déposez votre véhicule en confiance avec nos garages agréés
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};
