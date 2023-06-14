
import { onAuthStateChanged } from "firebase/auth";
import { Stack, ActivityIndicator } from "@react-native-material/core";
import {
    useEffect,
    createContext,
    useState
} from 'react';
import { auth } from "../utilities/firebaseUtils/firebase";
import { React } from 'react';


export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser)
            }
        })
        return () => unSubscribe()
    }, [user])


    return (
        <AuthContext.Provider value={{

            user,
            setUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

