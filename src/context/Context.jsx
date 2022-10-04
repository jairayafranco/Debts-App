import { createContext, useContext, useEffect, useState } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, addDoc, onSnapshot, query, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";

export const Context = createContext();

export const UseAppContext = () => {
    const context = useContext(Context);
    if (!context) {
        throw new Error("Context must be used within a Provider");
    }
    return context;
};

export function ContextProvider({ children }) {
    const [userSessionData, setUserSessionData] = useState(null);
    const [allDebts, setAllDebts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Login user with email and password and save user data in state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUserSessionData(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [])

    // Login user with email and password and save user data in state
    const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

    // Logout user and remove user data from state
    const logout = () => signOut(auth);

    //Insert debt data in firestore
    const addDebt = async (debt) => {
        try {
            await addDoc(collection(db, "deudas"), debt);
        } catch (error) {
            console.error(error);
        }
    }

    //listen to debts changes in firestore
    useEffect(() => {
        const q = query(collection(db, "deudas"));
        onSnapshot(q, (querySnapshot) => {
            const debts = [];
            querySnapshot.forEach((doc) => {
                debts.push({ ...doc.data(), id: doc.id });
            });
            setAllDebts({ active: debts.filter(debt => debt.activo), completed: debts.filter(debt => !debt.activo) });
        });
    }, []);

    //Update cuotasList in firestore
    const updateCuotasList = async (id, index, status, currentCuotasList, history, valorConAbono) => {
        try {
            const debtCuotasList = doc(db, "deudas", id);
            const newCuotasList = [...currentCuotasList].map((cuota, i) => {
                if (i === index) {
                    return { ...cuota, completado: status }
                }
                return cuota;
            });
            await history?.length > 0 ?
                updateDoc(debtCuotasList, {
                    cuotasList: newCuotasList,
                    historial: history,
                    valor: valorConAbono
                }) :
                updateDoc(debtCuotasList, {
                    cuotasList: newCuotasList
                });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Context.Provider value={{ login, userSessionData, logout, loading, addDebt, allDebts, updateCuotasList }}>
            {children}
        </Context.Provider>
    );
}