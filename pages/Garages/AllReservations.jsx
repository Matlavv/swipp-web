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
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../utils/firebaseConfig";

const AllReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [editStates, setEditStates] = useState({});
  const [saveSuccess, setSaveSuccess] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser?.uid) {
      fetchReservations(currentUser.uid);
    }
  }, [currentUser]);

  const fetchReservations = async (garageId) => {
    const q = query(
      collection(db, "RepairBookings"),
      where("garageId", "==", garageId),
      orderBy("bookingDate", "desc") // Change "asc" to "desc" here
    );

    const querySnapshot = await getDocs(q);
    const reservationsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Fetch user details and enhance reservations with these details
    const userDetails = await fetchUserDetails(
      reservationsData.map((res) => res.userId)
    );
    const enrichedReservations = reservationsData.map((reservation) => ({
      ...reservation,
      userDisplayName: userDetails[reservation.userId]?.fullName || "Inconnu",
    }));

    setReservations(enrichedReservations);
  };

  const fetchUserDetails = async (userIds) => {
    const userDetails = {};
    await Promise.all(
      userIds.map(async (userId) => {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const { firstName, lastName, username } = userSnap.data();
          userDetails[userId] = {
            fullName:
              firstName && lastName ? `${firstName} ${lastName}` : username,
          };
        } else {
          userDetails[userId] = { fullName: "Utilisateur inconnu" };
        }
      })
    );
    return userDetails;
  };

  const handleStatusChange = (id, newStatus) => {
    setEditStates((prev) => ({ ...prev, [id]: newStatus }));
    setSaveSuccess(false); // Reset the success message when there's a new interaction
  };

  const saveAllChanges = async () => {
    await Promise.all(
      Object.entries(editStates).map(([id, state]) =>
        updateDoc(doc(db, "RepairBookings", id), {
          state: state,
          isActive: state !== "Annulée", // Set isActive to false if the status is 'Cancelled'
        })
      )
    )
      .then(() => {
        setSaveSuccess(true); // Show success message
        fetchReservations(currentUser.uid); // Refetch to update the UI
      })
      .catch((error) => {
        console.error("Failed to save changes", error);
      });
  };

  return (
    <div>
      <Header />
      <Card>
        <CardHeader>
          <CardTitle>Toutes les réservations</CardTitle>
          <button onClick={saveAllChanges} className="btn btn-primary">
            Enregistrer les modifications
          </button>
        </CardHeader>
        <CardContent>
          {saveSuccess && (
            <div className="alert alert-success">
              Modifications enregistrées avec succès.
            </div>
          )}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom du Client</TableHead>
                <TableHead>Type de Réparation</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Prix</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservations.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell>
                    {reservation.userDisplayName || "Inconnu"}
                  </TableCell>
                  <TableCell>{reservation.reparationDetail}</TableCell>
                  <TableCell>
                    <select
                      value={editStates[reservation.id] || reservation.state}
                      onChange={(e) =>
                        handleStatusChange(reservation.id, e.target.value)
                      }
                      className="border rounded p-1"
                    >
                      <option value="Active">Active</option>
                      <option value="Terminée">Terminée</option>
                      <option value="Annulée">Annulée</option>
                      <option value="En attente">En attente</option>
                    </select>
                  </TableCell>
                  <TableCell>
                    {new Date(
                      reservation.bookingDate.seconds * 1000
                    ).toLocaleString("fr-FR")}
                  </TableCell>
                  <TableCell>{`${reservation.price} €`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AllReservations;
