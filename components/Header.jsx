import { useAuth } from "@/utils/AuthContext";
import { db } from "@/utils/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser } = useAuth();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserRole(userData.role); // Stocke le rôle de l'utilisateur dans l'état local
        }
      }
    };

    fetchUserRole();
  }, [currentUser]);

  return (
    <header className="flex items-center justify-between w-full p-8">
      <Link href="/">
        <Image src="/assets/swipp.png" alt="logo" width={150} height={100} />
      </Link>

      {/* Bouton Hamburger */}
      <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>

      {/* Navigation */}
      <nav className={`md:flex ${isMenuOpen ? "block" : "hidden"}`}>
        <ul className="flex flex-col md:flex-row font-semibold">
          <li className="md:mr-10">
            <Link href="/JoinUsForm">Nous rejoindre</Link>
          </li>
          {currentUser && userRole === "garage" ? (
            <li>
              <Link href="/Garages/GarageDashboard">Espace Pro</Link>
            </li>
          ) : currentUser && userRole === "admin" ? (
            <li>
              <Link href="/Admin/AdminDashboard">Panel Admin</Link>
            </li>
          ) : (
            <li>
              <Link href="/auth/Login">Connexion</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
