import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useAuth } from "@/utils/AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { db } from "../../utils/firebaseConfig";

const ManageAvailabilities = () => {
  const [availabilities, setAvailabilities] = useState([]);
  const [date, setDate] = useState(new Date());
  const [slots, setSlots] = useState([]);
  const [newSlot, setNewSlot] = useState("");
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchAvailabilities = async () => {
      if (currentUser?.uid) {
        const docRef = doc(db, "garages", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const { availabilities } = docSnap.data();
          setAvailabilities(availabilities || []);
          setDefaultSlots(availabilities, new Date());
        }
      }
    };
    fetchAvailabilities();
  }, [currentUser]);

  const setDefaultSlots = (availabilities, selectedDate) => {
    const selectedDateAvailability = availabilities.find(
      (avail) =>
        new Date(avail.date).toDateString() === selectedDate.toDateString()
    );
    if (selectedDateAvailability) {
      setSlots(selectedDateAvailability.slots);
    } else {
      const day = selectedDate.getDay();
      if (day >= 1 && day <= 5) {
        // Lundi à Vendredi
        const defaultSlots = [];
        for (let hour = 9; hour < 18; hour++) {
          defaultSlots.push(`${hour}:00`);
        }
        setSlots(defaultSlots);
      } else {
        setSlots([]);
      }
    }
  };

  const handleAddSlot = () => {
    if (newSlot && !slots.includes(newSlot)) {
      const updatedSlots = [...slots, newSlot].sort();
      setSlots(updatedSlots);
      setNewSlot("");
    }
  };

  const handleRemoveSlot = (slotToRemove) => {
    const updatedSlots = slots.filter((slot) => slot !== slotToRemove);
    setSlots(updatedSlots);
  };

  const handleRemoveDay = async () => {
    const updatedAvailabilities = availabilities.filter(
      (avail) => new Date(avail.date).toDateString() !== date.toDateString()
    );
    setAvailabilities(updatedAvailabilities);

    if (currentUser?.uid) {
      await setDoc(
        doc(db, "garages", currentUser.uid),
        { availabilities: updatedAvailabilities },
        { merge: true }
      );
      alert("Horaires du jour supprimés avec succès !");
    }
    setSlots([]);
  };

  const handleSaveAvailabilities = async () => {
    const updatedAvailabilities = availabilities.filter(
      (avail) => new Date(avail.date).toDateString() !== date.toDateString()
    );
    updatedAvailabilities.push({ date: date.toDateString(), slots });
    setAvailabilities(updatedAvailabilities);

    if (currentUser?.uid) {
      await setDoc(
        doc(db, "garages", currentUser.uid),
        { availabilities: updatedAvailabilities },
        { merge: true }
      );
      alert("Horaires sauvegardés avec succès !");
    }
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setDefaultSlots(availabilities, newDate);
  };

  return (
    <div className="p-4">
      <Header />
      <h1 className="text-xl font-bold mb-4">Gestion des horaires</h1>
      <div className="mb-4 ml-4">
        <Calendar onDayClick={handleDateChange} selected={date} />
      </div>
      <div className="mb-4 ml-4">
        <input
          type="time"
          value={newSlot}
          onChange={(e) => setNewSlot(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <Button onClick={handleAddSlot}>Ajouter un horaire</Button>
      </div>
      <ul className="mb-4 ml-4">
        {slots.map((slot, index) => (
          <li key={index} className="flex items-center m-2">
            {slot}
            <FaTimes
              className="text-red-500 cursor-pointer ml-4"
              onClick={() => handleRemoveSlot(slot)}
            />
          </li>
        ))}
      </ul>
      <div className="flex space-x-2">
        <Button onClick={handleSaveAvailabilities}>Valider</Button>
        <Button variant="destructive" onClick={handleRemoveDay}>
          Supprimer tout les horaires du jour
        </Button>
      </div>
    </div>
  );
};

export default ManageAvailabilities;
