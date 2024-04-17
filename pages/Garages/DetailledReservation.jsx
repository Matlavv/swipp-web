import Header from "@/components/Header";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../utils/firebaseConfig";

const DetailledReservation = () => {
  const [reservationDetails, setReservationDetails] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchDetails(id);
    }
  }, [id]);

  async function fetchDetails(reservationId) {
    try {
      setLoading(true);
      setError(null);

      // Fetch reservation details
      const reservationRef = doc(db, "RepairBookings", reservationId);
      const reservationSnap = await getDoc(reservationRef);
      if (!reservationSnap.exists()) {
        throw new Error("Reservation not found");
      }

      const reservationData = reservationSnap.data();
      setReservationDetails(reservationData);

      // Fetch user details
      const userRef = doc(db, "users", reservationData.userId);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        throw new Error("User not found");
      }

      setUserData(userSnap.data());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Header />
      {loading ? (
        <p>Loading details...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <h1>Reservation Details</h1>
          <h2>Client Information</h2>
          <p>
            Name: {userData?.firstName} {userData?.lastName}
          </p>
          <p>Email: {userData?.email}</p>
          <p>Phone: {userData?.phoneNumber}</p>
          <h2>Reservation Information</h2>
          <p>Type: {reservationDetails?.reparationType}</p>
          <p>Detail: {reservationDetails?.reparationDetail}</p>
          <p>Vehicle ID: {reservationDetails?.vehicleId}</p>
          <p>
            Booking Date:{" "}
            {reservationDetails?.bookingDate?.toDate().toLocaleString("fr-FR")}
          </p>
        </div>
      )}
    </div>
  );
};

export default DetailledReservation;
