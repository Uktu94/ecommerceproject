import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyALaSFaRMY9ThIDbBNC8fbTn5oVtb4PhVo",
    authDomain: "ecommerce-bf8d3.firebaseapp.com",
    databaseURL: "https://ecommerce-bf8d3.firebaseio.com",
    projectId: "ecommerce-bf8d3",
    storageBucket: "ecommerce-bf8d3.appspot.com",
    messagingSenderId: "969367283676",
    appId: "1:969367283676:web:d4fbe1ac3e8a3412da5119",
    measurementId: "G-20ZN56WR7Q"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user',error.message);
        }
    }
    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;