import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
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

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
    signInWithPopup(auth, provider);


export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists());

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (err) {
            console.log('error creating the user', err.message);
        }
    }

    return userDocRef;
}
