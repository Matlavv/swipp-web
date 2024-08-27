import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../../utils/firebaseConfig";

const GarageDetails = () => {
  const [garage, setGarage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
        setIsLoading(false);
      }
    };

    fetchGarage();
  }, [id]);

  // Fonction pour mettre à jour les champs du garage
  const handleChange = (e) => {
    const { name, value } = e.target;
    setGarage({ ...garage, [name]: value });
  };

  // Fonction pour enregistrer les modifications
  const handleSaveChanges = async () => {
    try {
      await updateDoc(doc(db, "garages", id), garage);
      alert("Les détails du garage ont été mis à jour !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour des détails :", error);
      alert("Échec de la mise à jour des détails du garage !");
    }
  };

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

  if (isLoading) {
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
          <div className="mb-4">
            <label className="block mb-2">
              <strong>Nom:</strong>
            </label>
            <input
              type="text"
              name="name"
              value={garage.name || ""}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">
              <strong>Ville:</strong>
            </label>
            <input
              type="text"
              name="city"
              value={garage.city || ""}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">
              <strong>Departement:</strong>
            </label>
            <input
              type="text"
              name="department"
              value={garage.department || ""}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">
              <strong>Adresse:</strong>
            </label>
            <input
              type="text"
              name="address"
              value={garage.address || ""}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">
              <strong>Description:</strong>
            </label>
            <textarea
              name="description"
              value={garage.description || ""}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-4">
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
            onClick={handleSaveChanges}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Enregistrer les modifications
          </button>
          <button
            onClick={deleteGarage}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 ml-2"
          >
            Supprimer
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default GarageDetails;
