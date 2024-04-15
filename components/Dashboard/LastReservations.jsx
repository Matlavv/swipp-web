import { Badge } from "@/components/ui/badge";
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
import { useAuth } from "@/utils/AuthContext";
import {
  collection,
  doc,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { db } from "../../utils/firebaseConfig";

const LastReservations = () => {
  const [reservations, setReservations] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      fetchReservations();
    }
  }, [currentUser]);

  const fetchReservations = () => {
    const garageId = currentUser.uid;
    const q = query(
      collection(db, "RepairBookings"),
      where("garageId", "==", garageId),
      orderBy("bookingDate", "desc"),
      limit(5)
    );

    return onSnapshot(q, async (querySnapshot) => {
      const reservationsWithIds = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Extract userIds and fetch user details
      const userIds = reservationsWithIds.map((res) => res.userId);
      const userDetails = await fetchUsersDetails(userIds);

      // Map user details back to reservations
      const reservationsWithUser = reservationsWithIds.map((reservation) => ({
        ...reservation,
        userDisplayName:
          userDetails[reservation.userId]?.trim() || "Utilisateur inconnu",
      }));

      setReservations(reservationsWithUser);
    });
  };

  const fetchUsersDetails = async (userIds) => {
    const uniqueUserIds = Array.from(new Set(userIds));
    const userDetails = {};

    await Promise.all(
      uniqueUserIds.map(async (userId) => {
        try {
          const userRef = doc(db, "users", userId);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const { firstName, lastName, username } = userSnap.data();
            userDetails[userId] =
              `${firstName || ""} ${lastName || ""}`.trim() || username;
          } else {
            console.log(`No user found for ID: ${userId}`);
            userDetails[userId] = "Utilisateur inconnu"; // Handling non-existent user
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
          userDetails[userId] = "Utilisateur inconnu"; // Error handling
        }
      })
    );

    return userDetails;
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "";

    const date = timestamp.toDate();
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
      <Card className="xl:col-span-2">
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Réservations</CardTitle>
            <CardDescription>
              Les dernières réservations effectuées par vos clients
            </CardDescription>
          </div>
          <Button asChild size="sm" className="ml-auto gap-1 bg-[#34469C]">
            <Link href="#">
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
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Prix</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservations.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell>{reservation.userDisplayName}</TableCell>
                  <TableCell>{reservation.reparationDetail}</TableCell>
                  <TableCell>
                    <Badge
                      className={`text-xs ${reservation.statusColor} border-${reservation.statusColor}`}
                      variant="outline"
                    >
                      {reservation.isActive ? "Active" : "Terminée"}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(reservation.bookingDate)}</TableCell>
                  <TableCell>{`${reservation.price}€`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default LastReservations;
