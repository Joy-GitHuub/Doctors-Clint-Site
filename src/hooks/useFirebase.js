import { useState, useEffect } from 'react';
import initializeFirebase from '../Pages/Login/Firebase/Firebase.Init';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, onAuthStateChanged, signOut } from "firebase/auth";

initializeFirebase();

const useFirebase = () => {

    const [user, setUser] = useState({});
    const [authError, setAuthError] = useState('');
    const [isLoading, setIsLoading] = useState(true);


    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    // User Register 
    const registerUser = (email, password, name, history) => {
        setIsLoading(true);
        // Create User With Email And PassWord
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setAuthError('');
                const newUser = { email, displayName: name }
                setUser(newUser)

                // Send Name To Firebase After Creation
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                }).catch((error) => {
                });
                history.replace('/')
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

    // User Google Login 
    const signInWithGoogle = (location, history) => {
        setIsLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const destination = location?.state?.from || '/';
                history.replace(destination)
                setAuthError('')
            }).catch((error) => {
                setAuthError(error.message)
            }).finally(() => setIsLoading(false));
    }

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
        signInWithGoogle,
        logOut,
    }

};

export default useFirebase;