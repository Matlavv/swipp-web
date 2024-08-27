import Image from "next/image";

const Carte = () => {
  return (
    <div>
      <h3 className="text-center text-xl font-semibold text-gray-500 mt-10">
        Nous trouver
      </h3>
      <div className="flex justify-center mt-10">
        <Image
          src="/assets/carte.png"
          alt="carte"
          width={550}
          height={300}
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default Carte;
