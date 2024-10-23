import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, update, get } from 'firebase/database';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCaj-Y6Zscgs0DVZ7RSSZxY_b3oitQrOv8",
  authDomain: "nu-cs392-thomaswang.firebaseapp.com",
  databaseURL: "https://nu-cs392-thomaswang-default-rtdb.firebaseio.com",
  projectId: "nu-cs392-thomaswang",
  storageBucket: "nu-cs392-thomaswang.appspot.com",
  messagingSenderId: "678035225662",
  appId: "1:678035225662:web:4cc02f2a93b4e69448e56f",
  measurementId: "G-Q7DCPB2YNM"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useDbData = (path, { sync = true } = {}) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (sync) {
      return onValue(ref(database, "/class-scheduling" + path), (snapshot) => {
        setData(snapshot.val());
      }, (error) => {
        setError(error);
      });
    } else {
      get(ref(database, "/class-scheduling" + path)).then((snapshot) => {
        setData(snapshot.val());
      }).catch((error) => {
        setError(error);
      });
    }
  }, [path]);

  return [data, error];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback((value) => {
    update(ref(database, "/class-scheduling" + path), value)
    .then(() => setResult(makeResult()))
    .catch((error) => setResult(makeResult(error)))
  }, [database, path]);

  return [updateData, result];
};

const auth = getAuth(firebase);
const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [admin, result] = useDbData(`/admin/${user?.uid}`);

  useEffect(() => {
    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [setUser]);

  return (
    <AuthContext.Provider value={{
      authed: Boolean(user),
      admin: user && Boolean(admin),
      email: user?.email,
      signIn: () => {
        signInWithPopup(auth, new GoogleAuthProvider())
      },
      signOut: () => signOut(auth),
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
