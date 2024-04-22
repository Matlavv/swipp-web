import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../../utils/firebaseConfig";

const GaragesDetails = () => {
  const router = useRouter();
  const { garageId } = router.query;
  const [garage, setGarage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!garageId) return;

    const fetchGarage = async () => {
      const docRef = doc(db, "garages", garageId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setGarage({ id: docSnap.id, ...docSnap.data() });
        setLoading(false);
      } else {
        console.error("No such garage!");
        setLoading(false);
      }
    };

    fetchGarage();
  }, [garageId]);

  const handleUpdate = async () => {
    if (!garage) return;
    const docRef = doc(db, "garages", garageId);
    try {
      await updateDoc(docRef, garage);
      setIsEditing(false);
      alert("Garage updated successfully!");
    } catch (error) {
      console.error("Error updating garage:", error);
      alert("Failed to update garage.");
    }
  };

  const handleDelete = async () => {
    const docRef = doc(db, "garages", garageId);
    try {
      await deleteDoc(docRef);
      alert("Garage deleted successfully!");
      router.push("/Admin/AdminDashboard");
    } catch (error) {
      console.error("Error deleting garage:", error);
      alert("Failed to delete garage.");
    }
  };

  const toggleVisibility = async () => {
    if (!garage) return;
    const docRef = doc(db, "garages", garageId);
    try {
      await updateDoc(docRef, { isVisible: !garage.isVisible });
      setGarage((prev) => ({ ...prev, isVisible: !prev.isVisible }));
    } catch (error) {
      console.error("Error toggling visibility:", error);
      alert("Failed to toggle visibility.");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setGarage((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <p>Loading...</p>;
  if (!garage) return <p>Garage not found.</p>;

  return (
    <div>
      <h1>Garage Details</h1>
      {isEditing ? (
        <div>
          <Input name="name" value={garage.name} onChange={handleChange} />
          <Input name="city" value={garage.city} onChange={handleChange} />
          <Input
            name="department"
            value={garage.department}
            onChange={handleChange}
          />
          <Button onClick={handleUpdate}>Save Changes</Button>
          <Button onClick={() => setIsEditing(false)}>Cancel</Button>
        </div>
      ) : (
        <div>
          <p>Name: {garage.name}</p>
          <p>City: {garage.city}</p>
          <p>Department: {garage.department}</p>
          <p>Is Visible: {garage.isVisible ? "Yes" : "No"}</p>
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
          <Button onClick={handleDelete}>Delete</Button>
          <Button onClick={toggleVisibility}>
            {garage.isVisible ? "Hide" : "Show"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default GaragesDetails;
