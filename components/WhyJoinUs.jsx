export const WhyJoinUs = () => {
  return (
    <div className="flex flex-col mt-7 md:justify-start w-full mb-20 bg-gray-100 p-5 pb-20">
      <div className="mt-5 text-center md:text-left md:flex md:flex-col md:justify-center lg:ml-20">
        <h2 className="text-2xl md:text-5xl font-bold ">
          Élargissez votre clientèle
        </h2>
        <h2 className="text-2xl md:text-5xl font-bold text-[#34469C]">
          Instantanément
        </h2>
      </div>
      <div className="flex flex-col md:flex-row justify-evenly mt-9">
        <div className="flex flex-col items-center">
          <div className="w-72 h-90 p-5 bg-[#81D8D0] rounded-2xl flex flex-col justify-between mt-4">
            <p className="font-light text-sm">Attirer plus de clients</p>
            <h5 className="font-semibold text-xl self-start p-5 mt-4">
              Swipp met votre garage à portée de main de milliers de clients
              potentiels. Augmentez votre visibilité et remplissez votre
              calendrier comme jamais auparavant.
            </h5>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-72 h-90 p-5 bg-[#34469C] rounded-3xl flex flex-col justify-between mt-4">
            <p className="font-light text-sm text-white">Gagner du temps</p>
            <h5 className="font-semibold text-xl text-white p-5 mt-4">
              Rejoignez le réseau Swipp et dites adieu aux appels incessants.
              Notre plateforme vous offre un support dédié et des réservations
              automatiques.
            </h5>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-72 h-90 p-5 bg-[#FEFEFA] rounded-3xl flex flex-col justify-between mt-4">
            <p className="font-light text-sm text-[#34469C]">
              Optimisation des Revenus
            </p>
            <h5 className="font-semibold text-lg text-[#34469C] p-5 mt-4">
              Maximisez vos gains avec Swipp. Remplissez les créneaux
              inutilisés, optimisez vos ressources, et boostez votre
              rentabilité, facilement et efficacement.
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};
