import LastReservations from "@/components/Dashboard/LastReservations";
import UpcomingReservations from "@/components/Dashboard/UpcomingReservations";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/utils/AuthContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { ArrowUpRight, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { db } from "../../utils/firebaseConfig";

export default function GarageDashboard() {
  const [totalReservations, setTotalReservations] = useState(0);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchTotalReservations = async () => {
      if (currentUser?.uid) {
        const reservationsRef = collection(db, "RepairBookings");
        const q = query(
          reservationsRef,
          where("garageId", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        setTotalReservations(querySnapshot.size);
      }
    };

    fetchTotalReservations();
  }, [currentUser]);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total des réservations
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalReservations}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Modifier les informations de votre garage
              </CardTitle>
              <Button
                asChild
                size="sm"
                className="ml-auto gap-1 bg-[#34469C] p-2"
              >
                <Link href="/Garages/UpdateGarageForm">
                  Modifier
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
          <LastReservations />
          <UpcomingReservations />
        </div>
      </main>
    </div>
  );
}
