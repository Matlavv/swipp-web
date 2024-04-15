import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/utils/AuthContext";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../utils/firebaseConfig";

const UpcomingReservations = () => {
  const [reservations, setReservations] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser?.uid) {
      fetchReservations(currentUser.uid);
    }
  }, [currentUser]);

  const fetchReservations = async (garageId) => {
    const reservationsRef = collection(db, "RepairBookings");
    const q = query(
      reservationsRef,
      where("garageId", "==", garageId),
      where("isActive", "==", true),
      orderBy("bookingDate", "asc"),
      limit(6)
    );

    const querySnapshot = await getDocs(q);
    const reservationsWithDetails = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const reservation = doc.data();
        const userDetails = await fetchUserDetails(reservation.userId);
        return {
          ...reservation,
          id: doc.id,
          userEmail: userDetails.email,
          username: userDetails.username,
          displayName: userDetails.firstName
            ? `${userDetails.firstName} ${userDetails.lastName}`
            : userDetails.username,
          bookingDateString: formatDate(reservation.bookingDate),
        };
      })
    );

    setReservations(reservationsWithDetails);
  };

  const fetchUserDetails = async (userId) => {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    return userSnap.exists()
      ? userSnap.data()
      : { username: "Unknown", email: "No email" };
  };

  const formatDate = (timestamp) => {
    return timestamp.toDate().toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Réservations à venir</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-8">
          {reservations.map((reservation) => (
            <div key={reservation.id} className="flex items-center gap-4">
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  {reservation.displayName || reservation.username}
                </p>
                <p className="text-sm text-muted-foreground">
                  {reservation.userEmail}
                </p>
              </div>
              <div className="ml-auto font-medium">
                {reservation.bookingDateString}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default UpcomingReservations;
