import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/utils/AuthContext";
import { db } from "@/utils/firebaseConfig";
import { getAuth, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function UpdateGarageForm() {
  const { currentUser } = useAuth();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [department, setDepartment] = useState("");
  const [description, setDescription] = useState("");
  const [workerCount, setWorkerCount] = useState(0);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [services, setServices] = useState([]);

  const router = useRouter();
  const auth = getAuth();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.error("Aucun fichier sélectionné pour l'upload");
      return;
    }
    setImage(file);
  };

  const uploadImage = async () => {
    if (!image) {
      console.error("Aucune image à uploader");
      return;
    }

    const storage = getStorage();
    const storageRef = ref(storage, `garages/${currentUser.uid}/${image.name}`);

    try {
      const snapshot = await uploadBytes(storageRef, image);
      const url = await getDownloadURL(snapshot.ref);
      setImageUrl(url); // Stocker l'URL de l'image dans l'état pour une utilisation ultérieure
      return url; // Retourne l'URL pour l'utiliser immédiatement après l'upload
    } catch (error) {
      console.error("Erreur lors du téléchargement de l'image:", error);
      return null; // Retourne null en cas d'erreur
    }
  };

  // Gestionnaire pour les services
  const handleServiceChange = (event) => {
    const { name, checked } = event.target;
    setServices((prevServices) =>
      checked
        ? [...prevServices, name]
        : prevServices.filter((service) => service !== name)
    );
  };

  useEffect(() => {
    // Fonction pour charger les données du garage
    const fetchGarageData = async () => {
      if (currentUser) {
        const garageId = `${currentUser.uid}`;
        const garageRef = doc(db, "garages", garageId);

        try {
          const docSnap = await getDoc(garageRef);
          if (docSnap.exists()) {
            // Utiliser les données pour pré-remplir le formulaire
            const data = docSnap.data();
            setName(data.name);
            setAddress(data.address);
            setCity(data.city);
            setDepartment(data.department);
            setDescription(data.description);
            setWorkerCount(data.workerCount);
            setImageUrl(data.image);
            setServices(data.services || []);
          } else {
            console.log("Aucune donnée trouvée pour ce garage!");
          }
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des données du garage:",
            error
          );
        }
      }
    };
    fetchGarageData();
  }, [currentUser]);

  // Fonction pour gérer la soumission du formulaire
  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convertir la ville et le département en minuscules
    const formattedCity = city.toLowerCase();
    const formattedDepartment = department.toLowerCase();

    // Vérification que tous les champs ont été remplis
    if (
      !name ||
      !address ||
      !formattedCity ||
      !formattedDepartment ||
      !description ||
      workerCount < 1
    ) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    let imageUrlToSave = imageUrl;

    // Si une nouvelle image a été sélectionnée alors la télécharger
    if (image) {
      const newImageUrl = await uploadImage();
      if (newImageUrl) {
        imageUrlToSave = newImageUrl;
      } else {
        // Si le téléchargement échoue, utiliser l'URL de l'image existante ou une image par défaut
        imageUrlToSave =
          imageUrl ||
          "https://firebasestorage.googleapis.com/v0/b/swipp-b74be.appspot.com/o/garages%2Fgarage1.png?alt=media&token=6152c66d-b9c0-40b1-89ea-036029da79e9";
      }
    } else if (!imageUrl) {
      // S'il n'y a pas d'image existante et qu'aucune nouvelle image n'a été sélectionnée, utiliser une image par défaut
      imageUrlToSave =
        "https://firebasestorage.googleapis.com/v0/b/swipp-b74be.appspot.com/o/garages%2Fgarage1.png?alt=media&token=6152c66d-b9c0-40b1-89ea-036029da79e9";
    }

    if (currentUser) {
      // Générer un identifiant unique pour le garage basé sur l'utilisateur connecté, ou utilisez un existant pour une mise à jour
      const garageId = `${currentUser.uid}`;
      const garageRef = doc(db, "garages", garageId);

      try {
        await setDoc(
          garageRef,
          {
            name,
            address,
            city: formattedCity, // Sauvegarde en minuscules
            department: formattedDepartment, // Sauvegarde en minuscules
            description,
            workerCount,
            services,
            image: imageUrlToSave,
            userId: currentUser.uid, // Associer le garage à l'utilisateur connecté
          },
          { merge: true }
        );

        alert("Modifications enregistrées avec succès !");
      } catch (error) {
        console.error(
          "Erreur lors de la sauvegarde des informations du garage :",
          error
        );
        alert("Erreur lors de la sauvegarde des informations du garage");
      }
    }
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        router.push("../auth/Login");
      })
      .catch((error) => {
        console.error("Erreur lors de la déconnexion", error);
      });
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">
            Modifier les informations de votre garage
          </h1>
        </div>
        <div className="grid gap-6">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Nom du garage</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Nom du garage"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </CardContent>
              <CardHeader>
                <CardTitle>Adresse</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Adresse"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </CardContent>
              <CardHeader>
                <CardTitle>Ville</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Ville"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </CardContent>
              <CardHeader>
                <CardTitle>Département</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Département"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </CardContent>
              {/* Description avec longueur maximale de 50 caractères */}
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Description"
                  maxLength={50}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </CardContent>

              {/* Nombre d'employés */}
              <CardHeader>
                <CardTitle>Nombre de mécaniciens</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="0"
                  type="number"
                  value={workerCount}
                  onChange={(e) => setWorkerCount(e.target.value)}
                />
              </CardContent>
              <CardHeader>
                <CardTitle>Image du garage</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  type="file"
                  id="imageUpload"
                  name="imageUpload"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </CardContent>

              <CardHeader>
                <CardTitle>
                  Sélectionnez les services que vous proposez
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        name="Contrôle technique"
                        checked={services.includes("Contrôle technique")}
                        onChange={handleServiceChange}
                      />
                      Contrôle technique
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        name="Pneu"
                        checked={services.includes("Pneu")}
                        onChange={handleServiceChange}
                      />
                      Pneu
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        name="Transmission"
                        checked={services.includes("Transmission")}
                        onChange={handleServiceChange}
                      />
                      Transmission
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        name="Pare-brise"
                        checked={services.includes("Pare-brise")}
                        onChange={handleServiceChange}
                      />
                      Pare-brise
                    </label>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="border-t px-6 py-4">
                <Button>Valider</Button>
              </CardFooter>
            </form>
          </Card>
          <Button onClick={handleSignOut}>Déconnexion</Button>
        </div>
      </main>
    </div>
  );
}
