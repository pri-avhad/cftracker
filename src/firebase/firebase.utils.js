import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


var config = {
    apiKey: "AIzaSyCFFnsmL9t4wIS8l8k0Isu9GVak2UDqyMM",
    authDomain: "cftracker-d4578.firebaseapp.com",
    projectId: "cftracker-d4578",
    storageBucket: "cftracker-d4578.appspot.com",
    messagingSenderId: "98912231099",
    appId: "1:98912231099:web:30e9b9d7b77481a29ad39e",
    measurementId: "G-Q499R9ZLBM"
  };

  ;

  export const createUser = async (userAuth, otherData) => {
      if(!userAuth) return;
      const userRef = firestore.doc(`users/${userAuth.uid}`)
      const snapshot = await userRef.get();
      console.log(snapshot);

      if(!snapshot.exists){
          const {displayName,email } = userAuth;
          const date = new Date();

          try{
            const userRef = firestore.doc(`users/${userAuth.uid}`)
            await userRef.set({
              displayName,
              email,
              date,
              c1:0,
              c2:0,
              c3:0,
              c4:0,
              c5:0,
              c6:0,
              c7:0,
              c8:0,
              c9:0,
              c10:0,
              c11:0,
              c12:0,
              housing:0,
              food:0,
              travel:0,
              product:0,
              ...otherData
          })
          }
          catch(error){
              console.log('error creating user', error.message);
          }
        }
        return userRef;
  }
  
  export const getUserByUID=async(UID) =>{
    await firestore().ref(`users/${UID}`).once('value');
}
  export const updateData = async (userAuth, log , housingvalue ,foodvalue, travelvalue , productvalue) => {
    if(!userAuth) return;
   const userRef = firestore.doc(`users/${userAuth.uid}`)
   const snapshot = await userRef.get();
    console.log(snapshot);

    if(!snapshot.exists){
        const date = new Date();
        const m = date.toLocaleString('default', {month:'long'});
        console.log(`${userAuth.id}`)
        console.log(m);
        try{
          userRef.update({
              housing :housingvalue,
              food: foodvalue,
              travel:travelvalue,
              product:productvalue
          })
          switch(m){
            case 'January':
              userRef.update({
                c1:log
              });
              break;
            case 'February':
              userRef.update({
                c2:log
              });
              break;
            case 'March':
              userRef.update({
                c3:log
              });
              break;
            case 'April':
              userRef.update({
                c4:log
              });
              break;
            case 'May':
              userRef.update({
                c5:log
              });
              break;
            case 'June':
              userRef.update({
                c6:log
              });
              break;
            case 'July':
              userRef.update({
                c7:log
              });
              break;
            case 'August':
              userRef.update({
                c8:log
              });
              break;
            case 'September':
              userRef.update({
                c9:log
              });
              break;
            case 'October':
              userRef.update({
                c10:log
              });
              break;
            case 'November':
              userRef.update({
                c11:log
              });
            break;
            case 'December':
              userRef.update({
                c12:log
              });
              break;
              default:
                console.log('error');
        }
        }
        catch(error){
          console.log(error);
        }
        return userRef;
        }



  }
  firebase.initializeApp(config);

  
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
