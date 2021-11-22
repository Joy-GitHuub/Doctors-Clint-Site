import { useState, useEffect } from 'react';
import initializeFirebase from '../Pages/Login/Firebase/Firebase.Init';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

initializeFirebase();

const useFirebase = () => {

    const [user, setUser] = useState({});
    const [authError, setAuthError] = useState('');
    const [isLoading, setIsLoading] = useState(true);


    const auth = getAuth();

    // User Register 
    const registerUser = (email, password) => {
        setIsLoading(true);
        // Create User With Email And PassWord
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                setAuthError('');
            })
            .catch((error) => {
                setAuthError(error.message)
            }).finally(() => setIsLoading(false));
    }

    // User Login
    const logingUser = (email, password, location, history) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                const destination = location?.state?.from || '/';
                history.replace(destination)
                setAuthError('')
            })
            .catch((error) => {
                setAuthError(error.message)
            }).finally(() => setIsLoading(false));
    };

    // Observer User State
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                setAuthError('');
            } else {
                setUser({})
            }
            setIsLoading(false);
        });
        return () => unSubscribe;
    }, [auth])



    // User LogOut Website
    const logOut = () => {
        setIsLoading(true);
        signOut(auth).then(() => {

        }).catch((error) => {
            setAuthError(error.message)
        }).finally(() => setIsLoading(false))
    }


    return {
        user,
        isLoading,
        authError,
        registerUser,
        logingUser,
        logOut,
    }

};

export default useFirebase;