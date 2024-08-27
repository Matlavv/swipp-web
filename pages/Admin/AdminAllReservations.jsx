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
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { db } from "../../utils/firebaseConfig";

const AdminAllReservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = () => {
      const q = query(
        collection(db, "RepairBookings"),
        orderBy("bookingDate", "desc")
      );
      onSnapshot(q, (querySnapshot) => {
        const reservationList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReservations(reservationList);
      });
    };
    fetchReservations();
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div>
      <Header />
      <Card>
        <CardHeader>
          <CardTitle>Toutes les réservations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom du Client</TableHead>
                <TableHead>Type de Réparation</TableHead>
                <TableHead>Détails de la Réparation</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Prix</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservations.map((reservation) => (
                <TableRow
                  key={reservation.id}
                  className="hover:bg-gray-100 cursor-pointer"
                >
                  <TableCell>
                    <Link href={`/Admin/reservations/${reservation.id}`}>
                      {`${reservation.firstName} ${reservation.lastName}`}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/Admin/reservations/${reservation.id}`}>
                      {reservation.reparationType}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/Admin/reservations/${reservation.id}`}>
                      {reservation.reparationDetail}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/Admin/reservations/${reservation.id}`}>
                      {reservation.state}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/Admin/reservations/${reservation.id}`}>
                      {formatDate(reservation.bookingDate)}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/Admin/reservations/${reservation.id}`}>
                      {`${reservation.price} €`}
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

export default AdminAllReservations;
