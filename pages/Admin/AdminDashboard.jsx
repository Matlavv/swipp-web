import AddAGarage from "@/components/Admin/AddAGarage";
import ListAllGarages from "@/components/Admin/ListAllGarages";
import ListAllReservations from "@/components/Admin/ListAllReservations";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { auth } from "@/utils/firebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";

const AdminDashboard = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.replace("/auth/Login");
    } catch (error) {
      console.error("Erreur lors de la déconnexion", error);
      alert("Erreur lors de la déconnexion: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen w-full">
      <Header />
      <div className="w-full px-4 sm:px-10 flex flex-col md:flex-row gap-4 md:gap-10">
        {/* Responsive section for AddAGarage and ListAllReservations */}
        <div className="flex flex-col md:flex-row w-full gap-10">
          <div className="md:w-1/4 w-full">
            <AddAGarage />
          </div>
          <div className="md:w-full w-full">
            <ListAllReservations />
          </div>
        </div>
      </div>
      <div className="w-full px-4 sm:px-10 mt-4">
        <ListAllGarages />
      </div>
      <Button
        onClick={handleSignOut}
        className="bg-[#34469C] text-white py-2 px-4 rounded mt-4"
      >
        Déconnexion
      </Button>
    </div>
  );
};

export default AdminDashboard;
