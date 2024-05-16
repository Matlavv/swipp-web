const ServiceList = () => {
  return (
    <div className="flex flex-col items-center px-4 py-8 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        {/* Section Energies */}
        <div className="p-4 border-b md:border-r md:border-b-0 border-gray-300">
          <h2 className="text-2xl font-bold mb-4">1 / Energies</h2>
          <p className="font-bold">
            Bio Carburant, B100, HVO, Diesel, SP 95/98, E85, GNV, Electrique,
            Hydrogène
          </p>
          <ul className="list-disc pl-5 mt-2">
            <li>
              Mobile: Commandez L’énergie de votre voiture et faites vous livrer
              où et quand vous voulez.
            </li>
            <li>
              Fixe: Grâce au Réseau partenaire Commandez et payez via Swipp et
              profitez de remises et d’avantages privilégiés.
            </li>
          </ul>
        </div>

        {/* Section Entretiens */}
        <div className="p-4 border-b md:border-b-0">
          <h2 className="text-2xl font-bold mb-4">2 / Entretiens</h2>
          <ul className="list-disc pl-5">
            <li>Pare brise (Mobile ou atelier) - Swipp</li>
            <li>Garage (Mobile ou atelier) - Swipp et Id Garage</li>
            <li>Pneu (Mobile ou atelier) - Allo Pneu</li>
            <li>Carrosserie (Mobile ou atelier) - BMS</li>
            <li>Propreté écologique (Mobile) - Wash&check</li>
            <li>Boitier Télématique (Mobile) - Tekcar</li>
          </ul>
        </div>

        {/* Section Urgences */}
        <div className="p-4 border-b md:border-r md:border-b-0 border-gray-300">
          <h2 className="text-2xl font-bold mb-4">3 / Urgences</h2>
          <ul className="list-disc pl-5">
            <li>Dépannage - Depann 2000</li>
            <li>Voiture de prêt - B-lease</li>
            <li>Panne de carburant - Swipp</li>
            <li>Panne mécanique - Swipp et réseau</li>
          </ul>
        </div>
        {/* Section Divers */}
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">4 / Divers</h2>
          <ul className="list-disc pl-5">
            <li>Assurance - Furet.com</li>
            <li>
              Data, Retrouvez l’intégralité du suivi du véhicule, idéal pour la
              vente en occasion avec le carnet de bord digital.
            </li>
            <li>Stockage, jockeyage - Baloo</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ServiceList;
