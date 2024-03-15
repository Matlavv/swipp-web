import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import Header from "../../components/Header";
import { auth } from "../../utils/firebaseConfig";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/test");
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
