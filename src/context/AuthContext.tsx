"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "./../../firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { createEmptyUser, User as _User } from '@/types/userTypes';
import emailjs from 'emailjs-com';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';


interface AuthContextType {
  user: User | _User | null;
  loading: boolean;
  
  role: string
  setRole: React.Dispatch<React.SetStateAction<string>>
  authenticated: boolean
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>

  signUp: (email: string, password: string, isJudge: boolean, name: string, category: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>; // new
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | _User | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string>('user')
  const [authenticated, setAuthenticated] = useState<boolean>(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      
      if (user) {
        // User is signed in, fetch user data from Firestore
        const accountRef = doc(db, "accounts", user.uid);
        getDoc(accountRef).then((accountSnap) => {
          if (accountSnap.exists()) {
            const accountData = accountSnap.data();
            setUser({
              ...user,
              ...accountData,
            });
            setAuthenticated(true);
            setRole(accountData.role || "user");
            console.log("User signed in and account fetched successfully.");
          } else {
            console.warn("No account document found for this user.");
          }
        });
      } else {
        // User is signed out
        setUser(null);
      }
      
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const sendWelcomeEmail = async (email: string, password: string, isJudge: boolean, name: string, category: string) => {

    const data = {
      user_email: email,
      user_password: password,
      is_judge: isJudge,
      user_name: name,
      user_category: category
    };

    // Create form dynamically
    const form = document.createElement('form');
    form.style.display = 'none'; // hide from user
    form.method = 'POST';
    form.action = '';

    Object.entries(data).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', key);
      input.setAttribute('value', String(value));
      form.appendChild(input);
    });

  document.body.appendChild(form); // Required for emailjs to serialize it

    emailjs.sendForm('service_vgxzzks', 'template_uq101ud', form, '7r0MFDYv8obebfCn5')
      .then((result) => {
        console.log(result.text);
        toast.success("🎉 Bienvenida enviada con éxito");        
      }, (error) => {
        console.log(error.text);
        toast.error("Error al enviar la invitación");
      });

  }

  const signUp = async (email: string, password: string, isJudge: boolean, name: string, category: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const _user = {
        ...createEmptyUser(),
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || name,
        role: isJudge ? 'judge' : 'user',
        category,
        status: "active",
        profilePic: "/blank-profile-picture.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Create associated account in Firestore
      await setDoc(doc(db, "accounts", user.uid), {
        ..._user,
        notifications: [
          {
            id: uuidv4(),
            text: "¡Bienvenido a Festivartes!",
            link: "/dashboard",
            visited: false,
          },
          {
            id: uuidv4(),
            text: "¡Comienza a registrar tus obras!",
            link: "/artworks",
            visited: false,
          },
          {
            id: uuidv4(),
            text: "¡Explora los eventos!",
            link: "/events",
            visited: false,
          },
        ],      
      });
  
      setUser(_user as any);
      setAuthenticated(true);
      setRole(_user.role);

      sendWelcomeEmail(email, password, isJudge, name, category);

      console.log("User and profile created successfully.");
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Fetch corresponding account from Firestore
      const accountRef = doc(db, "accounts", user.uid);
      const accountSnap = await getDoc(accountRef);
  
      if (accountSnap.exists()) {
        const accountData = accountSnap.data();
  
        // Update global user state here
        setUser({
          ...user,
          ...accountData,
        });
        setAuthenticated(true);
        setRole(accountData.role || "user");
  
        console.log("User signed in and account fetched successfully.");
      } else {
        console.warn("No account document found for this user.");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // fetch associated account from Firestore
      const accountRef = doc(db, "accounts", user.uid);
      const accountSnap = await getDoc(accountRef);
      if (accountSnap.exists()) {
        const accountData = accountSnap.data();

        // Update global user state here
        setUser({
          ...user,
          ...accountData,
        });
        setAuthenticated(true);
        setRole(accountData.role || "user");

        console.log("User signed in with Google and account fetched successfully.");
        return;
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setAuthenticated(false);
    setRole("user");
    console.log("User signed out successfully.");
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  return (
    <AuthContext.Provider
      value={{ 
        user, 
        loading, 
        role,
        setRole,
        authenticated,
        setAuthenticated,
        signUp, 
        signIn, 
        signInWithGoogle, 
        logout, 
        resetPassword 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
