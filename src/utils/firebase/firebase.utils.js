import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    isSignInWithEmailLink,
    signInWithEmailAndPassword
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,//get doc data
    setDoc//set doc data
} from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyC0GiISWrbXA1573u2pAGXg4VOlNJ8I758",
    authDomain: "crwn-clothing-db-7cc3f.firebaseapp.com",
    projectId: "crwn-clothing-db-7cc3f",
    storageBucket: "crwn-clothing-db-7cc3f.appspot.com",
    messagingSenderId: "919623415715",
    appId: "1:919623415715:web:b64db7efe06e3389d70c16"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();//memory bank, tracks auth
export const signInWithGooglePopup = () =>
    signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
    signInWithRedirect(auth, googleProvider);


export const db = getFirestore();

export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInforamtion) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);//
    console.log(userSnapshot.exists());//is user already in database

    if (!userSnapshot.exists()) {//if user not exist creates it
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInforamtion,

            });
            console.log('sign in worked');
        } catch (err) {
            console.log('error creating the user', err.message);
        }
    }

    return userDocRef;//if user exists
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
}
