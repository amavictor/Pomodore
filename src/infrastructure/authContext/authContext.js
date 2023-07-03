
import { onAuthStateChanged } from "firebase/auth";
import {
    useEffect,
    createContext,
    useState
} from 'react';
import { auth } from "../utilities/firebaseUtils/firebase";
import { React } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";


export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        (async function getUserFromStorage() {
            try {
                const currentUser = await AsyncStorage.getItem("@user")
                if (currentUser !== null) {
                    setUser(JSON.parse(currentUser))
                    setLoggedIn(true)
                }
            }
            catch (e) {
                
            }
        })()
    },[])



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
            loggedIn,
            setLoggedIn,
            setUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

