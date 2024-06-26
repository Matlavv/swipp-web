import Header from "@/components/Header";
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
  orderBy,
  query,
  where,
} from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { db } from "../../utils/firebaseConfig";

const AllUpcomingReservations = () => {
  const [reservations, setReservations] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser?.uid) {
      fetchUpcomingReservations(currentUser.uid);
    }
  }, [currentUser]);

  const fetchUpcomingReservations = async (garageId) => {
    const q = query(
      collection(db, "RepairBookings"),
      where("garageId", "==", garageId),
      where("bookingDate", ">", new Date()),
      orderBy("bookingDate", "asc")
    );

    const querySnapshot = await getDocs(q);
    const reservationsData = await Promise.all(
      querySnapshot.docs.map(async (docSnapshot) => {
        const reservationData = docSnapshot.data();
        const userDetails = await fetchUserDetails(reservationData.userId);
        return {
          ...reservationData,
          id: docSnapshot.id,
          userDisplayName: userDetails.firstName
            ? `${userDetails.firstName} ${userDetails.lastName}`
            : userDetails.username || "Unknown",
          bookingDateString: formatDate(reservationData.bookingDate.toDate()),
          price: reservationData.price, // Ensure the price is retrieved and stored
        };
      })
    );

    setReservations(reservationsData);
  };

  const fetchUserDetails = async (userId) => {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data();
    }
    return { firstName: "", lastName: "", username: "Unknown" };
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
      <Header />
      <Card>
        <CardHeader>
          <CardTitle>Réservations à venir</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom du Client</TableHead>
                <TableHead>Type de Réparation</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Prix</TableHead>
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
                      {reservation.userDisplayName}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      key={reservation.id}
                      href={`/Garages/reservations/${reservation.id}`}
                    >
                      {reservation.reparationDetail}
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
                  <TableCell>
                    <Link
                      key={reservation.id}
                      href={`/Garages/reservations/${reservation.id}`}
                    >
                      {reservation.price ? `${reservation.price} €` : "N/A"}
                    </Link>
                  </TableCell>{" "}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AllUpcomingReservations;
