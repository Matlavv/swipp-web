import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
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
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <div className="flex items-center justify-center">
        <Card className="w-full max-w-sm">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-2xl">Connexion</CardTitle>
              <CardDescription>
                Connectez vous à votre compte Swipp
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-[#34469C]">
                Sign in
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
