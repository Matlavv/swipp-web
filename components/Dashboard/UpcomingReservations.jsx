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
  limit,
  orderBy,
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
      orderBy("bookingDate", "asc"),
      limit(8)
    );

    const querySnapshot = await getDocs(q);
    const reservationsWithDetails = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const reservation = doc.data();
        if (new Date(reservation.bookingDate.seconds * 1000) > new Date()) {
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
        }
      })
    );

    setReservations(reservationsWithDetails.filter(Boolean)); // Remove undefined entries caused by past dates
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
