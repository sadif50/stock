import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import app from '../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Create firebase User with Email and Password
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Log in firebase user with email and password
    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Log in with google 
    const googleLogin = provider => {
        return signInWithPopup(auth, provider);
    }

    // logOut firebase User
    const logOut = () => {
        return signOut(auth);
    }

    // get currently logged in firebase user data 
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    },[])

    return (
        <AuthContext.Provider value={{user, loading, createUser, logIn, googleLogin, logOut}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;