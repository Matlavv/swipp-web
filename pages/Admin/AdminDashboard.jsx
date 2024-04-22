import AddAGarage from "@/components/Admin/AddAGarage";
import ListAllGarages from "@/components/Admin/ListAllGarages";
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
      <h1 className="text-2xl font-bold mt-6">Dashboard Administrateur</h1>
      <div className="flex justify-start items-start w-full px-10">
        {/* AddAGarage component aligned to the left */}
        <AddAGarage />
      </div>
      <div className="w-full px-10 mt-4">
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
