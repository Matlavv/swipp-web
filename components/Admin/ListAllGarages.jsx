import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../utils/firebaseConfig";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const ListAllGarages = () => {
  const [garages, setGarages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "garages"));
    onSnapshot(q, (querySnapshot) => {
      const garageList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGarages(garageList);
    });
  }, []);

  return (
    <Card className="w-full border-2">
      <CardHeader>
        <CardTitle>Liste des Garages</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Ville</TableHead>
              <TableHead>Departement</TableHead>
              <TableHead>Adresse</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {garages.map((garage) => (
              <TableRow key={garage.id}>
                <TableCell>{garage.name}</TableCell>
                <TableCell>{garage.city}</TableCell>
                <TableCell>{garage.department}</TableCell>
                <TableCell>{garage.address}</TableCell>
                <TableCell>{garage.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ListAllGarages;
