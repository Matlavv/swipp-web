import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../../utils/firebaseConfig";

const GarageDetails = () => {
  const [garage, setGarage] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchGarage = async () => {
      if (id) {
        const garageRef = doc(db, "garages", id);
        const docSnap = await getDoc(garageRef);
        if (docSnap.exists()) {
          setGarage(docSnap.data());
        } else {
          console.log("Garage not found");
        }
      }
    };

    fetchGarage();
  }, [id]);

  // Fonction pour changer le statut isActive
  const handleActiveStatusChange = async (event) => {
    const newIsActive = event.target.value === "Actif";
    if (garage.isActive !== newIsActive) {
      try {
        await updateDoc(doc(db, "garages", id), {
          isActive: newIsActive,
        });
        setGarage({ ...garage, isActive: newIsActive });
        alert("Le statut du garage a été modifié !");
      } catch (error) {
        console.error("Erreur lors de la modification du statut :", error);
        alert("Échec de la modification du statut !");
      }
    }
  };

  // Fonction pour supprimer un garage
  const deleteGarage = async () => {
    const confirmDelete = confirm(
      "Êtes-vous sûr de vouloir supprimer ce garage ?"
    );
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, "garages", id));
        router.push("/Admin/AdminDashboard"); // Redirection après suppression
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        alert("Échec de la suppression du garage !");
      }
    }
  };

  if (!garage) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header />
      <Card>
        <CardHeader>
          <CardTitle>Détails du Garage</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Nom:</strong> {garage.name}
          </p>
          <p>
            <strong>Ville:</strong> {garage.city}
          </p>
          <p>
            <strong>Departement:</strong> {garage.department}
          </p>
          <p>
            <strong>Adresse:</strong> {garage.address}
          </p>
          <p>
            <strong>Description:</strong> {garage.description}
          </p>
          <div>
            <strong>Statut :</strong>
            <select
              value={garage.isActive ? "Actif" : "Inactif"}
              onChange={handleActiveStatusChange}
              className="ml-2 border rounded p-1"
            >
              <option value="Actif">Actif</option>
              <option value="Inactif">Inactif</option>
            </select>
          </div>
          <button
            onClick={deleteGarage}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Supprimer
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default GarageDetails;
