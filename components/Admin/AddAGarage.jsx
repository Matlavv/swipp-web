import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../../utils/firebaseConfig";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const AddAGarage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await sendEmailVerification(user);

      const defaultProfileImgUrl =
        "https://firebasestorage.googleapis.com/v0/b/swipp-b74be.appspot.com/o/profileImages%2FprofilePic.png?alt=media&token=34edfdcb-9114-45a4-b84f-bd9a22f92c57";

      await setDoc(doc(db, "users", user.uid), {
        username,
        email,
        firstName,
        lastName,
        phoneNumber,
        createdAt: Timestamp.now(),
        profileImageUrl: defaultProfileImgUrl,
        role: "garage",
        isActive: true,
      });

      // Réinitialisation des champs
      setEmail("");
      setPassword("");
      setUsername("");
      setFirstName("");
      setLastName("");
      setPhoneNumber("");

      // Affichage du message de succès
      setMessage("Garage ajouté avec succès!");
    } catch (error) {
      alert(`Failed to add garage: ${error.message}`);
    }
  };

  return (
    <div className="border-2 rounded-xl p-6 pb-8">
      <h1 className="text-center">Ajouter un garage</h1>
      <Input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-4"
      />
      <Input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mt-4"
      />
      <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mt-4"
      />
      <Input
        type="text"
        placeholder="Prénom"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="mt-4"
      />
      <Input
        type="text"
        placeholder="Nom de famille"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="mt-4"
      />
      <Input
        type="text"
        placeholder="Numéro de téléphone"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="mt-4"
      />
      <Button
        onClick={handleSignUp}
        className="mt-4 w-full bg-[#34469C] text-white py-2 px-4 rounded"
      >
        Ajouter
      </Button>
      {message && <p className="text-green-500 mt-2">{message}</p>}{" "}
    </div>
  );
};

export default AddAGarage;
