import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/utils/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../../utils/firebaseConfig";

const DetailedReservation = () => {
  const [reservation, setReservation] = useState(null);
  const [user, setUser] = useState(null);
  const [vehicle, setVehicle] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchReservation = async () => {
      if (id) {
        const reservationRef = doc(db, "RepairBookings", id);
        const docSnap = await getDoc(reservationRef);

        if (docSnap.exists()) {
          const reservationData = docSnap.data();
          setReservation(reservationData);

          if (reservationData.userId) {
            const userRef = doc(db, "users", reservationData.userId);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              setUser(userSnap.data());

              if (reservationData.vehicleId) {
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
              console.log("User not found");
            }
          }
        } else {
          console.log("Reservation not found");
        }
      }
    };

    fetchReservation();
  }, [id, currentUser]);

  if (!reservation || !user) return <p>Loading...</p>;

  return (
    <div>
      <Header />
      <Card className="max-w-4xl mx-auto my-8 p-5">
        <CardHeader>
          <CardTitle>Détails de la réservation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h2 className="font-bold text-lg">Informations du client</h2>
              <p className="my-2">
                Nom : {user.firstName} {user.lastName}
              </p>
              <p className="my-2">Email : {user.email}</p>
              <p className="my-2">Téléphone : {user.phoneNumber}</p>
            </div>
            <div>
              <h2 className="font-bold text-lg">Détails de la réservation</h2>
              <p className="my-2">
                Type de réparation : {reservation.reparationType}
              </p>
              <p className="my-2">Détails : {reservation.reparationDetail}</p>
              <p className="my-2">
                Date de réservation :{" "}
                {reservation.bookingDate?.toDate().toLocaleString("fr-FR")}
              </p>
              <p className="my-2">Prix : {reservation.price} €</p>
            </div>
            {vehicle && (
              <div>
                <h2 className="font-bold text-lg">Informations du véhicule</h2>
                <p className="my-2">Année : {vehicle.annee}</p>
                <p className="my-2">Modèle : {vehicle.modele}</p>
                <p className="my-2">Marque : {vehicle.marque}</p>
                <p className="my-2">
                  Immatriculation : {vehicle.immatriculation}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailedReservation;
