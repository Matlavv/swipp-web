import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import Header from "../../components/Header";
import { auth, db } from "../../utils/firebaseConfig";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Récupérer le document de l'utilisateur pour obtenir son rôle
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const { role } = userDoc.data();

        // Rediriger l'utilisateur selon son rôle
        if (role === "garage") {
          router.push("/Garages/GarageDashboard");
        } else {
          router.push("/test"); // Redirection par défaut pour les autres rôles
        }
      } else {
        console.log("Aucun document utilisateur trouvé");
        // Gérer le cas où l'utilisateur n'a pas de document (ou gérer l'erreur)
      }
    } catch (error) {
      alert("Erreur de connexion: " + error.message);
    }
  };

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit} className="mt-20">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="mt-10 bg-slate-500 rounded-full px-4 py-2 w-80 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out hover:bg-slate-600"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          required
        />
        <button type="submit">Connexion</button>
      </form>
    </div>
  );
}
