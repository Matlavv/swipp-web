import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebaseConfig";

// Créer un contexte d'authentification
const AuthContext = createContext();

// Utiliser ce hook dans les composants pour accéder au contexte
export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Nettoyer l'abonnement lors du démontage
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
