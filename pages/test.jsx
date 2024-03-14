import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "../utils/firebaseConfig";

export default function Test() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Erreur de déconnexion :", error);
    }
  };

  return (
    <div>
      <p>Coucou</p>
      <button onClick={handleLogout}>Déconnexion</button>{" "}
    </div>
  );
}
