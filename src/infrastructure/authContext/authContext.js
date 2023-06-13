
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
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setIsLoading(true)
            if (currentUser) {
                setUser(currentUser)
                setIsLoading(false)
            } else {
                setIsLoading(false)
            }
        })
        return () => unSubscribe()
    }, [])
    if (isLoading) {
        return <ActivityIndicator size="large" />
    }
    return (
        <AuthContext.Provider value={{
            isLoading,
            user,
            error,
            setUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

