import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/utils/AuthContext";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import Link from "next/link";
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
      where("cancelled", "==", false)
    );

    const querySnapshot = await getDocs(q);
    const reservationsWithDetails = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const reservation = doc.data();

        // Combiner bookingDate et bookingHour pour créer un objet Date complet
        const bookingDateTime = new Date(
          `${reservation.bookingDate}T${reservation.bookingHour}`
        );

        // Filtrer les réservations futures
        if (bookingDateTime > new Date()) {
          const userDetails = await fetchUserDetails(reservation.userId);
          return {
            ...reservation,
            id: doc.id,
            userEmail: userDetails.email,
            username: userDetails.username,
            displayName: userDetails.firstName
              ? `${userDetails.firstName} ${userDetails.lastName}`
              : userDetails.username,
            bookingDateString: formatDate(bookingDateTime),
          };
        }
      })
    );

    // Trier les réservations par date et heure les plus proches
    const sortedReservations = reservationsWithDetails
      .filter(Boolean)
      .sort((a, b) => {
        const dateA = new Date(`${a.bookingDate}T${a.bookingHour}`);
        const dateB = new Date(`${b.bookingDate}T${b.bookingHour}`);
        return dateA - dateB;
      });

    setReservations(sortedReservations);
  };

  const fetchUserDetails = async (userId) => {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    return userSnap.exists()
      ? userSnap.data()
      : { username: "Inconnu", email: "Pas d'email" };
  };

  const formatDate = (date) => {
    return date.toLocaleString("fr-FR", {
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
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom du Client</TableHead>
                <TableHead>Email du Client</TableHead>
                <TableHead>Date de Réservation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservations.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell>
                    <Link
                      key={reservation.id}
                      href={`/Garages/reservations/${reservation.id}`}
                    >
                      {reservation.displayName || reservation.username}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      key={reservation.id}
                      href={`/Garages/reservations/${reservation.id}`}
                    >
                      {reservation.userEmail}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      key={reservation.id}
                      href={`/Garages/reservations/${reservation.id}`}
                    >
                      {reservation.bookingDateString}
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpcomingReservations;
