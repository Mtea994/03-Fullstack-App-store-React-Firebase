import React, { useCallback, useEffect } from "react";
import { Two } from "../assets";
import { FcGoogle } from "react-icons/fc";
import {
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../config/firebase.config";

const Authentication = () => {
  const googleProvider = new GoogleAuthProvider();

  const handleLogin = useCallback(async () => {
    try {
      //! works on prod only
      // await signInWithRedirect(auth, googleProvider);
      const userCred = await signInWithPopup(auth, googleProvider);
      if (userCred) {
        console.log(userCred, "userCred");
      }
    } catch (error) {
      console.error("Error During Login: ", error);
    }
  }, [auth]);

  return (
    <div
      style={{
        background: `url(${Two})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="w-screen h-screen flex items-center justify-center"
    >
      <div
        className="w-full md:w-96 px-4 py-6 rounded-md backdrop-blur-md 
      flex items-center justify-center flex-col gap-8 bg-[rgba(0,0,0,0.3)]"
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-2xl text-white">Welcome Back</p>
          <p className="text-lg text-gray-200">sign in to your store</p>
          <div
            className="flex items-center px-4
           py-1 border border-amber-100 rounded-md gap-2 cursor-pointer bg-[rgba(255,255,255,0.2)]"
            onClick={handleLogin}
          >
            <FcGoogle className="text-3xl" />
            <p className="text-lg text-white">Sign in with your Gmail</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// setting up firebase
/*
-> create project 
-> create firestore database -> edit rules
-> create storage -> edit rules
-> authentication -> provider google -> configs -> clientid/secret 
*/

export default Authentication;
