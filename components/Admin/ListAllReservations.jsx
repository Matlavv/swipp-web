import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/utils/firebaseConfig";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const ListAllReservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = () => {
      const q = query(
        collection(db, "RepairBookings"),
        orderBy("bookingDate", "desc"),
        limit(6)
      );

      return onSnapshot(q, (querySnapshot) => {
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
      <Card className="xl:col-span-2 border-2">
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Réservations</CardTitle>
            <CardDescription>Les 7 dernières réservations</CardDescription>
          </div>
          <Button asChild size="sm" className="ml-auto gap-1 bg-[#34469C]">
            <Link href="/Admin/AdminAllReservations" passHref>
              Voir tout
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Garage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservations.map((reservation) => (
                <TableRow
                  key={reservation.id}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <TableCell>{`${reservation.firstName} ${reservation.lastName}`}</TableCell>
                  <TableCell>{formatDate(reservation.bookingDate)}</TableCell>
                  <TableCell>{reservation.reparationType}</TableCell>
                  <TableCell>{reservation.state}</TableCell>
                  <TableCell>{`${reservation.price} €`}</TableCell>
                  <TableCell>{reservation.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ListAllReservations;
