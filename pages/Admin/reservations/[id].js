import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../../utils/firebaseConfig";

const DetailedReservation = () => {
  const [reservation, setReservation] = useState(null);
  const [garage, setGarage] = useState(null);
  const [vehicle, setVehicle] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchReservation = async () => {
      if (id) {
        const reservationRef = doc(db, "RepairBookings", id);
        const docSnap = await getDoc(reservationRef);

        if (docSnap.exists()) {
          const reservationData = docSnap.data();
          setReservation(reservationData);

          // Fetch garage details
          if (reservationData.garageId) {
            const garageRef = doc(db, "garages", reservationData.garageId);
            const garageSnap = await getDoc(garageRef);
            if (garageSnap.exists()) {
              setGarage(garageSnap.data());
            } else {
              console.log("Garage not found");
            }
          }

          // Fetch vehicle details
          if (reservationData.userId && reservationData.vehicleId) {
            const vehicleRef = doc(
              db,
              `users/${reservationData.userId}/vehicles/${reservationData.vehicleId}`
            );
            const vehicleSnap = await getDoc(vehicleRef);
            if (vehicleSnap.exists()) {
              setVehicle(vehicleSnap.data());
            } else {
              console.log("Vehicle not found");
            }
          }
        } else {
          console.log("Reservation not found");
        }
      }
    };

    fetchReservation();
  }, [id]);

  if (!reservation) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <Card>
        <CardHeader>
          <CardTitle>Détails de la réservation</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Nom du Client: {`${reservation.firstName} ${reservation.lastName}`}
          </p>
          <p>Type de Réparation: {reservation.reparationType}</p>
          <p>Détails de la Réparation: {reservation.reparationDetail}</p>
          <p>Statut: {reservation.state}</p>
          <p>
            Date:{" "}
            {new Date(reservation.bookingDate.seconds * 1000).toLocaleString(
              "fr-FR"
            )}
          </p>
          <p>Prix: {reservation.price} €</p>
          <CardHeader>
            <CardTitle>Informations du Garage</CardTitle>
          </CardHeader>
          <CardContent>
            {garage && (
              <div>
                <p>Nom du Garage : {garage.name}</p>
                <p>Adresse : {garage.address}</p>
                <p>Ville : {garage.city}</p>
                <p>Département : {garage.department}</p>
                <p>Nombre de garagistes : {garage.workerCount}</p>
              </div>
            )}
          </CardContent>
          <CardHeader>
            <CardTitle>Informations du véhicule</CardTitle>
          </CardHeader>
          <CardContent>
            {vehicle && (
              <div>
                <p>Marque: {vehicle.marque}</p>
                <p>Modèle: {vehicle.modele}</p>
                <p>Année: {vehicle.annee}</p>
                <p>Immatriculation: {vehicle.immatriculation}</p>
              </div>
            )}
          </CardContent>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailedReservation;
