import Image from "next/image";

const Gallery = () => {
  const images = [
    "two_trucks",
    "repair_truck",
    "truck_inside",
    "two_trucks",
    "white_truck",
    "camionette",
  ];

  const texts = [
    "Deux camions",
    "Camion de réparation",
    "Intérieur du camion",
    "Deux camions",
    "Camion blanc",
    "Camionnette",
  ];

  return (
    <div className="mt-8">
      <h3 className="text-center text-xl font-semibold text-gray-500 mb-8">
        Nos métiers
      </h3>
      <div className="flex justify-center mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <div className="relative group" key={index}>
              <div className="w-72 h-48 overflow-hidden rounded-lg">
                <Image
                  src={`/assets/${image}.png`}
                  alt="Gallery"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-80 flex items-center justify-center transition-opacity rounded-lg">
                <p className="text-white">{texts[index]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
